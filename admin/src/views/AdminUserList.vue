<template>
  <div>
    <h1>管理员列表</h1>
    <el-table :data="tableData">
      <el-table-column prop="_id" label="ID" width="220"></el-table-column>
      <el-table-column prop="username" label="管理员用户名" width="220"></el-table-column>
      <!-- <el-table-column prop="password" label="管理员密码" width="220"></el-table-column> -->
      <el-table-column label="操作" width="220">
        <template v-slot="scope">
          <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
          <el-button @click="remove(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/adminusers");
      this.tableData = res.data;
    },
    edit(item) {
      this.$router.push(`/admin_users/edit/${item._id}`);
    },
    remove(item) {
      console.log(item);
      this.$confirm(`是否删除分类 "${item.name}"?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$http.delete(`rest/adminusers/${item._id}`);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.fetch();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style>
</style>