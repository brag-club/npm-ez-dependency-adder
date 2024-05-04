import { Clerc, defineCommand, friendlyErrorPlugin, completionsPlugin, helpPlugin, notFoundPlugin, versionPlugin, Root } from "clerc";

import enquirer from "enquirer";
import path from "node:path";
import fs from "node:fs";
import chalk from "chalk";
import shell from "shelljs";

const lockFiles = [
    { name: "npm", file: "package-lock.json" },
    { name: "yarn", file: "yarn.lock" },
    { name: "pnpm", file: "pnpm-lock.yaml" },
];

const initCommand = defineCommand(
    {
        name: "init",
        description: "Initialize a new project",
        parameters: ["<code>"],
    },
    async ctx => {
        const response = await enquirer.prompt({
            type: "input",
            name: "location",
            message: "Where do you want to install the packages?",
        });
        const locaiton = path.resolve(response["location"]);
        const res2 = await enquirer.prompt({
            type: "select",
            name: "pm",
            message: "Which package manager do you want to use?",
            choices: ["pnpm", "yarn", "npm"],
        });
        const pm = res2["pm"];
        // shell.exec("npm init");

        const res3 = await enquirer.prompt({
            type: "select",
            name: "vscode",
            message: "Do you want to open a vscode session in the directory",
            choices: ["Yes", "No"],
        });
        console.log(res3);

        console.log(chalk.redBright("😄 Happy Hacking !! ⌨️"));
    },
);
const installCommand = defineCommand(
    {
        name: "add",
        description: "Install a list of packages at once",
        parameters: ["<code>"],
    },
    async ctx => {
        const response = await enquirer.prompt({
            type: "input",
            name: "location",
            message: "Where do you want to install the packages?",
        });
        const location = path.resolve(response["location"]);
        const files = fs.readdirSync(path.resolve(location));
        let lockFile = lockFiles.find(({ file }) => {
            return files.includes(file);
        });
        if (!lockFile) {
            console.log("No lock file was found. Hence, using npm as the package manager");
            lockFile = lockFiles[0];
        } else
            console.log(
                `Found lock file: ${lockFile.file}. Hence using ${lockFile.name} as the packageManager`,
            );
    },
);

const cli = Clerc.create()
    .name("NPM CLI")
    .scriptName("npzz")
    .description("A cli tool to install npm packages faster")
    .version("1.0.0")
    .use(friendlyErrorPlugin())    
    .use(completionsPlugin()) 
    .use(notFoundPlugin()) 
    .use(versionPlugin()) 
    .use(helpPlugin())
    .command(initCommand)
    .command(installCommand)
    .command(Root, "Home")
    .parse();