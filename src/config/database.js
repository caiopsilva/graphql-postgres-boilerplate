import knexfile from '../knexfile'
const knex = require('knex')(knexfile)
export default knex

// const uuid = require('uuid')
// knex('users')
//   .insert({
//     id: uuid(),
//     name: 'test',
//     email: 'test@emial.com',
//     password: 'teste'
//   })
//   .then(data => console.log(data))

// knex('users').first().then(result => console.log(result))
