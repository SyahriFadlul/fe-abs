<script setup>
import { RouterView } from 'vue-router'
import Navbar from './views/components/Navbar.vue'
// import NavbarDashboard from './views/dashboard/NavbarDashboard.vue';
import FooterVue from './views/components/Footer.vue'
import FooterMobile from './views/components/FooterMobile.vue';
import { onMounted } from 'vue';
import { useProductStore } from './stores/product';
import { useAuthStore } from './stores/auth';
import { useCartStore } from './stores/cart';

const productStore = useProductStore()
const authStore = useAuthStore()
const cartStore = useCartStore()

onMounted(async()=>{  
  await productStore.getProducts()
  await authStore.getUserInformation()    
})
</script>
<template>
  <Navbar v-if="!$route.meta.hideNavbar"/>
  <!-- <NavbarDashboard v-if="$route.meta.showNavbarDashboard" /> -->
  <main class="main-content-placeholder">
    <RouterView />
  </main>
  <FooterVue v-if="!$route.meta.hideNavbar"/>
  <FooterMobile v-if="!$route.meta.hideFooterMobile" id="mobileFooter"/>
</template>

<style scoped>
.main-content-placeholder {
  flex: 1;
  min-height: 500px;
  background-color: #ffffff; 

}
</style>

