<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const form = ref({
  name: '',
  username: '',
  email: '',
  password: '',
  password_confirmation: '',
});

onMounted (()=>{
  authStore.clearErrors()
})
</script>
<template>
  <div class="uk-container uk-margin-medium-top ">
    <div class="uk-margin-bottom uk-flex uk-flex-center">
      <div class="uk-card uk-card-default uk-card-body uk-card-small uk-width-1-2@m uk-width-1-1@s">
        <div class="uk-card-media-top">
          <img src="@/assets/logo.png"  class="uk-align-center" style="width: 300px !important;">
        </div>
        <h3 class="uk-card-title uk-flex uk-flex-center uk-text-bold">
          Create New Account
        </h3>        
        <form class="uk-form uk-margin-left uk-margin-right" @submit.prevent="authStore.handleRegister(form)">
          <div class="uk-inline uk-width-1-1 uk-margin-medium-top">
            <span class="uk-form-icon uk-form-icon-flip" uk-icon="icon: user"></span>
            <input class="uk-input" type="text" placeholder="name" v-model="form.name"/>
          </div>
          <div v-if="authStore.error.name">
            <small class="uk-text-danger uk-text-small">
              {{ authStore.error.name[0] }}
            </small>
          </div>  
          <div class="uk-inline uk-width-1-1 mt-4">
            <span class="uk-form-icon uk-form-icon-flip" uk-icon="icon: user"></span>
            <input class="uk-input" type="text" aria-label="50" placeholder="username" v-model="form.username"/>
          </div>
          <div v-if="authStore.error.username">
            <small class="uk-text-danger uk-text-small">
              {{ authStore.error.username[0] }}
            </small>
          </div>  
          <div class="uk-inline uk-width-1-1 mt-4">
            <span class="uk-form-icon uk-form-icon-flip" uk-icon="icon: mail"></span>
            <input class="uk-input" type="text" aria-label="Clickable icon" placeholder="email" v-model="form.email"/>
          </div>
          <div v-if="authStore.error.email">
            <small class="uk-text-danger uk-text-small">
              {{ authStore.error.email[0] }}
            </small>
          </div>  
          <div class="uk-inline uk-width-1-1 mt-4">
            <span class="uk-form-icon uk-form-icon-flip" uk-icon="icon: lock"></span>
            <input class="uk-input" type="password" aria-label="Clickable icon" placeholder="password" v-model="form.password"/>
          </div>
          <div v-if="authStore.error.password">
            <small class="uk-text-danger uk-text-small">
              {{ authStore.error.password[0] }}
            </small>
          </div>  
          <div class="uk-inline uk-width-1-1 mt-4">
            <span class="uk-form-icon uk-form-icon-flip" uk-icon="icon: lock"></span>
            <input class="uk-input" type="password" aria-label="Clickable icon" placeholder="confirm password" v-model="form.password_confirmation"/>
          </div>
          <div class="uk-margin-medium-top" aria-label="100">
            
            <button class="uk-button uk-button-primary uk-width-1-1" style="background-color: #003245;  font-weight: 500;">
              Sign up
            </button>
          </div>
          
        </form>
        <div class="uk-flex uk-flex-center uk-margin-large-top">
          <small class="">
            Already have an account? 
          </small>
          <small class="text-decoration-none  uk-text-success ">
            <router-link to="/login" class="text-decoration-none" style="color: #9FD8EF;">Sign in here</router-link>
          </small>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>

@media (min-width: 768px){
  img{
    max-height:300px;
    max-width:450px;
    height:auto;
    width:auto;
  }
}
@media (min-width: 968px){
  img{
    max-height:400px;
    max-width:800px;
    height:auto;
    width:auto;
  }
}
@media (min-width: 1200px){
  img{
    max-height:500px;
    max-width:700px;
    height:auto;
    width:auto;
  }
}
</style>
