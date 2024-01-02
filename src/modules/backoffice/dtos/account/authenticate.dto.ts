export class AuthenticateDto {
    readonly username: string;
    readonly password: string;

    constructor(username: string, password: string) {
        this.username = username;
        this.password = password;
    }

}