'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.removeConstraint('boards', 'custom_fkey_constraint_name');

    await queryInterface.renameColumn('boards', 'users_id', 'userId');

    await queryInterface.addConstraint('boards', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'boards_userId',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

    await queryInterface.removeConstraint('images', 'custom_fkey_constraint_board_id2');

    await queryInterface.renameColumn('images', 'board_id', 'boardId');

    await queryInterface.addConstraint('images', {
      fields: ['boardId'],
      type: 'foreign key',
      name: 'images_boardId',
      references: {
        table: 'boards',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

    await queryInterface.removeConstraint('comments', 'custom_fkey_constraint_board_id');

    await queryInterface.renameColumn('comments', 'board_id', 'boardId');

    await queryInterface.addConstraint('comments', {
      fields: ['boardId'],
      type: 'foreign key',
      name: 'comments_boardId',
      references: {
        table: 'boards',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: async (queryInterface, Sequelize) => {

   // await queryInterface.renameColumn('boards', 'boardId', 'board_id');
  // 삭제 -> 생성 -> 다시 애드콘스트레인트
    await queryInterface.removeColumn('boards', 'userId');
    await queryInterface.addColumn('boards', 'users_id', Sequelize.INTEGER);
    await queryInterface.addConstraint('boards', {
      fields: ['users_id'],
      type: 'foreign key',
      name: 'custom_fkey_constraint_name',
      references: {
        table: 'boards',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  
   // await queryInterface.removeConstraint('images', 'images_boardId');
    await queryInterface.removeColumn('images', 'boardId');
    await queryInterface.addColumn('images', 'board_id', Sequelize.INTEGER);
   // await queryInterface.renameColumn('images', 'boardId', 'board_id');

    await queryInterface.addConstraint('images', {
      fields: ['board_id'],
      type: 'foreign key',
      name: 'custom_fkey_constraint_board_id2',
      references: {
        table: 'boards',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  
   // await queryInterface.removeConstraint('comments', 'comments_boardId');

   // await queryInterface.renameColumn('comments', 'boardId', 'board_id');
    await queryInterface.removeColumn('comments', 'boardId');
    await queryInterface.addColumn('comments', 'board_id', Sequelize.INTEGER);
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
  }
};
