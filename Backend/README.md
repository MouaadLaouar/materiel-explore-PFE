**Getting Started**

This folder provides a foundation for building a NestJS application with Prisma for interacting with your database.

**Prerequisites**

- Node.js
- npm (comes bundled with Node.js)

**Installation**

   ```bash
   npm install
   ```

**Environment Variables**

1. Create a `.env` file in the project root directory.
2. Copy the contents from `.env.example` to `.env`, replacing the placeholder values with your actual database credentials:

   ```
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
   AuthorizationToken=""
   PORT=8080
   ```

**Database Setup and Migrations**

1. Define your database schema using Prisma Data Definition Language (DDL) in the `prisma/schema.prisma` file.

2. Generate the Prisma Client from the schema:

   ```bash
   npx prisma generate
   ```

3. Apply database migrations (creating tables based on the schema):

   ```bash
   npx prisma migrate dev --name init
   ```

   **Note:** Replace `dev` with `prod` for production environments.

**Running the Application**

1. Start the development server:

   ```bash
   npm run start:dev
   ```

   This will typically run the application on port `5555` (you can adjust this in your NestJS configuration if needed).

**Additional Notes**

- Refer to the NestJS documentation for more details on building modular applications and using features like controllers, services, and middlewares: [https://docs.nestjs.com/](https://docs.nestjs.com/)
- Explore the Prisma documentation for in-depth information on database interactions, advanced queries, and other functionalities: [https://www.prisma.io/docs](https://www.prisma.io/docs)
