
exports.up = function(knex) {
	return knex.schema

        .createTable("projects", tbl => {
            tbl.increments();

            tbl.string("name", 255)
                .notNullable()
                .unique()
                .index();

            tbl.string("description", 255);
            tbl.boolean("completed")
                .notNullable()
                .defaultTo(false);
        })

        .createTable("tasks", tbl => {
            tbl.increments();
            tbl.string("description", 128)
                .notNullable();
            tbl.string("notes", 200);
            tbl.boolean('completed')
                .notNullable()
                .defaultTo(false);
            tbl.integer("project_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("projects")
                .onDelete("CASCADE")
                .onUpdate("CASCADE");
        })

        .createTable("resources", tbl => {
            tbl.increments();
            tbl.string("name", 255)
                .notNullable()
                .unique()
                .index();
            tbl.string("description", 255);
        })

        .createTable("resources-projects", tbl => {
            tbl.increments()

            tbl.integer("project_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("projects")
                .onDelete("CASCADE")
                .onUpdate("CASCADE");

            tbl.integer("resource_id")
                .unsigned()
                .notNullable()
                .references("id")
                .inTable("resources")
                .onDelete("CASCADE")
                .onUpdate("CASCADE");
        })
};

exports.down = function(knex) {
	return knex.schema
        .dropTableIfExists("resources-projects")
        .dropTableIfExists("resources")
        .dropTableIfExists("tasks")
        .dropTableIfExists("projects");
};
