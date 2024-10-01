import {defineStore} from 'pinia'
import axios from 'axios'
import { useOrderStore } from './order'
import { useAddressStore } from './address'

export const useCourierStore = defineStore('courier', {
    state: () => ({
        courierIndex: [], //dashboard
        courierSelected: {}, //checkout
        selectedCourierDetail: [], //kurir yang dipilih w/ details
        selectedService: null,
        loading: false //fetching courier services
    }),
    getters: {
        couriers: (state) => state.courierIndex,
        courier: (state) => state.courierSelected,
        courierName() {return this.selectedCourierDetail?.code || ''},
        courierService: (state) => state.selectedService,
        // selectedCourierService(state) {

        //     return state.selectedCourierDetail.},
        courierPrice() {return this.courierService?.cost?.[0]?.value},
        courierTimeToDelivery() {
            let etd = this.courierService?.cost?.[0]?.etd
            if(etd){
                let slicedEtd = etd.includes('HARI') ? etd.slice(-0,-4) : etd
                return slicedEtd}
            },
        async cost(){
            const addressStore = useAddressStore()
            const orderStore = useOrderStore()

            const totalWeight = orderStore.getTotalWeight()
            this.loading = true
            const costDetail  = await this.handleCourier(this.courierSelected.name, totalWeight, addressStore.selectAddress.city_id, addressStore.selectAddress.province_id)
            this.selectedCourierDetail = costDetail
            this.loading = false
            
        },
        services: (state) => state.selectedCourierDetail?.costs || [],

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

        async populateServices(courier){
            this.selectedCourierDetail = []
            this.selectedService = null
            this.courierSelected.name = courier
            await this.cost

            console.log(this.selectedCourierDetail);
            
        },

        setSelectedService(serviceName){
            const orderStore = useOrderStore()

            this.selectedService = this.selectedCourierDetail.costs.find( s => s.service === serviceName)
            
            orderStore.getTotalPrice()
        },

        async getCouriers(){
            this.courierSelected = {}
            this.selectedCourierDetail = []
            await axios.get('api/courier')
            .then( res => {
                this.courierIndex = res.data
                // this.courierIndex.forEach(courier => courier.selected = false)
            })
            .catch( err => {
                console.log(err);
            })
        },

        async handleCourier(courier, weight, cityId, provinceId){
            try {
                const res = await axios.post('api/courier-cost', {
                    courier: courier,
                    weight: weight,
                    city_id: cityId,
                    province_id: provinceId,
                });
                return res.data;
            } catch (err) {
                console.error(err);
                return null; 
            }
        }

    },
    persist: {
        storage: localStorage
    }
})