"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const models_1 = require("../models");
class SignpostController {
    constructor() {
        this.allSignposts = async (req, res, next) => {
            try {
                // Get bearer token
                if (!req.headers.authorization) {
                    return res.status(401).json({
                        error: "Deze gebruiker bestaat niet.",
                    });
                }
                ;
                const token = req.headers.authorization.slice(7);
                const payload = Object(jwt_decode_1.default(token));
                const { id } = payload;
                // Check if user exists
                const user = await models_1.User.findOne({ _id: id });
                if (!user) {
                    return res.status(401).json({
                        error: "Deze gebruiker bestaat niet.",
                    });
                }
                ;
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
                }
                else {
                    signposts = await models_1.SignPost.find().sort({ _createdAt: -1 }).populate('modules').exec();
                }
                ;
                return res.status(200).json(signposts);
            }
            catch (e) {
                next(e);
            }
            ;
        };
        this.addModuleToSignpost = async (req, res, next) => {
            try {
                const { moduleId, signpostId } = req.params;
                // Updating the signpost
                const foundSignpost = await models_1.SignPost.findOne({ _id: signpostId });
                // Pushing module into array
                let array = foundSignpost._moduleIds;
                array.push(moduleId);
                const updatedSignpost = await models_1.SignPost.findOneAndUpdate({ _id: signpostId }, {
                    $set: {
                        _moduleIds: array,
                        _modifiedAt: Date.now(),
                    },
                }, { new: true }).exec();
                return res.status(200).json(updatedSignpost);
            }
            catch (e) {
                next(e);
            }
            ;
        };
        this.removeModuleFromSignpost = async (req, res, next) => {
            try {
                const { moduleId, signpostId } = req.params;
                // Updating the signpost
                const foundSignpost = await models_1.SignPost.findOne({ _id: signpostId });
                // Pushing module into array
                let array = foundSignpost._moduleIds;
                const index = array.indexOf(moduleId);
                array.splice(index, 1);
                const updatedSignpost = await models_1.SignPost.findOneAndUpdate({ _id: signpostId }, {
                    $set: {
                        _moduleIds: array,
                        _modifiedAt: Date.now(),
                    },
                }, { new: true }).exec();
                return res.status(200).json(updatedSignpost);
            }
            catch (e) {
                next(e);
            }
            ;
        };
        this.createSignpost = async (req, res, next) => {
            try {
                // Get body
                const { title, shortedTitle, text, illustration, icon, _moduleIds } = req.body;
                const newSignpost = new models_1.SignPost({
                    title: title,
                    shortedTitle: shortedTitle,
                    text: text,
                    illustration: illustration,
                    icon: icon,
                    _moduleIds: _moduleIds,
                });
                const signpost = await newSignpost.save();
                return res.status(200).json(signpost);
            }
            catch (e) {
                next(e);
            }
            ;
        };
        this.editSignpost = async (req, res, next) => {
            try {
                // Get body
                const { title, shortedTitle, text, illustration, icon, _moduleIds } = req.body;
                const { signpostId } = req.params;
                const signpost = await models_1.SignPost.findByIdAndUpdate(signpostId, {
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
            }
            catch (e) {
                next(e);
            }
            ;
        };
        this.deleteSignpost = async (req, res, next) => {
            try {
                const { id } = req.params;
                const deletedSignpost = await models_1.SignPost.findByIdAndDelete(id);
                if (!deletedSignpost)
                    return res.status(400).json({
                        error: "Deze module kon niet verwijderd worden",
                    });
                return res.status(200).json(deletedSignpost);
            }
            catch (e) {
                next(e);
            }
            ;
        };
        this.getSignpost = async (req, res, next) => {
            try {
                // Get parameter
                const { signpostId } = req.params;
                // Get bearer token
                if (!req.headers.authorization) {
                    return res.status(401).json({
                        error: "Deze gebruiker bestaat niet.",
                    });
                }
                ;
                const token = req.headers.authorization.slice(7);
                const payload = Object(jwt_decode_1.default(token));
                const { id } = payload;
                // Check if user exists
                const user = await models_1.User.findOne({ _id: id });
                if (!user) {
                    return res.status(401).json({
                        error: "Deze gebruiker bestaat niet.",
                    });
                }
                ;
                // Find module
                const signpost = await models_1.SignPost.findById({ _id: signpostId }).populate('modules').exec();
                if (!signpost) {
                    return res.status(404).json({
                        error: "Deze wegwijzer bestaat niet.",
                    });
                }
                ;
                return res.status(200).json(signpost);
            }
            catch (e) {
                next();
            }
            ;
        };
    }
}
exports.default = SignpostController;
;
//# sourceMappingURL=SignpostController.js.map