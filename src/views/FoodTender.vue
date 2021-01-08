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
      <div class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center align-middle bg-primary"
          v-bind:style="{ width: progress()}"
          style=""
      >
      </div>
    </div>
  </div> 

  <div class="relative w-screen flex-1 px-6">
      <CardComponent
        v-for="(item, index) in tenderTags"
        v-bind:key="index"
        v-bind:item="item"
        v-bind:itemIndex="index"
        :style="{ zIndex: -index }"

        @likedTag="liked"
        @dislikedTag="disliked"
    />
  </div> 
  
  </div>
</template>

<script>
import CardComponent from '../components/tender/CardComponent.vue';

export default {
  name: "FoodTender",
  components: {
    CardComponent
  },
  created: function() { 
    this.fetchData();
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    dislikeCategory(index) {
      // need to discuss what happens if all items of category have been disliked
      /*let lastElement = items[items.length - 1];
      if(lastElement.title === item.title) {
        item.liked = true;
      }*/
      this.tags.splice(index, 1);
      this.progress();

    },
    removeCategoryFromTags(index) {
      // only temp solution until final data model is available
      //let tagIndex = this.tags.findIndex(tag => tag.category === category);
      //let itemIndex = this.tags[tagIndex].items.findIndex(item => item.id === subcategory.id);
      //this.tags[tagIndex].items[itemIndex].liked = true;
      this.tags.splice(index, 1);
      this.progress();
    },
    progress() {
      // calculate progress based on finished categories
      let progress = (this.finishedCategories.length / this.tags.length) * 100;
      return  progress.toString() + "%"
    },
    fetchData() {
      this.$store.dispatch('tagsStorage/findTags', this.$apolloProvider.defaultClient);
    },
    liked(item, index) {
      console.log("method liked called in foodtender view")
      console.log("tag: " + item.name + " index: " + index);
      this.$store.dispatch('tagsStorage/likeTenderTag', item);
      this.tenderTags.splice(index, 1);

            //const likedTags = this.$store.getters['tagsStorage/likedTags'];
    },
    disliked(item, index) {
      console.log("method disliked called in foodtender view")
      //this.tenderTags.splice(index, 1);
      console.log("tag: " + item.name + " index: " + index);
      this.tenderTags.splice(index, 1);
    }
  },
  computed: {
    isEmpty: () => {
      return this.tags.length == 0;
    },
    openCategories() {
      // returns all elements in tags array, where all items in items array have not been liked yet
      return this.$store.getters['tagsStorage/openCategories'];
    },
    finishedCategories() {
      return this.$store.getters['tagsStorage/finishedCategories'];
    },
    tags(){
      return this.$store.getters['tagsStorage/tags'];
    },
    tenderTags(){
      return this.$store.getters['tagsStorage/tenderTags'];    
    },
    testVariable() {
      return 'THIS is a test';
    }
  },
  data: function() {
    return {
       message: "Swipe for your Taste!"
    }
  }
}
</script>

<style scoped>
</style>