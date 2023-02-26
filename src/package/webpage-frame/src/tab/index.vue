<template>
  <div class="front-board-tab-nav">
    <div class="tab-nav-main">
      <div class="tab-nav-box">
          <el-tabs v-model="editableTabsValue" type="card"
                   :closable="tagLen"
                   @tab-remove="removeTab"
                   @tab-click="openTag">
            <el-tab-pane
              v-for="(item) in editableTabs"
              :key="item.name"
              :label="item.title"
              :name="item.name"
              :closable="false"
            >
              {{item.content}}
            </el-tab-pane>
          </el-tabs>
          <el-dropdown class="avue-tags__menu" size="mini"  @command="handleCommand">
            <el-button type="primary" class="el-button--mini">
              更多<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="closeOtherTab">关闭其它</el-dropdown-item>
              <el-dropdown-item command="closeAllTab">关闭全部</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
  .front-board-tab-nav{
    background: white;
    position: absolute;
    width: 100%;
    top: 0;
    .tab-nav-main{
      padding: 0 10px;
    }
    .tab-nav-box{
      padding-right: 110px;
      position: relative;
    }
    .avue-tags__menu {
      position: absolute!important;
      top: 4px;
      right: 0;
      padding: 1px 0 0 15px;
    }
    .el-tabs__header{
      margin-bottom: 0;
    }
    .el-tabs--card>.el-tabs__header {
      border: none;
    }
    .el-tabs--card>.el-tabs__header .el-tabs__nav {
      /*border: 1px solid #E4E7ED;*/
      border: none;
    }
    .el-tabs--card>.el-tabs__header .el-tabs__item {
      /*border-bottom: 1px solid transparent;*/
      border-left: none;
    }
    .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
      color: #2BC2E8;
      border-bottom: 2px solid #2BC2E8;
    }

    .el-dropdown {
      vertical-align: top;
    }
    .el-dropdown + .el-dropdown {
      margin-left: 15px;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }

    .el-tabs__item{
      user-select: none;
    }
  }
</style>
<script>
  export default {
      name: 'tab',

      props: {
        homePageTab: {
          type: Object,
          default: () => {
          }
        }
      },
      data() {
          return {
              editableTabsValue: '/home',
              editableTabs: [{
                  title: '首页',
                  name: '/home',
              }],
              tabIndex: 1,
          }
      },
      computed: {
          tagLen() {

            if(this.editableTabs.length ==1){
              if(this.editableTabs[0].title == this.homePageTab.name && this.homePageTab.closableIfOnly != true){
                return false;
              }
            }
            return true;
          }
      },
      mounted() {
        console.log(this.homePageTab)
        if(this.homePageTab){
          if(this.homePageTab.defaultOpen == true){
            console.log("0000000000000000")
            this.editableTabs=[{
              title:this.homePageTab.name?this.homePageTab.name:"首页",
              name:this.homePageTab.route
            }]

            this.$router.push({
              path: this.homePageTab.route,
            });
          }else{
            console.log("11111111111111")
            this.editableTabs=[];
          }
        }
      },

      methods: {
          handleCommand(command) {
              console.log(command);
              if(command == "closeAllTab"){
                  this.editableTabs = [{
                      title: '首页',
                      name: '/home',
                  }];
                  this.editableTabsValue='/home';
                  this.$router.push({
                      path: '/home',
                  });
              }else{ //关闭其他
                  let tabs = this.editableTabs;
                  console.log(this.editableTabs);
                  for(var i=0;i<this.editableTabs.length;i++){
                      console.log(this.editableTabs);
                      if(this.editableTabs[i].name != this.editableTabsValue){
                          this.editableTabs.splice(i, 1);
                          i--;
                      }
                  }
              }
          },
          openMenu(item){
              for(var i = 0;i<this.editableTabs.length;i++){
                  if(this.editableTabs[i].name == item.path){
                      this.editableTabsValue = this.editableTabs[i].name;
                      return true;
                  }
              }
              this.$options.methods.addTab(item,this);
          },
          addTab(item,that) {
              that.editableTabs.push({
                  title: item.menuName,
                  name: item.path,
              });
              that.editableTabsValue = item.path;
          },
          removeTab(targetName) {

            if(this.editableTabs.length ==1){
              //如果是首页
              //如果不是首页
              if(this.homePageTab){
                if(this.homePageTab.closableIfOnly !=true && this.homePageTab.cleanAllTabDefaultOpen == true){
                  this.editableTabs=[{
                    title:this.homePageTab.name?this.homePageTab.name:"首页",
                    name:this.homePageTab.route
                  }]
                  this.$router.push({
                    path: this.homePageTab.route,
                  });
                }else{
                  this.editableTabs=[];
                }
              }else{
                this.editableTabs=[];
              }
            }else{
              let tabs = this.editableTabs;
              let activeName = this.editableTabsValue;
              if (activeName === targetName) {
                tabs.forEach((tab, index) => {
                  if (tab.name === targetName) {
                    let nextTab = tabs[index + 1] || tabs[index - 1];
                    if (nextTab) {
                      activeName = nextTab.name;
                    }
                  }
                });
              }
              this.editableTabsValue = activeName;
              this.editableTabs = tabs.filter(tab => tab.name !== targetName);
              console.log(this.editableTabsValue);
              this.$router.push({
                path: this.editableTabsValue,
              });
            }
          },
          openTag(targetName){
            this.$router.push({
                path: targetName.name,
            });
          },
      }
  }
</script>
