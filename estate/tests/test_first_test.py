from odoo.tests.common import TransactionCase
from odoo.exceptions import UserError
from odoo.tests import tagged
from odoo.fields import Command

@tagged('post_install', '-at_install')
class EstateTestCase(TransactionCase):

    @classmethod
    def setUpClass(cls):
        super(EstateTestCase, cls).setUpClass()
        cls.type_residential = cls.env['estate.property.type'].create({
            'name': 'Residential'
        })
        cls.tag_cozy = cls.env['estate.property.tag'].create({
            'name': 'Cozy'
        })

        cls.properties = cls.env['estate.property'].create([
            {
                'name': 'Big Villa',
                'description': 'A spacious home with a view.',
                'expected_price': 1500000,
                'living_area': 300,
                'garden_area': 1000,
                'bedrooms': 5,
                'facades': 4,
                'garage': True,
                'garden': True,
                'garden_orientation': 'south',
                'state': 'new',
                'property_type_id': cls.type_residential.id,
                'tag_ids': [Command.link(cls.tag_cozy.id)],
                'offer_ids': [
                    Command.create({
                        'price': 1400000,
                        'validity': 30,
                        'partner_id': cls.env['res.partner'].create({'name': 'Alice Smith'}).id,
                    }),
                ],
            },
            {
                'name': 'Small Apartment',
                'description': 'Compact living in the city.',
                'expected_price': 85000,
                'living_area': 45,
                'bedrooms': 1,
                'facades': 1,
                'garage': False,
                'garden': False,
                'state': 'new',
            }
        ])

    def test_can_not_create_offer_for_sold_property(self):
        self.properties[0].state = 'sold'
        with self.assertRaises(UserError):
            self.env['estate.property.offer'].create({
                'price': 1400000,
                'validity': 30,
                'partner_id': self.env['res.partner'].create({'name': 'Amy Smith'}).id,
                'property_id': self.properties[0].id,
            })


    def test_can_not_sell_property_with_no_offer(self):
        with self.assertRaises(UserError):
            self.properties[1].state = 'sold'