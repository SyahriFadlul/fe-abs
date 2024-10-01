<script setup>
import { useProductStore } from '../../stores/product';
import { onMounted,ref } from 'vue';
import { useCartStore } from '../../stores/cart';
import { useAuthStore } from '../../stores/auth';
import { useRouter } from 'vue-router';
import { useOrderStore } from '../../stores/order';

const productStore = useProductStore()
const cartStore = useCartStore()
const authStore = useAuthStore()
const router = useRouter()
const orderStore = useOrderStore()
const backendPath = import.meta.env.VITE_API_BASE_URL

const rupiahNum = function (num) {
    let price = String(num)
    price = price.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    return price + ',00';
}

async function goToCheckout(){
    cartStore.getSelectedItems()
    await orderStore.createOrder(authStore.user.id, cartStore.selectedItem)
    router.push('/cart/shipment')
}

onMounted(async () =>{        
    productStore.loadPage(false)    
    await cartStore.getCarts()
    productStore.loadPage(true)    
    cartStore.getTotalSelectedItem()
    cartStore.getTotalPrice()
    cartStore.handleBeliButton()
    cartStore.checkAllCheckbox()
})
</script>
<template>
    <div class="uk-cart uk-container uk-margin-large-bottom">
        <div v-if="productStore.ready">        
            <template v-if="cartStore.item.length > 0">
                <nav aria-label="Breadcrumb">
                    <ul class="uk-container uk-breadcrumb uk-margin-small">
                    <li><router-link to="/">Home</router-link></li>
                    <li class="uk-disabled"><router-link to="">Cart</router-link></li>
                </ul>
                </nav>                
                <div>
                    <p style="font-size: 24px;font-weight: 700;">Keranjang</p>
                    <div class="">
                        <label><input class="uk-checkbox uk-border-rounded" type="checkbox" v-model="cartStore.checkbox" @input="cartStore.selectAllItem()"> Pilih Semua</label>
                    </div>
                </div>
                <div class="uk-grid@s uk-grid-small" uk-grid>
                    <!-- kiri -->
                    <div class="uk-first-column uk-width-expand@s uk-width-1-1 uk-margin-top uk-margin-medium-right@m">
                        <div class="uk-margin-bottom" v-for="(product, index) in cartStore.item" :key="product.id">
                            <hr class="uk-margin-right" style="border-top: 2px solid;border-color: #003245;">
                            <div class="uk-grid uk-grid-small" uk-grid>
                                <div class="uk-width-auto uk-first-column">                        
                                    <div class="">
                                        <label class="">
                                            <input class="uk-checkbox uk-border-rounded" type="checkbox" :checked="product.selected" @input="cartStore.changeToChecked(index)">
                                            <img id="img" class="uk-margin-small-left" :src="product.product_id.imageUrl" alt="" width="200">
                                        </label>
                                    </div>
                                </div>
                                <div class="uk-width-expand">                        
                                    <div class="">{{ product.product_id.name }}</div>
                                    <div class="uk-text-muted uk-text-small">{{ product.product_id.storage }}</div>
                                    <div class="uk-margin-small-top uk-text-bold">Rp{{ rupiahNum(product.product_id.price) }}</div>
                                    <div class="addition uk-margin-small-top uk-grid uk-grid-small@m" uk-grid>
                                        <div class="uk-first-column uk-width-1-3@l uk-width-1-4@m uk-width-1-6 uk-flex-first@l uk-flex-last uk-margin-remove-left uk-margin-small-top" >
                                            <a class="uk-text-decoration-none" @click="cartStore.handleShowNote(index)"><span class="uk-visible@m">Tulis</span> catatan</a>
                                            <div :class="{ 'uk-hidden' : !product.toggleNote}">
                                                <textarea class="uk-border-rounded note" rows="3" 
                                                type="text" placeholder="Silahkan masukan catatan"
                                                v-model="product.note"
                                                @keyup.enter="cartStore.handleInputNote(product.note,index)" 
                                                style="border-color: #003245;padding-left: 0px 5px;"></textarea>
                                            </div>
                                            <button class="uk-button uk-button-small uk-border-rounded sv-note uk-text-center"
                                            style="font-size: 12px;font-weight: 400;background-color: #337D9A;color: white;"
                                            :class="{ 'uk-hidden' : !product.toggleNote}">Simpan</button>
                                        </div>
                                        <div class="uk-width-auto@m uk-width-1-3 uk-margin-small-top wl" @click="cartStore.moveItemToWishlist(product)"><span class="uk-visible@m">Tambahkan ke </span>Wishlist</div>
                                        <div class="uk-width-auto@m uk-visible@m uk-margin-small-top">
                                            <hr class="uk-divider-vertical" style="border-color: #003245; height: 20px; ">
                                        </div>
                                        <div class="del uk-width-auto@l uk-width-1-6@m uk-margin-small-top uk-margin-remove-left" @click="cartStore.deleteItemFromCart(product.id)">
                                            Hapus
                                        </div>
                                        <div class="uk-width-1-4@l uk-width-1-3@m uk-width-1-1 uk-flex-last@l uk-flex-first">
                                            <div class="uk-flex-nowarp@m uk-margin-left btn-ctr" >
                                                <button class="uk-button uk-button-small uk-width-1-3@m uk-width-1-5@s uk-width-1-3 rounded-start-pill btn-min" @click="cartStore.decreaseQty(product)"><span uk-icon="icon: minus;ratio: 0.8"></span></button>
                                                <input class="uk-width-1-4 uk-input uk-form-small uk-text-center ipt-ctr" type="number" v-model="product.qty" @input="cartStore.modifyQty(product, $event)">
                                                <button class="uk-button uk-button-small uk-width-1-3@m uk-width-1-5@s uk-width-1-3 rounded-end-pill btn-plus" @click="cartStore.increaseQty(product)"><span uk-icon="icon: plus;ratio: 0.8"></span></button>
                                            </div>    
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>                
                    </div>
                    <!-- kanan -->            
                    <div class="cart-card">   
                        <div class="uk-card uk-card-small uk-card-default uk-card-body uk-box-shadow-large uk-border-rounded uk-position-z-index" uk-sticky="end: .cart-card;offset: 100">
                            <p class=" uk-text-bold" style="color:#003245">Belanjaanmu</p>
                            <div class="u-padding-small uk-margin-remove-top uk-grid uk-grid-small uk-width-expand uk-margin-remove-bottom" uk-grid>
                                <div class="uk-margin-small uk-first-column uk-width-expand">
                                    <p class="cart-card-item">Total Harga ({{ cartStore.totalQty }} barang)</p>
                                </div>
                                <div class="uk-text-right uk-width-auto cart-card-item">
                                    Rp{{ rupiahNum(cartStore.total) }}
                                </div>
                            </div>
                            <div class="u-padding-small uk-margin-remove-top uk-grid uk-grid-small uk-width-expand uk-margin-remove-bottom" uk-grid>
                                <div class="uk-margin-small uk-first-column uk-width-expand">
                                    <p class="cart-card-item">Total Diskon</p>
                                </div>
                                <div class="uk-text-right uk-width-auto cart-card-item">
                                    - Rp0
                                </div>
                            </div>
                            <hr class="uk-margin-remove-top" style="border-top: 1px solid;border-color: #003245;">
                            <div class="uk-grid uk-grid-small uk-width-expand" uk-grid>
                                <div class="uk-width-expand uk-text-bold cart-card-item" style="color: #003245;">
                                    Total Harga
                                </div>
                                <div class=" uk-width-auto cart-card-item uk-text-bold" style="color: #003245;">
                                    Rp{{ rupiahNum(cartStore.total) }}
                                </div>
                            </div>                    
                            <button class="uk-button uk-border-rounded uk-width-1-1 uk-margin-medium-top buy-btn" @click="goToCheckout()" :disabled="!cartStore.button">beli ({{ cartStore.totalQty }})</button>                    
                        </div>
                    </div>
                </div>
            </template>
             <!-- if empty -->
            <div class="uk-margin-large-top" v-else>
            <h2 class="uk-flex uk-flex-center uk-text-bold uk-margin-remove-bottom">Keranjang belanja masih kosong.</h2>
            <p class="uk-flex uk-flex-center uk-margin-small-top"> Tambahkan peralatan lab dan produk kesehatan pilihan Anda!</p>
            <router-link to="/" class="uk-text-decoration-none uk-flex uk-flex-center">
                <button class="uk-button uk-button-primary uk-border-rounded" style="background-color: #0CC701;">Mulai Belanja</button>
            </router-link>  
        </div>
        </div>
        <!-- start of skeleton -->
        <template v-else>
            <nav aria-label="Breadcrumb">
                <ul class="uk-container uk-breadcrumb uk-margin-small">
                <li><router-link to="/">Home</router-link></li>
                <li class="uk-disabled"><router-link to="">Cart</router-link></li>
            </ul>
            </nav>                
            <div>
                <p style="font-size: 24px;font-weight: 700;">Keranjang</p>
                <div class="">
                    <label id="cb-all-sk"><input class="uk-checkbox uk-border-rounded" type="checkbox"><p></p></label>
                </div>
            </div>
            <div class="uk-grid@s uk-grid-small" uk-grid>
                <!-- kiri -->
                <div class="uk-first-column uk-width-expand@s uk-width-1-1 uk-margin-top uk-margin-medium-right">
                    <div class="uk-margin-bottom" v-for="(product, index) in 10" :key="product.id">
                        <hr class="uk-margin-right" style="border-top: 2px solid;border-color: #003245;">
                        <div class="uk-grid uk-grid-small" uk-grid>
                            <div class="uk-width-auto uk-first-column">                                                                
                                <label class="slt-img-sk">
                                    <input class="uk-checkbox uk-border-rounded">
                                    <p class="uk-margin-small-left img-sk"></p>
                                </label>                                    
                            </div>
                            <div class="uk-width-expand">                        
                                <div class="np-sk"></div>
                                <div class="str-sk"></div>
                                <div class="np-sk"></div>
                                <div class="addition uk-margin-small-top uk-grid uk-grid-small@m" uk-grid>
                                    <div class="uk-first-column uk-width-1-3@l uk-width-1-4@m uk-width-1-6 uk-flex-first@l uk-flex-last uk-margin-small-top addition-items-sk uk-margin-medium-left" ></div>
                                    <div class="uk-width-auto@m uk-width-1-3 uk-margin-small-top wl addition-items-sk"></div>
                                    <div class="uk-width-auto@m uk-visible@m uk-margin-small-top vt-sk"></div>
                                    <div class="del uk-width-auto@l uk-width-1-6@m uk-margin-small-top uk-margin-remove-left addition-items-sk"></div>
                                    <div class="uk-width-1-4@l uk-width-1-3@m uk-width-1-1 uk-flex-last@l uk-flex-first md-qty-sk">    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>                
                </div>
                <!-- kanan -->            
                <div class="cart-card">   
                    <div class="uk-card uk-card-small uk-card-default uk-card-body uk-box-shadow-large uk-border-rounded uk-position-z-index" uk-sticky="end: .cart-card;offset: 100">
                        <p class="ttl-card-sk"/>
                        <p class="itm-card-sk"/>
                        <p class="itm-card-sk"/>                                
                        <hr class="uk-margin-remove-top" style="border-top: 1px solid;border-color: #003245;">
                        <p class="itm-card-sk"/>                    
                        <button class="uk-button uk-border-rounded uk-width-1-1 uk-margin-medium-top buy-btn"><p uk-spinner="ratio: 0.8"></p></button>                    
                    </div>
                </div>
            </div>
        </template>
        <!-- end of skeleton -->
       
        
    </div>
