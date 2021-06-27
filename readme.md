mongo
use explorer
db.createUser( { user: "fydadmin", pwd: "d218922u", roles: [ "readWrite" ] } )


    name: 'fydinstant',
    user: 'fydadmin',
    pass: 'd218922u',


docker build -t fydforms .

*** retag
docker image tag fydforms:latest 192.248.182.101:5000/fydforms:latest

docker push  192.248.182.101:5000/fydforms:latest

open container in portainer and hit "Recreate" + select pull lastest image