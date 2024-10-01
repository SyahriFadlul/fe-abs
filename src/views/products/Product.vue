<script setup>
import { onMounted, ref, watch, nextTick } from 'vue';
import { useProductStore } from '@/stores/product'
import { useRouter, useRoute } from 'vue-router';
import Slider from '@/views/components/Slider.vue';
import { Bootstrap5Pagination } from 'laravel-vue-pagination';
import axios from 'axios'
import { useAuthStore } from '../../stores/auth';



const router = useRouter()
const route = useRoute()
const productStore = useProductStore()
const products = productStore.p_response.data;
const authStore = useAuthStore()
const backendPath = import.meta.env.VITE_API_BASE_URL
const img = ref(null)


const rupiahNum = function (num) {
    let price = String(num)
    price = price.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    return price + ',00';
}
const detailProduct = function (data) {

    router.push('/products/' + data)
}

const changePage = async (page) => {
    productStore.loadPage(false)
    await router.push({ name: 'product', query: { page } })
    nextTick(() => {
        productStore.loadPage(true);
    })
}

watch(() => route.query.page, async (newPage) => {
        await productStore.getProducts(parseInt(newPage) || 1);
    }
);
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
onMounted(async () => {
    const url = backendPath
    const page = parseInt(route.query.page) || 1
    productStore.loadPage(false)
    await productStore.getProducts(page)
    // productStore.setProductReady()   
    productStore.loadPage(true) 
                   
})
</script>
<template>
    <main class="content">
        <div class="uk-container uk-margin-medium-top">
            <!-- <Slider />             -->
             <div class="uk-card uk-card-body uk-box-shadow">
                 <!-- <img :src="getImageUrl" alt=""> -->
             </div>
            <div class="uk-container uk-margin-top" v-if="productStore.ready">
                <p class="h1 uk-margin-small-bottom uk-margin-medium-top"> Rekomendasi Baru</p>
                <div class="uk-grid-column-small uk-grid-row-small uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-4@l uk-text-left"
                    uk-grid>
                    <div class="uk-margin-medium-bottom" v-for="product in productStore.item" :key="product.id">
                        <div class="uk-card-small uk-card-default uk-border-rounded uk-box-shadow-medium"
                            @click="detailProduct(product.id)">
                            <img  :src="product.imageUrl" loading="lazy"class="uk-width-1-1" style="height: 300px; width: 100%;" crossorigin="anonymous"/>
                            <div class="uk-card-body">
                                <p class="uk-h4 uk-margin-remove-bottom" style="color: #13556F;">
                                    <strong>Rp{{ rupiahNum(product.price) }}</strong>
                                </p>
                                <p class="uk-h5 uk-margin-remove-top">{{ product.name }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            <!-- start of skeleton -->
            <div class="uk-container uk-margin-top" v-else>
                <p class="uk-margin uk-margin-medium-top"></p>
                <div class="uk-grid-column-small uk-grid-row-small uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-4@l uk-text-left"
                    uk-grid>
                    <div class="uk-margin-medium-bottom" v-for="product in 12">
                        <div class="uk-card-small uk-card-default uk-border-rounded">
                            <div class="uk-width-1-1 uk-padding-small img" style=""></div>
                            <div class="uk-card-body">
                                <p class="price" />
                                <p class="name uk-margin-remove-top"></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- end of skeleton -->
            <Bootstrap5Pagination
                    :data="productStore.p_response"
                    @pagination-change-page="changePage"
                    :limit="2"
                />
        </div>
    </main>
</template>
<style scoped>
@media only screen and (max-width:639px) {
    .content {
        margin-bottom: 20px
    }
}

.uk-card-small {
    cursor: pointer;
}

.uk-card-body {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}


/* skeletons */
.img {
    border-radius: 5px;
    height: 300px;
    width: 100%;
    animation: pulse-bg 1s infinite;
}

.price {
    border-radius: 20px 20px;
    height: 24px;
    width: 90%;
    animation: pulse-bg 1s infinite;
}

.name {
    border-radius: 20px 20px;
    height: 24px;
    width: 65%;
    animation: pulse-bg 1s infinite;
}


</style>