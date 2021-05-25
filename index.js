const express = require('express')
const app = express()
const port = 5000
const jwt = require('jsonwebtoken')
app.use(express.json())
const secret = "aslfW3475HfhawHSLLf00w"

// create a token and send back to client
app.post('/sign-token', (req, res) => {
      // payload
    // secret
    // expiration time
    const payload = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        id: req.body.id
        // NEVER put password in payload. Can be intercepted
    }
    
    const expiration = 36000

    jwt.sign(payload, secret, {expiresIn: expiration}, (err, token) => {
        if(err) {
            return res.status(500).json({err})
        } else{
            return res.status(200).json({token})
        }
    })
})




// receive a token from client and decode it 
app.get('/decode-token', (req, res) => {
  console.log(req.headers)
  // pick auth header
  if(!req.headers.authorization){
      return res.status(403).json({message: "authentication token is required"})
  }
  const authHeader = req.headers.authorization
  // extract token
  const splitedStr = authHeader.split(' ')
  const token = splitedStr[1]
  // decode token
  jwt.verify(token, secret, (err, decodedToken) => {
      if(err){
          return res.status(500).json({err})
      } else{
          return res.status(200).json({user: decodedToken})
      }
  } )

})

app.listen(port, () => console.log("app started"))
