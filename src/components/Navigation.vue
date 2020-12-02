<template>
  <nav id="nav" class="w-screen block fixed inset-x-0 bottom-0 z-10 bg-white">
    <div class="flex flex-row items-center justify-around inner-nav bottom-0 fixed w-screen">
      <div>Home</div>
      <div class="tender-logo">Home</div>
      <div>Home</div>
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

  .inner-nav, .tender-logo {
   /* -webkit-box-shadow: 0px -5px 17px -12px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px -5px 17px -12px rgba(0,0,0,0.75);
    box-shadow: 0px -5px 17px -12px rgba(0,0,0,0.75);*/
  }

  .inner-nav {
    height: 85px;
    background: #DEDACA;
  }

  .tender-logo {
    height: 120px;
    width: 120px;
    border-radius: 50%;
    background: #DEDACA;
  }
</style>