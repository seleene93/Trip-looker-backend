const getPool = require("../../database/getPool");

const selectPuntuation = async (id) => {
  const pool = getPool();

  const [vote] = await pool.query(
    "SELECT puntuacion_total FROM trip_looker.votos WHERE id_recomendacion = ? ORDER BY id DESC LIMIT 1;",
    [id]
  );

  console.log(vote);
  return vote;
};

module.exports = selectPuntuation;
