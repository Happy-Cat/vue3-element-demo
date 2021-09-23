<template>
  <div class="demo-collapse">
    <div class="collapse-nav">
      <el-row class="tac">
        <el-col :span="24">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-vertical-demo"
            @select="handleSelect"
          >
            <el-sub-menu index="layout">
              <template #title>
                <i class="el-icon-location"></i>
                <span>Navigator One</span>
              </template>
              <el-menu-item index="home">item one</el-menu-item>
              <el-menu-item index="login">item three</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="home">
              <i class="el-icon-menu"></i>
              <span>Navigator Two</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();
    const activeIndex = 'home'
    const handleSelect = (name) => {
      console.log(name);
      router.push({name});
    }
    return {
      activeIndex,
      handleSelect,
    }
  },
})
</script>
<style lang='less'>
.demo-collapse {
  display: flex;
  height: 100%;
  .collapse-nav {
    width: 20%;
    height: 100%;
    .el-row {
      height: 100%;
      .el-menu {
        height: 100%;
      }
    }
    .collapse-title {
      padding: 0 10px;
    }
  }
}
</style>