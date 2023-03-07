<script setup>
import * as yup from 'yup'
import { Form, Field } from 'vee-validate'
import { ref } from 'vue'
import useProfileStore from "../../stores/profile";
import { storeToRefs } from 'pinia'

const { user, editLoading, tempUser } = storeToRefs(useProfileStore())
const { editUser, openModal } = useProfileStore()
const image = ref(null)
tempUser.value = { ...user.value }
const onFileChange = (event) => {
    var input = event.target;
    if (input.files) {
        var reader = new FileReader();
        reader.onload = (e) => {
            tempUser.value.imageUrl = e.target.result
        }
        image.value.push(input.files[0]);
        reader.readAsDataURL(input.files[0]);
    }
}

const schema = yup.object({
    firstName: yup.string().required().label('First Name'),
    lastName: yup.string().required().label('Last Name'),
    email: yup.string().email().required().label('Email'),
});

const onSubmit = (values) => {
    if (values.email !== user.value.email)
        openModal()
    else
        editUser()
}
</script>

<template>
    <Form as="v-form" :validation-schema="schema" @submit="onSubmit">
        <v-card class="pb-5">
            <v-progress-linear color="#6200ee" indeterminate v-if="editLoading"></v-progress-linear>
            <div class="pa-5">
                <v-row justify="center">
                    <v-col cols="12" class="text-center">
                        <v-avatar size="150" color="black" class="mb-5">
                            <v-img :src="tempUser.imageUrl ? tempUser.imageUrl : '/no-profile.png'" alt="John"></v-img>
                        </v-avatar>
                        <div>
                            <small class="text-grey">Please upload images fewer than 4MG</small>
                            <v-file-input accept="image/*" v-model="image" type="file" class="input" label="Upload Image"
                                variant="outlined" @change="onFileChange" />
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" sm="6">
                        <Field name="firstName" v-model="tempUser.name" v-slot="{ field, errors }">
                            <v-text-field v-bind="field" v-model.trim="tempUser.name" label="First Name" variant="outlined"
                                :error-messages="errors"></v-text-field>
                        </Field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <Field name="lastName" v-model="tempUser.lastName" v-slot="{ field, errors }">
                            <v-text-field v-bind="field" v-model.trim="tempUser.lastName" label="Last Name"
                                variant="outlined" :error-messages="errors"></v-text-field>
                        </Field>
                    </v-col>
                    <v-col cols="12" sm="6">
                        <Field name="email" v-model="tempUser.email" v-slot="{ field, errors }">
                            <v-text-field v-bind="field" v-model.trim="tempUser.email" label="Email" variant="outlined"
                                :error-messages="errors"></v-text-field>
                        </Field>
                    </v-col>
                </v-row>
            </div>
        </v-card>
        <v-btn type="submit" :disabled="editLoading" :loading="editLoading" rounded="pill" class="mt-5" size="large"
            color="primary">
            Edit
        </v-btn>
        <router-link to="/">
            <v-btn rounded="pill" class="mt-5 ml-4" size="large" color="black" variant="outlined">
                Back
            </v-btn>
        </router-link>
    </Form>
</template>
