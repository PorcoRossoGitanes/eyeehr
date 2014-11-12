#!/usr/bin/ruby

require 'uri'
require 'net/http'

Net::HTTP.version_1_1

# ログイン情報は設定ファイルに格納する。
#HOST = "localhost"
HOST = "192.168.0.8"
PORT = "8000"
USER = "ormaster"
PASSWD = "ormaster123"
ID = 3

req = Net::HTTP::Get.new("/api01rv2/patientgetv2?id=#{ID}")

req.basic_auth(USER, PASSWD)

Net::HTTP.start(HOST, PORT) { |http|
  res = http.request(req)
  puts res.body
}