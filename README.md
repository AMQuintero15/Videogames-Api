

# Individual Project - Api Videogames

<p align="right">
  <img height="200" src="./videogame.png" />
</p>

## Objetivos del Proyecto

- Construir una App utlizando React, Redux, Node y Sequelize.
- Aprender mejores prácticas.
- Aprender y practicar el workflow de GIT.

## Horarios y Fechas

El proyecto se realizó en un periodo de dos semanas y media.

## Enunciado

La idea general es crear una aplicación en la cual se puedan ver los distintos videojuegos disponibles junto con información relevante de los mismos utilizando la api externa [rawg](https://rawg.io/apidocs) y a partir de ella poder, entre otras cosas:

- Buscar videjuegos
- Filtrarlos / Ordenarlos
- Agregar nuevos videojuegos

### Únicos Endpoints/Flags que pueden utilizar

- GET <https://api.rawg.io/api/games>
- GET <https://api.rawg.io/api/games?search={game}>
- GET <https://api.rawg.io/api/genres>
- GET <https://api.rawg.io/api/games/{id}>

#### Tecnologías utilizadas

- React
- Redux
- Express
- Sequelize - Postgres

## Frontend

Rutas principales de projecto:

__Pagina inicial__: Landing page con

- Imagen de fondo representativa al proyecto
- Botón para ingresar al home (`Ruta principal`)

__Ruta principal__: Home

- Input de búsqueda para encontrar videojuegos por nombre
- Área donde se verá el listado de videojuegos. Muestra su:
  - Imagen
  - Nombre
  - Géneros
- Botones/Opciones para filtrar por género y por videojuego existente o agregado por nosotros
- Botones/Opciones para ordenar tanto ascendentemente como descendentemente los videojuegos por orden alfabético y por rating
- Paginado para ir buscando y mostrando los siguientes videojuegos, 15 juegos por pagina, mostrando los primeros 15 en la primer pagina.

__IMPORTANTE__: En la Ruta Principal se muestran tanto los videjuegos traidos desde la API como así también los creados localmente. Debido a que en la API existen alrededor de 500 mil juegos, por cuestiones de performance se obtuvieron y paginaron los primeras 100 juegos.

__Ruta de detalle de videojuego__: Contiene

- Los campos mostrados en la ruta principal para cada videojuegos (imagen, nombre, y géneros)
- Descripción
- Fecha de lanzamiento
- Rating
- Plataformas

__Ruta de creación de videojuegos__: Contiene

- Un formulario __controlado con JavaScript__ con los siguientes campos:
  - Nombre
  - Descripción
  - Fecha de lanzamiento
  - Rating
- Posibilidad de seleccionar/agregar varios géneros
- Posibilidad de seleccionar/agregar varias plataformas
- Botón/Opción para crear un nuevo videojuego

## Base de datos

El modelo de la base de datos tiene las siguientes entidades:

- Videojuego con las siguientes propiedades:
  - ID
  - Nombre
  - Descripción
  - Fecha de lanzamiento
  - Rating
  - Plataformas
- Genero con las siguientes propiedades:
  - ID
  - Nombre

La relación entre ambas entidades es de muchos a muchos ya que un videojuego puede pertenecer a varios géneros en simultaneo y, a su vez, un género puede contener múltiples videojuegos distintos. Un ejemplo sería el juego `Counter Strike` pertenece a los géneros Shooter y Action al mismo tiempo. Pero a su vez existen otros videojuegos considerados como Shooter o como Action.

## Backend

Se desarrollo un servidor en Node/Express con las siguientes rutas:

__IMPORTANTE__: No se utilizaron los filtrados, ordenamientos y paginados brindados por la API externa, todas estas funcionalidades fueron implementadas dentro de la aplicación.

- __GET /videogames__:
  - Obtener un listado de los videojuegos
  - Debe devolver solo los datos necesarios para la ruta principal
- __GET /videogames?name="..."__:
  - Obtener un listado de las primeros 15 videojuegos que contengan la palabra ingresada como query parameter
  - Si no existe ningún videojuego mostrar un mensaje adecuado
- __GET /videogame/{idVideogame}__:
  - Obtener el detalle de un videojuego en particular
  - Debe traer solo los datos pedidos en la ruta de detalle de videojuego
  - Incluir los géneros asociados
- __POST /videogames__:
  - Recibe los datos recolectados desde el formulario controlado de la ruta de creación de videojuego por body
  - Crea un videojuego en la base de datos, relacionado a sus géneros.
- __GET /genres__:
  - Obtener todos los tipos de géneros de videojuegos posibles
  - En una primera instancia deberán traerlos desde rawg y guardarlos en su propia base de datos y luego ya utilizarlos desde allí
