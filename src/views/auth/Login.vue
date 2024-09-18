<script setup>
import { onMounted, ref } from "vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const form = ref({
  email: "",
  password: "",
});

onMounted (()=>{
  authStore.clearErrors()
})
</script>
<template>
  <div class="uk-container uk-margin-medium-top uk-flex uk-flex-center">
    <div
      class="uk-card uk-card-default uk-card-small uk-width-1-1 uk-width-1-1@s uk-width-2-5@m uk-width-2-5@l uk-flex uk-flex-center uk-border-rounded"
    >
      <div class="uk-card-body uk-width-1-1">
        <h3 class="uk-card-title uk-flex uk-flex-center uk-text-bold uk-text-large uk-margin-medium-bottom mt-1">
          Login to your account
        </h3>
        <form class="uk-form uk-margin-left uk-margin-right" @submit.prevent="authStore.handleLogin(form)">
          <div class="uk-inline uk-width-1-1 uk-margin-small-top">
            <a class="uk-form-icon uk-form-icon-flip" href="#" uk-icon="icon: mail"></a>
            <input class="uk-input uk-border-rounded" type="text"  v-model="form.email"/>
          </div>
          <div v-if="authStore.error.email">  
            <p class="uk-margin-remove-bottom uk-text-danger uk-text-small">{{ authStore.error.email[0] }}</p>
          </div>  
          <div class="uk-inline uk-width-1-1 mt-3">
            <input class="uk-input uk-border-rounded" type="password"  v-model="form.password"/>
            <a class="uk-form-icon uk-form-icon-flip" href="#" uk-icon="icon: lock"></a>
          </div>
          <div v-if="authStore.error.password">  
            <p class="uk-margin-remove-bottom uk-text-danger uk-text-small uk-flex uk-flex-left" >{{ authStore.error.password[0] }}</p>
          </div>  

          <div class="uk-margin-medium-top">            
            <button class="uk-button uk-button-primary uk-width-1-1 uk-border-rounded" style="background-color: #759AF0;  font-weight: 500;">
              login
            </button>
          </div>
          <div class="uk-flex-wrap uk-flex-center uk-margin-large-top">
            <router-link to="/forgot-password" class="uk-text-small uk-flex uk-flex-center">forgot password?</router-link>
            <div class="uk-flex uk-flex-center" >
              <small class="">
                Don't have an account? 
              </small>
              <small class="">
                <router-link to="/register" class="text-decoration-none  reg-text">create your account</router-link>
              </small>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.reg-text{
  color: #32d296;
}

.reg-text:hover{
  color: #00a769;
  
}
</style>
