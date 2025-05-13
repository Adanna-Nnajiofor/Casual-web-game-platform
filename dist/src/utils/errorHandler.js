"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const handleError = (error, location) => {
    console.error(`[${location}]`, {
        message: error.message,
        stack: error.stack,
    });
};
exports.handleError = handleError;
