import { Component, useState } from "@odoo/owl";
import { Counter } from "../counter/counter";

export class Card extends Component {
    static template = "awesome_owl.card";
    static components = { Counter };
    static props = {
        title: String,
        text: String,
    };

    setup() {}
}