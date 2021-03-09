"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
class TagController {
    constructor() {
        this.allTags = async (req, res, next) => {
            try {
                const tags = await models_1.Tag.find().exec();
                return res.status(200).json(tags);
            }
            catch (e) {
                next();
            }
            ;
        };
        this.getTag = async (req, res, next) => {
            try {
                const { id } = req.params;
                const tag = await models_1.Tag.findOne({ _id: id });
                if (!tag) {
                    return res.status(404).json({
                        error: "Deze tag bestaat niet",
                    });
                }
                ;
                return res.status(200).json(tag);
            }
            catch (e) {
                next();
            }
            ;
        };
        this.createTag = async (req, res, next) => {
            try {
                const { name } = req.body;
                const newTag = new models_1.Tag({
                    name: name,
                });
                const tag = await newTag.save();
                if (!tag) {
                    return res.status(400).json({
                        error: 'Tag kon niet gemaakt worden',
                    });
                }
                ;
                return res.status(200).json(tag);
            }
            catch (e) {
                next();
            }
            ;
        };
    }
}
exports.default = TagController;
;
//# sourceMappingURL=TagController.js.map