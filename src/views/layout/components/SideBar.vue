<template>

  <el-menu mode="vertical" :show-timeout="200" :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
    <template v-for="item in routes" v-if="item.children">
      <router-link v-if="(item.children.length === 1  && !item.children[0].children) " :to="item.path+'/'+item.children[0].path" :key="item.children[0].name">
         <el-menu-item :index="item.path+'/'+item.children[0].path">
          <i :class="item.icon"></i>
          <span v-if="item.children[0].title" slot="title">{{item.children[0].title}}</span>
         </el-menu-item>
      </router-link>

     <el-submenu v-else :index="item.path" :key="item.name">
      <template slot="title">
        <i :class="item.icon"></i>
        <span  slot="title">{{item.title}}</span>
      </template>

       <template v-for="child in item.children" v-if="!child.hidden">
          <router-link  :to="item.path+'/'+child.path" :key="child.name">
            <el-menu-item :index="item.path+'/'+child.path">
              <i v-if="child.icon" :class="child.icon"></i>
              <span v-if="child.title" slot="title">{{child.title}}</span>
            </el-menu-item>
          </router-link>
        </template>

    </el-submenu>



    </template>




  </el-menu>

</template>

<script>
import { mapGetters } from "vuex";

export default {
  components: {},
  computed: {
    ...mapGetters(["sidebar"]),
    routes() {
      console.log(this.$router.options.routes,'option.routes');
      return this.$store.getters.routes;
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  }
};
</script>
