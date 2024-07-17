import { envs } from "./config/envs";
import { Server } from "./presentation/server";


(async () => {
    main();
})();


function main() {
    new Server({
        PORT: envs.PORT
    }).start();
}