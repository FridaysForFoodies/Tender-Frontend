<template>

  <div id="app" class="flex flex-col h-screen">
    <img v-if="showSplashscreen" class="z-10 absolute h-full object-cover" src="./assets/images/splashscreen.svg"/>
    <router-view class="flex-1 regal-blue"/>
    <!-- Content -->
       <!-- Header -->

    <!-- Navigation -->
    <Navigation/>
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
      splashscreenTimeRunning: true   
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
    setTimeout(function(){ 
      this.splashscreenTimeRunning = false }
      .bind(this), 4000)
  },
  computed: {
    isAuthenticated(){
      return this.$store.getters['userStorage/authenticationStatus'];
    },
    firstApolloLoaded(){
      return this.$store.getters['splashscreenStorage/firstApolloLoaded'];
    },
    showSplashscreen(){
      return this.splashscreenTimeRunning || !this.firstApolloLoaded
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


