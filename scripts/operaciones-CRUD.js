db = db.getSiblingDB('admin');
db.auth(process.env.MONGO_INITDB_ROOT_USERNAME, process.env.MONGO_INITDB_ROOT_PASSWORD);

console.log("Autenticando...");
console.log("Autenticando...");
console.log("Autenticando...");
console.log("Autenticando...");
console.log("Autenticando...");
console.log("Autenticando...");
console.log("Autenticando...");
console.log("Autenticando...");

console.log(db.runCommand({usersInfo: 1})); // Compruebo si la autenticación salió bien

db = db.getSiblingDB('Vengadores');


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