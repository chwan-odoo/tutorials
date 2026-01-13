/** @odoo-module **/

import { registry } from "@web/core/registry";
import { rpc } from "@web/core/network/rpc";
import { memoize } from "@web/core/utils/functions";
import { reactive } from "@odoo/owl";

export const networkService = {
    dependencies: [],

    start(env) {
        let state = reactive({ data: null });

        const fetchStats = async () => {
            const result = await rpc("/awesome_dashboard/statistics");
            state.data = result;
            return result;
        };

        let cachedFetchStats = memoize(fetchStats);

        setInterval(async () => {
            await fetchStats()
            console.log("Statistics updated:", state.data);
        }, 1000 * 2);

        cachedFetchStats()

        return {
            state,
        };
    }
};

registry.category("services").add("awesome_dashboard.statistics", networkService);