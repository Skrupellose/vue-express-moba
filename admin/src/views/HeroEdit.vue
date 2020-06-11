<template>
  <div>
    <h1>{{id ? '编辑' : '新建' }}英雄</h1>
    <el-form>
      <el-tabs type="border-card" value="1">
        <el-tab-pane name="1" label="基础信息">
          <el-form-item label="称号" label-width="120px">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="名字" label-width="120px">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="类型" label-width="120px">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item in categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度" label-width="120px">
            <el-rate :max="9" show-score v-model="model.scores.difficult" style="marginTop:0.65rem"></el-rate>
          </el-form-item>
          <el-form-item label="技能" label-width="120px">
            <el-rate :max="9" show-score v-model="model.scores.skills" style="marginTop:0.65rem"></el-rate>
          </el-form-item>
          <el-form-item label="攻击" label-width="120px">
            <el-rate :max="9" show-score v-model="model.scores.attack" style="marginTop:0.65rem"></el-rate>
          </el-form-item>
          <el-form-item label="生存" label-width="120px">
            <el-rate :max="9" show-score v-model="model.scores.survive" style="marginTop:0.65rem"></el-rate>
          </el-form-item>
          <el-form-item label="头像" label-width="120px">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="res => $set(model, 'avatar', res.url)"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="banner" label-width="120px">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="res => $set(model, 'banner' ,res.url)"
            >
              <img v-if="model.banner" :src="model.banner" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="顺风出装" label-width="120px">
            <el-select v-model="model.items1" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装" label-width="120px">
            <el-select v-model="model.items2" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用提示" label-width="120px">
            <el-input type="textarea" v-model="model.userTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧" label-width="120px">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战技巧" label-width="120px">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane name="2" label="技能">
          <el-button type="text" @click="model.skills.push({})">
            <i class="el-icon-plus">添加技能</i>
          </el-button>
          <el-row type="flex" style="flex-wrap:wrap">
            <el-col :md="12" v-for="(item, i) in model.skills" :key="i">
              <el-card style="margin:10px">
                <el-form-item label="名称" label-width="120px">
                  <el-input v-model="item.name"></el-input>
                </el-form-item>
                <el-form-item label="图标" label-width="120px">
                  <el-upload
                    class="avatar-uploader"
                    :action="$http.defaults.baseURL + '/upload'"
                    :show-file-list="false"
                    :on-success="res => $set(item, 'icon', res.url)"
                  >
                    <img v-if="item.icon" :src="item.icon" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item label="技能冷却" label-width="120px">
                  <el-input v-model="item.cd"></el-input>
                </el-form-item>
                <el-form-item label="技能消耗" label-width="120px">
                  <el-input type="number" v-model="item.cost"></el-input>
                </el-form-item>
                <el-form-item label="描述" label-width="120px">
                  <el-input type="textarea" v-model="item.description"></el-input>
                </el-form-item>
                <el-form-item label="提示" label-width="120px">
                  <el-input type="textarea" v-model="item.tips"></el-input>
                </el-form-item>
                <el-form-item label-width="120px">
                  <el-button type="danger" @click="model.skills.splice(i, 1)">删除</el-button>
                </el-form-item>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane name="3" label="最佳拍档">
          <el-button type="text" @click="model.partners.push({})">
            <i class="el-icon-plus">添加英雄</i>
          </el-button>
          <el-row type="flex" style="flex-wrap:wrap">
            <el-col :md="12" v-for="(item, i) in model.partners" :key="i">
              <el-card style="margin:10px">
                <el-form-item label="英雄" label-width="120px">
                  <el-select filterable v-model="item.hero">
                    <el-option
                      v-for="hero in heroes"
                      :key="hero._id"
                      :value="hero._id"
                      :label="hero.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="描述" label-width="120px">
                  <el-input type="textarea" v-model="item.description"></el-input>
                </el-form-item>
                <el-form-item label-width="120px">
                  <el-button type="danger" @click="model.skills.splice(i, 1)">删除</el-button>
                </el-form-item>
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

      <el-form-item style="marginTop:1rem">
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
      model: {
        name: "",
        avatar: "",
        scores: {
          difficult: 0
        },
        skills: [],
        partners: []
      },
      categories: [],
      items: [],
      heroes: []
    };
  },
  methods: {
    async save() {
      if (this.id) {
        await this.$http.put(`/rest/heroes/${this.id}`, this.model);
      } else {
        await this.$http.post("/rest/heroes", this.model);
      }
      this.$router.push("/heroes/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/heroes/${this.id}`);
      console.log(res);
      // this.model = res.data;
      this.model = Object.assign({}, this.model, res.data);
      console.log(this.model);
    },
    async fetchCateroies() {
      const res = await this.$http.get("rest/categories");
      this.categories = res.data;
    },
    async fetchItems() {
      const res = await this.$http.get("rest/items");
      this.items = res.data;
    },
    async fatchHero() {
      const res = await this.$http.get("rest/heroes");
      this.heroes = res.data;
    }
  },
  created() {
    this.fetchCateroies();
    this.fetchItems();
    this.fatchHero();
    this.id && this.fetch();
  }
};
</script>
