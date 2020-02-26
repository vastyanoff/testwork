<template>
    <div>
        <nav class="header-navbar navbar-expand-lg navbar navbar-with-menu floating-nav navbar-light navbar-shadow">
            <div class="navbar-wrapper">
                <div class="navbar-container content">
                    <div class="navbar-collapse" id="navbar-mobile">
                        <div class="mr-auto float-left bookmark-wrapper d-flex align-items-center">
                            <ul class="nav navbar-nav">
                                <li class="nav-item mobile-menu d-xl-none mr-auto"><a class="nav-link nav-menu-main menu-toggle hidden-xs" href="#"><i class="ficon feather icon-menu"></i></a></li>
                            </ul>
                            <ul class="nav navbar-nav bookmark-icons">
                                <li class="nav-item d-none d-lg-block"><a class="nav-link" @click="logout" data-toggle="tooltip" data-placement="top" title="Выход"><i class="ficon feather icon-log-out"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    <div class="main-menu menu-fixed menu-light menu-accordion menu-shadow" data-scroll-to-active="true">
        <div class="navbar-header">
            <ul class="nav navbar-nav flex-row">
                <li class="nav-item mr-auto"><a class="navbar-brand" href="#">
                    <h2 class="brand-text mb-0">Рога и Копыта</h2>
                </a></li>
            </ul>
        </div>
        <div class="shadow-bottom"></div>
        <div class="main-menu-content">
            <ul class="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">
                <li class=" nav-item"><a href="/home"><i class="feather icon-home"></i><span class="menu-title" data-i18n="Dashboard">Пользователи</span></a>
                </li>
            </ul>
        </div>
    </div>
    </div>
</template>

<script>
    export default {
        name: 'header123',
        methods: {
            logout: function () {
                this.$store.dispatch('logout')
                    .then(() => {
                        this.$router.push('/')
                    })
            }
        },
    };
</script>