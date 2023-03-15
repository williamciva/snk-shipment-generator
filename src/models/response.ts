export default class Response{
    private status: string;
    private transactionId: string;
    private responseBody: object;
    private statusMessage: string;

    constructor(
        status: string,
        transactionId: string,
        responseBody: object,
        statusMessage: string = "sucess"
    ) {
        this.status = status;
        this.transactionId = transactionId;
        this.responseBody = responseBody;
        this.statusMessage = statusMessage;
    }

    public getStatus = () => this.status;
    public getTransactionId = () => this.transactionId;
    public getResponseBody = () => this.responseBody;
    public getStatusMessage = () => this.statusMessage;
}