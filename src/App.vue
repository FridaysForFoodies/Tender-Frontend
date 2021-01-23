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
// import setRecipePreferencesForUser from "@/graphql/PostPreferences.gql"
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

  // when app is created, do this
  created() {
    if (!this.isAuthenticated) {
      this.$store.dispatch(
          'userStorage/authRequest',
          this.$apolloProvider.defaultClient,
          {root: true}
      );
    }

    this.$store.dispatch('settingsStorage/retrieveSettingsFromDB', this.$apolloProvider.defaultClient);
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters['userStorage/authenticationStatus'];
    }
  },
  methods: {
  },

  // when app is destroyed, do this
  destroyed() {
    this.$store.dispatch('settingsStorage/updateSettingsInDB', this.$apolloProvider.defaultClient);
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


