/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.addColumns("users", {
    password_hash: {
      type: "varchar(128)",
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumns("users", "password_hash");
};
