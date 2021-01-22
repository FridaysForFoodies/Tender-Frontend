<template>

  <div id="app" class="flex flex-col h-screen">

    <router-view class="flex-1 regal-blue"/>
    <!-- Content -->
       <!-- Header -->

    <!-- Navigation -->
    <Navigation v-if="showNavigation" />
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue'

export default {
  name: 'App',
  components: {
    Navigation
  },
  data() {
    return {
      showNavigation: false
    }
  },
  created() {
    if (!this.isAuthenticated) {
      this.$store.dispatch(
          'userStorage/authRequest',
          this.$apolloProvider.defaultClient,
          { root: true }
      );
    }
    setTimeout(function(){ this.showNavigation = true }.bind(this), 4000)
  },
  computed: {
    isAuthenticated(){
      return this.$store.getters['userStorage/authenticationStatus'];
    }
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


