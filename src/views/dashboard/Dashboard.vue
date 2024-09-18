<script setup>
import { onMounted } from 'vue';
import NavbarDashboard from './NavbarDashboard.vue';
import FooterDashboard from './FooterDashboard.vue';
// import -.side-barDashboard from './-.side-barDashboard.vue';

import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();


</script>

<template>
    <div class="wrapper">
        <div class="uk-flex uk-flex-between">
            <div class="uk-padding-small">
                <router-link class="uk-text-decoration-none" to="/">
                    <img src="@/assets/logo.png" alt="logo" style="width: 150px;" class=""/>                    
                </router-link>
            </div>
            <NavbarDashboard />
        </div>

    
    <div class="uk-flex dashboard">
        <!-- <-.side-barDashboard/> -->
        <!-- Side Bar -->
        <div class="side-bar uk-margin-right-large uk-card-small uk-card-default uk-width-1-5@l uk-width-1-3@m uk-width-1-2@s uk-background-default uk-visible@s"
            >
            <div class="uk-card uk-margin-small-left uk-margin-small-right">
                <div>
                    <div class="uk-margin-medium-top">
                        <span class="uk-margin-small-left">
                            <b style="font-size: 20px">Dashboard</b>
                        </span>
                        <router-link :to="{ name: 'admin.home' }" :class="{ 'active': $route.path === '/dashboard' }"
                            class="my-element uk-text-decoration-none uk-border-rounded"
                            style="font-size: 20px;font-weight: 500; margin-top: 10px">
                            <span class="uk-flex uk-flex-middle" style="margin-left: 28px;">
                                <i>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        class="icon icon-tabler icon-tabler-layout-dashboard" width="24" height="24"
                                        viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="black"
                                        stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M4 4h6v8h-6z" />
                                        <path d="M4 16h6v4h-6z" />
                                        <path d="M14 12h6v8h-6z" />
                                        <path d="M14 4h6v4h-6z" />
                                    </svg>
                                </i>
                                <span class="uk-name uk-text-emphasis uk-margin-small-left" style="margin-top: 4px;">
                                    Dashboard
                                </span>
                            </span>
                        </router-link>
                    </div>
                    <div class="uk-margin-small-top">
                        <span class="uk-margin-small-left">
                            <b style="font-size: 20px">Produk</b>
                        </span>
                        <router-link :to="{ name: 'admin.productList' }"
                            :class="{ 'active': $route.path === '/dashboard/products/list' }"
                            class="my-element uk-text-decoration-none uk-border-rounded"
                            style="font-size: 20px;font-weight: 500; margin-top: 10px"><span class="uk-flex uk-flex-middle"
                                style="margin-left: 28px;">
                                <i>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-box"
                                        width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                        fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5" />
                                        <path d="M12 12l8 -4.5" />
                                        <path d="M12 12l0 9" />
                                        <path d="M12 12l-8 -4.5" />
                                    </svg>
                                </i>
                                <span class="uk-name uk-text-emphasis uk-margin-small-left" style="margin-top: 4px;">
                                    Produk List
                                </span>
                            </span>
                        </router-link>
                        <router-link :to="{ name: 'admin.productIndex' }"
                            :class="{ 'active': $route.path === '/dashboard/products' }"
                            class="my-element uk-text-decoration-none uk-border-rounded"
                            style="font-size: 20px;font-weight: 500; margin-top: 10px"><span class="uk-flex uk-flex-middle"
                                style="margin-left: 28px;">
                                <i>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-box-seam"
                                        width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="black"
                                        fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M12 3l8 4.5v9l-8 4.5l-8 -4.5v-9l8 -4.5" />
                                        <path d="M12 12l8 -4.5" />
                                        <path d="M8.2 9.8l7.6 -4.6" />
                                        <path d="M12 12v9" />
                                        <path d="M12 12l-8 -4.5" />
                                    </svg>
                                </i>
                                <span class="uk-name uk-text-emphasis uk-margin-small-left" style="margin-top: 4px;">
                                    Barang
                                </span>
                            </span>
                        </router-link>
                    </div>
                    <div class="uk-margin-small-top">
                        <span class="uk-margin-small-left">
                            <b style="font-size: 20px">Order</b>
                        </span>
                        <router-link :to="{ name: 'admin.orderIndex' }"
                            :class="{ 'active': $route.path === '/dashboard/order' }"
                            class="my-element uk-text-decoration-none uk-border-rounded uk-text-muted"
                            style="font-size: 20px;font-weight: 500; margin-top: 10px"><span class="uk-flex uk-flex-middle"
                                style="margin-left: 28px;">
                                <i>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-layout-list"
                                        width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="black"
                                        fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path
                                            d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                                        <path
                                            d="M4 14m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                                    </svg>
                                </i>
                                <span class="uk-name uk-text-emphasis uk-margin-small-left" style="margin-top: 4px;">
                                    Order
                                </span>
                            </span>
                        </router-link>
                    </div>
                    <div class="uk-margin-small-top">
                        <span class="uk-margin-small-left">
                            <b style="font-size: 20px">User</b>
                        </span>
                        <router-link :to="{ name: 'admin.userIndex' }"
                            :class="{ 'active': $route.path === '/dashboard/users' }"
                            class="my-element uk-text-decoration-none uk-border-rounded uk-text-muted"
                            style="font-size: 20px;font-weight: 500; margin-top: 10px"><span class="uk-flex uk-flex-middle"
                                style="margin-left: 28px;">
                                <i>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user"
                                        width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="black"
                                        fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                                        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                    </svg>
                                </i>
                                <span class="uk-name uk-text-emphasis uk-margin-small-left" style="margin-top: 4px;">
                                    User
                                </span>
                            </span></router-link>
                    </div>
                </div>
            </div>
            <div class="uk-margin-medium-top">
                <!-- <router-link :to="$route.path"
                                                @click.prevent="authStore.handleLogout()">Logout</router-link> -->
                <router-link :to="$route.path" @click.prevent="authStore.handleLogout()"
                    class="my-element uk-text-decoration-none uk-border-rounded uk-text-muted"
                    style="font-size: 20px;font-weight: 500; margin-top: 10px; ">
                    <span class="uk-flex uk-flex-middle" style="margin-left: 28px;">
                        <i>
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-logout" width="24"
                                height="24" viewBox="0 0 24 24" stroke-width="2" stroke="black" fill="none"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />
                                <path d="M9 12h12l-3 -3" />
                                <path d="M18 15l3 -3" />
                            </svg>
                        </i>
                        <span class="uk-name uk-text-emphasis uk-margin-small-left" style="margin-top: 4px;">
                            Logout
                        </span>
                    </span>
                </router-link>
            </div>
        </div>
        <!-- Main -->
        <div class="uk-width-1-1 uk-background-muted" style="height: 100vh">            
            <div class="uk-container" style="height:100%">
                <RouterView/>
            </div>
        </div>
    </div>
    <FooterDashboard />
    </div>
</template>

<style scoped>
.wrapper {
    position: relative;
    top: 0;    
    overflow-y: initial;
}

.dashboard {
    display: flex;
    
}

/* .side-bar {    
        

} */

.main {
    height: 100vh; 
}

.my-element {
    width: 100%;
    border: flex;
    display: grid;
    place-content: left;
    transition: background-color 300ms, color 300ms;
    cursor: pointer;
    color: black;
    height: 52px;
}

.my-element .icon {
    margin-right: 8px;
}

.my-element:hover {
    background-color: #62A9C4;
}

.uk-flex:hover .uk-name {
    color: white;
}

.active {
    background-color: #62A9C4;
}</style>
