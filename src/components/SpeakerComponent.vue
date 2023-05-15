<script setup>
import { ref } from 'vue';
import { defineProps, toRefs, onMounted, onUnmounted } from 'vue';
import { useDeviceStore } from '@/stores/deviceStore';

  const open = ref(false);

  const genres = [ 
      {
          name: 'Clasica',
          value: 'classical'
      },
      {
          name: 'Country',
          value: 'country'
      },
      {
          name: 'Dance',
          value: 'dance'
      },
      {
          name: 'Latina',
          value: 'latina'
      },
      {
          name: 'Pop',
          value: 'pop'
      },
      {
          name: 'Rock',
          value: 'rock'
      }
  ];


  const deviceStore = useDeviceStore();
    const props = defineProps({
    item: Object,
    });

  const { item } = toRefs(props);

  let intervalId;
  let newState;
  
  const playlist = ref([]);

  const toastOpen = ref(false);
  const toastText = ref('');


  const toggleFaved = () => {
      item.faved = !item.faved;
  };

  function toggleOpen() {
      open.value = !open.value;
  }

  // VOLUME
  const increaseVolume = () => {
  if (item.value.state.volume < 10) {
      item.value.state.volume++;
      makeAction('setVolume', item.value.state.volume);
    }
  };

  const decreaseVolume = () => {
      if (item.value.state.volume > 1) {
          item.value.state.volume--;
          makeAction('setVolume', item.value.state.volume);
      }
  };

  // PLAY
  const playSong = () => {
    makeAction('play', null);
    item.value.state.status = 'playing';
    intervalId = setInterval(() => {
      deviceStore.getDeviceState(item.value.id)
        .then((value) => {
          item.value.state = value;
        })
        .catch(() => {}) //hacer error
    }, 1000);
  };

  const pauseSong = () => {
    item.value.state.status = 'paused';
    makeAction('pause', null);
    clearInterval(intervalId);
  };

  const resumeSong = () => {
    makeAction('resume', null);
    item.value.state.status = 'playing';
    intervalId = setInterval(() => {
      deviceStore.getDeviceState(item.value.id)
        .then((value) => {
          item.value.state = value;
        })
        .catch(() => {}) //hacer error
    }, 1000);
  };


  const getPlaylist = async () => {
    await makeAction('getPlaylist').then((value) => playlist.value = value);
  }
  
  const stopSong = () => {
    item.value.state.status = 'stopped';
    makeAction('stop', null);
    clearInterval(intervalId);
  };

  const nextSong = () => {
    if(!(item.value.state.status === 'stopped' || item.value.state.status === 'paused')) {
      makeAction('nextSong', null);
    }
  };

  const previousSong = () => {
    if(!(item.value.state.status === 'stopped' || item.value.state.status === 'paused')) {
      makeAction('previousSong', null);
    }
  };

  const changeGenre = async (value) => {
    await makeAction('setGenre', value);
    await getPlaylist();
  }

  async function makeAction(action, value) {
    let response;
    try {
      await deviceStore.makeAction(item.value.id, action, value).then(value => response = value);
    } catch (e) {
      toastText.value = e.description;
      toastOpen.value = true;
    }
    return response;
  }

  onMounted(async() => {
    await getPlaylist();
    if(item.value.state.status === 'playing') {
      intervalId = setInterval(() => {
      deviceStore.getDeviceState(item.value.id)
        .then((value) => {
          item.value.state = value;
        })
        .catch(() => {}) //hacer error
      }, 1000);
    }
  })


  onUnmounted(() => {
    clearInterval(intervalId);
  })
</script>

