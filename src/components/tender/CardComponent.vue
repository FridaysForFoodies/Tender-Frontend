<template>
  <!-- Draggable -->
  <Vue2InteractDraggable
      class="dragging-container absolute flex flex-col left-0 right-0 top-0 h-full mx-6 transform rounded-lg bg-gray-100 bg-cover bg-no-repeat bg-image"
      :style="{ backgroundImage:  tagImage() }"
      :interact-block-drag-down="interactBlockDragDown"
      :interact-block-drag-left="interactBlockDragLeft"
      :interact-block-drag-right="interactBlockDragRight"
      :interact-block-drag-up="interactBlockDragUp"
      :interact-lock-y-axis="true"
      :interact-max-rotation="15"
      :interact-x-threshold="150"
      :interact-y-threshold="200"
      v-if="isShowing"

      @draggedLeft="draggedLeft"
      @draggedRight="draggedRight"
  > 
    <!-- Title -->
    <div class="flex flex-1">
      <h2 class="m-auto text-center font-oswald text-4xl uppercase md:break-all">
        {{ item.name }}
      </h2>
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
    likeTag() {
      console.log("item liked called: " + this.item.name + " itemIndex: " + this.itemIndex);
      this.$emit('likedTag', this.item, this.itemIndex);
    },
    dislikeTag() {
      console.log("item disliked called: " + this.item.name + " itemIndex: " + this.itemIndex);
      this.$emit('dislikedTag', this.item, this.itemIndex);
    },    draggedLeft() {
      console.log("dragged left");
      this.dislikeTag();
    },
    draggedRight() {
      this.likeTag();
    },
    tagImage() {
      let imagePath = `url(https://banner2.cleanpng.com/20180216/ggq/kisspng-hamburger-hot-dog-sushi-fast-food-pizza-pencil-drawing-food-hamburger-hot-dog-fast-food-ca-5a86ccb25a03f5.4552971515187836663687.jpg)`;
      if(this.item.imagePath.length != 0) {
        imagePath = `url(http://s3-eu-west-1.amazonaws.com/hf-recipes${this.item.imagePath})`; 
      }
      return imagePath;
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
  background: rgba(240, 240, 240, 0.7);
  border-radius: 0.5rem;
  z-index: -1;
}

.dragging-container {
  background-size: contain;
  text-align: center;
}

</style>