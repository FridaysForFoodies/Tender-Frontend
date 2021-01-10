<template>

  <div id="app" class="flex flex-col h-screen">

    <router-view class="flex-1 regal-blue"/>
    <!-- Content -->
    <!-- Header -->

    <!-- Navigation -->
    <Navigation/>
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue'
import gql from "graphql-tag";

export default {
  name: 'App',
  components: {
    Navigation
  },
  apollo: {

  },
  created() {
    if (!this.isAuthenticated) {
      console.log("test");
      this.$store.dispatch(
          'userStorage/authRequest',
          this.$apolloProvider.defaultClient,
          {root: true}
      );
    }
    // read settings from db into store
    this.initSettings()
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['userStorage/authenticationStatus'];
    }
  },
  methods: {
    initSettings() {
      console.log("initSettings")
      const getSettings = gql`
        query {
          recipePreferencesForUser {
            vegan
            vegetarian
            gluten
            dairy
            cookingTime
          }
        }
      `
      const uid = this.$store.state["userStorage/authenticationToken"]
      console.log("uid = " + uid)
      const response = this.$apollo.query({
        header: '"authorization" : "' + uid,
        query: getSettings
      })
      const settingsObj = response.data.recipePreferencesForUser
      console.log("ZewaAPP: " + settingsObj)
      // this.$store.state["settingsStorage/settingsVegan"] =
    }
  },
  destroyed() {
  //  write settings from store to db
    this.$apollo.mutate({
      mutation: "setRecipePreferencesForUser",
      variables: {
        preferences: {
          user: this.$store.state["userStorage/authenticationToken"], //localStorage.getItem("tender-user-token"),
          vegan: this.vegan,
          vegetarian: this.vegetarian,
          gluten: this.glutenfree,
          dairy: this.dairyfree,
          cookingTime: this.value
        }
      }
    })
  }
}

</script>

<style>

#app {
  box-sizing: border-box;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #333333;
}
</style>


