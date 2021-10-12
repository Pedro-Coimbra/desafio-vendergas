export class OrderProduct {

    constructor(
        public pedidoNumero?: number,
        public observacao?: string,
        public quantidade?: number,
        public produtoId?: number,
        public emailCliente?: string,
        public nomeCliente?: string,
        public nomeProduto?: string,
        public produtos?: any[],
        public dataPedido?: Date,
        public cnpj?: string) {
    }
}