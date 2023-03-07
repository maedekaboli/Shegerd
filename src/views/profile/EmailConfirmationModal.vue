<script setup>
import * as yup from 'yup'
import { Form, Field } from 'vee-validate'
import useProfileStore from "../../stores/profile";
import { storeToRefs } from 'pinia'
const { tempUser, showModal, emailCodeLoading, confirmEmailStep } = storeToRefs(useProfileStore())
const { changeEmailAddress, closeModal, sendConfirmationCode } = useProfileStore()

const modalForm = yup.object({
    code: yup.string().required().label('Code'),
});

const onSubmit = () => {
    sendConfirmationCode()
}
</script>

<template>
    <v-row justify="center">
        <v-col cols="md-12">
            <v-dialog v-model="showModal" persistent width="auto">
                <v-card class="px-5 pb-5">
                    <Form as="v-form" :validation-schema="modalForm" @submit="onSubmit">
                        <v-progress-linear color="#43a047" indeterminate v-if="emailCodeLoading"></v-progress-linear>
                        <v-card-title class="text-h5 pt-5">
                            Email Confirmation
                        </v-card-title>
                        <v-card-text>
                            {{ confirmEmailStep ? `Do you want to change your email address to "${tempUser.email}"?` :
                                `Please enter the code we
                                                        have
                                                        sent
                                                        to "${tempUser.email}" email address.`
                            }}</v-card-text>
                        <v-row class="mt-3" justify="center">
                            <v-col cols="md-8" sm="8" v-show="!confirmEmailStep">
                                <Field  name="code" v-slot="{ field, errors }">
                                    <v-text-field v-bind="field" label="Code" variant="outlined"
                                        :error-messages="errors"></v-text-field>
                                </Field>
                            </v-col>
                        </v-row>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn v-if="confirmEmailStep" color="green-darken-1" variant="flat" rounded
                                @click="changeEmailAddress">
                                agree
                            </v-btn>
                            <v-btn v-if="!confirmEmailStep" type="submit" :disabled="emailCodeLoading"
                                :loading="emailCodeLoading" color="green-darken-1" variant="flat" rounded>
                                send
                            </v-btn>
                            <v-btn color="black" variant="outlined" rounded @click="closeModal">
                                cancel
                            </v-btn>
                        </v-card-actions>
                    </Form>
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
</template>