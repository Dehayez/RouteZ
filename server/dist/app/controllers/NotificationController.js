"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const jwt_decode_1 = __importDefault(require("jwt-decode"));
class NotificationController {
    constructor() {
        this.getNotifications = async (req, res, next) => {
            try {
                if (!req.headers.authorization) {
                    return res.status(401).json({
                        error: "Deze gebruiker bestaat niet.",
                    });
                }
                ;
                const token = req.headers.authorization.slice(7);
                const payload = Object(jwt_decode_1.default(token));
                const { id } = payload;
                const user = await models_1.User.findOne({ _id: id });
                const notifications = await models_1.Notification.find({ _userId: user._id }).sort({ _createdAt: -1 }).exec();
                return res.status(200).json(notifications);
            }
            catch (error) {
                next(error);
            }
            ;
        };
        this.readNotifications = async (req, res, next) => {
            try {
                if (!req.headers.authorization) {
                    return res.status(401).json({
                        error: "Deze gebruiker bestaat niet.",
                    });
                }
                ;
                const token = req.headers.authorization.slice(7);
                const payload = Object(jwt_decode_1.default(token));
                const { id } = payload;
                const user = await models_1.User.findOne({ _id: id });
                const notifications = await models_1.Notification.updateMany({ _userId: user }, { $set: { seen: true } }).sort({ _createdAt: -1 }).exec();
                return res.status(200).json(notifications);
            }
            catch (error) {
                next(error);
            }
            ;
        };
        this.createNotification = async (req, res, next) => {
            try {
                // Body
                const { text, type, _userId, _signpostId, _materialId, _moduleId } = req.body;
                let notification;
                const users = await models_1.User.find().exec();
                if (type === 'signpost') {
                    for (let i = 0; i < users.length; i++) {
                        const createdNotification = new models_1.Notification({ text, type, _signpostId, _userId: users[i]._id });
                        notification = await createdNotification.save();
                    }
                    ;
                }
                ;
                if (type === 'material') {
                    const createdNotification = new models_1.Notification({ text, type, _materialId, _userId });
                    notification = await createdNotification.save();
                }
                ;
                if (type === 'module') {
                    for (let i = 0; i < users.length; i++) {
                        const createdNotification = new models_1.Notification({ text, type, _moduleId, _userId: users[i]._id });
                        notification = await createdNotification.save();
                    }
                    ;
                }
                ;
                if (type === 'reward') {
                    const createdNotification = new models_1.Notification({ text, type, _signpostId, _userId });
                    notification = await createdNotification.save();
                }
                ;
                return res.status(200).json(notification);
            }
            catch (e) {
                next(e);
            }
            ;
        };
    }
}
exports.default = NotificationController;
;
//# sourceMappingURL=NotificationController.js.map