<script setup>
    import { ref, computed } from 'vue';
    const speaker = ref(
        { open: false, title: 'Parlante', model: 'Apagada', red: 0, blue: 0, green: 0 , hexa:'#000000', 
        cardColor: 'rgb(0, 0, 0)', volume: 0, faved: true},
    )
    
    const toggleFaved = () => {
        speaker.faved = !speaker.faved;
    };

    const increaseVolume = () => {
    if (speaker.volume < 10) {
        speaker.volume++;
      }
    };

    const decreaseVolume = () => {
        if (speaker.volume > 1) {
            speaker.volume--;
        }
    };
</script>

<template>
<v-container>
    <v-card class="card_container">
        <v-row class="title">
            <v-icon color="#146C94">mdi-speaker</v-icon>
            <h2>{{ speaker.title }}</h2> 
                <v-icon @click="toggleFaved">{{ speaker.faved ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
        </v-row>
        <v-divider></v-divider>
        <p class="mt-2">Volumen: <span class="volume_number">{{ speaker.volume }}</span></p>
        <v-row class="mt-1 pl-1 pr-1">
            <v-btn variant="plain" icon="mdi-minus" size="small" @click="decreaseVolume"></v-btn>
            <v-slider class="mt-1 mr-5" width="15px" v-model="speaker.volume" :max="10" :step="1"></v-slider>
            <v-btn variant="plain" icon="mdi-plus" size="small" @click="increaseVolume"></v-btn>
        </v-row>
        <v-divider></v-divider>
            <v-row class=" mt-2 ml-1">
                <v-select
                    v-model="mode"
                    :items="modeOptions"
                    item-title="name"
                    label="Seleccione un modo"
                />
            </v-row>
            <v-divider></v-divider>
            <v-list-item class="mt-5 mb-3">
                <v-list-subtitle>Intensidad: </v-list-subtitle>
                <v-list-subtitle class="text_intensity ml-1 mb-2">{{ speaker.intensity }}%</v-list-subtitle    >
                <v-slider class="ml-5 mr-5" width="30px" v-model="speaker.intensity" :max="100" :step="1"></v-slider>
            </v-list-item>
        <v-list-item>
            <v-footer class="add-button-container" absolute>
                <v-btn variant="flat" icon="mdi-plus-circle-outline" size="50px"></v-btn>   <!-- hay q cambiar la accion del click-->
            </v-footer>
        </v-list-item>
    </v-card>
    </v-container> 
</template>

<style scoped>
.title {
    justify-content: space-between;
    margin: 0;
    align-items: center;
}

.card_container {
    padding: 15px;
}
</style>
