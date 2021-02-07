import {
  Request,
  Response,
  NextFunction
} from "express";

import { Material, SignPost } from "../models";

export default class SearchController {
  searchItems = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
      const { keywords } = req.body;
      const arrayOfKeywords = keywords.split(' ,');

      let arrayOfResults = [];
      let countedResults = 0;

      for (let i = 0; i < arrayOfKeywords.length; i++) {
        // Check signposts and modules
        const signPosts = await SignPost.find().populate('modules').exec();
        const materials = await Material.find().exec();

        for (let j = 0; j < signPosts.length; j++) {
          // First off, signposts
          if (signPosts[j].title.toLowerCase().includes(arrayOfKeywords[i])) {
            const object = {_id: signPosts[j]._id, title: signPosts[j].shortedTitle, tag: `Wegwijzer ${j+1}`, bottomText: signPosts[j].title, path: `/signpost/${signPosts[j]._id}`};
            arrayOfResults.push(object);
            countedResults += 1;
          };

          // Next up, modules
          for (let k = 0; k < signPosts[j].modules.length; k++) {
            if (signPosts[j].modules[k].title.toLowerCase().includes(arrayOfKeywords[i])) {
              const object = {_id: signPosts[j].modules[k]._id, title: signPosts[j].modules[k].title, tag: `Module ${k+1}`, bottomText: signPosts[j].title, path: `/module/${signPosts[j].modules[k]._id}`};
              arrayOfResults.push(object);
              countedResults += 1;
            };
          };
        };

        // Last, materials
        for (let j = 0; j < materials.length; j++) {
          if (materials[j].description.toLowerCase().includes(arrayOfKeywords[i]) || materials[j].title.toLowerCase().includes(arrayOfKeywords[i]) || materials[j].filename.toLowerCase().includes(arrayOfKeywords[i])) {
            const object = {_id: materials[j]._id, title: materials[j].title, tag: `Materiaal`, bottomText: `Het woord ${arrayOfKeywords[i]} zit hierin verwerkt`, path: `/material/${materials[j]._id}`};
            arrayOfResults.push(object);
            countedResults += 1;
          };
        };
      };

      const result = {
        results: arrayOfResults,
        count: countedResults,
      };

      return res.status(200).json(result);
    } catch (e) {
      next(e);
    };
  };
};
