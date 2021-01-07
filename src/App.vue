<template>

  <div id="app" class="flex flex-col h-screen">

    <router-view class="flex-1 regal-blue"/>
    <!-- Content -->
       <!-- Header -->

    <!-- Navigation -->

    <button v-on:click="logUser()">Test</button>
    <Navigation />
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue'

export default {
  name: 'App',
  components: {
    Navigation
  },
  data () {
    return {
      // Initialize your apollo data
      uuid: '',
    }
  },
  created() {
    this.$store.dispatch('userStorage/authRequest', this.$apolloProvider.defaultClient, { root: true });
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


