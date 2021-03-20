'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('users', 'image', {
      type: Sequelize.STRING
    })

    await queryInterface.removeColumn('items', 'image')

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('users', 'image', {
      type: Sequelize.BLOB
    })

    await queryInterface.addColumn('items', 'image', {
      type: Sequelize.STRING
    })
    
  }
};
