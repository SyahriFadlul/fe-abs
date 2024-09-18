<script setup>
import { nextTick, onMounted, ref } from 'vue';
import { useProductStore } from '@/stores/product';
import { useAuthStore } from '@/stores/auth';
import { RouterLink, useRouter } from 'vue-router';

const route = useRouter()
const productStore = useProductStore()
const authStore = useAuthStore()
const props = defineProps({
    id: {
        type: String,
        required: true
    }
})
const file = ref({})
const formdata = new FormData()

function handleSubmit(file){
    const blob = new Blob([file], { type: file.type })

    // formdata.append('name', form.value.name)
    // formdata.append('price', form.value.price)
    // formdata.append('description', form.value.description)
    
    productStore.updateProduct(formdata)
}


function handleFileUpload(event){
    file.value = event.target.files[0]
    formdata.append('image', blob, file.value.name)
    formdata.append('_method', 'PUT')
    // console.log(event.target.files);
}    

onMounted(async () => {    
    await productStore.getProduct(props.id)    
    await authStore.getUser()
    await authStore.getRole()
    // console.log(productStore.item);
})
</script>
<template>
    <div class="uk-card uk-card-default uk-card-body uk-border-rounded">                
            <p class="title">Edit Barang</p>
            <form @submit.prevent="productStore.updateProduct($route.params.id,formdata)" class="uk-form uk-form-stacked uk-margin-medium-top">
                <div class="uk-margin">
                    <label for="name" class="uk-form-label">Nama</label>
                    <input type="text" class="ukform-controls uk-input" name="name" v-model="productStore.item.name" placeholder="nama barang">
                    <div v-if="productStore.error.name">
                        <small id="error-name" class="form-text text-muted">{{ productStore.error.name[0] }}</small>
                    </div>
                </div>
                <div class="uk-margin">
                    <label for="price" class="uk-form-label">Harga</label>
                    <input type="text" class="uk-form-controls uk-input" name="price" v-model="productStore.item.price" placeholder="harga">
                    <div v-if="productStore.error.price">
                        <small id="error-price" class="form-text text-muted">{{ productStore.error.price[0] }}</small>
                    </div>
                </div>
                <div class="uk-margin">
                    <label for="stock" class="uk-form-label">Stock</label>
                    <input type="text" class="uk-form-controls uk-input" name="stock" v-model="productStore.item.stock" placeholder="stock">
                    <div v-if="productStore.error.stock">
                        <small id="error-stock" class="form-text text-muted">{{ productStore.error.stock[0] }}</small>
                    </div>
                </div>
                <div class="uk-margin">
                    <label for="storage" class="uk-form-label">Penyimpanan</label>
                    <input type="text" class="uk-form-controls uk-input" name="storage" v-model="productStore.item.storage" placeholder="Penyimpanan">
                    <div v-if="productStore.error.storage">
                        <small id="error-storage" class="form-text text-muted">{{ productStore.error.storage[0] }}</small>
                    </div>
                </div>
                <div class="uk-margin">
                    <label for="image" class="uk-form-label">Gambar</label>
                    <div uk-form-custom="target: true">
                        <input type="file" aria-label="Custom controls" @change="handleFileUpload($event)">
                        <input class="uk-input uk-form-width-large" type="text" placeholder="Click here to select file" aria-label="Custom controls" disabled>                        
                    </div>
                </div>
                <div class="uk-margin">
                    <label for="image" class="uk-form-label">Gambar 2 (url)</label>
                    <input v-model="productStore.item.image2"  type="url" class="uk-form-controls uk-input" placeholder="image url">
                </div>
                <div class="uk-margin">
                    <label for="image" class="uk-form-label">Gambar 3 (url)</label>
                    <input v-model="productStore.item.image3"  type="text" class="uk-form-controls uk-input" placeholder="image url">
                </div>
                <div class="uk-margin">
                    <label for="image" class="uk-form-label">Gambar 4 (url)</label>
                    <input v-model="productStore.item.image4"  type="text" class="uk-form-controls uk-input" placeholder="image url">
                </div>
                <div class="uk-margin">
                    <label for="description" class="uk-form-label">Description</label>
                    <textarea class="uk-form-controls uk-textarea" name="description" rows="5"
                        v-model="productStore.item.description" placeholder="description"></textarea>
                </div>
                <div class="uk-flex uk-flex-right">
                    <button type="submit" class="uk-button uk-button-primary">Save</button>
                    <router-link :to="{ name: 'admin.productIndex' }">
                        <button type="button" class="uk-button uk-button-secondary ms-2">Cancel</button>
                    </router-link>                    
                </div>
            </form>
    </div>
</template>

<style scoped>

.title {
    font-size: 24px;
    font-weight: 500;
}

.uk-form-label {
    font-weight: 400;
}

</style>