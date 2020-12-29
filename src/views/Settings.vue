<template>
  <div class="my-4 mx-8">
    <h1 class="text-2xl font-bold mb-12">Do you have some special preferences?</h1>

    <settings-checkbox :label-text="vegetarianLabel" :mapped-value.sync="vegetarian"/>
    <settings-checkbox :label-text="veganLabel" :mapped-value.sync="vegan"/>
    <settings-checkbox :label-text="glutenLabel" :mapped-value.sync="gluten"/>
    <settings-checkbox :label-text="dairyLabel" :mapped-value.sync="dairy"/>

    <div class="text-left font-bold">
      <span>Cooking time</span>
    </div>
    <br>
    <vue-range-slider ref="slider" v-model="value" :dot-size="32" :min=15 :max="60" :step=15 :process-style="{'background-color': '#ffda07'}"  :tooltip=false :height="2"/>
    <div class="flex justify-between mx-2 mt-2">
      <div>15</div>
      <div>30</div>
      <div>45</div>
      <div>60+</div>
    </div>

  </div>
</template>


<script>
import 'vue-range-component/dist/vue-range-slider.css'
import VueRangeSlider from 'vue-range-component'
import SettingsCheckbox from '../components/SettingsCheckbox'

export default {
  name: "Settings",
  data() {
    return {
      vegetarian: false,
      vegan: false,
      gluten: false,
      dairy: false,
      value: 30,
      vegetarianLabel: 'Vegetarian',
      veganLabel: 'Vegan',
      glutenLabel: 'Glutenfree',
      dairyLabel: 'Dairy'
    }
  },
  methods: {

  },
  computed: {

  },
  watch: {
    vegan(newValue, oldValue) {
      console.log("vegan watcher: from " + oldValue + " to " + newValue)
      if (newValue) {
        this.vegetarian = false
        this.dairy = false
      }
    },
    vegetarian(newValue, oldValue) {
      console.log("veggy watcher: from " + oldValue + " to " + newValue)
      if (newValue) {
        this.vegan = false
      }
    },
    dairy(newValue, oldValue) {
      console.log("dairy watcher: from " + oldValue + " to " + newValue)
      if (newValue) {
        this.vegan = false
      }
    }
  },
  components: {
    VueRangeSlider,
    SettingsCheckbox
  }
}
</script>


<style scoped>

</style>