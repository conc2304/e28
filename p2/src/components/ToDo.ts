import { Component, Vue } from 'vue-property-decorator';
import WithRender from './to-do.html';
import ToDoForm from './ToDoForm'

@WithRender
@Component({
    components: {
        'to-do-form': ToDoForm
    }
})

export default class Todo extends Vue {
    
}