"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const search_1 = __importDefault(require("./routes/search"));
const auth_1 = __importDefault(require("./routes/auth"));
const giphy_1 = __importDefault(require("./routes/giphy"));
const upload_1 = __importDefault(require("./routes/upload"));
const user_1 = __importDefault(require("./routes/user"));
const profile_1 = __importDefault(require("./routes/profile"));
const post_1 = __importDefault(require("./routes/post"));
const game_1 = __importDefault(require("./routes/game"));
const constants_1 = require("./constants");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
mongoose_1.default
    .connect(constants_1.CONNECTION, {
    dbName: "Laros",
})
    .then(() => {
    console.log("connected to the database");
    app.listen(constants_1.PORT, () => {
        console.log(`listening to PORT ${constants_1.PORT}`);
    });
})
    .catch((error) => {
    console.error(error);
});
app.use("/api/search", search_1.default);
app.use("/api/auth", auth_1.default);
app.use("/api/giphy", giphy_1.default);
app.use("/api/upload", upload_1.default);
app.use("/api/user", user_1.default);
app.use("/api/profile", profile_1.default);
app.use("/api/post", post_1.default);
app.use("/api/game", game_1.default);
