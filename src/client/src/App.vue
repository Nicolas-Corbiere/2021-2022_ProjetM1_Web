<template>
  <div id="app">
    <v-card class="overflow-hidden">
    <v-app-bar 
    absolute 
    dark>

        <v-tabs align-with-title>
            <router-link tag="v-tab" to="/">Home</router-link>
            <router-link tag="v-tab" to="/restaurant">Détail Restaurant</router-link>
            <router-link tag="v-tab" to="/hello">Hello</router-link>
            <router-link tag="v-tab" to="/ajout">Ajout Restaurant</router-link>
        </v-tabs>

        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
    </v-app-bar>
    <v-container style="height: 80px;"></v-container>
  </v-card>  
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

button:hover {
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
