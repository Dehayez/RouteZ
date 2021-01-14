import {
    NextFunction,
    Request,
    Response,
} from 'express';

import {
    default as moment,
} from 'moment';

import { 
    Files,
} from '../services';

import {
    Material,
    IMaterial,
    ModuleItem,
    User,
} from "../models";

export default class FileController {
    // Getting all materials
    allMaterials = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const { limit } = req.query;

            let materials;
            
            if (limit) {
                materials = await Material.find().sort({_likeIds: -1}).populate('author').limit(Number(limit)).exec();
            } else {
                materials = await Material.find().sort({_likeIds: -1}).populate('author').exec();
            };

            return res.status(200).json(materials);
        } catch (e) {
            next(e);
        };
    };

    // Getting image
    showImage = (req: Request, res: Response, next: NextFunction): void => {
        Files.pipeImage(req, res);
    };

    // Getting file
    showFile = (req: Request, res: Response, next: NextFunction): void => {
        Files.pipeFile(req, res);
    };

    // Uploading file
    upload = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            if (req.file) {
                res.status(200).send({
                    filename: req.file.filename,
                });
            } else {
                return res.status(412).json({
                    error: 'Geen bestand verzonden',
                });
            }
        } catch (e) {
            if (e.code) {
                return res.status(e.code).send(e.msg);
            };

            return res.status(500).send({
                code:500, 
                msg: 'unknown error occured'
            });
        };
    };

    showMaterial = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const { keywords, startdate, enddate, type } = req.body;

            // Filled in input
            const allKeywords = keywords.toLowerCase().split(/,| /);

            const allMaterials = await Material.find().exec();
            let eligibleMaterials: { material: IMaterial; relevance: number; }[] = [];

            allMaterials.forEach(element => {
                let goOrNo = false;
                let relevanceKeywords = 0;

                // Check if keywords are in title
                allKeywords.forEach((innerElement: string) => {
                    element.title.toLowerCase().split(/,| /).forEach((word) => {
                        if (word.includes(innerElement)) {
                            goOrNo = true;
                            relevanceKeywords += 1;
                        };
                    });  
                });

                // Check if keywords are in description
                allKeywords.forEach((innerElement: string) => {
                    element.description.toLowerCase().split(/,| /).forEach((word) => {
                        if (word.includes(innerElement)) {
                            goOrNo = true;
                            relevanceKeywords += 1;
                        };
                    });  
                });

                // Check if between dates
                if (startdate && enddate) {
                    const dateFrom = new Date(startdate).toISOString();
                    const dateTo = new Date(enddate).toISOString();

                    const from = moment(dateFrom).locale('be').format('MM/DD/YYYY');
                    const untill = moment(element._createdAt).locale('be').format('MM/DD/YYYY');
                    const to = moment(dateTo).locale('be').format('MM/DD/YYYY');

                    let f = from.split('/');
                    let u = untill.split('/');
                    let t = to.split('/');

                    let strippedFrom = new Date(parseInt(f[2]), parseInt(f[1])-1, parseInt(f[0]));
                    let strippedUntill = new Date(parseInt(u[2]), parseInt(u[1])-1, parseInt(u[0]));
                    let strippedTo = new Date(parseInt(t[2]), parseInt(t[1])-1, parseInt(t[0]));

                    const checkIfBetween = strippedUntill > strippedFrom && strippedUntill < strippedTo;

                    if (!checkIfBetween) {
                        goOrNo = false;
                    };
                };

                // Check if asked type
                if (type) {
                    let checkIfType = false;

                    for (let i = 0; i < type; i++) {
                        let check = element.type === type[i];
                        if (check) checkIfType = true;
                    };

                    if (!checkIfType) goOrNo = false;
                };

                if (goOrNo) {
                    eligibleMaterials.push({
                        "material": element,
                        "relevance": relevanceKeywords,
                    });
                };
            });

            const sortedMaterials = eligibleMaterials.sort((a, b) => Number(b.relevance) - Number(a.relevance));

            if (sortedMaterials.length === 0) {
                return res.status(404).json({
                    error: "Er zijn geen resultaten gevonden.",
                });
            };

            return res.status(200).json(sortedMaterials);
        } catch (e) {
            next(e);
        };
    };

    createMaterial = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const { title, description, type, filename, file, videoUrl, size, author, moduleId } = req.body;
            
            let newMaterial: IMaterial;
            
            if (type === 'Presentatie') {
                newMaterial = new Material({
                    title: title,
                    description: description,
                    type: type,
                    filename: filename,
                    file: file,
                    size: size,
                    _authorId: author,
                    _moduleId: moduleId,
                });
            };

            if (type === 'Document') {
                newMaterial = new Material({
                    title: title,
                    description: description,
                    type: type,
                    filename: filename,
                    file: file,
                    size: size,
                    _authorId: author,
                    _moduleId: moduleId,
                });
            };

            if (type === 'Video' && videoUrl) {
                newMaterial = new Material({
                    title: title,
                    description: description,
                    type: type,
                    videoUrl: videoUrl,
                    _authorId: author,
                    _moduleId: moduleId,
                });
            };

            const material = await newMaterial.save();

            if (!material) {
                return res.status(400).json({
                    error: "Het bestand kon niet upgeload worden",
                });
            };

            const updateModule = await ModuleItem.findOneAndUpdate({_id: moduleId}, {
                $push: {
                    _materialIds: material._id,
                },
            });

            if (!updateModule) {
                return res.status(400).json({
                    error: "Het bestand kon niet upgeload worden",
                });
            };

            return res.status(200).json(material);
        } catch(e) {
            next(e);
        };
    };

    likeMaterial = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const { userId, materialId } = req.body;

            const user = await User.findById(userId);

            if (!user) return res.status(404).json({
                error: "Deze gebruiker bestaat niet",
            });

            const updateMaterial = await Material.findByIdAndUpdate(materialId, {
                $push: {
                    _likeIds: userId,
                },
            });

            if (!updateMaterial) return res.status(400).json({
                error: "Like kon niet worden toegevoegd",
            });

            return res.status(200).json(updateMaterial);
        } catch (e) {
            next(e);
        };
    };

    dislikeMaterial = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const { userId, materialId } = req.body;

            const user = await User.findById(userId);

            if (!user) return res.status(404).json({
                error: "Deze gebruiker bestaat niet",
            });

            const updateMaterial = await Material.findByIdAndUpdate(materialId, {
                $pull: {
                    _likeIds: userId,
                },
            });

            if (!updateMaterial) return res.status(400).json({
                error: "Like kon niet worden toegevoegd",
            });

            return res.status(200).json(updateMaterial);
        } catch (e) {
            next(e);
        };
    };

    deleteMaterial = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const { id } = req.params;

            const material = await Material.findOne({_id: id});

            if (!material) {
                return res.status(404).json({
                    error: "Dit bestand bestaat niet",
                });
            };

            const deleted = await Material.findOneAndDelete({_id: id});

            return res.status(200).json(deleted);
        } catch (e) {
            next(e);
        };
    };
};