<template>
  <nav id="nav" class="w-screen block bg-transparent">
    <div class="flex flex-row items-center justify-evenly inner-nav bottom-0 fixed w-screen">

      <router-link :to="{ name: 'Favourites' }" active-class="text-yellow-400">
        <font-awesome-icon icon="heart" class="text-4xl"/>
      </router-link>

      <router-link :to=" { name: 'Home'}" class="tender-logo flex items-center justify-center">
        <svg width="70" height="70" viewBox="0 0 67 67" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <rect width="67" height="67" fill="url(#pattern0)"/>
          <defs>
            <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
              <use xlink:href="#image0" transform="scale(0.00666667)"/>
            </pattern>
            <image id="image0" width="150" height="150" xlink:href="data:image/png;base64,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"/>
          </defs>
        </svg>
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
  #nav {
    height: 120px;
  }

  .inner-nav {
    filter: drop-shadow(0px -2px 5px rgba(51, 51, 51, .2));
  }

  .inner-nav {
    height: 85px;
    background: #DEDACA;
  }

  .tender-logo {
    height: 105px;
    width: 105px;
    border-radius: 50%;
    border: solid 10px #dedaca;
    background: #333333;
    margin-bottom: 20px;
  }
</style>