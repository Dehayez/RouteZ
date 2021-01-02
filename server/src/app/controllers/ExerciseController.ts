import {
  NextFunction,
  Request,
  Response,
} from 'express';

import {
  default as jwtDecode
} from "jwt-decode";

import { IPath, ModuleItem, Path, User, Exercise, IExercise } from '../models';

export default class PathController {
  public allExercises = async (req: Request, res: Response, next: NextFunction): Promise < Response > => {
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

      const exercises = await Exercise.find().sort({_createdAt: -1}).exec();

      return res.status(200).json(exercises);
    } catch (e) {
      next(e);
    };
  };

  addExerciseToPath = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const { exerciseId, pathId } = req.params;

      // Update path
      const foundPath = await Path.findOne({_id: exerciseId});

      // Pushing into array
      let array = foundPath._exerciseIds;
      array.push(exerciseId);

      const updatedPath = await Path.findOneAndUpdate({_id: pathId}, {
        $set: {
          _exerciseIds: array,
          _modifiedAt: Date.now(),
        },
      }, {new: true}).exec();

      return res.status(200).json(updatedPath);
    } catch (e) {
      next(e);
    };
  };

  createExercise = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
        // Get body
        const { question, multiple, answers } = req.body;

        const newExercise : IExercise = new Exercise({
            question: question,
            multiple: multiple,
            answers: answers,
        });

        const exercise = await newExercise.save();

        return res.status(200).json(exercise);
    } catch(e) {
        next(e);
    };
  };

  getExercise = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
        // Get parameter
        const { exerciseId } = req.params;

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
        
        // Find exercise
        const exercise = await Exercise.findById({_id: exerciseId}).exec();

        if (!exercise) {
            return res.status(404).json({
                error: "Deze oefening bestaat niet.",
            });
        };

        return res.status(200).json(exercise);
    } catch(e) {
        next();
    };
  };
};