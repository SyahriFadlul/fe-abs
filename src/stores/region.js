import { defineStore } from "pinia";
import axios from "axios";
import { computed, ref } from "vue";


export const  useRegionStore = defineStore ('region', () => {
    
    const regions = ref([])
    
    const regionList = computed(() => regions)
    
    async function getRegion() {
        
        await axios.get('api/provinces')
        .then( res => console.log(res))
        .catch( err => console.log(err.message))
    }


    return { regions, regionList, getRegion}
})