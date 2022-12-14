import { createApp } from 'vue';

import {createRouter, createWebHistory} from 'vue-router';

import App from './App.vue';
import BaseModal from './components/BaseModal.vue';
import AllUsers from './pages/AllUsers.vue';
import CourseGoals from './pages/CourseGoals.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: AllUsers},
        {path:'/goals', component: CourseGoals}
    ]
});
const app = createApp(App);
app.use(router);

app.component('base-modal', BaseModal);

app.mount('#app');
/**
 * Do this way to prevent the animation on first route loaded
router.isReady().then(function() {
    app.mount("#app");
});

 */