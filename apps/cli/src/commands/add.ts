import { defineCommand, Command } from "clerc";
import enquirer from "enquirer";
import path from "node:path";
import chalk from "chalk";
import shell from "shelljs";
import { API_URL } from "../utils/constants";

export const addCommand : Command = defineCommand(
    {
        name: "add",
        description: "Add deps for project",
        parameters: ["<code>"],
    },
    async (ctx) => {
        const {
            code
        } = ctx.parameters as {
            code: string;
        }

        const packages = {
            "dependencies": [],
            "devDependencies": [],
        }

        const responseData = await fetch(API_URL+"/" + code, {
            method: "GET",
        }).then((res) => res.json())
        .catch(() => null);

        if (responseData) {
            packages["dependencies"] = responseData["dependencies"];
            packages["devDependencies"] = responseData["devDependencies"];
        }
        else {
            console.log(chalk.redBright("No data found for the given code"));

            return;
        }

        const locationPromptResponse : {
            location: string;
        } = await enquirer.prompt({
            type: "input",
            name: "location",
            message: "Where do you want to install the packages?",
        });

        const currentLocation = shell.pwd().stdout;
        
        const locaiton = path.resolve(
            currentLocation,
            locationPromptResponse["location"],
        );
        
        shell.exec(`mkdir -p ${locaiton}`);
        shell.cd(locaiton);

        if (shell.test("-f", "package.json")) {
            console.log(chalk.redBright("package.json already exists in the directory"));

            const lockFiles = [
                { name: "npm", file: "package-lock.json" },
                { name: "yarn", file: "yarn.lock" },
                { name: "pnpm", file: "pnpm-lock.yaml" },
                { name: "bun", file: "bun.lock" },
            ];

            let pm = "npm";

            for (const lockFile of lockFiles) {
                if (shell.test("-f", lockFile["file"])) {
                    pm = lockFile["name"];
                    break;
                }
            }

            console.log(chalk.greenBright("Using " + pm + " as package manager"));

            if (pm === "yarn") {
                shell.exec("yarn add " + packages["dependencies"].join(" "));
                shell.exec("yarn add -D " + packages["devDependencies"].join(" "));
            }
            else if (pm === "pnpm") {
                shell.exec("pnpm add " + packages["dependencies"].join(" "));
                shell.exec("pnpm add -D " + packages["devDependencies"].join(" "));
            }
            else if (pm === "bun") {
                shell.exec("bun add " + packages["dependencies"].join(" "));
                shell.exec("bun add -D " + packages["devDependencies"].join(" "));
            }
            else {
                shell.exec("npm install " + packages["dependencies"].join(" "));
                shell.exec("npm install -D " + packages["devDependencies"].join(" "));
            }
        }

        else {
            const selectedPackageManager : {
                pm: string;
            } = await enquirer.prompt({
                type: "select",
                name: "pm",
                message: "Which package manager do you want to use?",
                choices: ["pnpm", "yarn", "npm", "bun" ],
            });
            
            const pm = selectedPackageManager["pm"];
            let initCommand : string = `${pm} init`

            if(
                initCommand == "npm" || initCommand == "yarn"
            ) {
                initCommand = initCommand + " -y"
            }

            shell.exec(initCommand)
    
            if (pm === "yarn") {
                shell.exec("yarn add " + packages["dependencies"].join(" "));
                shell.exec("yarn add -D " + packages["devDependencies"].join(" "));
            }
            else if (pm === "pnpm") {
                shell.exec("pnpm add " + packages["dependencies"].join(" "));
                shell.exec("pnpm add -D " + packages["devDependencies"].join(" "));
            }
            else if (pm === "bun") {
                shell.exec("bun add " + packages["dependencies"].join(" "));
                shell.exec("bun add -D " + packages["devDependencies"].join(" "));
            }
            else {
                shell.exec("npm install " + packages["dependencies"].join(" "));
                shell.exec("npm install -D " + packages["devDependencies"].join(" "));
            }
        }

        const vscodePromptResult : {
            vscode: string;
        } = await enquirer.prompt({
            type: "select",
            name: "vscode",
            message: "Do you want to open a vscode session in the directory",
            choices: ["Yes", "No"],
        });

        console.log(chalk.greenBright("😄 Happy Hacking !! ⌨️"));

        if (vscodePromptResult["vscode"] === "Yes") {
            if (shell.which("code")) {
                shell.exec("code .");
            }
            else if (shell.which("code-insiders")) {
                shell.exec("code-insiders .");
            }
            else if (shell.which("codium")) {
                shell.exec("codium .");
            }
            else {
                console.log(chalk.redBright("VS Code is not installed on your system"));
            }
        }
    },
);