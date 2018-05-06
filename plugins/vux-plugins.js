import Vue from 'vue'
import {
    BusPlugin,
    TransferDom,
    WechatPlugin,
    DatetimePlugin,
    LoadingPlugin,
    ToastPlugin,
    AlertPlugin,
    ConfirmPlugin,
    AjaxPlugin
} from 'vux'

Vue.use(DatetimePlugin)
Vue.use(LoadingPlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(WechatPlugin)
Vue.use(BusPlugin)
Vue.use(AjaxPlugin)

Vue.directive('transfer-dom', TransferDom)
