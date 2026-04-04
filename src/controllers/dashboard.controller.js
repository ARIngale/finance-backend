import Record from "../models/record.model.js";

export const getDashboard = async (req, res) => {
  try {
    // 1️⃣ Total Income
    const incomeResult = await Record.aggregate([
      { $match: { type: "income" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalIncome = incomeResult[0]?.total || 0;

    // 2️⃣ Total Expense
    const expenseResult = await Record.aggregate([
      { $match: { type: "expense" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalExpense = expenseResult[0]?.total || 0;

    // 3️⃣ Net Balance
    const netBalance = totalIncome - totalExpense;

    // 4️⃣ Category-wise totals
    const categoryWise = await Record.aggregate([
      {
        $group: {
          _id: { category: "$category", type: "$type" },
          total: { $sum: "$amount" },
        },
      },
    ]);

    // 5️⃣ Recent Transactions
    const recentTransactions = await Record.find()
      .sort({ date: -1 })
      .limit(5);

    const monthlyTrend = await Record.aggregate([
    {
      $group: {
        _id: {
          year: { $year: "$date" },
          month: { $month: "$date" },
          type: "$type",
        },
        total: { $sum: "$amount" },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ]);

    res.json({
      totalIncome,
      totalExpense,
      netBalance,
      categoryWise,
      recentTransactions,
      monthlyTrend,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};