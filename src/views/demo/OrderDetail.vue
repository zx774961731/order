<template>
  <section class="detail-container clearfix">
    <section class="left-container f_l">
      <section class="order-detail-container clearfix">
        <h2 class="t_c order-title">
          <n-icon size="40" class="f_l back-icon" @click="onBack">
            <ArrowBackOutline />
          </n-icon>
          {{ query.orderId }} 工单处理
        </h2>
        <NDivider />
        <h3>工单详情</h3>
        <section class="m_l_50 clearfix">
          <section class="left-detail-container f_l">
            <section class="clearfix">
              <section class="w_30_p f_l">用户名称：</section>
              <section class="w_60_p f_l">{{ state.orderDetail.customerUserName }}</section>
            </section>
            <section class="clearfix">
              <section class="w_30_p f_l">问题分类：</section>
              <section class="w_60_p f_l">{{ onHandleQuestionType(state.orderDetail.questionType) }}</section>
            </section>
            <section class="clearfix">
              <section class="w_30_p f_l">工单提交人：</section>
              <section class="w_60_p f_l">{{ state.orderDetail.staffUserName }}</section>
            </section>
            <section class="clearfix">
              <section class="w_30_p f_l">通知方式：</section>
              <section class="w_60_p f_l">{{ onHandleContactType(state.orderDetail.contactType) }}</section>
            </section>
            <section class="clearfix">
              <section class="w_30_p f_l">工单状态：</section>
              <section class="w_60_p f_l">{{ onHandleStatus(state.orderDetail.status) }}</section>
            </section>
            <section class="clearfix">
              <section class="w_30_p f_l">问题描述：</section>
              <section class="w_60_p f_l">
                <n-ellipsis :line-clamp="2">
                  {{ state.orderDetail.description }}
                </n-ellipsis>
              </section>
            </section>
            <section class="clearfix">
              <section class="w_30_p f_l" style="margin-bottom: 0">附件：</section>
              <section class="w_60_p f_l" style="margin-bottom: 0">
                <section v-for="(item, index) in state.orderDetail.fileAddressArray" :key="index" class="file">
                  {{ item }}
                </section>
              </section>
            </section>
          </section>
          <section class="right-detail-container f_l">
            <section class="clearfix">
              <section class="w_30_p f_l">产品：</section>
              <section class="w_60_p f_l">{{ state.orderDetail.product }}</section>
            </section>
            <section class="clearfix">
              <section class="w_30_p f_l">紧急程度：</section>
              <section class="w_60_p f_l">{{ onHandleEmergency(state.orderDetail.emergencyDegree) }}</section>
            </section>
            <section class="clearfix">
              <section class="w_30_p f_l">提交时间：</section>
              <section class="w_60_p f_l">{{ onHandleTime(state.orderDetail.gmtCreate) }}</section>
            </section>
            <section class="clearfix">
              <template v-if="state.orderDetail.contactType == '1'">
                <section class="w_30_p f_l">邮箱地址：</section>
              </template>
              <template v-if="state.orderDetail.contactType == '2'">
                <section class="w_30_p f_l">联系电话：</section>
              </template>
              <section class="w_60_p f_l">{{ state.orderDetail.contactInfo }}</section>
            </section>
          </section>
        </section>
        <section
          v-if="state.orderDetail.status === 2 && query.fromPage === 'doneOrderTable'"
          class="watermark-container"
        >
          <section class="text">已完结</section>
        </section>
        <section
          v-if="state.orderDetail.status === 3 && query.fromPage === 'doneOrderTable'"
          class="watermark-container"
        >
          <section class="text">已撤销</section>
        </section>
      </section>
      <template v-if="state.orderDetail.status === 1 && query.fromPage !== 'doneOrderTable'">
        <NDivider class="f_l" />
        <section class="order-handle-container clearfix">
          <h3
            style="
               {
                height: 40px;
                line-height: 40px;
                display: inline-block;
              }
            "
          >
            工单处理
          </h3>
          <n-button type="info" class="m_l_20 f_r" @click="onComment"> 评论 </n-button>
          <section class="m_l_70">
            <n-form
              ref="formRef"
              :model="state.model"
              :rules="state.rules"
              label-placement="left"
              label-width="auto"
              require-mark-placement="left"
            >
              <n-form-item label="工单处理：" path="orderHandleType">
                <n-radio-group v-model:value="state.model.orderHandleType" name="radiogroup1">
                  <n-space>
                    <n-radio value="1"> 结单 </n-radio>
                    <n-radio value="2"> 转派 </n-radio>
                  </n-space>
                </n-radio-group>
              </n-form-item>
              <section v-show="state.model.orderHandleType === '1'">
                <n-form-item label="处理结果：" path="handleResult">
                  <n-input
                    v-model:value="state.model.handleResult"
                    placeholder="请输入处理结果"
                    type="textarea"
                    maxlength="500"
                    show-count
                    :autosize="{
                      minRows: 3,
                      maxRows: 5,
                    }"
                  />
                </n-form-item>
              </section>
              <section v-show="state.model.orderHandleType === '2'">
                <n-form-item label="工单转派：" path="orderTurnSend">
                  <n-select
                    v-model:value="state.model.orderTurnSend"
                    placeholder="请选择工单处理人"
                    :options="generalOptions"
                  />
                </n-form-item>
                <n-form-item label="备注：" path="comments">
                  <n-input
                    v-model:value="state.model.comments"
                    placeholder="请输入处理结果"
                    type="textarea"
                    maxlength="500"
                    show-count
                    :autosize="{
                      minRows: 3,
                      maxRows: 5,
                    }"
                  />
                </n-form-item>
              </section>
              <div style="padding-left: 93px">
                <n-button @click="onBack"> 返回 </n-button>
                <n-button type="info" class="m_l_20" @click="onSubmit"> 提交 </n-button>
              </div>
            </n-form>
          </section>
        </section>
      </template>
      <template v-if="state.orderDetail.status === 2 && query.fromPage === 'doneOrderTable'">
        <NDivider />
        <section class="order-handle-container clearfix">
          <h3>处理结果</h3>
          <section class="m_l_50 clearfix">
            <section class="left-detail-container f_l">
              <section class="clearfix">
                <section class="w_30_p f_l">处理结果：</section>
                <section class="w_60_p f_l">{{ state.orderDetail.result }}</section>
              </section>
            </section>
          </section>
        </section>
      </template>
    </section>
    <section class="right-container f_l">
      <h2 class="m_b_20 order-title">工单处理轨迹</h2>
      <template v-for="(item, index) in state.orderDetail.process" :key="index">
        <section v-if="item.currentType === 1" class="order-record">
          <section>{{ index + 1 }}、创建并派发工单</section>
          <section>
            提交人：
            <span>{{ item.postUserName }}</span>
          </section>
          <section>
            处理人：
            <span>{{ item.currentUserName }}</span>
          </section>
          <section>
            处理时间：
            <span>{{ onHandleTime(item.gmtCreate) }}</span>
          </section>
        </section>
        <section v-if="item.currentType === 2" class="order-record">
          <section>{{ index + 1 }}、转派工单</section>
          <section>
            处理人：
            <span>{{ item.currentUserName }}</span>
          </section>
          <section>
            被转派人：
            <span>{{ item.nextUserName }}</span>
          </section>
          <section>
            处理时间：
            <span>{{ onHandleTime(item.gmtCreate) }}</span>
          </section>
          <section>
            备注：
            <span>{{ item.comments }}</span>
          </section>
        </section>
        <section v-if="item.currentType === 3" class="order-record">
          <section>{{ index + 1 }}、添加评论</section>
          <section>
            处理人：
            <span>{{ item.currentUserName }}</span>
          </section>
          <section>
            处理时间：
            <span>{{ onHandleTime(item.gmtCreate) }}</span>
          </section>
          <section>
            评论内容：
            <span>{{ item.comments }}</span>
          </section>
        </section>
        <section v-if="item.currentType === 4" class="order-record">
          <section>{{ index + 1 }}、处理结单</section>
          <section>
            处理人：
            <span>{{ item.currentUserName }}</span>
          </section>
          <section>
            处理时间：
            <span>{{ onHandleTime(item.gmtCreate) }}</span>
          </section>
          <section>
            处理结果：
            <span>{{ item.resultNode }}</span>
          </section>
        </section>
        <section v-if="item.currentType === 5" class="order-record">
          <section>{{ index + 1 }}、撤销工单</section>
          <section>
            处理人：
            <span>{{ item.postUserName }}</span>
          </section>
          <section>
            处理时间：
            <span>{{ onHandleTime(item.gmtCreate) }}</span>
          </section>
        </section>
        <NDivider v-if="index !== state.orderDetail.process.length - 1" />
      </template>
    </section>
    <n-modal
      v-model:show="state.showModal"
      preset="dialog"
      title="评论"
      positive-text="确认"
      negative-text="取消"
      :show-icon="false"
      @positive-click="onConfirmCallback"
      @negative-click="onCancelCallback"
    >
      <n-input v-model:value="state.comments" type="textarea" maxlength="500" show-count placeholder="请输入评论" />
    </n-modal>
  </section>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {} from 'naive-ui'
