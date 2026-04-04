import Record from "../models/record.model.js";

export const createRecord = async (req, res) => {
  try {
    const { amount, type, category, date, note } = req.body;

    if (!amount || !type || !category) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const record = await Record.create({
      amount,
      type,
      category,
      date,
      note,
      createdBy: req.user._id,
    });

    res.status(201).json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRecords = async (req, res) => {
  try {
    const { type, category, startDate, endDate } = req.query;

    let filter = {};

    if (type) filter.type = type;
    if (category) filter.category = category;

    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const records = await Record.find(filter).sort({ date: -1 });

    res.json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRecord = async (req, res) => {
  try {
    const record = await Record.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json(record);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteRecord = async (req, res) => {
  try {
    const record = await Record.findByIdAndDelete(req.params.id);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json({ message: "Record deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};