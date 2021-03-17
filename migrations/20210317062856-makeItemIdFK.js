'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('users_items', {
      fields: ['item_id'],
      type: 'foreign key',
      name: 'custom_fkey_constraint_name',
      references: {
        table: 'items',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await removeConstrait('users_items', 'custom_fkey_constraint_name')
  }
};
