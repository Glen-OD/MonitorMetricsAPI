const url = require('url')
const express = require('express')
const router = express.Router()
const needle = require('needle')
const { json } = require('express')

const API_BASE_URL = process.env.API_AND_URL
const API_KEY_NAME = process.env.API_KEY_NAMEA
const API_KEY_VALUE = process.env.API_KEY_VALUE

router.get('/', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    
    try {
        t = performance.now()
        const params = new URLSearchParams({
            [API_KEY_NAME]: API_KEY_VALUE,
            ...url.parse(req.url, true).query
        })

        newMessage = params.toString()
        newerMessage = newMessage.replace(/\+/g, '%20');

        const apiRes = await needle('get', `${API_BASE_URL}/${newerMessage}`)
        data = apiRes.body
        
        t2 = performance.now()
        t3 = t2 - t

        //logging request to the console
        if(process.env.NODE_ENV !== 'production'){
            console.log(`REQUEST: ${API_BASE_URL}/${newerMessage}`)
        }

        //if
        if(data.answer == 0)
        {
            if(data.x == "It was the best of cloud, it was the worst of cloud...")
            {    
                data = "URL 1 for AndCount working as expected. Time taken: " + t3.toFixed(2) + " milliseconds."
            }
            else{
                dataString = data.x
                data = "String expected was: It was the best of cloud, it was the worst of cloud... received: " + dataString + ". Time taken: " + t3.toFixed(2) + " milliseconds."
            }
        }
        else{
            dataAnswer = data.answer
            data = "Answer expected was 0 received: " + dataAnswer + ". Time taken: " + t3.toFixed(2) + " milliseconds."
        }
        //console.log(data)
        res.status(200).json(data)
        //else - same as catch (error)

    } catch (error) {
        res.status(500).json({ error })
    }
})

module.exports = router