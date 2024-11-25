/** @type { import("drizzle-kit").Config } */

export default {
  schema: "./configs/schema.jsx",
  dialect: 'postgresql',
  dbCredentials: {
    url : "postgresql://neondb_owner:fVs3CyBI5Oco@ep-shrill-block-a5qztyxx.us-east-2.aws.neon.tech/neondb?sslmode=require"
  }
};