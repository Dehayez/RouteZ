"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const models_1 = require("../models");
class PathController {
    constructor() {
        this.allExercises = async (req, res, next) => {
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
                const exercises = await models_1.Exercise.find().sort({ _createdAt: -1 }).exec();
                return res.status(200).json(exercises);
            }
            catch (e) {
                next(e);
            }
            ;
        };
        this.addExerciseToPath = async (req, res, next) => {
            try {
                const { exerciseId, pathId } = req.params;
                // Update path
                const foundPath = await models_1.Path.findOne({ _id: pathId });
                // Pushing into array
                let array = foundPath._exerciseIds;
                array.push(exerciseId);
                const updatedPath = await models_1.Path.findOneAndUpdate({ _id: pathId }, {
                    $set: {
                        _exerciseIds: array,
                        _modifiedAt: Date.now(),
                    },
                }, { new: true }).exec();
                return res.status(200).json(updatedPath);
            }
            catch (e) {
                next(e);
            }
            ;
        };
        this.createExercise = async (req, res, next) => {
            try {
                // Get body
                const { question, multiple, answers, open } = req.body;
                const newExercise = new models_1.Exercise({
                    question: question,
                    multiple: multiple,
                    open: open,
                    answers: answers,
                });
                const exercise = await newExercise.save();
                return res.status(200).json(exercise);
            }
            catch (e) {
                next(e);
            }
            ;
        };
        this.getExercise = async (req, res, next) => {
            try {
                // Get parameter
                const { exerciseId } = req.params;
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
                // Find exercise
                const exercise = await models_1.Exercise.findById({ _id: exerciseId }).exec();
                if (!exercise) {
                    return res.status(404).json({
                        error: "Deze oefening bestaat niet.",
                    });
                }
                ;
                return res.status(200).json(exercise);
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
//# sourceMappingURL=ExerciseController.js.map