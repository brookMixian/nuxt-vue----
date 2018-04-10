<template>
  <section class="system">
    <el-row class="system_row">
      <el-col :span="4">
        <v-nav :navList="navList" @toggle="toggle($event)"></v-nav>
      </el-col>
      <el-col :span="20" class="system_right" v-if="authorizationObj.type">
        <el-row class="search">
          <el-col class="mName information_xs">用户名称：</el-col>
          <el-col :span="6">
            <el-input v-model="user.name"></el-input>
          </el-col>
          <el-col class="mobile information_xs">手机号：</el-col>
          <el-col :span="6">
            <el-input v-model="user.mobile"></el-input>
          </el-col>
          <el-col :span="4" class="s">
            <el-button type="primary" @click="search(0)">搜索</el-button>
          </el-col>
        </el-row>
        <v-permissions :tableData="tableObj" @determineAuthor="determineAuthorization($event)"></v-permissions>
        <el-row class="page">
          <el-pagination
            @current-change="handleCurrentChange($event)"
            :current-page.sync="pageInfo.pageIndex"
            :page-size="pageInfo.pageSize"
            layout="prev, pager, next, jumper"
            :total="pageInfo.total">
          </el-pagination>
        </el-row>

      </el-col>
      <el-col :span="20" class="system_right" v-if="maintenanceObj.type">
        <div class="system_add">
          <el-button type="primary" @click="add()">新增子目录</el-button>
        </div>
        <v-directory
          @modify="modify($event)"
          @deleted="deleted($event)"
          :directoryObj="maintenanceObj"></v-directory>
      </el-col>
      <el-col :span="20" class="system_right" v-if="postingObj.type">
      </el-col>
      <el-col :span="20" class="system_right" v-if="postManagementObj.type">
        <el-row class="search">
          <el-col class="mName information_xs">帖子标题：</el-col>
          <el-col :span="6">
            <el-input v-model="postManagementObj.postTitle "></el-input>
          </el-col>
          <!--<el-col class="mobile information_xs">帖子作者：</el-col>-->
          <!--<el-col :span="6">-->
          <!--<el-input v-model="postManagementObj.postName"></el-input>-->
          <!--</el-col>-->
          <el-col :span="4" class="information_xs" style="margin-left: 10px">
            <el-button type="primary" @click="search(1)">搜索</el-button>
          </el-col>
        </el-row>
        <v-postManagement :tableData="postManagementObj" @handChange="handChange($event)"></v-postManagement>
        <el-row class="page">
          <el-pagination
            @current-change="postCurrentChange($event)"
            :current-page.sync="postManagementObj.pageInfo.pageIndex"
            :page-size="postManagementObj.pageInfo.pageSize"
            layout="prev, pager, next, jumper"
            :total="postManagementObj.pageInfo.total">
          </el-pagination>
        </el-row>
      </el-col>

    </el-row>
  </section>

</template>

