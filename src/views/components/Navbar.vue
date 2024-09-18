<script setup>
import { RouterLink } from "vue-router";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { useProductStore } from "@/stores/product";
import { useCartStore } from "@/stores/cart"

const authStore = useAuthStore();
const router = useRouter();
const productStore = useProductStore();
const cartStore = useCartStore()
const backendPath = import.meta.env.VITE_API_BASE_URL

const searchTerm = ref("");

const searchProducts = async () => {
  await productStore.searchProduct(searchTerm.value);
  router.push({ name: "SearchPage", query: { name: searchTerm.value } });
};

const rupiahNum = function (num) {
  let price = String(num);
  price = price.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return price + ",00";
};

const redirectToCart = function () {
  router.push('/cart')
}

onMounted(async () => {     
});
</script>
<template>
  <div style="border-bottom: 1px solid rgb(238, 238, 238);"
    uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky"
  >
    <nav
      class="uk-navbar-container"
      style="background-color: white; font-family: Franklin Gothic Medium"
    >
      <div class="uk-container">
        <div uk-navbar>
          <div class="uk-navbar-left">
            <router-link class="navbar-brand d-flex align-items-center uk-text-decoration-none uk-visible@s" to="/">
              <img
                src="@/assets/logo-sm.png"
                alt="logo"
                style="width:"
                class=""
              />
            </router-link>
            <router-link to="/" class="uk-hidden@s">
              <img src="../../assets/logo-sm.png" alt="" width="120">
            </router-link>
          </div>

          <div class="uk-navbar-center">
            
                <router-link
                  :to="{ name: '' }"
                  class="uk-text-decoration-none uk-text-secondary uk-visible@m"
                  id="productCss"
                  ></router-link
                >
            
            <div class="uk-margin">
              <form
                @submit.prevent="searchProducts"
                class="uk-search uk-search-default"                
              >
                <a href="" class="uk-search-icon-flip" uk-search-icon></a>
                <input
                  v-model="searchTerm"
                  class="uk-input"
                  type="text"
                  placeholder="Cari di Amoeba"
                  aria-label="Search"
                />
              </form>
            </div>
          </div>

          <div class="uk-navbar-right">
            <ul class="uk-navbar-nav">
              <li class="">
                <div class="">
                  <div style="display: flex;">
                    <a
                      class="uk-text-default cart uk-visible@s"
                      href="/cart"
                      uk-icon="icon: cart;ratio: 1.1"
                      alt="cart"                      
                    >
                      <span class="rts-badge" v-show="cartStore.qtys > 0">{{ cartStore.qtys }}</span>
                    </a>
                  </div>
                  <div
                    class="uk-width-large uk-padding-small uk-dropdown uk-close"
                    uk-dropdown="pos: top-right"                                      
                  >
                    <template v-if="cartStore.item.length > 0">
                      <div class="uk-grid-small uk-grid" uk-grid>
                        <div class="cart-info uk-width-expand uk-first-column">
                          <p class="uk-text-normal" style="font-size: 17px;">Keranjang</p>
                        </div>
                        <a
                          href="/cart"
                          class="cartLink router-link-active router-link-exact-active cart-see-more uk-width-auto"
                          aria-current="page"
                        >
                          <span class="cartLink">Lihat Semua</span>
                        </a>
                      </div>
                      <div class="uk-grid-small uk-grid cart-items-container"  v-for="product in cartStore.item" :key="product.id" @click="redirectToCart()" uk-grid>
                        <div class="uk-first-column">
                          <img :src="backendPath + '/storage/' + product.product_id.image" width="100" height="auto" >
                        </div>
                        <div class="uk-width-expand">
                          <p class="uk-margin-remove uk-padding-remove" style="font-weight: 600;">{{ product.product_id.name}}</p>
                          <small class="uk-margin-remove" >{{ product.qty }} barang</small>
                        </div>
                        <div class="uk-width-auto">
                          <strong class="" style="font-weight: 500;color: #2C6629;">Rp. {{ rupiahNum(product.product_id.price) }}</strong>
                        </div>                        
                      </div>
                    </template>

                    <div v-else>
                      kosong
                    </div>
                  </div>
                </div>
              </li>
              <template v-if="!authStore.user">
                <li class="uk-visible@s"><router-link to="/login">Sign in</router-link></li>
                <li class="uk-visible@s"><router-link to="/register">Sign up</router-link></li>
              </template>
              <template v-else>
                <li class="uk-visible@s">
                  <a href="#" class="uk-text-normal uk-text-default" 
                    >Hello, {{ authStore.user.username
                    }}<span uk-navbar-parent-icon></span
                  ></a>
                  <div class="uk-navbar-dropdown uk-width-1-6">
                    <ul class="uk-nav uk-navbar-dropdown-nav" >
                      <li ><router-link to="/profile">Profile</router-link></li>
                      <li ><router-link to="/wishlist">Wishlist</router-link></li>
                      <li ><router-link to="/order-list">Pembelian</router-link></li>
                      <template v-if="authStore.role === 'admin'">
                        <li>
                          <router-link to="/dashboard">Dashboard</router-link>
                        </li>
                      </template>
                      <li>
                        <router-link
                          :to="$route.path"
                          @click.prevent="authStore.handleLogout()"
                          >Logout</router-link
                        >
                      </li>
                    </ul>
                  </div>
                </li>
              </template>
            </ul>            
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<style scoped>
@media only screen and (max-width: 374px){
  .uk-search {
    width: 200px;
    margin-left: 60px;
  }

  nav {    
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  }  
}
@media only screen and (max-width: 639px) and (min-width: 375px){
  .uk-search {
    width: 300px;
    margin-left: 60px;
  }

  nav {    
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
  }  
}

@media only screen and (min-width: 640px){
  .uk-search {
    width: 200px;
    margin-left: 20px;
  }
  
}  
  
@media only screen and (min-width: 768px){
  .uk-search {
    width: 300px;
    margin-left: 20px;
  }
  
}

@media only screen and (min-width: 992px){
  .uk-search {
    width: 400px;
  }

}

@media only screen and (min-width: 1200px) {
  .uk-search {
    width: 600px;
  }
  
}

input::placeholder{
  color: rgb(185, 185, 185);
}

input{
  border-radius: 5px;
  border-color: rgb(185, 185, 185);
}

.cart {
  margin-top: 29px;
  position: relative;
}

.rts-badge {

  background-color: #337D9A !important;
  font-size: 11px;  
  color: white;
  border-width: 100px;
  display: flex;
  box-sizing: border-box;
  position: absolute;
  top: -6px;
  right: -5px;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 500px;
  vertical-align: middle;  
  font-size: 11px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.cartLink {
  font-weight: 300;
  color: #337D9A;
  text-decoration: none;
}

.cartLink:hover {
  color: #62A9C4;
  font-weight: 600;
}

/* .uk-close {
  width: 400px;
  max-height: 200px;
  z-index: 495;
} */
.cart-items-container {
  max-height: 350px;
  overflow-y: auto;
  max-width: 800px;
  cursor: pointer;
}
</style>
