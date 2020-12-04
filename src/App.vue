<template>
  <div id="app" class="h-full">
    <router-view />   
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
}
</script>