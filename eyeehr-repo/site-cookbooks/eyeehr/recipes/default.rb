#
# Cookbook Name:: eyeehr
# Recipe:: default
# Base : CentOS64
# vagrant box add centos64 http://developer.nrel.gov/downloads/vagrant-boxes/CentOS-6.4-x86_64-v20130427.box
#
# Copyright 2014, YOUR_COMPANY_NAME
#
# All rights reserved - Do Not Redistribute
#
log "EyeEHR Server - Update OS"

#----------------------------------
# yum (fastestmirrorでダウンロード) の インストール＆アップデートを実行する。
yum_package "yum-fastestmirror" do
  action :install
end

# execute : yum -y update
execute "yum-update" do
  user "root"
  command "yum -y update"
  action :run
end
#----------------------------------

#----------------------------------
# wget の インストール＆アップデートを実行する。
yum_package "wget" do
  action :install
end
#----------------------------------

#----------------------------------
# expect, auto-expectをインストールする。(インストール自動応答用)
# expect インストール時に autoexpect もインストールされるようである。
%w{ 
	expect 
}
.each do |p|
	package p do 
		action :install
	end
end
#%w{ 
#	expect 
#	autoexpect 
#}
#.each do |p|
#	package p do 
#		action :install
#	end
#end
#----------------------------------

log "Firewall を OFF に設定する。"
#----------------------------------
## iptables を OFF に設定する。
service "iptables" do 
	action [:stop, :disable]
end
#----------------------------------

log "EyeEHR Server - Install Perl"
#----------------------------------
## Perl をインストールする。
%w{ 
	perl
}.each do |p|
	package p do 
		action :install
	end
end
##XML-RPCに必要なパッケージをインストールする。
%w{ 
	expat-devel
	cpan
}.each do |p|
	package p do 
		action :install
	end
end
##CPANモジュールをインストールする。
%w{
	XML::Parser
	RPC::XML
}.each do |mod|
  cpan_client "#{mod}" do
    action 'install'
    install_type 'cpan_module'
    user 'root'
    group 'root'
  end
end
#----------------------------------

log "EyeEHR Server - Install PHP"
#----------------------------------
## PHP をインストールする。
%w{ 
	php 
	php-mbstring 
}.each do |p|
	package p do 
		action :install
	end
end

## php.ini を用意する。
### Timezone = Asia/Tokyo
template "php.ini" do 
	path "/etc/php.ini"
	source "php.ini.erb"
	mode 0644
end
#----------------------------------

log "EyeEHR Server - Install Ruby"
#----------------------------------
## Ruby をインストールする。
### 最新版でないかもしれないので注意する。
package "ruby" do 
	action :install
end 
#----------------------------------

log "EyeEHR Server - Install httpd"
#----------------------------------
## httpd をインストールする。
package "httpd" do 
	action :install 
end

## httpd を常時起動する
service "httpd" do 
	action [:start, :enable]
end 

## httpd.confを書き換える。
template "httpd.conf" do 
	path "/etc/httpd/conf/httpd.conf"
	source "httpd.conf.erb"
	mode 0644
	notifies :restart, 'service[httpd]'
end

## httpd-proxy.conf を置き換える。
## existに80でアクセスできるように変更する。
directory "/etc/httpd/conf/extra" do
  owner "root"
  group "root"
  mode 00755
  action :create
end

template "httpd-proxy.conf" do 
	path "/etc/httpd/conf/extra/httpd-proxy.conf"
	source "httpd-proxy.conf.erb"
	mode 0644
	notifies :restart, 'service[httpd]'
end

## index.html を用意する。
template "index.html" do 
	path "/var/www/html/index.html"
	source "index.html.erb"
	mode 0644
end

## index.cgi を用意する。
template "index.cgi" do 
	path "/var/www/html/index.cgi"
	source "index.cgi.erb"
	mode 0705
end

