<script setup>
import { paymentMethodList } from './../composables/PaymentMethodList'
import { ref } from 'vue';
import { useOrderStore } from '../../stores/order';
import { tools } from './../composables/Tools'
import { useCourierStore } from '../../stores/courier';
import router from '../../router';
import { usePaymentStore } from '../../stores/payment'
import { useAuthStore } from '../../stores/auth';
import { useProfileStore } from '../../stores/profile';
import { useAddressStore } from '../../stores/address';
import UIkit from 'uikit';

const authStore = useAuthStore()
const profileStore = useProfileStore()
const addressStore = useAddressStore()
const orderStore = useOrderStore()
const courierStore = useCourierStore()
const paymentStore = usePaymentStore()

let selectedPaymentMethod = ref({
    paymentType: '',
    paymentMethod: '',
    paymentName: '',
    paymentImage: '',
})

let buttonStatus = ref(false)
const paymentData = ref({
    orderId: '',
    paymentMethod: '',
    paymentAmount: 0,
    customerVaName:'' ,
    customer_id: '', //user_id
    address_id: '',
    shipment_cost: 0
})

function detailSelectedPayment(paymentType, selectedPayment){//untuk tampilan detail di modal ke-2
    selectedPaymentMethod.value.paymentType = paymentType
    selectedPaymentMethod.value.paymentMethod = selectedPayment.paymentMethod
    selectedPaymentMethod.value.paymentName = selectedPayment.paymentName
    selectedPaymentMethod.value.paymentImage = selectedPayment.paymentImage        
}

async function handlePayButton(){//buat request ke server
    buttonStatus.value = true

    paymentData.value.orderId           = orderStore.orderId
    paymentData.value.paymentMethod     = selectedPaymentMethod.value.paymentMethod
    paymentData.value.paymentAmount     = orderStore.totalPrice
    paymentData.value.customerVaName    = profileStore.user.firstName
    paymentData.value.customer_id       = authStore.user.id
    paymentData.value.address_id        = addressStore.selectAddress.id
    paymentData.value.shipment_cost     = courierStore.courierPrice

    // data for testing
    // paymentData.value.paymentMethod     = 'VA'
    // paymentData.value.paymentAmount     = 2000000
    // paymentData.value.email             = 'user@mail.com'
    // paymentData.value.phoneNumber       = '081284729574'
    // paymentData.value.customerVaName    = 'Sugeng'
    // paymentData.value.firstName         = 'Sugeng'
    // paymentData.value.lastName          = 'Alit'
    // paymentData.value.address           = 'Jl. Jakarta No.20'
    // paymentData.value.city              = 'Bandung'
    // paymentData.value.postalCode        = '40329'
    // paymentData.value.province          = 'Jawa Barbar'

    await paymentStore.createNewInvoice(paymentData.value)
    // UIkit.modal('#modal-payment-method-checkout2').hide()
    // router.push('/order-list')
    // window.open(paymentStore.paymentUrl)
}
 
</script>

