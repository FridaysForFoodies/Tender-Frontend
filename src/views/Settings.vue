<template>
    <div>
      <h1>Settings</h1>
      <br>
      <form>
        <label for="vegetarian">Vegetarian </label>
        <input type="checkbox" id="vegetarian" value="vegetarian" name="vegetarian" v-model="vegetarian" @change="checkConsistency(false)">
        <br>
        <label for="vegan">Vegan </label>
        <input type="checkbox" id="vegan" name="vegan" value="vegan" v-model="vegan" @change="checkConsistency(true)">
        <br>
        <label for="gluten">Glutenfree </label>
        <input type="checkbox" id="gluten" name="gluten" value="gluten" v-model="gluten" >
        <br>
        <label for="dairy">Dairy </label>
        <input type="checkbox" id="dairy" name="dairy" value="dairy" v-model="dairy" @change="checkConsistency(false)">
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
  methods: {
    checkConsistency(vegan) {
      if(vegan) {
        this.vegetarian = false
        this.dairy = false
      } else {
        this.vegan = false
      }
    }
  }
}
</script>

<style scoped>

</style>