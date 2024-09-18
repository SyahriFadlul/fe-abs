<script setup>
import { onMounted, ref } from 'vue';
import { useUserStore } from '../../stores/user';
import { useAddressStore } from '../../stores/address';
import { useProfileStore } from '../../stores/profile'
import { useRouter } from 'vue-router';
import UIkit from 'uikit';
import router from '../../router';

const route = useRouter()
const userStore = useUserStore()
const addressStore = useAddressStore()
const profileStore = useProfileStore()

const deleteUserId = ref(null)
const isEditing = ref(false);
const data = ref({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    gender: "",
    birthday: "",
    phone_number: "",
    photo_profile: "",
});

function supdateProfileDashboard(datas, id) {
    data.value.firstName = profileStore.userShowProfile.firstName
    data.value.lastName = profileStore.userShowProfile.lastName
    data.value.username = userStore.userOne.username
    data.value.email = userStore.userOne.email
    data.value.gender = profileStore.userShowProfile.gender
    data.value.birthday = profileStore.userShowProfile.birthday
    data.value.phone_number = profileStore.userShowProfile.phone_number
    data.value.photo_profile = profileStore.userShowProfile.photo_profile

    userStore.updateProfileDashboard(data, id)
    toggleEditing();
}


const props = defineProps({
    id: {
        type: String,
        required: true
    }
})

const toggleEditing = () => {
    isEditing.value = !isEditing.value;
};

const modalDeleteUser = (id) => {
    deleteUserId.value = id;
    UIkit.modal("#modal-delete").show();
}

const destroyUser = () => {
    if (deleteUserId.value !== false) {
        userStore.destroyUser(deleteUserId.value);
        deleteUserId.value = false
        UIkit.modal("#modal-delete").hide();
    }
    router.push('/dashboard/users');
}

onMounted(async () => {
    userStore.loadPage(false)
    await userStore.getUser(props.id)
    await profileStore.getUserProfile(props.id)
    console.log(profileStore.userFirstName);
    await addressStore.getUserAddresses(props.id)
    userStore.loadPage(true)
})

</script>

