import fs from 'fs'
import path from 'path';
import BApi from './services/bapi';
import gerarArquivoRemessa from './services/gerarArquivoRemessa';
import Login from './services/login';
import loginWorkspaceSP from './services/loginWorkspaceSP';
import Workspace from './models/workspace';
import Log from './utils/log';
import ShipmentFile from './saveShipmentFile';
import { config } from 'dotenv'

export default async () => {
    config();
    new Log();
    new ShipmentFile();

    try {
        await Login.login();
        const workspace: Workspace | undefined = await loginWorkspaceSP("br.com.sankhya.edi.geracao.arquivo.remessa")
        const mgeSession = workspace?.getJsessionid();


        const layouts = fs.readdirSync(`${process.env.LOCAL_LAYOUTS}`);


        layouts.forEach(async (documentJson) => {
            let ataulLayout = path.join(`${process.env.LOCAL_LAYOUTS}`, documentJson)

            let layoutObject = new Object(fs.readFileSync(ataulLayout));
            let layoutJson = JSON.parse(layoutObject.toString());

            (layoutJson["payloads"] as []).forEach(async (payload) => {
                if (await gerarArquivoRemessa(payload as object, mgeSession as string)) {

                    let chaveArq: string | undefined = undefined;
                    try { chaveArq = payload["requestBody"]["param"]["chaveSessaoArquivo"]; } catch (error) { }

                    let documentTxt = await BApi.vizualizarArquivo(chaveArq);

                    const nameFile = payload["name"]
                    
                    ShipmentFile.saveShipmentFile(JSON.stringify(layoutJson), nameFile, documentTxt);
                };
            })
        })

    } catch (error) {
        Log.addLogError(error as string);
    }

    Log.saveLogs();
}