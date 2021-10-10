<template>
  <div>
    <h1>Détail du restaurant qui a pour id : {{id}}</h1>

    <p> Nom : {{restaurant.name}} &nbsp;&nbsp;&nbsp;&nbsp;
        Cusine : {{restaurant.cuisine}} &nbsp;&nbsp;&nbsp;&nbsp;
        Ville : {{restaurant.borough}} </p>

    <div class="phone-viewport" id="photo">
      <md-bottom-bar md-sync-route>
        <md-bottom-bar-item @click="changeBG()" exact md-label="Home" md-icon="home"></md-bottom-bar-item>
        <md-bottom-bar-item md-label="Posts" md-icon="/assets/icon-whatshot.svg"></md-bottom-bar-item>
        <md-bottom-bar-item md-label="Favorites" md-icon="favorite"></md-bottom-bar-item>
      </md-bottom-bar>
    </div>

  </div>
</template>


<script>
export default {
  name: 'Restaurant',
  props: {
  },
  computed: {
      id(){
          return this.$route.params.r
      }
  },
  data: function(){
      return{
          restaurant: null
      }
  },
  mounted(){
      console.log("Avant affichage, on pourra faire un fetch...");
      console.log("ID = " + this.id)
      let url = "http://localhost:8080/api/restaurants/" + this.id;
      fetch(url)
      .then(reponse => {
          return reponse.json();
      }).then(data =>{
          console.log(data.restaurant.name)
          this.restaurant = data.restaurant;
      })
  },
  methods : {
      changeBG() {
          let elem = document.getElementById('photo');
          elem.style.background = "red"
      }
  }
}
</script>


<style>

.phone-viewport {
    width: 500px;
    height: 500px;
    display: inline-flex;
    align-items: flex-end;
    overflow: hidden;
    border: 1px solid rgba(#000, .26);
    background: rgba(#000, .06);
  }
</style>