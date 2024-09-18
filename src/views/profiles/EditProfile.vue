<script setup>
import { useProfileStore } from '@/stores/profile'
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth'

const profileStore = useProfileStore()
const authStore = useAuthStore()
const isEditing = ref(false);
const selectedImage = ref(null);

const toggleEditing = () => {
    isEditing.value = !isEditing.value;
};

const backendPath = import.meta.env.VITE_API_BASE_URL

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    profileStore.user.photo_profile = file;

    const reader = new FileReader();
    reader.onload = () => {
        selectedImage.value = reader.result;
    };
    reader.readAsDataURL(file);
}

const saveProfile = async () => {
    await profileStore.updateProfile(authStore.user.id, profileStore.user);
    toggleEditing();
}

onMounted(async () => {
    // profileStore.clearResponses()
    profileStore.loadPage(false)
    await profileStore.getProfile(authStore.user.id)
    profileStore.loadPage(true)
})
</script>

<template>
    <div v-if="profileStore.ready" class="btnmargin">
        <div class="uk-grid-small uk-flex-middle uk-grid" uk-grid>
            <div class="uk-width-expand">
                <div class="uk-margin-remove-bottom">
                    <p v-if="!isEditing" class="title uk-text-bold uk-margin-large-bottom">Biodata Diri</p>
                    <p v-if="isEditing" class="title uk-text-bold uk-margin-large-bottom">Ubah Biodata Diri</p>
                </div>
            </div>
            <div v-if="!isEditing" class="uk-width-auto uk-grid-small uk-grid uk-grid-stack" uk-grid>
                <button @click="toggleEditing"
                    class="uk-button uk-button-small uk-border-rounded uk-button-primary uk-flex uk-flex-middle"
                    style="background-color: #0CC701;">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24"
                        viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                        stroke-linejoin="round">
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
                    style="background-color: #0CC701;">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-refresh" width="24"
                        height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                        stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
                        <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
                    </svg>
                    <span class="uk-visible@m uk-text-capitalize">Atur Ulang</span>
                </button>
            </div>
        </div>
        <form @submit.prevent="saveProfile" enctype="multipart/form-data" method="post">
            <div class="uk-visible@m uk-grid" uk-grid>
                <div class="uk-width-1-2">
                    <div class="uk-flex uk-width-1-1@s" style="margin-bottom: 20px;">
                        <div class="uk-width-1-3@m">Nama Depan</div>
                        <div class="uk-inline uk-width-expand@m">
                            <span v-if="!isEditing" class="uk-margin-remove uk-text-capitalize">
                                {{ profileStore.user.name !== null ? profileStore.user.name : '-' }}</span>
                            <input v-if="isEditing" v-model="profileStore.user.name" class="uk-input uk-width-1-1"
                                :placeholder="profileStore.user.name !== null ? profileStore.user.name : '-'">
                        </div>
                    </div>
                    <!-- <div class="uk-flex uk-width-1-1@s" style="margin-bottom: 20px;">
                        <div class="uk-width-1-3@m">Nama Belakang</div>
                        <div class="uk-inline uk-width-expand@m">
                            <span v-if="!isEditing" class="uk-margin-remove uk-text-capitalize">
                                {{ profileStore.user.lastName !== null ? profileStore.user.lastName : '-' }}</span>
                            <input v-if="isEditing" v-model="profileStore.user.lastName" class="uk-input uk-width-1-1"
                                :placeholder="profileStore.user.lastName !== null ? profileStore.user.lastName : '-'">
                        </div>
                    </div> -->
                    <div class="uk-flex uk-width-1-1@s" style="margin-bottom: 20px;">
                        <div class="uk-width-1-3@m">Email</div>
                        <div class="uk-inline uk-width-expand@m">
                            <span class="uk-margin-remove">
                                {{ authStore.user.email !== null ? authStore.user.email : '-' }}</span>
                        </div>
                    </div>
                    <div class="uk-flex uk-width-1-1@s" style="margin-bottom: 20px;">
                        <div class="uk-width-1-3@m">Nomor Telepon</div>
                        <div class="uk-inline uk-width-expand@m">
                            <span v-if="!isEditing" class="uk-margin-remove">
                                {{ profileStore.user.phone_number !== null ? profileStore.user.phone_number : '-' }}</span>
                            <input v-if="isEditing" v-model="profileStore.user.phone_number" class="uk-input uk-width-1-1">
                        </div>
                    </div>
                    <div class="uk-flex uk-width-1-1@s" style="margin-bottom: 20px;">
                        <div class="uk-width-1-3@m">Tanggal Lahir</div>
                        <div class="uk-inline uk-width-expand@m">
                            <span v-if="!isEditing" class="uk-margin-remove uk-text-capitalize">
                                {{ profileStore.user.birthday !== null ? profileStore.user.birthday : '-' }}</span>
                            <input v-if="isEditing" type="date" class="uk-input" v-model="profileStore.user.birthday"
                                placeholder="MM/DD/YYYY">
                        </div>
                    </div>
                    <div class="uk-flex uk-width-1-1@s" style="margin-bottom: 20px;">
                        <div class="uk-width-1-3@m">Jenis Kelamin</div>
                        <div class="uk-inline uk-width-expand@m">
                            <span v-if="!isEditing" class="uk-margin-remove uk-text-capitalize">
                                {{ profileStore.user.gender !== null ? profileStore.user.gender : '-' }}</span>
                            <div v-if="isEditing">
                                <label class="uk-margin-right">
                                    <input class="uk-radio" type="radio" name="radio1" v-model="profileStore.user.gender"
                                        value="Laki-laki"> Laki-laki
                                </label>
                                <label>
                                    <input class="uk-radio" type="radio" name="radio1" v-model="profileStore.user.gender"
                                        value="Perempuan"> Perempuan
                                </label>
                            </div>
                        </div>
                    </div>
                    <div v-if="isEditing" class="uk-margin-large-top">
                        <button type="submit"
                            class="uk-button uk-button-small uk-border-rounded uk-button-primary uk-float-middle uk-flex uk-flex-middle"
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
                    </div>
                </div>
                <div>
                    <hr class="uk-divider-vertical uk-visible@m" style="height: 100%; border: 1px solid;">
                </div>
                <div class="uk-width-auto">
                    <img v-if="selectedImage" :src="selectedImage" alt="Selected Image"
                        class="rts-profile-image uk-flex uk-flex-center uk-flex-middle">
                    <img v-else-if="profileStore.user.photo_profile"
                        :src="backendPath +'/storage/' + profileStore.user.photo_profile"
                        class="rts-profile-image uk-flex uk-flex-center uk-flex-middle">
                    <div v-if="isEditing">
                        <div style="margin: 0 0 0 150px">
                            <div class="uk-form-custom" uk-form-custom>
                                <input type="file" @change="handleFileUpload">
                                <button class="uk-button uk-button-default uk-border-rounded" type="button">Pilih
                                    Gambar</button>
                            </div>
                        </div>
                        <div style="margin: 0 0 0 130px">
                            <span>Ukuran gambar: maks. 1 MB</span><br>
                            <span>Format gambar: .JPEG, .PNG</span>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <!-- start skeleton -->
    <div v-else>
        <div class="uk-grid-small uk-flex-middle uk-grid" uk-grid>
            <div class="uk-width-expand">
                <div class="uk-margin-remove-bottom">
                    <p id="title-sk" />
                </div>
            </div>
            <div class="uk-width-auto uk-grid-small uk-grid uk-grid-stack" uk-grid>
                <button @click="toggleEditing" class="uk-button uk-button-small uk-border-rounded uk-button-primary"
                    style="background-color: #0CC701; width: 85px;height: 35px;">
                    <p uk-spinner="ratio: 0.8"></p>
                </button>
            </div>
        </div>
        <div class="uk-visible@m uk-grid" uk-grid>
            <div class="uk-width-1-2 uk-margin-medium-top">
                <div class="uk-flex uk-width-1-1@s uk-margin-small-bottom">
                    <div class="uk-width-1-3@m">
                        <p id="name-sk" />
                    </div>
                    <div class="uk-inline uk-width-expand@m">
                        <p id="name-sk" />
                    </div>
                </div>
                <div class="uk-flex uk-width-1-1@s uk-margin-small-bottom">
                    <div class="uk-width-1-3@m">
                        <p id="name-sk" />
                    </div>
                    <div class="uk-inline uk-width-expand@m">
                        <p id="name-sk" />
                    </div>
                </div>
                <div class="uk-flex uk-width-1-1@s uk-margin-small-bottom">
                    <div class="uk-width-1-3@m">
                        <p id="name-sk" />
                    </div>
                    <div class="uk-inline uk-width-expand@m">
                        <p id="name-sk" />
                    </div>
                </div>
                <div class="uk-flex uk-width-1-1@s uk-margin-small-bottom">
                    <div class="uk-width-1-3@m">
                        <p id="name-sk" />
                    </div>
                    <div class="uk-inline uk-width-expand@m">
                        <p id="name-sk" />
                    </div>
                </div>
                <div class="uk-flex uk-width-1-1@s uk-margin-small-bottom">
                    <div class="uk-width-1-3@m">
                        <p id="name-sk" />
                    </div>
                    <div class="uk-inline uk-width-expand@m">
                        <p id="name-sk" />
                    </div>
                </div>
                <div class="uk-flex uk-width-1-1@s uk-margin-small-bottom">
                    <div class="uk-width-1-3@m">
                        <p id="name-sk" />
                    </div>
                    <div class="uk-inline uk-width-expand@m">
                        <p id="name-sk" />
                    </div>
                </div>
            </div>
            <div class="uk-width-1-2">
                <p id="mm-sk" class="uk-margin-large-top" />
            </div>
        </div>
    </div>
    <!-- end skeleton -->
