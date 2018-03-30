export class Company {

    public id: number;
    public name: string;

    constructor(externalCompany: any = {}) {
        this.id = externalCompany.id;
        this.name = externalCompany.name || '';
    }


    get type() {
        return 'company';
    }
}
