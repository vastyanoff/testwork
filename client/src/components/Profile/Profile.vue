<template>
    <body class="vertical-layout vertical-menu-modern 2-columns  navbar-floating footer-static  " data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">
    <header123 />
    <div class="app-content content">
        <a-modal v-model="visible" title="Редактировать" onOk="handleOk">
            <template slot="footer">
                <a-button class="btn-relief-dark" key="back" @click="handleCancel">Назад</a-button>
            </template>
            <form class="needs-validation"  @submit.prevent="update" novalidate>
                <div class="form-row">
                        <label>Имя</label>
                        <input type="text"   required v-model="first" class="form-control"   >
                        <label >Фамилия</label>
                        <input type="text"  required v-model="last" class="form-control"  >
                        <label>Компания</label>
                        <input type="text" class="form-control" required v-model="company"  >
                        <label>Должность</label>
                        <input type="text" class="form-control" required v-model="tags"  >

                </div>
                <h1></h1>
                <button class="btn btn-relief-success" type="submit">Отправить</button>
            </form>
        </a-modal>
        <div class="content-overlay"></div>
        <div class="header-navbar-shadow"></div>
        <div class="content-wrapper">
            <div class="content-header row">
            </div>
            <div class="content-body">
                <section class="page-users-view">
                    <div class="row">
    <div class="col-12">
        <div class="card">
            <div class="card-header">
                <div class="card-body">
                    <img :src="profile.profile.imageSrc" alt="element 05" width="100" class="mb-1">
                    <h4 class="card-title">{{ profile.profile.first }}</h4>
                    <p class="card-text">{{ profile.profile.last }}</p>
                </div>
            </div>
            <div class="card-body">
                <h4 class="card-title">Данные о сотруднике:</h4>
                <div class="row">
                    <div class="col-12 col-sm-9 col-md-6 col-lg-5">
                        <table>
                            <tr>
                                <td class="font-weight-bold">Должность:</td>
                                <td>{{ profile.profile.tags }}</td>
                            </tr>
                            <tr>
                                <td class="font-weight-bold">Компания:</td>
                                <td>{{ profile.profile.company }}</td>
                            </tr>
                        </table>
                    </div>
                    <div class="col-12">
                        <a @click="showModal" class="btn btn-relief-success mr-1"><i class="feather icon-edit-1"></i>Редактировать</a>
                        <button @click="this.delete" class="btn btn-relief-danger mr-1"><i class="feather icon-trash-2"></i>  Удалить</button>
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
    import axios from "axios";
    import Header123 from "../Header/Header";
    const queryString = require('query-string');
    const parsed = queryString.parse(window.location.search);
    const {id} = parsed
    export default {
        name: 'profile123',

        components: {Header123},
        data() {
            return {
                profile: null,
                first : "",
                last : "",
                company : "",
                hash : "",
                tags: "",
                loading: false,
                visible: false,
            };
        },
        mounted() {
            axios.get(`/api/company/getbyid/${id}`)
                .then(response => (this.profile = response.data));
        },
        methods: {
            update: function () {
                let first = this.first
                let last = this.last
                let company = this.company
                let profile = this.profile
                let tags = this.tags
                axios.post(`/api/company/gid/${profile.profile.hash}`, {first, last, company, tags})
                    .then(response => (this.$notification.success({
                        message: "Спасибо",
                        description: response,
                    })))
            },
            delete: function () {
                let profile = this.profile
                axios.post(`/api/company/del/${profile.profile.hash}`)
                    .then(response => (this.$notification.warning({
                        message: "Потрачено",
                        description: response,
                    })))
            },
            showModal() {
                this.visible = true;
            },
            handleCancel() {
                this.visible = false;
            },
        },
        }
</script>