import { queryOrderDetail, finishOrder, deliverOrder, commentOrder } from '@/api/zx'
import dayjs from 'dayjs'
import { ArrowBackOutline } from '@vicons/ionicons5'
import { generalOptions } from './constanst'

const formRef = ref(null)
const route = useRoute()
const router = useRouter()
const state = reactive({
  orderDetail: {},
  model: {
    orderHandleType: '1',
    handleResult: '',
    orderTurnSend: null,
    comments: '',
  },
  rules: {
    orderHandleType: {
      required: true,
      trigger: 'change',
    },
    handleResult: {
      required: true,
      trigger: ['blur', 'input'],
      message: '请输入处理结果',
    },
    orderTurnSend: {
      required: false,
      trigger: ['blur', 'change'],
      message: '请选择工单处理人',
    },
  },
  // orderRecords: [
  //   { // 创建工单
  //     currentType: 1,
  //     postUserName: '张三',
  //     currentUserName: '李四',
  //     nextUserName: '',
  //     gmtCreate: '2022-01-01 22:22:22',
  //     comments: '',
  //     resultNode: ''
  //   },
  //   { // 转派
  //     currentType: 2,
  //     postUserName: '张三',
  //     currentUserName: '李四',
  //     nextUserName: '赵六',
  //     gmtCreate: '2022-01-01 22:22:22',
  //     comments: '李四转派给了赵六',
  //     resultNode: ''
  //   },
  //   { // 评论
  //     currentType: 3,
  //     postUserName: '张三',
  //     currentUserName: '赵六',
  //     nextUserName: '',
  //     gmtCreate: '2022-01-01 22:22:22',
  //     comments: '赵六进行了评论',
  //     resultNode: ''
  //   },
  //   { // 结单
  //     currentType: 4,
  //     postUserName: '张三',
  //     currentUserName: '赵六',
  //     nextUserName: '',
  //     gmtCreate: '2022-01-01 22:22:22',
  //     comments: '',
  //     resultNode: '赵六结束了此单'
  //   },
  //   { // 撤单
  //     currentType: 5,
  //     postUserName: '王五',
  //     currentUserName: '赵六',
  //     nextUserName: '',
  //     gmtCreate: '2022-01-01 22:22:22',
  //     comments: '',
  //     resultNode: ''
  //   }
  // ],
  showModal: false,
  comments: '',
})
const { query } = route
console.log('query value: ' + JSON.stringify(query))

