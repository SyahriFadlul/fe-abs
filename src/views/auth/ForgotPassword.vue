<script setup>
import { useAuthStore } from "@/stores/auth";
import { onMounted,ref } from "vue";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter()

const email = ref("")
onMounted(async () => {
    authStore.clearErrors()
});
</script>
<template>
    <div class="uk-container uk-margin-xlarge-top uk-flex uk-flex-center">
        <div class="uk-card uk-card-small uk-card-default uk-width-3-5 uk-padding uk-padding-remove-top">
            <h1 class="uk-card-title uk-margin-medium-top uk-flex uk-flex-center uk-width-1-1">Forgot Password</h1>
            <div class="uk-card uk-card-body">
                <div v-if="authStore.status"> 
                    <div class="uk-alert-success" uk-alert>
                        <a href class="uk-alert-close" uk-close></a>
                        <p>{{ authStore.status }}</p>
                    </div>
                </div>
                <form class="uk-form uk-form-horizontal" @submit.prevent="authStore.handleForgotPassword(email)">
                    <div class="uk-margin uk-flex uk-flex-center uk-align-center align-items-baseline uk-width-1-1">
                        <label class="uk-form-label">E-mail</label>
                        <div class="uk-width-1-1">
                            <input type="text" class="uk-input" v-model="email">
                            <div v-if="authStore.error.email" >
                                <small class="uk-text-danger">{{ authStore.error.email[0] }}</small>
                            </div>
                        </div>
                    </div>
                    <div class="uk-margin uk-flex uk-flex-right uk-margin-remove-bottom">
                        <button class="uk-button uk-button-primary uk-button-medium" type="submit" style="background-color: #759AF0;  font-weight: 500;">SEND</button>
                    </div>
                </form>
            </div>            
        </div>
    </div>
</template>
