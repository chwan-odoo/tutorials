from odoo import api, fields, models


class SalesOrder(models.Model):
    _inherit = "sale.order"

    branch_id = fields.Many2one('sale.branch', string="Branch")

    @api.model_create_multi
    def create(self, vals_list):
        for record in vals_list:
            record['name'] = record['branch_id'].sequence_id['name']
        return super().create(vals_list)
