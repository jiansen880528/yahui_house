<template>
    <div class="main">
        <bread-crumb></bread-crumb>
        <!-- 子路由出口，即渲染在此处 -->
        <router-view></router-view>
    </div>
</template>
<script>
import BreadCrumb from '@/components/BreadCrumb/index.vue';
export default{
    components:{
        BreadCrumb
    }
}
</script>

