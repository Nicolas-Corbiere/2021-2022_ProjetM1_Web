<template>
  <div id="app">
    <router-link tag="button" to="/">Home</router-link>
    <router-link tag="button" to="/restaurant">Détail d'un restaurant</router-link>
    <router-link tag="button" to="/hello">HelloWorld</router-link>
    <router-link tag="button" to="/ajout">Ajouter un restaurant</router-link>    
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App',
    components: {
    }
  }
</script>

<style>
button:active {
  background-color: #33E2FF;
}

button{
  width: 200px;
  height: 50px;
  font-family: "Arial Black";
  border-radius: 10px;
}

/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
