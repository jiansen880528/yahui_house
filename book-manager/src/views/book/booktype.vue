
import { Loading } from 'element-ui';

import { Loading } from 'element-ui';


<template>
    <div  v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
        图书类别管理
    </div>
</template>
<script>

export default{
    data(){
        return{
            loading: true
        }
    }
}
</script>
