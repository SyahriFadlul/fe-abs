<script setup>
import { useAddressStore } from '../../stores/address'
import { onMounted } from 'vue';
import { useAuthStore } from '../../stores/auth';
import { useOrderStore } from '../../stores/order';
import UIkit from 'uikit';
import EditAlamat from '../profiles/EditAlamat.vue';

const addressStore = useAddressStore()
const authStore = useAuthStore()
const orderStore = useOrderStore()

const showAlamatModal = function (id) {
    UIkit.modal("#modal-alamat").show();
}

onMounted(async () => {
    await addressStore.getAddresses()
    
})
</script>
<template>
    <div id="modal-alamat-checkout" uk-modal>
        <div class="uk-modal-dialog uk-border-rounded">
            <button class="uk-modal-close-default" type="button" aria-label="Close" uk-close></button>
            <h2 class="uk-modal-title uk-modal-header uk-flex uk-flex-center uk-text-large uk-text-bold" style="border-top-left-radius: 5px;">
                Daftar Alamat</h2>
                <div class="uk-modal-body ">
                <!-- <hr style> -->
                <div class="uk-margin uk-width-1-1">
                    <form class="uk-search uk-search-default" style="width: 600px">
                        <a href="" class="uk-search-icon-flip" uk-search-icon></a>
                        <input class="uk-search-input uk-border-rounded" type="text" placeholder="Cari alamat"
                            aria-label="Search" />
                    </form>
                    <button class="uk-button uk-button-default uk-width-1-1 uk-margin-small-top uk-border-rounded"
                        style="border-color: #003245; color: #003245; " @click="showAlamatModal">Tambah Alamat</button>
                        <EditAlamat />
                    <!-- Alamat yang dipilih     -->
                    <div class="uk-card uk-card-body uk-card-default uk-padding-small uk-width-1-1 uk-border-rounded uk-margin-small-top "
                        style="border: 1px solid; border-color: #003245"
                        v-for="(address,index) in addressStore.fullAddress" :key="address.id">
                        <div class="uk-margin-small-left uk-margin-remove-bottom">
                            <div class="uk-grid uk-grid-small uk-flex-middle" uk-grid>
                                <div class="uk-width-expand">
                                    <div class="uk-margin-small-bottom">
                                        <span style="font-weight: 700;">{{ address.address_label }} </span> <br>
                                        <span>{{ address.name }} ({{ address.phone_number }})</span> <br>
                                        <p class="uk-width-1-1 uk-margin-remove" style="font-weight: 400; color: black;">
                                            {{ address.streetbuilding }}</p>
                                        <p class="uk-width-1-1 uk-margin-remove" style="font-weight: 400; color: black;">  
                                            {{ address.city.type }} {{ address.city.name }} - {{ address.province.name }}</p>
                                        <p class="uk-width-1-1 uk-margin-remove" style="font-weight: 400; color: black;">  
                                            {{ address.postal_code }}</p>
                                        <p class="uk-width-1-1 uk-margin-remove" style="font-weight: 400; color: black;">  
                                            {{ address.detail ? `(${address.detail})` : ''  }}</p>
                                    </div>
                                    <!-- svg loct -->
                                    <!-- <div class="uk-inline uk-margin-small-bottom">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-map-pin"
                                            width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#003245"
                                            fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="#" />
                                            <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                                            <path
                                                d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
                                        </svg>
                                    </div>
                                    <div class="uk-inline uk-margin-small-bottom">
                                        <div class="uk-margin-small-left">
                                            <span style="font-size: 12px;">Sudah Pinpoint</span> <br>
                                        </div>
                                    </div> -->
                                    <!-- end of svg loct -->
                                </div>
                                <div class="uk-width-auto">
                                    <div v-if="address.id === addressStore.selectAddress.id">
                                        <i class="uk-margin-small-right uk-margin-medium-left">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-check"
                                                width="32" height="32" viewBox="0 0 24 24" stroke-width="2" stroke="#003245"
                                                fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M5 12l5 5l10 -10" />
                                            </svg>
                                        </i>                                
                                    </div>
                                    <div v-else>
                                        <button class="uk-button uk-button-default uk-border-rounded"
                                        style="background-color: #003245; color: white;"
                                        @click="addressStore.getSelectedAddress(index)">Pilih</button>
                                    </div>                            
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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