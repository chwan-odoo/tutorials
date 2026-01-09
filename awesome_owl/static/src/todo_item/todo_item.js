import { Component } from '@odoo/owl';

export class TodoItem extends Component {
    static template = 'awesome_owl.TodoItem';
    static props = {
        todo: {
            type: Object,
            shape: {
                id: Number,
                description: String,
                isCompleted: Boolean,
            },
            optional: true
        },
    };

    setup() {
        this.onToggle = this.onToggle.bind(this);
    }

    onToggle() {
        this.props.todo.isCompleted = !this.props.todo.isCompleted;
    }

}