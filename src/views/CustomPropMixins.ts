/* eslint-disable */
import { Component, Vue, Prop } from "vue-property-decorator";
import { PropContent, CustomizeModel } from "@gundam/prop-model";
// @ts-ignore
@Component
export default class CustomPropMixins extends Vue {
    @Prop() propInfo!: CustomizeModel;
    @Prop() content!: PropContent;
    @Prop() getPropsByInstanceID!: {
        parentNodeProps: PropContent[],
        currentNodeProps: PropContent[]
    };
    @Prop({
        type: Boolean,
        default: false,
      })
    isRefByOtherCustomProps!: any;

    axios!: any;
    getNodePropsByInstanceID = this.getPropsByInstanceID

    /**
     * created时，把自身注册到数据中心
     */
    created() {
        this.axios = this.getAxios();
        this.getCommunicate().then((res) => {
            if(this.isRefByOtherCustomProps) return;
            res.registerPropItem(this)
        })
    }

    /**
     * destroy时，注销自身
     */
    destroyed() {
        this.getCommunicate().then((res) => {
            res.cancelPropItem(this)
        })
    }

    /**
     * 寻找到名称为'Customize'的父组件代理，利用父组件实现通信
     */
    private _getCustomizeProxy() {
        let parent: any = this.$parent || this.$root;
        let name = (<any>parent.$options).name;

        while (parent && (!name || name !== 'Customize')) {
            parent = parent.$parent;
            if (parent) {
                name = (<any>parent.$options).name;
            }
        }
        if (!parent) {
            throw new Error('配置项无法在该处使用！ - _getCustomizeProxy')
        }
        const result = parent.getProxy()
        return result
    }

    /**
     * 获取配置页的钩子对象
     */
    async getNodeHooks() {
        let communicate = await this.getCommunicate();
        return communicate.hook
    }

    /**
     * 获取数据总线实例
     */
    async getCommunicate() {
        const proxy = this._getCustomizeProxy();
        const communicate = await proxy.getCommunicate();
        return communicate;
    }

    /**
     * 获取自定义配置项间的通信bus实例
     */
    async getCommunicateBus() {
        const communicate = await this.getCommunicate()
        const bus = await communicate.getCommunicateBus();
        return bus;
    }

    /**
     * 获取当前配置项所属的组件实例
     */
    getParentComponentInstance(this: any) {
        const result = this._getCustomizeProxy().getComponentInstance(); // 所在组件的信息
        return result
    }

    /**
     * 获取axios对象，已对登录信息做了封装
     */
    getAxios() {
        return this._getCustomizeProxy().getAxios();
    }

}
