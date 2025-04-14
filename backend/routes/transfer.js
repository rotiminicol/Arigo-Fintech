const express = require("express");
const axios = require("axios");
const Transaction = require("../models/Transaction");
const User = require("../models/User");
const auth = require("../middleware/auth");
const router = express.Router();

// Create transfer recipient
router.post("/recipient", auth, async (req, res) => {
  const { name, accountNumber, bankCode } = req.body; // bankCode from Paystack's bank list
  try {
    const response = await axios.post(
      "https://api.paystack.co/transferrecipient",
      {
        type: "nuban",
        name,
        account_number: accountNumber,
        bank_code: bankCode,
        currency: "NGN",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const { recipient_code } = response.data.data;
    res.json({ recipientCode: recipient_code });
  } catch (error) {
    res.status(500).json({ error: error.response?.data?.message || error.message });
  }
});

// Initiate transfer (e.g., Send Money)
router.post("/", auth, async (req, res) => {
  const { amount, recipientCode, reason } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (user.balance < amount) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    const response = await axios.post(
      "https://api.paystack.co/transfer",
      {
        source: "balance", // Assumes Paystack balance
        amount: amount * 100, // Convert to kobo
        recipient: recipientCode,
        reason,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const { reference } = response.data.data;

    // Save pending transaction
    const transaction = new Transaction({
      userId: user._id,
      type: "debit",
      amount,
      to: reason || "Transfer",
      date: new Date(),
      status: "pending",
      reference,
    });
    await transaction.save();

    res.json({ message: "Transfer initiated", reference });
  } catch (error) {
    res.status(500).json({ error: error.response?.data?.message || error.message });
  }
});

// Verify transfer
router.get("/verify/:reference", auth, async (req, res) => {
  const { reference } = req.params;
  try {
    const response = await axios.get(
      `https://api.paystack.co/transfer/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const { status, amount } = response.data.data;
    if (status !== "success") {
      return res.status(400).json({ error: "Transfer not successful" });
    }

    const transaction = await Transaction.findOne({ reference });
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }

    if (transaction.status === "completed") {
      return res.json({ message: "Transfer already processed" });
    }

    // Update transaction
    transaction.status = "completed";
    await transaction.save();

    // Update user balance
    const user = await User.findById(transaction.userId);
    user.balance -= amount / 100; // Convert kobo to naira
    await user.save();

    res.json({ message: "Transfer verified", transaction });
  } catch (error) {
    res.status(500).json({ error: error.response?.data?.message || error.message });
  }
});

module.exports = router;