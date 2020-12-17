import {
    NextFunction,
    Request,
    Response,
} from 'express';

import {
    default as jwtDecode
} from "jwt-decode";

import {
    SignPost, 
    User
} from '../models';

export default class SignpostController {
    public allSignposts = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            // Get bearer token
            if (!req.headers.authorization) {
                return res.status(401).json({
                    error: "Deze gebruiker bestaat niet.",
                });
            };

            const token = req.headers.authorization.slice(7);
            const payload = Object(jwtDecode(token));

            const { id } = payload;

            // Check if user exists
            const user = await User.findOne({_id: id});

            if (!user) {
                return res.status(401).json({
                    error: "Deze gebruiker bestaat niet.",
                });
            };

            // Check for pagination
            const { limit, skip } = req.query;

            let signposts;

            if (limit && skip) {
                signposts = await SignPost.paginate({}, {
                    limit: Number(limit),
                    page: Number(skip),
                    sort: {
                        _createdAt: -1,
                    },
                });
            } else {
                signposts = await SignPost.find().sort({_createdAt: -1}).exec();
            };

            return res.status(200).json(signposts);
        } catch (e) {
            next(e);
        };
    };

    getSignpost = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            // Get parameter
            const { signpostId } = req.params;

            // Get bearer token
            if (!req.headers.authorization) {
                return res.status(401).json({
                    error: "Deze gebruiker bestaat niet.",
                });
            };
            
            const token = req.headers.authorization.slice(7);
            const payload = Object(jwtDecode(token));

            const { id } = payload;

            // Check if user exists
            const user = await User.findOne({_id: id});

            if (!user) {
                return res.status(401).json({
                    error: "Deze gebruiker bestaat niet.",
                });
            };
            
            // Find module
            const signpost = await SignPost.findById({_id: signpostId}).populate({
                path: 'modules',
            }).exec();

            if (!signpost) {
                return res.status(404).json({
                    error: "Deze wegwijzer bestaat niet.",
                });
            };

            return res.status(200).json(signpost);
        } catch(e) {
            next();
        };
    };
};