<template>
    <div>
        <div v-if="userStore.ready">
            <div class="list-header">
                <div class="uk-grid-small uk-flex-middle uk-grid" uk-grid>
                    <div class="uk-width-expand">
                        <strong style="color: #003245; font-size: 24px;">Users</strong>
                        <ul class="uk-breadcrumb uk-margin-remove uk-padding-remove uk-visible@l">
                            <li>
                                <a href="/dashboard" class="uk-text-capitalize">Beranda</a>
                            </li>
                            <li>
                                <a href="/dashboard/products" class="uk-text-capitalize">Users</a>
                            </li>
                            <li>
                                <a class="uk-text-capitalize uk-flex-inline">
                                    <span>
                                        <p>{{ userStore.userOne.name }}</p>
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="uk-width-auto">
                        <div class="uk-button-group rounded uk-box-shadow-small">
                            <a href="/dashboard/users" class="uk-button uk-button-small uk-border-rounded" as="button"
                                uk-tooltip="title: Back;
                            pos: left;" type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-left"
                                    width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                    fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M5 12l14 0" />
                                    <path d="M5 12l6 6" />
                                    <path d="M5 12l6 -6" />
                                </svg>
                                <span class="uk-visible@m uk-text-capitalize">Kembali</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="uk-sticky-placeholder" hidden style="height: 32px; margin: 0px 0px 0px -15px;"></div>
            </div>
            <div class="container-xl" uk-padding-small>
                <div class="uk-card uk-card-default">
                    <div class="uk-card-header uk-padding-small">
                        <div class="uk-grid-small uk-flex-middle uk-grid" uk-grid>
                            <div class="uk-width-expand">
                                <h3 class="uk-card-title uk-text-truncate">
                                    <p>{{ userStore.userOne.name }}</p>
                                </h3>
                            </div>
                            <div v-if="!isEditing" class="uk-width-auto uk-grid-small uk-grid uk-grid-stack" uk-grid>
                                <button @click="toggleEditing"
                                    class="uk-button uk-button-small uk-border-rounded uk-button-primary uk-flex uk-flex-middle"
                                    style="background-color: #62A9C4;">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit"
                                        width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                        fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                                        <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                                        <path d="M16 5l3 3" />
                                    </svg>
                                    <span class="uk-visible@m uk-text-capitalize">Edit</span>
                                </button>
                            </div>
                            <div v-if="isEditing" class="uk-width-auto uk-grid-small uk-grid uk-grid-stack" uk-grid>
                                <button @click="toggleEditing"
                                    class="uk-button uk-button-small uk-border-rounded uk-button-primary uk-flex uk-flex-middle"
                                    style="background-color: #62A9C4;">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-refresh"
                                        width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                        fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
                                        <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
                                    </svg>
                                    <span class="uk-visible@m uk-text-capitalize">Atur Ulang</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="uk-form-stacked" auto-complete="off">
                        <div class="uk-card-body uk-padding-remove-top uk-margin-top">
                            <div class="uk-grid-small uk-child-width-expand uk-flex-center uk-grid" uk-grid>
                                <div class="">
                                    <div class="uk-grid-small uk-grid" uk-grid>
                                        <div class="uk-width-1-1 uk-margin-medium-bottom uk-margin-medium-right">
                                            <div >
                                                <ul class="responsive-image uk-margin-medium-bottom">
                                                    <li class="uk-flex uk-flex-center">
                                                        <img src="../../assets/logo.png"
                                                            alt="">
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="uk-width-1-2@m uk-width-2-3@l">
                                    <div class="uk-grid-small uk-grid" uk-grid>
                                        <div class="uk-width-1-1 uk-width-1-2@s">
                                            <div class="uk-form-label uk-text-capitalize" style="font-weight: 700;">First
                                                Name
                                            </div>
                                            <div class="uk-form-controls uk-inline uk-width-1-1">
                                                <p v-if="!isEditing" class="uk-margin-remove uk-text-capitalize">{{
                                                    profileStore.userShowProfile.firstName }}</p>
                                                <input v-if="isEditing" v-model="profileStore.userShowProfile.firstName"
                                                    class="uk-input uk-width-1-1">
                                            </div>
                                        </div>
                                        <div class="uk-width-1-1 uk-width-1-2@s">
                                            <div class="uk-form-label uk-text-capitalize" style="font-weight: 700;">Last
                                                Name
                                            </div>
                                            <div class="uk-form-controls uk-inline uk-width-1-1">
                                                <p v-if="!isEditing" class="uk-margin-remove uk-text-capitalize">{{
                                                    profileStore.userShowProfile.lastName }}</p>
                                                <input v-if="isEditing" v-model="profileStore.userShowProfile.lastName"
                                                    class="uk-input uk-width-1-1">
                                            </div>
                                        </div>
                                        <div class="uk-margin-small-bottom uk-width-1-1 uk-width-1-2@s">
                                            <div class="uk-form-label">
                                                <div class="uk-form-label uk-text-capitalize" style="font-weight: 700;">Nama
                                                    Pengguna
                                                </div>
                                                <div class="uk-form-controls uk-inline uk-width-1-1">
                                                    <p v-if="!isEditing" class="uk-margin-remove uk-text-capitalize">{{
                                                        userStore.userOne.username }}</p>
                                                    <input v-if="isEditing" placeholder="Masukkan nama pengguna"
                                                        v-model="userStore.userOne.username" class="uk-input uk-width-1-1">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="uk-margin-small-bottom uk-width-1-1 uk-width-1-2@s">
                                            <div class="uk-form-label uk-text-capitalize" style="font-weight: 700;">Email
                                            </div>
                                            <div class="uk-form-controls uk-inline uk-width-1-1">
                                                <p v-if="!isEditing" class="uk-margin-remove">{{
                                                    userStore.userOne.email }}</p>
                                                <input v-if="isEditing" v-model="userStore.userOne.email"
                                                    class="uk-input uk-width-1-1">
                                            </div>
                                        </div>
                                        <div class="uk-margin-small-bottom uk-width-1-1 uk-width-1-2@s">
                                            <div class="uk-form-label uk-text-capitalize" style="font-weight: 700;">Jenis
                                                Kelamin
                                            </div>
                                            <div class="uk-form-controls uk-inline uk-width-1-1">
                                                <p v-if="!isEditing" class="uk-margin-remove">
                                                    {{ profileStore.userShowProfile.gender }}</p>
                                                <input v-if="isEditing" v-model="profileStore.userShowProfile.gender"
                                                    class="uk-input uk-width-1-1">
                                            </div>
                                        </div>
                                        <div class="uk-margin-small-bottom uk-width-1-1 uk-width-1-2@s">
                                            <div class="uk-form-label">
                                                <div class="uk-form-label uk-text-capitalize" style="font-weight: 700;">
                                                    Tanggal Lahir
                                                </div>
                                                <div class="uk-form-controls uk-inline uk-width-1-1">
                                                    <p v-if="!isEditing" class="uk-margin-remove">
                                                        {{ profileStore.userShowProfile.birthday }}</p>
                                                    <input v-if="isEditing" v-model="profileStore.userShowProfile.birthday"
                                                        class="uk-input uk-width-1-1" type="date">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="uk-margin-small-bottom uk-width-1-1 uk-width-1-2@s">
                                            <div class="uk-form-label">
                                                <div class="uk-form-label uk-text-capitalize" style="font-weight: 700;">
                                                    Nomor
                                                    Telepon
                                                </div>
                                                <div class="uk-form-controls uk-inline uk-width-1-1">
                                                    <p v-if="!isEditing" class="uk-margin-remove">
                                                        {{ profileStore.userShowProfile.phone_number }}</p>
                                                    <input v-if="isEditing"
                                                        v-model="profileStore.userShowProfile.phone_number"
                                                        class="uk-input uk-width-1-1">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="isEditing" class="uk-card-footer uk-padding-small" style="margin-bottom: 64px">
                        <button @click="supdateProfileDashboard(data, props.id)" type="submit"
                            class="uk-button uk-button-small uk-border-rounded uk-button-primary uk-float-right uk-flex uk-flex-middle"
                            style="background-color: #0CC701;">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-device-floppy"
                                width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" />
                                <path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                                <path d="M14 4l0 4l-6 0l0 -4" />
                            </svg>
                            Simpan
                        </button>
                        <button @click="modalDeleteUser($route.params.id)" type="submit"
                            class="uk-button uk-button-small uk-border-rounded uk-button-primary uk-float-left uk-flex uk-flex-middle"
                            style="background-color: #0CC701;">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24"
                                height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M4 7l16 0" />
                                <path d="M10 11l0 6" />
                                <path d="M14 11l0 6" />
                                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                            </svg>
                            Hapus
                        </button>
                    </div>
                </div>
                <div v-if="!isEditing" class="uk-margin">
                    <div class="uk-card uk-card-default uk-border-rounded">
                        <div class="uk-card-header uk-padding-small">
                            <div class="uk-grid-small uk-flex-middle uk-grid" uk-grid>
                                <div class="uk-width-expand">
                                    <h3 class="uk-card-title uk-text-truncate">
                                        <p>Alamat</p>
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div class="uk-form-stacked" auto-complete="off">
                            <div class="uk-card-body uk-padding-remove-top uk-margin-top">
                                <div class="uk-grid-small uk-grid" uk-grid>
                                    <div class="uk-margin uk-width-1-1 uk-width-1-1@s">
                                        <ul uk-accordion>
                                            <li v-for="address in addressStore.userAddress" :key="address.id"
                                                style="border-bottom: 2px solid #f8f8f8;">
                                                <a class="uk-accordion-title" style="font-weight: 700; " href>{{
                                                    address.detail
                                                }}</a>
                                                <span>{{ address.streetbuilding }}</span>
                                                <div class="uk-accordion-content" style=" margin-bottom: 15px;">
                                                    <div style="font-weight: 700;">{{ address.fullname }}</div>
                                                    <div>{{ address.phonenumber }}</div>
                                                    <div style="font-weight: 400; color: black;">{{ address.city }} {{
                                                        address.streetbuilding }}
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- start skeleton -->
        <div v-else>
            <div>
                <div class="uk-grid-small uk-flex-middle uk-grid" uk-grid>
                    <div class="uk-width-expand">
                        <p id="name-sk" />
                        <p id="nav-sk" style="margin-bottom: 12px;" />
                    </div>
                    <div class="uk-width-auto">
                        <div class="uk-button-group rounded uk-box-shadow-small">
                            <a href="/dashboard/users" class="uk-button uk-button-small uk-border-rounded" as="button"
                                uk-tooltip="title: Back;
                            pos: left;" type="button">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-left"
                                    width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                    fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <path d="M5 12l14 0" />
                                    <path d="M5 12l6 6" />
                                    <path d="M5 12l6 -6" />
                                </svg>
                                <span class="uk-visible@m uk-text-capitalize">Kembali</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="uk-sticky-placeholder" hidden style="height: 32px; margin: 0px 0px 0px -15px;"></div>
            </div>
            <div class="container-xl" uk-padding-small>
                <div class="uk-card uk-card-default">
                    <div class="uk-card-header uk-padding-small">
                        <div class="uk-grid-small uk-flex-middle uk-grid" uk-grid>
                            <div class="uk-width-expand">
                                <h3 class="uk-card-title uk-text-truncate">
                                    <p id="name-sk" />
                                </h3>
                            </div>
                            <div v-if="!isEditing" class="uk-width-auto uk-grid-small uk-grid uk-grid-stack" uk-grid>
                                <button @click="toggleEditing"
                                    class="uk-button uk-button-small uk-border-rounded uk-button-primary uk-flex uk-flex-middle"
                                    style="background-color: #62A9C4;">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit"
                                        width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                        fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                                        <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                                        <path d="M16 5l3 3" />
                                    </svg>
                                    <span class="uk-visible@m uk-text-capitalize">Edit</span>
                                </button>
                            </div>
                            <div v-if="isEditing" class="uk-width-auto uk-grid-small uk-grid uk-grid-stack" uk-grid>
                                <button @click="toggleEditing"
                                    class="uk-button uk-button-small uk-border-rounded uk-button-primary uk-flex uk-flex-middle"
                                    style="background-color: #62A9C4;">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-refresh"
                                        width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                        fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
                                        <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
                                    </svg>
                                    <span class="uk-visible@m uk-text-capitalize">Atur Ulang</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="uk-form-stacked" auto-complete="off">
                        <div class="uk-card-body uk-padding-remove-top uk-margin-top">
                            <div class="uk-grid-small uk-grid" uk-grid>
                                <div class="uk-width-1-1 uk-width-1-2@s">
                                    <p id="name-sk" />
                                    <p id="nav-sk" />
                                </div>
                                <div class="uk-width-1-1 uk-width-1-2@s">
                                    <p id="name-sk" />
                                    <p id="nav-sk" />
                                </div>
                                <div class="uk-width-1-1 uk-width-1-2@s">
                                    <p id="name-sk" />
                                    <p id="nav-sk" />
                                </div>
                                <div class="uk-width-1-1 uk-width-1-2@s">
                                    <p id="name-sk" />
                                    <p id="nav-sk" />
                                </div>
                                <div class="uk-width-1-1 uk-width-1-2@s">
                                    <p id="name-sk" />
                                    <p id="nav-sk" />
                                </div>
                                <div class="uk-width-1-1 uk-width-1-2@s">
                                    <p id="name-sk" />
                                    <p id="nav-sk" />
                                </div>
                                <div class="uk-width-1-1 uk-width-1-2@s">
                                    <p id="name-sk" />
                                    <p id="nav-sk" />
                                </div>
                                <div class="uk-width-1-1 uk-width-1-2@s">
                                    <p id="name-sk" />
                                    <p id="nav-sk" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="isEditing" class="uk-card-footer uk-padding-small" style="margin-bottom: 64px">
                        <button type="submit"
                            class="uk-button uk-button-small uk-border-rounded uk-button-primary uk-float-right uk-flex uk-flex-middle"
                            style="background-color: #0CC701;">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-device-floppy"
                                width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                fill="none" stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" />
                                <path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                                <path d="M14 4l0 4l-6 0l0 -4" />
                            </svg>
                            Simpan
                        </button>
                        <button @click="modalDeleteUser($route.params.id)" type="submit"
                            class="uk-button uk-button-small uk-border-rounded uk-button-primary uk-float-left uk-flex uk-flex-middle"
                            style="background-color: #0CC701;">
                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="24"
                                height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                stroke-linecap="round" stroke-linejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M4 7l16 0" />
                                <path d="M10 11l0 6" />
                                <path d="M14 11l0 6" />
                                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                            </svg>
                            Hapus
                        </button>
                    </div>
                </div>
                <div v-if="!isEditing" class="uk-margin">
                    <div class="uk-card uk-card-default uk-border-rounded">
                        <div class="uk-card-header uk-padding-small">
                            <div class="uk-grid-small uk-flex-middle uk-grid" uk-grid>
                                <div class="uk-width-expand">
                                    <h3 class="uk-card-title uk-text-truncate">
                                        <p id="name-sk" />
                                    </h3>
                                </div>
                            </div>
                        </div>
                        <div class="uk-form-stacked" auto-complete="off">
                            <div class="uk-card-body uk-padding-remove-top uk-margin-top">
                                <div class="uk-grid-small uk-grid" uk-grid>
                                    <div class="uk-margin uk-width-1-1 uk-width-1-1@s">
                                        <ul uk-accordion>
                                            <li v-for="address in addressStore.userAddress" :key="address.id"
                                                style="border-bottom: 2px solid #f8f8f8;">
                                                <a class="uk-accordion-title" style="font-weight: 700; " href>
                                                    <p id="name-sk" />
                                                </a>
                                                <p id="name-sk" class="uk-margin-remove-top" />
                                                <div class="uk-accordion-content" style=" margin-bottom: 15px;">
                                                    <p id="nav-sk" />
                                                    <p id="nav-sk" />
                                                    <p id="nav-sk" />
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- end skeleton -->
        <div id="modal-delete" uk-modal>
            <div class="uk-modal-dialog uk-modal-body uk-border-rounded">
                <h2 class="uk-modal-title uk-flex uk-flex-center uk-text-bold uk-text-large uk-margin-medium-bottom mt-1">
                    Apakah kamu yakin mau delete?</h2>
                <div class="uk-flex uk-flex-center">
                    <button class="uk-button uk-button-danger" @click="destroyUser">Ya</button>
                    <button class="uk-button uk-button-default uk-margin-large-left uk-modal-close">Tidak</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#name-sk {
    width: 10%;
    height: 16px;
    border-radius: 20px 20px;
    animation: pulse-bg 1s infinite;
}

#nav-sk {
    width: 30%;
    height: 16px;
    border-radius: 20px 20px;
    animation: pulse-bg 1s infinite;
}
</style>