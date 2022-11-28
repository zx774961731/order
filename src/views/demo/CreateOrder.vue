<template>
  <section class="top-step">
    <n-steps :current="state.current" status="process">
      <n-step title="选择用户及产品" />
      <n-step title="填写工单信息" />
    </n-steps>
  </section>
  <section v-show="state.current === 1" class="choose-product">
    <n-form
      ref="formUserRef"
      :model="state.model"
      :rules="state.rules"
      label-placement="top"
      label-width="auto"
      require-mark-placement="left"
      :style="{
        maxWidth: '640px',
      }"
    >
      <n-form-item label="选择用户：" path="customerUser">
        <n-select
          v-model:value="state.model.customerUser"
          placeholder="请选择用户"
          :options="userOptions"
          :style="{
            width: '250px',
          }"
        />
      </n-form-item>
    </n-form>
    <n-button type="info" class="f_r" @click="onNext"> 下一步 </n-button>
  </section>
  <section v-show="state.current === 2" class="form-container">
    <section class="user-product">
      <span>已选择用户：</span>{{ customerValueLabel[state.model.customerUser] }}
      <span class="m_l_20">已选择产品：</span>产品A
      <n-button quaternary type="info" class="m_l_20" @click="onPrevious"> 重新选择 </n-button>
    </section>
    <NDivider />
    <n-form
      ref="formRef"
      :model="state.model"
      :rules="state.rules"
      label-placement="left"
      label-width="130px"
      require-mark-placement="left"
      :style="{
        maxWidth: '640px',
      }"
    >
      <n-form-item label="问题分类：" path="questionType">
        <n-radio-group v-model:value="state.model.questionType" name="radiogroup1">
          <n-space>
            <n-radio value="1"> 问题咨询 </n-radio>
            <n-radio value="2"> 报障 </n-radio>
            <n-radio value="3"> 解决方案 </n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="工单处理人：" path="nextUser">
        <n-select
          v-model:value="state.model.nextUser"
          placeholder="请选择工单处理人"
          :options="generalOptions"
          :style="{
            width: '250px',
          }"
        />
      </n-form-item>
      <n-form-item label="紧急程度：" path="emergencyDegree">
        <n-radio-group v-model:value="state.model.emergencyDegree" name="radiogroup1">
          <n-space>
            <n-radio value="1"> 一般 </n-radio>
            <n-radio value="2"> 较紧急 </n-radio>
            <n-radio value="3"> 非常紧急 </n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>
      <n-form-item label="问题描述：" path="description">
        <n-input
          v-model:value="state.model.description"
          placeholder="请输入问题描述"
          type="textarea"
          maxlength="1000"
          show-count
          :autosize="{
            minRows: 6,
            maxRows: 9,
          }"
        />
      </n-form-item>
      <n-form-item label="备注：" path="comments">
        <n-input
          v-model:value="state.model.comments"
          placeholder="请输入备注"
          type="textarea"
          maxlength="500"
          show-count
          :autosize="{
            minRows: 3,
            maxRows: 6,
          }"
        />
      </n-form-item>
      <n-form-item label="附件：" path="fileAddress"> 附件地址 </n-form-item>
      <n-form-item label="通知方式：" path="contactType">
        <n-radio-group v-model:value="state.model.contactType" name="radiogroup1">
          <n-space>
            <n-radio value="1"> 邮箱 </n-radio>
            <n-radio value="2"> 电话 </n-radio>
          </n-space>
        </n-radio-group>
      </n-form-item>
      <n-form-item v-show="state.model.contactType === '1'" label="邮箱地址：" path="email">
        <n-input v-model:value="state.model.email" placeholder="请输入邮箱地址" :style="{ width: '250px' }" />
      </n-form-item>
      <n-form-item v-show="state.model.contactType === '2'" label="联系电话：" path="phone">
        <n-input v-model:value="state.model.phone" placeholder="请输入联系电话" :style="{ width: '250px' }" />
      </n-form-item>
      <div style="padding-left: 130px">
        <n-button @click="onPrevious"> 上一步 </n-button>
        <n-button type="info" class="m_l_20" @click="onSubmit"> 提交 </n-button>
      </div>
    </n-form>
  </section>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import { submitOrder } from '@/api/zx'
import { generalOptions, userOptions } from './constanst'

const staffValueLabel = {}
generalOptions.forEach((item) => {
  staffValueLabel[item.value] = item.label
})
const customerValueLabel = {}
userOptions.forEach((item) => {
  customerValueLabel[item.value] = item.label
})
const formRef = ref(null)
const formUserRef = ref(null)
const state = reactive({
  current: 1,
  model: {
    customerUser: null,
    questionType: '1',
    nextUser: null,
    emergencyDegree: '1',
    description: '',
    comments: '',
    fileAddress: [''],
    contactType: '1',
    email: '',
    phone: '',
  },
  rules: {
    customerUser: {
      required: true,
      trigger: ['blur', 'change'],
      message: '请选择用户',
    },
    questionType: {
      required: true,
      trigger: 'change',
    },
    nextUser: {
      required: true,
      trigger: ['blur', 'change'],
      message: '请选择工单处理人',
    },
    emergencyDegree: {
      required: true,
      trigger: 'change',
    },
    description: {
      required: true,
      trigger: ['blur', 'input'],
      message: '请输入问题描述',
    },
    contactType: {
      required: true,
      trigger: 'change',
    },
    email: {
      required: true,
      trigger: ['blur', 'input'],
      message: '请输入邮箱地址',
    },
    phone: {
      required: false,
      trigger: ['blur', 'input'],
      message: '请输入联系电话',
    },
  },
})

watch(
  () => state.model.contactType,
  (_new, _old) => {
    if (_new === '1') {
      state.rules.email.required = true
      state.rules.phone.required = false
    } else if (_new === '2') {
      state.rules.email.required = false
      state.rules.phone.required = true
    }
  }
)

function onNext() {
  formUserRef.value?.validate((errors) => {
    if (!errors) {
      state.current = 2
    } else {
      console.log(errors)
    }
  })
}
function onPrevious() {
  state.current = 1
}
function onSubmit(e) {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      const params = {
        staffUser: 'staff2',
        staffUserName: '客服2',
        customerUser: state.model.customerUser,
        customerUserName: customerValueLabel[state.model.customerUser],
        questionType: state.model.questionType,
        nextUser: state.model.nextUser,
        nextUserName: staffValueLabel[state.model.nextUser],
        emergencyDegree: state.model.emergencyDegree,
        description: state.model.description,
        comments: state.model.comments,
        fileAddress: state.model.fileAddress,
        contactType: state.model.contactType,
        contactInfo: state.model.contactType === '1' ? state.model.email : state.model.phone,
      }
      submitOrder(params)
        .then((res) => {
          window.$message.success('提交成功')
          state.current = 1
          state.model = {
            questionType: '1',
            nextUser: null,
            emergencyDegree: '1',
            description: '',
            comments: '',
            fileAddress: [''],
            contactType: '1',
            email: '',
            phone: '',
          }
        })
        .catch((err) => {
          window.$message.error('提交失败')
        })
    } else {
      console.log(errors)
      window.$message.error('请正确填写工单信息')
    }
  })
}
</script>

<style lang="less" scoped>
.top-step {
  padding: 20px;
  background-color: rgb(253 246 246);
  margin-bottom: 20px;
}
.form-container {
  background-color: rgb(253 246 246);
  height: 900px;
  padding: 20px;
  .user-product {
    font-weight: bold;
  }
}
</style>
