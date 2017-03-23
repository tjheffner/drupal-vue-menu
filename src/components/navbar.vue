<template>
  <div class="nav">
    <div class="nav__group logo">
      <a href="/">
        <!--<img class="logo__image" v-bind:src="logoSrc" alt="logo">-->
        <!--<span class="logo__caption">site logo</span>-->
      </a>
    </div>

    <!-- menu #1 "nav menu" -->
    <div class="nav__group">
      <a v-for="item in mainMenu" v-bind:href="item.link" class="nav__item">{{ item.title }}</a>
    </div>

    <!-- menu #2 "small action menu" -->
    <div class="nav__group">
      <a v-for="item in actionMenu" v-bind:href="item.link" class="nav__item nav__item-alt">{{ item.title }}</a>
    </div>

    <div class="nav__group">
      <a href="#" class=" nav__item icon--search">search</a>
      <a @click="toggleMenu" type="button" class="nav__item nav-menu" :data-menu-state="menuOpen">{{ menuOpen }}</a>
    </div>

  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    data() {
      return {
        logoSrc: '../src/assets/logo.png'
      }
    },
    methods: {
      ...mapActions([
        'toggleMenu',
      ])
    },
    computed: {
      ...mapGetters([
        'menuOpen',
        'menuItems',
        'mainMenu',
        'actionMenu',
      ]),
    },
    created() {
      this.$store.dispatch('getMenuItems')
    }
  }
</script>

<style lang="scss">
  .nav {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .nav__item {
    margin-right: 20px;
  }
  .nav__item-alt a {
    color: gray;
  }
  .nav__group {
    margin-left: auto;
    margin-right: auto;
  }
  *:last-child {
    margin-right: 0;
  }
  .nav-menu {
    cursor: pointer;
    color: red;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
</style>
