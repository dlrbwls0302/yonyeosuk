'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('board', {
      fields: ['users_id'],
      type: 'foregin key',
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
    await removeConstraint('board', 'custom_fkey_constraint_name')
  }

};
