<template>
  <div v-if="!isEmpty" class="absolute left-0 right-0 top-0 h-full">
   <div class="h-16" style="margin-top: -100px;">
  </div>
    <CardComponent
        v-for="(item, index) in items"
        v-bind:key="index"
        v-bind:item="item"
        :style="{ zIndex: -index }"

        @tagLiked="likeCategory"
        @tagDisliked="tagDisliked"
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
  computed: {
    isEmpty: function() {
      return this.items.length === 0;
    }
  },
  methods: {
    likeCategory() {
      //Wenn ein Tag aus einer Kategorie geliked wurde, füge die Kategorie den gelikten Kategorien im Store hinzu
      this.$store.commit('addCategoryToCompletedCategories', this.category);
      //this.$store.commit('removeCategoryFromTags', this);

      //Sage dem Cardstackcomponent, dass er die Kategorie entfernen kann, da ein Tag gewählt wurde
      this.$emit('categoryLiked');
    },

    tagDisliked(index) {
      //Wenn ein Tag gedisliked wurde, entferne ihn vom Items Array
      this.items.splice(index, 1);

      //Wenn die kategorie leer ist, dislike sie komplett und berichte dem übergeordnetem Component davon
      if(this.isEmpty) {
        this.dislikeCategory()
      }
    },

    dislikeCategory() {
      //Wenn eine Kategorie gänzlich gedisliked wurde füge sie dennoch den liked
      this.$store.commit('addCategoryToLikedCategories', this.category);
      this.$emit('categoryDisliked', this);
    }
  }
}
</script>

<style scoped>
</style>