</template>

<style scoped>
#title-sk {
    width: 10%;
    height: 16px;
    border-radius: 20px 20px;
    animation: pulse-bg 1s infinite;
}

#name-sk {
    width: 50%;
    height: 16px;
    border-radius: 20px 20px;
    animation: pulse-bg 1s infinite;
}

#mm-sk {
    width: 40%;
    height: 210px;
    border-radius: 70%;
    animation: pulse-bg 1s infinite;
    margin-left: 160px;
}

.rts-profile-image {
    margin: 0 0 0 79px;
    /* background: #d9d9d9; */
    border-radius: 70%;
    padding: 40px;
    display: block;
    width: 300px;
    height: 300px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
}

@media only screen and (max-width: 320px) {
    .uk-margin-medium {
        font-weight: normal;
        font-size: 8px;
    }

    .uk-button {
        width: 30px;
        height: 40px;
        font-weight: normal;
        font-size: 8px;
        text-align: center;
    }

    .btnmargin {
        margin-bottom: 10px;
    }

    .uk-form-label {
        font-weight: normal;
        font-size: 12px;
    }

    .uk-input {
        font-weight: normal;
        font-size: 12px;
    }

    .uk-form-controls {
        font-weight: normal;
        font-size: 10px;
    }

    .select {
        font-weight: normal;
        font-size: 10px;
    }

    .title {
        color: black;
        font-size: 16px;
        font-weight: 700;
    }
}

@media only screen and (max-width: 768px) {
    .title {
        color: black;
        font-size: 24px;
        font-weight: 600;
    }
}
</style>