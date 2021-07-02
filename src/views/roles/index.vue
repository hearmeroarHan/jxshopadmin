<template>
    <div class="users">
        <!-- 卡片 -->
        <el-card class="box-card">
            <!-- 标题 -->
            <div slot="header" class="clearfix">
                <span>角色列表</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="jump('/roles/create')">添加角色</el-button>
            </div>
            <!-- 标题 -->

            <!-- 表格内容 -->
            <el-table :data="tableData">
                <el-table-column label="编号" prop="role_id" width="60"></el-table-column>
                <el-table-column label="角色名称" prop="role_name"></el-table-column>
                <el-table-column label="角色描述" prop="role_describe"></el-table-column>
                
                <el-table-column label="操作" fixed="right">
                    <el-button type="primary" icon="el-icon-edit" circle></el-button>
                    <el-button type="danger" icon="el-icon-delete" circle></el-button>
                </el-table-column>
            </el-table>
            <!-- 表格内容 -->
            
        </el-card>
        <!-- 卡片 -->
    </div>
</template>
<script>
import {getRolesApi} from "@/api/role"

export default {
    data() {
        return {
            // 分页
            pagenum: 1,
            // 搜索
            uname: '',
            date: [],
            // 表格数据
            tableData: [
            ]
        }
    },
    created() {
        getRolesApi()
        .then(res => {
            this.tableData = res.data
            console.log(res)
        })
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
}
</script>
<style lang="scss" scoped>
.users {
    width:100%;
    height: 100%;

    .el-card {
        width: 96%;
        margin: auto;
        
        .search {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
            .el-input {width: 300px;}
        }

        .el-pagination {
            width: 100%;
            padding: 10px 0;
            background: #ebeef5;
            text-align: right;
            margin-top: 10px;
            padding-right: 10px;
            box-sizing: border-box;
        }
    }
}
</style> 