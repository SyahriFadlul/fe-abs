<script setup>
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
</script>

<template>
    <!-- <div uk-sticky="sel-target: .uk-navbar-container; cls-active: uk-navbar-sticky"> -->
        <nav class="uk-navbar-container">
            <!-- <div class="uk-navbar-left" style="margin-left: 24px;">
                <router-link class="navbar-brand d-flex align-items-center uk-text-decoration-none" to="/">
                    <img src="@/assets/logo.png" alt="logo" style="width: 150px;" class="uk-margin-small-left"/>                    
                </router-link>
            </div> -->
            <div class="uk-container" style="background-color: white;">
                <div uk-navbar>
                    <div class="uk-navbar-right">
                        <ul class="uk-navbar-nav">
                            <li style="">
                                <a href="#" class="uk-text-normal uk-visible@s" style="color: black">Hello, {{
                                    authStore.user.username
                                }}<span uk-navbar-parent-icon></span></a>
                                <div class="uk-navbar-dropdown uk-width-small"
                                    style="margin-top: 50px;">
                                    <ul class="uk-nav uk-navbar-dropdown-nav">
                                        <li><router-link to="/profile">Profile</router-link></li>
                                        <li>
                                            <router-link to="/">Lihat Website</router-link>
                                        </li>
                                        <li>
                                            <router-link :to="$route.path"
                                                @click.prevent="authStore.handleLogout()">Logout</router-link>
                                        </li>
                                    </ul>
                                </div>
                                <a class="uk-navbar-toggle uk-navbar-toggle-animate uk-hidden@s" uk-navbar-toggle-icon href="#"></a>
                                <div class="uk-navbar-dropdown uk-width-small"
                                    style="margin-top: 50px;">
                                    <ul class="uk-nav uk-navbar-dropdown-nav">
                                        <li><router-link to="/profile">Profile</router-link></li>
                                        <li>
                                            <router-link to="/">Lihat Website</router-link>
                                        </li>
                                        <li>
                                            <router-link :to="$route.path"
                                                @click.prevent="authStore.handleLogout()">Logout</router-link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    <!-- </div> -->
</template>