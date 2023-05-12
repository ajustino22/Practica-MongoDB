docker-compose down --volumes
rm -rf mongodb-data
rm -rf output
docker build -t mimongo .
docker-compose up -d

sleep 10

docker-compose exec -T mongodb bash -c '
while ! nc -z localhost 27017; do
  echo ""
  echo "Esperando a que MongoDB esté disponible..."
  echo ""
  sleep 1
done'

winpty docker exec -it mongodb bash -c '
cd scripts &&
while true; do
  if mongosh --quiet --eval "print(\"Mongosh está disponible\")" > /dev/null 2>&1; then
    mongosh < mostrar-db.js
    mongosh < mostrar-db.js | sed -n '\''/Vengadores/,$p'\'' > /output/mostrar-db.txt
    mongosh < mostrar-indices.js
    mongosh < mostrar-indices.js | sed -n '\''/Vengadores/,$p'\'' > /output/mostrar-indices.txt
    mongosh < operaciones-CRUD.js
    mongosh < operaciones-CRUD.js | sed -n '\''/Vengadores/,$p'\'' > /output/operaciones-CRUD.txt
    mongosh < mostrar-db.js
    mongosh < mostrar-db.js | sed -n '\''/Vengadores/,$p'\'' > /output/mostrar-db-modificada.txt
    exit
    break
  else
    echo ""
    echo "Esperando a que Mongosh reaccione..."
    echo ""
    sleep 1
  fi
done'


winpty docker exec -it mongodb bash -c '
toilet -f mono12 -F metal "Mongo" &&
toilet -f mono12 -F metal "Express" &&
toilet +++++++ &&
toilet -f mono12 -F metal admin &&
toilet -f mono12 -F metal mongo &&
toilet +++++++'

sleep 5
./Mongo-express.sh

read -n 1 -s -r -p "Presiona cualquier tecla para salir"


