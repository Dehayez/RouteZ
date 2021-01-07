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
} from "../models";

export default class FileController {
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
            const { title, description, type, filename, file, videoUrl, size, author } = req.body;
            
            if (type === 'Presentatie') {
                let newMaterial: IMaterial = new Material({
                    title: title,
                    description: description,
                    type: type,
                    filename: filename,
                    file: file,
                    size: size,
                    _authorId: author,
                });

                const material = await newMaterial.save();

                if (!material) {
                    return res.status(400).json({
                        error: "De presentatie kon niet upgeload worden",
                    });
                };

                return res.status(200).json(material);
            };

            if (type === 'Document') {
                let newMaterial: IMaterial = new Material({
                    title: title,
                    description: description,
                    type: type,
                    filename: filename,
                    file: file,
                    size: size,
                    _authorId: author,
                });

                const material = await newMaterial.save();

                if (!material) {
                    return res.status(400).json({
                        error: "Het document kon niet upgeload worden",
                    });
                };

                return res.status(200).json(material);
            };

            if (type === 'Video' && videoUrl) {
                let newMaterial: IMaterial = new Material({
                    title: title,
                    description: description,
                    type: type,
                    videoUrl: videoUrl,
                    _authorId: author,
                });

                const material = await newMaterial.save();

                if (!material) {
                    return res.status(400).json({
                        error: "De video kon niet upgeload worden",
                    });
                };

                return res.status(200).json(material);
            };
        } catch(e) {
            next(e);
        };
    };
};