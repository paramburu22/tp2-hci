<script setup>
  import NavBarComponent from '@/components/NavBarComponent.vue';
  import { useRouter } from 'vue-router';
  import { ref, onMounted } from 'vue';
</script>


<template>
    <v-layout>
      <NavBarComponent />
      <v-main class="bg">
        <v-container >
            <p class="title_faq"> FAQs</p>
        </v-container>
        <v-card class="card_container">
            <v-card-title class="subtitle_faq">¿Cómo creo una habitación?</v-card-title>
            <v-container>
                <p class="text">Una vez en la pantalla de Mis Dispositivos, aprieta el botón + de la parte inferior de la derecha de la pantalla.</p> 
                <p class="text"> Verás que aparece una ventana titulada "Creando Habitación". De esta manera, se debe ingresar el nombre que desees para tu habitación a crear, y seleccionar el boton "crear" para asi crear la habitación.</p>
            </v-container>
        </v-card>
        <v-card class="card_container">
            <v-card-title class="subtitle_faq">¿Cómo modifico una habitación?</v-card-title>
            <v-container>
                <p class="text">Una vez en la pantalla de Mis Dispositivos, aprieta el nombre de la habitación que desea modificar.</p> 
                <p class="text">Si se desea agregar un dispositivo, aprieta el botón + e ingrese el nombre que se le desea vincular con el dispositivo a crear, además de seleccionar el tipo de dispositivo que busca crear.</p>
                <p class="text">Si se desea modificar el nombre de la habitación, seleccione el nombre de la habitación e ingrese el nuevo nombre.</p>
                <p class="text">Verás que al empezar a modificar el nombre, se habilitará el botón "Guardar". No olvidar de seleccionar este para guardar los cambios!.</p>
            </v-container>
        </v-card>
        <v-card class="card_container">
            <v-card-title class="subtitle_faq">¿Qué tipos de dispositivos puedo asociar a mi cuenta?</v-card-title>
            <v-container>
                <p class="text">Por el momento, ContrAll soporta los siguientes dispositivos: Puerta, Horno, Aire Acondicionado, Horno, Lampara, Parlante y Puerta. Mantente al tanto de las novedades para enterarte de nuevas actualizaciones con más dispositivos!</p> 
            </v-container>
        </v-card>
        <v-card class="card_container">
            <v-card-title class="subtitle_faq">¿Cómo creo una rutina?</v-card-title>
            <v-container>
                <p class="text">Una vez en la pantalla de Mis Rutinas, aprieta el botón + de la parte inferior de la derecha de la pantalla. Ahora ya puedes crear acciones! Al apretar el nuevo botón de “+” ubicado en el mismo lugar, podrás elegir qué acciones incluir en tu rutina!</p> 
                <p class="text"> Si se desea modificar el nombre de la rutina, simplemente seleccionalo y escriba el nombre que desee</p>
            </v-container>
        </v-card>
        <v-card class="card_container">
            <v-card-title class="subtitle_faq">¿Puedo ponerle cualquier nombre a mis dispositivos?</v-card-title>
            <v-container>
                <p class="text">Siempre que incluya únicamente letras, números y espacios, y su largo sea entre 3 y 60 caracteres, el nombre está completamente a su disposición!</p> 
            </v-container>
        </v-card>
        <v-card class="card_container">
            <v-card-title class="subtitle_faq"> ¿Por qué no se cambia el color de mi lámpara?</v-card-title>
            <v-container>
                <p class="text">Asegúrate de apretar el botón de “Actualizar” luego de cambiar el color de una lámpara para que se registre el cambio.</p> 
            </v-container>
        </v-card>
      </v-main>
    </v-layout>
  </template>


<style>
.title_faq{
    font-family: 'Varela Round', sans-serif;
    font-size: 40px;
    color: #265187;
}

.subtitle_faq{
    font-family: 'Varela Round', sans-serif;
    font-size: 25px;
    color: #146C94;
    margin-left: 15px;
    margin-top: 15px;

}
.text{
    font-family: 'Varela Round', sans-serif;
    font-size: 15px;
    color: grey;
}
.card_container{
    border-radius: 20px;
    margin-left: 30px;
    padding-right: 15px;
    padding-right: 15px;
    margin-bottom: 15px;
    width: 90%;
}

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


</style>



<!--

¿Cómo creó una habitación?
Para poder manejar tus habitaciones primero debes crear un Hogar. Dirígete a Mis Dispositivos y aprieta el botón de “+” de la parte inferior de la derecha de la pantalla. Una vez creado tu hogar, agrega todas las habitaciones que quieras dentro de él!
¿Qué tipos de dispositivos puedo asociar a mi cuenta?
Por el momento, ContrAll soporta los siguientes dispositivos: Puerta, Horno, Aire Acondicionado, Horno, Lampara, Parlante y Puerta. Mantente al tanto de las novedades para enterarte de nuevas actualizaciones con más dispositivos!
Puedo ponerle cualquier nombre a mis dispositivos?
Siempre que incluya únicamente letras, números y espacios, y su largo sea entre 3 y 60 caracteres, el nombre está completamente a su disposición!
¿Por qué no se cambia el color de mi lámpara?
Asegúrate de apretar el botón de “Actualizar” luego de cambiar el color de una lámpara para que se registre el cambio.


    
-->
