const express = require('express')
const router = express.Router()
const UsersController = require('../../controllers/users.controllers')


router.get('/:gender', async (req, res) => {
   try {
      const users = await UsersController.getUsers(req)
      res.send(users)
   } catch (e) {
      console.log(e)
   }
})

router.post('/create', async (req, res) => {
   try {
      const user = await UsersController.createUser(req.body)
      res.send(user)
   } catch (e) {
      console.log(e)
   }
})

router.put('/edit/:id', async (req, res) => {
   try {
      const user = await UsersController.editUser(req, res)
      res.send(user)
   } catch (e) {
      console.log(e)
   }
})

router.patch('/edit/:id', async (req, res) => {
   try {
      const user = await UsersController.patchUser(req, res)
      res.send(user)
   } catch (e) {
      console.log(e)
   }
})

router.delete('/delete/:id', async (req, res) => {
   try {
      const user = await UsersController.deleteUser(req.params)
      res.send(user)
   } catch (e) {
      console.log(e)
   }
})

module.exports = router