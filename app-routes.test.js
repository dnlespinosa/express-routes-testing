provess.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../app');
const items = require('../fakeDb')

let grocery = {name: 'popsicle', price: 1.45};

beforeEach(function() {
    items.push(grocery)
})

afterEach(function() {
    // doing this empties the array without changing the array in memory 
    items.length = 0;
})

describe('GET/ITEMS', () => {
    test('get all items', async () => {
        const res = await request(app).get('/items')
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({items:[grocery]})
    })
})

describe('GET/ITEMS/:name', () => {
    test('get item by name', async () => {
        const res = await request(app).get(`/items/${grocery.name}`)
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({item: grocery})
    })

    test('failing to find an invalid item', async () => {
        const res = await request(app).get(`/items/iceCubezzzzz`)
        expect(res.statusCode).toBe(404)
    })
})

describe('POST /ITEMS'), () => {
    test('creating a item', async () => {
        const res = await request(app).post('/items').send({name: 'potatoes', price: 1.55})
        expect(res.statusCode).toBe(201)
        expect(res.body).toEqual({item: {name: 'potatoes', price: 1.55}})
    })
}

describe('/POST /ITEM/:name', () => {
    test('updating ITEM name', async () => {
        const res = await request(app).patch(`/cats/${grocery.name}`).send({name:'Monster'})
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({items: {name: 'Monster'}})
    })

    test('responds to invalid item with 404', async () => {
        const res = await request(app).patch(`/items/popsycle`).send({name:'Monster'})
        expect(res.statusCode).toBe(404)
    })
})

describe('/DELETE /ITEMS/:name', () => {
    test('deleting an ITEM', async () => {
        const res = await request(app).delete(`/items/${grocery.name}`)
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({message: 'deleted'})
    })

    test('deleting an invalid item', async() => {
        const res = await request(app).delete('/items/hamface')
        expect(res.statusCode).toBe(404)
    })
})