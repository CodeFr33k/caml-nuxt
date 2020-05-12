<template>
    <div class="lines-component">
        <div 
            v-for="line in lines"
            class="line"
            v-html="line"
        ></div>             
    </div>
</template>
<script lang="ts">
import { Observer } from 'mobx-vue';
import {
    Component,
    Prop,
    Vue,
} from 'vue-property-decorator';

@Observer
@Component
export default class extends Vue {
    @Prop() readonly lines!: any
}
</script>
<style lang="sass" scoped>
.lines-component
    padding: 15px 15px 0

.line
    border: 1px solid rgba(0,0,0,0.25)
    border-radius: 6px
    margin-bottom: 15px
    min-height: 26px
    font-size: 20px
    padding: 0 15px
    display: flex
    flex-direction: column
    justify-content: center
    overflow-x: hidden

</style>
