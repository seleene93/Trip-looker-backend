require("dotenv").config();
const express = require("express");

// Requerimos los middlewares
const { Errors, notFound, validateAuth } = require("./middlewares");

const app = express();

const { PORT } = process.env;

// Middleware que codifica y parsea el body para que podamos acceder a él en la propiedad req.body
app.use(express.json());

// Endpoints de las recomendaciones

// Endpoints de los usuarios

// Middlware 404. Solo las peticiones que no coincidan con ningún endpoint van a llegar aquí
app.use(notFound);

// Middleware de errores. Si algún endpoint hace un next(error), la petición viene directamente a este middleware
app.use(Errors);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
