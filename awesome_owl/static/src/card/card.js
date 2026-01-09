import { Component, useState } from "@odoo/owl";
import { Counter } from "../counter/counter";

export class Card extends Component {
    static template = "awesome_owl.card";
    static components = { Counter };
    static props = {
        title: {type: String},
        text: {type: String},
    };

    setup() {}
}