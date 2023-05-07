<script setup>
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import NavBarComponent from '@/components/NavBarComponent.vue'

const showNavBar = computed(() => {
  return useRouter().currentRoute.value.path !== '/';
});

</script>

<template>
  <div id="app">
    <v-app>
      <NavBarComponent v-if="showNavBar"/>
      <RouterView/>
    </v-app>
  </div>
</template>

<style scoped>
</style>
