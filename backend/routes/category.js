import express from 'express'
import { createCategory, deleteCategory, getAllCategory, updateCategory } from '../controllers/categoryController.js'


const router = express.Router()

router.post('/', createCategory)
router.put('/:id', updateCategory)

router.delete('/:id', deleteCategory)
router.get('/', getAllCategory)

export default router