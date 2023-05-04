<script setup>
  import LogoComponent from '@/components/LogoComponent.vue';
</script>

<template>
  <v-container class="bg" fluid>
    <v-navigation-drawer color="#146c94" >
      <v-list-item>
        <LogoComponent />
      </v-list-item>
      <v-list-item>AAAA</v-list-item>
      <v-divider></v-divider>
      <v-list-item>BBBB</v-list-item>
      <v-divider></v-divider>
      <v-list-item>CCCC</v-list-item>
    </v-navigation-drawer>
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
.navigation {
  background-color: #146c94;
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
