const users = []
const bcrypt = require('bcryptjs')

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      // console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) { 
        // console.log('cheeeeeeeeeese')
        let existing = bcrypt.compareSync(password, users[i].pwhash)
        if (users[i].username === username && existing === true) {
        users.push(req.body)
        console.log('Logging in')
        let messageToReturn = {... users[i]}
        delete messageToReturn.pwhash
          res.status(200).send(messageToReturn)
          return
        } else {
          res.status(400).send("User not found.")
      }
    }
    },
    register: (req, res) => {
      const {username,email,firstName,lastName,password}= req.body
        console.log('Registering User')
        // console.log(req.body)
        // users.push(req.body)

        const salt = bcrypt.genSaltSync(5)
        const pwhash = bcrypt.hashSync(password, salt)
        let reply = {
          username,
          email,
          firstName,
          lastName,
          pwhash
        }
        users.push(reply)
        console.log('added PW')
        let messageToReturn = {... reply}
        delete messageToReturn.pwhash
        res.status(200).send(reply)
        // console.log(users)
     }

    }
  
