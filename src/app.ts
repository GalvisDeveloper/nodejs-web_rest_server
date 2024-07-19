import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";


(async () => {
    main();
})();


function main() {
    new Server({
        PORT: envs.PORT,
        routes: AppRoutes.routes,
    }).start();
}