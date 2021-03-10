import {
    NextFunction,
    Request,
    Response,
} from 'express';

import {
    default as jwtDecode
} from "jwt-decode";

import {
    ISignpost,
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
                // signposts = await SignPost.paginate({}, {
                //     limit: Number(limit),
                //     page: Number(skip),
                //     sort: {
                //         _createdAt: -1,
                //     },
                // });
            } else {
                signposts = await SignPost.find().sort({_createdAt: -1}).populate('modules').exec();
            };

            return res.status(200).json(signposts);
        } catch (e) {
            next(e);
        };
    };

    addModuleToSignpost = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const { moduleId, signpostId } = req.params;

            // Updating the signpost
            const foundSignpost = await SignPost.findOne({ _id: signpostId });

            // Pushing module into array
            let array = foundSignpost._moduleIds;
            array.push(moduleId);
            
            const updatedSignpost = await SignPost.findOneAndUpdate({ _id: signpostId }, {
                $set: {
                    _moduleIds: array,
                    _modifiedAt: Date.now(),
                },
            }, { new : true }).exec();

            return res.status(200).json(updatedSignpost);
        } catch (e) {
            next(e);
        };
    };

    removeModuleFromSignpost = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const { moduleId, signpostId } = req.params;

            // Updating the signpost
            const foundSignpost = await SignPost.findOne({ _id: signpostId });

            // Pushing module into array
            let array = foundSignpost._moduleIds;
            const index = array.indexOf(moduleId);
            array.splice(index, 1);
            
            const updatedSignpost = await SignPost.findOneAndUpdate({ _id: signpostId }, {
                $set: {
                    _moduleIds: array,
                    _modifiedAt: Date.now(),
                },
            }, { new : true }).exec();

            return res.status(200).json(updatedSignpost);
        } catch (e) {
            next(e);
        };
    };

    createSignpost = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            // Get body
            const { title, shortedTitle, text, illustration, icon, _moduleIds } = req.body;

            const newSignpost: ISignpost = new SignPost({
                title: title,
                shortedTitle: shortedTitle,
                text: text,
                illustration: illustration,
                icon: icon,
                _moduleIds: _moduleIds,
            });

            const signpost = await newSignpost.save();

            return res.status(200).json(signpost);
        } catch(e) {
            next(e);
        };
    };

    editSignpost = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            // Get body
            const { title, shortedTitle, text, illustration, icon, _moduleIds } = req.body;
            const { signpostId } = req.params;

            const signpost = await SignPost.findByIdAndUpdate(signpostId, {
                $set: {
                    text: text,
                    title: title,
                    shortedTitle: shortedTitle,
                    icon: icon,
                    illustration: illustration,
                    _moduleIds: _moduleIds,
                },
            });

            return res.status(200).json(signpost);
        } catch(e) {
            next(e);
        };
    };

    deleteSignpost = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const { id } = req.params;

            const deletedSignpost = await SignPost.findByIdAndDelete(id);

            if (!deletedSignpost) return res.status(400).json({
                error: "Deze module kon niet verwijderd worden",
            });

            return res.status(200).json(deletedSignpost);
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
            const signpost = await SignPost.findById({_id: signpostId}).populate('modules').exec();

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