<template>
  <v-card>
      <v-row class="same_line">
          <v-icon class="mr-3" color="#146C94">mdi-speaker</v-icon>
          <h4>{{ item.name }}</h4> 
      </v-row>
      <v-divider></v-divider>
      <v-row class="song_container" align-items="center" no-gutters>
        <v-icon class="mr-3" color="#7E7E7E" size="49">mdi-music-box</v-icon>
        <v-col v-if="item.state.status != 'stopped'">
            <p class="song_info">{{ (item.state.song && item.state.song.title) }}</p>
            <p class="artist_info"> {{ (item.state.song && item.state.song.artist) }}</p>
            <p class="album_info">Del album {{ (item.state.song && item.state.song.album) }}</p>
        </v-col>
        <v-col v-else>
            <p class="song_info">No hay canciones en reproduccion</p>
        </v-col>
        <p v-if="item.state.status != 'stopped'" class="duration_info"> {{ (item.state.song && item.state.song.progress) }}</p>
      </v-row>
      <v-row class="player_container" no-gutters>
          <v-icon  size="small" :disabled="item.state.status === 'stopped'" @click="previousSong()">mdi-skip-backward</v-icon>
          <v-icon  @click="item.state.status === 'stopped' ? playSong() : (item.state.status === 'paused' ? resumeSong() : pauseSong())">{{ item.state.status === 'paused' || item.state.status === 'stopped' ? 'mdi-play' : 'mdi-pause' }}</v-icon>
          <v-icon @click="stopSong()">mdi-stop</v-icon>
          <v-icon size="small" :disabled="item.state.status === 'stopped'" @click="nextSong()">mdi-skip-forward</v-icon>
      </v-row>
      <v-divider></v-divider>
      <div class="pl-3 pr-3">
        <p class="mt-2">Volumen: <span class="volume_number">{{ item.state.volume }}</span></p>
        <v-row class="mt-1 pl-1 pr-1" no-gutters>
            <v-btn variant="plain" icon="mdi-minus" size="small" @click="decreaseVolume"/>
            <v-slider class="mt-1" width="15px" v-model="item.state.volume" :max="10" :step="1" @click="makeAction('setVolume', item.state.volume)"/>
            <v-btn variant="plain" icon="mdi-plus" size="small" @click="increaseVolume"/>
        </v-row>
      </div>
      <v-divider></v-divider>
      <v-select
        v-model="item.state.genre"
        :items="genres"
        item-title="name"
        item-value="value"
        label="Seleccione un genero"
        hide-details
        @update:modelValue="(value) => changeGenre(value)"
      />
      <v-row no-gutters class="mt-2" justify="center">
        <v-btn @click="toggleOpen" width="100%">
          Lista de reproduccion
        </v-btn>
      </v-row>
      <v-dialog
          v-model="open"
          width="auto"
      >
        <v-card class="pa-5" width="500">
            <h2 class=" mb-5">Lista de reproduccion de {{ item.state.genre }}</h2>
            <v-list v-for="(info) in playlist">
                <v-row class="song_container" align-items="center" no-gutters>
                    <v-icon class="mr-3" color="#7E7E7E" size="49">mdi-music-box</v-icon>
                    <v-col>
                        <p class="song_info">{{ info.title }}</p>
                        <p class="artist_info"> {{ info.artist }}</p>
                        <p class="album_info">Del album {{ info.album }}</p>
                    </v-col>
                    <p class="duration_info"> {{ info.duration }}</p>
                </v-row>
                <v-divider></v-divider>
            </v-list>
            <v-row align-content="right" no-gutters>
                <v-btn @click="toggleOpen" plain>Cerrar</v-btn>
            </v-row>
        </v-card>
      </v-dialog>
  </v-card>
  <v-snackbar
        v-model="toastOpen"
        timeout=2000
        color="red"
        width="auto"
    >
        {{ toastText }}
    </v-snackbar>
</template>

<style scoped>
.same_line{
  justify-content: center;
  padding: 15px;
  flex-wrap: nowrap;
  margin: 0;
  align-items: center;
}
.player_container {
    margin: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 20px;
}

.song_info {
    font-size: 16px;
    color: #070707;
}
.artist_info {
    font-size: 13px;
    color: #070707;
}

.duration_info {
    font-size: 12px;
    color: #7E7E7E;
    margin-top: 10px;
}

.album_info {
    font-size: 10px;
    color: #7E7E7E;
}

.volume_number {
  color: #7E7E7E;
}
.song_container {
  overflow: hidden;
  padding-bottom: 5px;
  padding-right: 5px;
  padding-top: 20px;
}
</style>
