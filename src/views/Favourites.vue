<template>
  <div v-if="$apollo.loading" class="flex flex-col h-full w-full justify-center items-center font-bold text-secondaryText">
    <p>Looking for your <br>favourite dishes ...</p>
    <img src="../assets/images/loading.svg"/>
  </div>

  <div class="w-full" v-else>
      <div style="overflow: scroll;margin-bottom: 100px;">

        <RecipeFavouriteComponent
            v-for="recipe in findFavouriteRecipes"
            v-bind:key="recipe.ID"
            v-bind:recipe="recipe"
            v-on:unfavourite-recipe="unfavRecipe(index)"
        ></RecipeFavouriteComponent>

      </div>
  </div>
</template>

<script>
import RecipeFavouriteComponent from '../components/listing/RecipeFavouriteComponent.vue'
import getFavouritesForUser from "@/graphql/GetFavourites.gql";
import gql from "graphql-tag";

const GET_FAVOURITES = gql`query findFavouriteRecipes {
        findFavouriteRecipes {
            ID,
            name,
            imagePath,
            duration,
        }
      }`;
export default {
  name: "Favourites",
  components: {
    RecipeFavouriteComponent
  },
  data() {
    return {
      findFavouriteRecipes: []
    }
  },
  async created() {
    console.log("#################");
    await this.getFavourites();
  },
  apollo: {
    // Query with parameters
    findFavouriteRecipes: {
      // gql query
      query: GET_FAVOURITES
    },
  },
  methods: {
    unfavRecipe: function(index) {
      this.findFavouriteRecipes.splice(index, 1);
    },

    async getFavourites() {
      try {
        const response = await this.$apolloProvider.defaultClient.query({
          query: getFavouritesForUser,
          context: { headers: { 'Authorization': localStorage.getItem("tender-user-token") } },
        });
        this.findFavouriteRecipes = response.data.findFavouriteRecipes
        console.log()
      } catch (error) {
        console.log('settingsStore.received error: ', error)
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    //this.unfavRecipes();
    console.log("delte fav now");
    next();
  },
}
</script>

<style scoped>

</style>  