</template>
<style scoped>
@media only screen and (max-width: 640px) {
    .cart-card {
        width: 600px;
        margin-bottom: 20px;        
    }

    #img {
        width: 100px;
    }

    .btn-ctr {
        margin: 0 !important;
        width: 100% !important;
        display: flex;
    }

    .btn-min {
        width: 40px;
        height: 30px !important;
    }

    .btn-plus {
        width: 40px;
        height: 30px !important;
    }

    .ipt-ctr {
        width: 35px !important;
        height: 60px !important;
        font-size: 12px !important;
        
    }

    .btn-min span {
        justify-self: left;
        padding-right: 20px;
        width: 30px;        
    }

    .btn-plus span {
        justify-self: left;
        padding-right: 20px;
        width: 30px;
    }

    .del {
        margin-left: 20px;
    }
}
@media only screen and (min-width: 640px) {
    .cart-card {
        width: 350px;        
    }

    #img {
        width: 100px;
    }
}


@media only screen and (min-width: 768px){
    #img {
        width: 79px;
        height: 79px;
    }

    .btn-ctr {
        width: 200px;
    }
}
@media only screen and (min-width: 960px){
    #img {
        width: 79px;
        height: 79px;
    }

    .note {
        width: 230px !important;
    }

    .cart-card {
        width: 360px;
    }

    .btn-ctr {
        margin: 0 !important;
        width: 100% !important;
        display: flex;
    }

    .btn-min span {
        width: 30px;
        padding-right: 18px;
    }

    .btn-plus span {
        width: 30px;
        padding-right: 18px;
    }
}
@media only screen and (min-width: 1200px){
    #img {
        width: 100px;
        height: 100px;
    }

    .cart-card {
        width: 390px;
    }

    
}

