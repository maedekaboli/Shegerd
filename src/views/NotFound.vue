<template>
    <v-col cols="md-6" sm="8">
        <v-card>
            <v-card-item>
                <v-row justify="center" align="center">
                    <v-col cols="md-8" class="d-flex justify-center">
                        <v-img src="/not-found.jpg" alt="not found" max-width="250"></v-img>
                    </v-col>
                    <v-col cols="12" class="d-flex justify-center mb-5">
                        <router-link to="/">
                            <v-btn variant="outlined" rounded="pill">
                                back
                            </v-btn>
                        </router-link>
                    </v-col>
                </v-row>
            </v-card-item>
        </v-card>
    </v-col>
</template>