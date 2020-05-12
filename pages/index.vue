<template>
  <div>
    <Lines :lines="store.lines" />
  </div>
</template>
<script lang="ts">
import {
    Component,
    Vue,
} from 'vue-property-decorator';
import store from '@/store';
import Lines from '@/Lines.vue';

declare const CAML_FILE: string;

store.readText(CAML_FILE);

@Component({
    components: {
        Lines,
    }
})
export default class extends Vue {
    private store: any = store 
}
</script>
<style>
</style>
