const walletService = require('../services/walletService');

const getAllWallets = async (req, res) => {
  try {
    const wallets = await walletService.getAllWallets();
    res.status(200).json(wallets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getWalletById = async (req, res) => {
  const walletId = req.params.id;

  try {
    const wallet = await walletService.getWalletById(walletId);
    res.status(200).json(wallet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const createWallet = async (req, res) => {
  const walletData = req.body;

  try {
    const wallet = await walletService.createWallet(walletData);
    res.status(201).json(wallet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const updateWallet = async (req, res) => {
  const walletId = req.params.id;
  const walletData = req.body;

  try {
    const wallet = await walletService.updateWallet(walletId, walletData);
    res.status(200).json(wallet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const deleteWallet = async (req, res) => {
  const walletId = req.params.id;

  try {
    await walletService.deleteWallet(walletId);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllWallets,
  getWalletById,
  createWallet,
  updateWallet,
  deleteWallet
};
