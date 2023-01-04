require("dotenv").config();
const express = require("express");

// Requerimos los controllers de las recomendaciones
const { getFilter } = require("./controllers/recommendations");

// Requerimos los controllers de los usuarios
const { createUser, loginUser } = require("./controllers/users");

// Requerimos los controllers de los votos
const { getVotesDesc, getVotesAsc } = require("./controllers/votes");

// Requerimos los middlewares
const { Errors, notFound, validateAuth } = require("./middlewares");

const app = express();

const { PORT } = process.env;

// Middleware que codifica y parsea el body para que podamos acceder a él en la propiedad req.body
app.use(express.json());

// Endpoints de los votos
app.get("/votos/desc", getVotesDesc);
app.get("/votos/asc", getVotesAsc);

// Endpoints de las recomendaciones
app.get("/recomendaciones", getFilter);

// Endpoints de los usuarios
app.post("/usuarios", createUser);
app.post("/login", loginUser);

// Middlware 404. Solo las peticiones que no coincidan con ningún endpoint van a llegar aquí
app.use(notFound);

// Middleware de errores. Si algún endpoint hace un next(error), la petición viene directamente a este middleware
app.use(Errors);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
