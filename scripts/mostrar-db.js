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

db.getCollectionNames().forEach(function(collname) {
    print('----------------------------------------------------------------------------------------------------------------------------------------------------');
    print(collname + ':');
    db.getCollection(collname).find().pretty().forEach(function(doc) {
      printjson(doc);
      print('....................');
    });
  });
  
