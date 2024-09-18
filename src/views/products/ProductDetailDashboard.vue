<script setup>
import { onMounted, ref } from 'vue';
import { useProductStore } from '../../stores/product';
import { useRouter } from 'vue-router';
import UIkit from 'uikit';
import router from '../../router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const route = useRouter()
const productStore = useProductStore()

const deleteProductId = ref(false)
const isEditing = ref(false);
const backendPath = import.meta.env.VITE_API_BASE_URL
const file = ref({})
let url = ref(backendPath +'/storage/'+ productStore.product.image)  //select image preview

const editor = ref(ClassicEditor);

function handleFileUpload(event){
    file.value = event.target.files[0]
    if(file.value){
        url.value = URL.createObjectURL(event.target.files[0])
    }
}

const rupiahNum = function (num) {
    let price = String(num)
    price = price.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    return price + ',00';
}

const props = defineProps({
    id: {
        type: String,
        required: true
    }
})

const toggleEditing = () => {
    file.value = productStore.product.image
    isEditing.value = !isEditing.value;
};

const modalDeleteProduct = (id) => {
    deleteProductId.value = id;
    UIkit.modal("#modal-delete").show();
}

const modalShowGallery = () => {
    UIkit.modal("#modal-show-gallery").show();
}

const destroyProduct = () => {
    if (deleteProductId.value !== false) {
        productStore.destroyProduct(deleteProductId.value);
        deleteProductId.value = false
        UIkit.modal("#modal-delete").hide();
    }
    router.push('/dashboard/products');
}


onMounted(async () => {
    productStore.loadPage(false)
    await productStore.getProduct(props.id)
    if (productStore.errorResponse === 404) {
        route.push('/notfound')
    }
    url.value = backendPath +'/storage/'+ productStore.product.image
    productStore.loadPage(true)    
})

</script>

