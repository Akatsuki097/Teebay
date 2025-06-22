# Teebay Application

A full-stack marketplace application built with Spring Boot GraphQL backend and React frontend, PostgreSQL database:

## Table of Contents

* [Prerequisites](#prerequisites)
* [Getting Started](#getting-started)

  * [Clone Repository](#clone-repository)
  * [Configure Database](#configure-database)
  * [Application Properties](#application-properties)
* [Build & Run](#build--run)

  * [Backend](#backend)
  * [Frontend](#frontend)
* [GraphQL API](#graphql-api)

  * [Schema Overview](#schema-overview)
  * [Endpoints](#endpoints)
* [Authentication](#authentication)

  * [JWT Configuration](#jwt-configuration)
  * [Security Filter](#security-filter)
* [Database Migrations](#database-migrations)
* [React Frontend](#react-frontend)

  * [Multi-Step Form](#multi-step-form)
  * [Apollo Client Setup](#apollo-client-setup)
* [Corner Cases & Considerations](#corner-cases--considerations)
* [Contributing](#contributing)
* [License](#license)

## Prerequisites

Environment setup used for this application:

* **Java v24.0.1** (OpenJDK or Oracle JDK)
* **Maven v3.8.6**
* **Node.js v22.16.0** 
* **PostgreSQL 17.5**
* **IDE** VS Code

## Getting Started

### Clone Repository

```bash
git clone https://github.com/Akatsuki097/Teebay
cd Teebay
```

### Configure Database

1. Start PostgreSQL service.
2. Create the database:

   ```sql
   CREATE DATABASE teebay;
   ```
3. Run SQL migrations (located under `db`):

   ```bash
   psql -U postgres -d teebay -f db/init.sql
   psql -U postgres -d teebay -f db/product.sql
   psql -U postgres -d teebay -f db/migrationUserProduct.sql
   psql -U postgres -d teebay -f db/drop_summary.sql
   psql -U postgres -d teebay -f db/rent.sql
   ```

### Application Properties

Edit `backend/src/main/resources/application.properties` with your database and JWT settings:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/teebay
spring.datasource.username=postgres
spring.datasource.password=1234

```

## Build & Run

### Backend

```bash
cd backend/teebay
# Maven
mvn clean install
mvn spring-boot:run

```

The GraphQL endpoint will be available at `http://localhost:8080/graphql`
### Frontend

```bash
cd frontend
npm install           
npm start             
```

The React app will launch at `http://localhost:3000`.

## GraphQL API

### Schema Overview

* **User**: id, username, email, password
* **AuthPayload**: token, user
* **Product**: id, title, category, description, price, createdBy
* **Category**: enum values
* **Queries**:

  * `allProducts`: List<Product>
  * `myProducts`: List<Product>
  * `productById(id: ID!)`: Product
* **Mutations**:

  * `register(input: RegisterInput!)`: AuthPayload
  * `login(input: LoginInput!)`: AuthPayload
  * `createProduct(input: ProductInput!)`: Product
  * `updateProduct(id: ID!, input: ProductInput!)`: Product
  * `deleteProduct(id: ID!)`: Boolean


## Authentication

### JWT Configuration

* Generated a Base64 256-bit secret for HS256 signing (e.g., via `openssl rand -base64 32`).
* Configured expiration time in milliseconds.

### Security Filter

* `JwtAuthenticationFilter` extracts the bearer token from the `Authorization` header.
* Validates token and populates `SecurityContext`.
* Security configuration permits schema introspection and requires authentication for mutations.


## React Frontend

### Multi-Step Form

The product creation/edit form spans 6 steps:

1. Title input
2. Category selection
3. Description input
4. Price input
5. Preview
6. Confirm & Submit

State management is handled via React `useState`, with simple validation before advancing each step.

### Apollo Client Setup

* Configured `httpLink` and `authLink` to inject JWT into headers.
* Cache update logic for creating and deleting products.

## Corner Cases & Considerations

* **Update with Partial Data**: Only provided fields are updated.
* **State Persistence**: Refresh mid-flow loses form state; consider `localStorage`.
* **Numeric Input**: Ensure proper parsing and validation of price values.
* **Old JJWT versions**  parserBuilder() vs parser() mismatch.


