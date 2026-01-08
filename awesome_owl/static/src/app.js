import { Component } from "@odoo/owl";
import { Counter } from "./counter/counter";
import { Card } from "./card/card";

export class App extends Component {
    static template = "awesome_owl.playground";
    static components = { Card };
    static
}
