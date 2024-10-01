import axios from "axios";
import  {defineStore}  from "pinia";

export const useProvinceStore = defineStore('province', {
    state: () => ({
        provinceIndex: [],
    }),
    getters: {
        items: (state) => state.provinceIndex,
    },
    actions:{
        async getProvinces(){
            await axios.get('api/provinces')
            .then(res=>{
                this.provinceIndex = res.data
            })
            .catch(err=>{
                console.log(err);
            })
        },


    }
})