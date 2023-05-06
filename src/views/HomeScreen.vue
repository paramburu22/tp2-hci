<script setup>
  import LogoComponent from '@/components/LogoComponent.vue';
</script>


<template>
  <v-container class="bg" fluid>
    <v-navigation-drawer  color="#146c94" >
      <v-list-item>
        <LogoComponent />
      </v-list-item>
      <v-col mb-15 class="text-left d-flex" justify="space-between">
        <v-row mb-5>
          <v-btn width="210" prepend-icon="mdi-home" variant="text" class="card_container text-left ml-5 mt-10 mb-5" style="justify-content: flex-start">Inicio</v-btn>
          <v-btn width="210" prepend-icon="mdi-devices" variant="text" class="card_container2 text-left ml-5 mt-5 mb-5" style="justify-content: flex-start">Mis Dispositivos</v-btn>
          <v-btn width="210" prepend-icon="mdi-clipboard-check-multiple" variant="text" class="card_container2 text-left ml-5 mt-5 mb-5" style="justify-content: flex-start">Mis Rutinas</v-btn>
          <v-btn width="210" prepend-icon="mdi-help-circle-outline" variant="text" class="card_container2 text-left ml-5 mt-5 mb-16" style="justify-content: flex-start">Ayuda</v-btn>
          <v-space></v-space>
          <v-btn width="210" prepend-icon="mdi-close" variant="text" class="card_container3 text-left ml-5 mt-16" style="justify-content: flex-start" >Cerrar</v-btn>
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
      <v-row cols="5">
        <v-col>
          <h2>FAVORITOS</h2>
        </v-col>
        <v-col>
          <h2>DESTACADOS</h2>
        </v-col>
      </v-row>
    </div>
    <v-row>
      <v-card class="card_container4 card_c1">
        <v-row>
        <v-card-actions>
          <v-container>
            <v-row dense>
              <v-col cols="12">
                <v-btn size="large" width="100" rounded="lg" variant="flat">Casa
                  <template v-slot:append>
                    <v-icon color="#146C94">mdi-heart</v-icon>
                  </template>
                </v-btn> 
              </v-col>
            
            </v-row>
            </v-container>
        </v-card-actions>
        </v-row>
        <v-row>
          <v-card-actions>
          <v-container>
            <v-row dense>
              <v-col cols="12">
                <v-btn size="large" width="100" rounded="lg" variant="flat">Hab1
                  <template v-slot:append>
                    <v-icon color="#146C94">mdi-heart</v-icon>
                  </template>
                </v-btn> 
              </v-col>
            </v-row>
            </v-container>
        </v-card-actions>
        </v-row>
        <v-row>
          <v-card-actions>
          <v-container>
            <v-row dense>
              <v-col cols="12">
                <v-btn size="large" width="200" rounded="lg" variant="flat">Alarma1
                  <template v-slot:append>
                    <v-icon color="#146C94">mdi-heart</v-icon>
                  </template>
                </v-btn> 
              </v-col>
            </v-row>
            </v-container>
        </v-card-actions>
        </v-row>
      </v-card>
      <v-card class="card_container4 card_c2">

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
  margin-left: 10px;
  width: 400px;
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
  align-items: text-left, flex-start;
}
h2{
  color: #FFF;
  font-family: 'Varela Round', sans-serif;
  font-size: 32px;
  margin-top: 115px;
  margin-bottom: 2px;
  margin-left: 300px;
}


</style>
