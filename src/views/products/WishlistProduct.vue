<script setup>
import { useWishlistStore } from '../../stores/wishlist';
import { useCartStore } from '../../stores/cart';
import { onMounted } from 'vue';

const wishlistStore = useWishlistStore()
const cartStore = useCartStore()
const backendPath = import.meta.env.VITE_API_BASE_URL

const rupiahNum = function (num) {
    let price = String(num)
    price = price.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    return price + ',00';
}

onMounted(async () => {
    await wishlistStore.getWishlists()
    console.log(wishlistStore.items);
})
</script>
<template>
    <div class="uk-container uk-margin-medium-top">
        <template v-if="wishlistStore.items">
            <div class="">            
                <p id="wishlist" class="">Wishlist</p>            
            </div>
            
            <div class="uk-grid-match uk-child-width-1-4@m uk-child-width-1-3@s uk-child-width-1-1 uk-text-center uk-margin-medium-bottom" uk-grid>
                <div v-for="item in wishlistStore.items" :key="item.id">
                    <div class="uk-card-small uk-card-default">
                        <img :src="backendPath + item.product_id.image" alt="">
                        <div class="uk-card-body uk-background-muted uk-text-left uk-border-rounded">
                            <p class="uk-margin-remove uk-text-bold uk-text-medium" style="color: black;">Rp{{ rupiahNum(item.product_id.price) }}</p>
                            <p class="uk-margin-remove">{{ item.product_id.name }}</p>
                            <div class="uk-grid uk-grid-small uk-margin-small-top btns" uk-grid>
                                <button class="uk-button uk-button-default uk-button-small uk-padding-remove uk-border-rounded uk-width-1-6 uk-margin-small-left"
                                @click="wishlistStore.deleteItem(item.id)">
                                    <img src="../../assets/trash.svg" width="15" height="15">
                                </button>                            
                                <button class="uk-button uk-button-default uk-button-small uk-border-rounded uk-width-expand uk-text-capitalize uk-margin-small-left "
                                @click="wishlistStore.moveItemToCart(item)">
                                    + Keranjang</button>
                            </div>
                        </div>
                    </div>
                </div>            
            </div>
        </template>
        <template v-else>
            <div>
                
            </div>
        </template>
    </div>
</template>



<style scoped>
#wishlist {
    font-size: 24px;
    font-weight: 700;
}

.btns button {    
    color: #0CC701;
    font-weight: 500;
}

</style>