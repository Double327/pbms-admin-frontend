<template>
  <div class="app-container">

    <!--  搜索表单  -->
    <el-form :inline="true">
      <el-form-item label="菜单名称">
        <el-input
            placeholder="请输入菜单名称"
            clearable
            size="small"
        />
      </el-form-item>
      <el-form-item label="状态">
        <el-select placeholder="菜单状态" size="small" value="123">
          <el-option value="123"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAdd">新增</el-button>
      </el-form-item>
    </el-form>

    <!-- 数据显示区域 -->
    <el-table
        v-loading="loading"
        :data="menuList"
        row-key="id"
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <!--  菜单名称  -->
      <el-table-column prop="name" label="菜单名称" :show-overflow-tooltip="true" width="130px"></el-table-column>
      <!--  图标  -->
      <el-table-column prop="icon" label="图标" align="center" width="100px">
        <template slot-scope="scope">
          <svg-icon :icon-class="scope.row.icon"></svg-icon>
        </template>
      </el-table-column>
      <!--  排序  -->
      <el-table-column prop="orderNum" label="排序" width="60px"></el-table-column>
      <!--  权限标示  -->
      <el-table-column prop="perms" label="权限标识" width="130px" align="center"
                       :show-overflow-tooltip="true"></el-table-column>
      <!--  组建路径  -->
      <el-table-column prop="path" label="组建路径" width="180px" :show-overflow-tooltip="true"></el-table-column>
      <!--  可见  -->
      <el-table-column prop="visible" label="可见" width="80px"></el-table-column>
      <!--  创建时间  -->
      <el-table-column prop="createTime" label="创建时间" width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <!--  操作  -->
      <el-table-column label="操作" align="center" width="180px">
        <template slot-scope="scope">
          <el-button
              size="mini"
              type="text"
              icon="el-icon-plus"
              @click="handleAdd(scope.row)"
          >新增
          </el-button>
          <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.row)"
          >修改
          </el-button>
          <el-button
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--  修改删除对话框  -->
    <el-dialog :title="title" :visible.sync="open" width="600px">
      <el-form ref="form" label-width="80px" :rules="rules">
        <el-row>
          <el-col :span="24">
            <el-form-item label="上级菜单">

            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="菜单类型" prop="menuType">
              <el-radio-group v-model="form.menuType">
                <el-radio label="M">目录</el-radio>
                <el-radio label="C">菜单</el-radio>
                <el-radio label="F">按钮</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item v-if="form.menuType != 'F'" label="菜单图标">
              <el-popover
                  placement="bottom-start"
                  width="460"
                  trigger="click"
                  @show="$refs['iconSelect'].reset()"
              >
                <IconSelect ref="iconSelect" @selected="selected"/>
                <el-input slot="reference" v-model="form.icon" placeholder="点击选择图标" readonly>
                  <svg-icon
                      v-if="form.icon"
                      slot="prefix"
                      :icon-class="form.icon"
                      class="el-input__icon"
                      style="height: 32px;width: 16px;"
                  />
                  <i v-else slot="prefix" class="el-icon-search el-input__icon"/>
                </el-input>
              </el-popover>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单名称" prop="menuName">
              <el-input v-model="form.menuName" placeholder="请输入菜单名称"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示排序" prop="orderNum">
              <el-input-number v-model="form.orderNum" controls-position="right" :min="0"/>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="form.menuType != 'F'">
            <el-form-item label="是否外链">
              <el-radio-group v-model="form.isFrame">
                <el-radio label="0">是</el-radio>
                <el-radio label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="form.menuType != 'F'">
            <el-form-item label="路由地址" prop="path">
              <el-input v-model="form.path" @input="change($event)" placeholder="请输入路由地址"/>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="form.menuType == 'C'">
            <el-form-item label="组件路径" prop="component">
              <el-input v-model="form.component" placeholder="请输入组件路径"/>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="form.menuType != 'M'">
            <el-form-item label="权限标识">
              <el-input v-model="form.perms" placeholder="请权限标识" maxlength="50"/>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="form.menuType != 'F'">
            <el-form-item label="菜单状态">
              <el-radio-group v-model="form.visible">
                <el-radio
                    v-for="dict in visibleOptions"
                    :key="dict.dictValue"
                    :label="dict.dictValue"
                >{{ dict.dictLabel }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import SvgIcon from "@/components/SvgIcon/index";
import {menuList} from "@/api/system/menu";
import IconSelect from "@/components/IconSelect/index";

export default {
  name: "Menu",
  components: {SvgIcon, IconSelect},
  data() {
    return {
      loading: true,
      menuList: [],
      title: "",
      open: true,
      queryParams: {
        name: undefined,
        visible: undefined
      },
      form: {},
      rules: {
        name: [
          {required: true, message: "菜单名称不能为空", trigger: "blur"}
        ],
        orderNum: [
          {required: true, message: "菜单顺序不能为空", trigger: "blur"}
        ]
      }
    }
  },
  created() {
    this.getMenuList();
    this.loading = false;
  },
  methods: {
    getMenuList() {
      menuList().then(res => {
        this.menuList = res.data;
      });
    },
    handleQuery() {

    },
    handleAdd(row) {
      console.log(row);
    },
    handleEdit(row) {
      console.log(row);
    },
    handleDelete(row) {
      console.log(row);
    }
  }
}
</script>

<style scoped>

</style>