<script>
  import Nav from '~/components/navigation.vue'
  import permissions from '~/components/permissions.vue'
  import directory from '~/components/directoryMaintenance.vue'
  import postManagement from '~/components/postManagement.vue'
  import {api} from '../../plugins/http/axios'

  export default {
    asyncData() {
      return {
        user: {
          mobile: null,
          name: null
        },
        pageInfo: {
          pageIndex: 1,
          pageSize: 5,
          total: 1
        },
        navList: [
          {
            main: '权限管理',
            key: '0',
            status: true,
            timeList: [
              {
                menuName: '用户授权',
                key: 'authorization',
                status: true,
                statusFlag: false
              }
            ]
          },
          {
            main: '目录维护',
            status: false,
            key: '1',
            timeList: [
              {
                menuName: '量化学堂',
                key: 'maintenance',
                status: false,
                statusFlag: false
              }
            ]
          },
          {
            main: '社区',
            status: false,
            key: '2',
            timeList: [
              {
                menuName: '发帖',
                key: 'posting',
                status: false,
                statusFlag: false
              }
            ]
          },
          {
            main: '帖子管理',
            status: false,
            key: '3',
            timeList: [
              {
                menuName: '新手专区',
                key: 'posting',
                status: false,
                statusFlag: false
              },
              {
                menuName: 'web编程',
                key: 'postManagement',
                status: false,
                statusFlag: false
              }
            ]
          }
        ],
        authorizationObj: {
          type: true,
        },
        maintenanceObj: {
          type: false,
          data: [
            {
              menuName: '新手专区',
              postCount: 6,
              id: '0'
            },
            {
              menuName: 'Python编程',
              postCount: 6,
              id: '1'
            },
            {
              menuName: '策略与应用',
              postCount: 0,
              id: '2'
            }
          ]
        },
        postingObj: {
          type: false
        },
        postManagementObj: {
          options: [
            {
              label: '新手专区哈哈哈',
              value: 1
            },
            {
              label: '新手专区哈哈',
              value: 2
            },
            {
              label: '新手专区',
              value: 3
            }
          ],
          type: false,
          postTitle: '',
          postName: '',
          data: [
            {
              postTitle: '帖子标题',
              postName: '作者名称'
            }
          ],
          selectVal: '',
          menuId: null,
          pageInfo: {
            pageIndex: 1,
            pageSize: 5,
            total: 1
          }
        },
        tableObj: {
          selectVal: '',
          data: [
            {
              nickName: '',
              mobile: '',
              uid: '',
              value: ''
            }
          ]
        },
        currentPage3: null,
        config: {},
        defaultMsg: '',
        content: '<p>I am Example</p>',
        editorOption: {
          // some quill options
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block']
            ]
          }
        }
      }
    },
    head() {
      return {
        title: '系统管理'
      }
    },
    methods: {
      getUserRoleList() {
        // 用户授权列表
        let data = {
          mobile: this.user.mobile,
          userName: this.user.name,
          pageInfo: {
            pageIndex: this.pageInfo.pageIndex,
            pageSize: this.pageInfo.pageSize
          }
        };
        api.userRoleList(data).then((res) => {
          if (res.data.success) {
            console.log(res, '用户授权')
            this.tableObj.data = res.data.data.dataList;
            this.pageInfo.total = res.data.data.pageInfo.rowCount;
          }
        }).catch((err) => {
          console.log(err)

        })
      },
      getPostList() {
        // 帖子管理列表
        let data = {
          postTitle: this.postManagementObj.postTitle,
          // postName: this.postManagementObj.postName,
          pageInfo: {
            pageIndex: this.postManagementObj.pageInfo.pageIndex,
            pageSize: this.postManagementObj.pageInfo.pageSize
          },
          menuId: this.postManagementObj.menuId,
          status: '1'
        };
        api.postManagement(data).then((res) => {
          if (res.data.success) {
            console.log(res, '帖子管理列表')
            this.postManagementObj.data = res.data.data.dataList;
            this.postManagementObj.pageInfo.total = res.data.data.pageInfo.rowCount;
            // this.tableObj.data = res.data.data.dataList;
            // this.pageInfo.total = res.data.data.pageInfo.rowCount;
          }
        }).catch((err) => {
          console.log(err)

        })
      },
      getMenuList() {
        api.menuList().then((res) => {
          if (res.data.success) {
            this.maintenanceObj.data = res.data.data;
            this.navList[3].timeList = res.data.data;
            this.postManagementObj.options = res.data.data;
            // console.log(this.navList, '目录')
          }
          console.log(res, '目录维护列表')
        }).catch((err) => {
          console.log(err, '列表')

        })
      },
      getMenuModify(e, value) {
        let data = {
          menuId: e.menuId,
          menuName: value
        };
        api.menuModify(data).then((res) => {
          if (res.data.success) {
            console.log(res, '修改成功')
            this.$message({
              type: 'success',
              message: '你修改后的名称是: ' + value,
              duration: 2000,
              onClose: (() => {
                this.getMenuList();
              })
            });
          } else {
            this.$message({
              type: 'success',
              message: res.data.message,
              duration: 2000
            });
          }

        }).catch((err) => {
          this.$message({
            type: 'error',
            message: '修改失败',
            duration: 1000
          })
        })
      },
      getMenuAdd(value) {
        let data = {
          menuName: value
        }
        api.menuAdd(data).then((res) => {
          if (res.data.success) {
            this.$message({
              type: 'success',
              message: '新增成功',
              duration: 2000,
              onClose: (() => {
                this.getMenuList();
              })
            });
          } else {
            this.$message({
              type: 'info',
              message: res.data.message,
              duration: 2000
            });
          }

        }).catch((err) => {
          this.$message({
            type: 'error',
            message: '新增失败',
            duration: 2000
          });
        })
      },
      getMenuDelete(id) {
        let url = '/menu/del-menu?menuId=' + id;
        api.menuDelete(url).then((res) => {
          if (res.data.success) {
            this.$message({
              type: 'success',
              message: '删除成功',
              duration: 2000,
              onClose: (() => {
                this.getMenuList();
              })
            });
          } else {
            this.$message({
              type: 'info',
              message: res.data.message,
              duration: 2000
            });
          }

        }).catch((err) => {
          this.$message({
            type: 'error',
            message: '删除失败',
            duration: 2000
          });
        })

      },
      getAuthorization(e) {
        let url = '/userRole/authorization?roleId=' + e.roleId + '&userId=' + e.uid;
        api.authorization(url).then((res) => {
          if (res.data.success) {
            this.$message({
              type: 'success',
              message: res.data.message,
              duration: 1000
            })
          } else {
            this.$message({
              type: 'info',
              message: res.data.message,
              duration: 1000
            })
          }
        }).catch((err) => {

        })
      },
      getRestorePosting(e) {
        // 恢复帖子
        let url = 'post/resume-post';
        let data = {
          postId: e.postId,
          menuId: e.menuId
        }
        api.restorePosting(url, data).then((res) => {
          if (res.data.success) {
            this.$message({
              type: 'success',
              message: res.data.message,
              duration: 1000,
              onClose: (() => {
                this.getPostList();
              })
            })
          } else {
            this.$message({
              type: 'info',
              message: res.data.message,
              duration: 1000,
              onClose: (() => {
                this.getPostList();
              })
            })
          }
        }).catch((err) => {

        })
      },
      getPostingDigest(e) {
        // 帖子加精
        console.log(e.postId, '帖子加精')
        let url = 'post/add-highlight?postId=' + e.postId;
        api.restorePosting(url).then((res) => {
          if (res.data.success) {
            this.$message({
              type: 'success',
              message: res.data.message,
              duration: 1000,
              onClose: (() => {
                this.getPostList();
              })
            })
          } else {
            this.$message({
              type: 'info',
              message: res.data.message,
              duration: 1000,
              onClose: (() => {
                this.getPostList();
              })
            })
          }
        }).catch((err) => {

        })
      },
      getDelPosting(e) {
        // 删除帖子
        let url = 'post/del-post?postId=' + e.postId;
        api.restorePosting(url).then((res) => {
          if (res.data.success) {
            this.$message({
              type: 'success',
              message: res.data.message,
              duration: 1000,
              onClose: (() => {
                this.getPostList();
              })
            })
          } else {
            this.$message({
              type: 'info',
              message: res.data.message,
              duration: 1000,
              onClose: (() => {
                this.getPostList();
              })
            })
          }
        }).catch((err) => {

        })

      },
      determineAuthorization(e) {
        console.log(e.roleNum, 'shi duos');
        // 确认授权
        if (e.roleNum === '1000') {
          if (e.roleId != 1) {
            this.$confirm('该用户已经是超级管理员,修改会降低用户权限, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.getAuthorization(e)
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消',
                duration: 1000
              });
            });
          } else {
            this.$message({
              type: 'info',
              message: '该用户已经是超级管理员',
              duration: 1000
            })
          }

        } else {
          this.getAuthorization(e)
        }

      },
      toggle(e) {
        console.log(e, '看一看')
        switch (e.str.key || e.key) {
          case 'authorization': {
            // 授权
            e.navList.map((item) => {
              if (item.key === '0') {
                item.status = true;
                item.timeList.map((str) => {
                  // str.statusFlag = false;
                  if (str.key === 'authorization') {
                    str.status = true
                  } else {
                    str.status = false
                  }
                })
              } else {
                item.status = false
              }
            });
            this.authorizationObj.type = true;
            this.maintenanceObj.type = false;
            this.postingObj.type = false;
            this.postManagementObj.type = false;
            this.getMenuList();
            break
          }
          case 'maintenance': {
            // 学堂
            e.navList.map((item) => {
              if (item.key === '1') {
                item.status = true
                item.timeList.map((str) => {
                  // str.statusFlag = false;
                  if (str.key === 'maintenance') {
                    str.status = true
                  } else {
                    str.status = false
                  }
                })
              } else {
                item.status = false
              }
            });
            this.authorizationObj.type = false;
            this.postingObj.type = false;
            this.maintenanceObj.type = true;
            this.postManagementObj.type = false;
            this.getMenuList();
            break
          }
          case 'posting': {
            // 发帖
            e.navList.map((item) => {
              if (item.key === '2') {
                item.status = true
                item.timeList.map((str) => {
                  // str.statusFlag = false;
                  if (str.key === 'posting') {
                    str.status = true
                  } else {
                    str.status = false
                  }
                })
              } else {
                item.status = false
              }
            });
            this.$router.push({
              path: "/systemManagement/posting"
            })
            this.postingObj.type = true;
            this.authorizationObj.type = false;
            this.maintenanceObj.type = false;
            break
          }
          case '3': {
            e.navList.map((item, index) => {
              item.status = false;
              if (index === 3) {
                item.timeList.map((str, index) => {
                  if (index === e.index) {
                    str.statusFlag = true;
                    this.postManagementObj.menuId = str.menuId;
                    this.getPostList()
                  } else {
                    str.statusFlag = false;
                  }
                })
              }
              this.postManagementObj.type = true;
              this.postingObj.type = false;
              this.authorizationObj.type = false;
              this.maintenanceObj.type = false;

            })

            break
          }
        }
      },
      handChange(e) {
        console.log(e, '哈哈哈哈')
        // alert(e)
        switch (e.event) {
          case 1: {
            this.$confirm('确定加精该帖子吗？', e.obj.postTitle, {
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then((value) => {
              e.event = null;
              this.getPostingDigest(e.obj)
              // this.getMenuDelete(item.menuId)
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消加精',
                duration: 1000,
                onClose: (() => {
                  this.getPostList();
                })
              });
            });
            break
          }
          case 2: {
            this.$router.push({
              path: '/systemManagement/posting',
              query: {
                postIngObj: e
              }
            })
            break
          }
          case 3: {
            this.$confirm('确定删除该帖子吗？', e.obj.postTitle, {
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then((value) => {
              this.getDelPosting(e.obj)
              // this.getMenuDelete(item.menuId)
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除',
                duration: 1000,
                onClose: (() => {
                  this.getPostList();
                })
              });
            });
            break
          }
          case 4: {
            this.$confirm('确定恢复该帖子吗？', e.obj.postTitle, {
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then((value) => {
              this.getRestorePosting(e.obj)
              // this.getMenuDelete(item.menuId)
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消恢复',
                duration: 1000,
                onClose: (() => {
                  this.getPostList();
                })
              });
            });
            break
          }
        }
      },
      handleCurrentChange(e) {
        // 页码切换调用
        this.pageInfo.pageIndex = e;
        this.getUserRoleList();
      },
      postCurrentChange(e) {
        console.log(e, '哈哈哈1')
        this.postManagementObj.pageInfo.pageIndex = e;
        this.getPostList();
      },
      modify(e) {
        // 子目录修改
        this.$prompt('请输入名称', '修改', {
          confirmButtonText: '确定',
          inputValue: e.menuName,
          cancelButtonText: '取消',
          inputPattern: /\S/,
          inputErrorMessage: '不能为空'
        }).then(({value}) => {
          this.getMenuModify(e, value)

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消',
            duration: 1000
          });
        });
      },
      search(index) {
        switch (index) {
          case 0: {
            this.getUserRoleList();
            break
          }
          case 1: {
            this.getPostList();
            break
          }
        }

      },
      deleted(item) {
        // 子目录删除
        if (item.postCount < 1) {
          this.getMenuDelete(item.menuId);
        } else {
          this.$confirm('该目录下有帖子' + item.postCount + '个，确认删除吗？', item.menuName, {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          }).then((value) => {
            this.getMenuDelete(item.menuId)
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除',
              duration: 1000
            });
          });
        }
      },
      add() {
        // 新增
        this.$prompt('请输入名称', '新增', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /\S/,
          inputErrorMessage: '不能为空'
        }).then(({value}) => {
          this.getMenuAdd(value)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消新增',
            duration: 1000
          });
        });
      }
    },
    computed: {},
    components: {
      'v-nav': Nav,
      'v-permissions': permissions,
      'v-directory': directory,
      'v-postManagement': postManagement
    },
    mounted() {
      this.getMenuList();
      this.getUserRoleList();
    }
  }
</script>

<style lang="scss" scoped>
  .system {
    width: 100%;
  }

  .quill-editor {
    min-height: 200px;
    max-height: 400px;
    overflow-y: auto;
  }

  .system_add {
    width: 90%;
    margin: 20px auto;
  }

  .page {
    width: 90%;
    margin: 20px auto 0;
    text-align: center;
  }

  .search {
    width: 90%;
    margin: 20px auto 0;
    .mName {
      display: inline-block;
      width: 80px;
      line-height: 34px;
    }
    .mobile {
      display: inline-block;
      width: 70px;
      margin-left: 20px;
      line-height: 34px;
    }
    .s {
      margin-left: 20px;
    }
  }

  .system_row {
    width: 80%;
    margin: 20px auto 0;
    height: 500px;
    border: 1px solid #d3d3d3;
  }

  .system_right {
    height: 500px;
    border-left: 1px solid #d3d3d3;
  }

</style>
