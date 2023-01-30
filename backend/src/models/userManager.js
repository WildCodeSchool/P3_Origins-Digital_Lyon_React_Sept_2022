const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  find(id) {
    return this.connection.query(
      `select id, firstname, lastname, email from  ${this.table} where id = ?`,
      [id]
    );
  }

  findByEmailWithPassword(email) {
    return this.connection.query(
      `select * from  ${this.table} where email = ?`,
      [email]
    );
  }

  findAll() {
    return this.connection.query(
      `select id, firstname, lastname, email, is_admin from  ${this.table}`
    );
  }

  insert(user) {
    return this.connection.query(
      `insert into ${this.table} (firstname, lastname, email, hashedPassword, is_admin ) values (?, ?, ?, ?, ?)`,
      [
        user.firstname,
        user.lastname,
        user.email,
        user.hashedPassword,
        user.is_admin,
      ]
    );
  }

  update(user) {
    return this.connection.query(`update ${this.table} set ? where id = ?`, [
      user,
      user.id,
    ]);
  }

  updateAvatar(id, avatar) {
    return this.connection.query(
      `update ${this.table} set avatar = ? where id = ?`,
      [avatar, id]
    );
  }

  updatePasswordToken(user) {
    return this.connection.query(
      `update ${this.table} set passwordToken = ?  where id = ?`,
      [user.passwordToken, user.id]
    );
  }

  updatePasswordAfterReset(user) {
    return this.connection.query(
      `update ${this.table} set hashedPassword = ?, passwordToken = NULL  where id = ?`,
      [user.hashedPassword, user.id]
    );
  }

  selectToken(passwordToken) {
    return this.connection.query(
      `select id from ${this.table} where passwordToken = ?`,
      [passwordToken]
    );
  }
}

module.exports = UserManager;
