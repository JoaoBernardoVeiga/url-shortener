exports.up = (pgm) => {
  pgm.createTable('users', {
    id: { 
        type: 'serial', 
        primaryKey: true, 
        notNull: true,
    },
    name: { 
        type: 'varchar(128)', 
        notNull: true,
    },
    created_at: {
        type: 'timestamp',
        notNull: true,
        default: pgm.func('current_timestamp'),
    },
    email: {
        type: 'varchar(64)', 
        notNull: true, 
        unique: true,
    },
  });

  pgm.createTable('posts', {
    id: { 
        type: 'serial', 
        primaryKey: true, 
        notNull: true, 
    },
    user_id: {
        type: 'integer',
        notNull: true,
        references: '"users"',
    },
    body: { 
        type: 'varchar(1024)',
    },
    created_at: {
        type: 'timestamp',
        notNull: true,
        default: pgm.func('current_timestamp'),
    },
  });
}



exports.down = pgm => {
    pgm.dropTable('posts', {
        ifExists: true,
        cascade: true,
    });
    pgm.dropTable('users', {
        ifExists: true,
    });
};
