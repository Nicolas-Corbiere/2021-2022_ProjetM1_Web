<template>
  <div>
    <h1>Détail du restaurant qui a pour id : {{id}}</h1>
    <ul>
        <li>Nom : {{restaurant.name}}</li>
        <li>Cusine : {{restaurant.cuisine}}</li>
        <li>Ville : {{restaurant.borough}}</li>
    </ul>
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
  }
}
</script>


<style>

</style>