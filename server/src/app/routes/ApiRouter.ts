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
    TagController,
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
    private tagController : TagController;

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
        this.tagController = new TagController();
    };

    private registerRoutes(): void {
        // Authentication routes
        this.router.post('/users/register', this.userController.newUser); // gives bearer
        this.router.post('/users/login', this.userController.loggingInUser); // gives bearer

        // Users
        this.router.get('/users', this.userController.allUsers); // needs bearer, only for admin
        this.router.get('/users/me', this.userController.getMyself); // needs bearer
        this.router.post('/users/me', this.userController.updateMyself); // needs bearer and body
        this.router.post('/users/me/progress', this.userController.updateProgress); // needs bearer and body
        this.router.delete('/users/me', this.userController.deleteMyself); // needs bearer

        // Reset password
        this.router.post('/reset/send', this.resetController.sendToken); // needs body
        this.router.post('/reset/submit', this.resetController.destroyToken); // needs body

        // Files
        this.router.post('/file', multer({storage: memoryStorage()}).single('picture'), Files.uploadAvatar, this.fileController.upload); // uploading avatar, needs formdata
        this.router.post('/doc', multer({storage: memoryStorage()}).single('file'), Files.uploadFile, this.fileController.upload); // uploading avatar, needs formdata
        this.router.get('/file/:filename', this.fileController.showImage); // needs filename as params
        this.router.get('/doc/:filename', this.fileController.showFile); // needs filename as params
        this.router.get('/material/:id', this.fileController.getMaterial); // needs bearer and params
        this.router.get('/material/current/:userId', this.fileController.myMaterials); // needs userId as params and bearer
        this.router.get('/material', this.fileController.allMaterials); // needs bearer
        this.router.post('/material', this.fileController.createMaterial); // needs bearer and body
        this.router.post('/material/search', this.fileController.showMaterial); // needs bearer and body
        this.router.post('/material/like', this.fileController.likeMaterial); // needs bearer and body
        this.router.post('/material/dislike', this.fileController.dislikeMaterial); // needs bearer and body
        this.router.delete('/material/:id', this.fileController.deleteMaterial); // needs bearer and params

        // Modules
        this.router.get('/modules', this.moduleController.allModules); // needs bearer
        this.router.get('/modules/:moduleId', this.moduleController.getModule); // needs bearer
        this.router.post('/modules', this.moduleController.createModule);

        // Signposts
        this.router.get('/signposts', this.signpostController.allSignposts); // needs bearer
        this.router.get('/signposts/:signpostId', this.signpostController.getSignpost); // needs bearer
        this.router.post('/signposts', this.signpostController.createSignpost); // needs bearer, only for admin
        this.router.patch('/signposts/add/:signpostId/:moduleId', this.signpostController.addModuleToSignpost); // needs bearer, only for admin
        this.router.patch('/signposts/remove/:signpostId/:moduleId', this.signpostController.removeModuleFromSignpost); // needs bearer, only for admin
        this.router.delete('/signposts/:id', this.signpostController.deleteSignpost); // needs bearer, only for admin

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

        // Tags
        this.router.get('/tags', this.tagController.allTags); // needs bearer
        this.router.get('/tags/:id', this.tagController.getTag); // needs bearer
        this.router.post('/tags', this.tagController.createTag); // needs bearer, only for admin
    };
};

export default ApiRouter;