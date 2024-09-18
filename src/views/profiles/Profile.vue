<script setup>
import { useProfileStore } from '@/stores/profile'
import { useAuthStore } from '@/stores/auth'
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useUserStore } from '../../stores/user';

const profileStore = useProfileStore()
const authStore = useAuthStore()
const userStore= useUserStore()
// const props = defineProps({
//     id:{
//         type: String,
//         required: true,
//     }
// })

onMounted(async () => {
    // await authStore.getUser()
    await profileStore.getProfile(authStore.user.id)        
})
</script>

<template>
    <div class="uk-background-muted ">
        <div class="uk-container uk-padding-large uk-padding-remove-top">
            <div class="uk-margin-medium-top uk-grid" uk-grid>
                <h3 class="uk-width-expand uk-margin-medium-bottom">Kelola Akun</h3>
            </div>
            <div class="uk-card-medium uk-card-default uk-width-1-1 uk-margin-left uk-border-rounded">
                <div class="uk-card-body">
                    <div class="uk-width-auto">
                        <ul class="uk-tab">
                            <li><router-link :to="{ name: 'profile.edit' }">Profile</router-link></li>
                            <li><router-link :to="{ name: 'profile.alamat' }">Daftar Alamat</router-link></li>
                            <li><router-link :to="{ name: 'profile.setting' }">Change Password</router-link></li>
                        </ul>
                    </div>

                    <RouterView />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@media only screen and (max-width: 320px){
    .uk-width-expand{
        font-weight: normal;
        font-size: 24px;
        text-align: center;
    }
    .uk-card-body {
        width: 200px;
        margin-left: 10px;
  }  
    .uk-tab {
        font-weight: normal;
        font-size: 8px;
        width: 200px;
  }
}
.text-decoration-none {
    color: rgb(95, 80, 80);
    font-size: 20px;
    font-weight: 600;
}

.text-decoration-none:hover {
    color: blue;
}

.name {
    color: black;
    font-size: 28px;
    font-weight: 600;
}
</style>