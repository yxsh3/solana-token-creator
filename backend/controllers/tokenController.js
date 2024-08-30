const { Connection, PublicKey, Keypair, Transaction, LAMPORTS_PER_SOL } = require('@solana/web3.js');
const { Token, TOKEN_PROGRAM_ID } = require('@solana/spl-token');
const dotenv = require('dotenv');
const TokenModel = require('../models/token');
const User = require('../models/user');

dotenv.config();

exports.createToken = async (req, res) => {
  const { name, symbol, decimals, supply, walletAddress } = req.body;
  const userId = req.user.id;

  try {
    const connection = new Connection(process.env.SOLANA_CLUSTER, 'confirmed');
    const fromWallet = Keypair.generate(); // Generate a new keypair for the token creator

    // Airdrop SOL to the token creator wallet
    const airdropSignature = await connection.requestAirdrop(
      fromWallet.publicKey,
      LAMPORTS_PER_SOL,
    );
    //await connection.confirmTransaction(airdropSignature);
    const latestBlockHash = await connection.getLatestBlockhash();

    await connection.confirmTransaction({
      blockhash: latestBlockHash.blockhash,
      lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
      signature: airdropSignature,
    });


    // Create a new token
    const mint = await Token.createMint(
      connection,
      fromWallet,
      fromWallet.publicKey,
      null,
      decimals,
      TOKEN_PROGRAM_ID,
    );

    // Create an associated token account for the wallet address
    const fromTokenAccount = await mint.getOrCreateAssociatedAccountInfo(
      new PublicKey(walletAddress),
    );

    // Mint the tokens to the associated account
    await mint.mintTo(
      fromTokenAccount.address,
      fromWallet.publicKey,
      [],
      supply,
    );

    // Save token information in the database
    const token = new TokenModel({
      name,
      symbol,
      decimals,
      supply,
      mintAddress: mint.publicKey.toString(),
      tokenAccountAddress: fromTokenAccount.address.toString(),
      user: userId,
    });

    await token.save();

    // Add the token reference to the user's tokens array
    await User.findByIdAndUpdate(userId, { $push: { tokens: token._id } });

    res.json({
      mintAddress: mint.publicKey.toString(),
      tokenAccountAddress: fromTokenAccount.address.toString(),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserTokens = async (req, res) => {
  try {
    const tokens = await TokenModel.find({ user: req.user.id }).populate('user', 'username');
    res.json(tokens);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTokenDetails = async (req, res) => {
  try {
    const token = await TokenModel.findById(req.params.id).populate('user', 'username');
    if (!token) {
      return res.status(404).json({ error: 'Token not found' });
    }
    res.json(token);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
