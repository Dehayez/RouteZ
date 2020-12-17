import { 
    NextFunction,
    Request,
    Response,
} from "express";

import {
    default as crypto,
} from "crypto";

import {
    default as bcrypt
} from "bcrypt";

import {
    default as nodemailer,
} from "nodemailer";

import { 
    IReset,
    IUser,
    Reset, 
    User,
} from "../models";

import { 
    IConfig 
} from "../services";

export default class ResetController {
    private config: IConfig;

    constructor(config: IConfig) {
        this.config = config;
    };

    public sendToken = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        // Is this a user?
        const { email } = req.body;

        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({
                error: "Deze gebruiker lijkt niet te bestaan",
            });
        };

        // Is there already a token?
        const token = await Reset.findOne({ _userId: user._id });

        if (token) {
            return res.status(409).json({
                error: "Er is al reeds een e-mail verstuurd.",
            });
        };

        const newToken: IReset = new Reset({
            _userId: user.id,
            token: crypto.randomBytes(64).toString('hex'),
            _expiresAt: Date.now(),
        }); 

        const saveToken: IReset = await newToken.save();

        // Initializing our setup
        const transporter = nodemailer.createTransport({
            host: this.config.mailer.host,
            port: this.config.mailer.port,
            secure: this.config.mailer.secure,
            auth: {
                user: this.config.mailer.mail,
                pass: this.config.mailer.pass,
            },
        });

        // Send mail
        const info = await transporter.sendMail({
            from: `"RouteZ" <${this.config.mailer.mail}>`,
            to: email,
            subject: "Tijd om je wachtwoord aan te passen",
            html: `<p>Via volgende link kan je je wachtwoord aanpassen: <a href="http://localhost:3000/reset/${saveToken.token}" target="_blank">http://localhost:3000/reset/${saveToken.token}</a></p>`,
        });

        return res.status(200).json(info);
    };

    destroyToken = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        // Get values
        const { token, password } = req.body;

        // Find token
        const reset = await Reset.findOne({ token: token });

        if (!reset) {
            return res.status(404).json({
                error: "Deze token lijkt niet te bestaan",
            });
        };

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                // Update user
                const user : IUser = await User.findByIdAndUpdate({
                    _id: reset._userId,
                }, {
                    password: hash,
                });

                const deleteReset = await Reset.findOneAndRemove({
                    _id: reset._id,
                });

                return res.status(200).json(deleteReset);            
            });
        });
    };
};