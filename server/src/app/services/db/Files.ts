import {
    NextFunction,
    Request,
    Response,
} from 'express';

import {
    default as mongoose,
} from 'mongoose';

import {
    default as crypto
} from 'crypto';

import {
    default as sharp
} from 'sharp';

import {
    default as path,
} from 'path';

import { 
    default as stream 
} from 'stream';

interface IMulterRequest extends Request {
    file: any;
};

class Files {
    private gfsBucket: any;
    private defaultBucketName: string = 'uploads';
    private bucketName: string;

    public initStream(bucketName? : string): void {
        this.bucketName = bucketName ? bucketName : this.defaultBucketName;

        if (mongoose.connection.readyState === 1) {
            this.gfsBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
                bucketName: this.bucketName,
            });
        } else {
            console.log('Initializing failed for GridFs stream');
        };
    };

    public uploadAvatar = async (req: IMulterRequest, res: Response, next: NextFunction): Promise <Response> => {
        const uploadedImg = req.file;

        try {
            crypto.randomBytes(16, async (e, buf) => {
                sharp(uploadedImg.buffer).resize(300, 300, {
                    fit: 'cover',
                }).toFormat('jpeg').jpeg({ quality: 90 }).toBuffer((e: any, data: any, info: any) => {
                    const name = buf.toString('hex') + path.extname(uploadedImg.originalname);
                    const bufferstream = new stream.PassThrough();

                    bufferstream.end(data);
                    bufferstream.pipe(this.gfsBucket.openUploadStream(name).on('error', (error: any) => {
                        return res.status(500).json({
                            'error': 'Upload niet gelukt',
                        });
                    }).on('finish', () => {
                        req.file.filename = name;
                        next();
                    })
                    );
                });
            });
        } catch (error) {
            console.log('Upload not worked');
            return res.status(500).json({
                'error': 'Upload niet gelukt',
            });    
        };
    };

    public uploadFile = async (req: IMulterRequest, res: Response, next: NextFunction): Promise <Response> => {
        const uploadedFile = req.file;

        try {
            crypto.randomBytes(16, async (e, buf) => {
                const name = buf.toString('hex') + path.extname(uploadedFile.originalname);
                const bufferstream = new stream.PassThrough();

                bufferstream.end(uploadedFile.buffer);
                bufferstream.pipe(this.gfsBucket.openUploadStream(name).on('error', (error: any) => {
                    return res.status(500).json({
                        'error': 'Upload niet gelukt',
                    });
                }).on('finish', () => {
                    req.file.filename = name;
                    next();
                }));
            });
        } catch (error) {
            console.log('Upload not worked');
            return res.status(500).json({
                'error': 'Upload niet gelukt',
            });    
        };
    };

    public pipeImage(req: IMulterRequest, res: Response): void {
        this.gfsBucket.find({
            filename: req.params.filename,
        }).toArray((e: any, files: any) => {
            if(!files || files.length === 0) {
                return res.status(404).json({
                    error: 'Image not found',
                });
            };

            this.gfsBucket.openDownloadStreamByName(req.params.filename).pipe(res);
        });
    };

    public pipeFile(req: IMulterRequest, res: Response): void {
        this.gfsBucket.find({
            filename: req.params.filename,
        }).toArray((e: any, files: any) => {
            if(!files || files.length === 0) {
                return res.status(404).json({
                    error: 'File not found',
                });
            };

            this.gfsBucket.openDownloadStreamByName(req.params.filename).pipe(res);
        });
    };
};

export default new Files();