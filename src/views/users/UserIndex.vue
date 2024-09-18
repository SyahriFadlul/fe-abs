<script setup>
import { useRouter } from 'vue-router';
import { useUserStore } from '../../stores/user';
import { onMounted, ref } from 'vue';
import UIkit from 'uikit';


const userStore = useUserStore()
const router = useRouter()

const detailUser = function (data) {
    router.push('/dashboard/users/' + data)
}

const deleteUserId = ref(null)

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
}

onMounted(async () => {
    userStore.loadPage(false)
    await userStore.getUsers()
    userStore.loadPage(true)
})
</script>
<template>
    <div>
        <div class="list-header">
            <div class="uk-grid-small uk-flex-middle uk-grid" uk-grid>
                <div class="uk-width-expand">
                    <strong style="color: #003245; font-size: 24px;">Users</strong>
                    <ul class="uk-breadcrumb uk-margin-remove uk-padding-remove uk-visible@l">
                        <li>
                            <a href="/dashboard" class="uk-text-capitalize">Beranda</a>
                        </li>
                        <li>
                            <a class="uk-text-capitalize uk-flex-inline">
                                <span>
                                    <p>Users</p>
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="uk-width-auto">
                    <div class="uk-button-group rounded uk-box-shadow-small">
                        <a href="/dashboard" class="uk-button uk-button-small uk-border-rounded" as="button"
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
        <div class="uk-card uk-card-default uk-visible@s uk-border-rounded">
            <div class="uk-card-body uk-padding-small uk-overflow-auto uk-flex-center uk-flex-top"
                style="min-height: calc(239.2px);">
                <table v-if="userStore.ready"
                    class="uk-table uk-table-hover uk-table-small uk-table-top uk-table-divider uk-table-striped uk-table-middle">
                    <thead>
                        <tr>
                            <th class="uk-shrink uk-text-capitalize" style="color: #003245; font-weight: 700;">
                                <div>
                                    <span>No.</span>
                                </div>
                            </th>
                            <th class="uk-text-capitalize" style="color: #003245; font-weight: 700;">
                                <div>
                                    <span class="uk-table-expand">Nama User</span>
                                </div>
                            </th>
                            <th class="uk-text-capitalize" style="color: #003245; font-weight: 700;">
                                <div>
                                    <span class="uk-table-expand">Username</span>
                                </div>
                            </th>
                            <th class="uk-text-capitalize" style="color: #003245; font-weight: 700;">
                                <div>
                                    <span class="uk-table-expand">Email</span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="cursor-pointer">
                        <tr v-for="(user, index) in userStore.userItem" :key="user.id">
                            <td class="uk-table-shrink uk-text-center">{{ index + 1 }}</td>
                            <td @click="detailUser(user.id)" uk-tooltip="pos: top-left;  title:  "
                                class="uk-table-expand">
                                {{ user.name }}
                            </td>
                            <td @click="detailUser(user.id)" class="uk-table-expand">{{ user.username }}</td>
                            <td @click="detailUser(user.id)" class="uk-table-expand">{{ user.email }}</td>
                        </tr>
                    </tbody>
                </table>
                <table v-else
                    class="uk-table uk-table-hover uk-table-small uk-table-top uk-table-divider uk-table-striped uk-table-middle">
                    <thead>
                        <tr>
                            <th class="uk-shrink uk-text-capitalize uk-text-center" style="color: #003245; font-weight: 700;">
                                <div>
                                    <span>No.</span>
                                </div>
                            </th>
                            <th class="uk-text-capitalize uk-text-center" style="color: #003245; font-weight: 700;">
                                <div>
                                    <span class="uk-table-expand">Nama User</span>
                                </div>
                            </th>
                            <th class="uk-text-capitalize uk-text-center" style="color: #003245; font-weight: 700;">
                                <div>
                                    <span class="uk-table-expand">Username</span>
                                </div>
                            </th>
                            <th class="uk-text-capitalize uk-text-center" style="color: #003245; font-weight: 700;">
                                <div>
                                    <span class="uk-table-expand">Email</span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="cursor-pointer">
                        <tr v-for="user in userStore.userItem" :key="user.id">
                                <td>
                                    <div class="rkb-table"></div>
                                </td>
                                <td>
                                    <div class="rkb-table"></div>
                                </td>
                                <td>
                                    <div class="rkb-table"></div>
                                </td>
                                <td>
                                    <div class="rkb-table"></div>
                                </td>
                            </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="uk-hidden@s uk-margin-small-top">
            <div v-for="user in userStore.userItem" :key="user.id"
                class="uk-grid-small uk-child-width-1-1 uk-grid uk-grid-stack" uk-grid>
                <div class="uk-margin-remove-vertical uk-grid-margin">
                    <div class="uk-card uk-card-default">
                        <div class="uk-card-header uk-padding-small">
                            <div class="uk-grid-small uk-flex-middle uk-grid uk-grid-stack" uk-grid>
                                <div class="uk-width-expand">
                                    <h3 class="uk-card-title uk-text-truncate">{{ user.name }}</h3>
                                </div>
                                <div class="uk-width-auto uk-grid uk-grid-stack" uk-grid>
                                    <button @click="detailProduct(product.id)"
                                        class="uk-button uk-button-small uk-border-rounded uk-button-secondary">
                                        <span class="navigation-side-icon material-icons uk-width-1-5@s">
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                class="icon icon-tabler icon-tabler-list-details" width="24" height="24"
                                                viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                                                stroke-linecap="round" stroke-linejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M13 5h8" />
                                                <path d="M13 9h5" />
                                                <path d="M13 15h8" />
                                                <path d="M13 19h5" />
                                                <path
                                                    d="M3 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                                                <path
                                                    d="M3 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
                                            </svg>
                                        </span>
                                        <span class="uk-visible@m">Lihat</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <table
                            class="uk-table uk-table-hover uk-table-small uk-table-top uk-table-divider uk-margin-remove-top">
                            <tbody>
                                <tr>
                                    <td class="uk-table-shrink uk-table-nowrap">
                                        <label class="uk-form-label uk-text-capitalize">Nama User</label>
                                    </td>
                                    <td>
                                        <div>{{ user.name }}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="uk-table-shrink uk-table-nowrap">
                                        <label class="uk-form-label uk-text-capitalize">Username</label>
                                    </td>
                                    <td>
                                        <div>{{ user.username }}</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="uk-table-shrink uk-table-nowrap">
                                        <label class="uk-form-label uk-text-capitalize">Email</label>
                                    </td>
                                    <td>
                                        <div>{{ user.email }}</div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
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
</template>


<style scoped>
span {
    padding: 0px;
}

.uk-table {
    max-height: 200px;
    overflow-y: auto;
}

.cursor-pointer {
    cursor: pointer;
}

.rkb-table {
    width: 100%;
    height: 16px;
    border-radius: 20px 20px;
    animation: pulse-bg 1s infinite;
}

.rkb-table-mobile {
    width: 100%;
    height: 24px;
    border-radius: 20px 20px;
    animation: pulse-bg 1s infinite;
}
.name {
    float: left;
    height: 24px;
    width: 65%;
    border-radius: 20px 20px;
    animation: pulse-bg 1s infinite;
}


</style>

