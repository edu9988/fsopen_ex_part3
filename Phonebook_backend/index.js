const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

morgan.token('body', (req,res) => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms\n:body'))
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

let persons = [
    {
      "id": 1,
      "name": "Arto Hellas",
      "number": "040-123456"
    },
    {
      "id": 2,
      "name": "Ada Lovelace",
      "number": "39-44-5323523"
    },
    {
      "id": 3,
      "name": "Dan Abramov",
      "number": "12-43-234345"
    },
    {
      "id": 4,
      "name": "Mary Poppendieck",
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (req,res) => {
    const count = persons.reduce( (s,p) => s+1 , 0 )
    res.send(`<!doctype html>
	<p>Phonebook has info for ${count} people</p>
	<p>${Date()}</p>`
    )
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)

    if(person)
	res.json(person)
    else
	res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    if( persons.some(p => p.id === id) ){
	persons = persons.filter(p => p.id !== id)
	res.status(204).end()
    }
    else
	res.status(404).end()
})

app.post('/api/persons', (req, res) => {
    if( !req.body.name )
	return res.status(400).json({
	    error: 'name missing'
	})

    if( !req.body.number )
	return res.status(400).json({
	    error: 'number missing'
	})

    if( persons.some(p => p.name === req.body.name ) )
	return res.status(400).json({
	    error: 'name must be unique'
	})

    const person = {
	id: Math.floor(Math.random() * 100000),
	name: req.body.name,
	number: req.body.number
    }

    res.json(person)
    persons = persons.concat(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
