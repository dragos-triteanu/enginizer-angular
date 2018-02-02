export class UserRole {

    public id: number;
    public inUse: boolean;
    public name: string;
    public isOob: boolean;
    public permissions: any[];

    constructor(role: any = {}) {
        this.id = role.id;
        this.name = role.name || '';
        this.inUse = role.inUse;
        this.isOob = role.isOob;
        this.permissions = role.permissions || [];
    }


    get type() {
        return 'role';
    }
}
