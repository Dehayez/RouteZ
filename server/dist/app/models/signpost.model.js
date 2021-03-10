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
exports.signPost = exports.SignPost = void 0;
// Signpost model
const mongoose_1 = __importStar(require("mongoose"));
const mongoose_paginate_1 = __importDefault(require("mongoose-paginate"));
;
;
const signPost = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    shortedTitle: {
        type: String,
        required: true,
        unique: true,
    },
    text: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        unique: true,
        required: true,
    },
    illustration: {
        type: String,
        unique: false,
        required: true,
    },
    _moduleIds: [
        {
            type: mongoose_1.Schema.Types.ObjectId, ref: 'Module', required: false,
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
}, {
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
});
exports.signPost = signPost;
signPost.plugin(mongoose_paginate_1.default);
signPost.virtual('modules', {
    ref: 'Module',
    localField: '_moduleIds',
    foreignField: '_id',
    justOne: false,
});
const SignPost = mongoose_1.default.model('Signpost', signPost);
exports.SignPost = SignPost;
//# sourceMappingURL=signpost.model.js.map