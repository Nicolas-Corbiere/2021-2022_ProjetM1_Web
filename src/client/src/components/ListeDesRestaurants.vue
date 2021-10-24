<template>
    <div class="bloc">
        <div class="bloc">

            <h2>{{msg}}</h2>
            <h2>restaurants.length</h2>
            <router-link  :to="'/'"><img src="../assets/miageLogo.png"></router-link>
            <div id="filtre">
                <div class="md-layout md-gutter">
                    <div class="md-layout-item">
                        <md-field>
                            <label for="filtre">filtre</label>
                            <md-select name="filtre" id="filtre" v-model="filtre" md-dense :disabled="sending">
                                <md-option value="name">Name</md-option>
                                <md-option value="cuisine">Cuisine</md-option>
                                <md-option value="borough">Ville</md-option>
                            </md-select>
                        </md-field>
                    </div>
                </div>
                <input @input="chercherRestaurants()" type="text" v-model="restauRecherche">
            </div>
            
        </div>
        <div class="bloc">
            <h1>Nombre de restaurants : {{nbRestaurantsTotal}}</h1>
        
            <p>Nb de pages total : {{nbPagesTotal}}</p>
            <p>Nb restaurants par page : 
                <input 
                    @change="getRestaurantsFromServer()"
                    type="range"  min=2 max=1000 v-model="pagesize"
                >{{pagesize}}
            </p>

            &nbsp;Page courante : {{page}}
            <br>
        </div>
        <div class="bloc">
            <md-button id="precedent" class="md-raised" :disabled="page===0" @click="pagePrecedente()">Page précédente</md-button>
            <md-button id="suivant" class="md-raised" :disabled="page===nbPagesTotal" @click="pageSuivante()">Page suivante</md-button>
            <md-table v-if="restaurants.length>0" id="myTable" v-model="restaurants" md-sort="name" md-sort-order="asc">

                <!--<md-table-row>
                    <md-table-head>Nom</md-table-head>
                    <md-table-head>Cuisine </md-table-head>
                    <md-table-head>Ville </md-table-head>
                </md-table-row>-->

                <md-table-row  
                    slot="md-table-row" slot-scope="{ item, index }"
                    :style="{backgroundColor:getColor(index)}"
                    :class="{bordureRouge:(index === 2)}">   
                    <md-table-cell md-label="Name" md-sort-by="name">{{item.name}}</md-table-cell>
                    <md-table-cell md-label="Cuisine" md-sort-by="cuisine"> {{item.cuisine}}</md-table-cell>
                    <md-table-cell md-label="Ville" md-sort-by="Ville"> {{item.borough}}</md-table-cell>
                    <md-table-cell md-label="Détails">
                        <router-link  :to="'/restaurant/' + item._id"><img id="details" src="../assets/details.png"></router-link>
                    </md-table-cell>
                    <md-table-cell md-label="Supprimer">
                        <img id="delete" src="../assets/delete.png" @click="supprimerRestaurant(item)">
                    </md-table-cell>
                </md-table-row>
                
            </md-table>
            <h2 v-else id="message">Aucun restaurant trouvé ...</h2>
        </div>
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
        borough: '',
        nbRestaurantsTotal:0,
        page:0,
        pagesize:10,
        nbPagesTotal:0,
        msg:"",
        restauRecherche:"",
        filtre:"name"
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
                if(this.filtre == "cuisine"){
                    url += "&cuisine=" + this.restauRecherche;
                }
                else if(this.filtre =="borough"){
                    url += "&borough=" + this.restauRecherche;
                }
                else{
                    url += "&name=" + this.restauRecherche;
                }
                console.log("url :", url);
                console.log("filtre :", this.filtre);
                console.log("restauRecherche", this.restauRecherche);
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
            getColor(index) {
                return (index % 2) ? 'lightBlue' : 'pink';
            }
        }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1{
    text-align:center;
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

#delete{
    height:20px;
    width:20px;
}
#details{
    height:20px;
    width:20px;
}
#precedent{
    float:left;
    margin-left:100px;
    border: 2px solid black;
}
#suivant{
    float:right;
    margin-right:100px;
    border: 2px solid black;
}

#search{
    float:right;
}
.bloc{
    border: 2px solid black;
    padding-left:10px;
    padding-top:10px;
    padding-right:10px;
    padding-bottom:10px;
}
#filtre{
    float:right;
    padding-right:200px;
    height:100px;
    width:20px;
}
#message{
    text-align:center;
}
</style>
