"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exerciseSchema = exports.Exercise = void 0;
// Exercise
const mongoose_1 = __importStar(require("mongoose"));
;
const exerciseSchema = new mongoose_1.Schema({
    question: {
        type: String,
        required: true,
        unique: false,
    },
    multiple: {
        type: Boolean,
        unique: false,
        required: true,
    },
    open: {
        type: Boolean,
        unique: false,
        required: false,
    },
    answers: [
        {
            text: {
                type: String,
                unique: false,
                required: false,
            },
            correct: {
                type: Boolean,
                unique: false,
                required: false,
            },
        },
    ],
    _createdAt: {
        type: Number,
        required: true,
        default: Date.now(),
    },
    _modifiedAt: {
        type: Number,
        required: false,
        default: null,
    },
    _deletedAt: {
        type: Number,
        required: false,
        default: null,
    },
});
exports.exerciseSchema = exerciseSchema;
const Exercise = mongoose_1.default.model('Exercise', exerciseSchema);
exports.Exercise = Exercise;
//# sourceMappingURL=exercise.model.js.map