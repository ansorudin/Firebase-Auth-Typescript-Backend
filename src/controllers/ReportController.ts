import axios from 'axios';
import {Request, response, Response} from 'express';
const db = require("../db/models");
const { google } = require('googleapis');

class ReportController {
    getData = async (req: Request, res: Response): Promise<Response> => {
        try {
            const {startDate, endDate, metrics, dimensions} = req.body
            const scope = 'https://www.googleapis.com/auth/analytics'
            const authClient = new google.auth.JWT(process.env.CLIENT_EMAIL, null, process.env.PRIVATE_KEY, scope)

            await authClient.authorize();

            const result = await google.analytics('v3').data.ga.get({
            auth : authClient,
            ids : 'ga:'+ process.env.VIEW_ID,
            "start-date" : startDate, // yyyy-mm-dd || today/yesterday || 0-30+daysAgo
            "end-date" : endDate, 
            dimensions : `ga:${dimensions}`,
            metrics : `ga:${metrics}`,
            })

            return res.send({
                message : 'sukses',
                data : result
            })
        } catch (error) {
            console.log(error)
            return res.send({
                error
            })
        }  
    }
    
}

export default new ReportController();