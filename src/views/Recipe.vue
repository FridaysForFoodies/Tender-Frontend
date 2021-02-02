<template>
  <div v-if="$apollo.loading" class="flex flex-col h-full w-full justify-center items-center font-bold text-secondaryText">
    <p>Gathering all<br>ingredients for you ...</p>
    <img src="../assets/images/loading.svg"/>
  </div>

  <div class="w-full" v-else>
    <div class="w-screen h-12 bg-gradient-to-b from-black bg-opacity-40 space-x-4 fixed z-10">
      <button @click="goBack" style="filter: brightness(0) invert(1);" class="w-8 h-8 ml-1 mt-2.5 mr-1 mb-1 inline-block" type="button">
        <img alt="Back" src="../assets/images/back-button.png">
      </button>
      <h1 class="h-12 inline-block align-middle text-2xl font-bold mb-2.5" >{{ message }}</h1>
    </div>
    <div style="overflow: scroll;margin-bottom: 100px;">
      <article class="overflow-hidden">
        <div class="relative" style="padding-bottom: 75%;">
          <div class="absolute object-cover w-full">
            <img :src="imagePath"/>
          </div>
        </div>
        <div class="px-5">
          <h1 class="text-3xl">
            {{findRecipe.name}}
          </h1>
          <h2 class="text-xl">
            {{findRecipe.subtitle}}
          </h2>
          <small class="block mt-2">
            <span>Dauer: {{findRecipe.duration}} Minuten</span>
          </small>
        </div>
        <div class="px-5 my-5">
          <p class="my-3">
            {{findRecipe.description}}
          </p>

          <p class="text-xl mt-5 mb-2">
            Zutaten für 6 Portionen:
          </p>
          <ul class="list-disc px-5">
            <li style="display: list-item;" v-for="ingredient in findRecipe.ingredients" :key="ingredient.id">
              <span>{{ingredient.yields[0].amount}} </span>
              <span>{{ingredient.yields[0].unit}} </span>
              <span>{{ingredient.name}} </span>
            </li>
          </ul>

          <div class="my-3" v-for="(instructionStep, index) in findRecipe.instructionSteps" :key="index">
            <div class="text-bold text-2xl mb-1 mt-4">
              Schritt {{ index + 1 }}:
            </div>
            <div>
              <p>
                {{instructionStep.instructions}}
              </p>
            </div>

          </div>

        </div>
      </article>

    </div>
  </div>
</template>

<script>
import gql from "graphql-tag";

const QUERY_GET_RECIPE = gql`query findRecipe($recipeId: String!) {
      findRecipe(recipeId: $recipeId) {
        ID
        name
        subtitle
        description
        imagePath
        yieldOptions
        difficulty
        duration
        ingredients {
          ID
          name
          imagePath
          yields {
            amount
            unit
            yields
          }
        }
        instructionSteps {
          instructions
          imagePath
          imageCaption
        }
      }
    }`;


export default {
  name: "Recipe",
  created() {
    console.log(this.loading);
  },
  data() {
    return {
      findRecipe: {},
      loading: 0,
    }
  },
  apollo: {
    // Query with parameters
    findRecipe: {
      // gql query
      query: QUERY_GET_RECIPE,
      variables() {
        return {
          recipeId: this.$route.params.recipeId
        }
      },
      loadingKey: 'loading'
    },
  },
  computed: {
    imagePath() {
      return this.findRecipe != null ? "http://s3-eu-west-1.amazonaws.com/hf-recipes" + this.findRecipe.imagePath : "";
    }
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/recipes')
    },

  },
}
</script>

<style scoped>

</style>