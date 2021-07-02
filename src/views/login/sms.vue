<template>
  <div id="loginsms">
    <el-form :model="form" :rules="rules">
      <el-form-item>
        <h1>手机号码登陆</h1>
      </el-form-item>
      <!-- <el-form-item prop="tel"> -->
      <el-form-item prop="tel">
        <el-input placeholder="请输入手机号码" v-model="form.tel"></el-input>
      </el-form-item>
      <el-form-item prop="yanzhengma1">
        <!-- <el-input placeholder="请输入验证码"></el-input> -->
        <el-input placeholder="验证码" v-model="form.yanzhengma1">
          <el-button slot="append" @click="yanzhengma" :disabled="disabled">
            {{ tips }}
          </el-button>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="smslogin" @click="handleSubmit"> 短信登陆 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { postSmsApi, postSmsLoginApi } from "@/api/login";

export default {
  data() {
    var checkTel = (rule, value, callback) => {
      if (/^1\d{10}$/g.test(value)) {
        callback();
      } else {
        callback(new Error("请输入正确的手机号"));
      }
    };
    return {
      form: {
        tel: "",
        yanzhengma1: "",
      },
      // 验证规则
      rules: {
        tel: [{ validator: checkTel, trigger: "blur" }],
        yanzhengma1: [
          {
            require: true,
            message: "请输入有效的验证码",
            min: 4,
            max: 4,
            // type: "number",
            trigger: "blur",
          },
        ],
      },
      tips: "获取验证码",
      t: null,
      disabled: false,
      input2: "",
    };
  },

  destroyed() {
    clearInterval(this.t); //留心：只要组件中写定时器，就必须写组件销毁清楚  否则后果内存泄漏
  },
  created() {},
  mounted() {},
  methods: {
    // 短信登录
    handleSubmit() {
      postSmsLoginApi(this.form).then((res) => {
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
    },
    // 获取验证码
    yanzhengma() {
      // 判断
      if (!/^1\d{10}$/g.test(this.form.tel)) {
        this.$message.error("请输入正确的手机号");
        return;
      }
      // 定时器
      this.t = setInterval(() => {
        if (this.tips == "获取验证码") {
          postSmsApi(this.form.tel).then((res) => {
            console.log(res);
            if (res.meta.state == 201) {
              this.$message.success("发送成功");
            } else {
              this.$message.error(res.meta.msg);
            }
          });
          this.tips = 60;
          this.disabled = true;
        }
        this.tips--;
        if (this.tips == 0) {
          clearInterval(this.t);
          this.tips = "获取验证码";
        }
      }, 1000);
    },
  },
};
</script>

<style scoped lang="scss">
#loginsms {
  width: 100%;
  height: 100%;
  background-color: #2d3a4b;
  display: flex;
  justify-content: center;
  align-items: center;

  .el-form {
    width: 300px;

    h1 {
      color: white;
      font-size: 32px;
      text-align: center;
    }

    .el-button {
      width: 100%;
    }
  }

  .smslogin {
    background-color: #66b1ff;
    color: #fff;
  }
}
</style>
