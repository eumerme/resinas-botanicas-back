# resinas-botanicas-back

Resinas Botânicas Backend is a test ecommerce application currently under development. To use the frontend, please visit [this repository](https://github.com/eumerme/resinas-botanicas-front) and follow the instructions in the README.md file.

[About](#about) |
[Technologies](#technologies) |
[Installation Guide](#installation-guide) |
[How to Run](#how-to-run) |
[API Endpoints](#api-endpoints)

## About

This project is a simple application that meets the needs of Resinas Botânicas virtual store (@resinasbotanicas on Instagram).

## Technologies

The project is built using the following technologies:

Node.js | Express.js | PostgreSQL | Prisma | Joi | Jsonwebtoken | Bcrypt | Stripe | Typescript | Jest | Supertest | Eslint | Prettier | Brazilian-Utils | Faker-js

## Installation Guide

To install and run the project on your local machine, please follow the steps below:

- Clone this repository
- Run `npm i` to install all dependencies

## How to Run

### Locally

- Create a **development** PostgreSQL database with any name you like
- Create a `.env.development` file based on the `.env.example` file
- Run `dev:migration:run` to run all migrations
- Run `dev:seed` to seed the database
- Run `npm run dev` to start the local server

### Integration tests

- Create a **test** PostgreSQL database with any name you like.
- Create a `.env.test` file as in `.env.example` file
- Run `test:migration:run` to run all migrations
- Run `npm run test` to run the tests once
- Run `npm run test:watch` to run the tests each time the code is saved

## API Endpoints

The following API endpoints are available in the project:

|
HTTP Method | Endpoint | Description |
| ---------- | ------------------------ | ------------------------------------------------------- |
| POST | /users/signup | Register a new user |
| POST | /users/signin | Login an existing user |
| GET | /users/profile/:email | Get the user information for a given email address |
| GET | /categories | List all available product categories |
| GET | /products/latest | List the six most recently added products |
| GET | /products/:id | Get the product information for a given product ID |
| GET | /products/category/:name | List all products in a given category |
| POST | /stripe/checkout-session | Create a test checkout session using Stripe payment API |
