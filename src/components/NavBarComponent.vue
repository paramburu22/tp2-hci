<template>
  <v-navigation-drawer height="100%" permanent color="rgb(20, 108, 148)" class="nav_content">
    <div class="nav_content">
      <v-list>
        <v-list-item>
          <LogoComponent />
        </v-list-item>
        <v-btn
          v-for="(item, index) in options"
          :key="index"
          :value="index"
          @click="navigate(item.routeName)"
          width="210"
          :prepend-icon="item.icon"
          variant="text"
          class="menu_buttons"
          :class="router.currentRoute.value.name === item.routeName ? 'selected' : ''"
        >{{ item.displayName }}
        </v-btn>
      </v-list>
      <v-btn width="210" prepend-icon="mdi-logout" variant="text" class="close_button text-left ml-5 mt-15 mb-5" style="justify-content: flex-start" @click=navigate()>Cerrar Sesión</v-btn>
    </div>
  </v-navigation-drawer>
  <v-app-bar height="80" class="app_bar_content">
    <template v-slot:append>
      <v-icon>mdi-account</v-icon>
    </template>
  </v-app-bar>
</template>

<script setup>
  import LogoComponent from './LogoComponent.vue';
  import { useRouter } from 'vue-router';
  import { ref, computed } from 'vue';


  const options = ref([
    {
      icon: "mdi-home",
      displayName: "Inicio",
      routeName:"home",
    },
    {
      icon: "mdi-clipboard-check-multiple",
      displayName: "Mis Rutinas",
      routeName: "myroutines",
    },
    {
      icon: "mdi-help-circle-outline",
      displayName: "Ayuda",
      routeName: "help",
    },
  ]);

  const router = useRouter();

  function navigate(route) {
    if (!route) {
      return router.push('/');
    }
    return router.push(`/${route.toLowerCase()}`);
  }

  const isHome = computed(() => router.currentRoute.value.path !== '/home');
</script>

<style scoped>
.selected {
  color: rgb(20, 108, 148);
  background-color: #29ABE2;
}
.menu_buttons {
  color: #FFF;
  font-family: 'Varela Round', sans-serif;
  border-radius: 20px;
  margin: 5px;
  justify-content: flex-start;
  margin: 15px 0 15px 15px;
}
.close_button {
  color: #29ABE2;
  font-family: 'Varela Round', sans-serif;
  border-radius: 20px;
}

.nav_content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.app_bar_content {
  padding-right: 20px !important;
  padding-left: 20px !important;
}
</style>

