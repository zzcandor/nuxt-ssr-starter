#!/bin/bash

# service 还是使用 pm2
pm2 stop zzcutil-front-server

# docker-compose -f docker-compose.yml build
# docker-compose -f docker-compose.yml up -d

echo 'npm run build'

npm i

npm run build

echo 'npm run start'

pm2 restart zzcutil-front-server
