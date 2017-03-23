<template>
  <div id="app">
    <navbar></navbar>
    <slidemenu></slidemenu>
  </div>
</template>

<script>
  import navbar from './components/navbar.vue';
  import slidemenu from './components/slidemenu.vue';

  export default {
    components: {
      navbar,
      slidemenu,
    }
  }
</script>