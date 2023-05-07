<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn size="large" class="dropdown" v-bind="props" width="150">
        {{ selectedHome.title }}
        <template v-slot:append>
          <v-icon size="small">mdi-arrow-down</v-icon>
        </template>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        :value="index"
        @click="setSelectedHome(item)"
        >
        <v-list-item-content>
          <div class="dropdown_options">
            <v-icon v-if="item.props.icon" size="small">{{ item.props.prependIcon }}</v-icon>
            <v-list-item-title variant="text">{{ item.title }}</v-list-item-title> 
          </div>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup>
  import { ref } from 'vue';
  const items = [
    {
      title: 'CASA',
      value: 1, 
      props: {
        icon: false,
      },
     },
    {
      title: 'OFICINA',
      value: 2,
      props: {
        icon: false,
      },
    },
    {
      title: 'AGREGAR',
      value: 3,
      props: {
        icon: true,
        prependIcon: 'mdi-plus',
      },
    },
  ]
  const selectedHome = ref(items[0]);

  function setSelectedHome (newHome) {
    selectedHome.value = newHome
  }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');
.dropdown {
  background-color: #96a0a4;
  font-family: 'Varela Round', sans-serif;
  font-size: medium;
  color:#222d32;
  opacity: 0.7;
  border-radius: 0px;
}

.dropdown_options {
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
}
</style>

