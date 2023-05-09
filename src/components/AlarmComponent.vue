<template>
    <v-card class="alarm_container">
        <v-container>
            <v-row>
                <v-btn class="alarm_alignment" variant="text">
                    Alarma
                </v-btn>
                <v-menu>
                    <template v-slot:activator="{ props }">
                        <v-btn class="mode_alignment" size="small" v-bind="props" align-left variant="plain">
                                <p>Modo<br/>Regular</p>
                                <v-icon size="small">mdi-arrow-down</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item class="text"
                        v-for="(menu, index) in menus"
                        :key="index"
                        :value="index">
                            <v-list-item-title class="text" variant="text">
                                {{ menu.title }} 
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <v-spacer></v-spacer>
                <v-switch class="switch_alignment" color="info" align-self="right"></v-switch>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
export default {
    data() {
        return {
            menus: [
                { title: 'MODO NO REGULAR' },
            ],
        }
    },
}
</script>

<style scoped>
.alarm_container {
  color: #265187;
  font-family: 'Varela Round', sans-serif;
  border-radius: 5px;
  height: 50px; 
  width: 280px;
  box-shadow: 5px 9px 0px 0px #146C94;
  margin-bottom: 30px;
}
.text {
    color: #265187;
    font-family: 'Varela Round', sans-serif;
    font-size: 12px;
}

.alarm_alignment {
    margin-top: 5px;
}
.mode_alignment {
    margin-top: 6px;
}
.switch_alignment {
    margin-top: -5px;
}   
.button_content {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-top: 5px;
    padding-bottom: 5px;
}
</style>