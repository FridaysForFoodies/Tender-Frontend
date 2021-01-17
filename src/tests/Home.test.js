import { shallowMount, createLocalVue } from '@vue/test-utils'
import { createMockClient } from 'mock-apollo-client'
import Vuex from 'vuex'
import VueApollo from 'vue-apollo'
import Home from '../views/Home.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueApollo)

describe('Home', () => {
  let getters
  let store
  let actions
  let mockClient
  let apolloProvider
  let wrapper
  
  beforeEach(() => {
    getters = {
      selectedIngredients: () => [{
        ID: 1,
        name: "Gurke"
      }],
      suggestedIngredients: () => [],
      popularIngredients: () => [{
        ID: 3,
        name: "Salat"
      }],
    },
    actions = {
      retrievePopularIngredients: jest.fn(),
      retrieveSuggestedIngredients: jest.fn(),
      selectIngredients: jest.fn(),
      deselectIngredients: jest.fn(),
    },
    store = new Vuex.Store({
      getters,
      actions
    })
  })
  
  const createComponent = () => {
    mockClient = createMockClient()
    apolloProvider = new VueApollo({
      defaultClient: mockClient,
    })
    wrapper = shallowMount(Home, {       
      localVue, 
      store, 
      apolloProvider,
      stubs: ['router-link', 'font-awesome-icon'] })
  }
  
  it('changing the search term triggers database search', async () => {
    createComponent()
    let ingredientInput = wrapper.findComponent({ref: 'ingredientInput'})
    await ingredientInput.setValue("Carrot")
    expect(actions.retrieveSuggestedIngredients).toHaveBeenCalled()
  })

  it('click on popular ingredient triggers selection', async () => {
    createComponent()
    let popularIngredientTag = wrapper.findComponent({ref: 'popularIngredient'})
    await popularIngredientTag.trigger('click')
    expect(actions.selectIngredients).toHaveBeenCalled()
  })

  it('click on selected ingredient triggers deselection', async () => {
    createComponent()
    let selectedIngredientTag = wrapper.findComponent({ref: 'selectedIngredient'})
    await selectedIngredientTag.trigger('click')
    expect(actions.deselectIngredients).toHaveBeenCalled()
  })

  afterEach(() => {
    wrapper.destroy()
    mockClient = null
    apolloProvider = null
  })
})