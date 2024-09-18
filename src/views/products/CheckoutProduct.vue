<script setup>
import checkoutModal from '../modal/CheckoutAlamatModal.vue';
import shipmentModal from '../modal/CheckoutPengirimanModal.vue';
import UIkit from 'uikit';
import { onMounted } from 'vue';
import { useOrderStore } from '../../stores/order';
import { useCourierStore } from '../../stores/courier'
import { useProductStore } from '../../stores/product'
import { useAddressStore } from '../../stores/address'
import ChoosePaymentMethodModal from '../modal/ChoosePaymentMethodModal.vue';
import { useRouter } from 'vue-router';

const orderStore = useOrderStore()
const courierStore = useCourierStore()
const productStore = useProductStore()
const addressStore = useAddressStore()
const router = useRouter()
const backendPath = import.meta.env.VITE_API_BASE_URL

const showChangeAlamatModal = function (id) {
    UIkit.modal("#modal-alamat-checkout").show();
}

const showPickShipmentModal = function (id) {
    UIkit.modal("#modal-pengiriman-checkout").show();
}

const rupiahNum = function (num) {
  let price = String(num);
  price = price.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return price + ",00";
}

function handlePaymentMethodButton(data){
    UIkit.modal("#modal-payment-method-checkout").show();
}

onMounted(async () => {
    productStore.loadPage(false)
    await orderStore.getUserOrder()
    if (orderStore.orderId === null) {
        console.log('empty order')
        router.push('/')
    }
    productStore.loadPage(true)
    orderStore.getSubTotal()
    orderStore.getTotalItem()
    await courierStore.getCouriers()    
    
})
</script>

