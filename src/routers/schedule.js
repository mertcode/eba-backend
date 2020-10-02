const express   = require('express')
const Schedule  = require('../models/schedule')
const router    = express.Router()
const axios     = require('axios')

const BASE_URL = 'https://onyuzyonetim.eba.gov.tr/api/show/plans/weekly?'

const urls = [
    `${BASE_URL}startDate=2020-10-05&endDate=2020-10-10&classType=ilkokul&classLevel=1`,
    `${BASE_URL}startDate=2020-10-05&endDate=2020-10-10&classType=ilkokul&classLevel=2`,
    `${BASE_URL}startDate=2020-10-05&endDate=2020-10-10&classType=ilkokul&classLevel=3`,
    `${BASE_URL}startDate=2020-10-05&endDate=2020-10-10&classType=ilkokul&classLevel=4`,
    `${BASE_URL}startDate=2020-10-05&endDate=2020-10-10&classType=ortaokul&classLevel=5`,
    `${BASE_URL}startDate=2020-10-05&endDate=2020-10-10&classType=ortaokul&classLevel=6`,
    `${BASE_URL}startDate=2020-10-05&endDate=2020-10-10&classType=ortaokul&classLevel=7`,
    `${BASE_URL}startDate=2020-10-05&endDate=2020-10-10&classType=ortaokul&classLevel=8`,
    `${BASE_URL}startDate=2020-10-05&endDate=2020-10-10&classType=lise&classLevel=9`,
    `${BASE_URL}startDate=2020-10-05&endDate=2020-10-10&classType=lise&classLevel=10`,
    `${BASE_URL}startDate=2020-10-05&endDate=2020-10-10&classType=lise&classLevel=11`,
    `${BASE_URL}startDate=2020-10-05&endDate=2020-10-10&classType=lise&classLevel=12`
]

router.get('/fetch-weekly-schedules', async (req, res, next) => {

    const firstGradeSchedule = await Promise.all(urls.map(url => axios.get(url))).then(resp => resp.map(item => item.data))

    const schedules = firstGradeSchedule.map(item => {
        return Object.keys(item).map(key => {
            return {
                classLevel: item[key].classLevel,
                time: key,
                classes: {
                    monday:             item[key].monday,
                    monday_subject:     item[key].monday_subject,
                    tuesday:            item[key].tuesday,
                    tuesday_subject:    item[key].tuesday_subject,
                    wednesday:          item[key].wednesday,
                    wednesday_subject:  item[key].wednesday_subject,
                    thursday:           item[key].thursday,
                    thursday_subject:   item[key].thursday_subject,
                    friday:             item[key].friday,
                    friday_subject:     item[key].friday_subject,
                }
            }
        })
    }).flat(1)
    
    try {
        
        await Promise.all(schedules.map(item => new Schedule(item).save()))

        res.json({
            message: 'OK'
        })

    } catch(error) {

        res.json(error)

    }



})

module.exports = router