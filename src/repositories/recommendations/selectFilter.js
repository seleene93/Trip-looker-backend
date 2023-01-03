const getPool = require("../../database/getPool");
require("dotenv").config();

const { DATABASE_NAME } = process.env;

const selectFilter = async (queryParams) => {
  const pool = getPool();

  // Definimos la consulta de sql inicial, a la que le iremos sumando los filtros que envía el cliente en los query params
  let sqlQuery = `SELECT * FROM ${DATABASE_NAME}.recomendaciones`;

  let values = [];

  let clause = "WHERE";

  for (const key in queryParams) {
    // Value es el valor de la propiedad que estamos recorriendo en cada vuelta. Por ejemplo, si key es "title", value puede ser "ibiza"
    const value = queryParams[key];

    // Le sumamos el filtro a la consulta de sql (por ejemplo: "WHERE title LIKE ?")
    sqlQuery += ` ${clause} ${key} = ?`;
    // Incluimos en el array de values el valor que va a sustituir al interrogante (por ejemplo: "%ibiza%")
    values.push(`${value}`);

    // Cambiamos la cláusula de WHERE a AND, ya que solo queremos que sea WHERE la primera vez, pero luego AND. Por ejemplo, si el cliente envía dos filtros como { title: "ibiza", description: "fiesta" }, en la primera vuelta del bucle queremos sumarle a la consulta WHERE title LIKE "%ibiza%", pero en la segunda vuelta, queremos añadir AND description LIKE "%fiesta%"
    clause = "AND";
  }

  const [recommendations] = await pool.query(sqlQuery, values);

  return recommendations;
};

module.exports = selectFilter;
