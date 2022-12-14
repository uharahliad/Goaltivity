'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const sequelize = queryInterface.sequelize;
    const userIds = await sequelize.query('SELECT id FROM users', { type: sequelize.QueryTypes.SELECT})
    queryInterface.bulkInsert('accountability_groups', [{
        id: '74cc77cb-24b7-4991-9403-f0933e4e735e',
        name: 'AllUsersGroup',
        importHash: null,
        createdAt: new Date(),
        updatedAt: new Date(),
    }])
    console.log(userIds, '00000000000000000000')
    return await Promise.all(userIds.map(item => queryInterface.bulkInsert('accountability_groupsUsersUsers', [{
      userId: item.id,
      accountability_group: '74cc77cb-24b7-4991-9403-f0933e4e735e',
    }])))
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
