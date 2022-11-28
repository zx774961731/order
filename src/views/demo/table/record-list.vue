<template>
  <n-form ref="formRef" class="search" :label-width="80" :model="formValue">
    <div class="oneLine">
      <n-form-item label="工单编号" path="ticketId">
        <n-input v-model:value="formValue.ticketId" placeholder="输入工单编号" />
      </n-form-item>
      <n-form-item label="问题分类" path="questionType">
        <n-select v-model:value="formValue.questionType" :options="questionType" placeholder="请选择" />
      </n-form-item>
      <n-form-item label="工单状态" path="status">
        <n-select v-model:value="formValue.status" :options="status" placeholder="请选择" />
      </n-form-item>
      <n-form-item label="产品选择" path="product">
        <n-input
          v-model:value="formValue.product"
          placeholder="请选择"
          @blur="productBlur"
          @focus="productShow = true"
          @input="productSelect"
        />
        <div v-show="productShow" class="product">
          <div v-for="item in productListShow" :key="item" class="item" @click="formValue.product = item">
            {{ item }}
          </div>
          <div v-if="productListShow.length == 0">暂无数据</div>
        </div>
      </n-form-item>
      <n-collapse class="collapse" @item-header-click="itemClick">
        <n-collapse-item title="更多" name="1"> </n-collapse-item>
      </n-collapse>
      <div>
        <n-button @click="getList()">搜索</n-button>
        <n-button @click="restForm">取消</n-button>
      </div>
    </div>
    <div v-if="isShow" class="towLine">
      <n-form-item label="紧急程度" path="emergencyDegree">
        <n-select v-model:value="formValue.emergencyDegree" :options="emergencyDegree" placeholder="请选择" />
      </n-form-item>
      <n-form-item class="datePicker" label="提交时间" path="submission">
        <n-date-picker v-model:value="formValue.submission" type="datetimerange" clearable />
      </n-form-item>
    </div>
  </n-form>
  <!-- :pagination="pagination" -->
  <!-- <n-data-table :columns="columns" :data="data.records" :pagination="pagination" /> -->
  <n-data-table :columns="columns" :data="data.records || []" />
  <n-pagination
    :item-count="data.totalCount"
    :page="page.pageNo"
    :page-size="page.pageSize"
    :page-sizes="[1, 2, 20]"
    :show-size-picker="true"
    :show-quick-jumper="true"
    @update:page="pageChange"
    @update:page-size="pageSizeChange"
  >
    <template #goto> 跳转 </template>
  </n-pagination>
</template>

<script setup>
import { getRecordList } from '@/api/zx'
import dayjs from 'dayjs'
import { h, onMounted, reactive, ref } from 'vue'

const isShow = ref(false)
const productShow = ref(false)
const productList = ['产品1', '产品2', '产品3', '产品4', '产品5', '产品6', '产品7']
const productListShow = ref(['产品1', '产品2', '产品3', '产品4', '产品5', '产品6', '产品7'])
const productSelect = (value) => {
  productListShow.value = productList.filter((item) => item.includes(value))
}
const productBlur = () => {
  setTimeout(() => {
    productShow.value = false
  }, 300)
}

const formRef = ref(null)
const formValue = ref({
  ticketId: '',
  questionType: null,
  status: null,
  product: null,
  emergencyDegree: null,
  submission: null,
})

const restForm = () => {
  formValue.value = {
    ticketId: '',
    questionType: null,
    status: null,
    product: null,
    emergencyDegree: null,
    submission: null,
  }
  getList()
}
const page = reactive({
  pageNo: 1,
  pageSize: 10,
})

const data = ref({
  records: [],
})
const pageSizeChange = (pageSize) => {
  page.pageSize = pageSize
  getList()
}

const pageChange = (pageNo) => {
  page.pageNo = pageNo
  getList()
}

