from odoo import api, fields, models
from datetime import timedelta

class EstateOffer(models.Model):
    _name = "estate.property.offer"
    _description = "This is a new estate offer domain"

    price = fields.Float()
    status = fields.Selection(
        selection=[
            ("accepted", "Accepted"),
            ("refused", "Refused"),
        ],
        copy=False,
    )
    validity = fields.Integer(default=7)
    date_deadline = fields.Date(compute="_compute_date_deadline", inverse="_inverse_date_deadline", store=True)
    partner_id = fields.Many2one("res.partner", string="Partner", required=True)
    property_id = fields.Many2one("estate.property", string="Property", required=True)    

    @api.depends("create_date", "validity")
    def _compute_date_deadline(self):
        for record in self:
            base_date = (
                record.create_date.date() if record.create_date else fields.Date.today()
            )
            record.date_deadline = base_date + timedelta(days=record.validity or 0)

    def _inverse_date_deadline(self):
        for record in self:
            if record.date_deadline:
                if record.create_date:
                    record.validity = (
                        record.date_deadline - record.create_date.date()
                    ).days
                else:
                    record.validity = (record.date_deadline - fields.Date.today()).days

