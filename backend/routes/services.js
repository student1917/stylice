import express from 'express'
import { createService, deleteService, getAllServices, getSingleService, getServicesBySearch,
     updateService, getServiceCount, getRecommendedService, getServiceByCategory,getServiceBySearchCount, 
     getServicesByFilter, getServiceFilterCount } from '../controllers/serviceController.js' 

const router = express.Router()

router.post('/', createService)
router.put('/:id',updateService)
router.delete('/:id', deleteService)


router.get('/', getAllServices)
router.get('/:id', getSingleService)
router.get('/search/getServiceBySearch', getServicesBySearch)
router.get('/search/getServiceCount', getServiceCount)
router.get('/recommended/getRecommendedService', getRecommendedService)
router.get('/search/getServiceByCategory', getServiceByCategory)
router.get('/search/getServiceBySearchCount', getServiceBySearchCount)
router.get('/search/getServiceByFilter', getServicesByFilter)
router.get('/search/getServiceFilterCount', getServiceFilterCount)

export default router