<script setup>
import { useInvoiceStore } from '../../stores/invoice';
import { onMounted } from 'vue';
import { tools } from '../composables/Tools';
// import InvoiceModal from '../modal/InvoiceModal.vue'
import uikit from 'uikit'

const invoiceStore = useInvoiceStore()
const backendPath = import.meta.env.VITE_API_BASE_URL
function showInvoiceDetail() {
    uikit.modal("#InvoiceModal").show()
}

onMounted(async () => {
    // await invoiceStore.callback()
    console.log(invoiceStore.userInvoice);
})
</script>
<template>
    <div class="uk-container uk-width-3-4">
        <div class="uk-card uk-card-default cards uk-border-rounded uk-width-1-1 uk-box-shadow-large uk-margin-auto uk-margin-bottom" 
        v-for="item in invoiceStore.invoicesUser">
        <div class="uk-margin-small-left uk-margin-small-right">
            <div class="uk-grid uk-grid-small uk-text-small uk-padding-remove" uk-grid>
                <div class="uk-width-expand">
                    <div class="uk-inline uk-margin-right uk-margin-small-left">No Invoice : </div>
                    <div class="uk-inline">{{ item.id }}</div>
                    
                </div>                
                <div class="uk-width-auto uk-margin-small-right">
                    {{ item.status }}
                </div>
            </div>
            <hr class="uk-margin-auto-top uk-margin-small-bottom" style="border-top: 1px solid;border-color: green;">
            <div class="content uk-grid-small uk-card-body uk-margin-remove-top" v-for="detail in item.details" uk-grid>
                <div class="uk-width-auto">
                    <img class="" :src="backendPath + detail.product_id.image" alt="" srcset="" width="90" uk-contain>
                </div>
                <div class="uk-width-expand">
                    <p class="uk-margin-remove">{{ detail.product_id.name }}</p>
                    <p class="uk-margin-remove uk-text-muted uk-text-small">{{ detail.qty }}Barang</p>
                </div>
                <div class="uk-width-auto uk-flex uk-flex-middle uk-text-bold uk-margin-right" style="color:black">
                    Rp{{ tools.rupiahNum(detail.unit_price) }}
                </div>
                <hr class="uk-width-1-1 uk-margin-auto-bottom uk-margin-small-top uk-margin-left" style="border-top: 1px solid;border-color: green;">
            </div>
            <div class="uk-grid uk-grid-small uk-margin-small-top">
                <div class="uk-width-expand">
                    <!-- <button class=" uk-button uk-button-default uk-margin-small-left uk-margin-small-bottom uk-border-rounded uk-text-capitalize" 
                    @click="showInvoiceDetail()" style="border-color: #0CC701;font-size:17px;color: #0CC701;font-weight: 600;padding: 0px 20px;">Hubungi</button> -->
                    <!-- <InvoiceModal/> -->
                </div>
                <div class="uk-width-auto uk-flex uk-flex-middle">
                    <div class="uk-inline uk-margin-medium-right">Total Pesanan</div>
                    <div class="uk-inline uk-text-bold" style="color:black">Rp{{ tools.rupiahNum(item.total_amount) }}</div>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.cards {
    padding: 5px 10px;
}

/* .content {
    border-top: 1px solid black;
    border-bottom: 1px solid black;
} */
button:hover {
    color: white !important;
    background-color: #0CC701;
}
</style>