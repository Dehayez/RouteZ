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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Material = exports.materialSchema = void 0;
// Material model
const mongoose_1 = __importStar(require("mongoose"));
const mongoose_paginate_1 = __importDefault(require("mongoose-paginate"));
;
;
const materialSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        unique: false,
    },
    description: {
        type: String,
        required: true,
        unique: false,
    },
    type: {
        type: String,
        required: true,
        enum: ['Presentatie', 'Document', 'Video']
    },
    filename: {
        type: String,
        required: false,
        unique: false,
    },
    file: {
        type: String,
        required: false,
        unique: false,
    },
    target: {
        type: String,
        required: false,
        unique: false,
    },
    videoUrl: {
        type: String,
        unique: false,
        required: false,
    },
    size: {
        type: String,
        unique: false,
        required: false,
    },
    _authorId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    _tagIds: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Tag',
            required: false,
        }],
    _moduleId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Module',
        required: true,
    },
    _likeIds: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Likes',
            required: false,
        }],
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
}, {
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
});
exports.materialSchema = materialSchema;
materialSchema.plugin(mongoose_paginate_1.default);
materialSchema.virtual('tags', {
    ref: 'Tag',
    localField: '_tagIds',
    foreignField: '_id',
    justOne: false,
});
materialSchema.virtual('author', {
    ref: 'User',
    localField: '_authorId',
    foreignField: '_id',
    justOne: true,
});
materialSchema.virtual('module', {
    ref: 'Module',
    localField: '_moduleId',
    foreignField: '_id',
    justOne: true,
});
materialSchema.virtual('likes', {
    ref: 'Likes',
    localField: '_likeIds',
    foreignField: '_id',
    justOne: false,
});
const Material = mongoose_1.default.model('Material', materialSchema);
exports.Material = Material;
//# sourceMappingURL=material.model.js.map