{
    'name': 'Estate',
    'version': '1.0',
    'category': 'Sales/CRM',
    'sequence': 1,
    'summary': 'Estate App for managing properties',
    'website': '',
    'depends': [
        'base_setup'
    ],
    'data': [
        'security/ir.model.access.csv',
        'views/estate_property_views.xml',
    ],
    'demo': [
        'demo/demo_data.xml',
    ],
    'installable': True,
    'application': True,
    'assets': {
    },
    'author': 'Cheng-Yan Wang(CHWAN)',
    'license': 'LGPL-3',
}
