from odoo import fields, models


class Estate(models.Model):
    _name = "estate.property.type"
    _description = "Estate Type Model"

    name = fields.Char(required=True)