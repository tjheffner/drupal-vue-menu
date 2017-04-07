<template>
  <div class="nav">

    <!-- logo block -->
    <div class="nav__group logo">
      <a href="/">
        <img class="logo__image" v-bind:src="logoSrc" alt="logo">
        <span class="logo__caption">Site Name</span>
      </a>
    </div>

    <!-- menu #1 "nav menu" -->
    <div class="nav__group">
      <a v-for="item in mainMenu" v-bind:href="item.link" class="nav__item">{{ item.title }}</a>
    </div>

    <!-- menu #2 "action menu" [also has search & menu trigger] -->
    <div class="nav__group">
      <a v-for="item in utilityMenu" v-bind:href="item.link" class="nav__item nav__item-alt">{{ item.title }}</a>
      <a href="#" class="nav__icon icon--search"></a>
      <a @click="toggleMenu" type="button" class="nav__icon icon--menu">{{ open }}</a>
    </div>

    <!-- menu #3 "side menu", hidden offscreen -->
    <div class="slidemenu" v-bind:class="menuDirection">
      <div class="slidemenu__controls">
        <span v-if="currentParent" @click="setParent('')" class="nav__icon icon--arrow--left">back</span>
        <span @click="toggleMenu" class="nav__icon icon--close">{{ open }}</span>
      </div>

      <!-- Top level of the slide menu. -->
      <div class="slidemenu__items">
        <ul v-if="!currentParent">
          <li class="slidemenu__item" @click="setParent(item.uuid)" v-for="item in slideMenu">{{ item.title }}</li>
          <span class="button slidemenu__button">Apply now</span>

          <div class="slidemenu__bottom">
            <li class="slidemenu__bottomItem" v-for="item in slideMenuBottom"><a v-bind:href="item.link">{{ item.title }}</a></li>
          </div>
        </ul>

        <!-- Shows up when an item above is clicked. -->
        <div v-if="currentParent">
          <h2 class="slidemenu__parent" v-for="item in currentParentItem">{{ item.title }}</h2>
          <ul>
            <li class="slidemenu__child" v-for="item in findChildren"><a v-bind:href="item.link">{{ item.title }}</a></li>
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
        logoSrc: './src/assets/logo.png'
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
        'slideMenuBottom',
        'findChildren',
        'currentParent',
        'currentParentItem',
      ]),
      menuDirection() {
        return this.$store.getters.open ? 'slidemenu-left':'slidemenu-right'
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
    justify-content: space-between;
    align-items: center;
    height: 80px;

    &__group {
      display: flex;
      flex-direction: row;

    }
    &__item {
      font-size: 16px;
      text-transform: uppercase;
      margin-right: 25px;

      &-alt {
        color: gray;
        font-weight: 400;
        margin-right: 15px;
      }
    }
    &__icon {
      margin-right: 20px;
      cursor: pointer;
      &.icon--menu {
        color: red;
      }
    }
  }

  .slidemenu {
    height: 100%;
    position: absolute;
    background: white;
    top: 0;
    right: 0;
    width: 500px;
    z-index: 10;
    box-shadow: -1px 1px 1px #888888;
    padding: 25px;
    overflow: hidden;

    &__controls {
      position: absolute;
      right: 15px;

      display: flex;
      flex-direction: column;
      align-items: center;

      font-size: 36px;
      font-weight: 200;

      // Keep the icons spaced on the right.
      .nav__icon {
        margin-right: 0;
      }
      .icon--close {
        order: -1;
        padding-bottom: 30px;
      }
    }
    &__items {
      padding-top: 50px;
      padding-left: 20px;
      ul {
        padding: 0;
      }
    }
    &__item {
      font-size: 21px;
      list-style: none;
      padding-bottom: 25px;
      cursor: pointer;

      &:after {
        float: right;
      }
    }
    &__parent {
      margin-top: 10px;
      font-size: 30px;
    }
    &__child {
      font-size: 18px;
      list-style: none;
      padding-bottom: 25px;
    }
    &__button {
      padding: 12px 25px;
      padding-right: 40px;
      color: white;
      margin-top: 50px;

      &:after {
        position: absolute;
        right: 10px;
        top: 15px;
      }
    }
    &__bottom {
      display: flex;
      flex-flow: column wrap;
      align-content: stretch;
      margin-top: 50px;
      height: 100px;
    }
    &__bottomItem {
      font-size: 14px;
      list-style: none;
      margin-bottom: 10px;
    }

    // Menu slide animations.
    &-right {
      transition: all .3s ease;
      right: -550px;
      opacity: 0;
    }
    &-left {
      transition: all .3s ease;
    }
  }
</style>
