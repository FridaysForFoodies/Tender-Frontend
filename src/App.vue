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
// import gql from "graphql-tag"

export default {
  name: 'App',
  data() {
    return {
      // optionally initialize your apollo data
      // settingsObj: null,
      // uid: 'default value'
    }
  },
  components: {
    Navigation
  },
  // apollo: {
  //   uid: {
  //     query: gql`
  //       query {
  //         generateUser {
  //           uuid
  //         }
  //       }
  //     `,
  //   },
  //   settingsObj: {
  //     query: gql`
  //       query {
  //         recipePreferencesForUser {
  //           vegan
  //           vegetarian
  //           gluten
  //           dairy
  //           cookingTime
  //         }
  //       }
  //     `,
  //   },
  // },
  // when app is created, do this
  created() {
    if (!this.isAuthenticated) {
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
      console.log("App.initSettings")

      //
      // console.log("init from query: ", this.uid)
      // console.log("init from query: ", this.settingsObj)

      // this.$store.dispatch('settingsStorage/retrieveUser', this.$apolloProvider.defaultClient);

      this.$store.dispatch('settingsStorage/retrieveSettings', this.$apolloProvider.defaultClient);

    //   this.$apollo.query({
    //     query: QUERY_SETTINGS,
    // }).then(result => console.log('got data: ', result))
    //
    //
    //   const response = this.$apollo.query({
    //     query: getSettings
    //   })
    //   const settingsObj = response.data.recipePreferencesForUser
    //   // this.$store.state["settingsStorage/settingsVegan"] =
    }
  },
  // when app is destroyed, do this
  destroyed() {
  // write settings from store to db
  //   this.$apollo.mutate({
  //     mutation: "setRecipePreferencesForUser",
  //     variables: {
  //       preferences: {
  //         user: this.$store.state["userStorage/authenticationToken"], //localStorage.getItem("tender-user-token"),
  //         vegan: this.vegan,
  //         vegetarian: this.vegetarian,
  //         gluten: this.glutenfree,
  //         dairy: this.dairyfree,
  //         cookingTime: this.value
  //       }
  //     }
  //   })
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


