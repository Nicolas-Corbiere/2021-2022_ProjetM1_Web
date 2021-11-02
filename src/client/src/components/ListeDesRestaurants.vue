<template>
    <div class="bloc">
        <div class="bloc">

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
                <br><br>
            <h1>Nombre de restaurants : {{nbRestaurantsTotal}}</h1>
            <br>
            <div class="container">
                <p>Nb de pages total : {{nbPagesTotal}}</p>
                <p>Nb restaurants par page : 
                    <input 
                        @change="getRestaurantsFromServer()"
                        type="range"  min=2 max=500 v-model="pagesize"
                    >{{pagesize}}
                </p>
            </div>
            <br>
  
            <div class="container">
                <md-button class="md-raised page2" :disabled="page===0 || nbRestaurantsTotal==0" @click="firstPage()">Page 0</md-button>
                <md-button class="md-raised page" :disabled="page===0 || nbRestaurantsTotal==0" @click="pagePrecedente()">Page précédente</md-button>
                <p>Page courante : {{page}}</p>
                <md-button class="md-raised page" :disabled="page===nbPagesTotal-1 || nbRestaurantsTotal<=10" @click="pageSuivante()">Page suivante</md-button>
                <md-button class="md-raised page2" :disabled="page===nbPagesTotal-1 || nbRestaurantsTotal<=10" @click="lastPage()">Page {{nbPagesTotal}}</md-button>
            </div>    
            <br><br>
            <h2>{{msg}}</h2>
            <br>
            <md-table v-if="nbRestaurantsTotal>0" id="myTable" v-model="restaurants" md-sort="name" md-sort-order="asc">

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
            <h2 v-else id="message">Aucun restaurant ne correspond à votre recherche</h2>
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
        filtre:"name",
    }    
  },
  mounted() {
            console.log("AVANT AFFICHAGE");
            this.getRestaurantsFromServer();
        },
        methods: {
            firstPage() {
               if(this.page === 0) return;
                this.page = 0;
                this.getRestaurantsFromServer();
            },
            pagePrecedente() {
                if(this.page === 0) return;
                this.page--;
                this.getRestaurantsFromServer();
            },
            pageSuivante() {
                if(this.page === this.nbPagesTotal) return;
                this.page++;
                this.getRestaurantsFromServer();
            },
            lastPage() {
                if(this.page === this.nbPagesTotal) return;
                this.page = this.nbPagesTotal-1;
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
                            console.log(this.nbRestaurantsTotal);
                            console.log(this.pagesize);
                            console.log(Math.round(this.nbRestaurantsTotal / this.pagesize));
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
                        let index = resJS.msg.indexOf("réussie");    
                        if(index !== -1){
                            this.msg = "Le restaurant a été supprimé avec succès !";
                        } else{
                            this.msg = "La suppression du restaurant a échoué ...";
                        }
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
  font-family: "Trebuchet MS", sans-serif;
  font-size: 30px;
  text-align:center;
  text-transform: uppercase;
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

input{
 border: 3px black solid;
}

#delete{
    height:20px;
    width:20px;
}
#details{
    height:20px;
    width:20px;
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

.container {
  width: 100%;
  border: 1px solid black;
  border-radius: .5em;
  display: flex;
  justify-content: space-between;
}

.page{
    border:3px black solid;
    width:300px;
}

.page2{
    border:3px black solid;
    width:10px;
}

p{
  font-family: "Trebuchet MS", sans-serif;
  font-size: 30px;
}
</style>
