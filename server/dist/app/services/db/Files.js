"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const crypto_1 = __importDefault(require("crypto"));
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const stream_1 = __importDefault(require("stream"));
;
class Files {
    constructor() {
        this.defaultBucketName = 'uploads';
        this.uploadSvg = async (req, res, next) => {
            const uploadedImg = req.file;
            try {
                crypto_1.default.randomBytes(16, async (e, buf) => {
                    sharp_1.default(uploadedImg.buffer).toFormat('png').png({ quality: 100 }).toBuffer((e, data, info) => {
                        const name = buf.toString('hex') + path_1.default.extname(uploadedImg.originalname);
                        const bufferstream = new stream_1.default.PassThrough();
                        bufferstream.end(data);
                        bufferstream.pipe(this.gfsBucket.openUploadStream(name).on('error', (error) => {
                            return res.status(500).json({
                                'error': 'Upload niet gelukt',
                            });
                        }).on('finish', () => {
                            req.file.filename = name;
                            next();
                        }));
                    });
                });
            }
            catch (error) {
                return res.status(500).json({
                    'error': 'Upload niet gelukt',
                });
            }
            ;
        };
        this.uploadAvatar = async (req, res, next) => {
            const uploadedImg = req.file;
            try {
                crypto_1.default.randomBytes(16, async (e, buf) => {
                    const name = buf.toString('hex') + path_1.default.extname(uploadedImg.originalname);
                    const bufferstream = new stream_1.default.PassThrough();
                    bufferstream.end(uploadedImg.buffer);
                    bufferstream.pipe(this.gfsBucket.openUploadStream(name).on('error', (error) => {
                        return res.status(500).json({
                            'error': 'Upload niet gelukt',
                        });
                    }).on('finish', () => {
                        req.file.filename = name;
                        next();
                    }));
                });
            }
            catch (error) {
                console.log('Upload not worked');
                return res.status(500).json({
                    'error': 'Upload niet gelukt',
                });
            }
            ;
        };
        this.uploadFile = async (req, res, next) => {
            const uploadedFile = req.file;
            try {
                crypto_1.default.randomBytes(16, async (e, buf) => {
                    const name = buf.toString('hex') + path_1.default.extname(uploadedFile.originalname);
                    const bufferstream = new stream_1.default.PassThrough();
                    bufferstream.end(uploadedFile.buffer);
                    bufferstream.pipe(this.gfsBucket.openUploadStream(name).on('error', (error) => {
                        return res.status(500).json({
                            'error': 'Upload niet gelukt',
                        });
                    }).on('finish', () => {
                        req.file.filename = name;
                        next();
                    }));
                });
            }
            catch (error) {
                console.log('Upload not worked');
                return res.status(500).json({
                    'error': 'Upload niet gelukt',
                });
            }
            ;
        };
    }
    initStream(bucketName) {
        this.bucketName = bucketName ? bucketName : this.defaultBucketName;
        if (mongoose_1.default.connection.readyState === 1) {
            this.gfsBucket = new mongoose_1.default.mongo.GridFSBucket(mongoose_1.default.connection.db, {
                bucketName: this.bucketName,
            });
        }
        else {
            console.log('Initializing failed for GridFs stream');
        }
        ;
    }
    ;
    pipeImage(req, res) {
        this.gfsBucket.find({
            filename: req.params.filename,
        }).toArray((e, files) => {
            if (!files || files.length === 0) {
                return res.status(404).json({
                    error: 'Image not found',
                });
            }
            ;
            this.gfsBucket.openDownloadStreamByName(req.params.filename).pipe(res);
        });
    }
    ;
    pipeSvg(req, res) {
        this.gfsBucket.find({
            filename: req.params.filename,
        }).toArray((e, files) => {
            if (!files || files.length === 0) {
                return res.status(404).json({
                    error: 'Image not found',
                });
            }
            ;
            this.gfsBucket.openDownloadStreamByName(req.params.filename).pipe(res);
        });
    }
    ;
    pipeFile(req, res) {
        this.gfsBucket.find({
            filename: req.params.filename,
        }).toArray((e, files) => {
            if (!files || files.length === 0) {
                return res.status(404).json({
                    error: 'File not found',
                });
            }
            ;
            this.gfsBucket.openDownloadStreamByName(req.params.filename).pipe(res);
        });
    }
    ;
}
;
exports.default = new Files();
//# sourceMappingURL=Files.js.map