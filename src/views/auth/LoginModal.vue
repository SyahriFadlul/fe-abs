<script setup>
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/auth";
// import uikit from 'uikit';

const authStore = useAuthStore();
const form = ref({
    email: "",
    password: "",
});

onMounted(() => {
    authStore.clearErrors()
})
</script>

<template>
        <div id="modal-login" uk-modal>
            <div class="uk-modal-dialog uk-modal-body">
                <button class="uk-modal-close-default" type="button" aria-label="Close" uk-close></button>
                <h2 class="uk-modal-title uk-flex uk-flex-center uk-text-bold uk-text-large uk-margin-medium-bottom mt-1">
                    Login to your account</h2>
                <form class="uk-form uk-margin-left uk-margin-right" @submit.prevent="authStore.handleLoginModal(form)">
                    <div class="uk-inline uk-width-1-1 uk-margin-small-top">
                        <a class="uk-form-icon uk-form-icon-flip" href="#" uk-icon="icon: mail"></a>
                        <input class="uk-input uk-border-rounded" type="text" v-model="form.email" />
                    </div>
                    <div v-if="authStore.error.email">
                        <p class="uk-margin-remove-bottom uk-text-danger uk-text-small">
                            {{ authStore.error.email[0] }}</p>
                    </div>
                    <div class="uk-inline uk-width-1-1 mt-3">
                        <input class="uk-input uk-border-rounded" type="password" v-model="form.password" />
                        <a class="uk-form-icon uk-form-icon-flip" href="#" uk-icon="icon: lock"></a>
                    </div>
                    <div v-if="authStore.error.password">
                        <p class="uk-margin-remove-bottom uk-text-danger uk-text-small uk-flex uk-flex-left">
                            {{ authStore.error.password[0] }}
                        </p>
                    </div>
                    <div class="uk-margin-medium-top">
                        <button class="uk-button uk-button-primary uk-width-1-1 uk-border-rounded">
                            login
                        </button>
                    </div>
                    <div class="uk-flex-wrap uk-flex-center uk-margin-large-top">
                        <router-link to="/forgot-password"
                            class="uk-text-small uk-flex uk-flex-center uk-modal-close">forgot
                            password?</router-link>
                        <div class="uk-flex uk-flex-center">
                            <small class="">
                                Don't have an account?
                            </small>
                            <small class="text-decoration-none  uk-text-success ">
                                <router-link to="/register"
                                    class="text-decoration-none  uk-text-success uk-modal-close">create
                                    your
                                    account</router-link>
                            </small>
                        </div>
                    </div>
                </form>
            </div>
        </div>
</template>