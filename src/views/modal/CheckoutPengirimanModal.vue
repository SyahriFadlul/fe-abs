<script setup>
import { useCourierStore } from '../../stores/courier';
import { onMounted } from 'vue';
import { useOrderStore } from '../../stores/order';

const courierStore = useCourierStore()
const orderStore = useOrderStore()

const rupiahNum = function (num) {
  let price = String(num);
  price = price.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return price + ",00";
};

onMounted(async () => {
    // await courierStore.getCouriers()    
})
</script>
<template>
    <div id="modal-pengiriman-checkout" class="uk-flex-top" uk-modal>
        <div class="uk-modal-dialog uk-modal-body uk-margin-auto-vertical uk-border-rounded uk-width-1-2">
            <button class="uk-modal-close-default" type="button" aria-label="Close" uk-close></button>
            <h2 class="uk-modal-title uk-flex uk-flex-left uk-text-bold uk-text-large ">
                Pilih Opsi Pengiriman</h2>
            <span style="font-weight: 500">PILIH JASA PENGIRIMAN</span> <br>
            <span style="font-size: 14px;">Estimasi tanggal diterima tergantung pada waktu pengemasan Penjual dan waktu
                pengiriman ke lokasi Anda</span>
            <!-- <hr style> -->
            <div class="uk-margin uk-width-1-1">
                <!-- <div class="uk-card uk-card-body uk-card-default uk-padding-small uk-width-1-1 uk-border-rounded uk-margin-small-top "
                    style="border: 1px solid; border-left: 8px solid #0CC701; margin-bottom: 4px;" v-for="courier in courierStore.courier" :key="courier.id">
                    <div class="uk-margin-small-left uk-margin-remove-bottom">
                        <div class="uk-grid uk-grid-small uk-flex-middle" uk-grid>
                            <div class="uk-width-expand">
                                <div class="uk-inline uk-margin-small-bottom">
                                    <span style="font-weight: 700;">{{ courier.courier }} </span>
                                    <span class="uk-margin-medium-left">{{ courier.price}}</span> <br>
                                    <span style="font-size: 12px;">{{ courier.estimated_delivery_time }}</span>
                                </div>
                            </div>
                            <div class="uk-width-auto">
                                <i class="uk-margin-small-right uk-margin-medium-left">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-check"
                                        width="32" height="32" viewBox="0 0 24 24" stroke-width="2" stroke="#0CC701"
                                        fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M5 12l5 5l10 -10" />
                                    </svg>
                                </i>
                            </div>
                        </div>
                    </div>
                </div> -->
                <div class="uk-card uk-card-body uk-card-default uk-padding-small uk-width-1-1 uk-border-rounded"
                    style="border: 1px solid; border-left: 8px solid blue; margin-bottom: 4px;"
                    v-for="(courier, index) in courierStore.couriers" :key="courier.id" 
                     :style="{  'border-left-color': courier.selected ? '#003245' : ''}" >
                    <div class="uk-margin-small-left uk-margin-remove-bottom">
                        <div class="uk-grid uk-grid-small uk-flex-middle" uk-grid>
                            <div class="uk-width-expand">
                                <div class="uk-inline uk-margin-small-bottom">
                                    <span style="font-weight: 700;">{{ courier.courier }} </span>
                                    <span class="uk-margin-medium-left">Rp{{rupiahNum(courier.price)}}</span> <br>
                                    <span style="font-size: 12px;">Estimasi waktu pengiriman {{ courier.estimated_delivery_time }} jam</span>
                                </div>
                            </div>
                            <div class="uk-width-auto">
                                <div v-if="!courier.selected">
                                    <button class="uk-button uk-button-default uk-border-rounded"
                                        style="background-color: #003245; color: white;" @click="courierStore.modifySelectedCourier(index)">Pilih</button>
                                </div>
                                <div v-else>
                                <i class="uk-margin-small-right uk-margin-medium-left">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-check"
                                        width="32" height="32" viewBox="0 0 24 24" stroke-width="2" stroke="#003245"
                                        fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M5 12l5 5l10 -10" />
                                    </svg>
                                </i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <div class="uk-card uk-card-body uk-card-default uk-padding-small uk-width-1-1 uk-border-rounded"
                    style="border: 1px solid; border-left: 8px solid; margin-bottom: 4px;">
                    <div class="uk-margin-small-left uk-margin-remove-bottom">
                        <div class="uk-grid uk-grid-small uk-flex-middle" uk-grid>
                            <div class="uk-width-expand">
                                <div class="uk-inline uk-margin-small-bottom">
                                    <span style="font-weight: 700;">Kargo </span>
                                    <span class="uk-margin-medium-left">Rp0</span> <br>
                                    <span style="font-size: 12px; color: red;">Jasa kirim tidak didukung</span>
                                </div>
                            </div>
                            <div class="uk-width-auto">
                                <button class="uk-button uk-button-default uk-border-rounded"
                                    style="background-color: #0CC701; color: white;">Pilih</button>
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>
            <p class="uk-text-right">
                <!-- <button class="uk-button uk-button-default uk-modal-close uk-margin-small-right uk-border-rounded" type="button" @click="orderStore.getTotalPrice()">Nanti Aja</button> -->
                <button class="uk-button uk-border-rounded uk-modal-close" 
                style="background-color: #003245; color: white;" type="button" 
                @click="orderStore.getTotalPrice()">Simpan</button>
            </p>

        </div>
    </div>
</template>