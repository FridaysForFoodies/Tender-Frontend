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

  <div class="relative w-screen flex-1 px-6">
    <CardStackComponent
        v-for="(tag, index) in openCategories"
        v-bind:key="index"
        v-bind:items="tag.items"
        v-bind:category="tag.category"
        :style="{ zIndex: -index }"

        @liked="setCategoryLiked"
        @disliked="categoryIsUnliked"  
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
    categoryIsUnliked(items, item) {
      // need to discuss what happens if all items of category have been disliked
      let lastElement = items[items.length - 1];
      if(lastElement.title === item.title) {
        item.liked = true;
      }
    },
    setCategoryLiked(category, subcategory) {
      // only temp solution until final data model is available
      let tagIndex = this.tags.findIndex(tag => tag.category === category);
      let itemIndex = this.tags[tagIndex].items.findIndex(item => item.id === subcategory.id);
      this.tags[tagIndex].items[itemIndex].liked = true;
    }
  },
  computed: {
    openCategories() {
      // returns all elements in tags array, where all items in items array have not been liked yet
      return this.tags.filter(tag => tag.items.every(item => item.liked === false));
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
          {id: 4, title: 'Indian', liked: false},
        ]}, 
        {
        id: 2,
        category: 'flavour',
        items: [
          {id: 1, title: 'sweet', liked: false},
          {id: 2, title: 'spicy', liked: false},
          {id: 3, title: 'salty', liked: false},
        ]},
        {
        id: 3,
        category: 'carbs',
        items: [
          {id: 1, title: 'potatoe', liked: false},
          {id: 2, title: 'pasta', liked: false},
          {id: 3, title: 'bread', liked: false},
        ]},
        {
        id: 4,
        category: 'season',
        items: [
          {id: 1, title: 'summer', liked: false},
          {id: 2, title: 'winter', liked: false},
          {id: 3, title: 'spring', liked: false},
          {id: 4, title: 'autumn', liked: false},
        ]},
        {
        id: 5,
        category: 'diet',
        items: [
          {id: 1, title: 'low carb', liked: false},
          {id: 2, title: 'protein boost', liked: false},
          {id: 3, title: 'low fat', liked: false},
          {id: 4, title: 'autumn', liked: false},
        ]}
      ],
      message: "Swipe for your Taste!"
    }
  }
}
</script>

<style scoped>
</style>