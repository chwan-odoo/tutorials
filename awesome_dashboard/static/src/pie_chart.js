import { Component, onWillStart, onWillPatch, onMounted, onWillUpdateProps, useRef } from "@odoo/owl";
import { loadJS } from "@web/core/assets";
import { useService } from "@web/core/utils/hooks";

export class PieChart extends Component {
    static template = "awesome_dashboard.PieChart";
    static props = {
        data: Object,
    }



    setup() {
        this.canvasRef = useRef("pieChart");
        this.chart = null;

        onWillStart(async ()=>{
            await loadJS("/web/static/lib/Chart/Chart.js")
        })

        onWillUpdateProps(()=> {
            if (this.chart) {
                this.chart.destroy();
            }
        })

        onWillPatch(() => {
            this.attachRefToNewChart();
        })

        onMounted(() => {
            this.attachRefToNewChart();
        });
    }

    attachRefToNewChart() {
        const ctx = this.canvasRef.el;
        this.chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['S', 'M', 'XL'],
                datasets: [{
                    label: 'T-Shirts by Size',
                    data: [
                        this.props.data.s,
                        this.props.data.m,
                        this.props.data.xl,
                    ],
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                    ]
                }]
            }
        });
    }

}
