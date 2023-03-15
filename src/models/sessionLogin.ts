
export default class SessionLogin {
    private static jsessionid: string;
    private static idusu: string;

    protected static setJsessionid = (jsessionid: string) => SessionLogin.jsessionid = jsessionid;
    public static getJsessionid = (): string => SessionLogin.jsessionid;

    protected static setIdusu = (idusu: string) => SessionLogin.idusu = idusu;
    static getIdusu = (): string => SessionLogin.idusu;
}