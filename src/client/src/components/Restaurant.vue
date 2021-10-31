<template>
  <div>
    <br>
    <h1>Détail du restaurant qui a pour id : {{ id }}</h1>
    <br>
    <p class="information">
      <b>Nom</b> : {{ restaurant.name }} &nbsp;&nbsp;&nbsp;&nbsp;
      <b> Cusine</b> : {{ restaurant.cuisine }} &nbsp;&nbsp;&nbsp;&nbsp;
      <b> Ville </b> : {{ restaurant.borough }}
    </p>
    <br>
    <br>  

    <div
      class="phone-viewport"
      id="photo"
      ref="photo"
      :style="{ backgroundImage: 'url(\'' + restaurant.img + '\')' }"
    >
      <!--<md-bottom-bar md-sync-route>
        <md-bottom-bar-item
          @click="changeBG(1)"
          exact
          md-type="shift"
          md-label="Image"
          md-icon="image"
          style="max-width: 30%; min-width: 30%"
        ></md-bottom-bar-item>
        <md-bottom-bar-item
          @click="changeBG(2)"
          md-type="shift"
          md-label="Map"
          md-icon="map"
          style="max-width: 40%; min-width: 40%"
        ></md-bottom-bar-item>
        <md-bottom-bar-item
          @click="changeBG(3)"
          md-type="shift"
          md-label="Menu"
          md-icon="restaurant_menu"
          style="max-width: 30%; min-width: 30%"
        ></md-bottom-bar-item>
      </md-bottom-bar>-->
    </div>

    <div class="wrapper">
      <ejs-maps :zoomSettings="zoomSettings"  :centerPosition= 'centerPosition'>
        <e-layers>
          <e-layer  :layerType="layerType" :markerSettings='markerSettings'></e-layer>
        </e-layers>
      </ejs-maps>
    </div>
    <br>
      <table>
      <tr>
        <h2>Entree</h2>
      </tr>
      <tbody>
        <tr v-for="value in entree"
        v-bind:item="value"
        v-bind:index="value"
        v-bind:key="value">
          <td> {{ value }} </td>
        </tr>
      </tbody>
    </table>
    <br>
    <table>
      <tr>
        <h2>Plat </h2>
      </tr>
      <tbody>
        <tr v-for="value in plat"
        v-bind:item="value"
        v-bind:index="value"
        v-bind:key="value">
          <td> {{ value }} </td>
        </tr>
      </tbody>
    </table>
    <br>
    <table>
      <tr>
        <h2>Dessert</h2> 
      </tr>
      <tbody>
        <tr v-for="value in dessert"
        v-bind:item="value"
        v-bind:index="value"
        v-bind:key="value">
          <td> {{ value }} </td>
        </tr>
      </tbody>
    </table>

    

  </div>
</template>


<script>
import Vue from "vue";
import { MapsPlugin /*, MapsComponent*/, Zoom , Marker } from "@syncfusion/ej2-vue-maps";
import { Menu } from "../../public/js/Menu";
//import { world_map } from './world-map.js';
Vue.use(MapsPlugin);

export default {
  name: "Restaurant",
  props: {},
  computed: {
    id() {
      return this.$route.params.r;
    },
  },
  data: function () {
    return {
      // -- Restaurant
      restaurant: null,

      // -- Menue 
      entree:null,
      plat:null,
      desesrt:null,

      // -- Map
      zoomSettings: {
        enable: true,
        //toolBars: ["Zoom", "ZoomIn", "ZoomOut", "Pan", "Reset"],
        zoomFactor: 4
      },
      centerPosition: {
          latitude: 0,
          longitude: 0,
       },
      layerType: "OSM",

      // -- Marker
       markerSettings: [{
        dataSource: [
            { latitude: 0, longitude: 0, city: 'New York' }],
        visible:true,
        shape: 'Circle',
        fill: 'white',
        width: 25,
        animationDuration:0,
            border: { width: 2, color: '#333' }
        }]
    };
  },
  provide: {
    maps: [Marker,Zoom]
  },
  mounted() {

    console.log("Avant affichage, on pourra faire un fetch...");
    console.log("ID = " + this.id);
    let url = "http://localhost:8080/api/restaurants/" + this.id;
    fetch(url)
      .then((reponse) => {
        return reponse.json();
      })
      .then((data) => {
        console.log(data.restaurant)
        this.restaurant = data.restaurant;
        this.setCoord(this.restaurant.address.coord[0],this.restaurant.address.coord[1])
        this.setImg()
        let menue = new Menu();
        this.entree = menue.getEntree();
        this.plat = menue.getPlat();
        this.dessert = menue.getDessert();

        console.log(this.entree)
        console.log(this.plat)
        console.log(this.dessert)
      });
  },
  methods: {
    setImg(){
      console.log(this.restaurant.img)
      if(this.restaurant.img === undefined ) {
        this.restaurant.img = 'https://upload.wikimedia.org/wikipedia/commons/1/10/Devanture_du_restaurant_H%C3%A9l%C3%A8ne_Darroze.jpg';
      }
    },
    setCoord(longi,lati) {
        this.centerPosition.latitude = lati;
        this.centerPosition.longitude = longi;
        this.markerSettings[0].dataSource[0].latitude = lati;
        this.markerSettings[0].dataSource[0].longitude = longi;
        this.markerSettings[0].dataSource[0].city = this.restaurant.borough;
    },
    changeBG(number) {
      let elem = document.getElementById("photo");
      this.resetPhoto(elem);
      if (number === 1) {
        this.setImage(elem);
      } else if (number === 2) {
        elem.style.background = "red";
      } else {
        elem.style.background = "red";
      }
    },
    resetPhoto(elem) {
      elem.style.background = "";
      elem.style.backgroundImage = "";
    },
    setImage(elem) {
      elem.style.backgroundImage = "url('" + this.restaurant.img + "')";
    },
  },
};
</script>


<style>
.phone-viewport {
  width: 800px;
  height: 600px;
  display: inline-flex;
  align-items: flex-end;
  overflow: hidden;
  border: 1px solid rgba(#000, 0.26);
  background: rgba(#000, 0.06);
  background-size: 800px 700px;
}
.information {
  font-size: 2em;
}
.wrapper {
  max-width: 400px;
  margin: 0 auto;
}
</style>