import express from 'express';
import { getAllApartments, getApartment, postApartment } from '../controllers/ApartmentController';

const router = express.Router();

// Mount apartments controllers
router.get('/', getAllApartments);
router.get('/:id', getApartment);
router.post('/', postApartment);

export default router;
