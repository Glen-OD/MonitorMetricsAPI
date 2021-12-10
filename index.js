const express = require('express')
const cors = require('cors')
require('dotenv').config()

const PORT = process.env.PORT || 8080

const app = express()

app.use(express.static('./src'))

app.set('trust proxy', 1)
   

app.use('/apiTest', require('./monitorRoutes/index'))
app.use('/api2Test', require('./monitorRoutes/indexv2'))

app.use('/charTest', require('./monitorRoutes/index2'))
app.use('/charTest2', require('./monitorRoutes/index2v2'))

app.use('/commaTest', require('./monitorRoutes/iCommaTest'))
app.use('/commaTest2', require('./monitorRoutes/iCommaTest2'))

app.use('/andTest', require('./monitorRoutes/iAndTest.js'))
app.use('/andTest2', require('./monitorRoutes/iAndTest2'))

app.use('/vowelTest', require('./monitorRoutes/iVowelTest'))
app.use('/vowelTest2', require('./monitorRoutes/iVowelTest2'))

app.use('/avgwordTest', require('./monitorRoutes/iAvgTest'))
app.use('/avgwordTest2', require('./monitorRoutes/iAvgTest2'))

app.use(cors())

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))