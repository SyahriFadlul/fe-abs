import { defineStore } from 'pinia'
import axios from 'axios'
import { useCourierStore } from './courier'
import { useCartStore } from './cart'
import { useAddressStore } from './address'
import { useProductStore } from './product'

export const useOrderStore = defineStore('order', {
    state: () => ({
        indexOrder: [],
        userOrders: [],
        currentOrderId: null,
        orderSubTotal: null,
        orderTotalPrice: 0,
        orderTotalItem: null,
        chartData:[]
    }),
    getters:{
        order: (state) => state.userOrders,
        orderId: (state) => state.currentOrderId,
        subTotal: (state) => state.orderSubTotal,
        totalPrice: (state) => state.orderTotalPrice,
        totalQty: (state) => state.orderTotalItem,
        button() {//untuk mengecek alamat dan pengiriman sudah dipilh atau belum untuk menentukan button clickable atau tidak
            const useAddress = useAddressStore()
            const courierStore = useCourierStore()

            const isAddressSelected = Object.keys(useAddress.selectAddress).length > 0 ? true : false
            const isShipmentSelected = Object.keys(courierStore.courier).length > 0 ? true : false
            const hasItemsInOrder = this.totalPrice !== 0 && this.totalQty !== 0 ? true : false
            const isCourierServiceSelected = courierStore.courierService ? true : false
            // let x = isAddressSelected + " address|shipment " + isShipmentSelected;
            // console.log(hasItemsInOrder);
            // console.log(x);
            return isAddressSelected && isShipmentSelected && hasItemsInOrder && isCourierServiceSelected
            
        },
        chart: (state) => state.chartData,
    },
    actions:{
        getSubTotal(){
            const prices = this.userOrders.map(item => item.product_id.price * item.qty )
            const subTotal = prices.reduce((total, value) => total + value , 0)
            
            this.orderSubTotal = subTotal
        },

        getTotalItem(){
            const quantities = this.userOrders.map(item => item.qty)
            const totalQty = quantities.reduce((total, qty) => total + qty, 0)
            this.orderTotalItem = totalQty
        },

        getTotalPrice(){
            const courierStore = useCourierStore()

            this.orderTotalPrice = 0
            this.orderTotalPrice = this.orderSubTotal + courierStore.courierPrice
        },

        getTotalWeight(){
            const weights = this.userOrders.map(item => parseInt(item.product_id.weight))
            const totalWeight = weights.reduce((t, w) => t + w, 0)            
            
            return totalWeight
        },

        async getOrders(){

        },
        
        async getUserOrder(){
            const productStore = useProductStore()

            await axios.get('api/order-user/')
            .then( async (res) => {
                const orderWithImg = await Promise.all(
                    res.data.map(async (i) => {
                      if (i.product_id.image) {
                        i.product_id.imageUrl = await productStore.getImageUrl(i.product_id.image); 
                      }
                      
                      return i; 
                    })
                  );                           
                   
                this.userOrders = orderWithImg
                this.userOrders = res.data
            })
            .catch( err => {
                console.log(err.message);
            })
        },

        async createOrder(userId, productId){
            const ids = productId.map(item => item.product_id.id).join('_') //semua id digabung jadi 1 string
            const qtys = productId.map(item => item.qty).join('_')
            const cartStore = useCartStore()
            console.log(cartStore.total);
            
            await axios.post('api/order', {                
                user_id: userId,                
                product_id: ids,
                qty: qtys,
                total_amount: cartStore.total,
                status: 'Unpaid',
                shipment_cost: 0
            })
            .then( res => {
                this.currentOrderId = res.data
            })
            .catch( err => {
                console.log(err.message);
            })
        },
        
        async handleCheckout (data){
            await axios.put('api/checkout', {

            })
            .then( res => {
                console.log(res);
            })
            .catch( err => {
                console.log(err.message);
            })
        },

        async getChart(timePeriod){
            await axios.get('api/order-chart', timePeriod)
            .then(res => {
                this.chartData = res.data
                console.log(res)
            })
            .catch(err => {
                console.log(err);
                
            })
        }
    },
    persist: {
        storage: sessionStorage
    }
})