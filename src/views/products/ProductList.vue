<script setup>
import { ref, onMounted } from 'vue';
import { useProductStore } from '@/stores/product'
import { useRouter } from 'vue-router';

const router = useRouter()
const productStore = useProductStore()
const backendPath = import.meta.env.VITE_API_BASE_URL
const rupiahNum = function (num) {
    let price = String(num)
    price = price.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    return price + ',00';
}

// const props = defineProps({
//     id: {
//         type: String,
//         required: true
//     }
// })
// const detailProduct = function (data) {

//     router.push('/products/' + data)
// }

onMounted(async () => {
    productStore.loadPage(false)
    await productStore.getProducts()
    productStore.setProductReady()
    productStore.loadPage(true)
})
</script>

<template>
    <div class="" id="">
        <div>
            <div class="list-header">
                <div class="uk-grid-small uk-flex-middle uk-grid" uk-grid>
                    <div class="uk-width-expand">
                        <strong style="color: #003245; font-size: 24px;">Daftar Produk</strong>
                        <ul class="uk-breadcrumb uk-margin-remove uk-padding-remove uk-visible@l">
                            <li>
                                <a href="/dashboard" class="uk-text-capitalize">Beranda</a>
                            </li>
                            <li>
                                <a class="uk-text-capitalize uk-flex-inline">
                                    <span>
                                        <p>Daftar Produk</p>
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="uk-width-auto">
                        <div class="uk-button-group rounded uk-box-shadow-small">
                            <a href="/dashboard" class="uk-button uk-button-small uk-border-rounded" as="button" uk-tooltip="title: Back;
                            pos: left;" type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-left"
                                    width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                    fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M5 12l14 0" />
                                    <path d="M5 12l6 6" />
                                    <path d="M5 12l6 -6" />
                                </svg>
                                <span class="uk-visible@m uk-text-capitalize">Kembali</span>
                            </a>
                            <a href="/dashboard/products" class="uk-button uk-button-small uk-border-rounded"
                                style="background-color: #62A9C4; color:#fff;" aria-expanded="false">
                                <i>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-settings"
                                        width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                        fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path
                                            d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
                                        <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                                    </svg>
                                </i>
                                <span class="uk-visible@m uk-text-capitalize">Atur Produk</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="uk-sticky-placeholder" hidden style="height: 32px; margin: 0px 0px 0px -15px;"></div>
            </div>
            <div class="uk-container uk-margin-top">
                <div class="uk-grid-column-small uk-grid-row-small uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-4@l uk-text-left"
                    uk-grid>
                    <div class="uk-margin-medium-bottom" v-for="(product, index) in productStore.item" :key="product.id">
                        <div class="uk-card-small uk-card-body uk-card-default uk-border-rounded uk-box-shadow-medium"
                            style="height: 200px;">
                            <div class="uk-grid-small uk-grid" uk-grid>
                                <div class="uk-width-1-2 uk-margin-small-top uk-padding-remove-left uk-margin-remove-left">
                                    <img :src="backendPath + product.image" class="uk-width-1-1" style="height: 130px; width: 100%;" />
                                </div>
                                <div class="uk-width-1-2 uk-padding-remove-left">
                                    <p class="uk-h6 uk-margin-small-top" style="font-size: 12px;">{{ product.name }}</p>
                                    <p class="" style="color: black;">
                                        <strong>Rp{{ rupiahNum(product.price) }}</strong>
                                    </p>
                                    <span v-if="product.isDisplayed" class="uk-label uk-label-success status uk-text-capitalize">Tersedia</span>
                                    <span v-else class="uk-label uk-label-danger status uk-text-capitalize">Tidak Tersedia</span>
                                    <div>
                                        <button @click="productStore.handleToggleReady(index)"
                                        style="background-color: #13556F;color: white;"
                                            class="uk-button uk-button-small uk-margin-small-top uk-text-capitalize uk-border-rounded">
                                            ubah aktif
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="uk-card-body">
                                <p class="uk-h4 uk-margin-remove-bottom" style="color: black;">
                                    <strong>Rp{{ rupiahNum(product.price) }}</strong>
                                </p>
                                <p class="uk-h5 uk-margin-remove-top">{{ product.name }}</p>
                            </div> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>