<script setup>
import { useCartStore } from '../../stores/cart';

const cartStore = useCartStore()
</script>
<template>
    <div id="mobileFooter" class="uk-container uk-container-expand uk-position-fixed uk-position-bottom uk-position-z-index uk-text-center uk-hidden@s">
        <div class="uk-margin uk-child-width-expand uk-width-1-1 uk-grid uk-grid-small uk-text-center" uk-grid>
            <router-link to="/" class="uk-text-decoration-none item">
                <img src="@/assets/home.svg" alt="">
            </router-link>
            <router-link to="/cart" class="uk-text-decoration-none item">
                <img src="@/assets/cart.svg" alt="">
                <span class="cart-count" v-show="cartStore.qtys > 0">{{ cartStore.qtys }}</span>
            </router-link>
            <div>
                <a href="" class="uk-text-decoration-none item">
                    <div class="logo">
                        <img src="@/assets/logo-sm.png" class="uk-border-circle" alt="" >
                    </div>
                </a>
            </div>
            <a href="#" class="uk-text-decoration-none item">
                <img src="@/assets/bell.svg" alt="">
            </a>
            <router-link to="/profile/menu" class="uk-text-decoration-none item">
                <img src="@/assets/user.svg" alt="">
            </router-link>
        </div>
    </div>
</template>


<style scoped>
#mobileFooter {
    background-color: black;
    height: 50px;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
}

.item {
    color: #0CC701;
    margin-top: 10px;
    
}

@media only screen and (min-width: 320px) {
    .cart-count {
        top: 4px;
        left: 94px;
    }    
}

@media only screen and (min-width: 340px) {
    .cart-count {
        top: 4px;
        left: 100px;
    }    
}

@media only screen and (min-width: 360px) {
    .cart-count {
        top: 4px;
        left: 107px;
    }    
}

@media only screen and (min-width: 380px) {
    .cart-count {
        top: 4px;
        left: 113px;
    }    
}

@media only screen and (min-width: 400px) {
    .cart-count {
        top: 4px;
        left: 119px;
    }    
}

@media only screen and (min-width: 425px){
    .cart-count {
        top: 4px;
        left: 124px;
    }    
}
.cart-count {

background-color: #B1C702 !important;
font-size: 11px;  
color: white;
border-width: 100px;
display: flex;
box-sizing: border-box;
position: absolute;
width: 20px;
height: 20px;
padding: 0 5px;
border-radius: 900px;
vertical-align: middle;  
font-size: 11px;
display: inline-flex;
justify-content: center;
align-items: center;
}

.logo img {
    border-radius: 500px;
    margin-top: -25px;    
    max-width: 100%;
    height: auto;
    box-sizing: inherit;
}

</style>