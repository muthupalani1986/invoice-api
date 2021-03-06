class Product {
    
    constructor(name, description, category, image, sellingPrice, buyingPrice, taxRate, quantity, salesUnit,code, created_at, updated_at) {
        this.prod_name=name;
        this.description = description;
        this.category = category;
        this.image = image;
        this.sellingPrice = sellingPrice;
        this.buyingPrice = buyingPrice;
        this.taxRate = taxRate;
        this.quantity = quantity;
        this.salesUnit = salesUnit;
        this.prod_code = code;
        this.created_at = created_at;
        this.updated_at = updated_at;
        }

    getAddProductSQL() {
        let sql = `INSERT INTO products(name,description,category,image,sellingPrice,buyingPrice,taxRate,quantity,salesUnit,code,created_at,updated_at) \
                   VALUES('${this.prod_name}','${this.description}',${this.category},'${this.image}',${this.sellingPrice},${this.buyingPrice},${this.taxRate},${this.quantity},${this.salesUnit},'${this.prod_code}','${this.created_at}','${this.updated_at}')`;
        return sql;           
    }

    static getProductByIdSQL(prod_id) {
        let sql = `SELECT prod.*,cat.category_name,saunit.name as unit_name FROM products prod INNER JOIN category cat on prod.category=cat.id INNER JOIN sales_unit saunit on prod.salesUnit=saunit.id where prod.id=${prod_id} order by prod.name asc`;
        return sql;           
    }

    static deleteProductByIdSQL(prod_id) {
        let sql = `DELETE FROM products WHERE id = ${prod_id}`;
        return sql;           
    }

    static getAllProductSQL(prodLookup) {
        let sql = `SELECT prod.*,cat.category_name,saunit.name as unit_name FROM products prod INNER JOIN category cat on prod.category=cat.id INNER JOIN sales_unit saunit on prod.salesUnit=saunit.id order by prod.name asc`;
        if (prodLookup){
            sql = "SELECT prod.id,prod.name,prod.code,prod.description,prod.taxRate,prod.quantity,prod.sellingPrice,prod.category,cat.category_name,saunit.name as unit_name FROM products prod INNER JOIN category cat on prod.category=cat.id INNER JOIN sales_unit saunit on prod.salesUnit=saunit.id order by prod.name asc";
        }        
        return sql;           
    }
    static getProductCountByCatSQL(cat_id) {
        let sql = `SELECT count(*) as total FROM products where category=${cat_id}`;
        return sql;
    }
    updateProductByIdSQL(id) {
        let sql = `update products set  name='${this.prod_name}',description='${this.description}',category=${this.category},image='${this.image}',sellingPrice=${this.sellingPrice},buyingPrice=${this.buyingPrice},taxRate=${this.taxRate},quantity=${this.quantity},salesUnit=${this.salesUnit},updated_at='${this.updated_at}' where id=${id}`;
        return sql;
    }
    static updateStockByProdIdSQL(product_id,number_of_items){
        const sql = `update products set quantity = quantity - ${number_of_items} where id = ${product_id}`;        
        return sql;
    }    
}

export default Product;