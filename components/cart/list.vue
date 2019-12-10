<!--  -->
<template>
  <el-table :data="cartData" style="width:980px">
    <el-table-column label="项目" width="532" prop="name" />
    <el-table-column label="单价" width="132" prop="price" />
    <el-table-column label="数量" width="212">
      <!-- 此处的v-model需要动态绑定，由于prop是单向数据，所以此列不能使用prop属性-->
      <template slot-scope="scope">
        <el-input-number
          v-model="scope.row.count"
          @change="handleChange"
          :min="0"
        />
      </template>
    </el-table-column>
    <el-table-column label="总价">
      <template slot-scope="scope">
        {{ scope.row.price * scope.row.count }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    cartData: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleChange(value) {
    }
  }
}
</script>
