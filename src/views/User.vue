<script setup>
    import LogoComponent from '@/components/LogoComponent.vue';
</script>

<template>
  <v-layout  class="bg">
    <v-main>
      <v-container fluid>
        <v-card class="card_container">
          <v-row>
            <v-card class="user_container">
                <img src="/assets/usuario.png" class="imgClass"/>
            </v-card>
            <v-card class="content_container">
              <v-list>
                <v-list-item>
                  <v-list-item-title class="text">Pepe Pepito</v-list-item-title>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item>
                  <p class="text">Direcciones:</p>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item>
                  <p class="text">Mail asociado:</p>
                </v-list-item>
                <v-divider></v-divider>
                <v-list-item height="200">
                  <p class="text">Familia asociada:</p>
                </v-list-item>
              </v-list>
            </v-card>
          </v-row>
        </v-card>
    </v-container>
    </v-main>
  </v-layout>
    
</template>

<style>
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
  height: 710px;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 30px;
  margin-right: 30px;
  
}

.user_container{
    border-radius: 20px;
    background-color: white;
    height: 600px;
    margin-top: 50px;
    margin-bottom: 50px;
    margin-left: 50px;
    width: 500px;
}

.content_container{
  border-radius: 20px;
  background-color: transparent;
  margin-left: 70px;
  margin-top: 50px;
  margin-bottom: 50px;
  margin-right:50px;
  width: 680px;
}
.imgClass{
  height: 90px;
  width: 150px;
  margin-right: -50px;
  margin-left: -50px;
}

.text{
  background-color: transparent;
  font-family: 'Varela Round', sans-serif;
  font-size: 25px;
  margin-top: 20px;
  margin-bottom: 10px;
  margin-left: 10px;
}
</style>