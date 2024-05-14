"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserAuthSchema = new mongoose_1.Schema({
    FirstName: String,
    LastName: String,
    Password: String,
    Username: String,
    Mobile: String,
    Verified: Boolean,
    Terminated: Boolean,
    Suspended: Boolean,
    SuspendedTill: Date,
    Reason: String,
    VerificationLink: String,
    LinkTimeout: Date,
    Profile: String,
    TwoStepVerification: Boolean,
    Banner: String,
});
const UserAuth = (0, mongoose_1.model)('unverifiedusers', UserAuthSchema);
exports.default = UserAuth;
