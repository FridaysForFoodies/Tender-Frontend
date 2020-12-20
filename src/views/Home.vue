<template>
    <div class="h-full p-4">

      <h1 class="text-2xl font-bold mt-24">Which ingredients<br/> do you have?</h1> 
      <div class="w-full border-solid border-black border-2 rounded-md p-3 mt-4 flex justify-between items-center">
   
        <div flex-1>
          <vue-tags-input v-model="tag" :tags="tags" :autocomplete-items="proposedIngredients" :validation="validation" @tags-changed="newTags => tags = newTags"/>
        </div>
        
        <router-link :to=" { name: 'FoodTender'}">  
          <font-awesome-icon icon="play" class="text-4xl"/>
        </router-link>
      </div>

      <p class="font-bold	mt-4">Common search terms</p>

      <div v-for="ingredient in unselectedIngredients" :key="ingredient" @click="addTagFromList(ingredient)"
        class="border-solid border-gray-400 border-2 rounded-full px-4 inline-flex mr-2 mt-2">
        <p class="text-gray-400">{{ ingredient.text }}</p>
      </div>

      <ApolloQuery
      :query="require('../graphql/Ingredient.gql')"
    >
      <template slot-scope="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occured</div>

        <!-- Result -->
        <div v-for="post in data.posts.data" :key="post.title" v-else-if="data" class="result apollo">{{ post.title }}</div>

        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>

  </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';

export default {
  components: {
    VueTagsInput,
  },
  name: "Home",
  data() {
    return {
      tag: '',
      tags: [],
      ingredients: [
        { text: "Pasta" },
        { text: "Tomatoes" },
        { text: "Basil" },
        { text: "White wine" },
        { text: "Capsicum" }
      ],
      validation: [{
        classes: 'avoid-item',
        // enthält ingredients den tag nicht? -> dann disable add
        rule: tag => !this.ingredients.find(ingredient => ingredient.text === tag.text),
        disableAdd: true
      }],
    }
  },
  methods:{
    addTagFromList(ingredient) {
      this.tags.push({ 
        text: ingredient.text,
        tiClasses:["ti-valid"]
      });
    }
  },
  computed: {
    proposedIngredients() {
      return this.ingredients.filter(i => {
        return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
      });
    },

    unselectedIngredients() {
      return this.ingredients.filter(ingredient => {
        // enthält tags den ingredient?
        return !this.tags.find(tag => tag.text === ingredient.text)
      });
    },
  }
}
</script>

<style lang="css">

.vue-tags-input .ti-input {
    border: none;
}

.vue-tags-input .ti-tag {
  background-color: transparent;
  font-size: 1em;
  color: #9CA3AF;
  border: #9CA3AF solid 2px;
  border-radius: 1em;
  padding: 0.2em 0.8em;
  margin: 0.2rem 0.3rem 0.2rem 0; 
}
  
</style>