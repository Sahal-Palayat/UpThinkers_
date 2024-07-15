"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseController = void 0;
class CourseController {
    constructor(interactor) {
        this.interactor = interactor;
    }
    addCourse(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body);
                const { name, description, price, duration, selectedCategory, img, tutorId } = req.body;
                console.log(name, description, price, duration, selectedCategory, img, tutorId);
                const success = yield this.interactor.addCourse({ Name: name, Description: description, Duration: duration, Price: price, Category: selectedCategory, Image: img, OfferPrice: price, lessons: [], Status: true, CreatedAt: new Date, UpdatedAt: new Date, TutorId: tutorId });
                if (success) {
                    res.status(200).json({ success: true, message: 'Category added successfully.' });
                }
                else {
                    res.status(302).json({ success: false, message: 'Failed to add category.' });
                }
            }
            catch (error) {
                console.error('Error adding category:', error);
                res.status(500).json({ success: false, message: 'Internal server error.' });
            }
        });
    }
    getCourse(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('coursilek keri');
                const course = yield this.interactor.getCourse(req.query.tutorId);
                res.status(200).json(course);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ error: error });
            }
        });
    }
    editCourse(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { name, description, price, duration, category, img } = req.body;
                console.log(id, name, description, price, duration, category, img);
                const success = yield this.interactor.editCourse(id, {
                    Name: name, Description: description, Duration: duration, Price: price, Category: category, Image: img, OfferPrice: price, Status: true, CreatedAt: new Date, UpdatedAt: new Date,
                    lessons: [],
                    Tutor: ""
                });
                if (success) {
                    res.status(200).json({ success: true, message: 'Category updated successfully.' });
                }
                else {
                    res.status(302).json({ success: false, message: 'Failed to update category.' });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ success: false, message: 'Internal server error.' });
            }
        });
    }
    deleteCourse(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                console.log(id);
                const success = yield this.interactor.deleteCourse(id);
                if (success) {
                    console.log('deleted success');
                    res.status(200).json({ success: true, message: 'Category deleted successfully.' });
                }
                else {
                    res.status(302).json({ success: false, message: 'Failed to delete category.' });
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ success: false, message: 'Internal server error.' });
            }
        });
    }
    addLesson(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('lesonnnnnnnn');
                const { id } = req.params;
                const { title, content, img, vdo, pdf } = req.body;
                console.log(id, title, content, img, vdo, pdf);
                const success = yield this.interactor.addLesson({ Title: title, Content: content, Image: img, Video: vdo, Documents: pdf, Course: id });
                if (success) {
                    res.status(200).json({ success: true, message: 'Lesson added successfully.' });
                }
                else {
                    res.status(302).json({ success: false, message: 'Failed to add lesson.' });
                }
            }
            catch (error) {
                console.log();
                res.status(500).json({ success: false, message: 'Internal server error.' });
            }
        });
    }
    getLessons(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                console.log(id);
                const lessons = yield this.interactor.getLessons(id);
                res.status(200).json(lessons);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ success: false, message: 'internal server error' });
            }
        });
    }
    getStudents(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.params);
                const { courseId, tutorId } = req.params;
                const students = yield this.interactor.getStudents(courseId);
                res.status(200).json(students);
            }
            catch (error) {
                console.log(error);
                res.status(500).json({ success: false, message: 'internal server error' });
            }
        });
    }
}
exports.CourseController = CourseController;
