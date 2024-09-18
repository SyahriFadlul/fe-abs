<script setup>

</script>

<template>
        <div
            class="uk-position-fixed uk-position-bottom uk-container uk-container-expand round-top-large uk-hidden@s uk-text-center uk-position-z-index">
            <nav class="uk-navbar-container uk-navbar-transparent uk-navbar uk-background-default" uk-navbar>
                <div class="uk-navbar-center">
                    <ul class="uk-navbar-nav uk-text-center">
                        <li>
                            <div>
                                <a href="" class="uk-button uk-padding-remove uk-margin-remove"
                                    uk-toggle="target: #offcanvas-nav">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-menu"
                                        width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                        fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M4 8l16 0" />
                                        <path d="M4 16l16 0" />
                                    </svg>
                                </a>
                                <div class="uk-navbar-subtitle">Menu 1</div>
                                <div id="offcanvas-nav" uk-offcanvas="overlay: true">
                                    <div class="uk-offcanvas-bar">
                                        <ul class="uk-nav uk-nav-default">
                                            <li>
                                                <a href="/dashboard"><span class="uk-margin-small-right"
                                                        uk-icon="icon: table"></span> Dashboard</a>
                                            </li>
                                            <li>
                                                <a href="/dashboard/product"><span class="uk-margin-small-right"
                                                        uk-icon="icon: thumbnails"></span> Product</a>
                                            </li>
                                            <li class="uk-nav-divider"></li>
                                            <li>
                                                <a href="/dashboard/order"><span class="uk-margin-small-right"
                                                        uk-icon="icon: trash"></span> Order</a>
                                            </li>
                                            <li>
                                                <a href="/dashboard/user"><span class="uk-margin-small-right"
                                                        uk-icon="icon: trash"></span> User</a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <!-- <li>
                            <div>
                                <a href="/dashboard/menu" class="uk-button uk-padding-remove uk-margin-remove">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-menu"
                                        width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                        fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M4 8l16 0" />
                                        <path d="M4 16l16 0" />
                                    </svg>
                                </a>
                                <div class="uk-navbar-subtitle">Menu 2</div>
                            </div>
                        </li> -->
                        <li>
                            <div>
                                <a href="/dashboard" class="uk-button uk-padding-remove uk-margin-remove">
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
                                </a>
                                <div class="uk-navbar-subtitle">Home</div>
                            </div>
                        </li>
                        <li>
                            <div>
                                <a href="/dashboard/product" class="uk-button uk-padding-remove uk-margin-remove">
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
                                </a>
                                <div class="uk-navbar-subtitle">Product</div>
                            </div>
                        </li>
                        <li>
                            <div>
                                <a href="/dashboard/order" class="uk-button uk-padding-remove uk-margin-remove">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-menu-order"
                                        width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor"
                                        fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M4 10h16" />
                                        <path d="M4 14h16" />
                                        <path d="M9 18l3 3l3 -3" />
                                        <path d="M9 6l3 -3l3 3" />
                                    </svg>
                                </a>
                                <div class="uk-navbar-subtitle">Order</div>
                            </div>
                        </li>
                        <li>
                            <div>
                                <a href="/dashboard/user" class="uk-button uk-padding-remove uk-margin-remove">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user"
                                        width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="black"
                                        fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                                        <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                                    </svg>
                                </a>
                                <div class="uk-navbar-subtitle">User</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
</template>