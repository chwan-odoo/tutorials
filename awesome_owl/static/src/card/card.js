import { Component, useState } from "@odoo/owl";
import { Counter } from "../counter/counter";

export class Card extends Component {
    static template = "awesome_owl.card";
    static components = { Counter };
    static props = {
        title: {type: String},
        text: {type: String},
        slots: { type: Object, optional: true }
    };

    setup() {
        this.status = useState({ isOpen: false });
    }

    toggleStatus() {
        this.status.isOpen = !this.status.isOpen;
    }
}