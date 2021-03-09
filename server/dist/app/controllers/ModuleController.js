"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const models_1 = require("../models");
class ModuleController {
    constructor() {
        this.allModules = async (req, res, next) => {
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
                let modules;
                if (limit && skip) {
                    // modules = await ModuleItem.find().paginate({}, {
                    //     limit: Number(limit),
                    //     page: Number(skip),
                    //     sort: {
                    //         _createdAt: -1,
                    //     },
                    // });
                }
                else {
                    modules = await models_1.ModuleItem.find().populate({ path: '_pathIds' }).sort({ _createdAt: -1 }).exec();
                }
                ;
                return res.status(200).json(modules);
            }
            catch (e) {
                next(e);
            }
            ;
        };
        this.createModule = async (req, res, next) => {
            try {
                const { title, content } = req.body;
                const newModule = new models_1.ModuleItem({
                    title: title,
                    content: content,
                });
                const savedModule = await newModule.save();
                return res.status(200).json(savedModule);
            }
            catch (e) {
                next(e);
            }
            ;
        };
        this.editModule = async (req, res, next) => {
            try {
                const { title, content, paths } = req.body;
                const { id } = req.params;
                const result = await models_1.ModuleItem.findByIdAndUpdate(id, {
                    $set: {
                        title: title,
                        content: content,
                        _pathIds: paths,
                    }
                }).exec();
                return res.status(200).json(result);
            }
            catch (e) {
                next(e);
            }
            ;
        };
        this.getModule = async (req, res, next) => {
            try {
                // Get parameter
                const { moduleId } = req.params;
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
                const moduleItem = await models_1.ModuleItem.findOne({ _id: moduleId }).populate({ path: 'materials', populate: { path: 'author' } }).populate('paths').exec();
                if (!moduleItem) {
                    return res.status(404).json({
                        error: "Deze module bestaat niet.",
                    });
                }
                ;
                return res.status(200).json(moduleItem);
            }
            catch (e) {
                next();
            }
            ;
        };
    }
}
exports.default = ModuleController;
;
//# sourceMappingURL=ModuleController.js.map