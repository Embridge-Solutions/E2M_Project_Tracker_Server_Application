const { db } = require('../models');
const { Op } = require('sequelize');

const create = async (req, res) => {
  const { name, permissionData } = req.body;

  try {
    // check if role already exists by name
    const roleCheck = await db.E2M_Role.findOne({
      where: {
        name,
        isDeleted: false,
      },
    });
    if (roleCheck) {
      return res.status(404).json({ msg: 'Role Name already exists' });
    }

    // create role
    const roleCreate = await db.E2M_Role.create({
      name,
      access: permissionData,
    });

    // get role by id
    const role = await db.E2M_Role.findOne({
      where: {
        id: roleCreate.id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'isDeleted'],
      },
    });

    res.status(201).json({ msg: 'Role Created', data: role });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server Error', data: err });
  }
};

const getAll = async (req, res) => {
  try {
    const roles = await db.E2M_Role.findAll({
      where: {
        isDeleted: false,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'isDeleted'],
      },
    });
    res.status(200).json({ msg: 'Roles Founded', data: roles });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server Error', data: err });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { editRoleName, permissionData } = req.body;
  try {
    // check if role already exists by name for other role id
    const roleCheck = await db.E2M_Role.findOne({
      where: {
        id: {
          [Op.ne]: id,
        },
        name: editRoleName,
        isDeleted: false,
      },
    });
    // if (roleCheck) {
    //   return res.status(400).json({ msg: 'RoleName Already Exist' });
    // }

    // get role by id
    const role = await db.E2M_Role.findOne({
      where: {
        id,
        isDeleted: false,
      },
    });
    if (!role) {
      return res.status(404).json({ msg: 'Role Not Founded' });
    }

    // update role
    const roleUpdate = await db.E2M_Role.update(
      {
        access: permissionData,
      },
      {
        where: {
          id: id,
        },
      }
    );

    // get role by id
    const updatedRole = await db.E2M_Role.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'isDeleted'],
      },
    });
    res
      .status(200)
      .json({ msg: 'Role Updated SuccessFully', data: updatedRole });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server Error', data: err });
  }
};

const archive = async (req, res) => {
  const { id } = req.params;

  try {
    // get role by id
    const role = await db.E2M_Role.findOne({
      where: {
        id: id,
        isDeleted: false,
      },
    });
    if (!role) {
      return res.status(404).json({ msg: 'Role Not Founded' });
    }

    // delete role
    await db.E2M_Role.update(
      {
        isDeleted: true,
      },
      {
        where: {
          id,
        },
      }
    );
    res.status(200).json({ msg: 'Role Deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: 'Server Error', data: err });
  }
};

const getRole = async (req, res) => {
  try {
    const Roles = await db.sequelize.query(`get_roles`);
    return res.status(200).json({ msg: 'Role Founded..!', data: Roles });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.TypeErrory });
  }
};

module.exports = {
  create,
  getAll,
  update,
  archive,
  getRole,
};
