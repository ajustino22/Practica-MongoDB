# MongoDB
## Introduccion
Este proyecto se desarrolla a partir de una práctica en la asignatura de bases de datos en la que se nos pedia:

    -Explicar que son las bases de datos no-relacionales
    -Explicar ventajas e incombenientes de una base de datos no-relacional MongoDB
    -Hacer un manual de la instalacion de MongoDB
    -Diseñar una base de datos con, al menos, 3 colecciones y 5 documentos por cada una
    -Implementar 2 ejemplos de cada operacion CRUD
    -Crear 8 índices diferentes

## El desarrollo del proyecto

Ante la idea de instalar, como viene siendo habitual en las prácticas del isntituto, una maquina virtual sobre la que montar MongoDb e introducir cada una de las colecciones y documentos necesarios para el desarrollo del ejercicio, opto por utilizar Docker debido a la enorme ventaja que supone.

No hay que lidiar con la cantidad de errores y problemas que aparecen usando maquinas virtuales asi como aprovechar las ventajas que ofrece docker-compose para montar y desmontar entornos de trabajo conbinando distintas herramientas.

Una vez que tengo el entorno montado con docker, compuesto de un contendor MongoDB y un Mongo-Express, encuentro mucho mas sensato valerme de dichas herramientas para poblar la base de datos de manera automatica desde la misma ejecución del sistema.

Escribo asi el script init-mongo.js que se ejecuta desde el directorio montado como entrypoint por defecto en mongo, el cual ejecuta todos los scripts.js que introduzcas en el la primera vez que se monta el sistema.

Pasando a los ejercicios que propone la practica que constan de creacion de indices y operaciones CRUD decido escribirlos tambien mediante scripts.js que yo mismo ejecutaré.

Encuentro interesante la idea de realizar unos scripts en bash que me permitan resetear todo el entorno y, de paso, realizar la práctica por mí.

De esta formas escribo Iniciar.sh, el cual funciona como un arranque y un reset a la vez, desmonando el sistema y volviendolo a levantar. Ejecuta tambíen los scripts de las operaciones CRUD, creacion de indices asi como el que muestra toda la estructura de la base de datos que uso antes y despues de los cambios.

Estos se imprimen por pantalla y se almacenan en el directorio output para poder ver el resultado de cada uno por separado.

El script tambien abre, al final del mismo, una ventana de Google Chrome en la que podemos acceder a Mongo-Express para examinar la base de datos

## Conclusion

Podria haberse hecho mucho mas sencillo con montar un simple contenedor de MongoDB que se poblase con el script inicial y hacer los ejercicios desde el shell de mongosh.

La ventaja de haberme liado tanto con esta práctica es lo aprendido por el camino sobre Mongo, Docker y Bash.