import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    userName: [],
    userShow: [],
    userError: [],
    errResp: [],
    userReady: false,
  }),
  getters: {
    userItem: (state) => state.userName,
    userOne: (state) => state.userShow,
    error: (state) => state.userError,
    errorResponse: (state) => state.errResp,
    ready: (state) => state.userReady,
  },
  actions: {
    loadPage(data) {
      this.userReady = data;
    },

    async getUsers() {
      await axios
        .get("api/users")
        .then((res) => {
          this.userName = res.data.data;
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    async getUser(id) {
      this.errResp = [];
      try {
        const response = await axios.get("api/users/" + id);
        this.userShow = response.data.data;
      } catch (error) {
        this.errResp = error.response.status;
      }
    },
    // async getUser(id) {
    //   this.errResp = [];
    //   try {
    //     const response = await axios.get("api/users/" + id);
    //     this.userShow = response.data.data;
    //     console.log(response)
    //   } catch (error) {
    //     this.errResp = error.response.status;
    //   }
    // },

    async updateProfileDashboard(data, id) {
      await axios
        .put("api/user-profiles/" + id , {
          // data
          firstName: data.value.firstName,
          lastName: data.value.lastName,
          username: data.value.username,
          email: data.value.email,
          gender: data.value.gender,
          birthday: data.value.birthday,
          phone_number: data.value.phone_number,
          photo_profile: data.value.photo_profile,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })
    },

    async destroyUser(id) {
      try {
        await axios.delete("api/users/" + id);
        await this.getUsers();
        this.userReady = true;
      } catch (error) {
        console.log(error);
      }
    },
  },
  persist:{
    storage: sessionStorage
  }
});
