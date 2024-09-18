<script setup>
import { nextTick, onMounted, ref } from 'vue';
import { useProductStore } from '@/stores/product';
import { useAuthStore } from '@/stores/auth';
import { RouterLink, useRouter } from 'vue-router';
import UIkit from 'uikit';
import loginModal from '../auth/LoginModal.vue';
import { useCartStore } from '../../stores/cart';
import he from "he"

const route = useRouter()
const productStore = useProductStore()
const authStore = useAuthStore()
const cartStore = useCartStore()
const backendPath = import.meta.env.VITE_API_BASE_URL
const rupiahNum = function (num) {
    let price = String(num)
    price = price.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    return price + ',00';
}

let toggle = ref(false)
function clicked(value){
    toggle.value = value
    toggle.value = !toggle.value    
}

function toggleButton(){

}

const showLoginModal = function () {
    UIkit.modal("#modal-login").show();
}

const redirectCart = async function () {
    route.push('/cart')    
    await cartStore.createCart(productStore.product.id, authStore.user.id, 1, true)
}

const props = defineProps({
    id: {
        type: String,
        required: true
    }
})

const data = ref({
    product_id:'',
    user_id:'',    
})

onMounted(async () => {
    productStore.loadPage(false)
    await productStore.getProduct(props.id)
    productStore.loadPage(true)
    authStore.clearErrors()
    if (productStore.errorResponse === 404) {
        route.push('/notfound')
    }
    await authStore.getUser()
    await authStore.getRole()
    console.log(backendPath +'/storage/' + productStore.product.image);
    
})

</script>

