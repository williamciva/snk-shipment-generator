import Log from "../utils/log";

export default (payload: object): object => {
    try {
        let newParams: Object[] = []

        try {
            const parametros = (payload as any)["requestBody"]["param"]["parametros"];
            
            Log.addLog("Calculando Parâmetros...")

            for (const param of parametros["param"]) {
                let newParam = param;
                (newParam["$"]) = eval(param["$"])

                newParams.push(newParam)
            }

            (payload as any)["requestBody"]["param"]["parametros"]["param"] = newParams;

            return payload

        } catch (error) {
            return payload;
        }
    } catch (error) {
        Log.addLogError(error as string)
        return payload;
    }
}