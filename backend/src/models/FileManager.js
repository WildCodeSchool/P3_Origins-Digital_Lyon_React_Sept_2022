const AbstractManager = require("./AbstractManager");

class FileManager extends AbstractManager {
  constructor() {
    super({ table: "videos" });
  }

  findAll() {
    return this.connection.query(`select * from  ${this.table}`);
  }

  insert(videos, videoName) {
    return this.connection.query(
      `insert into ${this.table} (url, description, img,name ) values (?, ?, ?,?)`,
      [videoName, videos.description, videos.img, videos.name]
    );
  }
}

module.exports = FileManager;
