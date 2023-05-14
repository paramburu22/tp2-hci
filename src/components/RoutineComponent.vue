<script setup>
// const devices = {
//      title: 'Rutina 1', acciones: [
//     {
//       subtitle: 'Luz 1', from: 'Casa', icon: 'mdi-lightbulb-on', 
//       states:['Intensidad: 23%', 'Color: Violeta']
//     },
//     {
//       subtitle: 'Aire Ac', from: 'Casa', icon: 'mdi-air-conditioner',
//       states:['24º', '0º horizontal']
//     },
//     {
//       subtitle: 'Luz 3', from: 'Oficina', icon: 'mdi-lightbulb-on',
//       states:['Intensidad: 23%', 'Color: Violeta']
//     },
// ]};

</script>
<template>

<v-card active="false" class="horizontal_v_list_card mt-2">
        <v-row flexibility="space-between" class="same_line ml-6 mr-6">
            <v-icon color="#146C94">mdi-calendar-refresh</v-icon>
            <p>{{devices.title}}</p>
            <v-btn :icon="true" variant="flat" color="transparent" @click="toggleFaved">
                <v-icon>{{ faved ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
            </v-btn>
        </v-row> 
        <v-divider></v-divider>
        
        <v-card active="false" class=" mt-1 mb-1 vertical_v_list_c1 d-flex align-start "
            v-for="(elem, index) in devices.acciones"
            :key="index"
            :value="index"
        >
        <v-row >
            <template v-slot:prepend>
                <v-icon color="#146C94">{{elem.icon}}</v-icon>
            </template>
            <v-row class="same_line">
              <v-col>
                <v-list-item-title>{{ elem.subtitle }}</v-list-item-title>
                <v-list-item-subtitle>{{ elem.from }}</v-list-item-subtitle>
              </v-col>
            <!--
            <v-col>
            <template v-slot:prepend>
                <v-icon color="#146C94">{{elem.icon}}</v-icon>
            </template>
            </v-col>
        
            <v-col>
            <v-list-item-text  mt-1 class="details mb-1" v-text="elem.states"></v-list-item-text>
            </v-col>-->
            <v-col >
            <p active="false" class="mt-1 mb-2 vertical_v_list_c1 "
            v-for="(elem2, index) in elem.states"
                :key="index"
                :value="index"
            >
            <p class="details">{{ elem2 }}</p>
            </p>
            </v-col>
            </v-row>
        </v-row>

        </v-card>
    </v-card>

  
</template>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');
.same_line{
    justify-content: space-between;
    margin: 0;
    align-items: center;
}

.horizontal_v_list_card{
  font-family: 'Varela Round', sans-serif;
  background-color: white;
  border-radius: 20px;
  opacity: 1 !important;
  width: 250px;
  justify-content: center;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-right : 10px;
}

.vertical_v_list_c1{
  display:flex;
  font-family: 'Varela Round', sans-serif;
  background-color: rgb(195, 191, 191);
  border-radius: 15px;
  opacity: 1 !important;
  transform: translateZ(0);
  padding-left: 15px;
}

.details{
  font-family: 'Varela Round', sans-serif;
  font-size: 8px;
}


</style>