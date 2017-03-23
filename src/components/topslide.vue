<template>
  <div class="topslide">
    <ul v-if="!currentParent">
      <li @click="setParent(item.uuid)" v-for="item in slideMenu">{{ item.title }}</li>
      <span class="slide-menu__button"> apply now </span>
    </ul>

    <div v-if="currentParent">
      <span @click="setParent('')" class="nav__opener"><</span>
      <h2 v-for="item in currentParentItem">{{ item.title }}</h2>
      <ul>
        <li v-for="item in findChildren"><a v-bind:href="item.link">{{item.title}}</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    data() {
      return {}
    },
    methods: {
      ...mapActions([
        'toggleMenu',
        'setParent',
      ])
    },
    computed: {
      ...mapGetters([
        'currentParent',
        'currentParentItem',
        'menuItems',
        'findItems',
        'slideMenu',
        'findChildren'
      ]),
    }
  }
</script>


<style lang="scss">

</style>