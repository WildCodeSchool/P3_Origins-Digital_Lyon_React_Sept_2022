/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class commentsManager extends AbstractManager {
  constructor() {
    super({ table: "comment" });
  }

  getComments(videoId) {
    return this.connection.query(
      `SELECT comment.id, comment.content, comment.creation_date, comment.User_id, comment.Videos_id, user.firstname, user.lastname, user.avatar
      FROM ${this.table}
      JOIN user on ${this.table}.User_id = user.id 
      WHERE Videos_id = ?
      ORDER BY comment.creation_date DESC`,
      [videoId]
    );
  }

  insertComment(comment) {
    return this.connection.query(
      `INSERT into ${this.table} (content, User_id, Videos_id) values ( ?, ?, ?)`,
      [comment.content, comment.User_id, comment.Videos_id]
    );
  }

  updateComment(comment) {
    return this.connection.query(
      `update ${this.table} set content = ?, where id=? `,
      [comment.content, comment.id]
    );
  }

  deleteCommentByVideosId(videoId) {
    return this.connection.query(
      `DELETE FROM ${this.table} where Videos_id = ?`,
      [videoId]
    );
  }
}

module.exports = commentsManager;
