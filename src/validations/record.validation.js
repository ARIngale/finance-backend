import { body } from "express-validator";

export const createRecordValidation = [
  body("amount")
    .isNumeric()
    .withMessage("Amount must be a number"),

  body("type")
    .isIn(["income", "expense"])
    .withMessage("Type must be income or expense"),

  body("category")
    .notEmpty()
    .withMessage("Category is required"),

  body("date")
    .optional()
    .isISO8601()
    .withMessage("Invalid date format"),

  body("note")
    .optional()
    .isString(),
];