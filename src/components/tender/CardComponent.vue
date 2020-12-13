<template>
  <!-- Draggable -->
  <Vue2InteractDraggable
      class="absolute flex flex-col left-0 right-0 top-0 h-full mx-6 transform rounded-lg bg-gray-100"
      @draggedLeft="draggedLeft"
      @draggedRight="draggedRight"
      :interact-block-drag-down="interactBlockDragDown"
      :interact-block-drag-left="interactBlockDragLeft"
      :interact-block-drag-right="interactBlockDragRight"
      :interact-block-drag-up="interactBlockDragUp"
      v-if="isShowing"
  >
    <!-- Title -->
    <div class="flex-1"> 
      {{ item.title }} <strong> {{ item.liked }} </strong>
    </div>

    <!-- Buttons -->
    <div class="flex flex-row justify-around w-full h-16 text-center mb-6">
      <button class="w-16 h-auto" @click="replyDad">
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
  props: ['item', 'listenerGrandChild'],
  computed: {
    localItem: function () {
      return this.item;
    }
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
    draggedLeft() {
      console.log("dragged left!");
      //emit negative event
      this.hideCard();
    },

    draggedRight() {
      console.log("dragged right!");
      //emit positive event
      this.hideCard();
    },

    hideCard() {
      setTimeout(() => {
        this.isShowing = false;
      }, 200);
    },
    like(item) {
      this.localItem.like = true;
      console.log(item.title + " liked!");
      console.log(item.title + " is now: " + item.like);
      //this.hideCard();
    },
    dislike(item) {
      console.log(item.title + " disliked!");
      this.hideCard();
    },
    replyDad() {
      this.$emit("listenerGrandChild", "I'm here my Dad!");
    }
  }
}
</script>

<style scoped>

</style>