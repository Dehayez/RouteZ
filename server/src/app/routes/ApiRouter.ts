import {
    default as express,
    Router,
} from 'express';

import {
    default as multer,
    memoryStorage,
} from 'multer';

import {
    UserController,
    ResetController,
    FileController,
    ModuleController,
    SignpostController,
    PathController,
    ExerciseController,
} from '../controllers';

import { 
    Auth,
    IConfig,
    Files,
} from '../services';

class ApiRouter {
    public router: Router;

    private userController: UserController;
    private resetController: ResetController;
    private fileController: FileController;
    private moduleController: ModuleController;
    private signpostController: SignpostController;
    private pathController: PathController;
    private exerciseController: ExerciseController;

    private config: IConfig;
    private auth: Auth;

    constructor(config: IConfig, auth: Auth) {
        this.config = config;
        this.auth = auth;

        this.router = express.Router();

        // Initialize controllers and routes
        this.registerControllers();
        this.registerRoutes();
    };

    private registerControllers(): void {
        this.userController = new UserController(this.auth, this.config);
        this.resetController = new ResetController(this.config);
        this.fileController = new FileController();
        this.moduleController = new ModuleController();
        this.signpostController = new SignpostController();
        this.exerciseController = new ExerciseController();
        this.pathController = new PathController();
    };

    private registerRoutes(): void {
        // Authentication routes
        this.router.post('/users/register', this.userController.newUser); // gives bearer
        this.router.post('/users/login', this.userController.loggingInUser); // gives bearer

        // Users
        this.router.get('/users', this.userController.allUsers); // needs bearer, only for admin
        this.router.get('/users/me', this.userController.getMyself); // needs bearer
        this.router.post('/users/me', this.userController.updateMyself); // needs bearer and body
        this.router.delete('/users/me', this.userController.deleteMyself); // needs bearer

        // Reset password
        this.router.post('/reset/send', this.resetController.sendToken); // needs body
        this.router.post('/reset/submit', this.resetController.destroyToken); // needs body

        // Files
        this.router.post('/file', multer({storage: memoryStorage()}).single('picture'), Files.uploadAvatar, this.fileController.upload); // uploading file, needs formdata
        this.router.get('/file/:filename', this.fileController.show); // needs filename as params

        // Modules
        this.router.get('/modules', this.moduleController.allModules); // needs bearer
        this.router.get('/modules/:moduleId', this.moduleController.getModule); // needs bearer
        this.router.post('/modules', this.moduleController.createModule);

        // Signposts
        this.router.get('/signposts', this.signpostController.allSignposts); // needs bearer
        this.router.get('/signposts/:signpostId', this.signpostController.getSignpost); // needs bearer
        this.router.post('/signposts', this.signpostController.createSignpost); // needs bearer, only for admin
        this.router.patch('/signposts/:signpostId/:moduleId', this.signpostController.addModuleToSignpost); // needs bearer, only for admin

        // Paths
        this.router.get('/paths', this.pathController.allPaths); // needs bearer
        this.router.get('/paths/:pathId', this.pathController.getPath); // needs bearer
        this.router.post('/paths', this.pathController.createPath); // needs bearer, only for admin
        this.router.patch('/paths/:moduleId/:pathId', this.pathController.addPathToModule); // needs bearer, only for admin

        // Exercises
        this.router.get('/exercises', this.exerciseController.allExercises); // needs bearer
        this.router.get('/exercises/:exerciseId', this.exerciseController.getExercise); // needs bearer
        this.router.post('/exercises', this.exerciseController.createExercise); // needs bearer, only for admin
        this.router.patch('/exercises/:pathId/:exerciseId', this.exerciseController.addExerciseToPath); // needs bearer, only for admin
    };
};

export default ApiRouter;