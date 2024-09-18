<script setup>
import { useAuthStore } from '../../stores/auth';
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const authStore = useAuthStore()
const route = useRoute()

const data = ref({
    password:'',
    password_confirmation:'',
    email:route.query.email,
    token:route.params.token
})

onMounted(()=>{
    authStore.clearErrors()
})
</script>
<template>
    <div class="uk-container uk-margin-xlarge-top uk-flex uk-flex-center">
        <div class="uk-card uk-card-small uk-card-default uk-width-3-5 uk-padding uk-padding-remove-top">
            <h1 class="uk-card-title uk-margin-medium-top uk-flex uk-flex-center uk-width-1-1">Reset Password</h1>
            <div class="uk-card uk-card-body"> 
                <form class="uk-form uk-form-horizontal" @submit.prevent="authStore.handleResetPassword(data)">
                    <div class="uk-margin uk-flex uk-flex-center">
                        <label class="uk-form-label">Password</label>
                        <div class="uk-width-1-1">
                            <input type="password" class="uk-input" v-model="data.password">
                            <div v-if="authStore.error.password" >
                                <small class="uk-text-danger">{{ authStore.error.password[0] }}</small>
                            </div>
                        </div>
                    </div>
                    <div class="uk-margin uk-flex uk-flex-center">
                        <label class="uk-form-label">Password</label>
                        <div class="uk-width-1-1">
                            <input type="password" class="uk-input" v-model="data.password_confirmation">
                        </div>
                    </div>
                    <div class="uk-margin uk-flex uk-flex-right uk-margin-remove-bottom">
                        <button class="uk-button uk-button-primary uk-button-medium" style="background-color: #759AF0;  font-weight: 500;">Reset</button>
                    </div>
                </form>
            </div>            
        </div>
    </div>
</template>
