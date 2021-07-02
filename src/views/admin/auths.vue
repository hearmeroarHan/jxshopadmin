<template>
  <div class="auths">
    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- header-s -->
      <div slot="header" class="clearfix">
        <span>权限列表</span>
      </div>
      <!-- header-e -->

      <!-- body-s -->
      <div class="body">

        <!-- filter -->
        <!-- <el-input class="filter" placeholder="输入关键字进行过滤" v-model="keywords">
        </el-input> -->

        <el-input class="filter" placeholder="输入关键字进行过滤" v-model="filterText">
        </el-input>

        <el-tree class="filter-tree" :data="data" :props="defaultProps" default-expand-all
          :filter-node-method="filterNode" ref="tree2">
        </el-tree>

      </div>
      <!-- body-e -->

    </el-card>
    <!-- 卡片 -->
  </div>
</template>

<script>
  import {getMenuApi} from '@/api/menu'

  export default {
    data() {
      return {
        keywords: "",
        defaultProps:'',
        filterText: '',
        data: [
        //   {
        //   id: 1,
        //   label: '后台首页',
        //   children: [{id:5, label:'欢迎页'},{id:6, label:'访客记录'}],
        // },{
        //   id: 2,
        //   label: '用户管理',
        //   children: [{id:7, label:'用户列表'},{id:8, label:'用户创建'}],
        // },{
        //   id: 3,
        //   label: '角色管理',
        //   children: [{id:9, label:'角色列表'},{id:10, label:'角色创建'}],
        // },{
        //   id: 4,
        //   label: '权限管理',
        //   children: [{id:11, label:'权限列表'}],
        // }
        ],
        defaultProps: {
          children: 'children',
          label: 'auth_name'
        }
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      }
    },
    created() {
      getMenuApi()
      .then(res => {
        console.log(res);
        console.log(res.data[0]);
        this.data = res.data
      })
    }
  }
</script>

<style lang="scss" scoped>
  .auths {
    width: 100%;
    height: 100%;
  }

  .box-card {
    width: 96%;
    margin: auto;

    .body {


      .filter {
        margin: 10px 0;
      }
    }
  }
</style>