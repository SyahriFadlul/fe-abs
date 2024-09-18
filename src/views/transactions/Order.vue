<script setup>
import { ref, onMounted } from 'vue'
import { useInvoiceStore } from '../../stores/invoice'
import { useAuthStore } from '../../stores/auth'
import { useProductStore } from '../../stores/product'
import OrderAll from './OrderAll.vue'
import OrderPending from './OrderPending.vue'
import OrderCancelled from './OrderCancelled.vue'
import OrderCompleted from './OrderCompleted.vue'
import InvoiceModal from '../modal/InvoiceModal.vue'
import uikit from 'uikit'

const invoiceStore = useInvoiceStore()
const authStore = useAuthStore()

onMounted(async () => {
    await invoiceStore.getUserInvoices(authStore.user.id)
    

})
</script>
<template>
    <div class="">
        <div class="uk-margin uk-text-baseline" style="background-color: white;min-height: 25px;padding-top: 20px;">
            <div class="uk-container uk-text-baseline">
                <div class="uk-grid-small" style="color: black!important;padding-bottom: 0px;" uk-grid>
                    <div class="uk-first-column uk-width-expand uk-text-large" style="font-weight: 500;">
                        Pesanan Saya
                    </div>
                    <div class="uk-width-auto">
                        <ul class="uk-subnav uk-subnav-pill uk-text-center uk-padding-remove" uk-switcher="connect: .switcher-container; animation: uk-animation-fade">
                            <li><a href="#all" class="subnav-items uk-text-decoration-none" style="width: 75px;">Semua</a></li>
                            <li><a href="#waiting_payment" class="subnav-items uk-text-decoration-none" style="width: 75px;">Belum Dibayar</a></li>
                            <li><a href="#in_process" class="subnav-items uk-text-decoration-none" style="width: 75px;">Diproses</a></li>
                            <li><a href="#in_shipment" class="subnav-items uk-text-decoration-none" style="width: 75px;">Dikirim</a></li>
                            <li><a href="#canceled" class="subnav-items uk-text-decoration-none" style="width: 75px;">Dibatalkan</a></li>
                            <li><a href="#completed" class="subnav-items uk-text-decoration-none" style="width: 75px;">Selesai</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <ul class="uk-switcher switcher-container uk-margin">
                <li><OrderAll/></li>
                <li><OrderPending/></li>
                <li>3</li>
                <li>4</li>
                <li><OrderCancelled/></li>
                <li><OrderCompleted/></li>
            </ul>
        </div>
    </div>
</template>
<style scoped>
.subnav-items {
    color: #20331F;
    font-weight: 500;
    text-transform: capitalize;
    display: inline-block;
}

.uk-subnav .uk-active a {
    font-weight: 600;
    color: #20331F;
    background-color: white !important;
    border-bottom: 2px solid #20331F; 
}

.subnav-items:hover{
    font-weight: 600;
    background-color: white !important;
}
</style>

