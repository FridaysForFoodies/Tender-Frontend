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

    this.readSettingsFromDbToStore()
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['userStorage/authenticationStatus'];
    }
  },
  methods: {
    readSettingsFromDbToStore() {
      console.log("App.initSettings")

      // populate db with default values
      this.updateSettingsFromStoreToDb()

      // this.$store.dispatch('settingsStorage/retrieveUser', this.$apolloProvider.defaultClient);

      this.$store.dispatch('settingsStorage/retrieveSettings', this.$apolloProvider.defaultClient);
    },
    updateSettingsFromStoreToDb() {
      this.$store.dispatch('settingsStorage/updateSettingsInDb', this.$apolloProvider.defaultClient);
    }
  },

  // when app is destroyed, do this
  destroyed() {
    // do we really need this since we do not have accounts?
    // this.updateSettingsFromStoreToDb()
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


