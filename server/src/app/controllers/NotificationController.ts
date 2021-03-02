import {
  Request,
  Response,
  NextFunction,
} from 'express';

import { 
  User,
  Notification
} from '../models';

import {
  default as jwtDecode
} from "jwt-decode";

export default class NotificationController {
  getNotifications = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      if (!req.headers.authorization) {
        return res.status(401).json({
            error: "Deze gebruiker bestaat niet.",
        });
      };

      const token = req.headers.authorization.slice(7);
      const payload = Object(jwtDecode(token));

      const { id } = payload;

      const user = await User.findOne({ _id: id });

      const notifications = await Notification.find({_userId: user._id}).sort({_createdAt: -1}).exec();

      return res.status(200).json(notifications);
    } catch (error) {
      next(error);
    };
  };

  readNotifications = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      if (!req.headers.authorization) {
        return res.status(401).json({
            error: "Deze gebruiker bestaat niet.",
        });
      };

      const token = req.headers.authorization.slice(7);
      const payload = Object(jwtDecode(token));

      const { id } = payload;
      
      const user = await User.findOne({ _id: id });

      const notifications = await Notification.updateMany({_userId: user}, {$set: {seen: true}}).sort({_createdAt: -1}).exec();

      return res.status(200).json(notifications);
    } catch (error) {
      next(error);
    };
  };

  createNotification = async (req: Request, res: Response, next: NextFunction):Promise<Response> => {
    try {
      // Body
      const { text, type, _userId, _signpostId, _materialId, _moduleId } = req.body;

      let notification;
      const users = await User.find().exec();

      if (type === 'signpost') {
        for (let i = 0; i < users.length; i++) {
          const createdNotification = new Notification({text, type, _signpostId, _userId: users[i]._id});
          notification = await createdNotification.save();
        };
      };

      if (type === 'material') {
        const createdNotification = new Notification({text, type, _materialId, _userId});
        notification = await createdNotification.save();
      };

      if (type === 'module') {        
        for (let i = 0; i < users.length; i++) {
          const createdNotification = new Notification({text, type, _moduleId, _userId: users[i]._id});
          notification = await createdNotification.save();
        };
      };

      if (type === 'reward') {
        const createdNotification = new Notification({text, type, _signpostId, _userId});
        notification = await createdNotification.save();
      };

      return res.status(200).json(notification);
    } catch (e) {
      next(e);
    };
  };
};
