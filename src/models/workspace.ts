export default class Workspace {
    private id: number;
    private resourceID: string;
    private descricao: string;
    private path: string;
    private onclick: string;
    private contexto: string;
    private temFilhos: string;
    private favorito: boolean;
    private visivel: boolean;
    private permiteBloquearControle: boolean;
    private variacaoDeTela: boolean;
    private onlyHtml5: boolean;
    private contemVazamentoDeDados: boolean;
    private controle: string;
    private adicional: boolean;
    private temPersonalizacao: boolean;
    private showInfoTelaPersonalizada: boolean;
    private descricaoOrig: string;
    private controlResourceID: string;
    private overrideControlResourceID: string;
    private jsessionid: string;

    constructor(
        id: number,
        resourceID: string,
        descricao: string,
        path: string,
        onclick: string,
        contexto: string,
        temFilhos: string,
        favorito: boolean,
        visivel: boolean,
        permiteBloquearControle: boolean,
        variacaoDeTela: boolean,
        onlyHtml5: boolean,
        contemVazamentoDeDados: boolean,
        controle: string,
        adicional: boolean,
        temPersonalizacao: boolean,
        showInfoTelaPersonalizada: boolean,
        descricaoOrig: string,
        controlResourceID: string,
        overrideControlResourceID: string,
        jsessionid: string
    ) {
        this.id = id
        this.resourceID = resourceID
        this.descricao = descricao
        this.path = path
        this.onclick = onclick
        this.contexto = contexto
        this.temFilhos = temFilhos
        this.favorito = favorito
        this.visivel = visivel
        this.permiteBloquearControle = permiteBloquearControle
        this.variacaoDeTela = variacaoDeTela
        this.onlyHtml5 = onlyHtml5
        this.contemVazamentoDeDados = contemVazamentoDeDados
        this.controle = controle
        this.adicional = adicional
        this.temPersonalizacao = temPersonalizacao
        this.showInfoTelaPersonalizada = showInfoTelaPersonalizada
        this.descricaoOrig = descricaoOrig
        this.controlResourceID = controlResourceID
        this.overrideControlResourceID = overrideControlResourceID
        this.jsessionid = jsessionid;
    }

    public getId = () => this.id;
    public getResourceID = () => this.resourceID;
    public getDescricao = () => this.descricao;
    public getPath = () => this.path;
    public getOnclick = () => this.onclick;
    public getContexto = () => this.contexto;
    public getTemFilhos = () => this.temFilhos;
    public getFavorito = () => this.favorito;
    public getVisivel = () => this.visivel;
    public getPermiteBloquearControle = () => this.permiteBloquearControle;
    public getVariacaoDeTela = () => this.variacaoDeTela;
    public getOnlyHtml5 = () => this.onlyHtml5;
    public getContemVazamentoDeDados = () => this.contemVazamentoDeDados;
    public getControle = () => this.controle;
    public getAdicional = () => this.adicional;
    public getTemPersonalizacao = () => this.temPersonalizacao;
    public getShowInfoTelaPersonalizada = () => this.showInfoTelaPersonalizada;
    public getDescricaoOrig = () => this.descricaoOrig;
    public getControlResourceID = () => this.controlResourceID;
    public getOverrideControlResourceID = () => this.overrideControlResourceID;
    public getJsessionid = () => this.jsessionid;
}