<template>
    <div class="uk-cart uk-container uk-margin-large-bottom">
        <div>
            <p style="font-size: 24px;font-weight: 700; margin-top: 24px">Checkout</p>
            <div class="">
                <span class="uk-margin-medium" style="font-weight: 700;">Alamat Pengiriman</span>
            </div>
        </div>
        <template v-if="productStore.ready">                        
            <div class="uk-grid" uk-grid>
                <div class="uk-width-expand uk-margin-small-right">
                    <div class="uk-margin-top uk-margin-medium-bottom">
                        <div class="uk-card uk-card-body uk-card-default uk-card-small uk-width-1-1 uk-border-rounded">
                            <div v-if="addressStore.selectAddress.length === 0">
                                <button @click="showChangeAlamatModal" class="uk-button uk-button-default uk-border-rounded uk-margin-remove-right"
                                        style="margin-right: 24px;">
                                        <span>Pilih Alamat</span>
                                </button>
                                <span class="uk-text-danger uk-margin-small-left" style="font-weight: 400;font-size: 16px;"> 
                                    Alamat harus dipilih</span>
                                <checkoutModal />
                            </div>
                            <div class="" v-else>
                                <div class="uk-inline uk-margin-small-bottom">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-map-pin"
                                        width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#003245" fill="none"
                                        stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="#" />
                                        <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                                        <path
                                            d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
                                    </svg>
                                </div>
                                <div class="uk-inline uk-margin-small-bottom">
                                    <div class="uk-margin-small-left">
                                        <span style="font-weight: 700; color: black;">
                                            {{ addressStore.selectAddress.address_label }} &nbsp;•&nbsp; {{ addressStore.selectAddress.name }} 
                                            <span style="font-weight: 400;">( {{ addressStore.selectAddress.phone_number }} )</span></span>
                                    </div>
                                </div>
                                <div class="uk-margin-small-bottom">
                                    <p class="uk-inline uk-margin-remove" style="font-weight: 400; color: black;">
                                        {{ addressStore.selectAddress.address }}, 
                                        {{ addressStore.selectAddress.city.type }} {{ addressStore.selectAddress.city.name }}, 
                                        {{ addressStore.selectAddress.province.name }} {{ addressStore.selectAddress.postal_code }} <br>                                    
                                        {{ addressStore.selectAddress.detail ? `(${addressStore.selectAddress.detail})` : '' }}</p>
                                </div>
                                <div class="">
                                    <button @click="showChangeAlamatModal" class="uk-button uk-button-default uk-border-rounded"
                                        style="margin-right: 24px;">
                                        <span>Ganti Alamat</span>
                                    </button>
                                    <checkoutModal />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="uk-grid uk-grid-small uk-width-1-1 uk-padding-remove" uk-grid>
                        <div class="uk-width-expand uk-first-column">
                            <!-- kiri -->
                            <div class="uk-margin-small-left uk-margin-small-bottom">
                                <div class="uk-text-bold">Amoeba Bio Sintesa</div>
                                <div class="uk-text-small">
                                    <span>Dikirim dari: </span>
                                    <span>Kabupaten Bandung</span>
                                </div>
                            </div>
                            <div class="uk-grid uk-grid-small" v-for="item in orderStore.order" :key="item.id" uk-grid>
                                <div class="uk-margin-small-top">
                                    <div class="uk-grid uk-grid-small" uk-grid>
                                        <div class="uk-width-auto uk-first-column">
                                            <label class="">
                                                <img class="uk-margin-small-left"
                                                    :src="backendPath + '/storage/' + item.product_id.image"
                                                    alt="" width="79" height="79">
                                            </label>
                                        </div>
                                        <div class="uk-width-expand">
                                            <div class="">{{ item.product_id.name }}</div>
                                            <div class="uk-text-muted" style="font-size: 12px;">{{ item.product_id.storage }}, {{ item.qty }}Barang</div>
                                            <div class="uk-margin-small-top uk-text-bold">Rp{{ rupiahNum(item.product_id.price) }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="uk-width-auto uk-float-right">
                            <button @click="showPickShipmentModal" class="uk-button uk-button-default uk-border-rounded uk-margin-remove-bottom" 
                            style="color:white;font-weight: 500;font-size: 16px;background-color: #13556F;width: 240px;height: 50px;">
                                Pilih Pengiriman
                            </button>
                            <div class="uk-margin-small-top uk-margin-small-left" v-if="courierStore.courierName">
                                <p class="uk-margin-remove">{{ courierStore.courierName }} Rp{{ rupiahNum(courierStore.courierPrice) }}</p>
                                <p class="uk-margin-remove">Estimasi tiba {{ courierStore.courierTimeToDelivery }} jam</p>
                            </div>
                            <div class="uk-text-danger uk-margin-small-top uk-margin-small-left" v-else style="font-weight: 400;font-size: 12px ;"> Pengiriman harus dipilih</div>
                            <shipmentModal/>
                        </div>

                    </div>
                    <div class="uk-width-1-1">
                        <hr class="uk-margin-medium-top" style="border-bottom: 1px solid;border-color: #003245;">
                        <div class="uk-margin-medium uk-margin-remove-top uk-margin-remove-bottom">
                            <span style="font-size: 20px; font-weight: 600;">Subtotal</span>
                            <span class="uk-float-right" style="font-size: 20px; font-weight: 600;">Rp{{ rupiahNum(orderStore.subTotal) }}</span>
                        </div>
                        <hr class="" style="border-top: 2px solid;border-color: #003245;">
                    </div>
                </div>

                <!-- kanan -->
                <div class="uk-width-1-3">
                    <div class="uk-card uk-card-small uk-card-default uk-card-body uk-box-shadow-large uk-border-rounded uk-position-z-index" uk-sticky="end: .uk-width-1-3;offset:100">
                        <p class=" uk-text-bold" style="color: black;">Belanjaanmu</p>
                        <div class="uk-margin-remove-top uk-grid uk-grid-small uk-width-expand uk-margin-remove-bottom"
                            uk-grid>
                            <div class="uk-margin-small uk-first-column uk-width-expand">
                                <p class="">Total Harga ( {{ orderStore.totalQty }} barang)</p>
                            </div>
                            <div class="uk-text-right uk-width-auto">
                                Rp{{ rupiahNum(orderStore.subTotal) }}
                            </div>
                        </div>
                        <div class="uk-margin-remove-top uk-grid uk-grid-small uk-width-expand uk-margin-remove-bottom"
                            uk-grid>
                            <div class="uk-margin-small uk-first-column uk-width-expand">
                                <p class="">Total Ongkos Kirim</p>
                            </div>
                            <div class="uk-text-right uk-width-auto">
                                Rp{{ courierStore.courierPrice ? rupiahNum(courierStore.courierPrice) : '0,00' }}
                            </div>
                        </div>
                        <div class="uk-margin-remove-top uk-grid uk-grid-small uk-width-expand uk-margin-remove-bottom"
                            uk-grid>
                            <div class="uk-margin-small uk-first-column uk-width-expand">
                                <p class="">Total Diskon</p>
                            </div>
                            <div class="uk-text-right uk-width-auto">
                                Rp0
                            </div>
                        </div>
                        <hr class="uk-margin-remove-top" style="border-top: 1px solid;border-color: green;">
                        <div class="uk-grid uk-grid-small uk-width-expand" uk-grid>
                            <div class="uk-width-expand uk-text-bold" style="color: black;">
                                Total Harga
                            </div>
                            <div class=" uk-width-auto uk-text-bold" style="color: black;">
                                Rp{{ rupiahNum(orderStore.totalPrice) }}
                            </div>
                        </div>
                        <button class="uk-button uk-button-primary uk-width-1-1 uk-margin-medium-top uk-border-rounded chs-py"
                        :disabled="!orderStore.button"
                        @click="handlePaymentMethodButton()"
                        style="background-color: #003245;font-size: 16px;font-weight: 500;height: 50px;">Pilih Pembayaran</button>
                        <ChoosePaymentMethodModal />
                    </div>
                </div>
            </div>
        </template>
        <!-- start of skeleton -->
        <template v-else>
            <div class="uk-grid" uk-grid>
                <div class="uk-width-expand uk-margin-small-right">
                    <div class="uk-margin-top uk-margin-medium-bottom">
                        <div class="uk-card uk-card-body uk-card-default uk-padding-small uk-width-1-1 uk-border-rounded">
                            <div class="uk-margin-small-left">
                                <p id="ttl-adds-sk"/>
                                <p class="dtl-adds-sk"/>
                                <p class="dtl-adds-sk"/>
                                <p class="dtl2-adds-sk"/>
                                <p id="btn-adds-sk"/>
                            </div>
                        </div>
                    </div>
                    <div class="uk-grid uk-grid-small uk-width-1-1 uk-padding-remove" uk-grid>
                        <div class="uk-width-expand uk-first-column">
                            <!-- kiri -->
                            <div class="uk-margin-small-left uk-margin-small-bottom">
                                <div class="shp-nm-sk"></div>
                                <div class="shp-lct-sk"></div>
                            </div>
                            <div class="uk-grid uk-grid-small" v-for="item in orderStore.order" :key="item.id" uk-grid>
                                <div class="uk-margin-small-top">
                                    <div class="uk-grid uk-grid-small" uk-grid>
                                        <div class="uk-width-auto uk-first-column">
                                            <p class="img-sk"/>
                                        </div>
                                        <div class="uk-width-expand">
                                            <div class="pn-sk"></div>
                                            <div class="stg-sk"></div>
                                            <div class="pn-sk"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="uk-width-auto uk-float-right">
                            <button @click="showPickShipmentModal" class="uk-button uk-button-default uk-border-rounded uk-margin-remove-bottom" 
                            style="background-color: #0CC701;width: 240px;height: 50px;">
                            <p uk-spinner="ratio: 0.8"></p>
                            </button>                            
                            <div class="uk-text-danger uk-margin-small-top uk-margin-small-left" style="font-weight: 400;font-size: 12px;"> Pengiriman harus dipilih</div>                            
                        </div>

                    </div>
                    <div class="uk-width-1-1">
                        <hr class="uk-margin-medium-top" style="border-bottom: 1px solid;border-color: #003245;">
                        <div class="uk-margin-medium uk-margin-remove-top uk-margin-remove-bottom sb-tot">
                            <p class="uk-margin-remove"></p>
                            <p class="uk-float-right uk-margin-remove"></p>
                        </div>
                        <hr class="uk-margin-large-bottom" style="border-top: 2px solid;border-color: #003245;">
                    </div>
                </div>

                <!-- kanan -->
                <div class="uk-width-1-3">
                    <div class="uk-card uk-card-small uk-card-default uk-card-body uk-box-shadow-large uk-border-rounded uk-position-z-index" uk-sticky="end: .uk-width-1-3;offset:100">
                        <p class="ttl-card-sk"/>
                            <p class="itm-card-sk"/>
                            <p class="itm-card-sk"/>                                
                            <p class="itm-card-sk"/>                                
                            <hr class="uk-margin-remove-top" style="border-top: 1px solid;border-color: green;">
                            <p class="itm-card-sk"/>                    
                            <button class="uk-button uk-border-rounded uk-width-1-1 uk-margin-medium-top" style="background-color: #0CC701;"><p uk-spinner="ratio: 0.8"></p></button> 
                    </div>
                </div>
            </div>
        </template>
        <!-- end of skeleton  -->
    </div>
</template>

<style scoped>
button:disabled.chs-py {
    background-color: aquamarine !important;
    color: white;
    opacity: 0.6 !important;
    cursor: not-allowed !important;
}

/* skeleton styles */
#ttl-adds-sk {
    width: 30%;
    height: 16px;
    border-radius: 20px 20px;
    animation: pulse-bg 1s infinite;
}

