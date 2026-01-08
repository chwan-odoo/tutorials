from odoo import fields, models


class SalesBranch(models.Model):
    _name = "estate.property.tag"
    _description = "Estate Tag Model"
    _order = "name desc"

    name = fields.Char(required=True)
    color = fields.Integer()

    _name_uniq = models.Constraint(
        "unique(name)",
        "Tag name already exists!",
    )
