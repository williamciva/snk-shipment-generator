import fs from 'fs'
import path from 'path';
import BApi from '../services/bapi';
import gerarArquivoRemessa from '../services/gerarArquivoRemessa';
import Login from '../services/login';
import loginWorkspaceSP from '../services/loginWorkspaceSP';
import Workspace from '../models/workspace';
import Log from '../utils/log';
import ShipmentFile from './saveShipmentFile';
import executeParamJson from './executeParamJson';


export default async () => {
    Log.createDefaultFolders();
    ShipmentFile.createDefaultPathShipmentFile();


    try {
        await Login.login();
        const workspace: Workspace | undefined = await loginWorkspaceSP("br.com.sankhya.edi.geracao.arquivo.remessa")
        const mgeSession = workspace?.getJsessionid();


        const layouts = fs.readdirSync(`${process.env.LOCAL_LAYOUTS}`);

        for (const documentJson of layouts) {
            let ataulLayout = path.join(`${process.env.LOCAL_LAYOUTS}`, documentJson)

            let layoutObject = new Object(fs.readFileSync(ataulLayout));
            let layoutJson = JSON.parse(layoutObject.toString());

            try {
                Log.addLog(`Acessando o Layout ${layoutJson["nome"]}`)
                for (let payload of layoutJson["payloads"] as []) {
                    const payloadFormated: any = executeParamJson(payload);

                    Log.addLog(`Solicitando Arquivo ${payloadFormated["name"]}`)
                    if (await gerarArquivoRemessa(payloadFormated as object, mgeSession as string)) {

                        let chaveArq: string | undefined = undefined;
                        try { chaveArq = payloadFormated["requestBody"]["param"]["chaveSessaoArquivo"]; } catch (error) { }

                        let documentTxt = await BApi.vizualizarArquivo(chaveArq);

                        const nameFile = payloadFormated["name"]

                        try {
                            Log.addLog(`Salvando arquivo ${nameFile}`)
                            ShipmentFile.saveShipmentFile(JSON.stringify(layoutJson), nameFile, documentTxt);
                        } catch (error) {
                            Log.addLogError(error as string);
                        }
                    };
                }
            } catch (error) {
                Log.addLogError(error as string);
            }
        }
    } catch (error) {
        Log.addLogError(error as string);
    }

    Log.saveLogs();
}