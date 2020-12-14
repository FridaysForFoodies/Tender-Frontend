<template>
  <!-- Draggable -->
  <Vue2InteractDraggable
      class="absolute flex flex-col left-0 right-0 top-0 h-full mx-6 transform rounded-lg bg-gray-100"
      :interact-block-drag-down="interactBlockDragDown"
      :interact-block-drag-left="interactBlockDragLeft"
      :interact-block-drag-right="interactBlockDragRight"
      :interact-block-drag-up="interactBlockDragUp"
      v-if="isShowing"

      @draggedLeft="dislike(item)"
      @draggedRight="like(item)"
  >
    <!-- Title -->
    <div class="flex-1"> 
      {{ item.title }}
    </div>
    
    <!-- Buttons need to be moved to card stack component -->
    <div class="flex flex-row justify-around w-full h-16 text-center mb-6">
      <button class="w-16 h-auto" @click="dislike(item)">
        <img class="transform rotate-180" alt="Dislike" src="../../assets/images/dislike.png">
      </button>

      <button class="w-16 h-auto" @click="like(item)">
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
      // maybe better to manage this by cardstackcomponent
      this.hideCard();
    }
  }
}
</script>

<style scoped>

</style>