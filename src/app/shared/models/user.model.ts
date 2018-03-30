import { UserRole } from "@models/role.model";

export class User {

    public id: number;
    public firstName: string;
    public lastName: string;
    public password: string;
    public badgeId: string;
    public email: string;
    public role: UserRole;
    public isActive: boolean;
    public name: string;

    private resultIndex: number;

    get index() {
        return this.resultIndex;
    }

    set index(resultIndex) {
        this.resultIndex = resultIndex;
    }

    get fullName() {
        if (!this.firstName && !this.lastName) {
            return null;
        }
        return `${this.firstName} ${this.lastName}`;
    }

    get roleName() {
        return this.role ? this.role.name : '-';
    }

    get roleId() {
        return this.role ? this.role.id : null;
    }

    constructor(user: any = {}) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.badgeId = user.badgeId;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role ? new UserRole(user.role) : null;
        this.isActive = user.isActive;
        this.name = user.name;
    }

    get type() {
        return 'user';
    }
}
