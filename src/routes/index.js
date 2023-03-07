import { createRouter, createWebHistory } from 'vue-router'
const ProfileContainer = () => import('../views/profile/ProfileContainer.vue')
const NotFound = () => import('../views/NotFound.vue')

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'Home', component: ProfileContainer },
        { path: '/edit', component: ProfileContainer },
        { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
    ]
})
export default router