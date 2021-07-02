<template>
  <div class="users">
    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- header-s -->
      <div slot="header" class="clearfix">
        <span>用户列表</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="jump('/users/create')"
          >添加新用户</el-button
        >
      </div>
      <!-- header-e -->

      <!-- body-s -->
      <div class="search">
        <!-- filter -->
        <el-input placeholder="请输入用户名" v-model="params.uname">
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="initData"
          ></el-button>
        </el-input>

        <!-- date -->
        <el-date-picker
          v-model="date"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </div>
      <!-- body-e -->

      <!-- 表格内容 -->
      <el-table :data="tableData">
        <!--          email: ""
        mobile_phone: ""
        passwd_answer: "赵小康"
        passwd_question: "您其中一位老师的名字"
        reg_time: "2021-06-28 19:48:45"
        role_id: "5"
        role_name: "普通用户"
        sex: "0"
        state: "1"
        user_id: "3179"
        username: "重拳出击把黑子给锤了" -->

        <!-- 
          当接口提供的值和表单配置比如说【冻结按钮】需要的值不匹配的时候
          使用el-ui提供的active-value，不管传什么值，active-value都代表"开"的状态

          脏数据
         -->

        <el-table-column label="编号" prop="user_id" width="60">
          <!-- prop注册字段 -->
        </el-table-column>
        <el-table-column label="所属角色" prop="role_name" width="100">
        </el-table-column>
        <el-table-column label="用户名" prop="username" width="100">
        </el-table-column>
        <el-table-column label="手机号" prop="mobile_phone" width="150">
        </el-table-column>
        <el-table-column label="冻结" width="60">
          <template slot-scope="item">
            <el-switch
              @change="handleChangeState(item.row)"
              v-model="item.row.state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="1"
              inactive-value="0"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="创建于" prop="reg_time" width="200">
        </el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="item">
            <el-button type="primary" plain @click="showDialog(item.row)"
              >分配角色</el-button
            >
            <el-button
              @click="btnDelete(item.row.user_id)"
              type="danger"
              icon="el-icon-delete"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 表格内容 -->

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="parseInt(params.pagesize)"
        layout="total, sizes, prev, pager, next, jumper"
        :total="parseInt(totalDataCount)"
      >
      </el-pagination>
      <!-- 分页 -->
    </el-card>
    <!-- 卡片 -->

    <!-- 对话框放在外面 -->
    <el-dialog title="角色分配" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules">
        <el-form-item label="当前帐号" :label-width="formLabelWidth">
          <el-tag type="info">{{ row.username }}</el-tag>
        </el-form-item>

        <el-form-item label="当前角色" :label-width="formLabelWidth">
          <el-tag type="info">{{ row.role_name }}</el-tag>
        </el-form-item>

        <el-form-item
          label="选择角色"
          :label-width="formLabelWidth"
          prop="role"
        >
          <el-select v-model="idid" placeholder="请选择角色" @click="selectRole">
            <el-option
              v-for="item in options"
              :key="item.role_id"
              :label="item.role_name"
              :value="item.role_id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="distributeRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUsersApi,
  putUserStateApi,
  deleteUserApi,
  putUserRoleApi,
} from "@/api/users";

import {getRolesApi} from '@/api/role.js'

export default {
  // 日期过滤
  watch: {
    date(newdata) {
      console.log(newdata);
      if (newdata) {
        this.params.start_time = newdata[0];
        this.params.end_time = newdata[1];
      } else {
        (this.params.start_time = ""), (this.params.end_time = "");
      }

      this.initData();
    },
  },
  data() {
    return {
      // 下拉框
      idid: '',
      options: [],
      // 对话框-表单属性
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
        role: "",
      },
      rules: {
        role: [{ required: true, message: "请选择角色", trigger: "blur" }],
      },
      // 不知道是啥的属性
      uname: "",
      date: [],
      // 表格数据
      tableData: [],
      pagenum: 1,
      // 接口参数
      params: {
        pagenum: 1,
        pagesize: 10,
        uname: "",
        start_time: "",
        end_time: "",
      },
      totalDataCount: "",
      row: "",
    };
  },
  created() {
    this.initData();
    
  },
  methods: {
    // 请求角色列表接口
    selectRole() {
      // getRolesApi()
      // .then(res => {
      //   console.log(res)
      // })
    },
    // 分配角色接口
    distributeRole() {
      console.log(this.idid)
      // console.log(this.row.user_id);
      // console.log(this.role);
      this.dialogFormVisible = false;
      putUserRoleApi({
        user_id: this.row.user_id,
        role_id: parseInt(this.idid),
      }).then((res) => {
        console.log(res);
        this.initData();
      });
    },
    // 接口 - 默认初始化数据
    initData() {
      getUsersApi(this.params).then((res) => {
        console.log(res);
        this.tableData = res.data.list;

        // 接口数据data里的state 有四种情况 true false "1" "0" 需要统一数据类型
        res.data.list.forEach((item) => {
          if (item.state === true) {
            item.state = "1";
          }

          if (item.state === false) {
            item.state = "0";
          }
        });

        this.totalDataCount = res.data.total;
      });
    },
    // 对话框显示
    showDialog(row) {
      this.dialogFormVisible = !this.dialogFormVisible;
      // console.log(row)
      this.row = row;
      // 
      getRolesApi()
      .then(res => {
        // console.log(res)
        this.options = res.data
        console.log(this.options);
      })
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.params.pagesize = val;
      this.initData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.params.pagenum = val;
      this.initData();
    },
    // 表格删除
    btnDelete(userId) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 请求删除接口
          deleteUserApi(userId).then((res) => {
            console.log(userId);
            console.log(res);
            if (res.meta.state == 200) {
              // 以前是通过DOM操作来移除行，现在是initData初始化数据
              this.initData();
              this.$message.success(res.meta.msg);
            } else {
              this.$message.error(res.meta.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 用户状体切换
    handleChangeState(row) {
      putUserStateApi({
        user_id: row.user_id,
        state: row.state,
      }).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style scoped lang="scss">
.users {
  width: 100%;
  height: 100%;
}

.box-card {
  width: 96%;
  margin: auto;
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */

  .search {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    .el-input {
      width: 300px;
    }

    .el-date-picker {
      width: 400px;
    }
  }

  .el-table__body-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .el-pagination {
    width: 100%;
    padding: 10px 0 10px 20px;
    padding-right: 0px;
    background: #ebeef5;
    text-align: left;
    margin-top: 10px;
    padding-right: 10px;
    box-sizing: border-box;
  }
}
</style>