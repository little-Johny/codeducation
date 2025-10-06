const boom = require("@hapi/boom");
const { sequelize } = require("../db/models");
const { getUploadedFileURL } = require("../middlewares/fileHandler");

class CourseService {
    constructor(courseRepository) {
        this.courseRepository = courseRepository;
    }

    async getCourses() {
        return await this.courseRepository.findAll();
    }

    async getCourseById(id) {
        const course = await this.courseRepository.getCourseById(id);
        if (!course) throw boom.notFound("Course not found");
        return course;
    }

    async getCoursesByCategory(category) {
        const courses = await this.courseRepository.getByCategory(category);
        if (courses.length === 0 || !courses) throw boom.notFound("Courses not found");
        return courses;
    }

    async createCourse(data, file) {
        const transaction = await sequelize.transaction();
        try {
            console.log("[DEBUG] Creating course:", { data, hasFile: !!file });
            if (file) {
                console.log("[DEBUG] File info:", {
                    filename: file.filename,
                    originalname: file.originalname,
                    mimetype: file.mimetype,
                    size: file.size,
                });
            }

            const newCourse = await this.courseRepository.create(data, {
                transaction,
            });
            if (file) {
                const imageUrl = getUploadedFileURL("course", file.filename);
                await newCourse.update({ image: imageUrl }, { transaction });
            }

            await transaction.commit();
            return newCourse;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async addCourseImage(id, file) {
        try {
            const course = await this.courseRepository.findById(id);
            if (!course) throw boom.notFound("Course not found");

            if (!file) throw boom.badRequest("No image file provided");

            const imageUrl = getUploadedFileURL("course", file.filename);

            const updatedCourse = await course.update({ image: imageUrl });

            return updatedCourse;
        } catch (error) {
            throw error;
        }
    }

    async updateCourse(id, data) {
        const oldCourse = await this.getCourseById(id);
        const before = {};
        for (const key of Object.keys(data)) {
            before[key] = oldCourse[key];
        }
        const newCourse = await oldCourse.update(data);
        const after = {};
        for (const key of Object.keys(data)) {
            after[key] = newCourse[key];
        }
        return {
            before,
            after,
        };
    }

    async deleteCourse(id) {
        const course = await this.getCourseById(id);
        return await course.destroy(id);
    }
}

module.exports = CourseService;
