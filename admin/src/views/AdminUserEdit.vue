<template>
  <div>
    <h1>{{id ? '编辑' : '新建' }}管理员</h1>
    <el-form>
      <el-form-item label="用户名" label-width="120px">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" label-width="120px">
        <el-input type="password" show-password v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      model: {}
    };
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`/rest/adminusers/${this.id}`, this.model);
      } else {
        await this.$http.post("/rest/adminusers", this.model);
      }
      this.$router.push("/admin_users/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/adminusers/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>

<style>
</style>