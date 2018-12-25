exports.up = function(knex, Promise) {
  return Promise.all([
	  knex.schema.createTableIfNotExists('sensor', (table) => {
		  table.increments().primary() //primary key ID
		  table.integer('person_id').unsigned().index().references('id').inTable('person')
		  table.timestamp('entered_at').defaultTo(knex.fn.now()).notNullable()
	  }),
	  
	  knex.schema.createTableIfNotExists('person', (table) => {
		  table.increments().primary() //primary key ID
		  table.string('fname').notNullable()
		  table.string('lname').notNullable()
		  table.integer('importance').notNullable()
	  }),
	])
};

exports.down = function(knex, Promise) {
  return Promise.all([
	  
	  knex.schema.dropTableIfExists('sensor'),
	  knex.schema.dropTableIfExists('person'),
  ])
};