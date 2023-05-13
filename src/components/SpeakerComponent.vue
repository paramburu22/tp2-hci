<script setup>
import { ref } from 'vue';

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

  const playlist = [
      {
          "song": "Memories",
          "artist": "Marron 5",
          "album": "Memories",
          "duration": "3:09"
      },
      {
          "song": "Dance Monkey",
          "artist": "Tones and I",
          "album": "The Kids Are Coming",
          "duration": "3:29"
      },
      {
          "song": "Circles",
          "artist": "Post Malone",
          "album": "Hollywood's Bleeding",
          "duration": "3:35"
      }
  ]

  const speaker = ref(
      { open: false, title: 'Parlante', current_song: playlist[0], on: false, playing: false, volume: 0, genre: "pop",  faved: true},
  )
  
  const toggleFaved = () => {
      speaker.faved = !speaker.faved;
  };

  function toggleOpen() {
      open.value = !open.value;
  }

  // VOLUME
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

  // PLAY
  const playSong = () => {
      if(!speaker.on) {
          speaker.on = true;
          speaker.playing = true;
      }
      speaker.playing = !speaker.playing;
  };

  // STOP
  const stopSong = () => {
      speaker.on = false;
      speaker.playing = false;
  };
</script>

<template>
  <v-card class="speaker_card">
      <v-row class="title" no-gutters>
          <v-icon color="#146C94">mdi-speaker</v-icon>
          <h2>{{ speaker.title }}</h2> 
          <v-icon @click="toggleFaved">{{ speaker.faved ? 'mdi-heart' : 'mdi-heart-outline' }}</v-icon>
      </v-row>
      <v-divider></v-divider>
      <v-row class="song_container" align-items="center" no-gutters>
        <v-icon class="mr-3" color="#7E7E7E" size="49">mdi-music-box</v-icon>
        <v-col>
            <p class="song_info">{{ speaker.current_song.song }}</p>
            <p class="artist_info"> {{ speaker.current_song.artist }}</p>
            <p class="album_info">Del album {{ speaker.current_song.album }}</p>
        </v-col>
        <p class="duration_info"> {{ speaker.current_song.duration }}</p>
      </v-row>
      <v-row class="player_container" no-gutters>
          <v-btn variant="plain" icon="mdi-skip-backward" size="small" @click="nextSong"></v-btn>
          <v-icon @click="playSong">{{ speaker.playing ? 'mdi-play' : 'mdi-pause' }}</v-icon>
          <v-icon @click="stopSong">mdi-stop</v-icon>
          <v-btn variant="plain" icon="mdi-skip-forward" size="small" @click="previousSong"></v-btn>
      </v-row>
      <v-divider></v-divider>
      <div class="pl-3 pr-3">
        <p class="mt-2">Volumen: <span class="volume_number">{{ speaker.volume }}</span></p>
        <v-row class="mt-1 pl-1 pr-1" no-gutters>
            <v-btn variant="plain" icon="mdi-minus" size="small" @click="decreaseVolume"></v-btn>
            <v-slider class="mt-1" width="15px" v-model="speaker.volume" :max="10" :step="1"></v-slider>
            <v-btn variant="plain" icon="mdi-plus" size="small" @click="increaseVolume"></v-btn>
        </v-row>
      </div>
      <v-divider></v-divider>
      <v-select
        v-model="speaker.genre"
        :items="genres"
        item-title="name"
        item-value="value"
        label="Seleccione un genero"
        hide-details
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
            <h2 class=" mb-5">Lista de reproduccion de {{ speaker.genre }}</h2>
            <v-list v-for="(item) in playlist">
                <v-row class="song_container" align-items="center" no-gutters>
                    <v-icon class="mr-3" color="#7E7E7E" size="49">mdi-music-box</v-icon>
                    <v-col>
                        <p class="song_info">{{ item.song }}</p>
                        <p class="artist_info"> {{ item.artist }}</p>
                        <p class="album_info">Del album {{ item.album }}</p>
                    </v-col>
                    <p class="duration_info"> {{ item.duration }}</p>
                </v-row>
                <v-divider></v-divider>
            </v-list>
            <v-row align-content="right" no-gutters>
                <v-btn @click="toggleOpen" plain>Cerrar</v-btn>
            </v-row>
        </v-card>
      </v-dialog>
  </v-card>
</template>

<style scoped>
.title {
  justify-content: space-between;
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  align-items: center;
}
.player_container {
    margin: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
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
  padding-top: 5px;
}
</style>
