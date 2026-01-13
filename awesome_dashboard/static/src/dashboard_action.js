/** @odoo-module **/

import { registry } from "@web/core/registry";
import { Component, xml } from "@odoo/owl";
import { LazyComponent } from "@web/core/assets";

class AwesomeDashboardLoader extends Component {
    static template = xml`
        <LazyComponent bundle="'awesome_dashboard.dashboard'" Component="'AwesomeDashboard'" />
    `;
    static components = { LazyComponent };
}

registry.category("actions").add("awesome_dashboard.dashboard", AwesomeDashboardLoader);