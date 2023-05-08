<script setup>
import NavBarComponent from '@/components/NavBarComponent.vue';
const devices = [
    { title: 'Luz 1', icon:'mdi-lightbulb' ,state_light: 'Apagado', state_color:'purple', intensity:'50%'},
    /*{ title: 'Luz 2', icon:'mdi-lightbulb' ,state_light: 'Apagado', state_color:'purple', intensity:'50'},*/
]
import { ref } from 'vue';
import { defineComponent } from 'vue'
      const menu = ref(false);

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
                        <v-card-item title="Habitación 1"/>
                        <template v-slot:append>
                            <v-btn variant="text" size="x-large" icon>
                                <v-icon color="#146C94">mdi-pencil</v-icon>
                            </v-btn>
                        </template>
                        <template v-slot:prepend>
                            <v-btn variant="text" size="x-large" icon>
                                <v-icon color="#146C94">mdi-chevron-left</v-icon>
                            </v-btn>
                        </template>
                    </v-list-item>
                        <v-list class="horizontal_v_list">
                            <v-list-item class="horizontal_v_list_card flex-column text-left"
                                v-for="(item, index) in devices"
                                    :key="index"
                                    :value="index"
                                >
                                <v-list-item >
                                <v-list-item-title flexibility="space-between" ml-10 v-text="item.title"></v-list-item-title> 
                                <template v-slot:prepend>
                                        <v-icon color="#146C94">{{item.icon}}</v-icon>
                                </template>
                                <template v-slot:append>
                                        <v-icon color="#146C94">mdi-heart</v-icon>
                                </template>
                                </v-list-item>
                                <v-divider></v-divider>
                                <v-list-item class="mb-1">
                                    <v-list-item  v-text="item.state_light"></v-list-item>
                                    <template v-slot:append>
                                        <v-switch class="mt-3"></v-switch>
                                    </template>
                                </v-list-item>
                                <v-divider></v-divider>
                                <v-list-item class="mt-2 mb-2">
                                <!--<v-list-subtitle>{{ item.state_color }}</v-list-subtitle>-->
                                <div>
                                    <v-menu background-color="black" v-model="menu" :close-on-content-click="false" location="end" >
                                        <template v-slot:activator="{ props }" v-slot:prepend>
                                            <v-btn class="container_button" v-bind="props"></v-btn>
                                        </template>
                                        <div class="menu2">
                                        <v-card min-width="250">
                                            <v-list>
                                                <v-list-item class="pr-7 pl-5" >
                                                    <p>Cambia el color</p>
                                                </v-list-item>
                                            </v-list>
                                            <v-divider></v-divider>
                                            <v-list>
                                                <v-list-item class="menu2" >
                                                    <v-row align="center" justify="space-between" no-gutters>
                                                        <v-card width="400" height="370" style="margin: auto">
                                                            <v-responsive :style="{ background: `rgb(${red}, ${green}, ${blue})` }" height="150px"></v-responsive>
                                                            <v-card-text class="menu2">
                                                                    <v-slider v-model="red" :max="255" :step="1" label="R" hide-details class="ma-4">
                                                                        <template v-slot:append>
                                                                            <v-text-field v-model="red" type="number" style="width: 80px" density="compact" hide-details variant="outlined" ></v-text-field>
                                                                        </template>
                                                                    </v-slider>
                                                                    <v-slider v-model="green" :max="255" :step="1" label="G" hide-details class="ma-4">
                                                                        <template v-slot:append>
                                                                            <v-text-field v-model="green" type="number" style="width: 80px" density="compact" hide-details variant="outlined" ></v-text-field>
                                                                        </template>
                                                                    </v-slider>
                                                                    <v-slider v-model="blue" :max="255" :step="1" label="B" hide-details class="ma-4">
                                                                        <template v-slot:append>
                                                                            <v-text-field v-model="blue" type="number" style="width: 80px" density="compact" hide-details variant="outlined" ></v-text-field>
                                                                        </template>
                                                                    </v-slider>
                                                            </v-card-text>
                                                        </v-card>
                                                        </v-row>
                                                    </v-list-item>
                                                </v-list>
                                                <v-card-actions>
                                                    <v-spacer></v-spacer>
                                                   <v-btn color="primary" variant="text" @click="menu = false">Cerrar</v-btn>
                                                </v-card-actions>
                                            </v-card>
                                        </div>
                                    </v-menu>
                                </div>
                            </v-list-item>
                            <v-divider></v-divider>
                            <v-list-item>
                            <v-list-subtitle>Intensidad: </v-list-subtitle>
                            <v-list-subtitle>{{ item.intensity }}</v-list-subtitle>
                                <v-slider width="30px" thumb-label="always"></v-slider>
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
  display: flex;
  flex-direction: row;
  background-color: transparent;
  opacity: 1 !important;

}
.horizontal_v_list_card{
  font-family: 'Varela Round', sans-serif;
  background-color: white;
  border-radius: 20px;
  opacity: 1 !important;
  margin-left: 30px;
  width: 250px;
  box-shadow: 3px 4px 5px #6394a2;
  transform: translateZ(0);
  height: 300px;
  
}

.list_card{
    font-family: 'Varela Round', sans-serif;
  align-items: flex-start;
  background-color: xwhite;
}

.container2{
    background-color: #6f6d76;
    margin-top: 20px;
    margin-left: 100px;
    border-radius: 20px;
    height: 520px;
    width: 800px;
  }

</style>