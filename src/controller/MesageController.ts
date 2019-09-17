import {NextFunction, Request, Response} from "express";
import { storage } from "../index";


export class MessageController {
    async singleMessage(request: Request, response: Response, next: NextFunction) {
        let msgId = request.params.messageId
        for(let message of storage.messages){
            if(parseInt(msgId) == message.id)
                response.send(message.text )
        }
    }
    
    async showMessage(request: Request, response: Response, next: NextFunction) {
        let result = []
        console.log(request.query.userId)
        
        if(!request.query.userId){
            result = storage.messages
        }
        else{
            for(let message of storage.messages){
                if(message.user_id == request.query.userId){
                    result.push(message.text)
                }
            }
        }

        response.json(result)
    }

    async greet(request: Request, response: Response, next: NextFunction){
        let result = []
        let username = request.params.username
        let greetings = request.query.greeting
        response.send(
            // greetings + ", " + username
            `${greetings}, ${username}`
        )
    }

    async postMessage(request: Request, response: Response, next: NextFunction){
        storage.messages.push({
            "id": storage.messages.length + 1,
            "text": request.body.text,
            "user_id": request.body.user_id,
            "datetime": request.body.datetime
        })


        response.send("Message posted")
    }

}