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
      `insert into ${this.table} (url, name, description, img,promote ) values (?, ?, ?, ?,?)`,
      [videoName, videos.name, videos.description, imgVideoName, videos.promote]
    );
  }
  promotedVideo() {
    return this.connection.query(
      `select * from  ${this.table} where promote=1`
    );
  }
}

module.exports = FileManager;
