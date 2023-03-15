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
    private static dtExec: string = new Date().toLocaleDateString().split("/").join("_");
    private static logFile: string = `---[ Sankhya Shipment Generator Log - by williamciva ]---`;
    private static logErrorFile: string = `---[ Sankhya Shipment Generator Log Error - by williamciva ]---`;
    private static logPath: string;
    private static folderLogs: string;
    private static folderLogDay: string;
    private static folderLogErros: string;


    constructor() {
        config();
        Log.logPath = `${process.env.LOCAL_LOGS}`;
        Log.folderLogs = Log.logPath
        Log.folderLogDay = path.join(Log.folderLogs, Log.dtExec)
        Log.folderLogErros = path.join(Log.folderLogDay, "error")

        this.createDefaultFolders();
    }

    public static addLog = (msg: string) => {
        let referenceDate = `[ ${new Date().toLocaleString()} ] ->`
        let tempLog = `\n${referenceDate} ${msg}`;
        args.log ? Log.logFile += tempLog : null;
        args.verbose ? console.log(`${chalk.greenBright(referenceDate)}\n${boxen(chalk.green(msg), { padding: 1 })}\n\n`) : null;
    };

    public static addLogError = (error: string) => {
        let referenceDate = `[ ${new Date().toLocaleString()} ] ->`
        let tempLog = `\n${referenceDate} ${error}`;
        args.log ? Log.logErrorFile += tempLog : null;
        args.verbose ? console.log(`${chalk.redBright(referenceDate)}\n${boxen(chalk.red(error), { padding: 1 })}\n\n`) : null;
    }

    public static saveLogs = () => {

        try {
            fs.writeFileSync(Log.folderLogDay, Log.logFile)
            fs.writeFileSync(Log.folderLogErros, Log.logErrorFile)
        } catch (error) {
            console.log(error)
        }
    }

    private createDefaultFolders = () => {
        const createFolderLogs = () => fs.mkdir(Log.folderLogs, () => { })
        const createFolderLogDay = () => fs.mkdir(Log.folderLogDay, () => { })
        const createFolderLogErros = () => fs.mkdir(Log.folderLogErros, () => { })

        createFolderLogs();
        createFolderLogDay();
        createFolderLogErros();
    }
}



