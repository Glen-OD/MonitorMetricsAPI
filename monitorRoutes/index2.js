const url = require('url')
const express = require('express')
const router = express.Router()
const needle = require('needle')

const API_TEST_URL = process.env.API_TEST_URL
const API_KEY_NAME = process.env.API_KEY_NAME
const API_KEY_VALUE = process.env.API_KEY_VALUE

router.get('/', async (req, res) => {
    try {
        t = performance.now()
        const params = new URLSearchParams({
            [API_KEY_NAME]: API_KEY_VALUE,
            ...url.parse(req.url, true).query
        })

        const apiRes = await needle('get', `${API_TEST_URL}?${params}`)
        const data = apiRes.body

        t2 = performance.now()
        t3 = t2 - t

        //logging request to the console
        if(process.env.NODE_ENV !== 'production'){
            console.log(`REQUEST: ${API_TEST_URL}?${params}`)
        }

        if(data.answer == 54)
        {
            if(data.string == "Contains 54 characters")
            {
                if(data.error == false)
                {
                    data = "URL 1 for CharCount working as expected. Time taken: " + t3.toFixed(2) + " milliseconds."
                }
                else{
                    dataError = data.error
                    data = "error expected was: false received: " + dataError + ". Time taken: " + t3.toFixed(2) + " milliseconds."
                }
            }
            else{
                dataString = data.string
                data = "String expected was: Contains 54 characters received: " + dataString + ". Time taken: " + t3.toFixed(2) + " milliseconds."
            }
        }
        else{
            dataAnswer = data.answer
            data = "Answer expected was 54 received: " + dataAnswer + ". Time taken: " + t3.toFixed(2) + " milliseconds."
        }

        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ error })
    }
})

module.exports = router