import {
    NextFunction,
    Request,
    Response,
} from 'express';

import { 
    Files,
} from '../services';

export default class FileController {
    // Getting file
    public show = (req: Request, res: Response, next: NextFunction): void => {
        Files.pipeImage(req, res);
    };

    // Uploading file
    public upload = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
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
        return res.status(200).json();
    };
};