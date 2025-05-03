"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionSchema = exports.loginSchema = exports.registerSchema = void 0;
exports.validate = validate;
const zod_1 = require("zod");
// User registration schema
exports.registerSchema = zod_1.z.object({
    username: zod_1.z
        .string()
        .nonempty("Username is required")
        .min(3, "Username must be at least 3 characters"),
    email: zod_1.z
        .string()
        .nonempty("Email is required")
        .email("Invalid email address"),
    password: zod_1.z
        .string()
        .nonempty("Password is required")
        .min(6, "Password must be at least 6 characters"),
});
// User login schema
exports.loginSchema = zod_1.z
    .object({
    email: zod_1.z.string().email("Invalid email address").optional(),
    username: zod_1.z
        .string()
        .min(3, "Username must be at least 3 characters")
        .optional(),
    password: zod_1.z
        .string()
        .nonempty("Password is required")
        .min(6, "Password must be at least 6 characters"),
})
    .refine((data) => data.email || data.username, {
    message: "Either email or username is required",
    path: ["identifier"],
});
// Game session submission schema
exports.sessionSchema = zod_1.z.object({
    gameId: zod_1.z.string().nonempty("Game ID is required").uuid("Invalid game ID"),
    score: zod_1.z.number().min(0, "Score must be zero or higher"),
    duration: zod_1.z.number().min(1, "Session must last at least 1 second"),
});
// Optional: Validate helper
function validate(schema, data) {
    const result = schema.safeParse(data);
    if (!result.success) {
        const errors = result.error.format();
        return { success: false, errors };
    }
    return { success: true, data: result.data };
}
