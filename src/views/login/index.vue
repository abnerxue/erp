<template>
  <div id="login">
    <div class="loginConbox">
      <div class="header">
        <div class="logo">
          <img src="../../assets/logo.png" />
        </div>
      </div>
      <div class="loginBox">
        <div class="loginCon">
          <p class="title">常孝天下后台管理</p>
          <p class="title"></p>
          <el-card shadow="always" class="login-module" v-if="smdl">
            <div slot="header" class="clearfix formTitlt">
              <span>密码登录</span>
              <span class="titIconbox">
                <i class="iconfont xu-saomadenglu2 fa-lg iconcolor"></i>
                <i
                  class="iconfont xu-saomadenglu01 el-icon--right fa-lg pointer"
                  @click="smdl = !smdl"
                ></i>
              </span>
            </div>
            <el-form :model="loginForm" status-icon label-width="100px" class="demo-ruleForm">
              <el-form-item>
                <el-input
                  type="text"
                  v-model="loginForm.username"
                  auto-complete="off"
                  placeholder="请输入登录账号"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-input
                  type="password"
                  v-model="loginForm.password"
                  auto-complete="off"
                  placeholder="请输入登录密码"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button class="subBtn" type="primary" @click="submitForm">登录</el-button>
              </el-form-item>
              <!--  <p class="smalltxt">
                <router-link class="a" to="#">忘记密码</router-link>
                <router-link class="a" to="#">忘记会员名</router-link>
                <router-link class="a" to="#">免费注册</router-link>
              </p>-->
            </el-form>
          </el-card>

          <el-card shadow="always" class="login-module" v-else>
            <div slot="header" class="clearfix formTitlt">
              <span>扫码登录</span>
              <span class="titIconbox">
                <i class="iconfont xu-mimadenglu1 fa-lg iconcolor"></i>
                <i
                  class="iconfont xu-imagevector el-icon--right fa-lg pointer"
                  @click="smdl = !smdl"
                ></i>
              </span>
            </div>
            <div class="ewmbox">
              <div class="ewm">
                <!-- <img src="https://img.alicdn.com/tfscom/TB1ivYYyHvpK1RjSZFqwu3XUVXa.png"> -->
                <qriously
                  :value="value"
                  :size="size"
                  :backgroundAlpha="backgroundAlpha"
                  class="s-img-2"
                />
              </div>
              <div class="ewmicon">
                <i class="iconfont xu-saomadenglu fa-2x iconcolor"></i>
                <p>打开 常孝天下app 扫一扫登录</p>
              </div>
              <p class="smalltxt">
               
              </p>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 二维码大小 默认 100
      size: 190,
      // 背景透明度，默认透明 0
      backgroundAlpha: 1,
      value: "",
      smdl: true,
      loginForm: {
        username: "",
        password: ""
      }
    };
  },
  created() {
    this.getcode();
  },
  methods: {
    load() {
      let data = {};

      let _this = this;

      this.$ajax
        .get("/cxt/manager/request", JSON.stringify(), {
          //就是这里，
          // headers: _this.Base.initAjaxHeader(1, data)
        })
        .then(res => {
          if (res.data.state === "000") {
            // 将 username 设置为 token 存储在 store，仅为测试效果，实际存储 token 以后台返回为准
            //  _this.$router.push({path: '/'})
              localStorage.setItem("token", _this.loginForm.username);
            _this.$store.dispatch("setToken", _this.loginForm.username).then(() => {
              _this.$router.push({ path: "/" });
            });
          } else {
            alert;
          }
        });
    },
    getcode() {
      let data = {};

      let _this = this;

      this.$ajax
        .get("/cxt/manager/logCode", JSON.stringify(), {
          //就是这里，
          // headers: _this.Base.initAjaxHeader(1, data)
        })
        .then(res => {
          this.value = res.data.data;
          this.load();
          console.log(this.value);
        });
    },
    submitForm() {
      let that = this;
      if (this.loginForm.username === "" || this.loginForm.password === "") {
        this.$message({
          showClose: true,
          message: "账号或密码不能为空",
          type: "error"
        });
        return false;
      } else {
        let _this = this;

        let params = new URLSearchParams();
        params.append("tel", _this.loginForm.username);
        params.append("validation", _this.loginForm.password);
        params.append("type", "password");
        console.log(this.$ajax);
        this.$ajax
          .post("/cxt/manager/passin", params, {
            headers: { Authorization: 666666 },
            withCredentials: true
          })
          .then(res => {
            console.log(res.headers +'==========');
            console.log(document.cookie+ '+++++++++++++++');
            // if (res.data.state == "000") {
              if (res.data.state == "000") {
                localStorage.setItem("token", that.loginForm.username);
              // that.$router.push({path: '/'})
              // 将 username 设置为 token 存储在 store，仅为测试效果，实际存储 token 以后台返回为准
              that.$store
                .dispatch("setToken", that.loginForm.username)
                .then(() => {
                  console.log("========");
                  that.$router.push({ path: "/index" });
                })
                .catch(res => {
                  that.$message({
                    showClose: true,
                    message: res,
                    type: "error"
                  });
                });
            } else {
            }

            console.log(res.data.data);
          });
      }
    },
    message() {
      const h = this.$createElement;
      this.$notify({
        title: "账号密码",
        message: h("i", { style: "color: teal" }, "账号密码同常孝天下app"),
        duration: 6000
      });
    }
  },
  mounted() {
    this.message();
  }
};
</script>
<style lang="scss">
#login {
  width: 100%;
  height: 100%;
  background-color: #2d3a4b;
  .loginConbox {
    background: #2d3a4b;
  }
  .header {
    height: 60px;
    position: relative;
    background: #2d3a4b;
    /*border-bottom: 1px solid rgba(255, 255, 255, 0.3);*/
    .logo {
      margin-left: 30px;
      width: 500px;
      float: left;
      height: 40px;
      padding-top: 10px;
      img {
        height: 100%;
      }
    }
  }

  .loginBox {
    .iconcolor {
      color: #409eff;
    }

    padding: 74px 0 118px;

    .loginCon {
      width: 990px;
      margin: auto;
      position: relative;
      height: 388px;

      .el-card__header {
        border-bottom: 0px;
      }
      .title {
        font-size: 36px;
        font-weight: 600;
        color: #ffffff;
        width: 500px;
        float: left;
        margin-top: 0px;
        &:first-child {
          font-size: 34px;
          margin-top: 50px;
          margin-bottom: 30px;
        }
      }
      .login-module {
        width: 380px;
        height: 325px;
        margin-top: 60px;
        border: none;
        position: absolute;
        right: 0;

        .formTitlt {
          font-size: 18px;
          font-weight: 400;

          .titIconbox {
            float: right;

            .pointer {
              cursor: pointer;
            }
          }
        }

        .smalltxt {
          text-align: right;

          .a {
            text-decoration: none;
            color: #999999;
            font-size: 12px;
            margin-left: 8px;
          }
        }
      }

      .el-form-item__content {
        margin-left: 0px !important;

        .subBtn {
          width: 100%;
        }
      }
    }

    .el-input__inner,
    .el-button,
    .el-card,
    .el-message {
      border-radius: 0px !important;
    }

    .el-form-item__content .ico {
      position: absolute;
      top: 0px;
      left: 0px;
      z-index: 999;
      width: 40px;
      height: 39px;
      text-align: center;
      border-right: 1px solid #ccc;
    }

    .ewmbox {
      width: 100%;
      height: 240px;
      margin-top: -25px;

      .ewm {
        width: 140px;
        height: 140px;
        margin: 2px 0px 20px 75px;

        p {
          font-size: 12px;
          padding-left: 40px;
          margin: 0;
        }
      }

      .ewmicon {
        width: 140px;
        margin: 20px auto 0;

        .iconfont {
          float: left;
        }

        p {
          font-size: 12px;
          padding-left: 40px;
          margin: 0;
        }
      }
    }
  }
}
</style>
