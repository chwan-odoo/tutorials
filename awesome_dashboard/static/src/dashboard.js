/** @odoo-module **/

import { Component, onWillStart, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { _t } from "@web/core/l10n/translation";
import { DashboardItem } from "./dashboard_item";
import { PieChart } from "./pie_chart";


export class AwesomeDashboard extends Component {
    static template = "awesome_dashboard.AwesomeDashboard";
    static components = { DashboardItem, PieChart };

    setup() {
        this.statsService = useService("awesome_dashboard.statistics");
        this.actionService = useService("action");
        // this.state = useState({
        //     stats: null,
        // });

        this.state = useState({
            stats: this.statsService.stats.data,
        });

        onWillStart(async () => {
            try {
                // const state = await this.statsService.loadStatistics("/awesome_dashboard/statistics");
                console.log(this.statsService.stats.data)

                // this.state.stats = this.statsService.state.data;
            } catch (e) {
                console.error("Failed to load statistics", e);
            }
        });
    }

    openCustomers() {
        this.actionService.doAction("base.action_partner_form", {
            viewType: "kanban"
        });
    }
    openLeads() {
        this.actionService.doAction({
            type: 'ir.actions.act_window',
            name: _t('Leads'),
            target: 'current',
            res_model: 'crm.lead',
            views: [[false, 'list'], [false, 'form']],
        });
    }
}

registry.category("actions").add("awesome_dashboard.dashboard", AwesomeDashboard);