<template>
    <div class="uk-container uk-margin-top">
        <template v-if="productStore.ready">                
            <nav aria-label="Breadcrumb">
                    <ul class="uk-breadcrumb uk-margin-small">
                        <li><a href="/">Home</a></li>
                    <li class="uk-disabled"><a>Detail Product</a></li>
                </ul>
            </nav>
            <div class="uk-card-small uk-card-default uk-card-body uk-width-expand uk-border-rounded uk-margin-medium-bottom">
                <div class="uk-grid-small uk-child-width-1-2" uk-grid>
                    <div class="uk-width-auto@s uk-width-1-2@m uk-width-1-1 uk-margin-medium-bottom">
                        <div class="uk-visible-toggle">
                            <img class="main-img" :src="backendPath +'/storage/' + productStore.product.image" alt="">
                        </div>
                    </div>
                    <div class="uk-width-expand@s uk-margin-medium-left@m uk-width-1-1 uk-margin-top">
                        <div class="uk-product-detail uk-text-left">
                            <p class="uk-margin-remove ph-name" style="font-size: 28px;font-weight: 600;color: black;">{{ productStore.product.name }}</p>
                            <div class="info uk-grid-small" style="font-size: 15px;margin-top: -3px;list-style-type: disc;" uk-grid>
                                <div style="font-weight: 400;color: black;">Terjual <span class="uk-text-muted">
                                    0</span>
                                </div>
                                <div class="uk-inline">
                                    <li style="color: black;">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star-filled" width="16" height="16" 
                                        viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                        <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" 
                                        stroke-width="0" fill="#F5D700" />
                                        </svg>
                                        <span style="color: black;font-weight: 400;"> 0</span>
                                            <!-- <span class="uk-text-muted"> (800rb rating)</span> -->
                                    </li>
                                </div>
                                <div>
                                    <!-- <li style="font-weight: 400;color: black;">Diskusi <span class="uk-text-muted">(0)</span>
                                    </li> -->
                                </div>
                            </div>
                            <p id="price" class="uk-margin-remove-bottom uk-margin-small-top uk-text-bold">Rp. {{ rupiahNum(productStore.product.price) }}</p>
                            <p class="uk-margin-remove" style="color: black;font-weight: 400;">Stok : {{ productStore.product.stock }}</p>
                            <!-- <div class="uk-margin-top">
                                <span class="rts-product-form-title uk-text-capitalize">Pilih Ukuran</span>
                            </div> -->
                            <div class="uk-grid uk-grid-small" uk-grid>
                            <!-- <div class="uk-padding-small">
                                <button class="uk-button rts-product-button-variant uk-text-uppercase"
                                :class="{' active ' : toggle}" @click="clicked(toggle)">
                                39</button>
                                
                            </div>
                            <div class="uk-padding-small">
                                <button class="uk-button rts-product-button-variant uk-text-uppercase"
                                :class="{' active ' : toggle}" @click="clicked(toggle)">
                                40</button>
                                
                            </div>
                            <div class="uk-padding-small">
                                <button class="uk-button rts-product-button-variant uk-text-uppercase"
                                :class="{' active ' : toggle}" @click="clicked(toggle)">
                                41</button>
                                
                            </div>
                            <div class="uk-padding-small">
                                <button class="uk-button rts-product-button-variant uk-text-uppercase"
                                :class="{' active ' : toggle}" @click="clicked(toggle)">
                                42</button>
                                
                            </div>
                            <div class="uk-padding-small">
                                <button class="uk-button rts-product-button-variant uk-text-uppercase"
                                :class="{' active ' : toggle}" @click="clicked(toggle)">
                                43</button>
                                
                            </div> -->
                            <!-- <div class="uk-padding-small">
                                <button class="uk-button rts-product-button-variant uk-text-uppercase"
                                :class="{' active ' : toggle}" @click="clicked(toggle)">
                                {{ productStore.product.storage }}</button>                                
                            </div> -->
                             </div>
                            <div class="uk-margin-top">
                                <span class="rts-product-form-title">Deskripsi</span>
                            </div>
                            <div>
                                <p class="uk-margin-small-right uk-text-small" style="line-height: 21px;"  v-html="productStore.product.description"></p>
                            </div>
                            <div class="uk-margin-top uk-flex ">
                                <div class="uk-margin-small-right">
                                    <div v-if="!authStore.user">
                                        <button class="uk-button uk-border-rounded crt-btn"
                                            type="button"
                                            :disabled="toggleButton(toggle)"
                                            @click="showLoginModal">
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-cart-plus" width="20" height="20" 
                                                viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                                                <path d="M12.5 17h-6.5v-14h-2" /><path d="M6 5l14 1l-.86 6.017m-2.64 .983h-10.5" /><path d="M16 19h6" /><path d="M19 16v6" /></svg>
                                            </span>
                                            <span class="uk-visible@m">Tambahkan ke</span> Keranjang</button>
                                        <loginModal />
                                    </div>
                                    <div v-else>
                                        <button @click="cartStore.createCart(productStore.product.id, authStore.user.id, 1, false)"
                                            class="uk-button  uk-border-rounded crt-btn"
                                            :disabled="toggleButton(toggle)"
                                            >
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-cart-plus" width="20" height="20" 
                                                viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                                                <path d="M12.5 17h-6.5v-14h-2" /><path d="M6 5l14 1l-.86 6.017m-2.64 .983h-10.5" /><path d="M16 19h6" /><path d="M19 16v6" /></svg>
                                            </span>
                                            <span class="uk-visible@m">Tambahkan ke</span> Keranjang</button>
                                    </div>
                                </div>
                                <div class="uk-margin-small-right">
                                    <div v-if="!authStore.user">
                                        <button class="uk-button uk-border-rounded buy-btn" type="button"
                                            :disabled="toggleButton(toggle)"
                                            @click="showLoginModal">Beli <span class="uk-visible@m">Sekarang</span></button>
                                        <loginModal />
                                    </div>
                                    <div v-else>
                                        <button @click="redirectCart()" class="uk-button uk-border-rounded buy-btn" :disabled="toggleButton(toggle)">Beli
                                            <span class="uk-visible@m">Sekarang</span></button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </template>
        <!-- start of skeleton -->
        <template v-else>
            <p id="nav-sk"/>
            <div class="uk-card-small uk-card-default uk-card-body uk-width-expand uk-border-rounded uk-margin-medium-bottom">
                <div class="uk-grid-small uk-child-width-1-2" uk-grid>
                    <div class="uk-width-auto@s uk-width-1-2@m uk-width-1-1">
                        <p id="mm-sk" />
                    </div>    
                    <div class="uk-width-expand@s uk-margin-small-left@m uk-width-1-1 ">
                        <p class="h1"/>
                        <div class="dtls uk-flex"><p/><p/><p/></div>
                        <p class="h1"/>                            
                        <p id="stk-sk"/>   
                        <p id="chs-sk"/>
                        <div class="stgs-sk uk-flex"><p/><p/><p/></div>
                        <p id="ttl-sk"/>
                        <p class="ttl-dtl-sk"/>
                        <p class="ttl-dtl-sk"/>
                        <p class="ttl-dtl-sk"/>
                        <p class="ttl-dtl-sk"/>
                        <div class="uk-flex btns-sk"><p/><p/></div>
                    </div>
                </div>
            </div>
        </template>
        <!-- end of skeleton  -->
    </div>
</template>

