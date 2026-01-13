/** @odoo-module **/

import { registry } from "@web/core/registry";
import { rpc } from "@web/core/network/rpc";
import { memoize } from "@web/core/utils/functions";
import { reactive } from "@odoo/owl";

export const networkService = {
    dependencies: [],

    start(env) {
        let stats = reactive({ data: null });

        const fetchStats = async () => {
            stats.data = await rpc("/awesome_dashboard/statistics");
        };

        setInterval(async () => {
            await fetchStats()
            console.log("Statistics updated:", stats.data);
        }, 1000 * 2);

        fetchStats()

        return {
            stats,
        };
    }
};

registry.category("services").add("awesome_dashboard.statistics", networkService);