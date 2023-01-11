const AbstractManager = require("./AbstractManager");

class VideosManager extends AbstractManager {
  constructor() {
    super({ table: "videos" });
  }

  find(id) {
    return this.connection.query(
      `select id, name, description, image from  ${this.table} where id = ?`,
      [id]
    );
  }

  findAll() {
    return this.connection.query(
      `select id, name, description, image,  from  ${this.table}`
    );
  }

  update(videos) {
    return this.connection.query(`update ${this.table} set ? where id = ?`, [
      videos,
      videos.id,
    ]);
  }
}

module.exports = VideosManager;
