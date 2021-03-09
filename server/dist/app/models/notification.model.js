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
exports.Notification = exports.notificationSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
;
const notificationSchema = new mongoose_1.Schema({
    text: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['signpost', 'module', 'material', 'reward'],
    },
    _createdAt: {
        type: Number,
        default: Date.now(),
    },
    seen: {
        type: Boolean,
        default: false,
    },
    _signpostId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Signpost',
        required: false,
    },
    _moduleId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Module',
        required: false,
    },
    _materialId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Material',
        required: false,
    },
    _userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
}, {
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
});
exports.notificationSchema = notificationSchema;
const Notification = mongoose_1.default.model('Notification', notificationSchema);
exports.Notification = Notification;
//# sourceMappingURL=notification.model.js.map