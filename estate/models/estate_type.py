from odoo import api, fields, models


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
    offer_ids = fields.One2many(
        "estate.property.offer", "property_type_id", string="Offers"
    )
    offer_count = fields.Integer(compute="_compute_total_offers")

    _name_uniq = models.Constraint(
        "unique(name)",
        "Property type name already exists!",
    )

    @api.depends("offer_ids")
    def _compute_total_offers(self):
        for record in self:
            record.offer_count = len(record.offer_ids)