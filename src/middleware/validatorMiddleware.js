import { validationResult } from "express-validator";

// @desc >>> find the validation error
export function validatorMiddleware() {
  return (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  };
}
