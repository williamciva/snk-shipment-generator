import Response from "../models/response";
import SessionLogin from "../models/sessionLogin";
import BApi from "./bapi";
import connection from './connection.json'



export default class Login extends SessionLogin{
    static login = async () => {
        const payload = {
            "serviceName": "MobileLoginSP.login",
            "requestBody": {
                "NOMUSU": {
                    "$": connection.user.toUpperCase()
                },
                "INTERNO": {
                    "$": connection.pass
                }
            }
        }
    
        const response: Response = await BApi.post("/mge/service.sbr", '?serviceName=MobileLoginSP.login', payload);
        if (response.getStatus() === "1") {
            const responseBody: object = response.getResponseBody();
              
            SessionLogin.setJsessionid((responseBody as any)["jsessionid"]["$"])
    
            return SessionLogin;
        }
        else {
            throw new Error(`Não foi possível fazer Login no ERP.\n
            Verifique o usuário e senha e tente novamente.`);
        }
    }
}
