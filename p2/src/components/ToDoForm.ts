import { Component, Vue } from 'vue-property-decorator';
import WithRender from './to-do-form.html';

@WithRender
@Component
export default class ToDoForm extends Vue {
    public task: string = '';

    public emitTask(): void {
        this.$emit('added', this.task);
        this.task = '';
    }
}
