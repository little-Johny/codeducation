class LessonController {
    constructor(lessonService) {
        this.lessonService = lessonService;
        this.createLesson = this.createLesson.bind(this);
        this.getLessons = this.getLessons.bind(this);
        this.getLessonsByCourse = this.getLessonsByCourse.bind(this);
        this.updateLesson = this.updateLesson.bind(this);
        this.deleteLesson = this.deleteLesson.bind(this);
        this.getLessonById = this.getLessonById.bind(this);
        this.addLessonVideo = this.addLessonVideo.bind(this);
    }

    async getLessons(req, res, next) {
        try {
            const lessons = await this.lessonService.getLessons();
            res.success(lessons, "Lecciones obtenidas exitosamente");
        } catch (error) {
            next(error);
        }
    }

    async getLessonById(req, res, next) {
        try {
            const lesson = await this.lessonService.getLessonById(req.params.id);
            res.success(lesson, "Lección obtenida exitosamente");
        } catch (error) {
            next(error);
        }
    }

    async getLessonsByCourse(req, res, next) {
        try {
            const { courseId } = req.params;
            const lessons = await this.lessonService.getLessonsByCourse(courseId);
            res.success(lessons, "Lecciones del curso obtenidas exitosamente");
        } catch (error) {
            next(error);
        }
    }

    async createLesson(req, res, next) {
        try {
            const file = req.file;
            const body = req.body;
            const newLesson = await this.lessonService.createLesson(body, file);
            res.success(newLesson, "Lección creada exitosamente", 201);
        } catch (error) {
            next(error);
        }
    }

    async addLessonVideo(req, res, next) {
        try {
            const { id } = req.params;
            const file = req.file;
            const result = await this.lessonService.addLessonVideo(id, file);
            res.success(result, "Video subido exitosamente", 201);
        } catch (err) {
            next(err);
        }
    }

    async updateLesson(req, res, next) {
        try {
            const lesson = await this.lessonService.updateLesson(req.params.id, req.body);
            res.success(lesson, "Lección actualizada exitosamente");
        } catch (error) {
            next(error);
        }
    }

    async deleteLesson(req, res, next) {
        try {
            const id = req.params.id;
            await this.lessonService.deleteLesson(id);
            res.success(id, "Lección eliminada exitosamente");
        } catch (error) {
            next(error);
        }
    }
}

module.exports = LessonController;
