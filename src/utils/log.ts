import path from "path";
import fs from 'fs';
import boxen from 'boxen';
import chalk from 'chalk';
import { config } from 'dotenv'
const args = require('minimist')(process.argv.slice(2),
    {
        alias: {
            l: 'log',
            v: 'verbose'
        }
    });


export default class Log {
    public static getFolderLogs = (): string => {
        config(); return `${process.env.LOCAL_LOGS}`
    }

    private static dtExec: string = new Date().toLocaleDateString().split("/").join("_");
    private static logFile: string = `---[ Sankhya Shipment Generator Log - by williamciva ]---`;
    private static folderLogs: string = Log.getFolderLogs();
    private static folderLogDay: string = path.join(Log.folderLogs, Log.dtExec);

    public static addLog = (msg: string) => {
        let referenceDate = `[ ${new Date().toLocaleString()} ] ->`
        let tempLog = `\n${referenceDate} ${msg}`;
        args.log ? Log.logFile += tempLog : null;
        args.verbose ? console.log(`${chalk.greenBright(referenceDate)}\n${boxen(chalk.green(msg), { padding: 1 })}\n\n`) : null;
    };

    public static addLogError = (error: string) => {
        let referenceDate = `[ ${new Date().toLocaleString()} ] ->`
        let tempLog = `\n${referenceDate} ${error}`;
        args.log ? Log.logFile += tempLog : null;
        args.verbose ? console.log(`${chalk.redBright(referenceDate)}\n${boxen(chalk.red(error), { padding: 1 })}\n\n`) : null;
    }

    public static saveLogs = () => {
        try {
            const hora_exec = new Date().toLocaleTimeString().split(":").join("_");
            fs.writeFileSync(path.join(Log.folderLogDay, `${hora_exec}.log`), Log.logFile)
        } catch (error) {
            console.log(error)
        }
    }

    public static createDefaultFolders = () => {
        const createFolderLogs = () => fs.mkdir(Log.folderLogs, () => { })
        const createFolderLogDay = () => fs.mkdir(Log.folderLogDay, () => { })

        createFolderLogs();
        createFolderLogDay();
    }
}



