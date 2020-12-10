<template>
  <div class="my-4 mx-8">
    <h1 class="text-2xl font-bold">Do you have some special preferences?</h1>

    <div class="grid grid-cols-2 gap-6 my-12">
      <div class="text-left font-bold">
        <label for="vegetarian">Vegetarian </label>
      </div>
      <div class="text-right">
        <label class="switch">
          <input type="checkbox" id="vegetarian" value="vegetarian" name="vegetarian" v-model="vegetarian"
                 @change="checkConsistency(false)">
          <span class="slider round"/>
        </label>
      </div>

      <div class="text-left font-bold">
        <label for="vegan">Vegan </label>
      </div>
      <div class="text-right">
        <label class="switch">
          <input type="checkbox" id="vegan" name="vegan" value="vegan" v-model="vegan" @change="checkConsistency(true)">
          <span class="slider round"/>
        </label>
      </div>

      <div class="text-left font-bold">
        <label for="gluten">Glutenfree </label>
      </div>
      <div class="text-right">
        <label class="switch">
          <input type="checkbox" id="gluten" name="gluten" value="gluten" v-model="gluten">
          <span class="slider round"/>
        </label>
      </div>

      <div class="text-left font-bold">
        <label for="dairy">Dairy </label>
      </div>
      <div class="text-right">
        <label class="switch">
          <input type="checkbox" id="dairy" name="dairy" value="dairy" v-model="dairy"
                 @change="checkConsistency(false)">
          <span class="slider round"/>
        </label>
      </div>
    </div>

    <label for="time">Cooking time: {{ time }}<span v-show="time == 60">+</span></label>
    <br>
    <input type="range" min="15" max="60" value="30" step="15" id="time" v-model="time" name="time">
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
      if (vegan) {
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
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: var(--color-primary);
}

input:focus + .slider {
  box-shadow: 0 0 1px var(--color-primary);
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>