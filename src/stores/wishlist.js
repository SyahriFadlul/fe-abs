import axios from "axios";
import  {defineStore}  from "pinia";
import { useCartStore } from "./cart";

export const useWishlistStore = defineStore('wishlist', {
    state: () => ({
        wishlists: [],
    }),
    getters: {
        items: (state) => state.wishlists,
    },
    actions:{
        async getWishlists(){
            await axios.get('/api/wishlist')
            .then(res=>{
                console.log(res);
                this.wishlists = res.data
            })
            .catch(err=>{
                console.log(err);
            })
        },

        async moveItemToCart(data){
            const cartStore = useCartStore()

            await axios.post('api/wishlist-to-cart', {
                id:data.id,
                product_id:data.product_id.id,
                user_id:data.user_id
            })
            .then(async (res) => {
                console.log(res);
                await this.getWishlists()
                await cartStore.getCarts()
            })
            .catch(err => {
                console.log(err);
            })
        },

        async deleteItem(id){
            await axios.delete(`/api/wishlist/${id}`)
            .then(async (res) => {
                console.log(res);
                await this.getWishlists()
            })
            .catch(err => {
                console.log(err);
            })
        }

    }
})