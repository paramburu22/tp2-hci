<script setup>
  import LogoComponent from '@/components/LogoComponent.vue';
  const items1 = [
    { title: 'Casa'},
    { title: 'Oficina' },
  ]
  const items2 = [
    { title: 'Hab. 1', place:'Casa' },
    { title: 'Hab. 3', place:'Oficina' },
  ]
  const items3 = [
    { title: 'Alarma 1', place: 'Casa', mode:'Modo Regular'},
    { title: 'Alarma', place: 'Oficina', mode:'Modo Regular' },
  ]
  const recents = [
    { title: 'Alarma 1', place: 'Casa', icon:'mdi-alarm-light-outline'},
    { title: 'Aire Acondicionado', place: 'Casa', room:'Habitacion1', icon:'mdi-air-conditioner'},
    { title: 'Luz 2', place: 'Casa', room:'Habitacion1',icon:'mdi-lightbulb' },
    { title: 'Alarma 1', place: 'Casa', icon:'mdi-alarm-light-outline'},
    { title: 'Aire Acondicionado', place: 'Casa', room:'Habitacion1', icon:'mdi-air-conditioner'},
    { title: 'Luz 2', place: 'Casa', room:'Habitacion1',icon:'mdi-lightbulb' },
    { title: 'Alarma 1', place: 'Casa', icon:'mdi-alarm-light-outline'},
  ]
</script>


<template>
  <v-container class="bg" fluid>
    <v-navigation-drawer  color="#146c94" >
      <v-list-item>
        <LogoComponent />
      </v-list-item>
      <v-col mb-15 class="flex-column text-left d-flex" justify="space-between">
        <v-row mb-5>
          <v-btn width="210" prepend-icon="mdi-home" variant="text" class="card_container text-left ml-5 mt-10 mb-5" style="justify-content: flex-start">Inicio</v-btn>
          <v-btn width="210" prepend-icon="mdi-devices" variant="text" class="card_container2 text-left ml-5 mt-5 mb-5" style="justify-content: flex-start">Mis Dispositivos</v-btn>
          <v-btn width="210" prepend-icon="mdi-clipboard-check-multiple" variant="text" class="card_container2 text-left ml-5 mt-5 mb-5" style="justify-content: flex-start">Mis Rutinas</v-btn>
          <v-btn width="210" prepend-icon="mdi-help-circle-outline" variant="text" class="card_container2 text-left ml-5 mt-5 mb-16" style="justify-content: flex-start">Ayuda</v-btn>
          <v-btn width="210" prepend-icon="mdi-close" variant="text" class="flex-column align-self-end card_container3 text-left ml-5 mt-16" style="justify-content: flex-start" >Cerrar</v-btn>
        </v-row>  
      </v-col>
    </v-navigation-drawer>
    <div class="upper_bar">
      <v-toolbar>
          <v-spacer></v-spacer>
          <v-btn icon  class="mt-5">
            <v-icon color="#146C94">mdi-account</v-icon>
          </v-btn>
      </v-toolbar>
    </div>
    <div>
      <v-row cols="6">
        <v-col>
          <h2>FAVORITOS</h2>
        </v-col>
        <v-col>
          <h2 class="title2">RECIENTES</h2>
        </v-col>
      </v-row>
    </div>
    <v-row>
      <v-card class="card_container4 card_c1">
        <v-row>
        <v-card-actions>
          <v-container>
              <v-list class="horizontal_v_list">
                <v-list-item class="horizontal_v_list_c1"
                    v-for="(item, index) in items1"
                    :key="index"
                    :value="index"
                    >
                      <v-list-item-title v-text="item.title"></v-list-item-title> 
                        <template v-slot:append>
                          <v-icon color="#146C94" class="v-list-item-icon">mdi-heart</v-icon>
                        </template>
                  </v-list-item>
              
              </v-list>
          </v-container>
        </v-card-actions>
        </v-row>
        <v-row>
          <v-card-actions>
          <v-container>
            <v-list class="horizontal_v_list">
                <v-list-item height="80" class="horizontal_v_list_c1"
                    v-for="(item,index) in items2"
                    :key="index"
                    :value="index">
                        <v-list-item-title v-text="item.title"></v-list-item-title> 
                            <template v-slot:append>
                              <v-icon class="mb-7 v-list-item-icon" color="#146C94">mdi-heart</v-icon>
                            </template>
                        <v-list-item-subtitle class="mt-1" v-text="item.place"></v-list-item-subtitle>
                  </v-list-item>
              </v-list>
            </v-container>
        </v-card-actions>
        </v-row>
        <v-row>
          <v-card-actions>
          <v-container>
            <v-list class="horizontal_v_list">
                <v-list-item height="120" width="270" class="horizontal_v_list_c1"
                    v-for="(item,index) in items3"
                    :key="index"
                    :value="index">
                        <v-list-item-title class="ml-1" v-text="item.title"></v-list-item-title> 
                        <template v-slot:prepend>
                          <v-icon class="mb-16 v-list-item-icon">mdi-alarm-light-outline</v-icon>
                        </template>
                        <template v-slot:append>
                          <v-icon class="mb-16 v-list-item-icon" color="#146C94">mdi-heart</v-icon>
                        </template>
                        <v-list-item-subtitle class="mt-3 ml-1" v-text="item.place"></v-list-item-subtitle>
                        <v-list-item-subtitle class="mt-1 ml-1" v-text="item.mode"></v-list-item-subtitle>
                  </v-list-item>
                  <v-list-item>
                    <v-btn size="x-large" icon>
                        <v-icon color="#146C94">mdi-chevron-right</v-icon>
                    </v-btn>
                  </v-list-item>
              </v-list>
            </v-container>
        </v-card-actions>
        </v-row>
      </v-card>
      <v-card class="card_container4 card_c2 d-flex flex-column align-center">
        <v-list class="vertical_v_list ">
          <v-list-item width="250" class="mb-3  vertical_v_list_c1"
            v-for="(item,index) in recents"
            :key="index"
            :value="index">
            <v-list-item-title  v-text="item.title"></v-list-item-title> 
            <template v-slot:prepend>
              <v-icon class="mr-3 v-list-item-icon">{{item.icon}}</v-icon>
            </template>
            <v-list-item-subtitle v-text="item.place"></v-list-item-subtitle>
            <v-list-item-subtitle v-text="item.room"></v-list-item-subtitle>

          </v-list-item>
        </v-list>

      </v-card>

