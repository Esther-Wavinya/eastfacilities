import { body, validationResult } from 'express-validator';

// Validates incoming request data before processing a payment. Ensures method is either "stripe" or "mpesa", amount is a positive number and reference is provided.
export const validatePayment = [
    body('methods').isIn(['stripe', 'mpesa']).withMessage('Payment method must be stripe or mpesa'),
    body('amount').isFloat({ gt: 0 }).withMessage('Amount must be greater than 0'),
    body('reference').notEmpty().withMessage('Reference ID is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }); // If validation fails it returns a 400 Bad Request with error details
        }
        next ();
    }
]

