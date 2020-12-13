<template>
<div class="flex flex-col">

  <div class="bg-white w-screen h-2.5"></div>
  
  <div class="w-screen h-12 bg-white space-x-4 mb-2.5 ">
    <button @click="goBack" class="w-8 h-8 ml-1 mt-2.5 mr-1 mb-1 inline-block" type="button">
      <img alt="Back" src="../assets/images/back-button.png">
      </button>
      <h1 class="h-12 inline-block align-middle text-2xl font-bold mb-2.5" >{{ message }}</h1> 
    
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
    <CardStackComponent
        v-for="(tag, index) in unlikedCategories"
        v-bind:key="index"
        v-bind:items="tag.items"
        v-bind:tag="tag"
        :style="{ zIndex: -index }"

        @listenerChild="listenerChild"
    />
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
    listenerChild(reply) {
      this.message = reply;
    }
  },
  computed: {
    localTags() {
      return this.tags
    },
    unlikedCategories() {
      // only returns the categories that have not been liked yet
      const newTags = this.localTags.filter(cat => cat.items.every(item => item.liked === false));
      console.log(newTags);
      return newTags;
    }
  },
  data: function() {
    return {
      tags: [
        {
        id: 1,
        category: 'cuisine',
        items: [
          {id: 1, title: 'Japanese', liked: false},
          {id: 2, title: 'Italian', liked: false},
          {id: 3, title: 'German', liked: false},
          {id: 3, title: 'Indian', liked: false},

        ]}, {
        id: 2,
        category: 'taste',
        items: [
          {id: 1, title: 'sweet', liked: false},
          {id: 2, title: 'spicy', liked: false},
          {id: 3, title: 'salty', liked: false},
        ]},
        {
        id: 2,
        category: 'carbs',
        items: [
          {id: 1, title: 'potatoe', liked: false},
          {id: 2, title: 'pasta', liked: false},
          {id: 3, title: 'bread', liked: false},
        ]}
      ],
      message: "Where are you, my Childddd?"
    }
  }
}
</script>

<style scoped>
</style>