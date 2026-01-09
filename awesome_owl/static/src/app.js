import { Component, markup, useState } from "@odoo/owl";
import { Counter } from "./counter/counter";
import { Card } from "./card/card";
import { TodoList } from "./todo_list/todo_list";

export class App extends Component {
    static template = "awesome_owl.playground";
    static components = { Card, Counter, TodoList };
    static props = {};

    setup() {
        this.sum = useState({ value: 2 });
        this.incrementSum = this.incrementSum.bind(this);
        this.cardOneTitleEscaped = markup('<b>Card 1</b>');
        this.cardTwoTitleEscaped = markup('<a href="https://www.odoo.com">Card 2</a>');
    }

    incrementSum() {
        this.sum.value++;
    }
}
