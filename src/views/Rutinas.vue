<script setup>
  import NavBarComponent from '@/components/NavBarComponent.vue';
  import { ref } from 'vue';
      const fav = ref(true);
      const menu = ref(false);
      const message = ref(false);
      const hints = ref(true);
</script>


<template>
  <v-layout >
    <NavBarComponent/>
    <v-main class="bg">
      <v-container class="container_content">
        <h2> MIS RUTINAS</h2>
        <v-card class="container">
        <div>
        <v-row class="mt-10 ml-10">
          <v-menu
          v-model="menu"
          :close-on-content-click="false"
          location="end"
          >
          <template v-slot:activator="{ props }">
            <v-btn class="container_button"     v-bind="props"   >
            RUTINA 1
            </v-btn>
          </template>

          <v-card min-width="350">

            <v-list>
              <v-list-item class="routineFontTitle pr-7 pl-5" >
                <p>Rutina 1</p>
                <template v-slot:append>
                  <v-row align="center">
                    <v-btn
                      variant="text"
                      :class="fav ? 'text-blue' : 'text-black'"
                      icon
                      @click="fav = !fav"
                    >
                      <v-icon>mdi-heart</v-icon>
                    </v-btn>
                    <v-switch v-model="message" color="blue" hide-details></v-switch>
                  </v-row>
                </template>
              </v-list-item>
            </v-list>


            <v-divider></v-divider>

            <v-list>
              <v-list-item class="routineFont" >
                  <v-row align="center" justify="space-between" no-gutters>
                    <div class="d-flex flex-row align-center">
                      <v-icon size="x-small" class="mr-2">mdi-air-conditioner</v-icon>
                      <p>Aire ac. (Casa/Hab. 1)</p>
                    </div>
                    <v-icon size="small">mdi-toggle-switch</v-icon>  
                  </v-row>
                  <v-row align="center" justify="space-between" no-gutters>
                    <div class="d-flex flex-row align-center">
                      <v-icon size="x-small" class="mr-2">mdi-lightbulb-on</v-icon>
                      <p>Aire ac. (Casa/Hab. 1)</p>
                    </div>
                    <v-icon size="small">mdi-toggle-switch</v-icon>  
                  </v-row>
              </v-list-item>
            </v-list>
          

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
            variant="text"
          
          >
            Editar
          </v-btn>
              <v-btn
                color="primary"
                variant="text"
                @click="menu = false"
              >
                Cerrar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
        </v-row>
        </div>
      </v-card>
      </v-container>

       

    
      <v-footer class="add-button-container" absolute>
          <v-icon size="50px" @click="menu=true" color="white">mdi-plus-circle-outline</v-icon>   <!-- hay q cambiar la accion del click-->
      </v-footer>

      </v-main>
  </v-layout>
  
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Condensed&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap');
.bg {
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
  left: 0;
  background-image: url("@/assets/homeBackground.jpeg");
  background-size: cover;
  overflow-y: scroll;
}

h2{
  color: #FFF;
  font-family: 'Varela Round', sans-serif;
  font-size: 32px;
}
.routineFont {
  font-family: "IBM Plex Sans Condensed", sans-serif;
  font-size: 20px;
  font-weight: bold;
  color: #29abe2;
  }
  .routineFontTitle {
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 30px;
  font-weight: bold;
  color: #29abe2;
  }

  .add-button-container {
  position: fixed;
  bottom: 16px;
  right: 32px;
  background-color: transparent;
}
  .container{
    background-color: #6f6d76;
    margin-top: 20px;
    margin-left: 100px;
    border-radius: 20px;
    height: 520px;
    width: 800px;
  }
  .container_content{
    padding-top: 30px;
    padding-left: 20px;
  }

  .container_button{
    color:"white";
    border-radius: 40px;
    size: "xl";
    font-family: 'Varela Round', sans-serif;
  }

</style>
