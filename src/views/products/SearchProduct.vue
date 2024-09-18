<script setup>
import { ref, watch } from 'vue';
import { useProductStore } from '@/stores/product';
import { useRoute, useRouter } from 'vue-router';
import NotFound from '@/views/components/NotFound.vue'

const productStore = useProductStore();
const products = ref([]);
const route = useRoute();
const router = useRouter();
const backendPath = import.meta.env.VITE_API_BASE_URL

const rupiahNum = function (num) {
    let price = String(num)
    price = price.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    return price + ',00';
}
const detailProduct = function (data) {

    router.push('/products/' + data)
}

const fetchProducts = async () => {
    const name = route.query.name;
    await productStore.searchProduct(name);
    products.value = productStore.item;
};

fetchProducts();

watch(() => route.query.name, fetchProducts);

</script>

<template>
    <div>
        <div class="uk-margin-top  uk-background-muted">
            <div class="uk-container">
                <p class="h1 uk-margin-small-bottom uk-margin-medium-top"> Hasil Pencarian untuk <span>"{{ route.query.name
                }}"</span></p>
                <div v-if="products.length === 0" >
                    <NotFound/>
                </div>
                <div v-else class="uk-grid-column-small uk-grid-row-small uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-4@l uk-text-left"
                    uk-grid>
                    <div class="uk-margin-medium-bottom" @click="detailProduct(product.id)" v-for="product in products" :key="product.id" >
                        <div class="uk-card-small uk-card-default rounded-1">
                            <img :src="backendPath + product.image"  class="uk-width-1-1"
                                style="height: 300px; width: 100%;">
                            <div class="uk-card-body">
                                <p class="uk-h4 uk-margin-remove-bottom">
                                    <strong>Rp.{{ rupiahNum(product.price) }}</strong>
                                </p>
                                <p class="uk-h5 uk-margin-remove-top">{{ product.name }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.uk-card-small {
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
}

.uk-card-small:hover {
    transform: scale(1.01);
}

.uk-card-body {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

</style>