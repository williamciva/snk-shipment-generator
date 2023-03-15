import Response from "../models/response";
import Workspace from "../models/workspace";
import BApi from "./bapi";

export default async (resourceID: string) => {
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
        const responseBody= JSON.parse((response.getResponseBody() as any)["json"]["$"]);

        return new Workspace(
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

    }
    else {
        throw new Error(`Não foi possível trocar para o Workspace
        resourceID = ${resourceID} \n
        statusMessage = ${response.getStatusMessage()}`);
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

