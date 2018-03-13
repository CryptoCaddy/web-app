#!/bin/sh
# set sql root pass
echo "Before script MYSQL_ROOT_PASSWORD: "$(env | grep MYSQL_ROOT_PASSWORD)
echo "Before script MYSQL_DATABASE: "$(env | grep MYSQL_DATABASE)
echo "Before script MYSQL_USER: "$(env | grep MYSQL_USER)
echo "Before script MYSQL_PASSWORD: "$(env | grep MYSQL_PASSWORD)
export MYSQL_ROOT_PASSWORD="default_root_password"
export MYSQL_DATABASE="default_db"
export MYSQL_USER="default_user"
export MYSQL_PASSWORD="default_password"
echo "After script MYSQL_ROOT_PASSWORD: "$(env | grep MYSQL_ROOT_PASSWORD)
echo "After script MYSQL_DATABASE: "$(env | grep MYSQL_DATABASE)
echo "After script MYSQL_USER: "$(env | grep MYSQL_USER)
echo "After script MYSQL_PASSWORD: "$(env | grep MYSQL_PASSWORD)

