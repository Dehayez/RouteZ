"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importStar(require("multer"));
const controllers_1 = require("../controllers");
const services_1 = require("../services");
class ApiRouter {
    constructor(config, auth) {
        this.config = config;
        this.auth = auth;
        this.router = express_1.default.Router();
        // Initialize controllers and routes
        this.registerControllers();
        this.registerRoutes();
    }
    ;
    registerControllers() {
        this.userController = new controllers_1.UserController(this.auth, this.config);
        this.resetController = new controllers_1.ResetController(this.config);
        this.fileController = new controllers_1.FileController();
        this.moduleController = new controllers_1.ModuleController();
        this.signpostController = new controllers_1.SignpostController();
        this.exerciseController = new controllers_1.ExerciseController();
        this.pathController = new controllers_1.PathController();
        this.tagController = new controllers_1.TagController();
        this.searchController = new controllers_1.SearchController();
        this.notificationController = new controllers_1.NotificationController();
    }
    ;
    registerRoutes() {
        // Authentication routes
        this.router.post('/users/register', this.userController.newUser); // gives bearer
        this.router.post('/users/login', this.userController.loggingInUser); // gives bearer
        this.router.post('/users/admin', this.userController.loggingInAdmin); // gives bearer
        // Users
        this.router.get('/users', this.userController.allUsers); // needs bearer, only for admin
        this.router.get('/users/me', this.userController.getMyself); // needs bearer
        this.router.get('/users/:id', this.userController.getUser); // needs bearer and id
        this.router.get('/users-progress', this.userController.calculateUserProgress); // needs bearer
        this.router.patch('/users/:id', this.userController.editUser); // needs bearer and id, only for admin
        this.router.post('/users/me', this.userController.updateMyself); // needs bearer and body
        this.router.post('/users/me/progress', this.userController.updateProgress); // needs bearer and body
        this.router.post('/users/me/last', this.userController.updateLastProgress); // needs bearer and body
        this.router.post('/users/create', this.userController.createUser); // needs body, only admin
        this.router.delete('/users/me', this.userController.deleteMyself); // needs bearer
        this.router.delete('/users/:id', this.userController.deleteUser); // needs id, only admin
        // Reset password
        this.router.post('/reset/send', this.resetController.sendToken); // needs body
        this.router.post('/reset/submit', this.resetController.destroyToken); // needs body
        // Files
        this.router.post('/file', multer_1.default({ storage: multer_1.memoryStorage() }).single('picture'), services_1.Files.uploadAvatar, this.fileController.upload); // uploading avatar, needs formdata
        this.router.post('/doc', multer_1.default({ storage: multer_1.memoryStorage() }).single('file'), services_1.Files.uploadFile, this.fileController.upload); // uploading avatar, needs formdata
        this.router.get('/file/:filename', this.fileController.showImage); // needs filename as params
        this.router.get('/doc/:filename', this.fileController.showFile); // needs filename as params
        this.router.get('/svg/:filename', this.fileController.showSvg); // needs filename as params
        this.router.get('/material/:id', this.fileController.getMaterial); // needs bearer and params
        this.router.get('/material/current/:userId', this.fileController.myMaterials); // needs userId as params and bearer
        this.router.get('/material', this.fileController.allMaterials); // needs bearer
        this.router.post('/material', this.fileController.createMaterial); // needs bearer and body
        this.router.post('/material/search', this.fileController.showMaterial); // needs bearer and body
        this.router.post('/material/like', this.fileController.likeMaterial); // needs bearer and body
        this.router.post('/material/dislike', this.fileController.dislikeMaterial); // needs bearer and body
        this.router.post('/edit-material/:materialId', this.fileController.editMaterial); // needs bearer and body and params
        this.router.delete('/material/:id', this.fileController.deleteMaterial); // needs bearer and params
        // Modules
        this.router.get('/modules', this.moduleController.allModules); // needs bearer
        this.router.get('/modules/:moduleId', this.moduleController.getModule); // needs bearer
        this.router.post('/modules', this.moduleController.createModule); // needs bearer and body
        this.router.post('/modules/:id', this.moduleController.editModule); // only admin, needs param and body
        // Signposts
        this.router.get('/signposts', this.signpostController.allSignposts); // needs bearer
        this.router.get('/signposts/:signpostId', this.signpostController.getSignpost); // needs bearer
        this.router.patch('/signposts/:signpostId', this.signpostController.editSignpost); // needs bearer
        this.router.post('/signposts', this.signpostController.createSignpost); // needs bearer, only for admin
        this.router.patch('/signposts/add/:signpostId/:moduleId', this.signpostController.addModuleToSignpost); // needs bearer, only for admin
        this.router.patch('/signposts/remove/:signpostId/:moduleId', this.signpostController.removeModuleFromSignpost); // needs bearer, only for admin
        this.router.delete('/signposts/:id', this.signpostController.deleteSignpost); // needs bearer, only for admin
        // Paths
        this.router.get('/paths', this.pathController.allPaths); // needs bearer
        this.router.get('/paths/:pathId', this.pathController.getPath); // needs bearer
        this.router.post('/paths', this.pathController.createPath); // needs bearer, only for admin
        this.router.patch('/paths/add/:moduleId/:pathId', this.pathController.addPathToModule); // needs bearer, only for admin
        this.router.patch('/paths/remove/:moduleId/:pathId', this.pathController.removePathFromModule); // needs bearer, only for admin
        // Exercises
        this.router.get('/exercises', this.exerciseController.allExercises); // needs bearer
        this.router.get('/exercises/:exerciseId', this.exerciseController.getExercise); // needs bearer
        this.router.post('/exercises', this.exerciseController.createExercise); // needs bearer, only for admin
        this.router.patch('/exercises/:pathId/:exerciseId', this.exerciseController.addExerciseToPath); // needs bearer, only for admin
        // Tags
        this.router.get('/tags', this.tagController.allTags); // needs bearer
        this.router.get('/tags/:id', this.tagController.getTag); // needs bearer
        this.router.post('/tags', this.tagController.createTag); // needs bearer, only for admin
        // Searches
        this.router.post('/search-engine', this.searchController.searchItems); // needs bearer and body
        // Notifications
        this.router.post('/notification', this.notificationController.createNotification); // needs body
        this.router.get('/notifications', this.notificationController.getNotifications); // needs bearer
        this.router.get('/read-notifications', this.notificationController.readNotifications); // needs bearer
    }
    ;
}
;
exports.default = ApiRouter;
//# sourceMappingURL=ApiRouter.js.map