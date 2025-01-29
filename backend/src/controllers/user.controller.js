import { models } from '../models/index.js';
import logger from '../utils/logger.js';

export const getCurrentUser = async (req, res) => {
  try {
    const user = await models.User.findByPk(req.user.id);
    res.json(user);
  } catch (error) {
    logger.error('Get current user error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await models.User.findAll({
      where: req.user.role === 'tenant_admin' ? { organizationId: req.user.organizationId } : {}
    });
    res.json(users);
  } catch (error) {
    logger.error('Get users error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await models.User.findOne({
      where: {
        id: req.params.id,
        ...(req.user.role === 'tenant_admin' ? { organizationId: req.user.organizationId } : {})
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    logger.error('Get user by id error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await models.User.findOne({
      where: {
        id: req.params.id,
        ...(req.user.role === 'tenant_admin' ? { organizationId: req.user.organizationId } : {})
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { email, firstName, lastName, role, isActive } = req.body;
    await models.User.update({
      email,
      firstName,
      lastName,
      role,
      isActive
    });

    res.json(user);
  } catch (error) {
    logger.error('Update user error:', error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await models.User.findOne({
      where: {
        id: req.params.id,
        ...(req.user.role === 'tenant_admin' ? { organizationId: req.user.organizationId } : {})
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.update({ isActive: false });
    res.json({ message: 'User deactivated successfully' });
  } catch (error) {
    logger.error('Delete user error:', error);
    res.status(500).json({ message: error.message });
  }
};