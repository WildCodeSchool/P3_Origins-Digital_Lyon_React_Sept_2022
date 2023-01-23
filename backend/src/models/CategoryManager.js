const AbstractManager = require("./AbstractManager");

class CategoryManager extends AbstractManager {
  constructor() {
    super({ table: "Category" });
  }

  findAll() {
    return this.connection.query(`select * from  ${this.table}`);
  }

  insert(name, img, description) {
    return this.connection.query(
      `insert into ${this.table} (name,img,description ) values (?, ?, ?)`,
      [name, img, description]
    );
  }
}

module.exports = CategoryManager;
