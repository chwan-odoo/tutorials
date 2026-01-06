from odoo import fields, models


class EstateTag(models.Model):
    _name = "estate.property.tag"
    _description = "This is a new estate type domain"

    name = fields.Char(required=True)