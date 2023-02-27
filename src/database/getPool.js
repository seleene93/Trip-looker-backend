const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "./../../.env") });

// Nos traemos los datos de la DB del .env
const {
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_NAME,
} = process.env;

let pool;
// Cuando llamemos a la función getPool, si no existe un pool todavía y DATABASE_NAME es undefined, crea uno y nos los da. Si ya existe, nos los da directamente

const getPool = () => {
  try {
    if (!pool && !process.env.DATABASE_NAME) {
      pool = mysql.createPool({
        connectionLimit: 10,
        host: DATABASE_HOST,
        user: DATABASE_USER,
        port: DATABASE_PORT,
        password: DATABASE_PASSWORD,
        database: DATABASE_NAME,
        timezone: "Z",
      });
    } else if (!pool) {
      pool = mysql.createPool({
        connectionLimit: 10,
        host: DATABASE_HOST,
        user: DATABASE_USER,
        port: DATABASE_PORT,
        password: DATABASE_PASSWORD,
        timezone: "Z",
      });
    }

    return pool;
  } catch (error) {
    console.error(error);
  }
};

module.exports = getPool;
