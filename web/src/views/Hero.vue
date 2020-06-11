<template>
  <div class="page-hero" v-if="model">
    <div class="topbar bg-black px-4 py-2 d-flex ai-center text-white">
      <img src="../assets/images/logo.png" alt height="30px" />
      <div class="mr-3">王者荣耀</div>
      <div class="flex-1">攻略站</div>
      <router-link tag="div" to="/">更多 &gt;</router-link>
    </div>
    <!-- top -->
    <div class="top" :style="{'background-image':`url(${model.banner})`}">
      <div class="info text-white p-3 h-100 d-flex flex-column jc-end">
        <div class="font-sm">{{model.title}}</div>
        <h2 class="my-2">{{model.name}}</h2>
        <div class="font-sm">{{model.categories.map( v => v.name).join('/')}}</div>
        <div class="d-flex jc-between pt-2">
          <div class="scores d-flex ai-center" v-if="model.scores">
            <span>难度</span>
            <span class="badge bg-difficult">{{model.scores.difficult}}</span>
            <span>技能</span>
            <span class="badge bg-skills">{{model.scores.skills}}</span>
            <span>攻击</span>
            <span class="badge bg-attack">{{model.scores.attack}}</span>
            <span>生存</span>
            <span class="badge bg-survive">{{model.scores.survive}}</span>
          </div>
          <router-link tag="div" to="/">皮肤&gt;</router-link>
        </div>
      </div>
    </div>
    <!-- nav -->
    <div class="px-3 bg-white">
      <div class="nav d-flex jc-around pt-3 pb-2 border-bottom">
        <div class="nav-item active">
          <div class="nav-link">英雄初始</div>
        </div>
        <div class="nav-item">
          <div class="nav-link">英雄攻略</div>
        </div>
      </div>
    </div>
    <!-- swiper -->
    <div>
      <div class="border-bottom">
        <swiper>
          <swiper-slide>
            <div class="bg-white">
              <div class="d-flex">
                <router-link tag="button" to="/" class="mx-2 my-2 flex-1 btn btn-lg bg-grey-1">
                  <i class="iconfont icon-menu1"></i>
                  英雄介绍视频
                </router-link>

                <router-link tag="button" to="/" class="mx-2 my-2 flex-1 btn btn-lg bg-grey-1">
                  <i class="iconfont icon-menu1"></i>
                  一图识视频
                </router-link>
              </div>

              <!-- skill -->
              <div class="skills m-2">
                <div class="d-flex jc-around">
                  <img
                    @click="currentIndex = i"
                    class="icon"
                    :class="{active: currentIndex === i}"
                    :src="item.icon"
                    v-for="(item, i) in model.skills"
                    :key="item._id"
                  />
                </div>
                <div v-if="currentSkill">
                  <div class="d-flex ai-center">
                    <h3>{{currentSkill.name}}</h3>
                    <span class="ml-4">(冷却值：{{currentSkill.cd}} 消耗：{{currentSkill.cost}})</span>
                  </div>
                  <div>
                    <p>{{currentSkill.description}}</p>
                  </div>
                </div>
              </div>
            </div>

            <m-card plain icon="menu1" title="出装推荐" class="hero-item">
              <div class="m-2">顺风出装：</div>
              <div class="d-flex jc-around">
                <div v-for="item in model.items1" :key="item._id">
                  <img class="icon" :src="item.icon" />
                  <div class="text-center font-xxs">
                    <p>{{item.name}}</p>
                  </div>
                </div>
              </div>
              <div class="m-2">逆风出装：</div>
              <div class="d-flex jc-around">
                <div v-for="item in model.items2" :key="item._id">
                  <img class="icon" :src="item.icon" />
                  <div class="text-center font-xxs">
                    <p>{{item.name}}</p>
                  </div>
                </div>
              </div>
            </m-card>

            <m-card plain icon="menu1" title="对抗技巧">
              <p>{{model.battleTips}}</p>
            </m-card>
            <m-card plain icon="menu1" title="团战技巧">
              <p>{{model.teamTips}}</p>
            </m-card>

            <m-card plain icon="menu1" title="英雄关系">
              <div class="font-sl my-2">最佳搭档</div>
              <div v-for="item in model.partners" :key="item._id" class="d-flex mb-3">
                <img :src="item.hero.avatar" alt height="50" class="mx-1" />
                <p class="flex-1 mt-0 mx-2">{{item.description}}</p>
              </div>
            </m-card>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      model: null,
      currentIndex: 0
    };
  },
  methods: {
    async fetchHero() {
      const res = await this.$http.get(`heroes/${this.id}`);
      console.log(res);
      this.model = res.data;
    }
  },
  created() {
    this.fetchHero();
  },
  computed: {
    currentSkill() {
      return this.model.skills[this.currentIndex];
    }
  }
};
</script>

<style lang="scss" scoped>
.page-hero {
  .top {
    height: 50vw;
    background: #fff no-repeat top center;
    background-size: auto 100%;
  }
  .info {
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    .scores {
      .badge {
        margin: 0 0.25rem;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        line-height: 0.9rem;
        text-align: center;
        border-radius: 50%;
        border: 1px solid rgba(255, 255, 255, 0.2);
        font-size: 0.6rem;
      }
    }
  }
  .skills {
    img {
      border-radius: 50%;
      border: 3px solid transparent;
      width: 60px;
      height: 60px;
      &.active {
        border-radius: 50%;
        border: 3px solid #db9e3f;
      }
    }
  }
  .hero-item {
    img.icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
</style>