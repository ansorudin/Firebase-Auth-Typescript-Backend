import {Request, response, Response} from 'express';
import FirebaseService from '../services/firebase-services';
const db = require("../db/models");
import moment from 'moment'

class AuthController {
    private setRole = async (uid : string, role : string) => {
        const firebase = new FirebaseService(); 
        try {
            const result = await firebase.setRole(uid, role)
            return result
        } catch (error) {
            console.log(error)
        }
    }
    private getUserByUid = async (uid : string) => {
        const user = await db.user.findOne({
            where : {
                uid
            }
        })
        return user
    }
    private getUserFromFirebase = async (uid : string) => {
        const firebase = new FirebaseService(); 
        try {
            const result = await firebase.getUserByUid(uid)
            return result
        } catch (error) {
            console.log(error)
        }
    }

    verifyToken = async (req: Request, res: Response): Promise<Response> => {
        try {
            const firebase = new FirebaseService(); 
            const { sessionCookie } = req.body
            // console.log(sessionCookie)
            const result = await firebase.verifyToken(String(sessionCookie))
            console.log(result)
            return res.send({
                message : 'sukses',
                // data : result
            })
        } catch (error) {
            console.log(error)
            return res.send({
                error
            })
        }  
    }
    createSessionCookie = async (req: Request, res: Response): Promise<Response> => {  
        try {
            const firebase = new FirebaseService(); 
            const { tokenId } = req.body
            const { sessionCookie, options } = await firebase.sessionCookie(tokenId)
            return res.send({
                cookie : sessionCookie,
                options : options
            })
        } catch (error) {
            console.log(error)
            return res.send({
                error
            })
        }
    }

    register = async (req: Request, res: Response): Promise<Response> => {
        try {
            const {uid, email, providerId} = req.body
            const user = await this.getUserByUid(uid)
            if(!user){
                await db.user.create(
                    {
                        email,
                        uid : uid,
                        providerId : providerId
                    }
                )
                const role = 'premium-member'
                await this.setRole(uid, role)
            }
            return res.send({
                message : 'sukses',
            })
        } catch (error) {
            console.log(error)
            return res.send({
                error
            })
        }        
    }
    
    login(req: Request, res: Response): Response {
        return res.send(req.body)
    }

    getByUid = async (req: Request, res: Response): Promise<Response> => {
        try {
            const {uid} = req.body
            const user = await this.getUserFromFirebase(uid)
            return res.send({
                message : 'sukses',
                data : user
            })
        } catch (error) {
            console.log(error)
            return res.send({
                error
            })
        }        
    }
    
    
    
}

export default new AuthController();