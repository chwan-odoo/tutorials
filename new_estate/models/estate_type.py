from odoo import fields, models


class EstateType(models.Model):
    _name = "estate.property.type"
    _description = "This is a new estate type domain"

    name = fields.Char(required=True)