// const pagination = ref({
//   itemCount: data.value.totalCount,
//   pageCount: page.pageNo,
//   showQuickJumper: true,
//   page: page.pageNo,
//   pageSize: page.pageSize,
//   showSizePicker: true,
//   pageSizes: [1, 2, 20],
//   pageCount: '2',
//   onUpdatePage: (a) => {
//     console.log(a)
//     pagination.value.page = page
//   },
//   onUpdatePageSize: (pageSize) => {
//     pagination.value.pageSize = pageSize
//     page.pageSize = pageSize
//     getList()
//     console.log(pagination)
//   },
//   goto: () => '123',
// })

const questionType = [
  {
    label: '问题咨询',
    value: '1',
  },
  {
    label: '报障',
    value: '2',
  },
  {
    label: '解决方案',
    value: '3',
  },
  {
    label: '投诉',
    value: '4',
  },
]
const emergencyDegree = [
  {
    label: '一般',
    value: '1',
  },
  {
    label: '较紧急',
    value: '2',
  },
  {
    label: '非常紧急',
    value: '3',
  },
]

const status = [
  {
    label: '处理中',
    value: '1',
  },
  {
    label: '已完结',
    value: '2',
  },
  {
    label: '已撤销',
    value: '3',
  },
]

const columns = [
  { title: '工单编号', key: 'ticketId', width: 150 },
  { title: '产品', key: 'product', ellipsis: { tooltip: true } },
  {
    title: '问题分类',
    key: 'questionType',
    render(row) {
      return h('span', {}, { default: () => questionType.find((item) => item.value == row.status).label })
    },
  },
  {
    title: '紧急程度',
    key: 'emergencyDegree',
    render(row) {
      return h('span', {}, { default: () => emergencyDegree.find((item) => item.value == row.emergencyDegree).label })
    },
  },
  {
    title: '工单提交人',
    key: 'postUserName',
    render(row) {
      return row.postType == 2 ? row.staffUserName : row.customerUserName
    },
  },
  {
    title: '提交时间',
    key: 'gmtCreate',
    render(row) {
      return dayjs(row.gmtCreate).format('YYYY-MM-DD HH:mm:ss')
    },
  },
  { title: '处理完成时间', key: 'gmtModified' },
  {
    title: '工单状态',
    key: 'status',
    render(row) {
      return h('span', {}, { default: () => status.find((item) => item.value == row.status).label })
    },
  },
  {
    title: '操作',
    key: 'action',
    render(row) {
      return [
        h(
          'a',
          {
            onClick: () => {
              console.log('跳转详情页')
            },
            style: { marginRight: '8px' },
          },
          { default: () => '详情' }
        ),
        h(
          'a',
          {
            onClick: () => {
              console.log('撤销工单')
            },
            style: { display: row.status == 1 ? 'contents' : 'none' },
          },
          { default: () => '撤销工单' }
        ),
      ]
    },
  },
]

const itemClick = () => {
  isShow.value = !isShow.value
}

const getList = async () => {
  const { submission } = formValue.value
  let submissionDate = {}
  if (submission) {
    submissionDate.startDate = dayjs(submission[0]).format('YYYY-MM-DD HH:mm:ss')
    submissionDate.endDate = dayjs(submission[1]).format('YYYY-MM-DD HH:mm:ss')
  }
  const res = await getRecordList({ ...page, ...formValue.value, submissionDate })
  data.value = res
}
onMounted(() => {
  getList()
})
</script>

<style lang="less" scoped>
.search .n-form-item {
  // display: flex;
  margin-right: 16px;
  max-width: 300px;
  width: 300px;
  height: 60px;
  .n-form-item-blank {
    width: 200px;
  }
  .n-form-item-label {
    line-height: 60px;
  }
}
.oneLine,
.towLine {
  width: 100%;
  display: flex;
  .n-form-item,
  .collapse {
    flex: 1;
  }
}
.search .datePicker {
  width: 300px;
}

.product {
  position: absolute;
  z-index: 2000;
  top: 34px;
  width: 100%;
  height: 120px;
  background-color: #fff;
  padding: 4px;
  box-shadow: 0 1px 2px -2px #00000029, 0 3px 6px #0000001f, 0 5px 12px 4px #00000017;
  overflow-y: scroll;
  .item {
    height: 34px;
    padding: 4px;
    &:hover {
      background-color: #f2f3f5;
    }
  }
}
</style>
