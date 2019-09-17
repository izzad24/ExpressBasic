import * as express from "express";
import * as bodyParser from  "body-parser";
import {NextFunction, Request, Response} from "express";
import { Routes } from "./routes";
import * as cors from 'cors'

export const storage = {
    users: [
        {
            "id": 1,
            "avatar": "http://img_store/test_user_1.img",
            "username": "Test User 1",
            "country": "Msia",
            "images": [
                "http://img_store/users/1/img_1",
                "http://img_store/users/1/img_2",
                "http://img_store/users/1/img_3",
                ]
        },
        {
            "id": 2,
            "avatar": "http://img_store/test_user_2.img",
            "username": "Test User 2",
            "country": "Msia",
            "images": [
                "http://img_store/users/1/img_1",
                "http://img_store/users/1/img_2",
                "http://img_store/users/1/img_3",
                ]
        },
        {
            "id": 3,
            "avatar": "http://img_store/test_user_2.img",
            "username": "Test User 3",
            "country": "France",
            "images": []
        },
    ],
    messages: [
        {
            "id":1,
            "text": "Hello world!",
            "user_id": 1,
            "datetime": "2019/08/19 16:01:37"
        },
        {
            "id":2,
            "text": "Nice to meet you!",
            "user_id": 1,
            "datetime": "2019/08/19 16:01:37"
        },
        {
            "id":3,
            "text": "Testing 123",
            "user_id": 2,
            "datetime": "2019/08/19 16:01:37"
        },
        {
            "id":4,
            "text": "I'm user 3!",
            "user_id": 3,
            "datetime": "2019/08/19 16:01:37"
        },
    ]
}

export const srcPath = __dirname
const PORT = process.env.PORT || 3000;

// create and setup express app
const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + '\\public'));
app.use(cors())

// register routes
Routes.forEach(route => {
    (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
        const result = (new (route.controller as any))[route.action](req, res, next);
        if (result instanceof Promise) {
            result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

        } else if (result !== null && result !== undefined) {
            res.json(result);
        }
    });
});

// start express server
app.listen(PORT);