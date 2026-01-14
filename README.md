## Dependencias

    npm init -y
    npm i express cors dotenv jsonwebtoken bcrypt
    npm i -D typescript ts-node-dev @types/node @types/express @types/cors
    npm i -D prisma
    npm i @prisma/client
    npm i @prisma/adapter-pg pg
    npm i --save-dev @types/pg
    npm i --save-dev @types/bcrypt

Inicializar Prisma:  

    npx prisma init

Populate database:

    npx prisma migrate dev          // despliega la base de datos
    npx prisma migrate reset        // limpia la base de datos
    npx ts-node-dev src/seed.ts     // popula la base de datos (seed.ts)

