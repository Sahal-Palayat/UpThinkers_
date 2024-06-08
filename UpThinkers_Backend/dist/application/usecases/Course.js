"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseInteractorImpl = void 0;
class CourseInteractorImpl {
    constructor(Repository, mailer) {
        this.Repository = Repository;
        this.mailer = mailer;
    }
}
exports.CourseInteractorImpl = CourseInteractorImpl;
