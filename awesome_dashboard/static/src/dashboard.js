/** @odoo-module **/

import { Component, onWillStart, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { _t } from "@web/core/l10n/translation";
import { DashboardItem } from "./dashboard_item";
import { rpc } from "@web/core/network/rpc";

export class AwesomeDashboard extends Component {
    static template = "awesome_dashboard.AwesomeDashboard";
    static components = { DashboardItem };

    setup() {
        this.statsService = useService("awesome_dashboard.statistics");
        this.actionService = useService("action");
        this.state = useState({
            stats: null,
        });

        onWillStart(async () => {
            try {
                // const data = await rpc("/awesome_dashboard/statistics");
                const data = await this.statsService.loadStatistics("/awesome_dashboard/statistics");
                this.state.stats = data;
                console.log("Dashboard stats:", this.stats);
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