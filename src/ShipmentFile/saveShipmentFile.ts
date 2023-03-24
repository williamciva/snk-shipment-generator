import fs from 'fs';
import path from 'path';
import Log from '../utils/log';
import { config } from 'dotenv';

export default class ShipmentFile {
    public static getFolderTemp = (): string => {
        config(); return `${process.env.LOCAL_TEMP}`
    }

    static defaultLocalTemp: string = ShipmentFile.getFolderTemp();


    static saveShipmentFile = (layout: string, nameFile: string, file: string) => {
        let pathToSave: string = "";
        try {
            const dtExec: string = new Date().toLocaleDateString().split("/").join("_");
            const pathDefault: string = `${process.env.LOCAL_TEMP}`;
            let nomeLayout: string;

            try {
                nomeLayout = (JSON.parse(layout))["nome"];
            } catch (error) {
                Log.addLogError(error as string)
                throw new Error("O nome do layout é obrigatório que seja informado no JSON.");
            }

            try {

                let pathLayout = (JSON.parse(layout))["caminho"];
                if (pathLayout != "" && pathLayout != undefined) {
                    pathToSave = path.join(pathLayout);
                }
                else {
                    throw new Error(`O caminho para o arquivo ${nameFile} no layout ${nomeLayout} é vazio ou indefinido!`);
                }


                const dataFile = new Date();
                const dataFileString = `${dataFile.getFullYear()}${dataFile.getMonth().toString().length == 1 ? "0" + dataFile.getMonth() : dataFile.getMonth()}${dataFile.getDay().toString().length == 1 ? "0" + dataFile.getDay() : dataFile.getDay()}`
                pathToSave = path.join(pathToSave, `${nameFile}_${dataFileString}.txt`)
                fs.writeFileSync(pathToSave, file)

            } catch (error) {

                Log.addLogError(error as string);
                Log.addLog(`Criando caminho alternatívo para o arquivo ${nameFile} do layout ${nomeLayout} na pasta temp`)

                try {
                    pathToSave = path.join(pathDefault, dtExec)
                    fs.mkdir(pathToSave, () => {

                    })

                    pathToSave = path.join(pathToSave, nomeLayout)
                    fs.mkdir(pathToSave, () => { })

                    pathToSave = path.join(pathToSave, `${nameFile}.txt`)
                    fs.writeFileSync(pathToSave, file)

                } catch (error) {
                    Log.addLogError(error as string)
                }

            }
        } catch (error) {
            Log.addLogError(error as string)
            throw new Error(`Não foi possível salvar o arquivo "${nameFile}.txt"\nCaminho "${pathToSave}" pois ocorreram erros.`);
        }
    }

    public static createDefaultPathShipmentFile = () => {
        fs.mkdir(ShipmentFile.defaultLocalTemp, () => { })
    }
}