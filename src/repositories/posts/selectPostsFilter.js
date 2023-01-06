const getPool = require("../../database/getPool");
require("dotenv").config();

const { DATABASE_NAME } = process.env;

const selectPostsFilter = async (queryParams) => {
  const pool = getPool();

  // Definimos la consulta de sql inicial, a la que le iremos sumando los filtros que envía el cliente en los query params
  let sqlQuery = `SELECT * FROM ${DATABASE_NAME}.posts`;

  let values = [];

  let clause = "WHERE";

  for (const key in queryParams) {
    // Value es el valor de la propiedad que estamos recorriendo en cada vuelta.
    const value = queryParams[key];

    // Le sumamos el filtro a la consulta de sql
    sqlQuery += ` ${clause} ${key} = ?`;
    // Incluimos en el array de values el valor que va a sustituir al interrogante
    values.push(`${value}`);

    // Cambiamos la cláusula de WHERE a AND, ya que solo queremos que sea WHERE la primera vez, pero luego AND.
    clause = "AND";
  }

  // Le pasamos a pool.query la consulta de sql que hemos ido creando y el array de valores que sustituyen los interrogantes
  const [posts] = await pool.query(sqlQuery, values);

  return posts;
};

module.exports = selectPostsFilter;
