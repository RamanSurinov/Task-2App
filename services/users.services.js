const fs = require('fs')
const fsPromises = require('fs/promises')
const path = require('path')



class UsersService {

   async getUsers(req) {
      const readData = await fsPromises.readFile(
         path.join(__dirname, './userDB.json')
      )
      const gender = req.params.gender
      const { min, max } = req.query

      const parsedData = JSON.parse(readData)

      if (gender === 'm') {
         if (min && max) {
            return parsedData.filter(i => {
               return (i.isMan === 'true') && (+i.age > +min && +i.age < +max)
            })
         } else {
            return parsedData.filter(i => {
               return i.isMan === 'true'
            })
         }
      }

      if (gender === 'f') {
         if (min && max) {
            return parsedData.filter(i => {
               return (i.isMan === 'false') && (+i.age > +min && +i.age < +max)
            })
         } else {
            return parsedData.filter(i => {
               return i.isMan === 'false'
            })
         }
      }
   }


   async createUser(userBody) {
      fs.readFile(
         path.join(__dirname, './userDB.json'),
         (err, data) => {
            if (err) throw new Error('create user err(read data)')
            const parsedData = JSON.parse(data)
            parsedData.push(userBody)
            fs.writeFile(
               path.join(__dirname, './userDB.json'),
               JSON.stringify(parsedData),
               (err) => {
                  if (err) throw new Error('create user err(write data)')
               }
            )
         }
      )
      return userBody
   }

   async editUser(req, res) {
      const readData = await fsPromises.readFile(
         path.join(__dirname, './userDB.json')
      ).then(data => {
         const parsedData = JSON.parse(data)
         const user = parsedData.find(i => i.id === req.params.id)
         const { name, age, isMan, country } = req.body
         parsedData.splice(parsedData.findIndex(i => i.id == req.params.id), 1, {
            id: user.id,
            name,
            age,
            isMan,
            country
         })
         return parsedData
      }).then(data => {
         fsPromises.writeFile(
            path.join(__dirname, './userDB.json'),
            JSON.stringify(data),
            (err) => {
               if (err) throw new Error('create user err(write data)')
            }
         )
         res.send(data)
      })
   }

   async patchUser(req, res) {
      const readData = await fsPromises.readFile(
         path.join(__dirname, './userDB.json')
      ).then(data => {
         const parsedData = JSON.parse(data)
         parsedData.map(i => {
            if (i.id == req.params.id) {
               i.name = req.body.name ?? i.name
               i.isMan = req.body.isMan ?? i.isMan
               i.age = req.body.age ?? i.age
               i.age = req.body.country ?? i.country
            }
         })
         return parsedData
      }).then(data => {
         fsPromises.writeFile(
            path.join(__dirname, './userDB.json'),
            JSON.stringify(data),
            (err) => {
               if (err) throw new Error('create user err(write data)')
            }
         )
         res.send(data)
      })
   }

   async deleteUser(params) {
      const readData = await fsPromises.readFile(
         path.join(__dirname, './userDB.json')
      ).then(data => {
         const parsedData = JSON.parse(data)
         const deleteElement = parsedData.splice(parsedData.findIndex(i => i.id == params.id), 1)
         fsPromises.writeFile(
            path.join(__dirname, './userDB.json'),
            JSON.stringify(parsedData),
            (err) => {
               if (err) throw new Error('create user err(write data)')
            }
         )
         return deleteElement
      })

   }

}


module.exports = new UsersService()

