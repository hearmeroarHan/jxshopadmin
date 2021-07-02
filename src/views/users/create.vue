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
          @click="jump('/users')"
          >返回</el-button
        >
      </div>
      <!-- header-e -->

      <!-- 表单-开始 -->
      <el-form label-width="80px" :model="form" :rules="rules" ref="form">
        <el-form-item label="账号" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>

        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>

        <el-form-item label="密保问题" prop="question">
          <el-select v-model="form.question">
            <el-option
              label="您其中一位老师的名字"
              value="您其中一位老师的名字"
            ></el-option>
            <el-option label="你初恋的名字" value="你初恋的名字"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="密保答案" prop="answer">
          <el-input v-model="form.answer"></el-input>
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
</template>

<script>

  import {createUserApi} from '@/api/users'

  export default {
    data() {
      return {
        form: {
          username: "",
          password: "",
          question: "",
          answer: "",
          mobile: ""
        },
        rules: {
          question: [
            { required: true, message: '请选择密保问题', trigger: 'change' }
          ],
          answer: [
            { required: true, message: '请选择密保答案', trigger: 'blur' },

          ],
          username: [
            { required: true, message: '用户名必须填写', trigger: 'blur' },

          ],
          password: [
            { required: true, message: '请选择密码', trigger: 'blur' },
       
          ],
          mobile: [
            { required: true, message: '请输入11位手机号', trigger: 'blur' },
       
          ]
        },
        // params: {
        //   username: '',
        //   password: '',
        //   mobile: '',
        //   question: '',
        //   answer: ''
        // }
      }
    },
    methods: {
      onSubmit() {
        // 需要先表单验证
        this.$refs.form.validate(isSuccess => {
          if (isSuccess) {
            createUserApi(this.form)
            .then(res => {
              console.log(res)
              if (res.meta.state == 201)
              {
                this.$message.success(res.meta.msg)
                this.$router.push('/users')
              } else {
                this.$message.error(res.meta.msg)
              }
            }) 
          }
        })
        
       }
    }
  }
</script>

<style lang="scss" scoped>
.users {
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