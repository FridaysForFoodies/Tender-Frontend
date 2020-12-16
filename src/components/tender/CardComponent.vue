<template>
  <!-- Draggable -->
  
  <Vue2InteractDraggable
      class="absolute flex flex-col left-0 right-0 top-0 h-full mx-6 transform rounded-lg bg-gray-100"
      :interact-block-drag-down="interactBlockDragDown"
      :interact-block-drag-left="interactBlockDragLeft"
      :interact-block-drag-right="interactBlockDragRight"
      :interact-block-drag-up="interactBlockDragUp"
      :interact-lock-y-axis="true"
      :interact-max-rotation="15"
      :interact-x-threshold="200"
      :interact-y-threshold="200"
      v-if="isShowing"

      @draggedLeft="dislike(item)"
      @draggedRight="like(item)"
  >
      <img class="absolute flex flex-col left-0 right-0 top-0 h-full transform rounded-lg opacity-30" src="https://image.freepik.com/fotos-kostenlos/hoher-winkel-der-koestlichen-ramen-in-der-schuessel_23-2148678758.jpg" alt="monkey">

    <!-- Title -->
    <div class="flex-1 text-center font-oswald text-6xl uppercase"> 
      {{ item.title }}
    </div>
    
    <!-- Buttons need to be moved to card stack component -->
    <div class="flex flex-row justify-around w-full h-16 text-center mb-16">
      <div class="rounded-full h-28 w-28 flex items-center justify-center bg-white border-8 border-gray-200">
      <button class="w-16 h-auto" @click="dislike(item)">
        <img class="transform rotate-180 mt-1" alt="Dislike" src="../../assets/images/dislike.png">
      </button>
    </div>
      <div class="rounded-full h-28 w-28 flex items-center justify-center bg-white border-8 border-gray-200">
      <button class="w-16 h-auto mb-2.5" @click="like(item)">
        <img alt="Like" src="../../assets/images/like.png">
      </button>
      </div>
    </div>

  </Vue2InteractDraggable>


</template>

<script>
import { Vue2InteractDraggable } from 'vue2-interact'

export default {
  name: "CardComponent",
  components: {
    Vue2InteractDraggable
  },
  props: {
    item: Object
  },
  data() {
    return {
      isShowing: true,
      interactBlockDragDown: true,
      interactBlockDragLeft: false,
      interactBlockDragRight: false,
      interactBlockDragUp: true
    };
  },
  methods: {
    hideCard() {
      setTimeout(() => {
        this.isShowing = false;
      }, 200);
    },
    like(item) {
      this.$emit('liked', item);      
    },
    dislike(item) {
      this.$emit('disliked', item);
      // maybe better to hide card via stack
      this.hideCard();
    }
  }
}
</script>

<style scoped>
img {
  z-index: -1;
}
</style>