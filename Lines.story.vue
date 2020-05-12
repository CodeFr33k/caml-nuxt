<template>
    <Lines :lines="lines"></Lines>
</template>

<script lang="ts">
import Lines from './Lines.vue';
import {
    Component,
    Vue,
} from 'vue-property-decorator';

@Component({
    components: { Lines },
})
export default class extends Vue {
    lines = [
       'abcddddddddddddddddddddddddddddddddddddddddddddddddddd',
       'def <a href="http://localhost">http://localhostt</a>',
       'ghi',
    ]
};
</script>

