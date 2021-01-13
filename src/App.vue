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
import gql from "graphql-tag"

export default {
  name: 'App',
  data() {
    return {
      // optionally initialize your apollo data
      // settingsObj: null
      uid: 'default value'
    }
  },
  components: {
    Navigation
  },
  apollo: {
    settingsObj: {
      query: gql`
        query {
          recipePreferencesForUser {
            vegan
            vegetarian
            gluten
            dairy
            cookingTime
          }
        }
      `,
    },
    uid: {
      query: gql`
        query {
          generateUser {
            uuid
          }
        }
      `,
    },
  },
  // when app is created, do this
  created() {
    if (!this.isAuthenticated) {
      console.log("test userStorage/authRequest");
      this.$store.dispatch(
          'userStorage/authRequest',
          this.$apolloProvider.defaultClient,
          {root: true}
      );
    }

    // read settings from db into store
    console.log("init from query: ", this.uid)
    console.log("init from query: ", this.settingsObj)
    // this.initSettings()

  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['userStorage/authenticationStatus'];
    }
  },
  methods: {
    // initSettings() {
    //   console.log("initSettings")
    //
    //   this.$apollo.query({
    //     query: QUERY_SETTINGS,
    //     header: {
    //       authorization: this.$store.state["userStorage/authenticationToken"]
    //     }
    // }).then(result => console.log('got data: ', result))


    //   const uid = this.$store.state["userStorage/authenticationToken"]
    //   console.log("uid = " + uid)
    //   const response = this.$apollo.query({
    //     header: '"authorization" : "' + uid,
    //     query: getSettings
    //   })
    //   const settingsObj = response.data.recipePreferencesForUser
    //   console.log("ZewaAPP: " + settingsObj)
    //   // this.$store.state["settingsStorage/settingsVegan"] =
    // }
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


