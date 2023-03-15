import axios from 'axios';
import Response from '../models/response';
import SessionLogin from '../models/sessionLogin';
import connection from './connection.json';


export default class BApi {

    private static getHeaders = (): object => {
        const jsessionid = SessionLogin.getJsessionid();

        let head = {
            headers: {
                Cookie: `${jsessionid !== undefined ? `JSESSIONID=${SessionLogin.getJsessionid()}` : ""}`
            }
        };
        return head;
    }

    static post = async (path: string, paramns: string, payload: object) => {
        try {
            const url = new URL(`${connection.server}${path}${paramns}&outputType=json`)
            const request = await axios.post(url.toString(), payload, BApi.getHeaders())
            const response = request.data;
            console.log(response)
            return new Response(response["status"], response["transactionId"], response["responseBody"], response["statusMessage"]);
        } catch (error) {
            throw new Error(`Não foi possível estabelecer a conexão com o servidor.\n\n${error}`);

        }
    }

    static vizualizarArquivo = async (chaveArquivo: string = "ARQUIVO_REMESSA_EDI") => {

        try {
            const url = new URL(`${connection.server}/mge/visualizadorArquivos.mge?hidemail=S&download=S&chaveArquivo=ARQUIVO_REMESSA_EDI`)
            const request = await axios.post(url.toString(), {}, BApi.getHeaders())
            return request.data;
        } catch (error) {
            throw new Error(`Não foi possível estabelecer a conexão com o servidor.\n\n${error}`);

        }
    }


}