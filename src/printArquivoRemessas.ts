import CadastroArquivoRemessa from "./models/cadastroArquivoRemessa";
import BApi from "./services/bapi";
import Login from "./services/login";
import loginWorkspaceSP from "./services/loginWorkspaceSP";
import prompts, { Choice } from 'prompts';

let listArquivos = Array<CadastroArquivoRemessa>();
let mgeSession: string;


export default async () => {
    await Login.login();
    mgeSession = (await loginWorkspaceSP("br.com.sankhya.edi.geracao.arquivo.remessa")).getJsessionid();

    const response = await prompts([
        {
            type: 'multiselect',
            name: 'agendar_arquivos',
            message: 'Selecione quais arquivos de remessa você deseja agendar:',
            choices: (await getListArquivos() as any) as Choice[]
        }
    ]);

    console.log(response);
}


const getListArquivos = async () => {
    let payload = {
        "serviceName": "DatasetSP.loadRecords",
        "requestBody": {
            "dataSetID": "001",
            "entityName": "FormatadorRemessa",
            "standAlone": false,
            "includePresentationFields": "S",
            "fields": [
                "CODIGO",
                "TITULO",
                "CODPAI"
            ],
            "tryJoinedFields": true,
            "parallelLoader": false,
            "crudListener": "br.com.sankhya.modelcore.crudlisteners.HierarchyCrudListener",
            "criteria": {
                "expression": "(this.MODULO = 'C' and this.ATIVO = 'S' AND CODPAI = -999999999)",
                "parameters": []
            },
            "ignoreListenerMethods": "",
            "useDefaultRowsLimit": true
        }
    };

    const response = await BApi.post("/mge/service.sbr",
        `?serviceName=DatasetSP.loadRecords&mgeSession=${mgeSession}`,
        payload);

    const result = ((response.getResponseBody() as any)["result"]) as string[][];

    result.forEach((e, i) => {
        let arquivo: CadastroArquivoRemessa = new CadastroArquivoRemessa((e[0] as any) as number, e[1], (e[2] as any) as number)
        listArquivos.push(arquivo)
    })
    listArquivos.sort((a, b) => {
        if (a.getCodigo() < b.getCodigo()) {
            return -1
        }
        if (a.getCodigo() > b.getCodigo()) {
            return 1
        }
        return 0
    })

    listArquivos.forEach((e,i)=>{
        if (e.getCodpai() != -999999999){
            listArquivos.forEach((f)=>{
                if (f.getCodigo() === e.getCodpai()){
                    f.addFilho(e);
                    listArquivos.slice(i,i);
                }
            })
        }
    })
    

    let returnedvalue: object[] = [];

    listArquivos.forEach((e)=>{
        e.getChoices().forEach((i)=>returnedvalue.push(i))
    })

    return returnedvalue;
}