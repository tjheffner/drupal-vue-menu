import Vue from 'vue'
import Vuex from 'vuex'
import $ from 'jquery'

Vue.use(Vuex)

/**
 * STATE
 */
const state = {
  menuOpen: false,
  menuItems: [],
  currentParent: '',
}

/**
 * MUTATIONS
 */
const mutations = {
  MENU_TOGGLE(state) {
    state.menuOpen = !state.menuOpen
  },
  ADD_MENU_ITEMS(state, items) {
    state.menuItems = items
  },
  PARENT_CHANGE(state, uuid) {
    state.currentParent = uuid
  }
}

/**
 * ACTIONS
 */
const actions = {
  toggleMenu: ({ commit, dispatch }) => {
    commit('MENU_TOGGLE')
    dispatch('setParent', '')
  },
  getMenuItems: ({ commit }) => {
    $.getJSON('//www.uarts.vm/menu-items', (data) => {
      commit('ADD_MENU_ITEMS', data)
    })
  },
  setParent: ({commit}, uuid) => {
    commit('PARENT_CHANGE', uuid)
  }
}

/**
 * GETTERS
 */
const getters = {
  open: state => state.menuOpen,
  menuItems: state => state.menuItems,
  currentParent: state => state.currentParent,
  findItems: (state, getters) => (menu_name) => {
    return getters.menuItems.filter(menuItem => menuItem.menu_name === menu_name && menuItem.parent === '')
  },
  findChildren: (state, getters) => {
    return getters.menuItems.filter(menuItem => menuItem.parent === `menu_link_content:${state.currentParent}`)
  },
  currentParentItem: (state, getters) => {
    return getters.menuItems.filter(menuItem => menuItem.uuid === state.currentParent)
  },
  mainMenu: (state, getters) => getters.findItems('main'),
  utilityMenu: (state, getters) => getters.findItems('utility-links'),
  slideMenu: (state, getters) => getters.findItems('side-menu'),
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
})