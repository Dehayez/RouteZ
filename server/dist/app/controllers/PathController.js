"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const models_1 = require("../models");
class PathController {
    constructor() {
        this.allPaths = async (req, res, next) => {
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
                const user = await models_1.User.findOne({
                    _id: id
                });
                if (!user) {
                    return res.status(401).json({
                        error: "Deze gebruiker bestaat niet.",
                    });
                }
                ;
                const paths = await models_1.Path.find().sort({ _createdAt: -1 }).exec();
                return res.status(200).json(paths);
            }
            catch (e) {
                next(e);
            }
            ;
        };
        this.addPathToModule = async (req, res, next) => {
            try {
                const { moduleId, pathId } = req.params;
                // Update module
                const foundModule = await models_1.ModuleItem.findOne({ _id: moduleId });
                // Pushing into array
                let array = foundModule._pathIds;
                array.push(pathId);
                const updatedModule = await models_1.ModuleItem.findOneAndUpdate({ _id: moduleId }, {
                    $set: {
                        _pathIds: array,
                        _modifiedAt: Date.now(),
                    },
                }, { new: true }).exec();
                return res.status(200).json(updatedModule);
            }
            catch (e) {
                next(e);
            }
            ;
        };
        this.removePathFromModule = async (req, res, next) => {
            try {
                const { moduleId, pathId } = req.params;
                // Update module
                const foundModule = await models_1.ModuleItem.findOne({ _id: moduleId });
                // Pulling out array
                let array = foundModule._pathIds;
                let index = array.indexOf(pathId);
                array.splice(index, 1);
                const updatedModule = await models_1.ModuleItem.findOneAndUpdate({ _id: moduleId }, {
                    $set: {
                        _pathIds: array,
                        _modifiedAt: Date.now(),
                    },
                }, { new: true }).exec();
                return res.status(200).json(updatedModule);
            }
            catch (e) {
                next(e);
            }
            ;
        };
        this.createPath = async (req, res, next) => {
            try {
                // Get body
                const { title, type, theoryText, videoUrl, exercises } = req.body;
                const newPath = new models_1.Path({
                    title: title,
                    type: type,
                    theoryText: theoryText,
                    videoUrl: videoUrl,
                    _exerciseIds: exercises,
                });
                const path = await newPath.save();
                return res.status(200).json(path);
            }
            catch (e) {
                next(e);
            }
            ;
        };
        this.getPath = async (req, res, next) => {
            try {
                // Get parameter
                const { pathId } = req.params;
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
                // Find path
                const path = await models_1.Path.findById({ _id: pathId }).populate('exercises').exec();
                if (!path) {
                    return res.status(404).json({
                        error: "Dit pad bestaat niet.",
                    });
                }
                ;
                return res.status(200).json(path);
            }
            catch (e) {
                next();
            }
            ;
        };
    }
}
exports.default = PathController;
;
//# sourceMappingURL=PathController.js.map