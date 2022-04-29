const express = require("express");
const cors = require("cors");
const knex = require('knex')(require('./knexfile')[process.env.NODE_ENV||'development']);

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/movies', (req, res) => {
  knex('movie_data')
    .select('*')
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again'
      })
    );
});

app.post('/api/movies', (req, res) => {
  console.log(req.body)
  knex('movie_data')
    .insert(req.body)
    .returning('*')
    .then(data => {
      res.status(204).json(data)
    })
    .catch(err => 
      res.status(404).json({
        message:
          'Could not POST data. Please try again'
      }))
})

app.delete('/api/movies', (req, res) => {
  knex('movie_data')
    .select('*')
    .where('id', req.body.id)
    .delete()
    .then(data => {
      res.status(202).json(data)
    })
    .catch(err => 
      res.status(404).json({
        message:
          'Could not DELETE data. Please try again'
      }))
})

app.patch('/api/movies', (req, res) => {
  knex('movie_data')
    .select('*')
    .where('id', req.body.id)
    .update(req.body)
    .then(data => {
      res.status(202).json(data)
    })
    .catch(err => {
      res.status(404).json({
        message:
          'Could not PATCH data. Please try again'
      })
    })
})


app.listen(PORT, () => {
  console.log(`server is running and listening on port ${PORT}`);
});