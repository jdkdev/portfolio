new Vue({
    el: '#app',
    data: {
        message: 'hello the'
    },
    created() {
        this.getJson()
    },
    filters: {
    },
    computed: {
    },
    methods: {
        getJson() {
            console.log('hello')
            let scssObj = "body {background: red; & > section {background: black;}}"
            axois.get('math?scss=' + scssObj)
            .then(res => console.log(res))
        }
    },
})
