import {defineStore} from 'pinia'
import axios from 'axios'
import { useOrderStore } from './order'

export const useCourierStore = defineStore('courier', {
    state: () => ({
        courierIndex: [], //dashboard
        courierSelected: [], //checkout
    }),
    getters: {
        couriers: (state) => state.courierIndex,
        courier: (state) => state.courierSelected,
        courierName() {return this.courier.courier},
        courierPrice() {return this.courier.price},
        courierTimeToDelivery() {return this.courier.estimated_delivery_time},

    },
    actions: {
        modifySelectedCourier(index){
            const orderStore = useOrderStore()
            // if (this.selectedCourier.length > 0) {
            //     await this.getCouriers()
            //     this.selectedCourier = this.courierIndex.splice(index, 1).map(item => ({...item, selected : true}))
            // } else {
            //     console.log("empty");
            //     this.selectedCourier = this.courierIndex.splice(index, 1).map(item => ({...item, selected : true}))
            // }
            this.courierIndex.forEach(courier => courier.selected = false) //reset
            this.courierIndex[index].selected = true //tandai yang dipilih dengan 'true'
            this.courierSelected = this.courierIndex[index]
            orderStore.getTotalPrice()
        },

        async getCouriers(){
            await axios.get('/api/courier')
            .then( res => {
                this.courierIndex = res.data
                this.courierIndex.forEach(courier => courier.selected = false)
            })
            .catch( err => {
                console.log(err);
            })
        },

    },
    persist: {
        storage: sessionStorage
    }
})