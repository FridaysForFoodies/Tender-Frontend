<template>
<div class="flex flex-col">

  <div class="bg-white w-screen h-2.5"></div>
  
  <div class="w-screen h-12 bg-white space-x-4 mb-2.5 ">
    <button @click="goBack" class="w-8 h-8 ml-1 mt-2.5 mr-1 mb-1 inline-block" type="button">
      <img alt="Back" src="../assets/images/back-button.png">
      </button>
      <h1 class="h-12 inline-block align-middle text-2xl font-bold mb-2.5" >Swipe for your taste!</h1> 
  </div>
      
    
  <div class="relative m-2.5 h-8">
    <div class="overflow-hidden h-1.5 mb-4 flex bg-secondary">
      <div style="width:25%" class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center align-middle bg-primary">
      </div>
    </div>
  </div> 

  <!-- Card Container -->
  <div class="relative w-screen flex-1 px-6">

    <!-- Hier muss noch die Karte rein...  dafür wollte ich gerne ein Card component erstellen-->
  <CardStackComponent/>

  </div>


  
  </div>
</template>

<script>
import CardStackComponent from '../components/tender/CardStackComponent.vue';

export default {
  name: "FoodTender",
  components: {
    CardStackComponent
  },
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
  data: function() {
    return {
      tags: [{
        cuisine: [
          {id: 1, title: 'Japanese'},
          {id: 2, title: 'Italian'},
          {id: 3, title: 'German'},
        ],
        taste: [
          {id: 1, title: 'Sweet'},
          {id: 2, title: 'Salty'},
          {id: 3, title: 'Spicy'},
        ]
      }]
    }
  }
}
</script>

<style scoped>
</style>