<template>
<div>

  <div class="bg-white w-screen h-2.5"></div>
  
  <div class="flex w-screen h-12 bg-white space-x-4 mb-2.5">
    <button @click="goBack" class="w-12 h-12 m-1" type="button">
      <img alt="Back" src="../assets/images/back-button.png">
      </button>
      <h2 class="inline-block align-middle h-12 text-2xl font-bold" >Swipe for your taste!</h2> 
  </div>
      
    
  <div class="relative m-2.5 h-8">
    <div class="overflow-hidden h-1.5 mb-4 flex bg-secondary">
      <div style="width:25%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center align-middle bg-primary">
      </div>
    </div>
  </div> 

<!-- Hier muss noch die Karte rein...  dafür wollte ich gerne ein Card component erstellen-->
  <div class="fixed h-4/6 w-4/5 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg bg-gray-100">
  </div>

  <div class="absolute w-screen h-16 text-center bottom-40 items-stretch" >    
    <button class="w-16 h-auto mr-12">
      <img class="transform rotate-180" alt="Dislike" src="../assets/images/dislike.png">
    </button>
     <button class="w-16 h-auto ml-12">
      <img alt="Like" src="../assets/images/like.png">
    </button>
  </div>
  
  </div>
</template>

<script>

export default {
  name: "FoodTender",
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    like() {
      console.log("like tapped")
    },
    dislike() {
      console.log("dislike tapped")
    }
  },
}
</script>

<style scoped>
</style>