<template>
  <div>
    <div class="title-box">
      商品查询
    </div>
    <div class="section-box">
      <v-search />
      <v-result :get-search-list="getSearchList">
        <div slot="slot-detail" slot-scope="scope" >
          <p>品牌：{{scope.rs.brand}}</p>
          <p>价格：{{scope.rs.price}}</p>
        </div>
        <template slot="slot-operate" slot-scope="scope" >
          <el-button size="small" type="primary" @click="editDetail(scope.rs)">编辑</el-button>
        </template>

      </v-result>
    </div>
    <el-dialog :visible.sync="detailConfig.isShow" size="small">
      <div>
        <p><span class="label-sign">Id</span>{{detailConfig.rs.id}}</p>
        <p><span class="label-sign">名称</span>{{detailConfig.rs.name}}</p>
        <p><span class="label-sign">图片</span>
          <img :src="detailConfig.rs.imageUrl" alt="" style="width: 80px;height: 80px" />
        </p>
        <p>
          <span class="label-sign">详情</span>{{detailConfig.rs.detail}}
        </p>

      </div>

    </el-dialog>
  </div>
</template>
<script>
  import {mapActions} from 'vuex'
  import pageMix from '@/components/Mixin/searchPage'
  import vSearch from '@/components/search/search'
  import vResult from '@/components/search/result'
  export default{
    mixins:[pageMix],
    created(){
      this.initView()
    },
    data(){
      return {
        searchPage:{
          searchItem:[
            {
              type:'',
              key:'page',
              intKey:1
            },
            {
              type:'',
              key:'rows',
              intKey:20
            },
            {
              type:'input',
              label:'商品ID',
              placeholder:'商品ID',
              key:'baseGoodsCode',
              intKey:'', //初始值
              isClear:true, //重置是否清空
              regType:[
                {
                  type:'Num',
                  msg:'ID请输入数字'
                }
              ],
            },
            {
              type:'input',
              label:'商品名称',
              placeholder:'商品名称',
              key:'baseGoodsName',
              intKey:'', //初始值
              isClear:true, //重置是否清空
            },
            {
              type:'select',
              label:'出售状态',
              filterable:false, //是否可模糊匹配
              clearable:true,//是否可清除
              placeholder:'出售状态',
              key:'status',
              intKey:'',
              options:[
                {
                  label:'出售中',
                  value:'1'
                },
                {
                  label:'待出售',
                  value:'2'
                },
              ]
            },
            {
              type:'select',
              label:'商品分组',
              filterable:true, //是否可模糊匹配
              placeholder:'商品分组',
              key:'managerGroupId',
              intKey:'',
              options:[
                {
                  label:'一一一一一一一一',
                  value:'1'
                },
                {
                  label:'二二二二二二二二',
                  value:'2'
                },
                {
                  label:'三三三三三三三三',
                  value:'3'
                },
              ]
            },
            {
              type:'select',
              label:'状态码',
              filterable:false, //是否可模糊匹配
              multiple:true,
              placeholder:'状态码',
              key:'tagId',
              intKey:[],
              options:[
                {
                  label:'超爆款',
                  value:'1'
                },
                {
                  label:'爆款',
                  value:'2'
                }
              ]
            },
            {

            }
          ],
          searchMenu:[
            {
              label:'查询',
              type:'search',
              style:'primary',
            },
            {
              isSlot:true,
              slotName:'private-menu',
            }
          ],
          searchResult:[
            {
              label:'ID',
              key:'id',
              width:'120',
              align:'center'
            },
            {
              label:'主图',
              key:'imageUrl',
              width:'120',
              type:'image',
              align:'center'
            },
            {
              label:'名称',
              key:'name',
              align:'center'
            },
            {
              label:'详情',
              type:'slot',
              width:'580',
              slotName:'slot-detail',
              key:'detail',
              align:'center'
            },
            {
              label:'操作',
              key:'operate',
              width:'160',
              type:'slot-operate',
              slotName:'slot-operate',
              align:'center',
              items:[
                {
                  label:'编辑',
                  type:'primary'
                },
                {
                  label:'下架'
                }
              ]
            }
          ],
        },
        detailConfig:{
          isShow:false,
          rs:{}
        },
      }
    },
    methods:{
      ...mapActions({
        getSearchList: 'product/getProductList'
      }),
      initView(){
        this.paramsInit()
      },
      editDetail(rs){
        this.$set(this.detailConfig,'rs',rs)
        this.detailConfig.isShow = true
      },

    },
    components:{
      vResult,
      vSearch
    },
  }
</script>
