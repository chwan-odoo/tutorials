from odoo import fields, models


class Estate(models.Model):
    _name = "estate.property.type"
    _description = "Estate Type Model"
    _order = "sequence, name desc"

    name = fields.Char(required=True)
    property_ids = fields.One2many(
        "estate.property", "property_type_id", string="Properties"
    )
    sequence = fields.Integer(
        "Sequence", default=1, help="Used to order stages. Lower is better."
    )

    _name_uniq = models.Constraint(
        "unique(name)",
        "Property type name already exists!",
    )
