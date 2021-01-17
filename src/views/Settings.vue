<template>
  <div class="my-4 mx-8">
    <h1 class="text-2xl font-bold mb-12">Do you have some special preferences?</h1>

    <settings-checkbox :label-text="vegetarianLabel" :mapped-value.sync="vegetarian"/>
    <settings-checkbox :label-text="veganLabel" :mapped-value.sync="vegan"/>
    <settings-checkbox :label-text="glutenfreeLabel" :mapped-value.sync="glutenfree"/>
    <settings-checkbox :label-text="dairyfreeLabel" :mapped-value.sync="dairyfree"/>

    <div class="text-left font-bold">
      <span>Cooking time</span>
    </div>
    <br>
    <vue-range-slider ref="slider" v-model="value" :dot-size=32 :min=15 :max=60 :step=15 :tooltip=false :height=2 :process-style="{'background-color': '#ffda07'}"/>
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
// import gql from "graphql-tag";

export default {
  name: "Settings",
  data() {
    return {
      // init settings value from store
      vegetarian: this.$store.state.settingsStorage.settingsVegetarian,
      vegan: this.$store.state.settingsStorage.settingsVegan,
      glutenfree: this.$store.state.settingsStorage.settingsGlutenfree,
      dairyfree: this.$store.state.settingsStorage.settingsDairyfree,
      value: this.$store.state.settingsStorage.cookingTime,
      vegetarianLabel: 'Vegetarian',
      veganLabel: 'Vegan',
      glutenfreeLabel: 'Gluten free',
      dairyfreeLabel: 'Dairy free',
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
        this.dairyfree = false
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
  },
  beforeRouteLeave(to, from, next) {
    // write settings values back to store before leaving page
    let settingsObj = {
      vegetarian: this.vegetarian,
      vegan: this.vegan,
      glutenfree: this.glutenfree,
      dairyfree: this.dairyfree,
      cookingTime: this.value
    }

    this.$store.commit('updateSettings', { settingsObj })
    console.log("before leaving settings: updateSettings");
    next();
  }
}
</script>


<style scoped>

</style>