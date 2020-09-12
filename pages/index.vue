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
import '~caml-js/shims';
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
@import url('https://fonts.googleapis.com/css2?family=Cousine&display=swap');

body {
    font-family: 'Cousine', monospace;
}
</style>
