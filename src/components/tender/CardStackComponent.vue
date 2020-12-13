<template>
  <div class="absolute left-0 right-0 top-0 h-full">
   <div class="h-16" style="margin-top: -100px;">
     <button @click="replyDaddy" type="button"><img alt="Back" src="../../assets/images/back-button.png" style=""></button>    
      <h1 class="h-12 inline-block align-middle text-2xl font-bold mb-2.5" style="color: green;" >{{ childMessage }}</h1> 
  </div>
    <CardComponent
        v-for="(item, index) in items"
        v-bind:key="index"
        v-bind:item="item"
        :style="{ zIndex: -index }"

        @listenerGrandChild="listenerGrandChild"
    />
  </div>
</template>

<script>
import CardComponent from './CardComponent.vue';

export default {
  name: "CardStackComponent",
  props: ['tag', 'items', 'listenerChild'],
  components: {
    CardComponent
  },
  computed: {
    localTag: function () {
      return this.tag;
    }
  },
  methods: {
    replyDaddy() {
      this.$emit("listenerChild", "I'm here my Daddy!");
    },
    listenerGrandChild(reply) {
      this.childMessage = reply;
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

// , 
    categoryLiked: function () {
      return this.items.filter( item => item.liked === true);
    }
