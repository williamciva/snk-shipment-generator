export default class CadastroArquivoRemessa {
    private codigo: number;
    private titulo: string;
    private codpai: number;
    private filhos: Array<CadastroArquivoRemessa> = [];

    constructor(codigo: number, titulo: string, codpai: number) {
        this.codigo = +codigo;
        this.titulo = titulo;
        this.codpai = +codpai;
    }

    getCodigo = () => this.codigo;
    getTitulo = () => this.titulo;
    getCodpai = () => this.codpai;

    addFilho = (filho: CadastroArquivoRemessa) => this.filhos.push(filho);
    getFilhos = () => this.filhos;

    getChoices = (): object[] => {
        return [{
            title: `${this.codigo} - ${this.titulo}`,
            value: this.codigo
        }];
    }

    private getListFilhos = (): object[] => {
        let filhos: object[] = []
        if (this.filhos.length = 0) {
            return [new Object()]
        }
        else {
            this.filhos.forEach((e) => filhos.push({
                title: `  **  ${e.getTitulo()}`,
                value: e.getCodigo()
            }))
        }
        return filhos;
    }
}