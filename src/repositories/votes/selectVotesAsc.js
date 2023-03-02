const getPool = require("../../database/getPool");
require("dotenv").config();

const { DATABASE_NAME } = process.env;

const selectVotesAsc = async (queryParams, idUser = 0) => {
  const pool = getPool();

  // Definimos la consulta de sql inicial, a la que le iremos sumando los filtros que envía el cliente en los query params
  // Seleccionamos los distintos id post con su titulo, categoria, lugar, entradilla, suma sus votos positivos,
  // suma sus votos negativos y los resta entre sí para obtener la puntuación total
  let sqlQuery = ` SELECT 
  P.*,
      SUM(V.voto_positivo) - SUM(V.voto_negativo) AS total_votos,
      BIT_OR(V.id_usuario = ${idUser} AND V.voto_positivo = 1) AS heVotadoPositivamente,
      BIT_OR(V.id_usuario = ${idUser} AND V.voto_negativo = 1) AS heVotadoNegativamente
  FROM trip_looker.posts P
  LEFT JOIN trip_looker.votos V ON V.id_post = P.id`;

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

  let order = ` GROUP BY P.id ORDER BY total_votos ASC;`;

  sqlQuery += order; // nos ordena los votos por orden ascendente

  const [posts] = await pool.query(sqlQuery, values);

  for (const post of posts) {
    const [votes] = await pool.query(
      `SELECT IFNULL(SUM(voto_positivo), 0) AS positivo, IFNULL(SUM(voto_negativo), 0) AS negativo FROM ${DATABASE_NAME}.votos WHERE id_post = ?`,
      [post.id]
    );
    const [photos] = await pool.query(
      `SELECT id, nombre FROM ${DATABASE_NAME}.img_post WHERE id_post = ?`,
      [post.id]
    );

    // creamos la propiedad images en el post
    post.votos = {
      positivo: votes[0].positivo,
      negativo: votes[0].negativo,
    };
    post.images = photos;
  }

  return posts;
};

module.exports = selectVotesAsc;
