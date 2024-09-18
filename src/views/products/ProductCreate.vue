<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useProductStore } from '@/stores/product';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const authStore = useAuthStore()
const productStore = useProductStore()

const editor = ref(ClassicEditor);
const file = ref({})

const form = ref({
    name: '',
    code: '',
    stock: '',
    weight: '',
    id_category: '',
    price: '',
    description: '',

})

function handleFileUpload(event){
    file.value = event.target.files[0]        
}

function handleSubmit(form,file){
    const formdata = new FormData()
    const blob = new Blob([file], { type: file.type })

    formdata.append('name', form.value.name)
    formdata.append('code', form.value.code)
    formdata.append('stock', form.value.stock)
    formdata.append('weight', form.value.weight)
    formdata.append('id_category', form.value.id_category)
    formdata.append('price', form.value.price)
    formdata.append('description', form.value.description)
    formdata.append('image', blob, file.name)
    formdata.append('_method', 'POST')
    
    productStore.createProduct(formdata)
}

onMounted(async () => {
    productStore.clearErrors()
    await authStore.getUser()
    await authStore.getRole()
})
</script>
<template>
    <div class="list-header">
        <div class="uk-grid-small uk-flex-middle uk-grid" uk-grid>
            <div class="uk-width-expand">
                <strong style="color: #003245; font-size: 24px;">Produk</strong>
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
                                <p>Create</p>
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
                </div>
            </div>
        </div>
    </div>
    <div class="container-xl" uk-padding-small>
        <div class="uk-card uk-card-default">
            <div class="uk-card-header uk-padding-small">
            </div>
            <div class="uk-form-stacked" auto-complete="off">
                <div class="uk-card-body uk-padding-remove-top uk-margin-top">
                    <!-- <form @submit.prevent="productStore.createProduct(form)" class="uk-form-stacked"> -->
                    <div class="uk-grid-small uk-child-width-expand uk-flex-center uk-grid" uk-grid>
                        <div class="uk-width-1-3@m">
                            <label for="image" class="uk-form-label uk-text-capitalize" style="font-weight: 700;">Gambar
                                1
                            </label>
                            <div uk-form-custom="target: true" style="cursor: pointer !important" >
                                <input type="file" aria-label="Custom controls" @change="handleFileUpload($event)">
                                <input class="uk-input uk-form-width-medium uk-form-small" type="text" placeholder="Click here to select file" 
                                aria-label="Custom controls" disabled>
                            </div>
                            <div class="uk-margin">
                                <label for="image" class="uk-form-label uk-text-capitalize" style="font-weight: 700;">Gambar
                                    2
                                </label>
                                <div class="uk-form-controls uk-inline uk-width-1-1">
                                    <input v-model="form.image2" placeholder="url"  class="uk-input uk-form-small" type="text">
                                </div>
                            </div>
                            <div class="uk-margin">
                                <label for="image" class="uk-form-label uk-text-capitalize" style="font-weight: 700;">Gambar
                                    3
                                </label>
                                <div class="uk-form-controls uk-inline uk-width-1-1">
                                    <input v-model="form.image3" placeholder="url"  class="uk-input uk-form-small" type="text">
                                </div>
                            </div>
                            <div class="uk-margin">
                                <label for="name" class="uk-form-label uk-text-capitalize" style="font-weight: 700;">Gambar
                                    4
                                </label>
                                <div class="uk-form-controls uk-inline uk-width-1-1">
                                    <input v-model="form.image4" placeholder="url"  class="uk-input uk-form-small" type="text">
                                </div>
                            </div>
                        </div>
                        <div class="uk-width-2-3@m">
                            <div class="uk-grid-small uk-grid" uk-grid>
                                <div class="uk-width-1-1">
                                    <label for="name" class="uk-form-label uk-text-capitalize" style="font-weight: 700;">
                                        Nama Produk
                                        <span class="uk-text-danger">(*)</span>
                                    </label>
                                    <div class="uk-form-controls uk-inline uk-width-1-1">
                                        <input v-model="form.name" id="name" class="uk-input uk-form-small" type="text"
                                            placeholder="Masukan Nama Produk" name="name" autocomplete="name">
                                        <div v-if="productStore.error.name">
                                            <small id="error-name" class="form-text text-muted">{{
                                                productStore.error.name[0] }}</small>
                                        </div>
                                    </div>
                                    <!-- <div class="uk-form-controls uk-inline uk-width-1-1">
                                                    <p class="uk-margin-remove uk-text-capitalize">Iphone 14 Pro</p>
                                                </div> -->
                                </div>
                                <div class="uk-margin uk-width-1-1 uk-width-1-2@s  uk-grid-margin">
                                    <label for="stock" class="uk-form-label uk-text-capitalize" style="font-weight: 700;">
                                        Stok
                                    </label>
                                    <div class="uk-form-controls uk-inline uk-width-1-1">
                                        <input v-model="form.stock" class="uk-input uk-form-small" type="text" name="stock"
                                            id="stock" autocomplete="stock" placeholder="stok barang">
                                        <div v-if="productStore.error.stock">
                                            <small id="error-stock" class="form-text text-muted">{{
                                                productStore.error.stock[0] }}</small>
                                        </div>
                                    </div>
                                </div>
                                <div class="uk-margin uk-width-1-1 uk-width-1-2@s  uk-grid-margin">
                                    <label for="storage" class="uk-form-label uk-text-capitalize" style="font-weight: 700;">
                                        Penyimpanan</label>
                                    <div class="uk-form-controls uk-inline uk-width-1-1">
                                        <input v-model="form.storage" class="uk-input uk-form-small" type="text"
                                            name="storage" id="storage" autocomplete="storage"
                                            placeholder="penyimpanan barang">
                                        <div v-if="productStore.error.storage">
                                            <small id="error-storage" class="form-text text-muted">{{
                                                productStore.error.storage[0] }}</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="">
                                <label for="price" class="uk-form-label uk-text-capitalize" style="font-weight: 700;">
                                    Harga
                                </label>
                                <div class="uk-form-controls uk-inline uk-width-1-1">
                                    <input v-model="form.price" class="uk-input uk-form-small" type="text" name="price"
                                        id="price" autocomplete="price" placeholder="harga barang">
                                    <div v-if="productStore.error.price">
                                        <small id="error-price" class="form-text text-muted">{{
                                            productStore.error.price[0] }}</small>
                                    </div>
                                </div>
                            </div>
                            <div class="uk-margin">
                                <label for="description" class="uk-form-label uk-text-capitalize" style="font-weight: 700;">
                                    Deskripsi
                                </label>
                                <div class="uk-form-controls uk-inline uk-width-1-1">
                                    <ckeditor v-model="form.description" :editor="editor"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- </form> -->
                </div>
                <div class="uk-card-footer uk-padding-small" style="margin-bottom: 64px">
                    <button @click.prevent="handleSubmit(form,file)" type="submit"
                        class="uk-button uk-button-small uk-border-rounded uk-button-primary uk-float-right uk-flex uk-flex-middle"
                        style="background-color: #62A9C4;">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-device-floppy"
                            width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                            stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" />
                            <path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                            <path d="M14 4l0 4l-6 0l0 -4" />
                        </svg>
                        Simpan
                    </button>
                </div>
            </div>
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

.border {
    border: 1px solid #ddd;
    border-radius: 10px;
}
</style>
