frappe.ui.form.on('Batch', {
	validate(frm) {
		if(cur_frm.doc.item && cur_frm.doc.custom_select_pricelist && cur_frm.doc.custom_item_selling_price){
		    if (!frm.is_new()) {
		        frappe.db.get_list('Item Price',{
                fields:['name'],
                filters:{
                    'batch_no':cur_frm.doc.name
                }
                }).then(function(doc){
                    console.log(doc[0].name);
                    if(doc[0].name){
                        frappe.call({
                        method:"health_custom.health_custom.doctype.batch.item_price_update",
                        args:{
                            name:doc[0].name,
                            price:cur_frm.doc.custom_item_selling_price,
                        }
                        });
                    }
                });
		    }
		}
	}
});