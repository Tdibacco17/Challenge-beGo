# Challenge beGo

## Descripción

La API beGo es una plataforma de gestión de órdenes de transporte que permite a los usuarios crear, actualizar, eliminar y asignar camiones a órdenes. La API se ha desarrollado utilizando Node.js y Express para el servidor, y MongoDB para almacenar los datos. Además, se ha utilizado Mongoose como ORM para interactuar con la base de datos MongoDB.


## Funcionalidad

La API beGo proporciona una serie de endpoints para gestionar las operaciones relacionadas con las órdenes, camiones y rutas. A continuación, se describen cada uno de los endpoints disponibles:

### 1. Registrar un Usuario
> - Método: POST
> - Ruta: `/register`
> - Descripción: Permite a los usuarios registrarse en la plataforma proporcionando su dirección de correo electrónico y contraseña. La API utiliza técnicas de hash para almacenar la contraseña de forma segura en la base de datos. Una vez registrado, el usuario puede acceder a funcionalidades adicionales de la API que requieran autenticación.

### 2. Iniciar Sesión
> - Método: POST
> - Ruta: `/login`
> - Descripción: Permite a los usuarios iniciar sesión en la plataforma proporcionando su dirección de correo electrónico y contraseña. La API utiliza la misma técnica de hash para comparar la contraseña proporcionada con la contraseña almacenada en la base de datos. Si las credenciales son válidas, la API genera un token de autenticación (JWT) y lo devuelve al cliente, el cual puede ser utilizado para acceder a rutas protegidas.

### 3. Crear una Orden
> - Método: POST
> - Ruta: `/orders`
> - Descripción: Crea una nueva orden con la información proporcionada, asignándole automáticamente el estado "Pendiente" y el camión "Sin asignación".

### 4. Obtener todas las Órdenes
> - Método: GET
> - Ruta: `/orders`
> - Descripción: Obtiene una lista de todas las órdenes existentes en la base de datos.

### 5. Obtener una Orden por ID
> - Método: GET
> - Ruta: `/orders/:id`
> - Descripción: Obtiene los detalles de una orden específica según el ID proporcionado.

### 6. Actualizar el Estado de una Orden
> - Método: PUT
> - Ruta: `/orders/:id`
> - Descripción: Actualiza el estado de una orden según el ID proporcionado. Solo se permite actualizar órdenes que no estén en progreso.

### 7. Eliminar una Orden
> - Método: DELETE
> - Ruta: `/orders/:id`
> - Descripción: Elimina una orden específica según el ID proporcionado. Solo se permite eliminar órdenes que no estén en progreso.

### 8. Asignar un Camión a una Orden
> - Método: PUT
> - Ruta: `/orders/:orderId/assign-truck/:truckId`
> - Descripción: Asigna un camión específico a una orden según los IDs proporcionados. Solo se permite asignar un camión a una orden que no esté en progreso y que aún no tenga un camión asignado.

### 9. Listar Puntos Válidos
> - Método: GET
> - Ruta: `/valid-points`
> - Descripción: Obtiene una lista de puntos válidos que cumplen con ciertos criterios de filtrado.

### 10. Cargar Datos de Puntos
> - Método: POST
> - Ruta: `/load-points`
> - Descripción: Carga datos de puntos en la base de datos desde un archivo JSON.

### 11. Listar Camiones Válidos
> - Método: GET
> - Ruta: `/valid-trucks`
> - Descripción: Obtiene una lista de camiones válidos que cumplen con ciertos criterios de filtrado.

### 12. Cargar Datos de Camiones
> - Método: POST
> - Ruta: `/load-trucks`
> - Descripción: Carga datos de camiones en la base de datos desde un archivo JSON.

### 13. Crear una Ruta
> - Método: POST
> - Ruta: `/routes`
> - Descripción: Crea una nueva ruta con los puntos proporcionados, calculando automáticamente la distancia entre ellos utilizando la API de Google Maps.

<br>
<br>

## Desarrollo

* Comencé organizando la estructura del proyecto, configuraciones y la conexión con la base de datos. Además, definí las variables de entorno y instalación de las tecnologías que iba a utilizar, separando todo en sus respectivos archivos para mantener un orden.

* A continuación, creé una nueva rama llamada "auth" para implementar las funcionalidades de registro y autenticación de usuarios, junto con sus respectivas validaciones. Para ello, diseñé los modelos, controladores, tipos y rutas necesarios.

* Después de completar los cambios, los subí a la rama "main" y creé una nueva rama llamada "trucks". En esta rama, me enfoqué en implementar la funcionalidad para cargar información de camiones desde el archivo trucks.json a la base de datos, y crear un controlador para filtrarlos. Para lograrlo, diseñé los modelos, controladores, tipos y rutas necesarios.

* Después de completar los cambios, los subí a la rama "main" y creé una nueva rama llamada "points". En esta rama, realicé exactamente el mismo proceso, pero esta vez trabajé con el archivo points.js.

* Después de completar los cambios, los subí a la rama "main" y cree una rama llamada "routes".
En esta rama, me enfoqué en implementar la funcionalidad para crear una ruta que pueda calcular automáticamente la distancia entre dos puntos utilizando la API de Google Maps. Me gustaria aclarar que para obtener acceso a la APIKEY de Google Maps se requería proporcionar una tarjeta de crédito, la cual no quise usar para poder generarla y probar esta funcionalidad. Sin embargo diseñé los modelos, controladores, tipos y rutas necesarios.

* Después de completar los cambios, los subí a la rama "main" y creé una nueva rama llamada "orders". En esta rama, me enfoqué en la creación de un CRUD para las órdenes, así como la funcionalidad de asignar una orden específica a un camión determinado. Todas estas funcionalidades fueron implementadas con sus respectivas validaciones. Para lograrlo, diseñé los modelos, controladores, tipos y rutas necesarios.

**PD**: Quisiera aclarar que se ha implementado un middleware de autenticación para asegurar que todas las rutas que requieran acceso estén protegidas, excepto las rutas "/login" y "/register". Esta funcionalidad fue generada en la rama de "auth".
