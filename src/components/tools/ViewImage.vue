<template>
  <el-dialog :visible.sync="viewImageConfig.isShow" size="small">
    <div class="view-image-wrap">
      <img width="100%" :src="viewImageConfig.url" alt="">
    </div>
  </el-dialog>
</template>
<script>
  import {mapState, mapActions} from 'vuex'
  export default {
    computed:{
      ...mapState(['viewImageConfig'])
    },
    methods:{
      ...mapActions(['setViewImage'])
    },
  }
</script>
<style>
  .view-image-wrap{
    width: 200px;
  }
</style>
