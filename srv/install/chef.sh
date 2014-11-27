#!/usr/bin/bash

# Chef インストール
## Ruby インストール
yum -y install ruby
#yum -y install gcc 
#yum -y install ruby ruby-devel ruby19-devel

## RubyGems インストール
wget http://production.cf.rubygems.org/rubygems/rubygems-2.4.4.zip

## Chef インストール
curl -L https://www.opscode.com/chef/install.sh | sudo bash

## knife-solo インストール
sudo gem install knife-solo

## 確認
gem list

# git インストール
yum -y install git



cd /var/www/html
git clone https://github.com/shokokb/eyeehr.git

mkdir /etc/chef
mkdir /tmp/chef-solo
cd /var/www/html/eyeehr/eyeehr-repo/
