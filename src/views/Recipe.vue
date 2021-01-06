<template>
  <div class="w-full">
    <div style="overflow: scroll;margin-bottom: 100px;">
      <article class="overflow-hidden">
        <div class="relative" style="padding-bottom: 100%;">
          <div class="absolute object-cover w-full h-full">
            <img :src="imageUrl" :alt="title + 'Bild'">
          </div>
        </div>
        <div class="p-2">
          <p class="my-3">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab ad cum facilis illo libero, minima? Adipisci atque consectetur ex facilis illo in, iste natus recusandae.
          </p>

          <ul class="list-disc">
            <li style="display: list-item;" v-for="ingredient in ingredients" :key="ingredient.id">
              {{ ingredient.name }}
            </li>
          </ul>

        </div>
      </article>

    </div>
  </div>
</template>

<script>

export default {
  name: "Recipe",
  data: function () {
    return {
      id: 1,
      title: 'Rezept #1',
      imageUrl: 'https://cdn.theforkmanager.com/static/styles/blog_article_header_image/public/wp-blog/eltenedor-foodporn-marketing-restaurantes.png?itok=frBLipGv',
      isFavourite: true,
      cookingTime: 45,
      ingredients: [
        { id: 1, name: 'Sauerkraut'},
        { id: 2, name: 'Frisches Mett'},
        { id: 3, name: 'Noch mehr frisches Mett'},
        { id: 4, name: 'Spezialsoße'},
      ]
    }
  },
  methods: {

  },
}
</script>

<style scoped>

</style>