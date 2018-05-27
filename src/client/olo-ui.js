

const Vue = require("vue/dist/vue.js");

const VueMaterial = require("vue-material/dist/vue-material.min.js");
Vue.use(VueMaterial.default);

require('vue-material/dist/vue-material.css');
require('vue-material/dist/theme/default.css');

require('./olo-ui.css');


module.exports = (doc, store) => Object({
    
    template: require('./olo-ui.html'),
    
    components: {
        'ace-editor': () => import(/* webpackChunkName: "editor" */ 'vue2-ace-editor'),
    },
    
    data: () => Object({
        
        doc: doc,
        
        rendering: "",
        
        editMode: false,
        
        editorOptions: {
            fontSize: "12pt",
            showLineNumbers: false,
            showGutter: false
        },
        
        user: {
            id: null,
            token: null
        },
        
        message: {
            show: false,
            text: "",
        }                
    }),
    
    watch: {
        doc: {
            handler () {
                this.render();
            },
            deep: true
        }
    },    
    
    methods: {
        
        async render () {
            const scope = {};
            this.rendering = await this.doc.renderTemplate(scope);
        },
        
        save () {
            console.log("Saving document ...");
            store.write(location.pathname, this.doc)
            .then(() => {
                this.message.text = "Document saved";
                this.message.show = true;
            })
            .catch((err) => {
                console.dir(err);
                this.message.text = String(err);
                this.message.show = true;                
            });
        },
        
        reload () {
            store.clearCache();
            this.render()
            .then(() => {
                this.message.text = "Document reloaded";
                this.message.show = true;
            });
        },
        
        signin () {
            store.signin();
        },
        
        signout () {
            store.signout();
        },
        
        initEditor () {
            require('brace/ext/language_tools') //language extension prerequsite...
            require('brace/mode/html')                
            require('brace/theme/chrome')
        }
    },
    
    mounted () {
        store.getUser()
        .then((user) => {
            this.user.id = user.id;
        });
        this.render();
    }
});
