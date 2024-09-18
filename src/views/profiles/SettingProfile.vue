<script setup>
import { useProfileStore } from '@/stores/profile'
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth'

const profileStore = useProfileStore()
const authStore = useAuthStore()

onMounted(async () => {
    profileStore.clearResponses()
})
</script>

<template>
    <div>
        <div class="uk-margin-remove-bottom">
            <p class="uk-margin-medium-bottom title" >Change Password</p>            
        </div>
        <form class="uk-form-stacked uk-margin-remove-top" @submit.prevent="profileStore.updateProfile(authStore.user.id)">
            <div class="uk-margin">
                <label for="" class="uk-form-label"><strong>Current Password</strong></label>
                <input type="password" class="uk-input" v-model="profileStore.user.password" placeholder="Current Password">
                <div v-if="profileStore.error.password">
                    <small id="error-price" class="uk-text-danger">{{ profileStore.error.postalCode[0] }}</small>
                </div>
            </div>
            <div class="uk-margin">
                <label for="" class="uk-form-label"><strong>New Password</strong></label>
                <input type="password" class="uk-input" v-model="profileStore.user.password_confirmation" placeholder="New Password">
                <div v-if="profileStore.error.password">
                    <small id="error-price" class="uk-text-danger">{{ profileStore.error.postalCode[0] }}</small>
                </div>
            </div>
            <div class="uk-margin">
                <label for="" class="uk-form-label"><strong>Confirm Password</strong></label>
                <input type="password" class="uk-input" v-model="profileStore.user.password_confirmation" placeholder="Confirm Password">
                <div v-if="profileStore.error.password">
                    <small id="error-price" class="uk-text-danger">{{ profileStore.error.postalCode[0] }}</small>
                </div>
            </div>
            <div class="uk-flex uk-flex-right">
                <button class="uk-button uk-border-rounded" style="background-color: white; border: 1px solid; color: #0CC701; font-weight: 500;" type="submit" @click="notifications">Save</button>                
            </div>
        </form>
    </div>
</template>

<style scoped>
.title {
    color: black;
    font-size: 24px;
    font-weight: 600;
}
</style>