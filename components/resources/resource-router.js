const router = require('express').Router()

const ResourceModel = require('./resource-model')

//```````GET````````
//get resources
router.get('/', (req, res) => {
    ResourceModel.getResources()
    .then(resources => {
        res.json(resources)
    })
    .catch(err => {
        res.status(500).json({error: err.message})
    })
})

// ``````POST````````
// router.post('/', (req, res) => {
//     if(!Object.keys(req.body).length){
//         res.status(400).json({message: 'nothing to post!'})
//     } else if(!req.body.resource_name){
//         res.status(400).json({message: 'missing required field resource_name'})
//     }

//     ResourceModel.addResource(req.body)
//     .then( newResource => {
//         res.json(newResource)
//     })
//     .catch(err => {
//         ResourceModel.getResources()
//         .then( resources => {
//             if( resources.filter(resource => resource.resource_name === req.body.resource_name)){
//                 res.status(400).json({message: "resource_name must be unique"})
//             }else {
//                 res.status(500).json({error: err.message})
//             }
//         })
       
//     })
// })

module.exports = router