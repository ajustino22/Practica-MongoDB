db = db.getSiblingDB('admin');
db.auth(process.env.MONGO_INITDB_ROOT_USERNAME, process.env.MONGO_INITDB_ROOT_PASSWORD);

print('Autenticando...');
print('Autenticando...');
print('Autenticando...');
print('Autenticando...');
print('Autenticando...');
print('Autenticando...');
print('Autenticando...');


console.log(db.runCommand({usersInfo: 1})); // Compruebo si la autenticación salió bien
db = db.getSiblingDB('Vengadores');

db.heroes.getIndexes();
db.villanos.getIndexes();
db.peliculas.getIndexes();
