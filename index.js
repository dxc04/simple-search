new Vue({
    el: '#app',
    template: `
        <div>
            <div class="wrapper">
                <div class="search-bar">
                    <div v-if="search_active">
                        <input v-model="search_query" class="search-query-input" placeholder="Type to Start Searching">
                        <ul v-show="search_query" class="search-list">
                            <li v-for="user in filteredList" :key="user.id" @click="showModal(user)">{{ user.name }}</li>
                        </ul>
                    </div>
                </div>
                <div>
                    <button class="search-button" @click="search_active = true"><i class="fa fa-search"/> SEARCH</button>
                </div>
            </div>
            <div v-show="show_modal" class="modal-container">
                <div class="modal-title">{{ selected_search }}</div>
                <div class="modal-body">Hello!</div>
                <div class="modal-footer">
                    <span class="cancel-modal" @click="hideModal">Cancel</span>
                    <span class="proceed-modal" @click="showDone">Proceed</span>
                </div>
            </div>
        </div>
    `,
    data: function() {
        return {
            search_query: '',
            search_active: false,
            show_modal: false,
            selected_search: '',
            list: []
        }
    },
    computed: {
        filteredList() {
            return this.list.filter(user => {
                return user.name.toLowerCase().includes(this.search_query.toLowerCase())
            })
        }
    },
    methods: {
        showModal (user) {
            this.show_modal = true
            this.selected_search = user.name
        },
        hideModal () {
            this.show_modal = false
            this.selected_search = ''
        },
        showDone() {
            this.hideModal()
            alert("Done!")
        }
    },
    mounted () {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(json => this.list = json)
    }
})
