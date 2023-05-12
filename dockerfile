FROM mongo

RUN apt-get update && apt-get install -y netcat
RUN apt-get update && apt-get install -y toilet
