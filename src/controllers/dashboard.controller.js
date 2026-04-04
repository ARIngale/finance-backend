import Record from "../models/record.model.js";

export const getDashboard = async (req, res) => {
  try {
    const role = req.user.role;

    const incomeResult = await Record.aggregate([
      { $match: { type: "income" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const expenseResult = await Record.aggregate([
      { $match: { type: "expense" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalIncome = incomeResult[0]?.total || 0;
    const totalExpense = expenseResult[0]?.total || 0;
    const netBalance = totalIncome - totalExpense;

    const categoryWise = await Record.aggregate([
      {
        $group: {
          _id: { category: "$category", type: "$type" },
          total: { $sum: "$amount" },
        },
      },
    ]);

    // Base response (for all roles)
    let response = {
      totalIncome,
      totalExpense,
      netBalance,
      categoryWise,
    };

    // Only Analyst & Admin can see recent transactions
    if (role === "admin" || role === "analyst") {
      const recentTransactions = await Record.find()
        .sort({ date: -1 })
        .limit(5);

      response.recentTransactions = recentTransactions;
    }

    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};