import axios from "axios";
import  {defineStore}  from "pinia";

export const useCityStore = defineStore('city', {
    state: () => ({
        cityIndex: [],
        citybyProvince:[],
    }),
    getters: {
        items: (state) => state.cities,
        provinceCities: (state) => state.citybyProvince,
    },
    actions:{
        async getCities(){
            await axios.get('api/cities')
            .then(res=>{
                this.cityIndex = res.data
            })
            .catch(err=>{
                console.log(err.message);
            })
        },

        async getCitiesbyProvince(province_id){
            await axios.post('api/cities-by-province', {
                province_id : province_id
            })
            .then(res=>{
                this.citybyProvince = res.data
            })
            .catch(err=>{
                console.log(err.message);
            })
        }


    }
})