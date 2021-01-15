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
          v-bind:style="{ width: progress }"
          style=""
      >
      </div>
    </div>
  </div> 
  <div class="relative w-screen flex-1">
      <CardComponent
        v-for="(item, index) in tags"
        v-bind:key="item.id"
        v-bind:item="item"
        v-bind:itemIndex="index"
        :style="{ zIndex: -index }"

        @likedTag="liked"
        @dislikedTag="disliked"
    />
  </div>
    <!-- Buttons need to be moved to card stack component -->
    <div class="flex justify-around w-full h-24 text-center mb-28 mt-4">
      <button class="rounded-full h-24 w-24 items-center justify-center bg-white border-8 border-gray-200 p-4" @click="disliked(item, index)">
        <img class="transform rotate-180 " alt="Dislike" src="../assets/images/dislike.png">
      </button>

      <button class="rounded-full h-24 w-24  items-center justify-center bg-white border-8 border-gray-200 p-4" @click="liked(item, index)">
        <img alt="Like" src="../assets/images/like.png">
      </button>
    </div>
  </div>
</template>

<script>
import CardComponent from '../components/tender/CardComponent.vue';
import router from '../router.js';

export default {
  name: "FoodTender",
  components: {
    CardComponent
  },
  created: function() { 
    this.reset();
    this.fetchData();
    this.shuffle(this.tags);
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    fetchData() {
      this.$store.dispatch('tagsStorage/retrieveTags', this.$apolloProvider.defaultClient);
    },
    liked(item, index) {
      this.$store.dispatch('tagsStorage/likeTag', item);
      
      if(this.likedTags.length == 5) {
        // TODO: change to result lists
        this.$store.dispatch('tagsStorage/retrieveTags', this.$apolloProvider.defaultClient);
        router.push({name: 'Favourites'});
      } 
      this.tags.splice(index, 1);
    },
    disliked(item, index) {
      this.$store.dispatch('tagsStorage/dislikeTag', item);
      this.tags.splice(index, 1);
    }, 
    shuffle(tenderTags) {
      const x = tenderTags.length - 1;
      for(let i = x; i > 0; i--){
        const j = Math.floor(Math.random() * i)
        const temp = tenderTags[i]
        tenderTags[i] = tenderTags[j]
        tenderTags[j] = temp
      }
      return tenderTags;
    },
    reset(){
      this.$store.commit('tagsStorage/reset');
    }
  },
  computed: {
    isEmpty: () => {
      return this.tags.length == 0;
    },
    tags() {  
      return this.$store.getters['tagsStorage/tags'];
    },
    likedTags() {
      return this.$store.getters['tagsStorage/likedTags'];
    },
    progress() {
      let progress = (this.likedTags.length / this.maxLikedTagsCount) * 100;
      return  progress.toString() + "%"
    }
  },
  data: function() {
    return {
       message: "Swipe for your Taste!",
       maxLikedTagsCount: 5
    }
  }
}
</script>
 
<style scoped>
</style>