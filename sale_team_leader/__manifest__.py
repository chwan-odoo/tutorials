{
    "name": "Sale Team Leader",
    "version": "1.0",
    "category": "Sales",
    "summary": "Adds Team Leader group for sales orders",
    "description": """
        This module adds a new security group 'Team Leader' between 
        'User: Own Documents Only' and 'User: All Documents'.
        
        Team Leaders can:
        - Read, Write, Create sales orders of their team members
        - See all orders from users in teams they lead
    """,
    "depends": ["sale", "sales_team"],
    "data": [
        "security/sale_team_leader_security.xml",
    ],
    "installable": True,
    "application": False,
    "license": "LGPL-3",
}

