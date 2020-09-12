<template>
    <div class="lines-component">
        <div 
            v-for="line in lines"
            class="line-box"
            :class="{ html: isHtml(line) }"
        >
            <div
                v-html="line"
                class="line"
            ></div>
        </div>             
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
    isHtml(line: string) {
        return (
            line.includes('<img') ||
            line.includes('<video') 
        );
    }
}
</script>
<style lang="sass" scoped>
.lines-component
    padding: 15px 15px 0
 
.line-box
    position: relative
    height: 26px
    border: 1px solid rgba(0,0,0,0.25)
    border-radius: 6px
    margin-bottom: 15px
    font-size: 20px

.html
    position: static
    height: auto

:not(.html) > .line
    position: absolute
    left: 0
    top: 50%
    transform: translateY(-50%)
    padding: 0 15px
    max-width: 100%
    overflow: hidden
    text-overflow: ellipsis
    white-space: pre
    box-sizing: border-box

</style>

