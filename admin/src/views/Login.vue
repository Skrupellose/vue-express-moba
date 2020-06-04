<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <el-form>
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>

        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" show-password></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="login">确定</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {}
    };
  },
  methods: {
    async login() {
      const res = await this.$http.post('login', this.form)
      console.log(res) 
      localStorage.token = res.data.token
      this.$message({
        type:'success',
        message: '登录成功'
      })
      this.$router.push('/')
    }
  },
};
</script>
<style lang="css">
.login-card {
  margin: 5rem auto;
  width: 25rem;
}
</style>
