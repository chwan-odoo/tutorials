/** @odoo-module **/

import { registry } from "@web/core/registry";
import { rpc } from "@web/core/network/rpc";
import { memoize } from "@web/core/utils/functions";
import { reactive } from "@odoo/owl";

export const networkService = {
    dependencies: [],

    start(env) {
        let stats = reactive({}, ()=>{
            console.log("Stats updated:", stats);
        });

        const fetchStats = async () => {
            const updates = await rpc("/awesome_dashboard/statistics");
            Object.assign(stats, updates);
        };

        setInterval(async () => {
            await fetchStats()
        }, 1000 * 5);

        fetchStats()

        return {
            stats
        };
    }
};

registry.category("services").add("awesome_dashboard.statistics", networkService);