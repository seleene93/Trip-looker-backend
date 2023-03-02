require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");

// Requerimos los controllers de los posts
const {
  getPostsFilter,
  getPost,
  getPostsByUser,
  createPost,
  deletePost,
} = require("./controllers/posts");

// Requerimos los controllers de los usuarios
const {
  createUser,
  loginUser,
  editUser,
  editUserImg,
  getUserLogged,
} = require("./controllers/users");

// Requerimos los controllers de los votos
const { getVotesDesc, getVotesAsc, postVote } = require("./controllers/votes");

// Requerimos el controller de los comentarios
const { postComent } = require("./controllers/comments");
const { getComment } = require("./controllers/comments");

// Requerimos los middlewares
const {
  Errors,
  notFound,
  validateAuth,
  validateAuthOptional,
} = require("./middlewares");

const app = express();

const { PORT } = process.env;

// Middleware que codifica y parsea el body para que podamos acceder a él en la propiedad req.body
app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use(express.static(process.env.UPLOADS_DIR));

// Endpoints de los votos
app.get("/votos/desc", validateAuthOptional, getVotesDesc);
app.get("/votos/asc", validateAuthOptional, getVotesAsc);
app.post("/posts/:id/votar", validateAuth, postVote);

// Endpoints de los posts
app.get("/posts", validateAuthOptional, getPostsFilter);
app.get("/posts/:id", getPost);
app.post("/posts", validateAuth, createPost);
app.delete("/posts/:id", validateAuth, deletePost);

// Endpoints de los usuarios
app.get("/usuarios/:id/posts", validateAuth, getPostsByUser);
app.post("/usuarios", createUser);
app.post("/usuarios/login", loginUser);
app.put("/usuarios", validateAuth, editUser);
app.put("/usuarios/avatar", validateAuth, editUserImg);
app.get("/usuarios", validateAuth, getUserLogged);

// Endpoints de los comentarios
app.post("/posts/:id/comentarios", validateAuth, postComent);
app.get("/posts/:id/comentarios", getComment);

// Middlware 404. Solo las peticiones que no coincidan con ningún endpoint van a llegar aquí
app.use(notFound);

// Middleware de errores. Si algún endpoint hace un next(error), la petición viene directamente a este middleware
app.use(Errors);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
