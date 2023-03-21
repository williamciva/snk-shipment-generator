import Response from "../models/response";
import Workspace from "../models/workspace";
import Log from "../utils/log";
import log from "../utils/log";
import BApi from "./bapi";

export default async (resourceID: string): Promise<Workspace | undefined> => {
    try {
        log.addLog("Realizando Login no MGE...");

        const payload = {
            "serviceName": "WorkspaceSP.openItemMenu",
            "requestBody": {
                "itemMenu": {
                    "resourceID": resourceID
                }
            }
        }

        const response: Response = await BApi.post("/mge/service.sbr", '?serviceName=WorkspaceSP.openItemMenu', payload);
        if (response.getStatus() === "1") {
            const responseBody = JSON.parse((response.getResponseBody() as any)["json"]["$"]);


            const workspace = new Workspace(
                responseBody["id"],
                responseBody["resourceID"],
                responseBody["descricao"],
                responseBody["path"],
                responseBody["onclick"],
                responseBody["contexto"],
                responseBody["temFilhos"],
                responseBody["favorito"],
                responseBody["visivel"],
                responseBody["permiteBloquearControle"],
                responseBody["variacaoDeTela"],
                responseBody["onlyHtml5"],
                responseBody["contemVazamentoDeDados"],
                responseBody["controle"],
                responseBody["adicional"],
                responseBody["temPersonalizacao"],
                responseBody["showInfoTelaPersonalizada"],
                responseBody["descricaoOrig"],
                responseBody["controlResourceID"],
                responseBody["overrideControlResourceID"],
                getParameterByName("mgeSession", responseBody["onclick"])
            );

            log.addLog("Login no MGE Realizado.");
            return workspace

        }
        else {
            const erro = `Não foi possível trocar para o Workspace\n* resourceID = ${resourceID}\n* statusMessage = ${response.getStatusMessage()}`;
            throw new Error(erro);
        }

    } catch (error) {
        log.addLogError(error as string);
        throw new Error("Ocorreram erros durante o login no MGE...\nNão foi possível completa-lo!");
    }

}

const getParameterByName = (name: string, url: string): string => {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return "";
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

