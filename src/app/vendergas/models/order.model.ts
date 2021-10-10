export class Order {

    constructor(
        public idPedido?: number,
        public observacao?: string,
        public quantidade?: number,
        public produtoId?: number,
        public emailCliente?: string,
        public cnpj?: string) {
    }
}