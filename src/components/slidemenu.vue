<template>
  <transition
    @enter="slideIn"
    @leave="slideOut"
    :css="false">
    <div class="slidemenu" v-if="menuOpen">
      <span @click="toggleMenu" class="nav__opener">X</span>

      <div class="slide-menu__items">
        <component v-bind:is="view"></component>
      </div>
    </div>
  </transition>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import topSlide from './topslide.vue'
  import $ from 'jquery'

  export default {
    data() {
      return {
        view: topSlide,
      }
    },
    methods: {
      ...mapActions([
        'toggleMenu',
      ]),
      slideIn(el, done) {
        console.log('sliding in');

        const e = $(el);

        e.animate({
          right: '0px',
        }, 500);

        done();
      },
      slideOut(el, done) {
        console.log('sliding out');

        const e = $(el);

        e.animate({
          right: '-300px',
        }, 500);

        done();
      },
    },
    computed: {
      ...mapGetters([
        'menuOpen',
      ]),
    },
    components: {
      topSlide,
    },
  }
</script>


<style lang="scss">
  .slidemenu {
    height: 100%;
    position: absolute;
    background: white;
    top: 0;
    right: -300px;
    width: 300px;
    z-index: 10;
    border-left: 1px black solid;
    padding: 25px;
  }

  .nav__opener {
    padding: 25px;
    cursor: pointer;
    font-size: 30px;
  }

</style>