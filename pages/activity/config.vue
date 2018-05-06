<template>
  <div>
    <group>
      <x-switch
        title="羊毛线报"
        inline-desc=""
        v-model="value1"
      ></x-switch>
      <cell inline-desc="非常及时的可赚钱的羊毛线报，如： bug单；"></cell>
    </group>
    <group>
      <x-switch
        title="抢兑活动"
        v-model="value2"
      ></x-switch>
      <cell inline-desc="您将在定点抢兑活动的，前5分钟收到消息提醒；如：天天民生日10:00､15:00的抢兑，如果在您的活动管理中，您将于9:55､14:55收到消息提醒；"></cell>
    </group>
    <group>
      <x-switch
        title="日报提醒"
        v-model="value3"
      ></x-switch>
      <cell inline-desc="每天早上9:00给您发送您的羊毛日报；每天20:00给您发送未完成签到提醒；每个刷卡任务（如周周刷、月月刷）的最后两天也会提醒您尚未完成任务；"></cell>
    </group>
    <group>
      <x-switch
        title="自动订阅"
        v-model="value4"
      ></x-switch>
      <cell inline-desc="您勾选拥有的信用卡银行后，这些银行新增的这4星/5星活动，将自动加入到您的活动管理中；"></cell>
    </group>
  </div>
</template>

<script>
import { XSwitch, Group, Cell } from 'vux'

export default {
  name: 'config',
  components: {
    XSwitch,
    Group,
    Cell
  },
  data () {
    return {
      value1: false,
      value2: false,
      value3: false,
      value4: false
    }
  }
}
</script>

<style>
</style>
