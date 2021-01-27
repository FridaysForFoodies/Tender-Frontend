<template>
  <div v-if="$apollo.loading">
    Loading...
  </div>

  <div class="w-full" v-else>
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

          <div class="my-3" v-for="instructionStep in findRecipe.instructionSteps" :key="instructionStep.id">
            <div class="text-bold text-2xl mb-1 mt-4">
              Schritt {{instructionStep.imageCaption}}:
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

  },
}
</script>

<style scoped>

</style>