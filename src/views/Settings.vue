<template>
  <div class="my-4 mx-8">
    <h1 class="text-2xl font-bold mb-12">Do you have some special preferences?</h1>

    <settings-checkbox :label-text="vegetarianLabel" v-model="vegetarian"/>
    <settings-checkbox :label-text="veganLabel" v-model="vegan"/>
    <settings-checkbox :label-text="glutenLabel" v-model="gluten"/>
    <settings-checkbox :label-text="dairyLabel" v-model="dairy"/>

    <div class="text-left font-bold">
      <span>Cooking time</span>
    </div>
    <br>
    <vue-range-slider ref="slider" v-model="value" :dot-size="32" :min="15" :max="60" step="15" :process-style="{'background-color': '#ffda07'}" :height="2" :tooltip="false"/>
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
    checkConsistency(vegan) {
      if (vegan) {
        this.vegetarian = false
        this.dairy = false
      } else {
        this.vegan = false
      }
    }
  },
  computed: {

  },
  components: {
    VueRangeSlider,
    SettingsCheckbox
  }
}
</script>

<style scoped>

/*
 * checkbox style
 */

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

.switcher {
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

.switcher:before {
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

input:checked + .switcher {
  background-color: var(--color-primary);
}

input:focus + .switcher {
  box-shadow: 0 0 1px var(--color-primary);
}

input:checked + .switcher:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.switcher.round {
  border-radius: 34px;
}

.switcher.round:before {
  border-radius: 50%;
}

/*
 * range slider style
 */

.slider-container {
  width: 100%;
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 3px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: #FFF;
  cursor: pointer;
  /*box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;*/
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #FFF;
  cursor: pointer;
}

</style>