<template>
<div class="flex flex-col">

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