const AbstractManager = require("./AbstractManager");

class FileManager extends AbstractManager {
  constructor() {
    super({ table: "videos" });
  }

  findAll() {
    return this.connection.query(`select * from  ${this.table}`);
  }

  insert(videos, videoName, imgVideoName) {
    return this.connection.query(
      `insert into ${this.table} (name, description, img ) values (?, ?, ?)`,
      [videoName, videos.description, imgVideoName]
    );
  }
}

module.exports = FileManager;
