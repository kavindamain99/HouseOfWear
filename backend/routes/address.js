import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { insertAddress, getSingleAddress, getAllAddresses, updateAddress, deleteAddress } from '../controllers/address.js';

const router = express.Router();

router.route('/')
    .post(protect, insertAddress)
    .get(protect, getAllAddresses);

router.route('/:id')
    .get(protect, getSingleAddress)
    .put(protect, updateAddress)
    .delete(protect, deleteAddress);

export default router;