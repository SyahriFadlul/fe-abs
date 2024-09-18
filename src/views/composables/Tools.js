import { ref } from "vue";

const rupiahNum = function (num) {
    let price = String(num)
    price = price.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    return price + ',00';
}

const pageIsReady = function (value){
    let condition = ref('')
    condition.value = value
    return condition
}



export const tools = {
    rupiahNum, pageIsReady
}