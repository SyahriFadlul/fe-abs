import { defineStore } from "pinia";
import axios from "axios";
import UIkit from "uikit";
import { useAuthStore } from "./auth";

export const useAddressStore = defineStore("address", {
  state: () => ({
    addresses: [], //daftar alamat user di halaman profile user
    addressUser:[], //buat dihalaman dashboard
    addressError: [],
    addressMain: null,
    selectedAddress: [], //buat dihalaman checkout/ 'cart/shimpent'
    addressReady: false
  }),
  getters: {
    fullAddress: (state) => state.addresses,
    userAddress: (state) => state.addressUser,
    mainAddress: (state) => state.addressMain,
    selectAddress: (state) => state.selectedAddress,
    error: (state) => state.addressError,
    ready: (state) => state.addressReady
  },
  actions: {
    clearErrors() {
      this.addressError = [];
    },

    loadPage(data) {
      this.addressReady = data;
    },

    async setMainAddress(index) {
      this.addresses.forEach(address => { //reset properti ismainaddress
        address.isMainAddress = false
      })
      
      //masukin address yang punya key 'ismainaddress' dengan value true ke state addressmain
      this.addresses[index].isMainAddress = true
      this.addressMain = this.addresses[index]
      
      const id = this.addresses[index].id
      await axios.put('api/set-main-address/' + id , this.addresses[index])
      .then( res => {
        UIkit.notification({
          message: 'Berhasil mengubah alamat utama',
          status: 'success',
          pos: 'top-center',
          timeout: 2000
      })
      })
      .catch( err => console.log(err.message))
    },

    getSelectedAddress(index){
      this.selectedAddress = this.addresses[index]
      UIkit.modal("#modal-alamat-checkout").hide()
    },

    async getAddresses() { //user UI , alamatprofile
      this.errResp = [];
      this.addressReady = false;
      this.addressError = [];
      const response = await axios.get("api/address");
      this.addresses = response.data.data;
    },

    async getUserAddresses(id) { //admin dashboard
      const response = await axios.get("api/user-addresses/" + id);
      // console.log(response)
      this.addressUser = response.data.data;
      console.log(response)
    },

    async getAddress(id) {
      this.errResp = [];
      try {
        const response = await axios.get("api/address/" + id);
        this.addresses = response.data.data;
      } catch (error) {
        this.errResp = error.response.status;
      }
    },

    async createAddress(data, id) {
      this.errResp = [];
      this.addressError = [];
      try {
        await axios.post("api/address", {
          user_id: id,
          address_label: data.address_label,
          name: data.name,
          address: data.address,
          phone_number: data.phone_number,          
          postal_code: data.postal_code,
          city_id: data.city,
          province_id: data.province,          
          detail: data.detail,
        });
        await this.getAddresses();
        UIkit.notification({
          message: 'Berhasil menambahkan alamat baru',
          status: 'success',
          pos: 'top-center',
          timeout: 2000
        })
        UIkit.modal('#modal-alamat').hide()
      } catch (error) {
        if (error.response.status === 422) {
          this.addressError = error.response.data.errors;
        } else {
          this.errResp = error;
        }
      }
    },

    async updateAddress(data) { //update berdasarkan address id
      this.errResp = [];
      try {
        await axios.put("api/address/" + data.id, data);
        this.router.push("/profile/alamat");
      } catch (error) {
        console.log(error.message);
        if (error.response.status === 422) {
          this.addressError = error.response.data.errors;
        }
      }
    },

    async destroyAddress(id) {
      await axios
        .delete("api/address/" + id)
        .then( async (res) => {
          await this.getAddresses();
          UIkit.notification({
            message: 'Berhasil menghapus alamat',
            status: 'success',
            pos: 'top-center',
            timeout: 2000
          })
        })
        .catch((err) => {
          this.addressError = err.message
          console.log(err.message);
        });
      // await this.getAddress();
      this.addressReady = true;
    },
  },
  persist: {
    storage: sessionStorage
  }
});
