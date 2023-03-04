# resinas-botanicas-back

Resinas Botânicas backend, a test ecommerce application, still under construction. To use the frontend, see [this repository](https://github.com/eumerme/resinas-botanicas-front) and follow the instructions in README.md

[About](#about) |
[Technologies](#technologies) |
[Installation Guide](#installation-guide) |
[How to Run](#how-to-run) |
[API Endpoints](#api-endpoints)

## About

This project is a simple application that satisfies the needs of Resinas Botânicas virtual store (@resinasbotanicas on instagram)

## Technologies

Nodejs, express, postgres, prisma, joi, jsonwebtoken, bcrypt, stripe, typescript, jest, supertest, eslint, prettier, brazilian-utils, faker-js

## Installation Guide

- Clone this repository
- Run `npm i` to installl dependencies

## How to Run

### Locally

- Create a development PostgreSQL database with whatever name you like
- Create a `.env.development` file as in `.env.example` file
- Run `dev:migration:run` to run all migrations
- Run `dev:seed` to seed the database
- Run `npm run dev` to start the local server

### Integration tests

- Create a test PostgreSQL database with whatever name you like
- Create a `.env.test` file as in `.env.example` file
- Run `test:migration:run` to run all migrations
- Run `npm run test` to run the tests once
- Run `npm run test:watch` to run the tests each time the code is saved

## API Endpoints

| HTTP Verbs | Endpoints                | Action                                     |
| ---------- | ------------------------ | ------------------------------------------ |
| POST       | /users/signup            | Register user                              |
| POST       | /users/signin            | Login user                                 |
| GET        | /users/profile/:email    | List user information                      |
| GET        | /categories              | List categories                            |
| GET        | /products/latest         | List the 6 most recent products            |
| GET        | /products/:id            | List the product based on its id           |
| GET        | /products/category/:name | List all products in the selected category |
| POST       | /stripe/checkout-session | Create a test checkout with stipe)         |
