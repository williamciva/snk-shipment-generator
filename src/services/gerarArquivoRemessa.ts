import BApi from "./bapi"

export default async (payload: object, mgeSession: string) => {
    const result = await BApi.post(
        "/mgecom/service.sbr",
        `?serviceName=IntercambioEletronicoDadosSP.gerarArquivoRemessa&outputType=json&mgeSession=${mgeSession}`,
        payload
    )
    
    return result.getStatus() === "1" ? true : false
}