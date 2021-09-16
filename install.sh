#! /bin/bash

#node js
sudo apt install nodejs

#npm
sudo apt install npm

#typescript
npm install typescript -g

#Angular
npm install -g @angular/cli

#Client modules
cd ./Client
npm install
cd ..

#Server modules
cd ./Server
npm install
cd ..

#PostgreSQL
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt-get update
sudo apt-get install postgresql-12