const ItemsService = {
  getAllItems(knex) {
    return knex.select("*").from("items");
  },

  insertItem(knex, newItem) {
    return knex
      .insert(newItem)
      .into("items")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
  deleteItem(knex, id) {
    return knex("items").where({ id }).delete();
  },

  getById(knex, id) {
    return knex.from("items").select("*").where("id", id).first();
  },

  updateItem(knex, id, newItemFields) {
    return knex("items").where({ id }).update(newItemFields);
  },
};

module.exports = ItemsService;
