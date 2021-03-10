"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const services_1 = require("../services");
const models_1 = require("../models");
class FileController {
    constructor() {
        // Getting all materials
        this.allMaterials = async (req, res, next) => {
            try {
                const { limit } = req.query;
                let materials;
                if (limit) {
                    materials = await models_1.Material.find().sort({ _likeIds: -1 }).populate('author').limit(Number(limit)).exec();
                }
                else {
                    materials = await models_1.Material.find().sort({ _likeIds: -1 }).populate('author').exec();
                }
                ;
                return res.status(200).json(materials);
            }
            catch (e) {
                next(e);
            }
            ;
        };
        // Get users materials
        this.myMaterials = async (req, res, next) => {
            try {
                const { userId } = req.params;
                const materials = await models_1.Material.find({ _authorId: userId }).populate('author').sort({ _likeIds: -1 }).exec();
                if (!materials)
                    return res.status(404).json({
                        error: "Nog geen bestanden upgeload",
                    });
                return res.status(200).json(materials);
            }
            catch (e) {
                next(e);
            }
            ;
        };
        // Getting image
        this.showImage = (req, res, next) => {
            services_1.Files.pipeImage(req, res);
        };
        // Getting file
        this.showFile = (req, res, next) => {
            services_1.Files.pipeFile(req, res);
        };
        this.showSvg = (req, res, next) => {
            services_1.Files.pipeSvg(req, res);
        };
        // Uploading file
        this.upload = async (req, res, next) => {
            try {
                if (req.file) {
                    res.status(200).send({
                        filename: req.file.filename,
                    });
                }
                else {
                    return res.status(412).json({
                        error: 'Geen bestand verzonden',
                    });
                }
            }
            catch (e) {
                if (e.code) {
                    return res.status(e.code).send(e.msg);
                }
                ;
                return res.status(500).send({
                    code: 500,
                    msg: 'unknown error occured'
                });
            }
            ;
        };
        this.getMaterial = async (req, res, next) => {
            try {
                const { id } = req.params;
                const material = await models_1.Material.findOne({ _id: id }).populate('author').populate('tags').populate('like').exec();
                if (!material)
                    return res.status(404).json({
                        error: "Dit bestand kon niet worden terugvonden",
                    });
                return res.status(200).json(material);
            }
            catch (e) {
                next(e);
            }
            ;
        };
        this.showMaterial = async (req, res, next) => {
            try {
                const { keywords, startdate, enddate, type, modules, tags, target } = req.body;
                // Filled in input
                const allMaterials = await models_1.Material.find().populate('author').populate('module').sort({ _likeIds: -1 }).exec();
                let eligibleMaterials = [];
                allMaterials.forEach(async (element) => {
                    let goOrNo = false;
                    let relevanceKeywords = 0;
                    if (keywords) {
                        const allKeywords = keywords.toLowerCase().split(/,| /);
                        // Check if keywords are in title
                        allKeywords.forEach((innerElement) => {
                            element.title.toLowerCase().split(/,| /).forEach((word) => {
                                if (word.includes(innerElement)) {
                                    goOrNo = true;
                                    relevanceKeywords += 1;
                                }
                                ;
                            });
                        });
                        // Check if keywords are in description
                        allKeywords.forEach((innerElement) => {
                            element.description.toLowerCase().split(/,| /).forEach((word) => {
                                if (word.includes(innerElement)) {
                                    goOrNo = true;
                                    relevanceKeywords += 1;
                                }
                                ;
                            });
                        });
                    }
                    ;
                    // Check if its this module
                    if (modules) {
                        for (let i = 0; i < modules.length; i++) {
                            if (String(element._moduleId) === String(modules[i])) {
                                goOrNo = true;
                            }
                            ;
                        }
                        ;
                    }
                    ;
                    // Check if its this target audience
                    if (target) {
                        for (let i = 0; i < target.length; i++) {
                            if (String(element.target) === String(target[i])) {
                                goOrNo = true;
                            }
                            ;
                        }
                        ;
                    }
                    ;
                    if (tags) {
                        for (let i = 0; i < tags.length; i++) {
                            if (String(element._tagIds) === String(tags[i])) {
                                goOrNo = true;
                            }
                            ;
                        }
                        ;
                    }
                    ;
                    // Check if between dates
                    if (startdate && enddate) {
                        const dateFrom = new Date(startdate).toISOString();
                        const dateTo = new Date(enddate).toISOString();
                        const from = moment_1.default(dateFrom).locale('be').format('MM/DD/YYYY');
                        const untill = moment_1.default(element._createdAt).locale('be').format('MM/DD/YYYY');
                        const to = moment_1.default(dateTo).locale('be').format('MM/DD/YYYY');
                        let f = from.split('/');
                        let u = untill.split('/');
                        let t = to.split('/');
                        let strippedFrom = new Date(parseInt(f[2]), parseInt(f[1]) - 1, parseInt(f[0]));
                        let strippedUntill = new Date(parseInt(u[2]), parseInt(u[1]) - 1, parseInt(u[0]));
                        let strippedTo = new Date(parseInt(t[2]), parseInt(t[1]) - 1, parseInt(t[0]));
                        const checkIfBetween = strippedUntill > strippedFrom && strippedUntill < strippedTo;
                        if (!checkIfBetween) {
                            goOrNo = false;
                        }
                        ;
                    }
                    ;
                    // Check if asked type
                    if (type) {
                        let checkIfType = false;
                        for (let i = 0; i < type.length; i++) {
                            let check = element.type === type[i];
                            if (check)
                                checkIfType = true;
                        }
                        ;
                        if (checkIfType)
                            goOrNo = true;
                    }
                    ;
                    if (goOrNo) {
                        eligibleMaterials.push({
                            "material": element,
                            "relevance": relevanceKeywords,
                        });
                    }
                    ;
                });
                const sortedMaterials = eligibleMaterials.sort((a, b) => Number(b.relevance) - Number(a.relevance));
                if (sortedMaterials.length === 0) {
                    return res.status(404).json({
                        error: "Er zijn geen resultaten gevonden.",
                    });
                }
                ;
                return res.status(200).json(sortedMaterials);
            }
            catch (e) {
                next(e);
            }
            ;
        };
        this.createMaterial = async (req, res, next) => {
            try {
                const { title, description, type, filename, file, videoUrl, size, _authorId, _moduleId, target, _tagIds } = req.body;
                let newMaterial;
                if (type === 'Presentatie') {
                    newMaterial = new models_1.Material({
                        title: title,
                        description: description,
                        type: type,
                        filename: filename,
                        file: file,
                        size: size,
                        target: target,
                        _authorId: _authorId,
                        _moduleId: _moduleId,
                        _tagIds: _tagIds
                    });
                }
                ;
                if (type === 'Document') {
                    newMaterial = new models_1.Material({
                        title: title,
                        description: description,
                        type: type,
                        filename: filename,
                        file: file,
                        size: size,
                        target: target,
                        _authorId: _authorId,
                        _moduleId: _moduleId,
                        _tagIds: _tagIds
                    });
                }
                ;
                if (type === 'Video' && videoUrl) {
                    newMaterial = new models_1.Material({
                        title: title,
                        description: description,
                        type: type,
                        videoUrl: videoUrl,
                        target: target,
                        _authorId: _authorId,
                        _moduleId: _moduleId,
                        _tagIds: _tagIds
                    });
                }
                ;
                const material = await newMaterial.save();
                if (!material) {
                    return res.status(400).json({
                        error: "Het bestand kon niet upgeload worden",
                    });
                }
                ;
                const updateModule = await models_1.ModuleItem.findOneAndUpdate({ _id: _moduleId }, {
                    $push: {
                        _materialIds: material._id,
                    },
                });
                if (!updateModule) {
                    return res.status(400).json({
                        error: "Het bestand kon niet upgeload worden",
                    });
                }
                ;
                return res.status(200).json(material);
            }
            catch (e) {
                next(e);
            }
            ;
        };
        this.likeMaterial = async (req, res, next) => {
            try {
                const { userId, materialId } = req.body;
                const user = await models_1.User.findById(userId);
                if (!user)
                    return res.status(404).json({
                        error: "Deze gebruiker bestaat niet",
                    });
                const updateMaterial = await models_1.Material.findByIdAndUpdate(materialId, {
                    $push: {
                        _likeIds: userId,
                    },
                });
                if (!updateMaterial)
                    return res.status(400).json({
                        error: "Like kon niet worden toegevoegd",
                    });
                return res.status(200).json(updateMaterial);
            }
            catch (e) {
                next(e);
            }
            ;
        };
        this.dislikeMaterial = async (req, res, next) => {
            try {
                const { userId, materialId } = req.body;
                const user = await models_1.User.findById(userId);
                if (!user)
                    return res.status(404).json({
                        error: "Deze gebruiker bestaat niet",
                    });
                const updateMaterial = await models_1.Material.findByIdAndUpdate(materialId, {
                    $pull: {
                        _likeIds: userId,
                    },
                });
                if (!updateMaterial)
                    return res.status(400).json({
                        error: "Like kon niet worden toegevoegd",
                    });
                return res.status(200).json(updateMaterial);
            }
            catch (e) {
                next(e);
            }
            ;
        };
        this.editMaterial = async (req, res, next) => {
            try {
                const { materialId } = req.params;
                const { title, description, _moduleId, type, filename, file, size, videoUrl, _tagIds, target } = req.body;
                let material;
                if (type === 'Video') {
                    material = await models_1.Material.findOneAndUpdate({ _id: materialId }, {
                        $set: {
                            title: title,
                            description: description,
                            _moduleId: _moduleId,
                            type: type,
                            videoUrl: videoUrl,
                            _tagIds: _tagIds,
                            target: target,
                            _modifiedAt: Date.now(),
                        },
                    });
                }
                else {
                    material = await models_1.Material.findOneAndUpdate({ _id: materialId }, {
                        $set: {
                            title: title,
                            description: description,
                            _moduleId: _moduleId,
                            filename: filename,
                            type: type,
                            file: file,
                            size: size,
                            target: target,
                            _tagIds: _tagIds,
                            _modifiedAt: Date.now(),
                        },
                    });
                }
                ;
                if (!material)
                    return res.status(404).json({
                        error: "Dit bestand bestaat niet",
                    });
                return res.status(200).json(material);
            }
            catch (e) {
                next(e);
            }
            ;
        };
        this.deleteMaterial = async (req, res, next) => {
            try {
                const { id } = req.params;
                const material = await models_1.Material.findOne({ _id: id });
                if (!material) {
                    return res.status(404).json({
                        error: "Dit bestand bestaat niet",
                    });
                }
                ;
                const deleted = await models_1.Material.findOneAndDelete({ _id: id });
                return res.status(200).json(deleted);
            }
            catch (e) {
                next(e);
            }
            ;
        };
    }
}
exports.default = FileController;
;
//# sourceMappingURL=FileController.js.map