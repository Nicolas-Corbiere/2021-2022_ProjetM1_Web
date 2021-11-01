# 2021-2022_ProjetM1_Web

#### Application réalisée par :
<ul>
    <li>ALCARAZ Yannick</li>
    <li>CORBIERE Nicolas</li>
</ul>

## Objectif du projet :

Nous devions créer une application web pouvant afficher une liste de restaurants ainsi que des informations sur ces derniers (nom, cuisine, ville, etc.) 
Nous avons aussi ajouté une map montrant sa position et la carte du restaurant (généré automatiquement)

## Particularité du projet

Nous avons ajouté une option de filtrage par nom, mais aussi par cuisine et ville.

## lancer le projet :

Afin de démarrer le projet, merci de bien vouloir suivre les indications suivantes 

### Importer de la DB

Pour importer notre base de données :
Aller dans le répertoire /documentation/DB/ 
lancer la commande suivante : 
```console
...:~$ mongoimport --db test -c restaurants --file restaurantMongoDB.json
```
voir plus : https://www.digitalocean.com/community/tutorials/how-to-import-and-export-a-mongodb-database-on-ubuntu-20-04-fr

### Instalation de node
Installer ensuite les node_module :

```console
2021-2022_ProjetM1_Web/:~$ cd src/ code .
```
Dans Virtual Studio Code, ouvrir deux terminaux :

```console

2021-2022_ProjetM1_Web/src/:~$ cd server
2021-2022_ProjetM1_Web/src/server:~$ npm install
```

```console
2021-2022_ProjetM1_Web/src/:~$ cd client
2021-2022_ProjetM1_Web/src/client:~$ npm install
```

### Démarrage de l'application
Garder les deux terminaux ouverts et faire les commandes suivantes :

```console
2021-2022_ProjetM1_Web/src/server:~$ node ./serverCrudWithMongo.js
```

```console
2021-2022_ProjetM1_Web/src/client:~$ npm run serve
```

Vous pouvez maintenant lancer votre navigateur a l'URL suivante :
http://localhost:8081




