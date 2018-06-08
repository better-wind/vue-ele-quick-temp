<template>
  <div>
    <v-head />
    <el-row class="layout-container">
      <el-col :span="4">
        <v-menu></v-menu>
      </el-col>
      <el-col :span="20">
        <div class="content-box">
          <transition name="move" mode="out-in"><router-view></router-view></transition>
        </div>
      </el-col>
    </el-row>

    <v-load />
    <v-load-progress />
    <v-toast />
    <v-view-image />
  </div>
</template>

<script>
  import vMenu from '@/components/common/Menu'
  import vHead from '@/components/common/Header'
  import vLoad from '@/components/tools/Loading'
  import vLoadProgress from '@/components/tools/LoadProgress'
  import vToast from '@/components/tools/Toast'
  import vViewImage from '@/components/tools/ViewImage'
  export default {
    name: 'Home',
    components:{
      vMenu,
      vHead,
      vLoad,
      vToast,
      vViewImage,
      vLoadProgress,
    }

  };
</script>

