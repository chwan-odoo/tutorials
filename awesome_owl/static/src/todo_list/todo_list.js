import { Component, useState, useRef, onMounted } from '@odoo/owl';
import { TodoItem } from '../todo_item/todo_item';
import { useAutofocus } from "../util";

export class TodoList extends Component {
    static template = 'awesome_owl.TodoList';
    static components = { TodoItem };
    static props = {};

    setup(){
        this.myRef = useAutofocus('the_input_bar');
        this.removeTodo = this.removeTodo.bind(this);
        this.todoList = useState([]);
        this.counter = 1;
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

    removeTodo(id) {
        const index = this.todoList.findIndex(todo => todo.id === id);
        if (index !== -1) {
            this.todoList.splice(index, 1);
        }
    }
}
