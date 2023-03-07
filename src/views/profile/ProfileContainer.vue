<script setup>
import { ref, defineAsyncComponent } from 'vue'
import { useRoute, onBeforeRouteLeave } from 'vue-router'

const route = useRoute()
const Profile = defineAsyncComponent(() => import('./ProfileDetail.vue'))
const EditProfile = defineAsyncComponent(() => import('./EditProfile.vue'))
const EmailConfirmationModal = defineAsyncComponent(() => import('./EmailConfirmationModal.vue'))
const editPage = ref(false)

if (route.path == '/edit')
  editPage.value = true

onBeforeRouteLeave((to) => {
  if (to.path == '/edit') {
    editPage.value = true
  }
  if (to.path == '/') {
    editPage.value = false
  }
})
</script>

<template>
  <v-col cols="lg-8">
    <Profile v-if="!editPage"></Profile>
    <EditProfile v-else></EditProfile>
    <EmailConfirmationModal></EmailConfirmationModal>
  </v-col>
</template>

