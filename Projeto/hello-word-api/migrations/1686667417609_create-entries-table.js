exports.up = (pgm) => {
    pgm.createTable('entries', {
      creation_date: { 
          type: 'timestamp',
          notNull: true,
          default: pgm.func('current_timestamp'),
      },
      short_id: { 
          type: 'varchar(8)',  
          primaryKey: true, 
          notNull: true,
      },
      original_url: {
          type: 'varchar(128)',
          notNull: true,
      },
    });
  }
  
  
  
  exports.down = pgm => {
      pgm.dropTable('entries', {
          ifExists: true,
          cascade: true,
      });
  };