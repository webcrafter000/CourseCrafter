/** @type { import("drizzle-kit").Config } */

export default {
  schema: "./configs/schema.jsx",
  dialect: 'postgresql',
  dbCredentials: {
    url : "postgresql://aisaas_owner:jnYZKI4lxy1g@ep-calm-unit-a56zby6i.us-east-2.aws.neon.tech/aisaas?sslmode=require"
  }
};