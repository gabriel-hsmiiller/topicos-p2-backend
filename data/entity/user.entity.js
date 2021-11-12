const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "User",
    tableName: "user",
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        username: {
            type: 'varchar',
            length: 40,
            nullable: false,
        },
        password: {
            type: 'varchar',
            length: 20,
            nullable: false
        }
    }
});