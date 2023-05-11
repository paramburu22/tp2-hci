<script setup>
import NavBarComponent from '@/components/NavBarComponent.vue';
const devices = [
    { title: 'Rutina 1', acciones: [
    {
      subtitle: 'Luz 1', from: 'Casa', icon: 'mdi-lightbulb-on', 
      states:['Intensidad: 23%', 'Color: Violeta']
    },
    {
      subtitle: 'Aire Ac', from: 'Casa', icon: 'mdi-air-conditioner',
      states:['24º', '0º horizontal']
    },
    {
      subtitle: 'Luz 3', from: 'Oficina', icon: 'mdi-lightbulb-on',
      states:['Intensidad: 23%', 'Color: Violeta']
    },
    ] },
    { title: 'Rutina 2', acciones: [
    {
      subtitle: 'Luz 1', from: 'Casa', icon: 'mdi-lightbulb-on', 
      states:['Intensidad: 23%', 'Color: Violeta']
    },
    {
      subtitle: 'Aire Ac', from: 'Casa', icon: 'mdi-air-conditioner',
      states:['24º', '0º horizontal']
    },
    {
      subtitle: 'Luz 3', from: 'Oficina', icon: 'mdi-lightbulb-on',
      states:['Intensidad: 23%', 'Color: Violeta']
    },
    {
      subtitle: 'Luz 3', from: 'Oficina', icon: 'mdi-lightbulb-on',
      states:['Intensidad: 23%', 'Color: Violeta']
    },
    ] },
    { title: 'Rutina 3', acciones: [
    {
      subtitle: 'Luz 1', from: 'Casa', icon: 'mdi-lightbulb-on', 
      states:['Intensidad: 23%', 'Color: Violeta']
    },
    {
      subtitle: 'Aire Ac', from: 'Casa', icon: 'mdi-air-conditioner',
      states:['24º', '0º horizontal']
    },
    {
      subtitle: 'Luz 3', from: 'Oficina', icon: 'mdi-lightbulb-on',
      states:['Intensidad: 23%', 'Color: Violeta']
    },
    ] },
    { title: 'Rutina 4', acciones: [
    {
      subtitle: 'Luz 1', from: 'Casa', icon: 'mdi-lightbulb-on', 
      states:['Intensidad: 23%', 'Color: Violeta']
    },
    {
      subtitle: 'Aire Ac', from: 'Casa', icon: 'mdi-air-conditioner',
      states:['24º', '0º horizontal']
    },
    {
      subtitle: 'Luz 3', from: 'Oficina', icon: 'mdi-lightbulb-on',
      states:['Intensidad: 23%', 'Color: Violeta']
    },
    ] }
    /*{ title: 'Luz 2', icon:'mdi-lightbulb' ,state_light: 'Apagado', state_color:'purple', intensity:'50'},*/
];
import { ref } from 'vue';
const menu = ref(false);
const light1 = ref({
  red: 0,
  blue: 0,
  green: 0,
})

const menu2 = {
  data() {
    return {
      colorMenu: false,
      props: {
    color: {
      type: String,
      default: "#ffffff",
    },
    slider1: {
      type: Number,
      default: 50,
    },
    slider2: {
      type: Number,
      default: 50,
    },
  },
  methods: {
    toggleColorMenu() {
      this.colorMenu = !this.colorMenu
    },
    setColor(color) {
      document.documentElement.style.setProperty('--primary-color', color);
      this.toggleColorMenu();
    }
  }
}
  }
}
</script>

<template>
  <v-layout>
      <NavBarComponent />
      <v-main class="bg"> 
          <v-container>
             <v-card class="card_container">
                  <v-list-item>
                      <v-card-item title="Mis Rutinas"/>
                      <template v-slot:append>
                          <v-btn variant="text" size="x-large" icon>
                              <v-icon color="#146C94">mdi-pencil</v-icon>
                          </v-btn>
                      </template>
                  </v-list-item>
                      <v-list class="horizontal_v_list d-flex align-start overflow-y-auto" >
                          <v-list-item active="false" class="horizontal_v_list_card"
                              v-for="(item, index) in devices"
                                  :key="index"
                                  :value="index"
                              >
                              <v-list-item >
                                <v-list-item-title flexibility="space-between"  v-text="item.title"></v-list-item-title> 
                                <template v-slot:prepend>
                                        <v-icon color="#146C94">mdi-heart</v-icon>
                                </template>
                                <template v-slot:append>
                                    <v-switch class="mt-4"></v-switch>
                                </template>
                                </v-list-item>
                                <v-divider></v-divider>
                                
                          <v-list-item active="false" class=" mt-2 mb-2 vertical_v_list_c1 d-flex align-start "
                              v-for="(elem, index) in item.acciones"
                                  :key="index"
                                  :value="index"
                              >
                                <v-list-item >
                                  <template v-slot:prepend>
                                        <v-icon color="#146C94">{{elem.icon}}</v-icon>
                                    </template>
                                  <v-row>
                                  <v-col>
                                    <v-list-item-title>{{ elem.subtitle }}</v-list-item-title>
                                    <v-list-item-subtitle>{{ elem.from }}</v-list-item-subtitle>
                                  </v-col><!--
                                  <v-col>
                                    <template v-slot:prepend>
                                        <v-icon color="#146C94">{{elem.icon}}</v-icon>
                                    </template>
                                  </v-col>
                                
                                   <v-col>
                                    <v-list-item-text  mt-1 class="details mb-1" v-text="elem.states"></v-list-item-text>
                                   </v-col>-->
                                   <v-col >
                                    <v-list-item-text active="false" class="mt-1 mb-2 vertical_v_list_c1 "
                                    v-for="(elem2, index) in elem.states"
                                      :key="index"
                                      :value="index"
                                   >
                                   <p class="details">{{ elem2 }}</p>
                                  </v-list-item-text>
                                   </v-col>
                                  </v-row>
                                </v-list-item>

                              </v-list-item>
                            
                          </v-list-item>
                      </v-list> 
              </v-card> 
          </v-container> 
      </v-main>
  </v-layout>
  
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url("@/assets/homeBackground.jpeg");
  background-size: cover;
  overflow-y: scroll;
}
.card_container{
  border-radius: 20px;
  background-color: #d5dbe0;
  margin-top: 50px;
  margin-left: 50px;
  height: 600px;
  width: 1000px;
  font-family: 'Varela Round', sans-serif, bold;
  color: rgb(20, 108, 148);
}
h2{
  color: #FFF;
  font-family: 'Varela Round', sans-serif;
  font-size: 32px;
  margin-top: 115px;
  margin-bottom: 2px;
  margin-left: 300px;
}

.horizontal_v_list {
  flex-direction: row;
  background-color: transparent;
  opacity: 1 !important;
  height: 500;
}
.horizontal_v_list_card{
  font-family: 'Varela Round', sans-serif;
  background-color: white;
  border-radius: 20px;
  opacity: 1 !important;
  margin-left: 30px;
  width: 300px;
  box-shadow: 3px 4px 5px #6394a2;
  transform: translateZ(0);
  height: 100%;

  
}

.vertical_v_list_c1{
  display:flex;
  font-family: 'Varela Round', sans-serif;
  background-color: transparent;
  border-radius: 20px;
  opacity: 1 !important;
  transform: translateZ(0);
}

.details{
  font-family: 'Varela Round', sans-serif;
  font-size: 8px;
}


</style>