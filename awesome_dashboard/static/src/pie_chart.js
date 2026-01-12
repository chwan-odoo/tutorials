import { Component, onWillStart, onMounted, useRef } from "@odoo/owl";
import { loadJS } from "@web/core/assets";
import { useService } from "@web/core/utils/hooks";
import { rpc } from "@web/core/network/rpc";

export class PieChart extends Component {
    static template = "awesome_dashboard.PieChart";
    static props = {
        data: { optional: true },
    };

    setup() {
        this.canvasRef = useRef("pieChart");

        onWillStart(async ()=>{
            await loadJS("/web/static/lib/Chart/Chart.js")
            this.statistics = await rpc("/awesome_dashboard/statistics");
            console.log("Pie chart statistics:", this.statistics);
        })

        onMounted(() => {
            const ctx = this.canvasRef.el;

            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['S', 'M', 'XL'],
                    datasets: [{
                        label: 'T-Shirts by Size',
                        data: [
                            this.statistics.orders_by_size.s,
                            this.statistics.orders_by_size.m,
                            this.statistics.orders_by_size.xl,
                        ],
                        backgroundColor: [
                            '#FF6384',
                            '#36A2EB',
                            '#FFCE56',
                        ]
                    }]
                }
            });
        });
    }

}
