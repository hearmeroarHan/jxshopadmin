<template>
  <div class="login">
    <el-form :model="form" :rules="rules" ref="login">
      <el-form-item>
        <h1>听我怒吼管理系统</h1>
      </el-form-item>

      <el-form-item prop="question">
        <el-select v-model="form.question" placeholder="请选择密保问题">
          <el-option
            label="您其中一位老师的名字"
            value="您其中一位老师的名字"
          ></el-option>
          <el-option label="你初恋的名字" value="你初恋的名字"></el-option>
          <el-option label="？？？？、" value="？？？？、"></el-option>
          <el-option label="王虎" value="王虎"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="" prop="answer">
        <el-input v-model="form.answer" placeholder="请输入密保答案" clearable>
          <i slot="prefix" class="el-input__icon el-icon-lock"></i>
        </el-input>
      </el-form-item>

      <el-form-item label="" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名" clearable>
          <i slot="prefix" class="el-input__icon el-icon-user"></i>
        </el-input>
      </el-form-item>

      <el-form-item label="" prop="password">
        <el-input v-model="form.password" placeholder="请输入密码" clearable>
          <i slot="prefix" class="el-input__icon el-icon-lock"></i>
        </el-input>
      </el-form-item>

      <el-form-item class="btn">
        <el-button
          type="primary"
          class="otherlogin wx iconfont icon--_weixin"
          @click="handleWxLoginOpen"
        ></el-button>
        <el-button
          type="primary"
          class="otherlogin sms el-icon-mobile-phone"
          @click="jump('/login/sms')"
        ></el-button>
        <el-button
          type="primary"
          class="otherlogin sms iconfont icon-Token"
          @click="jump('/login/token')"
        ></el-button>
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>

    <!-- 弹出框（默认隐藏） -->
    <el-dialog
      title="手机微信扫码"
      :visible.sync="isShowWxLogin"
      width="50%"
      :before-close="handleWxLoginClose"
    >
      <!-- <span>QRcode</span> -->
      <div
        class="qrcode"
        ref="qrCodeUrl"
        style="display: flex; justify-content: center"
      ></div>
    </el-dialog>
  </div>
</template>

<script>
import { postMbLoginApi, postCheckQRCodeApi} from "@/api/login";
import { getMenuApi } from "@/api/menu";
import QRCode from "qrcodejs2";

export default {
  data() {
    return {
      // uuid
      uuidData: '',
      // 定时器
      t: null,
      // 表单数据统一管理
      form: {
        question: "",
        answer: "",
        username: "",
        password: "",
      },
      // 表单验证规则
      rules: {
        question: [
          { required: true, message: "请选择密保问题", trigger: "change" },
        ],
        answer: [
          { required: true, message: "请选择密保答案", trigger: "blur" },
          { min: 2, max: 8, message: "只能输入2-8位字符", trigger: "blur" },
        ],
        username: [
          { required: true, message: "请选择用户名", trigger: "blur" },
          { min: 2, max: 12, message: "只能输入2-12位字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请选择密码", trigger: "blur" },
          { min: 2, max: 12, message: "只能输入2-12位字符", trigger: "blur" },
        ],
      },
      // 微信扫码
      isShowWxLogin: false,
    };
  },
  methods: {
    // 生成独特用户的二维码函数
    uuid() {
      var s = [];
      var hexDigits = "0123456789abcdef";
      for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = "-";

      var uuid = s.join("");
      return new Date().getTime() + "-" + uuid;
    },
    //创建二维码
    creatQrCode() {

      this.uuidData = this.uuid()
      // 定时器每隔0.5s判断用户是否已经扫码
      // 重新生成二维码时要清除之前的定时器 开始新的定时器
      if (this.t) clearInterval(this.t)

      this.t = setInterval(() => {
        postCheckQRCodeApi(this.uuidData)
        .then(res => {
          console.log(res)
          if (res.meta.msg == 200) {
            // 保存用户信息
            localStorage.setItem("uname", res.data.uname);
            localStorage.setItem("rolename", res.data.rolename);
            localStorage.setItem("token", res.data.token);
            // 提示
            this.$message.success('登陆成功')
            // 跳转
            clearInterval(this.t)
            this.$router.push('/welcome')
          } else {
            
            // this.$message.error('登陆失败')
          }
        })
      },2000) 

      console.log(this.$refs.qrCodeUrl);
      // 清空
      this.$refs.qrCodeUrl.innerHTML = ''
      // 追加
      var qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxed58e834201d0894&redirect_uri=http://kg.zhaodashen.cn/v2/qr/login.php&response_type=code&scope=snsapi_base&state=${this.uuidData}&connect_redirect=1#wechat_redirect`,
        width: 300,
        height: 300,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H,
      });
    },
    // submit登录
    onSubmit() {
      // 表单验证
      this.$refs.login.validate((isSuccess) => {
        if (isSuccess) {
          postMbLoginApi({
            uname: this.form.username,
            pwd: this.form.password,
            question: this.form.question,
            answer: this.form.answer,
          })
            .then((res) => {
              console.log(res);
              if (res.meta.state == 200) {
                // 1、保存用户信息 username 、 token 、 rolename
                localStorage.setItem("uname", res.data.uname);
                localStorage.setItem("rolename", res.data.rolename);
                localStorage.setItem("token", res.data.token);

                // 获取权限菜单数据
                getMenuApi()
                .then(res => {
                  // console.log(res)
                  localStorage.setItem('menus', JSON.stringify(res.data))
                })

                // 2、提示
                this.$message.success(res.meta.msg);
                // 3、跳转
                this.$router.push("/welcome");
              } else {
                this.$message.error(res.meta.message);
              }
            })
            .catch((res) => {
              this.$message.error("请求接口有误");
            });
        } else {
          this.$message.error("请完整填写表单");
        }
      });
    },
    // 微信扫码登录
    handleWxLoginOpen() {
      // 显示弹框
      this.isShowWxLogin = true;
      // 创建二维码
      //  this.creatQrCode(); // 显示弹框还没渲染完就创建二维码无法显示
      this.$nextTick(() => {
        this.creatQrCode();
      });
    },
    // 登录
    handleWxLoginClose(done) {
      done();
    },
  },
  // mounted() {
  //      this.creatQrCode();
  //   },
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background-color: #2d3a4b;
  display: flex;
  justify-content: center;
  align-items: center;

  .el-form {
    width: 300px;
    text-align: center;
    color: #fff;

    h1 {
      font-size: 32px;
    }

    .el-select {
      width: 100%;
    }

    .btn {
      height: 40px;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>