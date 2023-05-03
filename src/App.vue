<script setup>
import { RouterView } from 'vue-router';

  import Logo from '@/components/Logo.vue'
</script>

<template>
  <div id="app">
        <RouterView v-slot="{ Component }">
            <transition name="slide" mode="out-in">
                <component :is="Component" :key="$route.path" />
            </transition>
        </RouterView>
    </div>
</template>



<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Varela+Round&display=swap');
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-image: url("@/assets/background.png");
  background-size: cover;
  overflow-y: scroll;
}
.slogan_text {
  color: rgb(242, 242, 242);
  font-family: 'Varela Round', sans-serif;
  font-size: 70px;
}

.middle_container {
  padding-left: 20px;
  padding-right: 20px;
}

.card_container {
  color: rgb(20, 108, 148);
  font-family: 'Varela Round', sans-serif;
  border-radius: 20px;
  background-color: #EDF1F4;
}
.anchortag {
  font-size: 20px;
}

.input_text {
  font-size: 20px;
  width: 100%;
}

.card_title {
  font-weight: lighter;
  font-size: 36px;
}
.card_forms {
  margin-bottom: 20px
}
.submit_button {
  color: rgb(242, 242, 242);
  background-color: #88c9f9;
  width: 100%;
}

@media (max-width: 950px) {
  .resposive_text {
    text-align: center;
  }

  .responsive_header {
    justify-content: center;
  }
}

</style>
