import { defineStore } from 'pinia'
import axios from 'axios'

export const useInvoiceStore = defineStore('invoice', {
    state: () => ({
        invoicesUser: [],
    }),
    getters: {
        userInvoice: (state) => state.invoicesUser,
    },
    actions: {
        async getUserInvoices(id){
            await axios.get('api/invoice-user/' + id)
            .then( res => {
                this.invoicesUser = res.data
            })
            .catch( err => {
                console.log(err.message);
            })
        },
        async callback(){
            console.log("tet");
            await axios.post('api/callback')
            .then( res => {
                console.log(res);
            })
            .catch( err => {
                console.log(err.message);
            })
        },
    },
    persist: {
        storage: sessionStorage
    }
})