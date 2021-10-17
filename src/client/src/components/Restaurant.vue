<template>
  <div>
    <h1>Détail du restaurant qui a pour id : {{id}}</h1>

    <p> Nom : {{restaurant.name}} &nbsp;&nbsp;&nbsp;&nbsp;
        Cusine : {{restaurant.cuisine}} &nbsp;&nbsp;&nbsp;&nbsp;
        Ville : {{restaurant.borough}} </p>

    <div class="phone-viewport" id="photo">
      <md-bottom-bar md-sync-route>
        <md-bottom-bar-item @click="changeBG(1)" exact md-label="Map" md-icon="map"></md-bottom-bar-item>
        <md-bottom-bar-item @click="changeBG(2)" md-label="Image" md-icon="image"></md-bottom-bar-item>
        <md-bottom-bar-item @click="changeBG(3)" md-label="Menu" md-icon="restaurant_menu"></md-bottom-bar-item>
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
      changeBG(number) {
          let elem = document.getElementById('photo');

        if (number === 1) {
          elem.style.backgroundImage = "";
          elem.style.background = "red"
        }
        else if (number === 2){
          elem.style.backgroundImage = "url('" + this.restaurant.img + "')"
          elem.style.background = ""
          console.log(this.restaurant.img)
        }
        else {
          elem.style.backgroundImage = "";
          elem.style.background = "red"
        }
          
      }
  }
}
</script>


<style>
.photo {
  background-image: url('https://upload.wikimedia.org/wikipedia/commons/1/10/Devanture_du_restaurant_H%C3%A9l%C3%A8ne_Darroze.jpg');
}
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