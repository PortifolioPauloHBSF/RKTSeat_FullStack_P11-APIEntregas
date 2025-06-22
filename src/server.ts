import { app } from "@/app";
import { env } from "@/env";

const PORT = app.listen(env.API_PORT, () => {
    console.log(`Server is running on port ${env.API_PORT}`);
});
