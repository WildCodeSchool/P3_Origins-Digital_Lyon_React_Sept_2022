const AbstractManager = require("./AbstractManager");

class resumeVideoManager extends AbstractManager {
  constructor() {
    super({ table: "user_video_resume" });
  }

  findAll() {
    return this.connection.query(`select * from  ${this.table}`);
  }

  startWatching(userId, videoId, position) {
    return this.connection.query(
      `INSERT INTO user_video_resume (User_id, Videos_id, position) VALUES (?, ?, ?)`,
      [userId, videoId, position]
    );
  }

  getResumePoint(userId, videoId) {
    return this.connection.query(
      `SELECT position FROM user_video_resume WHERE User_id = ? AND Videos_id = ? ORDER BY timestamp DESC LIMIT 1`,
      [userId, videoId]
    );
  }
}

module.exports = resumeVideoManager;
