import Vue from 'vue';
import vue from 'vue';
import vuex from 'vuex'
import user from './modules/user/index.js'
// Vuex是针对Vuejs的状态管理工具。Vuex完美的结合了Vue的响应式数据。

// Vue可以直接触发methods中的方法，Vuex不行。为了处理异步，当你触发一个点击事件时，会通过dispatch来访问actions中的方法，
//     actions中的commit会触发mutations中的方法从而修改state的值，通过getters来把数据反映到视图。

// Vuex通过Vue.use(Vuex)，从而调用install方法，通过applyMixin(Vue)在任意组件执行this.$store都能访问到store对象，
//     实现将store挂载注入到组件中。

// Vuex的state状态是响应式的，是借助Vue的data是响应式，将state存入Vue实例组件的data中。

// Vuex的getters则是借助于Vue的计算属性computed实现数据的实时监听。

//应用vuex插件
Vue.use(vuex)

//创建并暴露store
export default new vuex.Store({
    //数据，相当于data
    state:{

    },
    //getters类似于computed(计算属性，对现有的状态进行计算得到新的数据),用于将state中的数据进行加工
    getters:{

    },
    //mutations使用它来操作数据(类似于methods)，Vuex里store状态更新的唯一方法，且必须是同步函数。
    //使用方式1：使用commit触发mutation中的方法 this.$store.commit('方法名',2)
    //使用方法2：借助mapMutations辅助函数映射
            // import {mapMutations} from 'vuex'

            // export default{

            // methods:{

            // ...mapMutations(['mutationCount'])

            // }

            // }
    mutations:{
        // mutationCount(state){

        //     state.count ++ ;
            
        //     }
    },
    //准备actions用于对组件响应，用于响应组件中的动作，发起异步请求
    // 用于提交mutation，而不是直接变更状态。可异步。

    // Action类似于Mutation，不同的在于：

        // (1)Action提交的是Mutation，而不是直接变更状态

        // (2)Action可以包含任何异步操作
    //使用方式1：
        // 使用store.dispatch来分发action。

        // methods:{

            // changeCountAsync(){

            // this.$store.dispatch('actionCount',res)

            // }
        // }
    //使用方式2：
        // 借助mapActions辅助函数映射

        // import {mapActions} from 'vuex'

        // export default{

        // methods:{

        // ...mapActions(['actionCount'])

        // }

        // }
    //最后，如果我们利用 async / await ，我们可以组合 action：
    //     // 假设 getData() 和 getOtherData() 返回的是 Promise
    //     actions: {  
    //     async actionA ({ commit }) {   
    //     commit('gotData', await getData())        
    //     },
        
    //     async actionB ({ dispatch, commit }) {       
    //     await dispatch('actionA') // 等待 actionA 完成       
    //     commit('gotOtherData', await getOtherData())       
    //     }        }
    // 一个 store.dispatch 在不同模块中可以触发多个 action 函数。在这种情况下，只有当所有触发函数完成后，返回的 Promise 才会执行
    
    actions:{

    },
    //模块拆分 +命名空间
    //目的：让代码更好维护，让多种数据分类更加明确
    //由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

    //为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：

    // 每个模块都拥有独立的state、getters、mutations、actions
    modules:{
        user,
    }
})