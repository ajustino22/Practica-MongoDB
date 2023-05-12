# Instalación

### Para levantar el entorno:

```bash
  docker-compose up -d
```

### Script de inicio y reset

```bash
  .\Iniciar.sh
```

### Script de puesta a cero 

```bash
  .\Destruir.sh
```

### Entrar en el shell de MongoDB

```bash
  docker exec -it mongodb bash
  mongosh
```


### Entrar en el shell de MongoDB

```bash
  docker exec -it mongodb bash
  mongosh
```
### Abrir ventana de Mongo-Express

```bash
  .\Mongo-express.sh
```
#### Credenciales Mongo-Express
    USUARIO: admin
    CONTRASEÑA: mongo

## Explicacion del archivo docker-compose

#### Se define la versión de Docker Compose a utilizar
    version: "3.8"

#### Se define el servicio de MongoDB
    services:
        mongodb:
#### Se especifica la imagen a utilizar para el servicio
        image: mimongo
#### Se asigna un nombre al contenedor
        container_name: mongodb
#### Se definen las variables de entorno para la instancia de MongoDB
    environment:
      - MONGO_INITDB_ROOT_USERNAME=root
      - MONGO_INITDB_ROOT_PASSWORD=mongo
#### Se definen los volúmenes a utilizar para persistir los datos de MongoDB y los scripts
    volumes:  
      - ./mongodb-data:/data/db
      - ./avengers-data:/avengers-data
      - ./scripts/init-mongo.js:/docker-entrypoint-initdb.d/init-mongo.js
      - ./scripts/operaciones-CRUD.js:/scripts/operaciones-CRUD.js
      - ./scripts/mostrar-db.js:/scripts/mostrar-db.js
      - ./scripts/mostrar-indices.js:/scripts/mostrar-indices.js
      - ./output:/output
#### Se especifica la red a utilizar para el servicio
    networks:
      - mongodb_network
#### Se exponen los puertos del servicio
    ports:
      - 27017:27017
#### Se define el chequeo de salud del servicio
    healthcheck:
      test: echo 'db.runCommand("ping").ok' | mongo 10.10.10.60:27017/test --quiet
      interval: 30s
      timeout: 10s
      retries: 3
#### Se especifica la política de reinicio del servicio
    restart: unless-stopped
  
##### Se define la red para el servicio de MongoDB
    networks:
        mongodb_network:
#### Se define el servicio de mongo-express
    mongo-express:
#### Se especifica la imagen a utilizar para el servicio
    image: mongo-express
#### Se asigna un nombre al contenedor
    container_name: mongo-express
#### Se definen las variables de entorno para la instancia de mongo-express
    environment:
        - ME_CONFIG_MONGODB_SERVER=mongodb
        - ME_CONFIG_MONGODB_ENABLE_ADMIN=true
        - ME_CONFIG_MONGODB_ADMINUSERNAME=root
        - ME_CONFIG_MONGODB_ADMINPASSWORD=mongo
        - ME_CONFIG_BASICAUTH_USERNAME=admin
        - ME_CONFIG_BASICAUTH_PASSWORD=mongo
#### Se definen los volúmenes a utilizar para persistir los datos de MongoDB
    volumes:
        - ./mongodb-data:/data/db
#### Se especifica la dependencia del servicio de MongoDB
    depends_on:
        - mongodb
#### Se especifica la red a utilizar para el servicio
    networks:
        - mongodb_network
#### Se exponen los puertos del servicio
    ports:
        - 8081:8081
#### Se define el chequeo de salud del servicio
    healthcheck:
        test: wget --quiet --tries=3 --spider http://admin:admin123@10.10.10.60:8081 || exit 1
        interval: 30s
        timeout: 10s
        retries: 3
#### Se especifica la política de reinicio del servicio
    restart: unless-stopped

#### Se define el volumen para persistir los datos de MongoDB
    volumes:
        mongodb-data:
            name: mongodb-data

#### Se define la red para los servicios de MongoDB
    networks:
        mongodb_network:
            name: mongodb_network

## Algunas aclaraciones

    MongoDB ejecuta todos los scripts que haya dentro de /docker-entrypoint-initdb.d la primera vez que se ejecuta el contenedor.
    En este caso, para crear y poblar nuestra base de datos desde el inicio, introducimos en el directorio el archivo init-mongo.js

### Qué contiene este script?

#### Conexión a la base de datos

    db = db.getSiblingDB('admin');

    db.auth(process.env.MONGO_INITDB_ROOT_USERNAME, process.env.MONGO_INITDB_ROOT_PASSWORD);

#### Entreteniendo a mongosh...
    console.log("Autenticando...");

    console.log("Autenticando...");

    console.log("Autenticando...");

    console.log("Autenticando...");

    console.log("Autenticando...");

    console.log("Autenticando...");
#### Compruebo si la autenticación salió bien
    console.log(db.runCommand({usersInfo: 1})); 

#### Cambio a la base de datos 'Vengadores'
    db = db.getSiblingDB('Vengadores');

#### Leo los datos de los archivos JSON
    const heroesData = JSON.parse(fs.readFileSync('/avengers-data/heroes.json', 'utf8'));

    const villainsData = JSON.parse(fs.readFileSync('/avengers-data/villanos.json', 'utf8'));

    const moviesData = JSON.parse(fs.readFileSync('/avengers-data/peliculas.json', 'utf8'));

#### Creo colecciones y agregar documentos a la base de datos
    db.createCollection("heroes");

    db.heroes.insertMany(heroesData, function(err, result) {
        if (err) throw err;
        console.log(result.insertedCount + ' héroes insertados');
    });

    db.createCollection("villanos");

    db.villanos.insertMany(villainsData, function(err, result) {
        if (err) throw err;
        console.log(result.insertedCount + ' villanos insertados');
    });

    db.createCollection("peliculas");

    db.peliculas.insertMany(moviesData, function(err, result) {
        if (err) throw err;
        console.log(result.insertedCount + ' películas insertadas');
    });

#### Creo índices en las colecciones
    db.heroes.createIndex({ nombre: 1 });

    db.heroes.createIndex({ alias: 1 });

    db.heroes.createIndex({ habilidades: 1 });

    db.peliculas.createIndex({ titulo: 1 });

    db.peliculas.createIndex({ año_estreno: 1 });

    db.peliculas.createIndex({ director: 1 });

    db.villanos.createIndex({ nombre: 1 });

    db.villanos.createIndex({ alias: 1 });

#### Operaciones CRUD

    console.log("Realizando inserts...");

    console.log("Realizando inserts...");


    db.heroes.insertOne({

        nombre: "Ant Man",

        alias: "Scott Lang",

        habilidades: ["Un caco muy habil", "Puede reducirse a nivel subatómico"]
    });

    db.peliculas.insertOne({
        titulo: "Iron Man 2",
        año_estreno: 2010  ,
        director: "Jon Favreau"
    });

    console.log("Realizando actualizaciones...");
    console.log("Realizando actualizaciones...");

    db.heroes.updateOne(
        { nombre: "Iron Man" },
        { $set: { habilidades: ["Es un genio", "Traje armadura", "Puede volar"] } }
    );

    db.peliculas.updateOne(
    { titulo: "Los Vengadores" },
    { $set: { año_estreno: 2123 } }
    );

    console.log("Eliminando documento...");
    console.log("Eliminando documento...");

    db.heroes.deleteOne({ nombre: "Hulk" });
    db.peliculas.deleteOne({ titulo: "Los Vengadores" });

    console.log("Realizando Lecturas...");
    console.log("Realizando Lecturas...");

    db.heroes.find({});
    db.villanos.find({});