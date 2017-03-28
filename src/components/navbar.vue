<template>
  <div class="nav">

    <!-- logo block -->
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

    <!-- menu #2 "action menu" -->
    <div class="nav__group">
      <a v-for="item in utilityMenu" v-bind:href="item.link" class="nav__item nav__item-alt">{{ item.title }}</a>
    </div>

    <!-- not a menu, holds slide trigger -->
    <div class="nav__group">
      <a href="#" class=" nav__item icon--search">search</a>
      <a @click="toggleMenu" type="button" class="nav__item nav-menu">{{ open }}</a>
    </div>

    <!-- menu #3 "side menu", hidden offscreen -->
    <div class="slidemenu" v-bind:class="menuDirection">
      <span @click="toggleMenu" class="nav__button">X</span>
      <span v-if="currentParent" @click="setParent('')" class="nav__button"><</span>

      <div class="slide-menu__items">
        <ul v-if="!currentParent">
          <li @click="setParent(item.uuid)" v-for="item in slideMenu">{{ item.title }}</li>
          <span class="slide-menu__button"> apply now </span>
        </ul>

        <div v-if="currentParent">
          <h2 v-for="item in currentParentItem">{{ item.title }}</h2>
          <ul>
            <li v-for="item in findChildren"><a v-bind:href="item.link">{{ item.title }}</a></li>
          </ul>
        </div>
      </div>
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
        'setParent',
      ])
    },
    computed: {
      ...mapGetters([
        'open',
        'menuItems',
        'mainMenu',
        'utilityMenu',
        'slideMenu',
        'findChildren',
        'currentParent',
        'currentParentItem',
      ]),
      menuDirection() {
        return this.$store.getters.open ? 'slide-left':'slide-right'
      }
    },
    created() {
      this.$store.dispatch('getMenuItems')
    }
  }
</script>

<style lang="scss">
  body {
    max-width: 100%;
    overflow-x: hidden;
  }

  .nav {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  .nav__item {
    margin-right: 20px;
  }
  a.nav__item-alt {
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

  .nav__button {
    padding: 25px;
    cursor: pointer;
    font-size: 30px;
  }

  .slidemenu {
    height: 100%;
    position: absolute;
    background: white;
    top: 0;
    right: 0;
    width: 300px;
    z-index: 10;
    border-left: 1px black solid;
    padding: 25px;
    overflow: hidden;
  }

  .slide-right {
    transition: all .3s ease;
    right: -350px;
    opacity: 0;
  }
  .slide-left {
    transition: all .3s ease;
  }
</style>
