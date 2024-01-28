const express = require('express')
const app = express()

/*app.use(express.json())*/

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
    console.log('GET request:\n',
	'Request HEADERS:\n',
	request.headers,
	'\nRequest BODY:\n',
	request.body
    )

    response.json(persons)
})

app.get('/info', (req,res) => {
    console.log('GET /info request:\n',
	'Request HEADERS:\n',
	req.headers,
	'\nRequest BODY:\n',
	req.body
    )

    const count = persons.reduce( (s,p) => s+1 , 0 )
    res.send(`<!doctype html>
	<p>Phonebook has info for ${count} people</p>
	<p>${Date()}</p>`
    )
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
