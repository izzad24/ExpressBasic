import {NextFunction, Request, Response} from "express";
import { storage } from "../index";

export class UserController {
    async list(request: Request, response: Response, next: NextFunction) {
        let result = []
        for(let user of storage.users){
            if(user.country === request.query.country){
                result.push(user)
            }
        }
        if(!request.query.country){
            result = storage.users
        }

        response.json(result)
    }

    async show(request: Request, response: Response, next: NextFunction) {
        let userId = request.params.userId
        for(let user of storage.users){
            if(user.id === parseInt(userId)){
                response.json(user)
                return
            }
        }
        response.send("User not found")
    }

    async create(request: Request, response: Response, next: NextFunction){
        storage.users.push({
            "id": storage.users.length + 1,
            "avatar": request.body.avatar,
            "username": request.body.username,
            "country": request.body.country,
            "images": []
        })


        response.send("Post request")
    }

    async postImages(request: Request, response: Response, next: NextFunction){
        let userId = request.params.userId
        let image_url = request.body.image_url
        for(let user of storage.users){
            if(user.id == parseInt(userId)){
                user.images.push(image_url)
                response.send("Image added to UserId: " + userId)
                break
            }
        }
        response.send("User not found")


        response.send("Post request")
    }
}