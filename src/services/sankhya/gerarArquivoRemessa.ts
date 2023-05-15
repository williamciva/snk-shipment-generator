import Log from "../utils/log"
import BApi from "./bapi"

export default async (payload: object, mgeSession: string) => {
    const result = await BApi.post(
        "/mgecom/service.sbr",
        `?serviceName=IntercambioEletronicoDadosSP.gerarArquivoRemessa&outputType=json&mgeSession=${mgeSession}`,
        payload
    )
    if(result.getStatus() === "1"){
        return true
    } else {
        Log.addLogError( `Error: ${result.getStatusMessage()}` );
        return false
    }
}