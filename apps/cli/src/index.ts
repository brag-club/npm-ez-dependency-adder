import { Clerc, helpPlugin, versionPlugin, notFoundPlugin, friendlyErrorPlugin, strictFlagsPlugin } from "clerc";

import { addCommand } from "./commands/add";
import { version, name, description } from "../package.json";

Clerc.create(name, description, version)
    .use(helpPlugin({
        notes: [
            "Use https://deps.codes to quickly add deps to your project",
        ]
    }))
    .use(notFoundPlugin())
    .use(strictFlagsPlugin())
    .use(notFoundPlugin())
    .use(friendlyErrorPlugin())
    .use(versionPlugin())
    .command(addCommand)
    .parse();
