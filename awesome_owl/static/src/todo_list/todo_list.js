import { Component, useState } from '@odoo/owl';
import { TodoItem } from '../todo_item/todo_item';

export class TodoList extends Component {
    static template = 'awesome_owl.TodoList';
    static components = { TodoItem };
    static props = {};

    setup(){
        this.todoList = [
            {
                id: 1,
                description: 'Complete the tutorial',
                isCompleted: true,
            },
            {
                id: 2,
                description: 'Learn OWL',
                isCompleted: false,
            }
        ];
    }
}