// require('dotenv').config();

// const PORT = process.env.PORT || 3001;
// const SECRET_KEY = process.env.SECRET_KEY || 'my-secret-key';
// const BCRYPT_WORK_FACTOR = process.env.BCRYPT_WORK_FACTOR || 12;
// const IS_TESTING = process.env.NODE_ENV === 'test';

// function getDatabaseUri() {
//   if (process.env.DATABASE_URL) {
//     return process.env.DATABASE_URL;
//   }

//   if (IS_TESTING) {
//     return 'lifetracker_test';
//   }

//   // Combine other environment variables to construct the database URI
//   return `postgresql://${    process.env.DATABASE_USER}:${process.env.DATABASE_PASS
//     }@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;
// }

// module.exports = {
//   PORT,
//   SECRET_KEY,
//   BCRYPT_WORK_FACTOR,
//   IS_TESTING,
//   getDatabaseUri,
// };

require("dotenv").config();
require("colors");
const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
const IS_TESTING = process.env.NODE_ENV === "test";
// Use dev database, testing database, or via env var, production database
function getDatabaseUri() {
  const dbUser = process.env.DATABASE_USER || "postgres";
  const dbPass = process.env.DATABASE_PASS
    ? encodeURI(process.env.DATABASE_PASS)
    : "postgres";
  const dbHost = process.env.DATABASE_HOST || "localhost";
  const dbPort = process.env.DATABASE_PORT || 5432;
  const dbTestName = process.env.DATABASE_TEST_NAME || "lifetracker_test";
  const dbProdName = process.env.DATABASE_NAME || "lifetracker";
  const dbName = process.env.NODE_ENV === "test" ? dbTestName : dbProdName;
  return (
    process.env.DATABASE_URL ||
    `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`
  );
}
const BCRYPT_WORK_FACTOR = IS_TESTING ? 1 : 13;
console.log("Lifetracker Config:".red);
console.log("PORT:".blue, PORT);
console.log("BCRYPT_WORK_FACTOR".blue, BCRYPT_WORK_FACTOR);
console.log("Database:".blue, getDatabaseUri());
console.log("---");
module.exports = {
  PORT,
  IS_TESTING,
  BCRYPT_WORK_FACTOR,
  getDatabaseUri,
};