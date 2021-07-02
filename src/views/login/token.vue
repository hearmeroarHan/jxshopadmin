<template>
  <div class="login-sms">
    <el-form :model="form" :rules="rules" ref="tokenlogin">
      <el-form-item>
        <h1>令牌登陆</h1>
      </el-form-item>

      <el-form-item prop="account">
        <el-input
          v-model="form.account"
          placeholder="请输入账号或手机号"
        ></el-input>
      </el-form-item>

      <el-form-item class="token" prop="token">
        <el-input
          placeholder="验证码6位"
          v-model.number="form.token"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSubmit">令牌登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
// 1 将文字改成模型数据   <el-button slot="append" >获取验证码</el-button>
// 2 绑定点击事件
//      2.1 定时器每隔1秒
//      2.2 修改模型数据
//      2.3 当数据为0的时候 清除定时器  重新改为 获取验证码

// 验证：1 v-model 、2 :model、:rules、prop

import { postTokenLoginApi } from "@/api/login";
export default {
  data() {
    const checkaccount = (rule, value, callback) => {
      // 检查是否是纯数字
      // 是 - 走手机判断
      // 不是 - 走账号判断

      if (/^\d+$/g.test(value)) {
        if (/^1\d{10}$/g.test(value)) {
          callback();
        } else {
          callback(new Error("手机号有误"));
        }
      } else {
        if (/^\w{3,12}$/g.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确账号3~12位"));
        }
      }
    };

    const checkCaptcha = (rule, value, callback) => {
      if (/^\d{6}$/g.test(value)) {
        callback();
      } else {
        callback(new Error("请输入正确验证码"));
      }
    };

    return {
      disabled: false,
      tips: "获取验证码",
      t: null,
      form: {
        account: "",
        captcha: "",
      },
      rules: {
        account: [{ validator: checkaccount, trigger: "blur" }],
        captcha: [
          // {min:4, max:4, type: 'number', message: '请输入正确验证码', trigger:'blur'}
          // {len:4, message: '请输入正确验证码', trigger:'blur'}
          { validator: checkCaptcha, trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.tokenlogin.validate((isSuccess) => {
        if (isSuccess) {
          postTokenLoginApi(this.form).then((res) => {
            if (res.meta.state == 200) {
              // 1、保存用户信息 username 、 token 、 rolename
              localStorage.setItem("uname", res.data.uname);
              localStorage.setItem("rolename", res.data.rolename);
              localStorage.setItem("token", res.data.token);
              // 2、提示
              this.$message.success(res.meta.msg);
              // 3、跳转
              this.$router.push("/welcome");
            } else {
              this.$message.error(res.meta.message);
            }
          });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.login-sms {
  width: 100%;
  height: 100%;
  background: #2d3a4b;
  display: flex;
  justify-content: center;
  align-items: center;

  .el-form {
    width: 300px;
    text-align: center;
    h1 {
      color: #fff;
      font-size: 32px;
    }

    .el-form-item {
      .el-button {
        width: 100%;
      }
    }

    ::v-deep .captcha .el-input-group__append,
    .el-input-group__prepend {
      padding: 0px;
      padding-right: 35px;
    }
  }
}
</style>