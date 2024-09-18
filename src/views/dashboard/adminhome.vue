<script setup>
import { onMounted, ref } from 'vue';
import { useProductStore } from '@/stores/product'
import { useAuthStore } from '../../stores/auth';
import { useUserStore } from '../../stores/user';
import { useOrderStore } from '../../stores/order';
import { useRouter } from 'vue-router';
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const authStore = useAuthStore()
const orderStore = useOrderStore()
const userStore = useUserStore()
const productStore = useProductStore()
const router = useRouter()
const chartData = ref({ labels : '' , datasets : '' })

onMounted(async () => {
    chartData.value.labels = [ 'January', 'February', 'March' ]
    chartData.value.datasets = [ { label: 'DataData', data : [40, 20, 12] } ]
    productStore.loadPage(false)
    await userStore.getUsers()
    await productStore.getProducts()
    await orderStore.getChart(3)
    productStore.loadPage(true)
})

</script>

<template>
    <div class="uk-container uk-background-muted">
        <template v-if="productStore.ready">
            <nav aria-label="Breadcrumb">
                <p style="color: #13556F; font-weight: 700; font-size: 24px;">Selamat Datang {{ authStore.user.username }}
                </p>
                <ul class="uk-container uk-breadcrumb">
                    <li class="uk-disabled"><a>Dashboard</a></li>
                </ul>
            </nav>
            <div class="uk-child-width-expand@s uk-text-center" uk-grid>
                <div>
                    <div class="uk-card uk-card-default uk-card-body uk-border-rounded">
                        <div class="uk-grid uk-grid-small">
                            <div class="uk-width-1-2@l uk-width-1-2@m ">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-bag"
                                    width="120" height="120" viewBox="0 0 24 24" stroke-width="2" stroke="black" fill="none"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path
                                        d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304z" />
                                    <path d="M9 11v-5a3 3 0 0 1 6 0v5" />
                                </svg>
                            </div>
                            <div class="uk-width-1-2@l uk-width-1-3@m">
                                <span class="" style="font-size: 18px; font-weight: 700;">Total Order</span>
                                <p style="font-size: 48px; color: black;"><strong>51</strong></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="uk-card uk-card-default uk-card-body uk-border-rounded">
                        <div class="uk-grid uk-grid-small">
                            <div class="uk-width-1-2@l uk-width-1-2@m">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-list"
                                    width="120" height="120" viewBox="0 0 24 24" stroke-width="2" stroke="black" fill="none"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M9 6l11 0" />
                                    <path d="M9 12l11 0" />
                                    <path d="M9 18l11 0" />
                                    <path d="M5 6l0 .01" />
                                    <path d="M5 12l0 .01" />
                                    <path d="M5 18l0 .01" />
                                </svg>
                            </div>
                            <div class="uk-width-1-2@l uk-width-1-3@m">
                                <span class="" style="font-size: 18px; font-weight: 700;">Total Item</span>
                                <p style="font-size: 48px; color: black;"><strong>{{ productStore.item.length }}</strong>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="uk-card uk-card-default uk-card-body uk-border-rounded">
                        <div class="uk-grid uk-grid-small">
                            <div class="uk-width-1-2@l uk-width-1-2@m">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-users"
                                    width="120" height="120" viewBox="0 0 24 24" stroke-width="2" stroke="black" fill="none"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                                    <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                    <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                                </svg>
                            </div>
                            <div class="uk-width-1-2@l uk-width-1-3@m">
                                <span class="" style="font-size: 18px; font-weight: 700;">Total Users</span>
                                <p style="font-size: 48px; color: black;"><strong>{{ userStore.userItem.length - 1
                                }}</strong>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="uk-container-xl uk-margin-top" style="margin-bottom: 64px;">
                <div class="uk-card uk-card-default uk-card-body uk-padding-small uk-border-rounded">
                    <p class="uk-margin-small uk-text-lead" style="font-weight: 500;"> Hello, {{ authStore.user.username }}
                    </p>
                    <span>Have a nice day</span>
                </div>
            </div>
            <!-- <Bar
                id="my-chart-id"
                :options="chartOptions"
                :data="chartData"
            /> -->
        </template>
        <template v-else>
            <p id="nav-sk" />
            <p id="title-sk" />
            <div class="uk-child-width-expand@s uk-text-center" uk-grid>
                <div>
                    <div class="uk-card uk-card-default uk-card-body uk-border-rounded">
                        <div class="uk-grid uk-grid-small">
                            <div class="uk-width-1-2@l uk-width-1-2@m ">
                                <p id="mm-sk" />
                            </div>
                            <div class="uk-width-1-2@l uk-width-1-3@m">
                                <p id="name-sk" />
                                <p id="number-sk" />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="uk-card uk-card-default uk-card-body uk-border-rounded">
                        <div class="uk-grid uk-grid-small">
                            <div class="uk-width-1-2@l uk-width-1-2@m ">
                                <p id="mm-sk" />
                            </div>
                            <div class="uk-width-1-2@l uk-width-1-3@m">
                                <p id="name-sk" />
                                <p id="number-sk" />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="uk-card uk-card-default uk-card-body uk-border-rounded">
                        <div class="uk-grid uk-grid-small">
                            <div class="uk-width-1-2@l uk-width-1-2@m ">
                                <p id="mm-sk" />
                            </div>
                            <div class="uk-width-1-2@l uk-width-1-3@m">
                                <p id="name-sk" />
                                <p id="number-sk" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="uk-container-xl uk-margin-top" style="margin-bottom: 64px;">
                <div class="uk-card uk-card-default uk-card-body uk-padding-small uk-border-rounded">
                    <p id="nav-sk"/>
                    <p id="title-sk"/>
                </div>
            </div>
            
        </template>
    </div>
</template>



<style scoped>
#nav-sk {
    width: 20%;
    height: 16px;
    border-radius: 20px 20px;
    animation: pulse-bg 1s infinite;
}

#title-sk {
    width: 10%;
    height: 12px;
    border-radius: 20px 20px;
    animation: pulse-bg 1s infinite;
}

#name-sk {
    width: 100%;
    height: 12px;
    border-radius: 20px 20px;
    animation: pulse-bg 1s infinite;
}

#number-sk {
    width: 50%;
    height: 20px;
    border-radius: 20px 20px;
    animation: pulse-bg 1s infinite;
}

#mm-sk {
    width: 100%;
    height: 100px;
    border-radius: 20px 20px;
    animation: pulse-bg 1s infinite;
}


</style>