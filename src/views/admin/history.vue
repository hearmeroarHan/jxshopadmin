<template>
  <div class="history">
        <!-- 卡片 -->
        <el-card class="box-card">
          <!-- header-s -->
          <div slot="header" class="clearfix">
            <span>访客记录</span>
          </div>
          <!-- header-e -->
    
          <!-- body-s -->
          <div class="search">
    
            <!-- filter -->
            <el-input placeholder="请输入用户名" v-model="params.uname">
              <el-button slot="append" icon="el-icon-search" @click="initData"></el-button>
            </el-input>
    
            <!-- date -->
            <el-date-picker v-model="date" type="datetimerange" range-separator="至" start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
    
          </div>
          <!-- body-e -->
    
          <!-- 表格内容 -->
          <el-table :data="tableData">
            <!-- 
            city: ""
            id: "14558"
            ip: "127.0.0.1"
            login_time: "2021-06-28 15:45:03"
            prev_login_time: "2021-06-28 15:38:31"
            type: "密保"
            username: "神龙教主" -->

            <el-table-column label="编号" prop="id" width="100">
              <!-- prop注册字段 -->
            </el-table-column>
            <el-table-column label="用户" prop="username" width="100">
            </el-table-column>
            <el-table-column label="登陆方式" prop="type" width="100">
              <el-tag>密保</el-tag>
            </el-table-column>
            <el-table-column label="登陆城市" prop="city" width="100">
            </el-table-column>
            <el-table-column label="登陆时间" prop="login_time" width="200">
            </el-table-column>
            <el-table-column label="上一次登录时间" prop="prev_login_time" width="200">
            </el-table-column>
          </el-table>
          <!-- 表格内容 -->
    
          <!-- 分页 -->
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum"
            :page-sizes="[5, 10, 15, 20]" :page-size="parseInt(params.pagesize)" layout="total, sizes, prev, pager, next, jumper"
            :total="parseInt(totalDataCount)">
          </el-pagination>
          <!-- 分页 -->
    
        </el-card>
        <!-- 卡片 -->
  </div>
</template>

<script>
import {getUserHistoryApi} from '@/api/users'

export default {
  data() {
      return {
        // 对话框-表单属性
        dialogFormVisible: false,
        formLabelWidth: '120px',
        form: {
          role:""
        },
        rules: {
          role: [
            { required: true, message: '请选择角色', trigger: 'blur' }
          ],
        },
        // 不知道是啥的属性
        uname: '',
        date: [],
        // 表格数据
        tableData: [
          
        ],
        pagenum: 1,
        // 接口参数
        params: {
          pagenum: 1,
          pagesize: '10',
          uname: '',
          start_time: '',
          end_time: '',
        },
        totalDataCount: ''
      }
    },
    created() {
      this.initData()
    },
    watch: {
      date(newdata) {
        console.log(newdata)
        if (newdata) {
          this.params.start_time = newdata[0]
          this.params.end_time = newdata[1]
        } else {
          this.params.start_time = '',
          this.params.end_time = ''
        }

        this.initData()
      }
    },
    methods: {
      // 接口 - 默认初始化数据
      initData() {
        getUserHistoryApi(this.params)
        .then(res => {
          console.log(res)
          this.tableData = res.data.list
          this.totalDataCount = res.data.total
        })
      },
      // 对话框显示
      showDialog() {
        this.dialogFormVisible = !this.dialogFormVisible
      },
      // 分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.params.pagesize = val
        this.initData()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.params.pagenum = val
        this.initData()
      },
      // 表格删除
      btnDelete() {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
}
</script>

<style  scoped lang="scss"> 
  .history {
    width: 100%;
    height: 100%;

    .box-card {
      width: 96%;
      margin:auto;

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
  }
</style>  
