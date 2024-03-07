# Copyright (c) 2024, InshaSiS Technologies and contributors
# For license information, please see license.txt

import frappe


def after_insert(doc,method):
    itm_price = frappe.get_doc({
        "doctype":"Item Price",
        "item_code":doc.item,
        "price_list":doc.custom_select_pricelist,
        "price_list_rate":doc.custom_item_selling_price,
        "batch_no":doc.name
    })
    itm_price.insert()

@frappe.whitelist(allow_guest=True)
def item_price_update(name,price):
    #Item Price Update
    frappe.db.set_value('Item Price',name,
    {
        'price_list_rate':price
    })