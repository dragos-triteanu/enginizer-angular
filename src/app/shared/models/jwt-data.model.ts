export class JWTUser {
    userId: string;
    jti: string;
    iss: string;
    sub: string;
    given_name: string;
    badgeId: string;
    role: string;
    permissions: string[] = [];
    exp: number;
    aud: string;
}
