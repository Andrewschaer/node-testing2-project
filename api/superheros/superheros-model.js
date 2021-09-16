const db = require('../../data/dbConfig.js')

module.exports = {
  insert,
  update,
  remove,
  getAll,
  getById,
}

function getAll() {
  return db('superheros')
}

function getById(id) {
  return db('superheros').where('id', id).first();
}

async function insert(superhero) {
  const [id] = await db('superheros').insert(superhero)
  return db('superheros').where('id', id).first()
}

async function update(id, changes) {
  return null
}

function remove(id) {
  return null
}
