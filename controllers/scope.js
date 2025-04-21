const { db } = require('../models');

const viewScope = async (req, res) => {
  try {
    const scope = await db.E2M_Scope.findAll({
      where: {
        isDeleted: false,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'isDeleted'],
      },
    });
    res.status(200).json({ msg: 'Scope Founded...', data: scope });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Server Error' });
  }
};

module.exports = {
  viewScope,
};
