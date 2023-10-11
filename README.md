# next-graphql

## How to run the sample

<https://next-graphql-five.vercel.app/>

```sh
# Start docker
yarn dev:docker
# DB migration
yarn prisma:migrate
# prisma runtime generation
yarn prisma:generate
# Create hooks for urql
yarn graphql:codegen
# Start Next.js
yarn dev
```
