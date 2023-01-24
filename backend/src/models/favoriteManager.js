const AbstractManager = require("./AbstractManager");

class favoriteManager extends AbstractManager {
  constructor() {
    super({ table: "User_has_favorite" });
  }

  insertFav(favorite) {
    return this.connection.query(
      `insert into ${this.table} (videos_id ,user_id) values (?, ?)`,
      [favorite.videos_id, favorite.user_id]
    );
  }

  findFavs(userId) {
    return this.connection.query(
      `SELECT videos.url, videos.description, videos.creation_date, videos.img, videos.name, videos.promote
          FROM videos
          JOIN user_has_favorite ON videos.id = user_has_favorite.videos_id
          JOIN user ON user_has_favorite.User_id = user.id
          WHERE user.id = ${userId}`
    );
  }
}

module.exports = favoriteManager;
