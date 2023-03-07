<script setup>
import useProfileStore from "../../stores/profile";
import { storeToRefs } from 'pinia'
import { defineAsyncComponent } from 'vue'

const ProfileAvatar = defineAsyncComponent(() => import('../../components/ProfileAvatar.vue'))
const { user, userRegisterDate } = storeToRefs(useProfileStore())
</script>

<template>
    <v-card class="pb-5">
        <v-row justify="center" align="center" class="pa-5">
            <v-col cols="md-5" sm="12" class="text-center">
                <ProfileAvatar :imgSrc="user.imageUrl"></ProfileAvatar>
            </v-col>
            <v-col cols="md-7" sm="12">
                <v-col cols="12"><v-icon class="pr-6">mdi-account-circle-outline</v-icon>First Name: {{ user.name }}</v-col>
                <v-col cols="12"><v-icon class="pr-6">mdi-account-circle-outline</v-icon>Last Name: {{ user.lastName
                }}</v-col>
                <v-col cols="12"><v-icon class="pr-6">mdi-email-outline</v-icon>Email: {{ user.email }}</v-col>
                <v-col cols="12"><v-icon class="pr-6">mdi-calendar-month-outline</v-icon>Register Date: {{ userRegisterDate
                }}</v-col>
            </v-col>
        </v-row>
    </v-card>
    <router-link to="/edit">
        <v-btn type="button" rounded="pill" class="mt-5" size="large" color="primary">
            Edit
        </v-btn>
    </router-link>
</template>