const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    const {
        grant_type,
        client_id,
        client_secret
    } = req.query

    const valid = true

    if(!grant_type) {
        return res.status(400).send({
            error: "grant_type is required"
        })
    }

    if(!is_type_supported(grant_type)) {
        return res.status(400).send({
            error: "grant_type not supported"
        })
    }

    if(!client_id) {
        return res.status(400).send({
            error: "client_id not found"
        })
    }

    if(!client_secret) {
        return res.status(400).send({
            error: "client_secret not found"
        })
    }


    return res.send({
        access_token: make_token(33),
        token_type: "Bearer",
        expires_in: 3600,
        refresh_token: make_token(33),
        scope: "admin"
    })
})


const make_token = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

const is_type_supported = (type) => {
    switch(type) {
        case 'client_credentials':
            return true
        default:
            return false
    }
}

app.listen(port, () => {
  console.log(`Mock Oauth2 is running ${port}`)
})