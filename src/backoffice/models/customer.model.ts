export class Customer {
    constructor(        
        public name: string,
        public document: string,
        public email: string,
        public password: string,
        public active: boolean
    ) {}
}