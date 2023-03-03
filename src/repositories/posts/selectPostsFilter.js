const getPool = require("../../database/getPool");
require("dotenv").config();

const { DATABASE_NAME } = process.env;

const selectPostsFilter = async ({ lugar, categoria, direccion, idUser }) => {
  const pool = getPool();

  // Si el id de usuario viene vacio establecemos 0.
  idUser = idUser || 0;

  // Le pasamos a pool.query la consulta de sql que hemos ido creando y el array de valores que sustituyen los interrogantes
  let [posts] = await pool.query(`
    SELECT 
      P.*,
      BIT_OR(V.id_usuario = ${idUser} AND V.voto_positivo = 1) AS heVotadoPositivamente,
      BIT_OR(V.id_usuario = ${idUser} AND V.voto_negativo = 1) AS heVotadoNegativamente
    FROM ${DATABASE_NAME}.posts P
    LEFT JOIN ${DATABASE_NAME}.votos V ON V.id_post = P.id
    WHERE P.lugar LIKE '%${lugar}%' AND P.categoria LIKE '%${categoria}%'
    GROUP BY P.id
  `);

  // Si hay algn post localizo sus imagenes.
  for (const post of posts) {
    const [votes] = await pool.query(
      `SELECT IFNULL(SUM(voto_positivo), 0) AS positivo, IFNULL(SUM(voto_negativo), 0) AS negativo FROM ${DATABASE_NAME}.votos WHERE id_post = ?`,
      [post.id]
    );

    const [photos] = await pool.query(
      `SELECT id, nombre FROM ${DATABASE_NAME}.img_post WHERE id_post = ?`,
      [post.id]
    );

    post.votos = {
      positivo: votes[0].positivo,
      negativo: votes[0].negativo,
      total_votos: Number(votes[0].positivo) - Number(votes[0].negativo),
    };

    // creamos la propiedad images en el post
    post.images = photos;
  }

  // Si el orden es por votos ordenamos el array por votos.
  if (direccion === "ASC") {
    posts = posts.sort((a, b) => a.votos.total_votos - b.votos.total_votos);
  } else {
    posts = posts.sort((a, b) => b.votos.total_votos - a.votos.total_votos);
  }

  return posts;
};

module.exports = selectPostsFilter;
