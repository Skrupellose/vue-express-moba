<template>
  <div>
    <h1>{{id ? '编辑' : '新建' }}文章</h1>
    <el-form>
      <el-form-item label="分类" label-width="120px">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" label-width="120px">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="详情" label-width="120px">
        <vue-editor v-model="model.body" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
// import axios from "axios";
export default {
  components: {
    VueEditor
  },
  props: {
    id: {
      type: String
    }
  },
  data() {
    return {
      model: {},
      categories: []
    };
  },
  methods: {
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      console.log('click')
      const formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post("upload", formData);
      console.log(res)
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
// handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
//       var formData = new FormData();
//       formData.append("file", file);
//       axios({
//         url: "http://localhost:3000/admin/api/upload",
//         method: "POST",
//         data: formData
//       })
//         .then(result => {
//           let url = result.data.url;
//           Editor.insertEmbed(cursorLocation, "image", url);
//           resetUploader();
//         })
//         .catch(err => {
//           console.log(err);
//         });
//     },
    async save() {
      if (this.id) {
        await this.$http.put(`rest/articles/${this.id}`, this.model);
      } else {
        await this.$http.post("rest/articles", this.model);
      }
      this.$router.push("/articles/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`);
      this.model = res.data;
    },
    async fetchCaterogory() {
      const res = await this.$http.get("rest/categories");
      this.categories = res.data;
    }
  },
  created() {
    this.fetchCaterogory();
    this.id && this.fetch();
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>