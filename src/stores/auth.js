import { defineStore } from "pinia";
import axios from "axios";
import {useProfileStore} from "@/stores/profile.js"
import UIkit from 'uikit';
import { useCartStore } from "./cart";


export const useAuthStore = defineStore("auth",{    
    state: () => ({
        authUser: null,
        authRole: [],
        authError:[],
        authStatus:null,
        authToken:[],
    }),
    getters:{
        user: (state) => state.authUser,
        token: (state) => state.authToken,
        role: (state) => state.authRole,
        error: (state) => state.authError,
        status: (state) => state.authStatus,
    },
    actions:{        
        clearErrors () {
            this.authError = []
        },

        async getUserInformation(){
            const profileStore = useProfileStore()
            const cartStore = useCartStore()
            
            if(this.authToken[0]){
                try {
                    await this.getUser()
        
                    const id = this.authUser.id
                    
                    await this.getRole()
                    await cartStore.getCarts()
                    await profileStore.getProfile(id)
                    
                } catch (error) {
                    console.log(error.message);                                                                
                }                        
            }
        },

        async getToken (){
            await axios.get('sanctum/csrf-cookie')
            .then(res => console.log(res)
            )
        },

        async getUser (){            
            await axios.get('api/user')
            .then((res)=>{
                this.authUser= res.data
            })
            .catch(err=>{
                console.log(err.message);
            })            
        },

        async getRole(){            
            const data = await axios.get('api/roles-and-permissions')
            if(data.data.length >0){
                this.authRole = data.data[0]
            }else{
                const defaultRole = ['default']
                this.authRole = defaultRole[0]
            }
        },

        async handleLogin (data){            
            this.authError = []
            // await this.getToken()
            
            await axios.post("api/login", {
                email:data.email,
                password:data.password 
            })
            .then(async (res)=>{                
                this.authToken = res.data.token
                // console.log(res.data.message);
                
                await this.getUserInformation()                
                if (this.authRole === 'admin') {
                    this.router.push('/dashboard')  
                } else {
                    this.router.push('/')  
                }                                     
            })
            .catch(err=>{
                if(err.response.status === 422){
                    this.authError = err.response.data.errors
                }
                console.log(err);
            })            
        },

        async handleLoginModal (data){
            
            this.authError = []

            await this.getToken()   
            await axios.post("api/login", {
                email:data.email,
                password:data.password 
            })
            .then(async (res)=>{                            
                UIkit.modal("#modal-login").hide();
                this.router.go(0);
                await this.getUserInformation()

            })
            .catch(err=>{
                if(err.response.status === 422){
                    this.authError = err.response.data.errors
                }
            })                           
        },

        async handleRegister (data) {
            this.authError = []
            await this.getToken()
            await axios.post("api/register", {
                name:data.name,
                username:data.username,
                email:data.email,
                password:data.password,
                password_confirmation:data.password_confirmation,
            })
            .then(async (res)=>{             
                this.router.push('/')
                await this.getUserInformation()
            })
            .catch(err=>{
                if(err.response.status === 422){
                    this.authError = err.response.data.errors                    
                }
            })
        },

        async handleLogout () {
            const profileStore = useProfileStore()
            const cartStore = useCartStore()
            await axios.post('api/logout')
            .then( res => {
                this.authToken = []
                this.authUser = null
                this.authRole = []
                cartStore.clearCart()                                  
                this.router.push('/')
            })
            .catch( err => {console.log(err.message);})
                                  
            
        },

        async handleForgotPassword (email) {
            this.authError = []
            this.authStatus = null
            this.getToken()
            await axios.post('api/forgot-password', {email:email})
            .then((res)=>{                
                this.authStatus = res.data.status
            })
            .catch((err)=>{
                if(err.response.status === 422){
                    this.authError = err.response.data.errors
                }
            })
        },

        async handleResetPassword (data) {
            this.authError = []
            this.authStatus = null
            await axios.post('reset-password' , data)
            .then((res)=>{
                this.router.push('api/login')
            })
            .catch((err)=>{
                console.log(err);
                if(err.response.status === 422){
                    this.authError = err.response.data.errors
                }
            })
        }
    },
    persist: {
        storage: localStorage
    },
})
