import { whenReady } from "@odoo/owl";
import { mountComponent } from "@web/env";
import { App } from "./app";

const config = {
    dev: true,
    name: "Owl Tutorial"
};

// Mount the App component when the document.body is ready
whenReady(() => mountComponent(App, document.body, config));