watch(
  () => state.model.orderHandleType,
  (_new, _old) => {
    if (_new === '1') {
      state.rules.orderTurnSend.required = false
      state.rules.handleResult.required = true
    } else if (_new === '2') {
      state.rules.handleResult.required = false
      state.rules.orderTurnSend.required = true
    }
  }
)
watch(
  () => state.showModal,
  (_new, _old) => {
    state.comments = ''
  }
)

onQueryOrderDetail()
function onQueryOrderDetail() {
  queryOrderDetail({ ticketId: query.orderId })
    .then((res) => {
      state.orderDetail = res || {}
    })
    .catch((err) => {
      console.log(err)
      window.$message.error('查询工单详情失败')
    })
}
function onBack() {
  router.back()
}
function onSubmit(e) {
  e.preventDefault()
  formRef.value?.validate((errors) => {
    if (!errors) {
      if (state.model.orderHandleType === '1') {
        finishOrder({
          ticketId: query.orderId,
          currentUser: state.orderDetail?.currentUser || '',
          comments: state.model.handleResult,
        })
          .then((res) => {
            window.$message.success('提交成功')
            router.back()
          })
          .catch((err) => {
            window.$message.error('提交失败')
          })
      } else if (state.model.orderHandleType === '2') {
        deliverOrder({
          ticketId: query.orderId,
          currentUser: state.orderDetail?.currentUser || '',
          nextUser: state.model.orderTurnSend,
          comments: state.model.handleResult,
        })
          .then((res) => {
            window.$message.success('提交成功')
            router.back()
          })
          .catch((err) => {
            window.$message.error('提交失败')
          })
      }
    } else {
      console.log(errors)
      window.$message.error('请正确填写工单处理信息')
    }
  })
}
function onComment() {
  state.showModal = true
}
function onConfirmCallback() {
  if (!state.comments) {
    window.$message.warning('评论内容不能为空')
    return false
  }
  commentOrder({
    ticketId: query.orderId,
    currentUser: state.orderDetail?.currentUser || '',
    comments: state.comments,
  })
    .then((res) => {
      window.$message.success('提交评论成功')
      onQueryOrderDetail()
    })
    .catch((err) => {
      window.$message.error('提交评论失败')
    })
}
function onCancelCallback() {
  // window.$message.info('取消评论')
}
function onHandleQuestionType(type) {
  switch (type) {
    case 1:
      return '问题咨询'
    case 2:
      return '报障'
    case 3:
      return '解决方案'
  }
}
function onHandleContactType(type) {
  switch (type) {
    case 1:
      return '邮箱'
    case 2:
      return '电话'
  }
}
function onHandleStatus(status) {
  switch (status) {
    case 1:
      return '处理中'
    case 2:
      return '已完结'
    case 3:
      return '已撤销'
  }
}
function onHandleEmergency(type) {
  switch (type) {
    case 1:
      return '一般'
    case 2:
      return '较紧急'
    case 3:
      return '非常紧急'
  }
}
function onHandleTime(time) {
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
}
</script>

<style lang="less" scoped>
.detail-container {
  font-size: 14px;
  // position: relative;
  .order-title {
    height: 40px;
    line-height: 40px;
  }
  .left-container {
    width: 70%;
    padding: 20px;
    .order-detail-container {
      width: 100%;
      padding: 0 20px;
      position: relative;
      .back-icon {
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
      }
      .left-detail-container {
        width: 50%;
        .file {
          color: blue;
          cursor: pointer;
          &:hover {
            opacity: 0.8;
          }
        }
      }
      .right-detail-container {
        width: 50%;
      }
    }
    .order-handle-container {
      width: 100%;
      padding: 0 20px 20px;
      .left-detail-container {
        width: 50%;
      }
    }
  }
  .right-container {
    margin-left: 20px;
    width: 25%;
    padding: 20px;
    text-align: center;
    .order-record {
      text-align: left;
    }
  }
  .watermark-container {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    pointer-events: none;
    .text {
      pointer-events: none;
      width: 300px;
      height: 50px;
      line-height: 50px;
      font-size: 56px;
      transform: rotateZ(45deg);
      color: rgba(128, 128, 128, 0.3);
      text-align: center;
      position: absolute;
      left: calc(50% - 106px);
      top: 64%;
    }
  }
}
</style>
