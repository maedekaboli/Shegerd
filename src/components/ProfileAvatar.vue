<script setup>
defineProps({
    imgSrc: String
})
</script>

<template>
    <v-avatar size="150" color="black">
        <v-img :src="imgSrc ? imgSrc : '/no-profile.png'" alt="profile image"></v-img>
    </v-avatar>
</template>