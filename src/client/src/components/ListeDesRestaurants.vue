<template>
  <div>
    <h2>{{msg}}</h2>
    <form @submit.prevent="ajouterRestaurant($event)">
        <label>
            Nom : <input name="nom" type="text" required v-model="nom">
        </label>
        <label>
            Cuisine : <input name="cuisine" type="text" required v-model="cuisine">
        </label>

        <button class="md-raised">Ajouter</button>
    </form>

    <h1>Nombre de restaurants : {{nbRestaurantsTotal}}</h1>
    <p>Chercher par nom : <input 
                            @input="chercherRestaurants()" 
                            type="text" 
                            v-model="nomRestauRecherche"
                          ></p>
    <p>Nb de pages total : {{nbPagesTotal}}</p>
    <p>Nb restaurants par page : 
        <input 
            @change="getRestaurantsFromServer()"
            type="range"  min=2 max=1000 v-model="pagesize"
        >{{pagesize}}
    </p>
    <md-button class="md-raised" :disabled="page===0" @click="pagePrecedente()">Précédent</md-button>
    <md-button class="md-raised" :disabled="page===nbPagesTotal" @click="pageSuivante()">Suivant</md-button>
     &nbsp;Page courante : {{page}}
    <br>
    <md-table v-model="restaurants" md-sort="name" md-sort-order="asc">

        <md-table-row>
            <md-table-head>Nom</md-table-head>
            <md-table-head>Cuisine </md-table-head>
        </md-table-row>

         <md-table-row  
            slot="md-table-row" slot-scope="{ item, index }"
            :style="{backgroundColor:getColor(index)}"
            :class="{bordureRouge:(index === 2)}">   
            <md-table-cell md-label="Name" md-sort-by="name">{{item.name}}</md-table-cell>
            <md-table-cell md-label="Cuisine" md-sort-by="cuisine"> {{item.cuisine}}</md-table-cell>
            <md-table-cell md-label="Action">
                <router-link  :to="'/restaurant/' + item._id">[Détail d'un restaurant]</router-link>
            </md-table-cell>
            <md-table-cell md-label="Action">
                <md-button class="md-raised" @click="supprimerRestaurant(item)">Supprimer</md-button>
            </md-table-cell>

        </md-table-row>

    </md-table>
</div>
</template>

<script>
import _ from "lodash";
export default {
  name: 'ListeDesRestaurants',
  data: function() {
    return{
        restaurants: [],
        nom: '',
        cuisine: '',
        nbRestaurantsTotal:0,
        page:0,
        pagesize:10,
        nbPagesTotal:0,
        msg:"",
        nomRestauRecherche:""
    }    
  },
  mounted() {
            console.log("AVANT AFFICHAGE");
            this.getRestaurantsFromServer();
        },
        methods: {
            pagePrecedente() {
                if(this.page === 0) return;
                this.page--;
                this.getRestaurantsFromServer();
            },
            pageSuivante() {
                if(this.page === this.dernierePage) return;
                this.page++;
                this.getRestaurantsFromServer();
            },
            getRestaurantsFromServer() {
                let url = "http://localhost:8080/api/restaurants?";
                url += "page=" + this.page;
                url += "&pagesize=" + this.pagesize;
                url += "&name=" + this.nomRestauRecherche;

                fetch(url)
                    .then((responseJSON) => { //arrow function, conserve le bon "this"
                        //la réponse est en JSON, on la convertit avec la ligne suivante
                        responseJSON.json()
                        .then((resJS) => {
                            // Maintenant res est un vrai objet JavaScript
                            this.restaurants = resJS.data;
                            this.nbRestaurantsTotal = resJS.count;
                            this.nbPagesTotal = Math.round(this.nbRestaurantsTotal / this.pagesize);
                        });
                    })
                    .catch(function (err) {
                        console.log(err);
                });
            },
            chercherRestaurants: _.debounce(function() {
                    this.getRestaurantsFromServer();
            }, 300),
            supprimerRestaurant(r) {
                let url = "http://localhost:8080/api/restaurants/" + r._id;
            
                fetch(url, {
                    method: "DELETE",
                })
                .then((responseJSON) => {
                    responseJSON.json().then((resJS) => {
                        // Maintenant res est un vrai objet JavaScript
                        console.log(resJS.msg);
                        this.msg = resJS.msg;
                        //on rafraichi la vue
                        this.getRestaurantsFromServer();
                    });
                })
                .catch(function (err) {
                    console.log(err);
                });
            },
            ajouterRestaurant(event) {
                // Récupération du formulaire. Pas besoin de document.querySelector
                // ou document.getElementById puisque c'est le formulaire qui a généré
                // l'événement
                let form = event.target;

                // Récupération des valeurs des champs du formulaire
                // en prévision d'un envoi multipart en ajax/fetch
                let donneesFormulaire = new FormData(form);

                let url = "http://localhost:8080/api/restaurants";

                fetch(url, {
                    method: "POST",
                    body: donneesFormulaire,
                })
                .then((responseJSON) => {
                    responseJSON.json().then((resJS) => {
                        // Maintenant res est un vrai objet JavaScript
                        console.log(resJS.msg);
                        this.msg = resJS.msg;
                        //on rafraichi la vue
                        this.getRestaurantsFromServer();
                    });
                })
                .catch(function (err) {
                    console.log(err);
                });
                this.nom = "";
                this.cuisine = "";
            },
            getColor(index) {
                return (index % 2) ? 'lightBlue' : 'pink';
            }
        }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1{
    background-color:yellow;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
