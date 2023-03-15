import fs from 'fs';
import path from 'path';
import Log from './utils/log';
import { config } from 'dotenv';

export default class ShipmentFile {
    static defaultLocalTemp: string;

    constructor() {
        config();
        ShipmentFile.defaultLocalTemp = `${process.env.LOCAL_TEMP}`;
        this.createDefaultPathShipmentFile();
    }

    static saveShipmentFile = (layout: string, nameFile: string, file: string) => {
        let pathToSave: string = "";
        try {
            const dtExec: string = `${new Date().toLocaleDateString().split("/").join("_")}___${new Date().toLocaleTimeString().split(":").join("_")}`;
            const pathDefault: string = `${process.env.LOCAL_TEMP}`;
            
            try {
                pathToSave = (JSON.parse(layout))["caminho"];
                if (pathToSave === "" || pathToSave === undefined) { throw new Error("Caminho para salvamento não especificado.") };
            } catch (error) {
                pathToSave = path.join(pathDefault, dtExec)
                try {
                    fs.mkdir(pathToSave, () => {
                        try {
                            pathToSave = path.join(pathToSave, (JSON.parse(layout))["nome"])
                            fs.mkdir(pathToSave, () => { })
                        } catch (error) { }
                    })
                } catch (error) { }
            }

            pathToSave = path.join(pathToSave, `${nameFile}.txt`)

            fs.writeFileSync(pathToSave, file)
        } catch (error) {
            Log.addLogError(`Não foi possível salvar o arquivo ${file}, no caminho ${pathToSave} pois ocorreram erros.\n${error as string}`)
        }
    }

    createDefaultPathShipmentFile = () => {
        fs.mkdir(ShipmentFile.defaultLocalTemp, () => { })
    }
}