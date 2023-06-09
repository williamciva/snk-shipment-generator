import Response from "../models/response";
import SessionLogin from "../models/sessionLogin";
import Log from "../utils/log";
import log from "../utils/log";
import BApi from "./bapi";
const args = require('minimist')(process.argv.slice(2),
    {
        alias: {
            u: 'user',
            p: 'password',
            s: 'server',
            l: 'log',
            v: 'verbose'
        }
    });



export default class Login extends SessionLogin {
    static login = async () => {
        try {
            log.addLog("Realizando Login...")

            const payload = {
                "serviceName": "MobileLoginSP.login",
                "requestBody": {
                    "NOMUSU": {
                        "$": args.user.toUpperCase()
                    },
                    "INTERNO": {
                        "$": args.password
                    }
                }
            }

            const response: Response = await BApi.post("/mge/service.sbr", '?serviceName=MobileLoginSP.login', payload);
            if (response.getStatus() === "1") {
                const responseBody: object = response.getResponseBody();

                SessionLogin.setJsessionid((responseBody as any)["jsessionid"]["$"])

                log.addLog("Login Realizado.")
                return SessionLogin;
            }

            else {
                throw new Error(response.getStatusMessage());
            }
        } catch (error) {
            log.addLogError(`${error}`)
            throw new Error("Ocorreram erros durante o login...");
        }
    }
}
