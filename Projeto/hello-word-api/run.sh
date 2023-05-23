#!/bin/bash
docker-compose -f ./docker/docker-compose.yml up -d
npm run start
docker-compose -f ./docker/docker-compose.yml down