<template>
    <div v-if="productStore.ready">
        <div class="list-header">
            <div class="uk-grid-small uk-flex-middle uk-grid" uk-grid>
                <div class="uk-width-expand">
                    <strong style="color: #0CC701; font-size: 24px;">Produk</strong>
                    <ul class="uk-breadcrumb uk-margin-remove uk-padding-remove uk-visible@l">
                        <li>
                            <a href="/dashboard" class="uk-text-capitalize">Beranda</a>
                        </li>
                        <li>
                            <a href="/dashboard/products" class="uk-text-capitalize">Produk</a>
                        </li>
                        <li>
                            <a class="uk-text-capitalize uk-flex-inline">
                                <span>
                                    <p>{{ productStore.product.name }}</p>
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="uk-width-auto">
                    <div class="uk-button-group rounded uk-box-shadow-small">
                        <a href="/dashboard/products" class="uk-button uk-button-small uk-border-rounded" as="button"
                            uk-tooltip="title: Back;
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
                        <a href="/dashboard/products/create" class="uk-button uk-button-small uk-border-rounded"
                            style="background-color: #0CC701; color:#fff;" aria-expanded="false">
                            <i>
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="24"
                                    height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M12 5l0 14" />
                                    <path d="M5 12l14 0" />
                                </svg>
                            </i>
                            <span class="uk-visible@m uk-text-capitalize">Tambah</span>
                        </a>
                    </div>
                </div>
            </div>
            <div class="uk-sticky-placeholder" hidden style="height: 32px; margin: 0px 0px 0px -15px;"></div>
        </div>
        <div class="container-xl" uk-padding-small>
            <div class="uk-card uk-card-default">
                <div class="uk-card-header uk-padding-small">
                    <div class="uk-grid-small uk-flex-middle uk-grid" uk-grid>
                        <div class="uk-width-expand">
                            <h3 class="uk-card-title uk-text-truncate">
                                <p>{{ productStore.product.name }}</p>
                            </h3>
                        </div>
                        <div v-if="!isEditing" class="uk-width-auto uk-grid-small uk-grid uk-grid-stack" uk-grid>
                            <button @click="toggleEditing"
                                class="uk-button uk-button-small uk-border-rounded uk-button-primary uk-flex uk-flex-middle"
                                style="background-color: #0CC701;">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24"
                                    height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                                    <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                                    <path d="M16 5l3 3" />
                                </svg>
                                <span class="uk-visible@m uk-text-capitalize">Edit</span>
                            </button>
                        </div>
                        <div v-if="isEditing" class="uk-width-auto uk-grid-small uk-grid uk-grid-stack" uk-grid>
                            <button @click="toggleEditing"
                                class="uk-button uk-button-small uk-border-rounded uk-button-primary uk-flex uk-flex-middle"
                                style="background-color: #0CC701;">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-refresh"
                                    width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                    fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
                                    <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
                                </svg>
                                <span class="uk-visible@m uk-text-capitalize">Atur Ulang</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="uk-form-stacked" auto-complete="off">
                    <div class="uk-card-body uk-padding-remove-top uk-margin-top">
                        <div class="uk-grid-small uk-child-width-expand uk-flex-center uk-grid" uk-grid>
                            <div class="">
                                <div class="uk-grid-small uk-grid" uk-grid>
                                    <div class="uk-width-1-1 uk-margin-medium-bottom">
                                            <!--start of photo-->
                                        <template v-if="!isEditing">                                                
                                            <!-- <img :src="backendPath + productStore.product.image" class="responsive-image" id="img" alt="">                                                                                         -->
                                            <div class="uk-flex uk-flex-center uk-width-1-1 uk-inline">
                                                <img :src="backendPath +'/storage/'+ productStore.product.image" alt="" width="500">
                                            </div>                                        
                                        </template>
                                        <div v-if="isEditing" class="uk-flex uk-flex-center">
                                            <div class="">
                                                <!-- <img :src="url" class="responsive-image" id="img" alt="">                                                                                         -->
                                                <div class="uk-flex uk-flex-center uk-width-1-1 uk-inline">
                                                    <img :src="url" alt="" width="500">
                                                </div> 
                                                <div class="uk-flex uk-flex-center">
                                                    <div uk-form-custom>
                                                        <input type="file" aria-label="Custom controls" @change="handleFileUpload($event)">
                                                        <button class="uk-button uk-button-default uk-margin-small-top" type="button" tabindex="-1">
                                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                                class="icon icon-tabler icon-tabler-cloud-upload" width="24"
                                                                height="24" viewBox="0 0 24 24" stroke-width="2"
                                                                stroke="currentColor" fill="none" stroke-linecap="round"
                                                                stroke-linejoin="round">
                                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                                <path
                                                                    d="M7 18a4.6 4.4 0 0 1 0 -9a5 4.5 0 0 1 11 2h1a3.5 3.5 0 0 1 0 7h-1" />
                                                                <path d="M9 15l3 -3l3 3" />
                                                                <path d="M12 12l0 9" />
                                                            </svg>                                                    
                                                            <span class="uk-margin-small-left uk-text-center">
                                                                Upload Foto</span>
                                                        </button>
                                                    </div>
                                                    <div v-if="productStore.error.image">
                                                        <small id="error-image" class="uk-text-danger uk-text-small">{{
                                                            productStore.error.image[0] }}</small>
                                                    </div>
                                                </div>
                                            </div>                                            
                                        </div>                                                   <!-- end of photo-->
                                    </div>
                                </div>
                            </div>
                            <div class="uk-width-1-2@m uk-width-2-3@l">
                                <div class="uk-grid-small uk-grid" uk-grid>
                                    <div class="uk-width-1-1 uk-width-3-4@s">
                                        <div class="uk-form-label uk-text-capitalize" style="font-weight: 700;">Nama
                                            Produk</div>
                                        <div class="uk-form-controls uk-inline uk-width-1-1">
                                            <p v-if="!isEditing" class="uk-margin-remove uk-text-capitalize">{{
                                                productStore.product.name }}</p>
                                            <input v-if="isEditing" v-model="productStore.product.name"
                                                class="uk-input uk-width-1-1">
                                        </div>
                                        <div v-if="productStore.error.name">
                                            <small id="error-name" class="uk-text-danger uk-text-small">{{
                                                productStore.error.name[0] }}</small>
                                        </div>
                                    </div>
                                    <div
                                        class="uk-margin uk-width-1-1 uk-width-3-4@s uk-padding-small uk-padding-remove-bottom uk-grid-margin">
                                        <div class="uk-form-label uk-text-capitalize" style="font-weight: 700;">
                                            Kode
                                        </div>
                                        <div class="uk-form-controls uk-inline uk-width-1-1">
                                            <div class="quill-container">
                                                <p v-if="!isEditing">{{ productStore.product.code }}</p>
                                                <input v-if="isEditing" v-model="productStore.product.code"
                                                    class="uk-input uk-width-1-1">
                                            </div>
                                        </div>
                                        <div v-if="productStore.error.code">
                                            <small id="error-code" class="uk-text-danger uk-text-small">{{
                                                productStore.error.code[0] }}</small>
                                        </div>
                                    </div>
                                    <div
                                        class="uk-margin uk-width-1-1 uk-width-1-4@s uk-padding-small uk-padding-remove-bottom uk-grid-margin">
                                        <div class="uk-form-label uk-text-capitalize" style="font-weight: 700;">
                                            Stok</div>
                                        <div class="uk-form-controls uk-inline uk-width-1-1">
                                            <p v-if="!isEditing" class="uk-margin-remove">{{
                                                productStore.product.stock
                                            }}</p>
                                            <input v-if="isEditing" v-model="productStore.product.stock"
                                                class="uk-input uk-width-1-1">
                                        </div>
                                        <div v-if="productStore.error.stock">
                                            <small id="error-stock" class="uk-text-danger uk-text-small">{{
                                                productStore.error.stock[0] }}</small>
                                        </div>
                                    </div>
                                    <div class="uk-margin uk-width-1-1 uk-width-3-4@s">
                                        <div class="uk-form-label uk-text-capitalize" style="font-weight: 700;">Harga
                                        </div>
                                        <div class="uk-form-controls uk-inline uk-width-1-1">
                                            <div class="quill-container">
                                                <p v-if="!isEditing" class="uk-margin-remove uk-text-capitalize">Rp. {{
                                                    rupiahNum(productStore.product.price) }}</p>
                                                <input v-if="isEditing" v-model="productStore.product.price"
                                                    class="uk-input uk-width-1-1">
                                            </div>
                                        </div>
                                        <div v-if="productStore.error.price">
                                            <small id="error-price" class="uk-text-danger uk-text-small">{{
                                                productStore.error.price[0] }}</small>
                                        </div>
                                    </div>
                                    <div class="uk-margin-medium uk-width-1-1 uk-width-4-5@s">
                                        <div class="uk-form-label uk-text-capitalize" style="font-weight: 700;">
                                            Deskripsi
                                        </div>
                                        <div class="uk-form-controls uk-inline uk-width-1-1">
                                            <div class="quill-container">
                                                <p v-if="!isEditing" v-html="productStore.product.description"
                                                    class="uk-margin-remove uk-text-capitalize">
                                                </p>
                                                <div v-if="isEditing">
                                                    <ckeditor v-model="productStore.product.description" :editor="editor" />
                                                </div>
                                            </div>
                                        </div>
                                        <div v-if="productStore.error.description">
                                            <small id="error-description" class="uk-text-danger uk-text-small">{{
                                                productStore.error.description[0] }}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="isEditing" class="uk-card-footer uk-padding-small" style="margin-bottom: 64px">
                        <button @click.prevent="productStore.updateProduct($route.params.id,file)" type="submit"
                            class="uk-button uk-button-small uk-border-rounded uk-button-primary uk-float-right uk-flex uk-flex-middle"
                            style="background-color: #0CC701;">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-device-floppy"
                                width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" />
                                <path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                                <path d="M14 4l0 4l-6 0l0 -4" />
                            </svg>
                            Simpan
                        </button>
                        <button @click="modalDeleteProduct($route.params.id)" type="submit"
                            class="uk-button uk-button-small uk-border-rounded uk-button-primary uk-float-left uk-flex uk-flex-middle"
                            style="background-color: #0CC701;">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24"
                                height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M4 7l16 0" />
                                <path d="M10 11l0 6" />
                                <path d="M14 11l0 6" />
                                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                            </svg>
                            Hapus
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Start Skeleton -->
    <div v-else>
        <div class="uk-grid-small uk-flex-middle uk-grid" uk-grid>
            <div class="uk-width-expand">
                <p id="name-sk" />
                <p id="nav-sk" style="margin-bottom: 12px;" />
            </div>
            <div class="uk-width-auto">
                <div class="uk-button-group rounded uk-box-shadow-small">
                    <a href="/dashboard/products" class="uk-button uk-button-small uk-border-rounded" as="button"
                        uk-tooltip="title: Back;
                            pos: left;" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-left" width="24"
                            height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                            stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 12l14 0" />
                            <path d="M5 12l6 6" />
                            <path d="M5 12l6 -6" />
                        </svg>
                        <span class="uk-visible@m uk-text-capitalize">Kembali</span>
                    </a>
                    <a href="/dashboard/products/create" class="uk-button uk-button-small uk-border-rounded"
                        style="background-color: #0CC701; color:#fff;" aria-expanded="false">
                        <i>
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="24"
                                height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 5l0 14" />
                                <path d="M5 12l14 0" />
                            </svg>
                        </i>
                        <span class="uk-visible@m uk-text-capitalize">Tambah</span>
                    </a>
                </div>
            </div>
        </div>
        <div class="uk-card-small uk-card-default uk-card-body">
            <div class="uk-card-header uk-padding-small">
                <div class="uk-grid-small uk-flex-middle uk-grid" uk-grid>
                    <div class="uk-width-expand">
                        <h3 class="uk-card-title uk-text-truncate">
                            <p id="name-sk" />
                        </h3>
                    </div>
                    <div v-if="!isEditing" class="uk-width-auto uk-grid-small uk-grid uk-grid-stack" uk-grid>
                        <button @click="toggleEditing"
                            class="uk-button uk-button-small uk-border-rounded uk-button-primary uk-flex uk-flex-middle"
                            style="background-color: #0CC701;">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24"
                                height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                                <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                                <path d="M16 5l3 3" />
                            </svg>
                            <span class="uk-visible@m uk-text-capitalize">Edit</span>
                        </button>
                    </div>
                    <div v-if="isEditing" class="uk-width-auto uk-grid-small uk-grid uk-grid-stack" uk-grid>
                        <button @click="toggleEditing"
                            class="uk-button uk-button-small uk-border-rounded uk-button-primary uk-flex uk-flex-middle"
                            style="background-color: #0CC701;">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-refresh" width="24"
                                height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
                                <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
                            </svg>
                            <span class="uk-visible@m uk-text-capitalize">Atur Ulang</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="uk-grid-small uk-child-width-expand uk-flex-center uk-grid" uk-grid>
                <div class="">
                    <div class="uk-grid-small uk-grid" uk-grid>
                        <p id="mm-sk" class="uk-margin-small-top uk-margin-medium-left" />
                    </div>
                </div>
                <div class="uk-width-1-2@m uk-width-2-3@l">
                    <div class="uk-grid-small uk-grid" uk-grid>
                        <div class="uk-width-1-1 uk-width-3-4@s uk-margin-small-top">
                            <p id="name-sk" />
                            <p id="nav-sk" />
                        </div>
                        <div
                            class="uk-margin uk-width-1-1 uk-width-3-4@s uk-padding-small uk-padding-remove-bottom uk-grid-margin">
                            <p id="name-sk" />
                            <p id="nav-sk" />
                        </div>
                        <div
                            class="uk-margin uk-width-1-1 uk-width-1-4@s uk-padding-small uk-padding-remove-bottom uk-grid-margin">
                            <p id="name-sk" />
                            <p id="nav-sk" />
                        </div>
                        <div class="uk-margin uk-width-1-1 uk-width-3-4@s">
                            <p id="name-sk" />
                            <p id="nav-sk" />
                        </div>
                        <div class="uk-margin-medium uk-width-1-1 uk-width-4-5@s">
                            <p id="description-sk" />
                            <p id="description-sk" />
                            <p id="description-sk-small" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- end skeleton -->
    <div id="modal-delete" uk-modal>
        <div class="uk-modal-dialog uk-modal-body uk-border-rounded">
            <h2 class="uk-modal-title uk-flex uk-flex-center uk-text-bold uk-text-large uk-margin-medium-bottom mt-1">
                Apakah kamu yakin mau delete?</h2>
            <div class="uk-flex uk-flex-center">
                <button class="uk-button uk-button-danger" @click="destroyProduct">Ya</button>
                <button class="uk-button uk-button-default uk-margin-large-left uk-modal-close">Tidak</button>
            </div>
        </div>
    </div>
    <div id="modal-show-gallery" uk-modal>
        <div class="uk-modal-dialog uk-modal-body">
            <button class="uk-modal-close-default" type="button" aria-label="Close" uk-close></button>
            <form class="uk-form uk-margin-left uk-margin-right"
                @submit.prevent="productStore.saveImage(productStore.product.image, productStore.product.image2, productStore.product.image3, productStore.product.image4)">
                <label for="image" class="uk-form-label uk-text-capitalize" style="font-weight: 700;">Images 1
                </label>
                <div class="uk-form-controls uk-inline uk-width-1-1">
                    <input v-model="productStore.product.image" class="uk-input" type="text">
                </div>
                <div class="uk-margin">
                    <label for="image" class="uk-form-label uk-text-capitalize" style="font-weight: 700;">Images 2
                    </label>
                    <div class="uk-form-controls uk-inline uk-width-1-1">
                        <input v-model="productStore.product.image2" class="uk-input" type="text">
                    </div>
                </div>
                <div class="uk-margin">
                    <label for="image" class="uk-form-label uk-text-capitalize" style="font-weight: 700;">Images 3
                    </label>
                    <div class="uk-form-controls uk-inline uk-width-1-1">
                        <input v-model="productStore.product.image3" class="uk-input" type="text">
                    </div>
                </div>
                <div class="uk-margin">
                    <label for="name" class="uk-form-label uk-text-capitalize" style="font-weight: 700;">Images 4
                    </label>
                    <div class="uk-form-controls uk-inline uk-width-1-1">
                        <input v-model="productStore.product.image4" class="uk-input" type="text">
                    </div>
                </div>
                <button type="submit"
                    class="uk-button uk-button-small uk-border-rounded uk-button-primary uk-float-right uk-flex uk-flex-middle"
                    style="background-color: #0CC701;">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-device-floppy" width="24"
                        height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                        stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" />
                        <path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                        <path d="M14 4l0 4l-6 0l0 -4" />
                    </svg>
                    Simpan
                </button>
            </form>
        </div>
    </div>
</template>

<style scoped>
.list-header {
    padding: 12px 10px 5px 12px;
}

.rounded {
    border-radius: 1px !important;
}

.uk-card {
    position: relative;
    box-shadow: 0 14px 25px #00000029;
    border-radius: 10px;
}

.cursor-pointer {
    cursor: pointer;
}

#nav-sk {
    width: 30%;
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

#description-sk {
    width: 100%;
    height: 12px;
    border-radius: 20px 20px;
    animation: pulse-bg 1s infinite;
}

#description-sk-small {
    width: 70%;
    height: 12px;
    border-radius: 20px 20px;
    animation: pulse-bg 1s infinite;
}

#name-sk {
    width: 10%;
    height: 16px;
    border-radius: 20px 20px;
    animation: pulse-bg 1s infinite;
}

.responsive-image {
    max-width: 100%;
    height: 390px;
}

@media screen and (max-width: 1024px) {
    .responsive-image {
        max-width: 100%;
    }
}

@media screen and (max-width: 768px) {
    .responsive-image {
        max-width: 100%;
    }
}
</style>