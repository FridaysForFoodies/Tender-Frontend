<template>
  <!-- Draggable -->
  <Vue2InteractDraggable
      class="dragging-container absolute flex flex-col left-0 right-0 top-0 h-full mx-6 transform rounded-lg bg-gray-100 bg-cover bg-no-repeat"
      :style="{ backgroundImage: `url(http://s3-eu-west-1.amazonaws.com/hf-recipes${item.imagePath})`}"
      :interact-block-drag-down="interactBlockDragDown"
      :interact-block-drag-left="interactBlockDragLeft"
      :interact-block-drag-right="interactBlockDragRight"
      :interact-block-drag-up="interactBlockDragUp"
      :interact-lock-y-axis="true"
      :interact-max-rotation="15"
      :interact-x-threshold="200"
      :interact-y-threshold="200"
      v-if="isShowing"

      @draggedLeft="dislikeTag"
      @draggedRight="likeTag"
  >

    <!-- Title -->
    <div class="flex flex-1">
      <h2 class="m-auto text-center font-oswald text-5xl uppercase">
        {{ item.name }}
      </h2>
    </div>
    
    <!-- Buttons need to be moved to card stack component -->
    <div class="flex flex-row justify-around w-full h-24 text-center mb-6">
      <button class="rounded-full h-24 w-24 flex items-center justify-center bg-white border-8 border-gray-200 p-4" @click="dislikeTag(item)">
        <img class="transform rotate-180" alt="Dislike" src="../../assets/images/dislike.png">
      </button>

      <button class="rounded-full h-24 w-24 flex items-center justify-center bg-white border-8 border-gray-200 p-4" @click="likeTag(item)">
        <img alt="Like" src="../../assets/images/like.png">
      </button>
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
    item: Object,
    itemIndex: Number
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
    likeTag() {
      console.log("item liked called: " + this.item.name + " itemIndex: " + this.itemIndex);
      this.$emit('likedTag', this.item, this.itemIndex);
    },
    dislikeTag() {
      console.log("item disliked called: " + this.item.name + " itemIndex: " + this.itemIndex);
      this.$emit('dislikedTag', this.item, this.itemIndex);
    }
  }
}
</script>

<style scoped>
.dragging-container,
.dragging-container * {
  -ms-touch-action: none;
  touch-action: none;
}

.dragging-container:before {
  content: "";
  position: absolute;
  left: 0; right: 0;
  top: 0; bottom: 0;
  background: rgba(255,255,255,.7);
  border-radius: 0.5rem;
  z-index: -1;
}

.dragging-container {
  background-size: contain;
  text-align: center;
}
</style>