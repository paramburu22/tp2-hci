/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from "/src/App.vue?t=1683035892414"

// Composables
import { createApp } from "/node_modules/.vite/deps/vue.js?v=5c9d66c3"

// Plugins
import { registerPlugins } from "/src/plugins/index.js"

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
