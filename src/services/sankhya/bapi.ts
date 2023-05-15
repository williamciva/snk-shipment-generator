import axios from 'axios';
import Response from '@/models/response';
import SessionLogin from '@/models/sessionLogin';
import Log from '@/utils/log';
const args = require('minimist')(process.argv.slice(2),
    {
        alias: {
            s: 'server',
            a: 'attempts'
        }
    });


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
        let attempts: number;
        try { attempts = args.attempts === undefined ? 1 : Number(args.attempts);}
        catch (error) { attempts = 1 }


        for (let i = 0; i < attempts; i++) {
            try {
                const url = new URL(`${args.server}${path}${paramns}&outputType=json`)
                const request = await axios.post(url.toString(), payload, BApi.getHeaders())
                const response = request.data;
                
                return new Response(response["status"], response["transactionId"], response["responseBody"], response["statusMessage"]);
            } catch (error) {
                Log.addLogError(`${error}`);
                Log.addLog("Tentanto Novamente...")
            }
        }

        throw new Error("Não foi possível estabelecer a conexão com o servidor.");
    }

    static vizualizarArquivo = async (chaveArquivo: string = "ARQUIVO_REMESSA_EDI") => {
        let attempts: number;
        try { attempts = args.attempts === undefined ? 1 : Number(args.attempts); }
        catch (error) { attempts = 1 }

        for (let i = 0; i < attempts; i++) {
            try {
                const url = new URL(`${args.server}/mge/visualizadorArquivos.mge?hidemail=S&download=S&chaveArquivo=ARQUIVO_REMESSA_EDI`)
                const request = await axios.post(url.toString(), {}, BApi.getHeaders())
                return request.data;
            } catch (error) {
                Log.addLogError(`${error}`);
            }
        }

        throw new Error("Não foi possível estabelecer a conexão com o servidor.");
    }


}