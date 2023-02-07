require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");

// Requerimos los controllers de los posts
const {
  getPostsFilter,
  getPost,
  getPosts,
  createPost,
  deletePost,
} = require("./controllers/posts");

// Requerimos los controllers de los usuarios
const {
  createUser,
  loginUser,
  editUser,
  editUserImg,
} = require("./controllers/users");

// Requerimos los controllers de los votos
const {
  getVotesDesc,
  getVotesAsc,
  postPositiveVote,
  postNegativeVote,
} = require("./controllers/votes");

// Requerimos el controller de los comentarios
const { postComent } = require("./controllers/comments");
const { getComment } = require("./controllers/comments");

// Requerimos los middlewares
const { Errors, notFound, validateAuth } = require("./middlewares");

const app = express();

const { PORT } = process.env;

// Middleware que codifica y parsea el body para que podamos acceder a él en la propiedad req.body
app.use(express.json());
app.use(fileUpload());

// Endpoints de los votos
app.get("/votos/desc", getVotesDesc);
app.get("/votos/asc", getVotesAsc);
app.post("/voto/positivo/:id", validateAuth, postPositiveVote);
app.post("/voto/negativo/:id", validateAuth, postNegativeVote);

// Endpoints de los posts
app.get("/posts", getPostsFilter);
app.get("/posts/:id", getPost);
app.get("/posts", validateAuth, getPosts);
app.post("/post", validateAuth, createPost);
app.delete("/posts/:id", validateAuth, deletePost);

// Endpoints de los usuarios
app.post("/usuarios", createUser);
app.post("/login", loginUser);
app.put("/usuarios", validateAuth, editUser);
app.put("/imgusuario", validateAuth, editUserImg);

// Endpoints de los comentarios
app.post("/comentario/:id", validateAuth, postComent);
app.get("/comentarios/:id", getComment);

// Middlware 404. Solo las peticiones que no coincidan con ningún endpoint van a llegar aquí
app.use(notFound);

// Middleware de errores. Si algún endpoint hace un next(error), la petición viene directamente a este middleware
app.use(Errors);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