<template>
    <div>
        <div id="modal-payment-method-checkout" uk-modal>
            <div class="uk-modal-dialog uk-border-rounded">
                <button class="uk-modal-close-default" type="button" uk-close></button>
                <div class="uk-modal-header uk-padding-small">
                    <h2 class="uk-text-large uk-text-bold">Pilih Metode Pembayaran</h2>
                </div>
                <div class="uk-modal-body">
                    <ul uk-accordion="multiple: false">
                        <li class="uk-open">
                            <a class="uk-accordion-title titles" href>Virtual Accounts</a>
                            <div class="uk-accordion-content">
                                <a href="#modal-payment-method-checkout2" class="uk-text-decoration-none" uk-toggle>
                                    <div class="methods uk-flex uk-flex-middle uk-padding-small" v-for="method in paymentMethodList.virtualAccount"
                                    @click="detailSelectedPayment('Virtual Account', method)">
                                        <img :src="method.paymentImage" class="uk-margin-right" alt="" srcset="" width="45">
                                        <p class="uk-margin-remove uk-inline method-name">{{ method.paymentName }}</p>
                                    </div>
                                </a>
                            </div>
                        </li>                    
                        <li class="">
                            <a class="uk-accordion-title titles" href>E-wallet</a>
                            <div class="uk-accordion-content">
                                <a href="#modal-payment-method-checkout2" class="uk-text-decoration-none" uk-toggle>
                                    <div class="methods uk-flex uk-flex-middle uk-padding-small" v-for="method in paymentMethodList.ewallet"
                                    @click="detailSelectedPayment('E-Wallet', method)">
                                        <img :src="method.paymentImage" class="uk-margin-right" alt="" srcset="" width="45">
                                        <p class="uk-margin-remove uk-inline method-name">{{ method.paymentName }}</p>
                                    </div>
                                </a>
                            </div>
                        </li>                    
                        <li class="">
                            <a class="uk-accordion-title titles" href>QRIS</a>
                            <div class="uk-accordion-content">
                                <a href="#modal-payment-method-checkout2" class="uk-text-decoration-none" uk-toggle>
                                    <div class="methods uk-flex uk-flex-middle uk-padding-small" v-for="method in paymentMethodList.qris"
                                    @click="detailSelectedPayment('QRIS', method)">
                                        <img :src="method.paymentImage" class="uk-margin-right" alt="" srcset="" width="45">
                                        <p class="uk-margin-remove uk-inline method-name">{{ method.paymentName }}</p>
                                    </div>
                                </a>
                            </div>
                        </li>                    
                        <li class="">
                            <a class="uk-accordion-title titles" href>Ritail</a>
                            <div class="uk-accordion-content">
                                <a href="#modal-payment-method-checkout2" class="uk-text-decoration-none" uk-toggle>
                                    <div class="methods uk-flex uk-flex-middle uk-padding-small" v-for="method in paymentMethodList.ritail"
                                    @click="detailSelectedPayment('Ritail', method)">
                                        <img :src="method.paymentImage" class="uk-margin-right" alt="" srcset="" width="45">
                                        <p class="uk-margin-remove uk-inline method-name">{{ method.paymentName }}</p>
                                    </div>
                                </a>
                            </div>
                        </li>                    
                    </ul>
                </div>        
            </div>
        </div>
        <div id="modal-payment-method-checkout2" uk-modal>
            <div class="uk-modal-dialog uk-border-rounded">
                <button class="uk-modal-close-default" type="button" uk-close></button>
                <div class="uk-modal-header uk-padding-small">
                    <h2 class="uk-text-large uk-text-bold">Pembayaran</h2>
                </div>
                <div class="uk-modal-body">
                    <p class="uk-width-expand titles uk-margin-remove">{{ selectedPaymentMethod.paymentType }}</p>
                    <a href="#modal-payment-method-checkout" 
                    class="uk-grid-small uk-flex u-flex-middle uk-margin-remove uk-width-1-1 uk-text-decoration-none payment-header" uk-grid uk-toggle>
                        <div class="uk-width-expand uk-flex">
                            <img :src="selectedPaymentMethod.paymentImage" class="uk-margin-small-right uk-flex uk-flex-middle" width="70">
                            <p class="uk-flex uk-flex-middle uk-margin-remove">{{ selectedPaymentMethod.paymentName }}</p>
                        </div>
                            <p class="uk-margin-remove uk-width-auto uk-flex uk-flex-middle">ubah</p>
                    </a>
                    <hr class="uk-margin-remove" style="border-top: 1px solid;border-color: green;">
                    <p class="titles uk-margin-small-bottom">Detail Transaksi</p>
                    <div class="uk-grid-small items" uk-grid>
                        <p class="uk-width-expand uk-margin-small-bottom">Total Belanja</p>
                        <p class="uk-margin-small-bottom">Rp{{ tools.rupiahNum(orderStore.subTotal) }}</p>
                    </div>
                    <div class="uk-grid-small items" uk-grid>
                        <p class="uk-width-expand uk-margin-small-bottom">Total Ongkir</p>
                        <p class="uk-margin-small-bottom">Rp{{ tools.rupiahNum(courierStore.courierPrice) }}</p>
                    </div>
                    <div class="uk-grid-small items" uk-grid>
                        <p class="uk-width-expand uk-margin-small-bottom">Total Diskon</p>
                        <p class="uk-margin-small-bottom">Rp0</p>
                    </div>
                    <hr class="uk-margin-remove" style="border-top: 1px solid;border-color: green;">
                    <div class="uk-grid uk-margin-top" uk-grid>
                        <p class="uk-width-expand titles">Total Tagihan</p>
                        <p class="titles">Rp{{ tools.rupiahNum(orderStore.totalPrice) }}</p>
                    </div>
                </div>
                <div class="uk-flex uk-flex-center">
                    <button class="uk-button uk-button-large uk-border-rounded py-btn uk-margin-bottom" @click="handlePayButton()" >Bayar Sekarang</button>                
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
    height: 70vh;
    overflow-y: auto;

}

.uk-modal-header {
    border-top-left-radius: 5px;
}

.titles {
    font-size: 19px;
    font-weight: 600 !important;
    color: #666 !important;
}

.items {
    font-weight: 500;
    color: #666 !important;
    margin: 0;    
}

.uk-accordion-title:hover {    
    color: black !important;
}

.methods {
    border-bottom: 1px solid #dfdfdf;    
    height: auto;
    height: 65px;
}

.methods:hover {
    cursor: pointer;
    user-select: none;
    background-color: #f4fff3;
}

.uk-accordion-title::before {
    content: "";
    width: 1.4em;
    height: 1.4em;
    margin-left: 10px;
    float: right;
    background-image: url("../../assets/chevron-right.svg");
    background-repeat: no-repeat;
    background-position: 50% 50%;
}
.uk-open > .uk-accordion-title::before {
    background-image: url("../../assets/chevron-down.svg");
}

.method-name {
    color: #666;
    font-weight: 500;
    
}

.payment-header {
    cursor: pointer;
    height: 60px;
    margin: 0 !important;
}

.payment-header img {
    margin-top: 16px;
    width: 8%;
    height: 40%;
}

.payment-header:hover {
    cursor: pointer;
    user-select: none;
    background-color: #f4fff3;
}

.py-btn {
    color: white;
    font-size: 18px;
    font-weight: 500;
    background-color: #003245;
    margin-top: -80px;    
}

button:disabled.py-btn {
    background-color: aquamarine !important;
    color: white;
    opacity: 0.6 !important;    
    cursor: progress;
}
</style>