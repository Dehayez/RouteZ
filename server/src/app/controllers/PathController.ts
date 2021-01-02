import {
  NextFunction,
  Request,
  Response,
} from 'express';

import {
  default as jwtDecode
} from "jwt-decode";

import { IModule, IPath, ModuleItem, Path, User } from '../models';

export default class PathController {
  public allPaths = async (req: Request, res: Response, next: NextFunction): Promise < Response > => {
    try {
      // Get bearer token
      if (!req.headers.authorization) {
        return res.status(401).json({
          error: "Deze gebruiker bestaat niet.",
        });
      };

      const token = req.headers.authorization.slice(7);
      const payload = Object(jwtDecode(token));

      const {
        id
      } = payload;

      // Check if user exists
      const user = await User.findOne({
        _id: id
      });

      if (!user) {
        return res.status(401).json({
          error: "Deze gebruiker bestaat niet.",
        });
      };

      const paths = await Path.find().sort({_createdAt: -1}).exec();

      return res.status(200).json(paths);
    } catch (e) {
      next(e);
    };
  };

  addPathToModule = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const { moduleId, pathId } = req.params;

      // Update module
      const foundModule = await ModuleItem.findOne({_id: moduleId});

      // Pushing into array
      let array = foundModule._pathIds;
      array.push(pathId);

      const updatedModule = await ModuleItem.findOneAndUpdate({_id: moduleId}, {
        $set: {
          _pathIds: array,
          _modifiedAt: Date.now(),
        },
      }, {new: true}).exec();

      return res.status(200).json(updatedModule);
    } catch (e) {
      next(e);
    };
  };

  createPath = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
        // Get body
        const { title, type, theoryText, videoUrl, exercises } = req.body;

        const newPath : IPath = new Path({
            title: title,
            type: type,
            theoryText: theoryText,
            videoUrl: videoUrl,
            _exerciseIds: exercises,
        });

        const path = await newPath.save();

        return res.status(200).json(path);
    } catch(e) {
        next(e);
    };
  };

  getPath = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
        // Get parameter
        const { pathId } = req.params;

        // Get bearer token
        if (!req.headers.authorization) {
            return res.status(401).json({
                error: "Deze gebruiker bestaat niet.",
            });
        };
        
        const token = req.headers.authorization.slice(7);
        const payload = Object(jwtDecode(token));

        const { id } = payload;

        // Check if user exists
        const user = await User.findOne({_id: id});

        if (!user) {
            return res.status(401).json({
                error: "Deze gebruiker bestaat niet.",
            });
        };
        
        // Find path
        const path = await Path.findById({_id: pathId}).populate('exercises').exec();

        if (!path) {
            return res.status(404).json({
                error: "Dit pad bestaat niet.",
            });
        };

        return res.status(200).json(path);
    } catch(e) {
        next();
    };
  };
};