.addition {
    font-size: 12px;
}

.del {
    color: rgb(255, 0, 0);
    cursor: pointer;
}

.del:hover {
    color: rgb(218, 19, 19);
    font-weight: 600;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
  appearance: textfield;
}

.wl {
    cursor: pointer;
}

.btn-min {
    background-color: white;
    border: 1px solid;
    border-right-style: none;
    border-color: #003245;
    height: 30px;
    
}

.btn-plus {
    background-color: white;
    border: 1px solid;
    border-left-style: none;
    border-color: #003245;
    height: 30px;
    
}

.ipt-ctr {
    border: 1px solid;
    border-color: #003245;
    border-left: none;
    border-right: none;
    height: 30px !important;
    
}

.buy-btn {
    background-color: #003245;
    color: white;
    font-weight: 500;
}

button:disabled.buy-btn {
    background-color: aquamarine !important;
    opacity: 0.6 !important;
    cursor: not-allowed !important;
}

/* skeleton styles */
#nav-sk {
    margin-top:10px;
    width: 20%;
    height: 16px;
    border-radius: 20px 20px;
    animation: pulse-bg 1s infinite;
}

#cb-all-sk {
    display: flex;
    align-items: center;
}

#cb-all-sk p {
    margin-bottom:23px;        
    margin-left: 5px;
    width: 120px;
    height: 20px;
    border-radius: 20px 20px;
    animation: pulse-bg 1s infinite;
}

