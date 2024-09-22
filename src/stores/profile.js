import { defineStore } from "pinia";
import axios from "axios";
import UIkit from "uikit";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    profileUser: [], //buat profile user
    profileUserOne: [], //buat profile
    profileStatus: [],
    profileError: [],
    profileReady: false
  }),
  getters: {
    user: (state) => state.profileUser,
    userShowProfile: (state) => state.profileUserOne,
    status: (state) => state.profileStatus,
    error: (state) => state.profileError,
    ready: (state) => state.profileReady,
  },
  actions: {
    loadPage(data) {
      this.profileReady = data;
    },
    
    clearResponses() {
      this.profileError = [];
      this.profileStatus = [];
    },
    
    async getToken() {
      await axios.get("sanctum/csrf-cookie");
    },

    //buat profile user
    async getProfiles() {
      await axios
        .get("api/profile")
        .then((res) => {
          console.log(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async updateProfile(id, profileData) {
      const image =
        profileData.photo_profile instanceof File
          ? profileData.photo_profile
          : "";
      const formData = new FormData();
      formData.append("firstName", profileData.firstName);
      formData.append("lastName", profileData.lastName);
      formData.append("gender", profileData.gender);
      formData.append("birthday", profileData.birthday);
      formData.append("phone_number", profileData.phone_number);
      formData.append("_method", "PUT");
      formData.append("photo_profile", image);

      for (var entry of formData.entries()) {
        console.log(entry[0] + ", " + entry[1]);
      }
      console.log(profileData.photo_profile);
      await axios
        .post("api/profile/" + id, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => console.log(res.message))
        .catch((err) => console.log(err.message));
    },

    // ini buat profile dashboard
    async getUserProfile(id) {
      this.profileUser = [];
      try {
        const response = await axios.get("api/user-profile/" + id);
        this.profileUserOne = response.data.data[0];
        console.log(this.profileUserOne);
      } catch (error) {
        console.log(error.message);
      }
    },

    //ini buat yang di tampilan user profile
    async getProfile(id) {
      this.profileUser = [];
      await axios
        .get("api/profile/" + id)
        .then((res) => {
          this.profileUser = res.data;
          // console.log(res);
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
  },
  persist: {
    storage: sessionStorage,
  },
});
