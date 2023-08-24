const CompanyLoadModel = require('../models/companyLoadModel');

async function getAllAvailableLoad(req, res, next) {
  try {
    const availableLoad = await CompanyLoadModel.find();
    res.json(availableLoad);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching consigners' });
  }
};

module.exports = {
  getAllAvailableLoad
}