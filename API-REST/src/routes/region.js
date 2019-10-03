const {Router} = require('express');
const router = Router();
const _= require('underscore');
 
const regions = require('../models json/region.json');
console.log(regions);

// routes
router.get('/',(req,res)=>{
    res.json(regions);
});

router.post('/',(req,res)=>{
    
    const { id_region, name_region } = req.body; //const apartes almacena
    const newRegion = { ...req.body }; //... 3 puntos para traer todos los datos
    if (id_region && name_region) {
        regions.push(newRegion);
        res.json(regions);
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const {id_region, name_region } = req.body;//ATRIBUTOS
    if (id_region && name_region ) {
        _.each(regions, (region, i) => {
            if (region.id_region === id) {
                region.name_region =name_region;
                
            }
        });
        res.json(regions);
    } else {
        res.status(500).json({error: 'There was an error.'});
    }
});


router.delete('/:id', (req, res) => {
    const {id} = req.params;
    if (id) {
        _.each(regions, (region, i) => {
            if (region.id_region == id) {
                regions.splice(i, 1);
            }
        });
        res.json(regions);
    }
});


module.exports=router;