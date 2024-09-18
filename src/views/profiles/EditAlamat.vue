<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useAddressStore } from '@/stores/address';
import { regions } from '../composables/RegionsID';
import { useRegionStore } from '../../stores/region';
import { useProvinceStore } from '../../stores/province';
import { useCityStore } from '../../stores/city';

const authStore = useAuthStore()
const addressStore = useAddressStore()
const cityStore = useCityStore()
const provinceStore = useProvinceStore()
const regionStore = useRegionStore()

const form = ref({
    name: '',
    phone_number: '',
    address_label:'',
    province:'',
    city: '',
    address: '',
    postal_code:'',
    detail: '',
})
//  user_id.value = authStore.user.id;
// let selectedProvince = ref('')
// let selectedCity = ref('')
let cities = ref([])

const populateCities = (id) => {
    console.log(id);
    
    cityStore.getCitiesbyProvince(id)  
};

onMounted(async () => {
    addressStore.clearErrors()
    await authStore.getUser()
    await provinceStore.getProvinces()
//     await cityStore.getCities()
})

</script>

<template>
        <div id="modal-alamat" uk-modal>
            <div class="uk-modal-dialog uk-border-rounded">
                <button class="uk-modal-close-default" type="button" aria-label="Close" uk-close></button>
                <h2 class="uk-modal-title uk-modal-header uk-flex uk-flex-center uk-margin-remove-bottom" style="border-top-left-radius: 5px;">
                    Alamat Baru</h2>
                <div class="uk-modal-body">
                    <form @submit.prevent="addressStore.createAddress(form, authStore.user.id)" class="uk-form-stacked">
                        <div class="uk-inline uk-width-1-1">
                            <label for="" class="uk-form-label"><strong>Label Alamat</strong></label>
                            <input type="text" class="uk-form-controls uk-input" name="addresslabel" id="addresslabel" v-model="form.address_label"
                            autocomplete="addresslabel" placeholder="Label Alamat Cth: (Rumah, Kantor, Kost, Apartment)">
                            <div v-if="addressStore.error.addresslabel">
                                <small id="error-addresslabel" class="form-text text-muted">{{ addressStore.error.address_label[0] }}</small>
                            </div>
                        </div>
                        <div class="uk-inline uk-width-1-1 uk-margin-small-top">
                            <label for="" class="uk-form-label"><strong>Nama Penerima</strong></label>
                            <input type="text" class="uk-form-controls uk-input" name="name" id="name" v-model="form.name"
                            autocomplete="name" placeholder="Nama Penerima">
                            <div v-if="addressStore.error.name">
                                <small id="error-name" class="form-text text-muted">{{ addressStore.error.name[0] }}</small>
                            </div>
                        </div>
                        <div class="uk-inline uk-width-1-1 uk-margin-small-top">
                        <label for="" class="uk-form-label"><strong>Nomor HP</strong></label>
                            <input type="text" class="uk-form-controls uk-input" name="phonenumber" id="phonenumber" v-model="form.phone_number"
                            autocomplete="phonenumber" placeholder="Nomor Telepon">
                            <div v-if="addressStore.error.phone_number">
                                <small id="error-phonenumber" class="form-text text-muted">{{ addressStore.error.phone_number[0] }}</small>
                            </div>
                        </div>                        
                        <div class="uk-inline uk-width-1-1 uk-margin-small-top">
                            <label for="" class="uk-form-label"><strong>Provinsi</strong></label>
                            <select class="uk-select" v-model="form.province" @change="populateCities($event.target.value)">
                                <option value="">Pilih Provinsi</option>
                                <option v-for="province in provinceStore.items" :key="province.id" :value="province.id" 
                                >{{ province.name }}</option>
                            </select>
                            <div v-if="addressStore.error.province">
                                <small id="error-province" class="form-text text-muted">{{ addressStore.error.province[0] }}</small>
                            </div>
                            <label for="" class="uk-form-label uk-margin-small-top"><strong>Kota/Kabupaten</strong></label>
                            <select class="uk-select" v-model="form.city">
                                <option value="">Pilih Kota/Kabupaten</option>
                                <option v-for="city in cityStore.provinceCities" :key="city.id" :value="city.id">{{ city.name }}</option>
                            </select>
                            <div v-if="addressStore.error.city">
                                <small id="error-city" class="form-text text-muted">{{ addressStore.error.city[0] }}</small>
                            </div>
                        </div>
                        <div class="uk-inline uk-width-1-1 uk-margin-small-top">
                            <label for="" class="uk-form-label"><strong>Alamat Lengkap</strong></label>
                            <input type="text" class="uk-form-controls uk-input" name="streedbuilding" id="streetbuilding" v-model="form.address"
                            autocomplete="address" placeholder="Nama Jalan, Gedung, No. Rumah">
                            <div v-if="addressStore.error.address">
                                <small id="error-address" class="form-text text-muted">{{ addressStore.error.address[0] }}</small>
                            </div>
                        </div>
                        <div class="uk-inline uk-width-1-1 uk-margin-small-top">
                            <label for="" class="uk-form-label"><strong>Kode Pos</strong></label>
                            <input type="text" class="uk-form-controls uk-input" name="streedbuilding" id="streetbuilding" v-model="form.postal_code"
                            autocomplete="streetbuilding" placeholder="Kode pos">
                            <div v-if="addressStore.error.postal_code">
                                <small id="error-streetbuilding" class="form-text text-muted">{{ addressStore.error.postal_code[0] }}</small>
                            </div>
                        </div>
                        <div class="uk-inline uk-width-1-1 uk-margin-small-top">
                            <label for="" class="uk-form-label"><strong>Detail</strong></label>
                            <input type="text" class="uk-form-controls uk-input" name="detail" id="detail" v-model="form.detail"
                            autocomplete="detail" placeholder="Detail Lainnya(Cth: Blok/Unit No. Patokan)">
                            <div v-if="addressStore.error.detail">
                                <small id="error-detail" class="form-text text-muted">{{ addressStore.error.detail[0] }}</small>
                            </div>
                        </div>
                        <div class="uk-margin-medium-top">
                            <button class="uk-button uk-border-rounded" type="submit" style="background-color: white; border: 1px solid; color: #0CC701; font-weight: 500;">
                                Simpan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
</template>

<style scoped>
.uk-modal-dialog {
    overflow-y:  initial;
}

.uk-modal-body {
    overflow-y: auto;
    height: 75vh;

}

</style>