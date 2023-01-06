const getPool = require("../../database/getPool");
require("dotenv").config();

const { DATABASE_NAME } = process.env;

const selectVotesDesc = async (queryParams) => {
  const pool = getPool();

  // Definimos la consulta de sql inicial, a la que le iremos sumando los filtros que envía el cliente en los query params
  // Seleccionamos los distintos id post con su titulo, categoria, lugar, entradilla, suma sus votos positivos,
  // suma sus votos negativos y los resta entre sí para obtener la puntuación total
  let sqlQuery = `SELECT DISTINCT(p.id), p.titulo, p.categoria, p.lugar, p.entradilla, 
  (SELECT SUM(voto_positivo) - SUM(voto_negativo) FROM ${DATABASE_NAME}.votos WHERE id_post = p.id) votos 
  FROM ${DATABASE_NAME}.posts p INNER JOIN ${DATABASE_NAME}.votos v ON p.id = v.id_post`;

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

  let order = ` ORDER BY votos ASC`;

  sqlQuery += order; // nos ordena los votos por orden ascendente

  const [posts] = await pool.query(sqlQuery, values);

  return posts;
};

module.exports = selectVotesDesc;