.dtl-adds-sk {
    margin: 10px 0px;
    width: 100%;
    height: 12px;
    border-radius: 20px 20px;
    animation: pulse-bg 1s infinite;
}

.dtl2-adds-sk {
    margin: 10px 0px;
    margin-bottom: 15px;
    width: 50%;
    height: 12px;
    border-radius: 20px 20px;
    animation: pulse-bg 1s infinite;
}

#btn-adds-sk {
    width: 30%;
    height: 36px;
    border-radius: 20px 20px;
    animation: pulse-bg 1s infinite;
}

.shp-nm-sk {
    width: 20%;
    height: 16px;
    border-radius: 20px 20px;
    animation: pulse-bg 1s infinite;
}

.shp-lct-sk {
    margin-top: 5px;
    width: 50%;
    height: 16px;
    border-radius: 20px 20px;
    animation: pulse-bg 1s infinite;
}

.img-sk {
    width: 100px;
    height: 100px;
    border-radius: 20px 20px;
    animation: pulse-bg 1s infinite;
}

.pn-sk {
    width: 150px;
    margin: 5px 0px;
    height: 12px;
    border-radius: 20px 20px;
    animation: pulse-bg 1s infinite;
}

.stg-sk {
    margin: 10px 0px;
    width: 50%;
    height: 12px;
    border-radius: 20px 20px;
    animation: pulse-bg 1s infinite;
}

.ttl-card-sk {
    width: 40%;
    height: 16px;
    border-radius: 20px 20px;
    animation: pulse-bg 1s infinite;
}

.itm-card-sk {
    width: 100%;
    height: 12px;
    border-radius: 20px 20px;
    animation: pulse-bg 1s infinite;
}

.sb-tot {
    display: flex;
    justify-content: space-between;
}

.sb-tot p {
    width: 25%;
    height: 24px;
    border-radius: 20px 20px;
    animation: pulse-bg 1s infinite; 
}
</style>