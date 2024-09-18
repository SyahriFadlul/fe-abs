<script setup>
import { useAuthStore } from '../../stores/auth';

const authStore = useAuthStore()
</script>
<template>
    <div class="uk-background uk-margin-large-bottom">
        <div class="top">            
            <div class="uk-inline" style="font-weight: 500;margin-left: 4px;margin-top: 14px;">
                <router-link to="/" class="uk-text-decoration-none" style="color: #0CC701;">
                    <span uk-icon="icon: arrow-left; ratio: 1.5"></span>Kembali
                </router-link>
            </div>
            <div class="uk-grid uk-grid-small" uk-grid>
                <div class="uk-margin-small-left">
                    <img src="../../assets/user-circle.svg" alt="" width="100">
                </div>
                <div class="uk-margin-top uk-width-expand">
                    <div style="font-weight: 500;">{{ authStore.user.username }}</div>
                    <div class="uk-text-small" style="font-weight: 500;">{{ authStore.user.email }}</div>
                </div>
                <div class="uk-width-auto uk-margin-small-top">
                    <router-link to="/profile"><img class="uk-margin-small-right" src="../../assets/settings.svg" alt="" width="18"></router-link>
                    <!-- <img class="uk-margin-small-right" src="../../assets/cart.svg" alt="" width="18"> -->
                </div>
            </div>
        </div>
        <div class="bottom uk-padding-small">
            <div class="uk-card uk-card-small uk-card-body uk-card-default uk-box-shadow-medium uk-border-rounded">
                <div class="uk-inline circle"><img id="img1" src="../../assets/notes.svg" alt="" ></div>
                Daftar Transaksi</div>
            <div class="uk-card uk-card-small uk-card-body uk-card-default uk-box-shadow-medium uk-border-rounded">
                <div class="uk-inline circle"><img id="img2" src="../../assets/heart.svg" alt="" ></div>
                Wishlist</div>
            <div class="uk-card uk-card-small uk-card-body uk-card-default uk-box-shadow-medium uk-border-rounded">
                <div class="uk-inline circle"><img id="img3" src="../../assets/star.svg" alt="" ></div>
                Ulasan</div>
            <div class="uk-card uk-card-small uk-card-body uk-card-default uk-box-shadow-medium uk-border-rounded" @click="authStore.handleLogout()">
                <div class="uk-inline circle"><img id="img4" src="../../assets/logout.svg" alt="" ></div>
                Logout</div>
        </div>
    </div>
</template>


<style scoped>
.top {
    background-color: black;
    height: 155px;
    color: #0CC701;
}

.uk-border-rounded {
    /* outline: 1px solid; */
    margin-bottom: 10px;
}

.uk-border-rounded:active {
    background-color: aquamarine;
}

.bottom {
    font-weight: 500;
}

.circle {
    background-color: #0CC701;
    margin-right: 5px;
    height: 50px;
    width: 50px;
    padding: 5px;
    border-radius: 500px;
}

#img1 {
    margin-top: 6px;
    margin-left: 5px;
}
#img2 {
    margin-top: 9px;
    margin-left: 8px;
}
#img3 {
    margin-top: 8px;
    margin-left: 8px;
}
#img4 {
    margin-top: 8px;
    margin-left: 10px;
}
</style>