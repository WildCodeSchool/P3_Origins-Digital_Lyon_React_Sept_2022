const AbstractManager = require("./AbstractManager");

class FileManager extends AbstractManager {
  constructor() {
    super({ table: "videos" });
  }

  findAll() {
    return this.connection.query(
      `select id, name, url, description, img from  ${this.table}`
    );
  }

  insert(videos) {
    return this.connection.query(
      `insert into ${this.table} (name, url, description, img ) values (?, ?, ?, ?)`,
      [videos.name, videos.url, videos.description, videos.img]
    );
  }
}

module.exports = FileManager;
