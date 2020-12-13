<template>
  <div class="absolute left-0 right-0 top-0 h-full">
    <CardComponent
        v-for="(item, index) in items"
        v-bind:key="index"
        v-bind:item="item"
        :style="{ zIndex: -index }"
    />
  </div>
</template>

<script>
import CardComponent from './CardComponent.vue';
export default {
  name: "CardStackComponent",
  props: ['tag', 'items'],
  components: {
    CardComponent
  },
  computed: {
    localTag: function () {
      return this.tag;
    }
  }
}
</script>

<style scoped>

</style>