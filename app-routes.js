const expres = require('express')
const router = new express.Router()
const items = require('../fakeDb')
const ExpressError = require('../expressError')

router.get('/', (req, res) => {
    res.json({items})
})

router.post('/', (req, res) => {
    const newItem = {name: req.body.name, price: req.body.price}
    items.push(newItem)
    res.send(`added new item ${newItem}`)
})

router.get('/:name', function(req, res) {
    const foundItem = items.find(item => item.name === req.params.name)
    if (foundItem === undefined) {
        throw new ExpressError('item not found', 404)
    }
    res.json({item: foundItem})
})

router.patch('/:name', function (req, res ) {
    const foundItem = items.find(item => item.name === req.params.name)
    if (foundItem === undefined) {
        throw new ExpressError('item not found', 404)
    }
    foundItem.name = req.body.name
    res.json({'updated': foundItem})
})

router.delete('/:name', (req, res) => {
    const foundItem = items.findIndex(item => item.name === req.params.name)
    if (foundItem === -1) {
        throw new ExpressError('item not found', 404)
    }
    items.splice(foundItem, 1)
    res.json({message: 'deleted'})
})