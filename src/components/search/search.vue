<template>
  <div class="item-box">
    <div class="block-box">
      <template v-for="item in searchConfig.searchItem.filter((item)=>!item.isSearchHide)">
        <div v-if="item.type" class="inline-box mg-r">
          <span class="label-sign">{{item.label}}</span>
          <el-input v-if="item.type == 'input'" v-model.trim="searchParams[item.key]" :style="item.width ? 'width:'+item.width : ''" class="input-item-middle" size="small" :placeholder="item.placeholder"></el-input>
          <el-select  v-else-if="item.type =='select'"  class="input-item-middle" size="small"
                      v-model="searchParams[item.key]"
                      :style="item.width ? 'width:'+item.width : ''"
                      :placeholder="item.placeholder"
                      :clearable="item.clearable"
                      :filterable="item.filterable"
                      :multiple="item.multiple">
            <template v-for="subItem in item.options">
              <el-option :label="subItem.label" :value="subItem.value"></el-option>
            </template>
          </el-select>
          <template v-else-if="item.items && item.type == 'check-group'">
            <template v-for="subItem in item.items">
              <el-checkbox v-model="searchParams[subItem.key]">{{subItem.label}}</el-checkbox>
            </template>
          </template>
          <template v-if="item.isSlot">
            <slot :name="item.slotName"></slot>
          </template>
        </div>
      </template>
    </div>
    <div class="block-box inline-r">
      <template v-for="item in searchConfig.searchMenu">
        <el-button v-if="item.type == 'search'" :type="item.style" size="small" @click="searchSubmit">{{item.label}}</el-button>
        <template v-if="item.isSlot">
          <slot :name="item.slotName"></slot>
        </template>
      </template>
      <el-button size="small" @click="resetSearch">重 置</el-button>
    </div>
  </div>

</template>
<script>
  import {mapActions,mapState} from 'vuex'
  export default{
    computed:{
      ...mapState(['searchConfig','searchParams'])
    },
    data:()=>({
      initSearch:{
        page:1,
        rows:20
      },
    }),
    methods:{
      ...mapActions(['setSearchParams','setToast']),

      searchSubmit(){
        const regType = UtilTool.parseCheck(this.searchConfig.searchItem)
        for(let i in this.searchParams){
          if(regType[i]){
            for(let j in regType[i]){
              let reg = regType[i][j]
              if(this.searchParams[i] && !this.searchParams[i].match(RegExpType[reg.type])){
                this.setToast({
                  isShow:true,
                  msg:reg.msg,
                  type:'warning'
                })
                return false
              }
            }
          }
        }
        this.$router.push({
          path: this.$route.path,
          query: Object.assign({},
            UtilTool.stringifyQuery(this.searchParams),
            this.initSearch,{t:new Date().getTime()})
        })
      },
      toBoolean(val){
        return (/^true$/g).test(val)
      },
      resetSearch(){
        let params = {}
        this.searchConfig.searchItem.forEach((item)=>{
          if(item.items){
            item.items.forEach((subItem)=>{
              params[subItem.key] = subItem.isClear ?  '' : subItem.intKey
            })
          } else {
            params[item.key] = item.isClear ? '' : item.intKey
          }
        })
        this.setSearchParams(params)
      },
    },
    watch:{
      '$route.name':function(){

      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
  .label-sign{
    display: inline-block;
    width: 80px;
  }
  .input-item-middle{
    width: 180px;
  }
</style>
