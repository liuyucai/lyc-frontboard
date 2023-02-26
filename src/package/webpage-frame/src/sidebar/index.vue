<template>
  <div :class="{'sidebar-container':true,'collapse':isCollapse}">
    <!--    <el-button @click="setCollapse()" style="width: 40px">收起</el-button>-->
    <div style="background-color:#545c64;height: 100%">
      <div style="height: 50px;" class="logo-box">
        <a href="#">
          <img :src="img">
          <h1 :class="displayStatus">{{name}}</h1>
        </a>
      </div>
      <div class="menu-container">
        <div class="menu-contain-main">
          <el-menu
                  class="el-menu-vertical-demo"
                  @open="handleOpen"
                  @close="handleClose"
                  @select="menuSelect"
                  :collapse="isCollapse"
                  background-color="#545c64"
                  text-color="#fff"
                  active-text-color="#ffd04b"
                  :default-active="activeIndex"
                  router
          >
            <sidebar-item :menu="menu" @selectItemParentMethod="selectItem"></sidebar-item>
          </el-menu>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  .sidebar-container{
    height: 100%;
    overflow: hidden;
    .menu-container{
      box-sizing: border-box;
      padding-bottom: 50px;
      height: 100%;
      .menu-contain-main{
        height: 100%;
        overflow: auto;
        width: 210px;
        box-sizing: content-box;
        .el-menu {
          border-right:none;
          width: 200px;
        }
      }
    }
    .logo-box{
      text-align: center;
      line-height: 50px;
      color: #fff;
      a{
        display: block;
        img{
          display: inline-block;
          width: 35px;
          height: 35px;
          vertical-align: middle;
        }
        h1.toDisplay{
          display: inline-block;
          margin: 0 0 0 12px;
          color: #fff;
          font-weight: 600;
          font-size: 20px;
          vertical-align: middle;
          animation: fade-in;
          animation-duration: .3s;
        }
      }
    }
    .noDisplay{
      display: none;
    }

    .menuName{
      user-select: none;
    }
  }
  .sidebar-container.collapse{
    width: 80px;
    text-align: center;
    .menu-container{
      .menu-contain-main{
        width: 80px;
        box-sizing: content-box;
        .el-menu {
          border-right:none;
          width: 80px;
          .el-submenu__icon-arrow,.menuName{
            display: none
          }
        }
      }
    }
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
</style>

<script>
  import sidebarItem from "./sidebarItem";
  export default {
    name: 'sidebar',
    components: {sidebarItem},

    props: {
      menu: {
        type: [],

        default: () => {
        }
      },
      name: {
        type: String,
        default: () => {
        }
      },
      img: {
        type: String,
        default: () => {
        }
      }
    },

    data() {
      return {
        msg: '主页',
        isCollapse: false,
        activeIndex:"0",
        // toDisplay:toDisplay,
        displayStatus: {
          toDisplay: true,
          noDisplay: false
        },
      }
    },
    mounted() {

      console.log(this.img)
      // if(this.img.startsWith("@") || this.img.startsWith("./") || this.img.startsWith("../")){
      //   // this.systemImg = "require("+this.img+")";
      //   console.log("1111111111")
      //   this.systemImg = this.img;
      // }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      menuSelect(index,indexpath){
          console.log("......"+index);
          console.log("......"+indexpath);
        this.$emit("parentMethod");
      },
      setCollapse() {
        if(this.isCollapse){
          this.displayStatus.noDisplay=false;
          this.displayStatus.toDisplay=true;
          this.isCollapse = false;
        }else{

          this.displayStatus.noDisplay=true;
          this.displayStatus.toDisplay=false;
          this.isCollapse = true;
        }
      },
      selectItem(item){
        console.log("点击菜单");
        console.log(item);
        this.$emit("openMenu",item);
      }
    },
    watch:{
      $route(){
        this.activeIndex = this.$route.path;
      }
    }
  }
</script>
