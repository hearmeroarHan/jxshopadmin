<template>
  <div class="admin">
    <!-- menu-s -->
    <div class="menu" :style="{width: menuStyle}">
      <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" 
        :collapse="isHiddenMenu" background-color="#263445" text-color="#fff" :collapse-transition='false'>
        <el-submenu index="1" is-active is-opened>
          <template slot="title">
            <i class="iconfont icon-menu_set-"></i>
            <span slot="title">后台首页</span>
          </template>
          <el-menu-item index="1-1" @click="jump('/welcome')">
            <i class="iconfont icon-xingzhuangjiehebeifen4"></i>
            欢迎页
          </el-menu-item>
          <el-menu-item index="1-2" @click="jump('/history')">
            <i class="iconfont icon-xingzhuangjiehebeifen4"></i>
            访客记录
          </el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="iconfont icon-menu_set-"></i>
            <span slot="title">用户管理</span>
          </template>
          <el-menu-item index="2-1" @click="jump('/users')">
            <i class="iconfont icon-xingzhuangjiehebeifen4"></i>
            用户列表
          </el-menu-item>
          <el-menu-item index="2-2" @click="jump('/users/create')">
            <i class="iconfont icon-xingzhuangjiehebeifen4"></i>
            用户创建
          </el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="iconfont icon-menu_set-"></i>
            <span slot="title">角色管理</span>
          </template>
          <el-menu-item index="3-1" @click="jump('/roles')">
            <i class="iconfont icon-xingzhuangjiehebeifen4"></i>
            角色列表
          </el-menu-item>
          <el-menu-item index="3-2" @click="jump('/roles/create')">
            <i class="iconfont icon-xingzhuangjiehebeifen4"></i>
            角色创建
          </el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="iconfont icon-menu_set-"></i>
            <span slot="title">用户管理</span>
          </template>
          <el-menu-item index="4-1" @click="jump('/auths')">
            <i class="iconfont icon-xingzhuangjiehebeifen4"></i>
            权限列表
          </el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="iconfont icon-menu_set-"></i>
            <span slot="title">订单管理</span>
          </template>
          <el-menu-item index="5-1" @click="jump('/total')">
            <i class="iconfont icon-xingzhuangjiehebeifen4"></i>
            订单统计
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <!-- menu-e -->

    <!-- main-s -->
    <div class="main">
      <!-- top-s -->
      <div class="top">
        <div class="l">
          <div class="btn" @click="changeMenuFn">
            <i :class="changeMenuIcon"></i>
          </div>
          <div class="breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>{{$route.meta.one}}</el-breadcrumb-item>
              <el-breadcrumb-item :key="$route.meta.one">{{$route.meta.two}}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </div>
        <div class="r">
          <span>听我怒吼（管理员）</span>
          <i class="iconfont icon-guanji" @click="dialogVisible =true"></i>
          <i class="iconfont icon-quanping" @click="FullScreen"></i>
        </div>
      </div>
      <!-- top-e -->

      <!-- content-s -->
      <div class="content">
        <router-view></router-view>
      </div>
      <!-- content-e -->

      <!-- dialog -->
      <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <span>是否注销用户？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="quit">确 定</el-button>
        </span>
      </el-dialog>
      <!-- dialog -->

      <!-- main-e -->
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        changeMenuIcon: 'el-icon-s-fold',
        menuStyle: '200px', // 菜单默认宽度
        isHiddenMenu: false, // 是否隐藏菜单，true隐藏,false不隐藏

        //对话框
        dialogVisible: false
      };
    }, 
    methods: {
      // 注销用户
      quit() {
        localStorage.removeItem("token")
        this.$router.push('/login')
      },
      // 控制menu展开
      changeMenuFn() {
        this.isHiddenMenu = !this.isHiddenMenu
        this.changeMenuIcon = this.isHiddenMenu ? 'el-icon-s-unfold' : 'el-icon-s-fold'
        this.menuStyle = this.isHiddenMenu ? '64px' : '200px'
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      // handleClose(key, keyPath) {
      //   console.log(key, keyPath);
      // },
      FullScreen() {
        console.log("1");
      },
      handleClose(done) {
        done();
        // this.$confirm('确认关闭？')
        //   .then(_ => {
        //     done();
        //   })
        //   .catch(_ => {});
      }
    }
      // signout() {

      // }
    }
  
</script>

<style lang="scss" scoped>
  .admin {
    width: 100%;
    height: 100%;
    display: flex;

    .menu {
      width: 200px;
      height: 100%;
      background-color: #263445;
      transition: width .28s;

      .el-menu {
        border: none;

        .iconfont {
          font-size: 18px;
          margin-right: 10px;
        }
      }
    }

    .main {
      flex: 1;

      display: flex;
      flex-direction: column;

    }

    .top {
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: space-between;
      overflow: hidden;
      margin-bottom: 30px;
      box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

      .l {
        width: 300px;
        height: 50px;
        background-color: #fff;
        display: flex;
        justify-content: space-between;

        .btn {
          width: 50px;
          height: 100%;
          font-size: 24px;
          text-align: center;
          line-height: 50px;
        }

        .btn:hover {
          background: rgba(0, 0, 0, 0.025);
          cursor: pointer;
        }

        .breadcrumb {
          width: 200px;
          height: 100%;
          display: flex;
          /* justify-content: center; */
          align-items: center;
          font-size: 15px;
        }
      }

      .r {
        width: 240px;
        height: 100%;

        line-height: 50px;
        display: flex;

        .span {
          font-size: 14px;
        }

        i {
          font-size: 20px;
          margin-right: 10px;
        }
      }
    }

    .content {
      flex: 1;


      overflow-y: scroll;
    }
  }
</style>