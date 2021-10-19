<template>
  <div>
    <h1>Détail du restaurant qui a pour id : {{ id }}</h1>

    <p class="informarion">
      <b>Nom</b> : {{ restaurant.name }} &nbsp;&nbsp;&nbsp;&nbsp;
      <b> Cusine</b> : {{ restaurant.cuisine }} &nbsp;&nbsp;&nbsp;&nbsp;
      <b> Ville </b> : {{ restaurant.borough }}
    </p>

    <div
      class="phone-viewport"
      id="photo"
      ref="photo"
      :style="{ backgroundImage: 'url(\'' + restaurant.img + '\')' }"
    >
      <md-bottom-bar md-sync-route>
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
      </md-bottom-bar>
    </div>

    <div class="wrapper">
      <ejs-maps :zoomSettings="zoomSettings"  :centerPosition= 'centerPosition'>
        <e-layers>
          <e-layer :layerType="layerType"> </e-layer>
        </e-layers>
      </ejs-maps>
    </div>
  </div>
</template>


<script>
import Vue from "vue";
import { MapsPlugin /*, MapsComponent*/, Zoom } from "@syncfusion/ej2-vue-maps";
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
      restaurant: null,
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
    };
  },
  provide: {
    maps: [Zoom],
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
        this.centerPosition.latitude = this.restaurant.address.coord[0]
        this.centerPosition.longitude = this.restaurant.address.coord[1]
        console.log(this.centerPosition.latitude)
        console.log(this.centerPosition.longitude)
      });
  },
  methods: {
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
  height: 800px;
  display: inline-flex;
  align-items: flex-end;
  overflow: hidden;
  border: 1px solid rgba(#000, 0.26);
  background: rgba(#000, 0.06);
  background-size: 150%;
}
.informarion {
  font-size: 2em;
}
.wrapper {
  max-width: 400px;
  margin: 0 auto;
}
</style>