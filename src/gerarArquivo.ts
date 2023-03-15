import fs from 'fs'
import path from 'path';
import BApi from './services/bapi';
import gerarArquivoRemessa from './services/gerarArquivoRemessa';
import Login from './services/login';
import loginWorkspaceSP from './services/loginWorkspaceSP';
import Workspace from './models/workspace';


export default async () => {
    var atualLayout: string | null = null;

    try {
        await Login.login();
        console.log("Login Realizados com Sucesso!!")
        const workspace: Workspace = await loginWorkspaceSP("br.com.sankhya.edi.geracao.arquivo.remessa")
        const mgeSession = workspace.getJsessionid();
        console.log("Login no MGE realizado com sucesso!!")

        const localLayouts = path.join(__dirname, '..', 'db', 'layouts');
        const layouts = fs.readdirSync(localLayouts);

        layouts.forEach(async (e) => {
            console.log(e)
            let layoutObject = new Object(fs.readFileSync(path.join(localLayouts, e)));
            let layoutJson = JSON.parse(layoutObject.toString());

            (layoutJson["payloads"] as []).forEach(async (e) => {
                if (await gerarArquivoRemessa(e as object, mgeSession)) {
                    atualLayout = await layoutJson["nome"];
                    
                    let chaveArq = null;
                    try { chaveArq = layoutJson["payloads"]["requestBody"]["param"]["chaveSessaoArquivo"]; } catch (error) { }

                    let documentHtml = await BApi.vizualizarArquivo(chaveArq);
                    
                    try {
                        const localTemp = path.join(__dirname, '..', 'temp')
                        fs.mkdir(localTemp, () => {
                            fs.mkdir(path.join(localTemp, atualLayout === null ? "" : atualLayout), () => {
                                fs.writeFileSync(path.join(localTemp, atualLayout === null ? "" : atualLayout, `${e["name"]}.txt`), documentHtml)
                            });
                        });
                    } catch (error) {
                        makeLog(error, atualLayout);
                    }
                    console.log("Aquivo Remessa Recebido!")
                };
            })
            atualLayout = null;
        })
    } catch (error) {
        makeLog(error, atualLayout);
    }
}

const makeLog = (error: unknown, atualLayout: string | null) => {
    let nomeArquivo = `${new Date().toLocaleDateString().split("/").join("_")}___${new Date().toLocaleTimeString().split(":").join("_")}.log`
    let localLog = path.join(__dirname, '..', 'logs');

    fs.mkdir(localLog, () => {
        let localLogLayout = path.join(__dirname, '..', 'logs', atualLayout === null ? "" : atualLayout);
        fs.mkdir(localLogLayout, () => {
            fs.writeFileSync(path.join(localLogLayout, nomeArquivo), (error as any).toString())
        });
    });
}