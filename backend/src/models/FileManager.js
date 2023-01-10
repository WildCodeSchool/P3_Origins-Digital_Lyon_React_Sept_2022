const AbstractManager = require("./AbstractManager");

class FileManager extends AbstractManager {
  constructor() {
    super({ table: "videos" });
  }

  findAll() {
    return this.connection.query(
      `select id, name, description, img from  ${this.table}`
    );
  }

  insert(videos, videoName) {
    return this.connection.query(
      `insert into ${this.table} (name, description, img ) values (?, ?, ?)`,
      [videoName, videos.description, videos.img]
    );
  }
}

module.exports = FileManager;
