'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('images', {
      fields: ['board_id'],
      type: 'foreign key',
      name: 'custom_fkey_constraint_board_id2',
      references: {
        table: 'board',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await removeConstrait('images', 'custom_fkey_constraint_board_id2')
  }
};
