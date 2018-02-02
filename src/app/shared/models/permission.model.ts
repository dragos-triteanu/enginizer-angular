export class Permission {

    public id: number;
    public name: string;

    constructor(perm: any = {}) {
        this.id = perm.id;
        this.name = perm.code;
    }

    get type() {
        return 'permission';
    }
}

