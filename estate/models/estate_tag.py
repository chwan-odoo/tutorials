from odoo import fields, models


class Estate(models.Model):
    _name = "estate.property.tag"
    _description = "Estate Tag Model"
    _order = "name desc"

    name = fields.Char(required=True)

    _name_uniq = models.Constraint(
        'unique(name)',
        'Tag name already exists!',
    )