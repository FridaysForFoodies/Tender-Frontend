<template>
    <div>
      <h1>Settings</h1>
      <br>
      <form>
        <label for="vegetarian">Vegetarian {{vegetarian}} </label>
        <input type="checkbox" id="vegetarian" value="vegetarian" name="vegetarian" v-model="vegetarian">
        <br>
        <label for="vegan">Vegan {{vegan}} </label>
        <input type="checkbox" id="vegan" name="vegan" value="vegan" v-model="vegan">
        <br>
        <label for="gluten">Glutenfree {{gluten}} </label>
        <input type="checkbox" id="gluten" name="gluten" value="gluten" v-model="gluten">
        <br>
        <label for="dairy">Dairy {{ dairy }} </label>
        <input type="checkbox" id="dairy" name="dairy" value="dairy" v-model="dairy">
        <br>
        <br>
        <label for="time">Cooking time: {{time}}<span v-show="time=60">+</span></label>
        <br>
        <input type="range" min="15" max="60" value="30" step="15" id="time" v-model="time" name="time">
      </form>
  </div>
</template>

<script>
export default {
  name: "Settings",
  data() {
    return {
      vegetarian: false,
      vegan: false,
      gluten: false,
      dairy: false,
      time: 30
    }
  },
  // computed: {
  // }
}
</script>

<style scoped>

</style>