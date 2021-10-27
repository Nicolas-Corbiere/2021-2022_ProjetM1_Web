<template>
  <div>
    <h2>{{msg}}</h2>

    <!--
    <form @submit.prevent="ajouterRestaurant($event)">
      <label>
        Nom : <input name="nom" type="text" required v-model="nom" />
      </label>
      <br>
      <label>
        Cuisine :
        <input name="cuisine" type="text" required v-model="cuisine" />
      </label>
      <br>
      <button class="md-raised">Ajouter</button>
    </form>
    -->

    <form
      novalidate
      class="md-layout"
      @submit.prevent="ajouterRestaurant($event)"
      autocomplete="off"
    >
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Nouveau restaurant : </div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="nom">Nom</label>
                <md-input name="nom" id="nom" v-model="form.nom" />
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="cuisine">Cuisine</label>
                <md-input name="cuisine" id="cuisine" v-model="form.cuisine" />
              </md-field>
            </div>
          </div>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="borough">Ville</label>
                <md-input name="borough" id="borough" v-model="form.borough" />
              </md-field>
            </div>
          </div>
        </md-card-content>

        <md-card-actions>
          <md-button type="submit" class="md-primary"
            >Ajout Restaurant</md-button
          >
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>


<script>
export default {
  name: "AjoutRestau",
  data: () => ({
    form: {
      nom: "",
      cuisine: "",
      borough: "",
    },
    msg: "",
  }),
  mounted() {
    console.log(this.form);
  },
  methods: {
    clearForm() {
      this.$reset();
      this.form.nom = "";
      this.form.cuisine = "";
      this.form.borough = "";
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
          });
        })
        .catch(function (err) {
          console.log(err);
        });

      this.form.nom = "";
      this.form.cuisine = "";
      this.form.borough = "";
    },
  },
};
</script>

<style>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
</style>