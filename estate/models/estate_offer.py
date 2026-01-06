from datetime import timedelta
from odoo import api, fields, models
from odoo.exceptions import UserError


class EstatePropertyOffer(models.Model):
    _name = "estate.property.offer"
    _description = "Estate Offer Model"
    _order = "price desc"

    price = fields.Float()
    validity = fields.Integer(default=7, string="Validity (days)")
    date_deadline = fields.Date(
        compute="_compute_date_deadline", inverse="_inverse_date_deadline", store=True
    )
    status = fields.Selection(
        selection=[
            ("accepted", "Accepted"),
            ("refused", "Refused"),
        ],
        copy=False,
    )
    partner_id = fields.Many2one("res.partner", string="Partner", required=True)
    property_id = fields.Many2one("estate.property", string="Property", required=True)
    property_type_id = fields.Many2one("estate.property.type", related="property_id.property_type_id")

    _check_offer_price = models.Constraint(
        "CHECK(price > 0)",
        "The offer price must be strictly positive.",
    )

    @api.model_create_multi
    def create(self, vals_list):
        for vals in vals_list:
            property_id = vals.get("property_id")
            if property_id:
                curr_property = self.env["estate.property"].browse(property_id)

                # Check if new offer price is lower than existing offers
                if curr_property.offer_ids:
                    max_existing_price = max(curr_property.offer_ids.mapped("price"))
                    new_price = vals.get("price", 0)
                    if new_price <= max_existing_price:
                        raise UserError(
                            f"The offer amount must be higher than {max_existing_price:.2f}"
                        )

                # Set property state to 'offer_received' if it's new
                if curr_property.state == "new":
                    curr_property.state = "offer_received"

        return super(EstatePropertyOffer, self).create(vals_list)
    
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


    def action_accept(self):
        for record in self:
            if record.property_id.offer_ids.filtered(
                lambda o: o.status == "accepted" and o.id != record.id
            ):
                raise UserError(
                    "Another offer has already been accepted for this property."
                )
            record.status = "accepted"
            record.property_id.state = "offer_accepted"
            record.property_id.selling_price = record.price
            record.property_id.buyer_id = record.partner_id
        return True

    def action_refuse(self):
        for record in self:
            record.status = "refused"
        return True