.slt-img-sk {
    display: flex;
    align-items: center;
}

.img-sk {    
    margin:0;
    margin-left: 5px;
    width: 100px;
    height: 100px;
    border-radius: 20px 20px;
    animation: pulse-bg 1s infinite;
}

.np-sk {
    width: 40%;
    height: 12px;
    border-radius: 20px 20px;
    animation: pulse-bg 1s infinite;
}

.str-sk {
    width: 10%;
    margin: 5px  0px;
    height: 12px;
    border-radius: 20px 20px;
    animation: pulse-bg 1s infinite;
}

.addition-items-sk {
    width: 10%;
    margin: 5px 20px;
    height: 12px;
    border-radius: 20px 20px;
    animation: pulse-bg 1s infinite;
}

.md-qty-sk {
    align-self: center;
    margin-left: 20px;
    display: flex;    
    width: 15%;
    height: 24px;
    border-radius: 20px 20px;
    animation: pulse-bg 1s infinite;
}

.ttl-card-sk {
    width: 40%;
    height: 16px;
    border-radius: 20px 20px;
    animation: pulse-bg 1s infinite;
}

.itm-card-sk {
    width: 100%;
    height: 12px;
    border-radius: 20px 20px;
    animation: pulse-bg 1s infinite;
}
</style>