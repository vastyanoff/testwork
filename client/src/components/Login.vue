<template>
    <body class="footer-static bg-full-screen-image  blank-page blank-page"  data-col="1-column">
    <div class="app-content content">
        <div class="content-overlay"></div>
        <div class="header-navbar-shadow"></div>
        <div class="content-wrapper">
            <div class="content-header row">
            </div>
            <div class="content-body">
                <section class="row flexbox-container">
                    <div class="col-xl-8 col-11 d-flex justify-content-center">
                        <div class="card bg-authentication rounded-0 mb-0">
                            <div class="row m-0">
                                <div class="col-lg-6 d-lg-block d-none text-center align-self-center px-1 py-0">
                                    <img src="../app-assets/images/pages/login.png" alt="branding logo">
                                </div>
                                <div class="col-lg-6 col-12 p-0">
                                    <div class="card rounded-0 mb-0 px-2">
                                        <div class="card-header pb-1">
                                            <div class="card-title">
                                                <h4 class="mb-0">Вход</h4>
                                            </div>
                                        </div>

                                        <div class="card-content">
                                            <div class="card-body pt-1">
                                                <form class="form-horizontal m-t-20"  @submit.prevent="login" >
                                                    <input input required v-model="username" type="text"  class="form-control form-control-lg" placeholder="Пользователь"  name="username" aria-label="Username" >
                                                    <h1></h1>
                                                    <input required v-model="password" type="password" class="form-control form-control-lg" placeholder="Пароль" aria-label="Password"  name="password" >
                                                    <h1></h1>
                                                    <div class="form-group text-center">
                                                        <div class="col-xs-12 p-b-20">
                                                            <button  class="btn btn-block btn-relief-success"  type="submit">Вход</button>
                                                        </div>
                                                    </div>
                                                    <div class="form-group m-b-0 m-t-10">
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    </div>
    </body>
</template>

<script>
    export default {
        name: 'Login',
        props: {
            msg: String
        },
        data(){
            return {
                username : "",
                password : ""
            }
        },
        methods: {
            login: function () {
                let username = this.username
                let password = this.password
                this.$store.dispatch('login', { username, password })
                    .then(() => this.$router.push('/home'))
                    .catch(err =>  this.$notification.warning({
                        message: "Произошла ошибка",
                        description: err.message,
                    }))
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }
    ul {
        list-style-type: none;
        padding: 0;
    }
    li {
        display: inline-block;
        margin: 0 10px;
    }
    a {
        color: #42b983;
    }
</style>
