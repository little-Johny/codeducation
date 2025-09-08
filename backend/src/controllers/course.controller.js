class CourseController {
  constructor(courseService) {
    this.courseService = courseService;
    this.createCourse = this.createCourse.bind(this);
    this.getCourses = this.getCourses.bind(this);
    this.updateCourse = this.updateCourse.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
    this.addCourseImage = this.addCourseImage.bind(this);
    this.getCourseById = this.getCourseById.bind(this);
    this.getCoursesByCategory = this.getCoursesByCategory.bind(this);
  }

  async getCourses(req, res, next) {
    try {
      const courses = await this.courseService.getCourses();
      res.success(courses, "Cursos obtenidos exitosamente");
    } catch (error) {
      next(error);
    }
  }

  async getCourseById(req, res, next) {
    try {
      const course = await this.courseService.getCourseById(req.params.id);
      res.success(course, "Curso obtenido exitosamente");
    } catch (error) {
      next(error);
    }
  }

  async getCoursesByCategory(req, res, next) {
    try {
      const { category } = req.query;
      console.log(category);
      const courses = await this.courseService.getCoursesByCategory(category);
      res.success(courses, "Cursos obtenidos exitosamente");
    } catch (error) {
      next(error);
    }
  }

  async createCourse(req, res, next) {
    try {
      const newUser = await this.courseService.createCourse(req.body, req.file);
      res.success(newUser, "Curso creado exitosamente", 201);
    } catch (error) {
      next(error);
    }
  }

  async addCourseImage(req, res, next) {
    try {
      const { id } = req.params;
      const file = req.file;
      const result = await this.courseService.addCourseImage(id, file);
      res.success(result, "Image uploaded successfully", 201);
    } catch (err) {
      next(err);
    }
  }

  async updateCourse(req, res, next) {
    try {
      const course = await this.courseService.updateCourse(
        req.params.id,
        req.body
      );
      res.success(course, "Curso actualizado exitosamente");
    } catch (error) {
      next(error);
    }
  }

  async deleteCourse(req, res, next) {
    try {
      const id = req.params.id;
      await this.courseService.deleteCourse(id);
      res.success(id, "Curso eliminado exitosamente");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CourseController;
