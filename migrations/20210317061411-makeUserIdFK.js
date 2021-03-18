'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('boards', {
      fields: ['users_id'],
      type: 'foreign key',
      name: 'custom_fkey_constraint_name',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('boards', 'custom_fkey_constraint_name')
  }

};
