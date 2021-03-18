'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('comments', {
      fields: ['board_id'],
      type: 'foreign key',
      name: 'custom_fkey_constraint_board_id',
      references: {
        table: 'boards',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('comments', 'custom_fkey_constraint_board_id')
  }
};
