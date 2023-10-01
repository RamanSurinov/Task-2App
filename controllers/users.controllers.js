const UserServices = require('../services/users.services')

class UserController {

   async getUsers(req) {
      const users = await UserServices.getUsers(req)
      return users
   }

   async createUser(userBody) {
      const user = await UserServices.createUser(userBody)
      // console.log(user)
      return user
   }

   async editUser(req, res) {
      const user = await UserServices.editUser(req, res)
      return user
   }
   async patchUser(req, res) {
      const user = await UserServices.patchUser(req, res)
      return user
   }
   async deleteUser(params) {
      const user = await UserServices.deleteUser(params)
      return user
   }
}

module.exports = new UserController()