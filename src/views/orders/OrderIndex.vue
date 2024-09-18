<script setup>
import { useRouter } from 'vue-router';
import { useProductStore } from '../../stores/product';
import { onMounted } from 'vue';

const productStore = useProductStore()
const router = useRouter()

const rupiahNum = function (num) {
    let price = String(num)
    price = price.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    return price + ',00';
}

const redirectToImageShowPage = function (id) {
    router.push(`products/image/${id}`)
}

const detailProduct = function (data) {
    router.push('/dashboard/products/' + data)
}

onMounted(async () => {
    productStore.loadPage(false)
    await productStore.getProducts()
    productStore.loadPage(true)
})
</script>
<template>
    <div class="" id="">
        <div>
            <div class="list-header">
                <div class="uk-grid-small uk-flex-middle uk-grid" uk-grid>
                    <div class="uk-width-expand">
                        <strong style="color: #003245; font-size: 24px;">Order</strong>
                        <ul class="uk-breadcrumb uk-margin-remove uk-padding-remove uk-visible@l">
                            <li>
                                <a href="/dashboard" class="uk-text-capitalize">Beranda</a>
                            </li>
                            <li>
                                <a class="uk-text-capitalize uk-flex-inline">
                                    <span>
                                        <p>Order Dummy</p>
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="uk-width-auto">
                        <div class="uk-button-group rounded uk-box-shadow-small">
                            <a href="/dashboard/products" class="uk-button uk-button-small uk-border-rounded" as="button"
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
                            <a href="/dashboard/products/create" class="uk-button uk-button-small uk-border-rounded"
                                style="background-color: #62A9C4; color:#fff;" aria-expanded="false">
                                <i>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus"
                                        width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                        fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M12 5l0 14" />
                                        <path d="M5 12l14 0" />
                                    </svg>
                                </i>
                                <span class="uk-visible@m uk-text-capitalize">Tambah</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="uk-sticky-placeholder" hidden style="height: 32px; margin: 0px 0px 0px -15px;"></div>
            </div>
            <div class="uk-card uk-card-default uk-visible@s uk-border-rounded">
                <div class="uk-card-body uk-padding-small uk-overflow-auto uk-flex-center uk-flex-top"
                    style="min-height: calc(239.2px);">
                    <table v-if="productStore.ready"
                        class="uk-table uk-table-hover uk-table-small uk-table-top uk-table-divider uk-table-striped uk-table-middle">
                        <thead>
                            <tr>
                                <th class="uk-shrink uk-text-capitalize" style="color: #003245; font-weight: 700;">
                                    <div>
                                        <span>No.</span>
                                    </div>
                                </th>
                                <th class="uk-text-capitalize " style="color: #003245; font-weight: 700;">
                                    <div>
                                        <span class="uk-table-expand">Order</span>
                                    </div>
                                </th>
                                <th class="uk-text-capitalize uk-text-center" style="color: #003245; font-weight: 700;">
                                    <div>
                                        <span class="uk-table-shrink">Date</span>
                                    </div>
                                </th>
                                <th class="uk-text-capitalize uk-text-center" style="color: #003245; font-weight: 700;">
                                    <div>
                                        <span class="uk-table-expand">User</span>
                                    </div>
                                </th>
                                <th class="uk-text-capitalize uk-text-center" style="color: #003245; font-weight: 700;">
                                    <div>
                                        <span class="uk-table-expand">Detail</span>
                                    </div>
                                </th>
                                <th class="uk-text-capitalize uk-text-center" style="color: #003245; font-weight: 700;">
                                    <div>
                                        <span class="uk-table-expand">Payment</span>
                                    </div>
                                </th>
                                <th class="uk-text-capitalize uk-text-center" style="color: #003245; font-weight: 700;">
                                    <div>
                                        <span class="uk-table-shrink">Status Order</span>
                                    </div>
                                </th>
                                <th class="uk-text-capitalize uk-text-center" style="color: #003245; font-weight: 700;">
                                    <div>
                                        <span class="uk-table-shrink">Action</span>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="cursor-pointer">
                            <tr>
                                <td class="uk-table-shrink uk-text-center">1</td>
                                <td class="uk-table-shrink uk-text-center">#001</td>
                                <td class="uk-width-small uk-text-center">28-01-2024</td>
                                <td class="uk-width-small uk-text-center">Jamal</td>
                                <td class="uk-width-small uk-text-center">
                                    <div class="uk-button-group rounded uk-box-shadow-small">
                                        <a href="/dashboard/order/details"
                                            class="uk-button uk-button-small uk-border-rounded"
                                            style="background-color: #0CC701; color:#fff;" aria-expanded="false">
                                            <span class="uk-visible@m uk-text-capitalize">Detail Order</span>
                                        </a>
                                    </div>
                                </td>
                                <td class="uk-width-small uk-text-center">BCA</td>
                                <td class="uk-width-small uk-visible@m uk-text-center">Dikirim</td>
                                <td class="uk-table-expand uk-text-center">
                                    <div class="uk-margin">
                                        <select class="uk-select" aria-label="Select">
                                            <option class="uk-text-center">Dikemas</option>
                                            <option class="uk-text-center">Dikirim</option>
                                            <option class="uk-text-center">Selesai</option>
                                        </select>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="uk-table-shrink uk-text-center">2</td>
                                <td class="uk-table-shrink uk-text-center">#002</td>
                                <td class="uk-width-small uk-text-center">28-01-2024</td>
                                <td class="uk-width-small uk-text-center">Syahri</td>
                                <td class="uk-width-small uk-text-center">
                                    <div class="uk-button-group rounded uk-box-shadow-small">
                                        <a href="/dashboard/products/create"
                                            class="uk-button uk-button-small uk-border-rounded"
                                            style="background-color: #0CC701; color:#fff;" aria-expanded="false">
                                            <span class="uk-visible@m uk-text-capitalize">Detail Order</span>
                                        </a>
                                    </div>
                                </td>
                                <td class="uk-width-small uk-text-center">BCA</td>
                                <td class="uk-width-small uk-visible@m uk-text-center">Dikirim</td>
                                <td class="uk-table-expand uk-text-center">
                                    <div class="uk-margin">
                                        <select class="uk-select" aria-label="Select">
                                            <option class="uk-text-center">Dikemas</option>
                                            <option class="uk-text-center">Dikirim</option>
                                            <option class="uk-text-center">Selesai</option>
                                        </select>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="uk-table-shrink uk-text-center">3</td>
                                <td class="uk-table-shrink uk-text-center">#003</td>
                                <td class="uk-width-small uk-text-center">28-01-2024</td>
                                <td class="uk-width-small uk-text-center">Abdul</td>
                                <td class="uk-width-small uk-text-center">
                                    <div class="uk-button-group rounded uk-box-shadow-small">
                                        <a href="/dashboard/products/create"
                                            class="uk-button uk-button-small uk-border-rounded"
                                            style="background-color: #0CC701; color:#fff;" aria-expanded="false">
                                            <span class="uk-visible@m uk-text-capitalize">Detail Order</span>
                                        </a>
                                    </div>
                                </td>
                                <td class="uk-width-small uk-text-center">Gopay</td>
                                <td class="uk-width-small uk-visible@m uk-text-center">Dikemas</td>
                                <td class="uk-table-expand uk-text-center">
                                    <div class="uk-margin">
                                        <select class="uk-select" aria-label="Select">
                                            <option class="uk-text-center">Dikemas</option>
                                            <option class="uk-text-center">Dikirim</option>
                                            <option class="uk-text-center">Selesai</option>
                                        </select>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <!-- <table v-else
                        class="uk-table uk-table-hover uk-table-small uk-table-top uk-table-divider uk-table-striped uk-table-middle">
                        <thead>
                            <tr>
                                <th class="uk-shrink uk-text-capitalize uk-text-center"
                                    style="color: #0CC701; font-weight: 700;">
                                    <div>
                                        <span>No.</span>
                                    </div>
                                </th>
                                <th class="uk-text-capitalize uk-text-center" style="color: #0CC701; font-weight: 700;">
                                    <div>
                                        <span class="uk-text-nowrap uk-table-shrink">Nama Produk</span>
                                    </div>
                                </th>
                                <th class="uk-text-capitalize uk-text-center" style="color: #0CC701; font-weight: 700;">
                                    <div>
                                        <span class="uk-table-shrink">Stok</span>
                                    </div>
                                </th>
                                <th class="uk-text-capitalize uk-text-center" style="color: #0CC701; font-weight: 700;">
                                    <div>
                                        <span class="uk-table-expand">Storage</span>
                                    </div>
                                </th>
                                <th class="uk-text-capitalize uk-visible@m uk-text-center"
                                    style="color: #0CC701; font-weight: 700;">
                                    <div>
                                        <span class="uk-table-expand">Harga</span>
                                    </div>
                                </th>
                                <th class="uk-text-capitalize uk-text-center" style="color: #0CC701; font-weight: 700;">
                                    <div>
                                        <span class="uk-table-shrink">Image</span>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody class="cursor-pointer">
                            <tr v-for="product in productStore.item" :key="product.id">
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
                                <td class="uk-visible@m">
                                    <div class="rkb-table "></div>
                                </td>
                                <td>
                                    <div class="rkb-table"></div>
                                </td>
                            </tr>
                        </tbody>
                    </table> -->
                </div>
            </div>
            <div class="uk-hidden@s uk-margin-small-top">
                <div v-for="product in productStore.item" :key="product.id"
                    class="uk-grid-small uk-child-width-1-1 uk-grid uk-grid-stack" uk-grid>
                    <div class="uk-margin-remove-vertical uk-grid-margin">
                        <div class="uk-card uk-card-default">
                            <div class="uk-card-header uk-padding-small">
                                <div class="uk-grid-small uk-flex-middle uk-grid uk-grid-stack" uk-grid>
                                    <div class="uk-width-expand">
                                        <h3 v-if="productStore.ready" class="uk-card-title uk-text-truncate">{{ product.name
                                        }}</h3>
                                        <h3 v-else class="uk-card-title uk-text-truncate name"></h3>
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
                            <table v-if="productStore.ready"
                                class="uk-table uk-table-hover uk-table-small uk-table-top uk-table-divider uk-margin-remove-top">
                                <tbody>
                                    <tr>
                                        <td class="uk-table-shrink uk-table-nowrap">
                                            <label class="uk-form-label uk-text-capitalize">Produk</label>
                                        </td>
                                        <td>
                                            <div>{{ product.name }}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="uk-table-shrink uk-table-nowrap">
                                            <label class="uk-form-label uk-text-capitalize">Stok</label>
                                        </td>
                                        <td>
                                            <div>{{ product.stock }}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="uk-table-shrink uk-table-nowrap">
                                            <label class="uk-form-label uk-text-capitalize">Penyimpanan</label>
                                        </td>
                                        <td>
                                            <div>{{ product.storage }}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="uk-table-shrink uk-table-nowrap">
                                            <label class="uk-form-label uk-text-capitalize">Harga</label>
                                        </td>
                                        <td>
                                            <div>{{ product.price }}</div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="uk-table-shrink uk-table-nowrap">
                                            <label class="uk-form-label uk-text-capitalize">Show Image</label>
                                        </td>
                                        <td>
                                            <a @click="redirectToImageShowPage(product.id)"><span>
                                                    <svg xmlns="http://www.w3.org/2000/svg"
                                                        class="icon icon-tabler icon-tabler-photo" width="24" height="24"
                                                        viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                                        fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                        <path d="M15 8h.01" />
                                                        <path
                                                            d="M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12z" />
                                                        <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5" />
                                                        <path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3" />
                                                    </svg>
                                                </span>
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table v-else
                                class="uk-table uk-table-hover uk-table-small uk-table-top uk-table-divider uk-margin-remove-top">
                                <tbody>
                                    <tr>
                                        <td class="uk-table-shrink uk-table-nowrap">
                                            <label class="uk-form-label uk-text-capitalize">Produk</label>
                                        </td>
                                        <td>
                                            <div class="rkb-table-mobile"></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="uk-table-shrink uk-table-nowrap">
                                            <label class="uk-form-label uk-text-capitalize">Stok</label>
                                        </td>
                                        <td>
                                            <div class="rkb-table-mobile"></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="uk-table-shrink uk-table-nowrap">
                                            <label class="uk-form-label uk-text-capitalize">Penyimpanan</label>
                                        </td>
                                        <td>
                                            <div class="rkb-table-mobile"></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="uk-table-shrink uk-table-nowrap">
                                            <label class="uk-form-label uk-text-capitalize">Harga</label>
                                        </td>
                                        <td>
                                            <div class="rkb-table-mobile"></div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="uk-table-shrink uk-table-nowrap">
                                            <label class="uk-form-label uk-text-capitalize">Show Image</label>
                                        </td>
                                        <td>
                                            <div class="rkb-table-mobile"></div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

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