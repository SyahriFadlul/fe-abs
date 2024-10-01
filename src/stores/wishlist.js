import axios from "axios";
import  {defineStore}  from "pinia";
import { useCartStore } from "./cart";
import { useProductStore } from "./product";

export const useWishlistStore = defineStore('wishlist', {
    state: () => ({
        wishlists: [],
    }),
    getters: {
        items: (state) => state.wishlists,
    },
    actions:{
        async getWishlists(){
            const productStore = useProductStore()
            await axios.get('api/wishlist')
            .then(async (res)=>{
                console.log(res.data);
                const wishListWithImg = await Promise.all(
                    res.data.map(async (i) => {
                      if (i.product_id.image) {
                        i.product_id.imageUrl = await productStore.getImageUrl(i.product_id.image); 
                      }
                      
                      return i; 
                    })
                  );                           
                   
                // this.cartItem = cartWithImg
                this.wishlists = wishListWithImg
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
            await axios.delete(`api/wishlist/${id}`)
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