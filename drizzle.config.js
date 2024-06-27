/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://ejyaidb_owner:YpIcAPWUB15V@ep-shiny-morning-a5t8zr4a.us-east-2.aws.neon.tech/ejyaidb?sslmode=require',
    }
  };