</v-row>
</v-container>
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
.upper_bar {
  position: absolute;
  color: rgb(20, 108, 148);
  font-family: 'Varela Round', sans-serif;
  background-color: #FFF;
  width: 100%;
  height: 10%;
  top: 0;
  left: 0;
}
.v-toolbar{
  height: 100%;
  position: absolute;
}
.card_container4{
  border-radius: 20px;
  background-color: #d5dbe0;
  height: 520px;
}
.card_container5{
  background-color: #FFF;
  width: 30px;
}
.card_cb1{
  height:20px;
}
.card_cb2{
  height: 40px;
}
.card_cb3{
  height: 60px
}
.card_c1{
  margin-left: 280px;
  width: 700px;
}
.card_c2{
  margin-left: 40px;
  width: 300px;
}
.card_container {
  color: rgb(20, 108, 148);
  font-family: 'Varela Round', sans-serif, bold;
  border-radius: 20px;
  background-color: #29ABE2;
  padding-left: 5;
  align-items: text-left, flex-start;
}
.card_container2 {
  color: #FFF;
  font-family: 'Varela Round', sans-serif;
  border-radius: 20px;
  align-items: text-left, flex-start;
}
.card_container3 {
  color: #29ABE2;
  font-family: 'Varela Round', sans-serif;
  border-radius: 20px;
  align-items: flex-start;
}
.text_c1{
  color: #767272;
}
h2{
  color: #FFF;
  font-family: 'Varela Round', sans-serif;
  font-size: 32px;
  margin-top: 115px;
  margin-bottom: 2px;
  margin-left: 300px;
}
.title2{
  margin-left: 330px;
}
.horizontal_v_list {
  display: flex;
  flex-direction: row;
  background-color: transparent;
}

.horizontal_v_list div {
  margin-right: 10px;
  margin-left: 10px;
  margin-top: 15px;
  margin-bottom: 15px;
}
.horizontal_v_list_c1{
  font-family: 'Varela Round', sans-serif;
  align-items: flex-start;
  background-color: white;
  border-radius: 20px;
  opacity: 1 !important;
}

.v-list-item-icon{
  opacity: 1 !important;
}

.vertical_v_list {
  background-color: transparent;
  margin-right: 10px;
  margin-left: 10px;
  margin-top: 15px;
  height: 100%;
}
.vertical_v_list_c1{
  font-family: 'Varela Round', sans-serif;
  background-color: white;
  border-radius: 20px;
  opacity: 1 !important;
}
</style>
