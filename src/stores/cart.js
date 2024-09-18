import { defineStore } from 'pinia'
import axios from 'axios'
import UIkit from 'uikit'
import { useAuthStore } from './auth'


export const useCartStore = defineStore('cart',{
    state: () => ({
        cartItem:[],
        cartTotalPrice:null,
        cartQuantities:null,
        cartSelectedItem: null,
        totalSelectedItem:null,
        checkboxAll: false, //checkbox 'pilih semua'
        buyButton: null
    }),
    getters:{
        item: (state) => state.cartItem,
        total: (state) => state.cartTotalPrice,
        qtys: (state) => state.cartQuantities, //jumlah semua barang yang didalam cart
        selectedItem: (state) => state.cartSelectedItem,
        totalQty: (state) => state.totalSelectedItem, //jumlah barang yang pilih(checkboxed) di halaman cart
        checkbox: (state) => state.checkboxAll,
        button: (state) => state.buyButton
    },
    actions:{
        handleShowNote(index){ //toggle buat liat textbox/textarea untuk 'tulis catatan'
            this.cartItem[index].toggleNote = !this.cartItem[index].toggleNote 

        },
        
        async handleInputNote(data,index){ //input text di 'tulis catatan'
            this.cartItem[index].note = data
            await this.updateCart(this.cartItem[index])
        },

        checkAllCheckbox(){ //ngecek semua 'checkbox' dipilih atau tidak
            const checkCheckboxAll = this.cartItem.every(item => item.selected === true)
            if(checkCheckboxAll){
                this.checkboxAll = true
            } else {
                this.checkboxAll = false
            }
            return checkCheckboxAll
        },

        async changeToChecked(index){ //single item checkbox
            //push to cartSelectedItem
            this.cartItem[index].selected = !this.cartItem[index].selected
            
            const checkCheckboxAll = this.cartItem.every(item => item.selected === true)
            //ceklis 'pilih semua'_checkbox kalau semua checkbox diceklis
            if(this.checkAllCheckbox() === true){
                this.checkboxAll = true
                
            } else {
                this.checkboxAll = false
            }
            
            await this.updateCart(this.cartItem[index])
        },

        async selectAllItem(){ //checkbox selectAll
            this.checkboxAll = !this.checkboxAll
            //cek semua key/properti 'selected' true atau false di cartItem
            let checkSelected = this.cartItem.every(item => {
                //kalo semua key 'selected' nilainya false,return true
                return item.hasOwnProperty('selected') && item.selected === false
            })
            console.log(checkSelected);
            if (this.checkboxAll === true){
                //mencekliskan semua item
                let result = this.cartItem.map(item => {return {...item, selected : true}})
                this.cartItem = result
                await this.updateAll(true)
            } else {
                //menghapus semua ceklis ketika 'pilih semua' checkbox di klik yang ke 2xnya
                let result = this.cartItem.map(item => {return {...item, selected : false}})
                this.cartItem = result
                await this.updateAll(false)
            }
            // this.cartItem.forEach(async (item) => {
            //     await this.updateCart(item)
            // })            
                        
            
        },

        getSelectedItems(){
            const items = this.cartItem.filter(item => item.selected === true)
            this.cartSelectedItem = items
        },
        
        getTotalSelectedItem(){ //buat jumlah yang dipilih di page cart

            //mencari produk yg dipilih(selected:true) lalu return qty-nya saja
            let res = this.cartItem.filter(item =>item.selected === true).map(item=>item.qty)

            //menjumlahkan qty produk yang sudah difilter di variable res    
            const quantities = res.reduce((total, qty) => total+qty, 0)
            this.totalSelectedItem = quantities

            this.handleBeliButton()
        },
        //buat jumlah cart dinavbar
        getTotalItem(){
            const quantities = this.cartItem.map(item=>item.qty)
            this.cartQuantities = quantities.reduce((total, qty) => total + qty, 0);
        },
        
        getTotalPrice(){
            this.cartTotalPrice = 0
            //ekstrak produk yang dipilih dengan return harga dan jumlahnya
            let res = this.cartItem.filter(item =>item.selected === true).map(item=>{return{price:item.product_id.price,qty:item.qty}})            
            let subTotal = 0
            for (let index = 0; index < res.length; index++) {
                const item = res[index];                
                
                subTotal = item['price'] * item['qty']    
                
                this.cartTotalPrice += subTotal
            }                                                     
        },
        
        async modifyQty(product, event) {//input manual qty(gak pake button - atau +)            
            const newQty = parseInt(event.target.value, 10);
            if (!isNaN(newQty) && newQty > 0) {
                product.qty = newQty === 'NaN' ? '0' : newQty;
                await this.updateCart(product)
                this.getTotalSelectedItem()
                this.getTotalPrice()
            } else {
                product.qty = 1
            }            
        },

        async increaseQty(product){                        
            //buat button increment qty
            product['qty'] = product['qty'] + 1
            await this.updateCart(product)

            this.getTotalSelectedItem()
            this.getTotalPrice()                          
        },

        async decreaseQty(product){            
            //buat button deccrement qty
            if (product['qty'] > 1) {
                product['qty'] = product['qty'] - 1
                await this.updateCart(product)               
            } 

            this.getTotalSelectedItem()
            this.getTotalPrice()
        },
        
        handleBeliButton() {
            if (this.totalSelectedItem > 0) {
                this.buyButton = true
            } else {
                this.buyButton = false
            }
        },

        clearCart(){
            this.cartItem = []
            this.cartTotalPrice = null
            this.cartQuantities = null
        },

        async getCarts(){
            await axios.get('api/cart')
            .then(res=>{
                this.cartItem = res.data.data
                this.getTotalSelectedItem()
                this.getTotalItem()
                this.getTotalPrice()
            })
            .catch(err=>{
                console.log(err.message);
            })
        },

        async getCart(id){
            id = parseInt(id)
            await axios.get(`api/cart/${id}`)
            .then(res=>{                
                this.cartItem = res.data.data
                this.getTotalItem()
                this.getTotalPrice()
            })
            .catch(err=>{
                console.log(err.message);
            })
        },
        //menambahkan item ke keranjang/+1 item sejenis di page productdetail
        async createCart(productId, userId, qty, redirect){            
            await axios.post('api/cart',{
                product_id:productId,
                user_id:userId,
                qty:qty
                
            })
            .then(async (res)=>{
                 await this.getCarts()
                 if (!redirect){
                    UIkit.notification({
                        message: 'Berhasil menambahkan ke keranjang',
                        status: 'success',
                        pos: 'top-center',
                        timeout: 2000
                    })
                }
                this.cartItem.forEach(product => {
                    product.toggleNote = false; 
                });
            })
            .catch(err=>{
                console.log(err.message);
            })
        },

        async updateCart(data){
            const authStore = useAuthStore()            
            
            await axios.put(`api/cart/${data.id}`, {
                user_id:data.user_id,
                product_id:data.product_id.id,
                qty:data.qty,
                selected:data.selected,
                note:data.note
            })
            .then(async (res)=>{
                // await this.getCart(authStore.user.id)
                this.getTotalSelectedItem()
                this.getTotalPrice()
            })
            .catch(err=>{
                console.log(err.message);
            })            
        },

        async updateAll(data){
            let id = 1
            await axios.put('api/cart/all/' + id , {
                selected:data
            })
            .then(res => {
                this.getTotalSelectedItem()
                this.getTotalPrice()
            })
            .catch(err => {
                console.log(err.message);
            })
        },

        //delete item di halaman cart
        async deleteItemFromCart(productId){
            const authStore = useAuthStore()
            await axios.delete(`api/cart/${productId}`)
            .then(async (res)=>{
                await this.getCarts()
                UIkit.notification({
                    message: 'Produk berhasil dihapus',
                    status: 'success',
                    post: 'top-center',
                    timeout: 2000
                } )
                this.getTotalSelectedItem()
                this.getTotalPrice()
            })
            .catch(err=>{
                console.log(err.message);
            })
        },

        async moveItemToWishlist(data){
            const authStore = useAuthStore()

            await axios.post('/api/cart-to-wishlist', {
                id: data.id,
                user_id: data.user_id,
                product_id: data.product_id.id,
            })
            .then(async (res) => {
                await this.getCarts()
                UIkit.notification({
                    message: 'Produk berhasil dipindahkan ke wishlist',
                    status: 'success',
                    post: 'top-center',
                    timeout: 2000
                } )
                this.getTotalSelectedItem()
                this.getTotalPrice()
            })
            .catch(err => {
                console.log(err.message);
            })
        }
    },
    persist: {
        storage: sessionStorage
    },
})