## index.php を用意する。
template "index.php" do 
	path "/var/www/html/index.php"
	source "index.php.erb"
	mode 0705
end

## index.rb を用意する。
template "index.rb" do 
	path "/var/www/html/index.rb"
	source "index.rb.erb"
	mode 0705
end
#----------------------------------

log "EyeEHR Server - Install eXist-DB"
#----------------------------------

## JDK7(u67固定)を wget でダウンロードし、RPMでインストールする。
cookbook_file "jdk-7u67-linux-x64" do
	# JDK RPM を サーバーに移行する。("cookbook_dir/files/default/" からの相対パスを指定する。)
	source "jdk-7u67-linux-x64.rpm"
	# JDK RPM の帆損先を指定する。
	path "/tmp/jdk-7u67-linux-x64.rpm"
end

## RPM パッケージを保存する。
rpm_package 'jdk-7u67-linux-x64' do
  source '/tmp/jdk-7u67-linux-x64.rpm'
end

## eXist-DB本体を/tmpにコピーする。
cookbook_file "eXist-db-setup-2.1" do
	# eXist JAR を サーバーに移行する。("cookbook_dir/files/default/" からの相対パスを指定する。)
	source "eXist-db-setup-2.1-rev18721.jar"
	# eXist JAR の帆損先を指定する。
	path "/tmp/eXist-db-setup-2.1-rev18721.jar"
end

## exist.exp(インストール自動応答ファイル)を/tmpにコピーする。
cookbook_file "exist.exp" do
	# eXist JAR を サーバーに移行する。("cookbook_dir/files/default/" からの相対パスを指定する。)
	source "exist.exp"
	# eXist JAR の帆損先を指定する。
	path "/tmp/exist.exp"
end

## exist.exp(インストール自動応答ファイル)に実行権限を付与する。
bash "chmod +x exist.exp" do
  user "root"
  cwd "/tmp"
  code <<-EOH
  chmod +x exist.exp
  EOH
end

# exist.expを実行する。
# 起動時に若干エラーが発生するが、インストールは成功する。
bash "exist.exp" do
  user "root"
  cwd "/tmp"
  code <<-EOH
  sudo bash ./exist.exp
  EOH
end

## デーモンを登録する。
bash "eXist-db deamon" do
  user "root"
  cwd "/tmp"
  code <<-EOH
  /usr/local/lib/exist/tools/wrapper/bin/exist.sh install
  EOH
end

## alternativeを設定する。
bash "eXist-db alternative" do
  user "root"
  cwd "/tmp"
  code <<-EOH
  ln -s /usr/local/lib/exist/tools/wrapper/bin/exist.sh /etc/init.d/exist
  EOH
end

# eXistを常時起動する。
service "eXist-db" do 
	action [:start, :enable]
end 
#----------------------------------
# 再起動する。
#bash "reboot" do
#  user "root"
#  cwd "/tmp"
#  code <<-EOH
#  sudo reboot
#  EOH
#end
#----------------------------------

log "EyeEHR Server - git clone src"
#----------------------------------
## git をインストールする。
## perl との依存性解決が出来ない可能性がある。
package 'git' do
  action :install
end

## /var/www/htmlにソースコードを展開する。
## git_repo = eyeehr.jsonに記載されている。
## sudo git clone https://github.com/shokokb/eyeehr.git 
## 　⇒　/var/www/html に eyeehr が展開される。
bash "git clone" do
  user "root"
  cwd "/tmp"
  code <<-EOH
  sudo echo git clone https://github.com/shokokb/eyeehr.git >> result.log
  EOH
end

#----------------------------------
# バックアップ設定
cookbook_file "backup.sh" do
	# eXist JAR を サーバーに移行する。("cookbook_dir/files/default/" からの相対パスを指定する。)
	source "backup.sh"
	# eXist JAR の帆損先を指定する。
	path "/tmp/exist.sh"
end
