<script setup>
import { nextTick, onMounted, ref } from 'vue';
import { useProductStore } from '@/stores/product';
import { useAuthStore } from '@/stores/auth';
import { RouterLink, useRouter } from 'vue-router';
import UIkit from 'uikit';
import { useAddressStore } from '../../stores/address';
import EditAlamat from './EditAlamat.vue';
import { tools } from '../composables/Tools';

const route = useRouter()
const authStore = useAuthStore()
const addressStore = useAddressStore()

const showAlamatModal = function (id) {
    UIkit.modal("#modal-alamat").show();
}
onMounted(async () => {
    tools.pageIsReady(false)
    await addressStore.getAddresses()    
    tools.pageIsReady(true)
    console.log(addressStore.fullAddress);
    
})
</script>
<template>
    <div>
        <template v-if="tools.pageIsReady()">                
            <div class="uk-padding-small uk-flex uk-flex-between " style="border-bottom: 2px solid #f8f8f8;">
                <div>
                    <p class="uk-card-title h2">Alamat Saya</p>
                </div>
                <div>
                    <button class="uk-button-small uk-button@s uk-border-rounded"
                        style="background-color: white; border: 1px solid; color: #0CC701; font-weight: 500;" type="button"
                        @click="showAlamatModal"><span uk-icon="icon: plus"></span> Tambah Baru</button>
                    <EditAlamat />
                </div>
    
            </div>
            <div class="uk-padding-small">
                <!-- main address -->
                <div class="uk-card uk-card-body uk-card-default uk-padding-small uk-width-1-1 uk-border-rounded uk-margin-small-top"
                    v-for="(address, index) in addressStore.fullAddress" :key="address.id"
                    style="border: 1px solid; border-color: #0CC701;background-color: #f5fff2;" v-show="address.is_main_address">
                    <div class="uk-margin-small-left uk-margin-remove-bottom">
                        <div class="uk-grid uk-grid-small uk-flex-middle" uk-grid>
                            <div class="uk-width-expand">
                                <div class="uk-inline uk-margin-small-bottom">
                                    <div style="font-weight: 700;"> {{  address.address_label }} </div>
                                    <div>{{ address.name }}</div>
                                    <div>{{ address.phone_number }}</div>
                                    <div style="font-weight: 400; color: black;">{{ address.address }},
                                        {{ address.city.type }} {{ address.city.name }}, {{ address.province.name }} <br>
                                        {{ address.detail ? `(${address.detail})` :  ''}}</div>
                                </div>
                                <!-- <div class="uk-margin-small-bottom">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-map-pin"
                                        width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#0CC701" fill="none"
                                        stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="#" />
                                        <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                                        <path
                                            d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
                                    </svg>
                                    <div class="uk-margin-small-left uk-inline">
                                        <span style="font-size: 12px;">Sudah Pinpoint</span> <br>
                                    </div>
                                </div> -->
                                <div class="uk-grid uk-grid-small" uk-grid >
                                    <!-- <div class="uk-width-auto"  >
                                        <router-link to="#" class="uk-kamu uk-text-decoration-none" style="color:#0CC701;">Share</router-link>
                                    </div> -->
                                    <div class="uk-width-auto">
                                        <router-link to="#" class="uk-kamu uk-text-decoration-none" style="color:#0CC701;">Ubah Alamat</router-link>
                                    </div>
                                    <div class="uk-width-auto">
                                        <router-link @click="addressStore.destroyAddress(address.id)" to="#" class="uk-kamu uk-text-decoration-none" style="color:#0CC701;">Hapus</router-link>
                                    </div>
                                </div>
                            </div>
                            <div class="uk-width-auto">
                                <span class="uk-margin-small-right" uk-icon="icon:check;ratio:1.5" style="color: #0CC701;"></span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- selain main address -->
                <div class="uk-card uk-card-body uk-card-default uk-padding-small uk-width-1-1 uk-border-rounded uk-margin-small-top"
                    v-for="(address, index) in addressStore.fullAddress" :key="address.id"
                    style="border: 1px solid; border-color: #0CC701" v-show="!address.is_main_address">
                    <div class="uk-margin-small-left uk-margin-remove-bottom">
                        <div class="uk-grid uk-grid-small uk-flex-middle" uk-grid>
                            <div class="uk-width-expand">
                                <div class="uk-inline uk-margin-small-bottom">
                                    <div style="font-weight: 700;"> {{  address.address_label }} </div>
                                    <div>{{ address.name }}</div>
                                    <div>{{ address.phone_number }}</div>
                                    <div style="font-weight: 400; color: black;">{{ address.address }},
                                        {{ address.city.type }} {{ address.city.name }}, {{ address.province.name }} <br>
                                        {{ address.detail ? `(${address.detail})` :  ''}}</div>
                                </div>
                                <!-- <div class="uk-margin-small-bottom">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-map-pin"
                                        width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#0CC701" fill="none"
                                        stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="#" />
                                        <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                                        <path
                                            d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
                                    </svg>
                                    <div class="uk-margin-small-left uk-inline">
                                        <span style="font-size: 12px;">Sudah Pinpoint</span> <br>
                                    </div>
                                </div> -->
                                <div class="uk-grid uk-grid-small" uk-grid >
                                    <!-- <div class="uk-width-auto"  >
                                        <router-link to="#" class="uk-kamu uk-text-decoration-none" style="color:#0CC701;">Share</router-link>
                                    </div> -->
                                    <div class="uk-width-auto">
                                        <router-link to="#" class="uk-kamu uk-text-decoration-none" style="color:#0CC701;">Ubah Alamat</router-link>
                                    </div>
                                    <div class="uk-width-auto">
                                        <router-link to="#" class="uk-kamu uk-text-decoration-none" style="color:#0CC701;" @click="addressStore.setMainAddress(index)">Jadikan Alamat Utama</router-link>
                                    </div>
                                    <div class="uk-width-auto">
                                        <router-link @click="addressStore.destroyAddress(address.id)" to="#" class="uk-kamu uk-text-decoration-none" style="color:#0CC701;">Hapus</router-link>
                                    </div>
                                </div>
                            </div>
                            <div class="uk-width-auto">
                                <div>
                                    <button @click="addressStore.setMainAddress(index)"
                                        class="uk-button uk-button-default uk-border-rounded" uk-tooltip="Jadikan alamat utama">
                                        Pilih
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <div>
                kosong
            </div>
        </template>
    </div>
</template>

<style scoped>
@media only screen and (max-width: 320px) {
    .uk-card-title {
        width: 50px;
        height: auto;
        font-size: 15px;
        margin-right: 20px;
    }
    .uk-button-small {
        width: 80px;
        height: auto;
        font-weight: normal;
        font-size: 8px;
        margin-top: 10px;
    }
    .uk-margin-small-bottom {
        width: 10px;
        height: 10px;
        font-weight: normal;
        font-size: 10px;
    }
    .uk-margin-small-left {
        font-weight: normal;
        font-size: 10px;
    }
}
.title {
    color: black;
    font-size: 24px;
    font-weight: 600;
}

.uk-kamu:hover {
    font-weight: 600;
    
}
</style>