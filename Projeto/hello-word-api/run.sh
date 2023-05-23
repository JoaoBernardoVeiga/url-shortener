#!/bin/bash
docker-compose -f ./docker/docker-compose.yml up -d
DATABASE_URL=postgres://postgres:postgres@localhost:5432/postgres npm run migrate up
npm run start
docker-compose -f ./docker/docker-compose.yml down