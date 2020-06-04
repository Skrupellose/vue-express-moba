<template>
  <div>
    <h1>{{id ? '编辑' : '新建' }}物品</h1>
    <el-form>
      <el-form-item label="名称" label-width="120px">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标" label-width="120px">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
    afterUpload(res) {
      console.log(res)
      //属性使用set动态绑定,原对象没有该属性
      this.$set(this.model, 'icon', res.url )
    },
    async save() {
      if (this.id) {
        await this.$http.put(`/rest/items/${this.id}`, this.model);
      } else {
        await this.$http.post("/rest/items", this.model);
      }
      this.$router.push("/items/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/items/${this.id}`);
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