'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('comment', {
      fields: ['board_id'],
      type: 'foreign key',
      name: 'custom_fkey_constraint_name',
      references: {
        table: 'board',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await removeConstrait('comment', 'custom_fkey_constraint_name')
  }
};
