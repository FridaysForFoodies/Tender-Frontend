<template>
  <div class="absolute left-0 right-0 top-0 h-full">
   <div class="h-16" style="margin-top: -100px;">
  </div>
    <CardComponent
        v-for="(item, index) in items"
        v-bind:key="index"
        v-bind:item="item"
        :style="{ zIndex: -index }"

        @liked="liked"
        @disliked="disliked"
    />
  </div>
</template>

<script>
import CardComponent from './CardComponent.vue';

export default {
  name: "CardStackComponent",
  props: {
    items: Array,
    category: String
  },
  components: {
    CardComponent
  },
  methods: {
    liked(item) {
      this.$emit('liked', this.category, item);
    },
    disliked(item) {
      this.$emit('disliked', this.items, item);
    }
  },
  data() {
    return {
      childMessage: "Where are you, my Grand Childddd?"
    };
  }
}
</script>

<style scoped>
</style>