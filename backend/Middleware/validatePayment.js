import { body, validationResult } from 'express-validator';

export const validatePayment = [
    body('methods').isIn(['stripe', 'mpesa']).withMessage('Payment method must be stripe of mpesa'),
    body('amount').isFloat({ gt: 0 }).withMessage('Amount must be greater than 0'),
    body('reference').notEmpty().withMessage('Reference ID is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next ();
    }
]

