from odoo import api, fields, models


class SalesBranch(models.Model):
    _name = "sale.branch"
    _description = "Sale Branch Model"

    name = fields.Char(string="Name")
    sequence_id = fields.Many2one('ir.sequence')
    code = fields.Char(string="Code")

    @api.model_create_multi
    def create(self, vals_list):
        for record in vals_list:
            new_ir_sequence = self.env['ir.sequence'].create({
                'name':record['name'],
                'code':record['code'],
            })
            record['sequence_id'] = new_ir_sequence.id
        return super().create(vals_list)
