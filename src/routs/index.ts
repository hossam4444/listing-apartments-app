import express from 'express';
import apartmentsRoutes from './apartmentRoutes';

const router = express.Router();

// Mounts apartments
router.use('/apartments', apartmentsRoutes);

export default router;
