export class OrderProduct {

    constructor(
        public pedidoNumero?: number,
        public observacao?: string,
        public quantidade?: number,
        public produtoId?: number,
        public clientEmail?: number,
        public nomeProduto?: string,
        public cnpj?: string) {
    }
}