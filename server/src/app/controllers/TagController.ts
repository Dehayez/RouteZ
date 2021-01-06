import {
  NextFunction,
  Request,
  Response,
} from "express";

import { 
  ITag,
  Tag 
} from "../models";

export default class TagController {
  public allTags = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const tags = await Tag.find().exec();

      return res.status(200).json(tags);
    } catch (e) {
      next();
    };
  };

  getTag = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const { id } = req.params;

      const tag = await Tag.findOne({_id: id});

      if (!tag) {
        return res.status(404).json({
          error: "Deze tag bestaat niet",
        });
      };

      return res.status(200).json(tag);
    } catch (e) {
      next();
    };
  };

  createTag = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const { name } = req.body;

      const newTag : ITag = new Tag({
        name: name,
      });

      const tag = await newTag.save();

      if (!tag) {
        return res.status(400).json({
          error: 'Tag kon niet gemaakt worden',
        });
      };

      return res.status(200).json(tag);
    } catch(e) {
      next();
    };
  };
};
