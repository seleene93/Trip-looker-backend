const getPool = require("../../database/getPool");
require("dotenv").config();

const { DATABASE_NAME } = process.env;

const selectPostsFilter = async (queryParams, idUser = 0) => {
  const pool = getPool();

  // Definimos la consulta de sql inicial, a la que le iremos sumando los filtros que envía el cliente en los query params
  let sqlQuery = `
    SELECT 
      P.*,
      BIT_OR(V.id_usuario = ${idUser} AND V.voto_positivo = 1) AS heVotadoPositivamente,
      BIT_OR(V.id_usuario = ${idUser} AND V.voto_negativo = 1) AS heVotadoNegativamente
    FROM ${DATABASE_NAME}.posts P
    LEFT JOIN ${DATABASE_NAME}.votos V ON V.id_post = P.id
  `;

  let values = [];

  let clause = "WHERE";

  for (const key in queryParams) {
    // Value es el valor de la propiedad que estamos recorriendo en cada vuelta.
    const value = queryParams[key];

    // Le sumamos el filtro a la consulta de sql
    sqlQuery += ` ${clause} P.${key} = ?`;
    // Incluimos en el array de values el valor que va a sustituir al interrogante
    values.push(`${value}`);

    // Cambiamos la cláusula de WHERE a AND, ya que solo queremos que sea WHERE la primera vez, pero luego AND.
    clause = "AND";
  }

  sqlQuery += " GROUP BY P.id";

  // Le pasamos a pool.query la consulta de sql que hemos ido creando y el array de valores que sustituyen los interrogantes
  const [posts] = await pool.query(sqlQuery, values);

  // recorremos los posts para agregarle las fotos
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

module.exports = selectPostsFilter;
