'use strict';

//const { DESCRIBE } = require("sequelize/types/lib/query-types");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [{
        id: 1,
        email: 'parkhacker@gmail.com',
        password: '1q2w3e4r',
        nickname: '백종원',
        image: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        email: 'hoyong@codestates.com',
        password: 'hoyongking123',
        nickname: '코드스테이츠 마스코트',
        image: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        email: 'codingking@naver.com',
        password: 'codeking1',
        nickname: '요리킹조리킹',
        image: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);

    await queryInterface.bulkInsert('boards', [{
        id: 1,
        userId: 1,
        post_like: 3,
        post_dislike: 25,
        title: '새로운 요리법 개발했는데 완전 맛있어요!',
        description: '추운 겨울날 밖에 나가서 라면을 드셔보세요. 어떠한 요리법보다 맛있습니다.'
      },
      {
        id : 2,
        userId: 2,
        post_like: 9,
        post_dislike: 3,
        title: '방금 위에 새로운 요리법 개발한 사람말 듣고 밖에나가서 라면먹었는데',
        description: '감기걸렸습니다. 배상해주세요.'
      },
      {
        id: 3,
        userId: 3,
        post_like: 5,
        post_dislike: 1,
        title: '라면 맛있게 끓이는 법',
        description: `라면을 맛있게 끓이려면 먼저 물을 설명에 적힌만큼 넣어주시고, 물이 끓으면 스프와 면을 넣어주세요.
         그리고 나서 라면이 잘 익으면 계란과 파를 넣어 더 맛있게 끓이시면 됩니다.`
      },
      {
        id: 4,
        userId: 1,
        post_like: 6,
        post_dislike: 3,
        title: '김치볶음밥 잘하는 법',
        description: `김치를 먼저 기름에 잘 볶아주시고, 그다음 밥을 넣어 잘 볶아주시면 됩니다. 소스는 고추장을 넣어주시면 되고 김치국물 조금 넣어 더 맛있게
        요리하시면 됩니다.`
      }
    ])

    await queryInterface.bulkInsert('comments', [{
        boardId: 1,
        description: `이거 따라하지 마세요. 개떡같은 레시피네요. 신고넣습니다!`,
        comment_like: 3,
        comment_dislike: 2
      },
      {
        boardId: 2,
        description: `네 맞습니다. 저도 따라했는데 감기에 걸렸어요ㅠㅠ`,
        comment_like: 3,
        comment_dislike: 1
      },
      {
        boardId: 3,
        description: `정말 맛있네요! 다른 분들께도 추천드립니다!`,
        comment_like: 12,
        comment_dislike: 5
      },
      {
        boardId: 2,
        description: `이거 따라한사람이 바보 아니에요?ㅋㅋ`,
        comment_like: 1,
        comment_dislike: 5
      },
    ])

    await queryInterface.bulkInsert('images', [{
        boardId: 1,
        image: null
      },
      {
        boardId: 2,
        image: null
      },
      {
        boardId: 2,
        image: null
      },
      {
        boardId: 3,
        image: null
      },
      {
        boardId: 3,
        image: null
      },
      {
        boardId: 3,
        image: null
      },
    ])

    await queryInterface.bulkInsert('items', [
      { 
        id: 1,
        name: '두부'
      },
      {
        id: 2,
        name: '김치'
      },
      {
        id: 3,
        name: '양파'
      },
      {
        id: 4,
        name: '파스타면'
      },
      {
        id: 5, 
        name: '크림소스'
      },
      {
        id: 6,
        name: '베이컨'
      },
      {
        id: 7,
        name: '치즈'
      },
      {
        id: 8,
        name: '토마토'
      },
    ])

    await queryInterface.bulkInsert('UserItems', [{
        userId: 1,
        itemId: 1
      },
      {
        userId: 1,
        itemId: 2
      },
      {
        userId: 1,
        itemId: 3
      },
      {
        userId: 2,
        itemId: 1
      },
      {
        userId: 2,
        itemId: 2
      },
      {
        userId: 2,
        itemId: 3
      },
      {
        userId: 2,
        itemId: 4
      },
      {
        userId: 2,
        itemId: 5
      },
      {
        userId: 3,
        itemId: 6
      },
      {
        userId: 3,
        itemId: 7
      },
      {
        userId: 3,
        itemId: 8
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
    await queryInterface.bulkDelete('boards', null, {});
    await queryInterface.bulkDelete('comments', null, {});
    await queryInterface.bulkDelete('images', null, {});
    await queryInterface.bulkDelete('UserItems', null, {});
    await queryInterface.bulkDelete('items', null, {});
  }
};
