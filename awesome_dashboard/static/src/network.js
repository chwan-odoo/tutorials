/** @odoo-module **/

import { registry } from "@web/core/registry";
import { rpc } from "@web/core/network/rpc";
import { memoize } from "@web/core/utils/functions";

export const networkService = {
    dependencies: [],

    start(env) {
        const fetchStats = async (uri) => {
            return await rpc(uri);
        };

        const cachedFetchStats = memoize(fetchStats);

        return {
            async loadStatistics(uri) {
                return await cachedFetchStats(uri);
            }
        };
    }
};

registry.category("services").add("awesome_dashboard.statistics", networkService);