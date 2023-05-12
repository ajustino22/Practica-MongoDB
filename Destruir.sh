docker-compose down --volumes
rm -rf mongodb-data
rm -rf output
docker image rm $(docker image ls -aq --filter=reference='*mongo')
#docker container rm $(docker container ls -aq --filter name=*mongo*)
#docker container rm $(docker container ls -aq --filter name=*mongo-express*)
