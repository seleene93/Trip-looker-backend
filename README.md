# Trip-looker Backend

> en la terminal del VS (o cualquier terminal)

```
npm install
```

> renombrar el .env.example a .env y rellenad todos los campos con vuestros datos

> crear la DB y reiniciarla cuando queramos

```
node src/database/initDb.js
```

> una vez hecho todo esto, solo quedaría iniciar el server

```
npm run dev
```

> Los usuarios anónimos pueden

- Buscar recomendaciones por lugar y categoría.
- Ordenar los resultados de búsqueda por votos en orden ascendente o descendente.
- Ver detalle de una recomendación.
- Login con email y password.
- Registrarse sólo si es mayor de edad.

> Los usuarios registrados pueden

- Publicar recomendaciones.
- Votar positiva o negativamente recomendaciones de otros usuarios.
- Gestionar su cuenta (cambiar el dato o los datos que desee menos el dni).
- Borrar sus recomendaciones.
- Publicar comentarios en las recomendaciones.

// En la carpeta docs está la colección de peticiones para realizar con postman
// sólo hay que importarla
