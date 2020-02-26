<template>

    <div class="app-content content">
        <a-modal v-model="visible" title="Добавить пользователя" onOk="handleOk">
            <template slot="footer">
                <a-button key="back" @click="handleCancel">Назад</a-button>
            </template>
            <form class="needs-validation"  @submit.prevent="submitFile" novalidate>
                <div class="form-row">
                    <div class="col-12">
                        <div class="form-group">
                    <label>Имя</label>
                    <input type="text"   required v-model="first" class="form-control"   >
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-group">
                    <label >Фамилия</label>
                    <input type="text"  required v-model="last" class="form-control"  >
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-group">
                    <label>Компания</label>
                    <input type="text" class="form-control" required v-model="company"  >
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-group">
                    <label>Должность</label>
                    <input type="text" class="form-control" required v-model="tags"  >
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="form-group">
                            <label>Изображение</label>
                            <input type="file" id="file"  ref="file" v-on:change="handleFileUpload()"/>
                        </div>
                    </div>
                </div>
                <h1></h1>
                <button class="btn btn-relief-success"  type="submit">Отправить</button>
            </form>
        </a-modal>
        <div class="content-overlay"></div>
        <div class="header-navbar-shadow"></div>
        <div class="content-wrapper">
            <div class="content-header row">
                <div class="content-header-left col-md-9 col-12 mb-2">
                    <div class="row breadcrumbs-top">
                        <div class="col-12">
                            <h2></h2>
                            <div class="breadcrumb-wrapper col-12">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content-header-right text-md-right col-md-3 col-12 d-md-block d-none">
                    <div class="form-group breadcrum-right">
                        <div class="dropdown">
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-body">
    <section id="card-actions">

        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h4 class="card-title">Пользователи</h4>
                        <a @click="showModal" class="btn btn-relief-success mr-1"><i class="feather icon-edit-2"></i>Добавить пользователя</a>
                        <a class="heading-elements-toggle"><i class="fa fa-ellipsis-v font-medium-3"></i></a>
                        <div class="heading-elements">
                            <ul class="list-inline mb-0">
                            </ul>
                        </div>
                    </div>
                    <div class="card-content collapse show">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-sm-12">
                                    <a-table :columns="columns" :dataSource="data123">
                                        <div
                                                slot="filterDropdown"
                                                slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
                                                style="padding: 8px"
                                        >
                                            <a-input
                                                    v-ant-ref="c => searchInput = c"
                                                    :placeholder="`Search ${column.dataIndex}`"
                                                    :value="selectedKeys[0]"
                                                    @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                                                    @pressEnter="() => handleSearch(selectedKeys, confirm)"
                                                    style="width: 188px; margin-bottom: 8px; display: block;"
                                            />
                                            <a-button
                                                    type="primary"
                                                    @click="() => handleSearch(selectedKeys, confirm)"
                                                    icon="search"
                                                    size="small"
                                                    style="width: 90px; margin-right: 8px"
                                            >Поиск</a-button
                                            >
                                            <a-button @click="() => handleReset(clearFilters)" size="small" style="width: 90px"
                                            >Сброс</a-button
                                            >
                                        </div>
                                        <a-icon
                                                slot="filterIcon"
                                                slot-scope="filtered"
                                                type="search"
                                                :style="{ color: filtered ? '#108ee9' : undefined }"
                                        />
                                        <img slot="imageSrc" slot-scope="record" :src="record.imageSrc" v-bind:href="'/job/?id='+ record.hash" alt="element 05" width="100" class="mb-1">
                                        <a slot="name" slot-scope="record" v-bind:href="'/job/?id='+ record.hash">{{record.first}}</a>
                                        <span slot="customTitle">Имя</span>
                                        <span slot="tags" slot-scope="tags">
      <a-tag
              :color="tags==='Developer' ? 'volcano' : (tags.length > 5 ? 'geekblue' : 'green')"
      >
        {{tags.toUpperCase()}}
      </a-tag>
    </span>
                                    </a-table>
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

</template>

<script>
    import axios from "axios";
    const columns = [
        {
            title: '',
            key: 'imageSrc',
            scopedSlots: { customRender: 'imageSrc' },
        },
        {
            title: 'Имя',
            key: 'action',
            scopedSlots: { customRender: 'name' },
        },
        {
            title: 'Фамилия',
            dataIndex: 'last',
            key: 'last',
        },
        {
            title: 'Должность',
            key: 'tags',
            dataIndex: 'tags',
            scopedSlots: {
                filterDropdown: 'filterDropdown',
                filterIcon: 'filterIcon',
                customRender: 'tags',
            },
            onFilter: (value, record) => record.tags.toString().toLowerCase().includes(value.toLowerCase()),
            onFilterDropdownVisibleChange: visible => {
                if (visible) {
                    setTimeout(() => {
                        this.searchInput.focus();
                    });
                }
            }
        },
        {
            title: 'Компания',
            key: 'company',
            dataIndex: 'company',
            scopedSlots: {
                filterDropdown: 'filterDropdown',
                filterIcon: 'filterIcon',
                customRender: 'tags',
            },
            onFilter: (value, record) => record.company.toString().toLowerCase().includes(value.toLowerCase()),
            onFilterDropdownVisibleChange: visible => {
                if (visible) {
                    setTimeout(() => {
                        this.searchInput.focus();
                    });
                }
            }
        },
    ];

    export default {
        name: 'user123',
        data() {
            return {
                data123: [],
                columns,
                first : "",
                last : "",
                company : "",
                tags: "",
                file: '',
                searchText: '',
                searchInput: null,
                loading: false,
                visible: false,

            };
        },
        methods: {
            handleData (res) {
                this.data123 = res
            },
            showModal() {
                this.visible = true;
            },
            handleSearch(selectedKeys, confirm) {
                confirm();
                this.searchText = selectedKeys[0];
            },

            handleReset(clearFilters) {
                clearFilters();
                this.searchText = '';
            },
            handleCancel() {
                this.visible = false;
            },
            submitFile(){
                /*
                        Initialize the form data
                    */
                let formData = new FormData();

                /*
                    Add the form data we need to submit
                */
                formData.append('image', this.file);
                formData.append('first', this.first);
                formData.append('last', this.last);
                formData.append('company', this.company);
                formData.append('tags', this.tags);
                /*
                  Make the request to the POST /single-file URL
                */
                axios.post( '/api/company/create',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                ).then(function() {
                    this.$notification.success({
                        message: "Спасибо",
                        description: 'Пользователь создан'
                    })
                        .catch(function () {
                            this.$notification.warning({
                                message: "Что то пошло не так",
                                description: 'Пользователь  не создан'
                            })
                        });
                })
            },

                    /*
                      Handles a change on the file upload
                    */
                    handleFileUpload(){
                    this.file = this.$refs.file.files[0];
                }
        },
        mounted() {
            axios.get('api/company/get')
                .then(
                    res => this.handleData(res.data),
                    res => this.$notification.warning({
                        message: "Произошла ошибка",
                        description: res
                    }))
        }

    }
</script>

