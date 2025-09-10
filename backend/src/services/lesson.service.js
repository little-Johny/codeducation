const boom = require("@hapi/boom");
const { sequelize } = require("../db/models");
const { getUploadedFileURL } = require("../middlewares/fileHandler");

class LessonService {
    constructor(lessonRepository) {
        this.lessonRepository = lessonRepository;
    }

    async getLessons() {
        return await this.lessonRepository.findAll();
    }

    async getLessonById(id) {
        const lesson = await this.lessonRepository.findById(id);
        if (!lesson) throw boom.notFound("Lesson not found");
        return lesson;
    }

    async getLessonsByCourse(courseId) {
        const lessons = await this.lessonRepository.getByCourseId(courseId);
        if (lessons.length === 0 || !lessons)
            throw boom.notFound("Lessons not found for this course");
        return lessons;
    }

    async createLesson(data, file) {
        const transaction = await sequelize.transaction();
        try {
            const newLesson = await this.lessonRepository.create(data, {
                transaction,
            });
            if (file) {
                const videoUrl = getUploadedFileURL("lessons", file.filename);
                await newLesson.update({ videoUrl: videoUrl }, { transaction });
            }

            await transaction.commit();
            return newLesson;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async addLessonVideo(id, file) {
        try {
            const lesson = await this.lessonRepository.findById(id);
            if (!lesson) throw boom.notFound("Lesson not found");

            const videoUrl = getUploadedFileURL("lessons", file.filename);

            const updatedLesson = await lesson.update({ videoUrl: videoUrl });

            return {
                message: "Video uploaded successfully",
                lesson: updatedLesson,
            };
        } catch (error) {
            throw error;
        }
    }

    async updateLesson(id, data) {
        const oldLesson = await this.getLessonById(id);
        const before = {};
        for (const key of Object.keys(data)) {
            before[key] = oldLesson[key];
        }
        const newLesson = await oldLesson.update(data);
        const after = {};
        for (const key of Object.keys(data)) {
            after[key] = newLesson[key];
        }
        return {
            before,
            after,
        };
    }

    async deleteLesson(id) {
        const lesson = await this.getLessonById(id);
        return await lesson.destroy(id);
    }
}

module.exports = LessonService;
