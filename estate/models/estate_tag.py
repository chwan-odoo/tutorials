from odoo import fields, models


class Estate(models.Model):
    _name = "estate.property.tag"
    _description = "Estate Tag Model"

    name = fields.Char(required=True)