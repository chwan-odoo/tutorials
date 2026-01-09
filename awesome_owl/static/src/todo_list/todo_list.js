import { Component, useState, useRef, onMounted } from '@odoo/owl';
import { TodoItem } from '../todo_item/todo_item';

export class TodoList extends Component {
    static template = 'awesome_owl.TodoList';
    static components = { TodoItem };
    static props = {};

    setup(){
        this.myRef = useRef('the_input_bar');
        this.todoList = useState([]);
        this.counter = 1;

        onMounted(() => {
            this.myRef.el.focus();
        });
    }

    addTodo(ev) {
        if (ev.keyCode === 13 && ev.target.value.trim() !== "") {
            const text = ev.target.value;
            this.todoList.push({
                id: this.counter,
                description: text,
                isCompleted: false,
            });
            this.counter++;
            ev.target.value = "";
        }
    }
}