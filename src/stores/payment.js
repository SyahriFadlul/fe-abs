import { defineStore } from "pinia";
import axios from "axios";

export const usePaymentStore = defineStore('payment', {
    state: () => ({
        paymentDetail: []
    }),
    getters: {
        detailPayment: (state) => state.paymentDetail,
        paymentUrl() {return this.detailPayment.paymentUrl}
    },
    actions:{
        async createNewInvoice(data){
            await axios.post('api/checkout', data)
            .then( res => {
                this.paymentDetail = res.data
                console.log(res.data);
            })
            .catch( err => {
                console.log(err);
            })
        },
    },
    persist:{
        storage: sessionStorage
    }
})