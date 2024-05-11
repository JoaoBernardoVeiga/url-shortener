#!/bin/bash

cleanup() {
  docker-compose -f ./docker/docker-compose.yml down
  exit 0
}

trap cleanup INT

docker-compose -f ./docker/docker-compose.yml up -d
sleep 5
DATABASE_URL=postgres://postgres:postgres@localhost:5432/postgres npm run migrate up
npm run start