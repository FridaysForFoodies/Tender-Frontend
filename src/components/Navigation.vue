<template>
  <nav id="nav" class="w-screen block bg-transparent">
    <div class="flex flex-row items-center justify-evenly h-20 inner-nav bg-secondary bottom-0 fixed w-screen">

      <router-link :to="{ name: 'Favourites' }" active-class="text-yellow-400">
        <font-awesome-icon icon="heart" class="text-4xl"/>
      </router-link>

      <router-link :to=" { name: 'Home'}" class="mb-5 rounded-full bg-darkGrey border-8 border-solid border-secondary h-24 w-24 flex items-center justify-center">
            <img class="w-3/4" src="../assets/images/tenderLogo.png"/>
      </router-link>

      <router-link :to=" { name: 'Settings'}" active-class="text-yellow-400">
        <font-awesome-icon icon="cog" class="text-4xl tabColor"/>
      </router-link>

    </div>
  </nav>
</template>

<script>
export default {
  name: "Navigation"
  }
</script>

<style scoped>
  .inner-nav {
    filter: drop-shadow(0px -2px 5px rgba(51, 51, 51, .2));
  }
</style>