<style scoped>
@media only screen and (max-width: 639px){
    #price {
        font-size: 24px !important;
    }

    .uk-slideshow-items {
        height: 400px
    }

    .main-img {
        width: 100%;
        height: 400px;
    }

    .thumb-img {
        height: 70px;
        width: 100%
    }
}

@media only screen and (min-width: 640px) {
    .uk-slideshow-items {
        height: 350px;
        width: 300px
    }

    .main-img {
        width: 120%;
        height: 350px;
    }

    .thumb-img {
        width: 100%;
        height: 69px;
    }

    .crt-btn {
        margin-bottom: 20px
    }
}

@media only screen and (min-width: 700px){
    .uk-slideshow-items {
        height: 350px;
        width: 350px
    }

    .main-img {
        width: 350px;
        height: 350px;
    }

    .thumb-img {
        width: 100%;
        height: 69px;
    }

    #price {
        font-size: 24px
    }
}

@media only screen and (min-width: 960px) {
    .uk-slideshow-items {
        height: 400px
    }

    .main-img {
        height: 400px
    }

    .crt-btn {
        margin-bottom: 0px
    }

    #price {
        font-size: 28px
    }

    .thumb-img {
        width: 100%;
        height: 120px;
    }
}

@media only screen and (min-width: 1024px) {
    .uk-slideshow-items {
        height: 500px;        
    }

    .main-img {
        height: 500px;
        width: 100%
    }
}

#price {
    color: #13556F;
}

.active {
    color: white !important;
    background-color: #13556F !important;
    border: solid 1px #B1C702 !important;
}

.rts-product-button-variant {
    min-width: 32px;
    border-radius: 8px;
    border: solid 1px #8d8d8d;
    background-color: #fff;
    padding: 9px 11px 9px 12px;
    /* margin-right: 8px; */
    font-family: InterTight;
    font-size: 14px;
    font-weight: 400;
    font-stretch: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    text-align: left;
    color: #8d8d8d
}

.rts-product-button-variant:disabled {
    padding: 9px 14px;
    border-radius: 8px;
    border: solid 1px #d9d9d9;
    background-color: #fff;
    text-decoration-line: line-through
}

.rts-product-button-variant.selected {
    border: solid 1px #ff90b8;
    background-color: #f5d4e0;
    color: #eb577b
}

.rts-product-form-title {
    font-family: Roboto;
    font-size: 16px;
    font-weight: 700;
    font-stretch: condensed;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    text-align: left;
    color: #525252
}

.crt-btn {    
    background-color: white;
    padding: 0px 16px; 
    border: 1px solid; 
    color: #003245; 
    font-weight: 500;
}

.buy-btn {
    background-color: #003245;
    padding: 0px 16px; 
    color: #ffffff; 
    font-weight: 500;
}

/* skeleton styles */
#nav-sk {
    width: 20%;
    height: 16px;
    border-radius: 20px 20px;
    animation: pulse-bg 1s infinite;
}

#mm-sk {
    width: 100%;
    height: 400px;
    border-radius: 20px 20px;
    animation: pulse-bg 1s infinite;
}

.h1 {
    width: 55%;
    height: 32px;
    border-radius: 20px 20px;
    animation: pulse-bg 1s infinite;
}

.dtls p {
    margin: 0;
    margin-right:50px;
    margin-bottom:40px;
    width: 12%;
    height: 12px;
    border-radius: 20px 20px;
    animation: pulse-bg 1s infinite;
}

#stk-sk {
    width: 20%;
    height: 18px;
    border-radius: 20px 20px;
    animation: pulse-bg 1s infinite;
}

#chs-sk {
    margin: 0;
    margin-top: 20px;
    margin-bottom: 5px;
    width: 35%;
    height: 16px;
    border-radius: 20px 20px;
    animation: pulse-bg 1s infinite;
}

.stgs-sk p {
    margin: 0;
    margin-right: 5px;
    margin-bottom: 15px;
    width: 10%;
    height: 30px;
    border-radius: 8px 8px;
    animation: pulse-bg 1s infinite;
}

#ttl-sk {
    margin: 10px 0px;
    width: 20%;
    height: 16px;
    border-radius: 20px 20px;
    animation: pulse-bg 1s infinite;
}

.ttl-dtl-sk {
    width: 100%;
    margin:0;
    margin-bottom:6px;
    height: 10px;
    border-radius: 20px 20px;
    animation: pulse-bg 1s infinite; 
}

.btns-sk p {
    margin: 0;
    margin-top:10px;
    margin-right: 10px;
    width: 20%;
    height: 30px;
    border-radius: 20px 20px;
    animation: pulse-bg 1s infinite; 
}
</style>
        