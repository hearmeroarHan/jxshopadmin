<template>
  <div class="create">
    <div class="users">
      <!-- 卡片 -->
      <el-card class="box-card">
        <!-- header-s -->
        <div slot="header" class="clearfix">
          <span>角色创建</span>
          <el-button
            style="float: right; padding: 3px 0"
            type="text"
            @click="jump('/roles')"
            >返回</el-button
          >
        </div>
        <!-- header-e -->

        <!-- 表单-开始 -->
        <el-form label-width="80px" :model="form" :rules="rules" ref="form">
          <el-form-item label="角色名称" prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>

          <el-form-item label="角色描述" prop="describe">
            <el-input v-model="form.describe"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- 表单-结束 -->
      </el-card>
      <!-- 卡片 -->
    </div>
  </div>
</template>

<script>
import {postRolesApi} from '@/api/role'

export default {
  data() {
    return {
      form: {
        username: "",
        describe: "",
        question: "",
        answer: "",
      },
      rules: {
        question: [
          { required: true, message: "请选择密保问题", trigger: "change" },
        ],
        answer: [
          { required: true, message: "请选择密保答案", trigger: "blur" },
        ],
        username: [
          { required: true, message: "用户名必须填写", trigger: "blur" },
        ],
        describe: [{ required: true, message: "请选择密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(isSuccess => {
        if (isSuccess)
        {
          postRolesApi({
            role_name: this.form.username,
            role_describe: this.form.describe
          })
          .then(res => {
            console.log(res)
            if (res.meta.state == 201)
              {
                this.$message.success(res.meta.msg)
                this.$router.push('/roles')
              } else {
                this.$message.error(res.meta.msg)
              }
          })
        }
      })
    },
  },
};
</script>

<style scoped lang="scss">
.create {
  width: 100%;
  height: 100%;

  .box-card {
    width: 96%;
    margin: auto;

    /* deep .el-form-item__content {
      display: inline-block;
      margin-left: 0px;
    } */
  }
}
</style>