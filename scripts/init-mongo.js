db = db.getSiblingDB('admin');
db.auth(process.env.MONGO_INITDB_ROOT_USERNAME, process.env.MONGO_INITDB_ROOT_PASSWORD);

console.log("Autenticando...");
console.log("Autenticando...");
console.log("Autenticando...");
console.log("Autenticando...");
console.log("Autenticando...");
console.log("Autenticando...");
console.log("Autenticando...");

console.log(db.runCommand({usersInfo: 1})); // Compruebo si la autenticación salió bien

db = db.getSiblingDB('Vengadores');


const heroesData = JSON.parse(fs.readFileSync('/avengers-data/heroes.json', 'utf8'));
const villainsData = JSON.parse(fs.readFileSync('/avengers-data/villanos.json', 'utf8'));
const moviesData = JSON.parse(fs.readFileSync('/avengers-data/peliculas.json', 'utf8'));


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


db.heroes.createIndex({ nombre: 1 })
db.heroes.createIndex({ alias: 1 })
db.heroes.createIndex({ habilidades: 1 })
db.peliculas.createIndex({ titulo: 1 })
db.peliculas.createIndex({ año_estreno: 1 })
db.peliculas.createIndex({ director: 1 })
db.villanos.createIndex({ nombre: 1 })
db.villanos.createIndex({ alias: 1 })




 

 