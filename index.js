const express = require('express')
const cors = require('cors')
require('dotenv').config()

const PORT = process.env.PORT || 8080

const app = express()

app.use(express.static('../editor-frontend/src'))

app.set('trust proxy', 1)
   

app.use('/apiTest', require('./monitorRoutes/index'))
app.use('/api2Test', require('./monitorRoutes/indexv2'))

app.use('/testTest', require('./monitorRoutes/index2'))
app.use('/test2Test', require('./monitorRoutes/index2v2'))

app.use(cors())

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))