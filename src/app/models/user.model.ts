export class User{
    public uid      ?: string;
    public email    ?: string;
    public username ?: string;
    public password ?: string;
    public status   ?: string;

    constructor( uid?: string, email?: string, username?: string, password?: string, status?: string ){
        this.uid      = uid;
        this.email    = email;
        this.username = username;
        this.password = password;
        this.status   = status;
    }

    // _getters
    public getId(): string{
        return this.uid;
    }

    public getEmail(): string{
        return this.email;
    }

    public getUsername(): string{
        return this.username;
    }

    public getPassword(): string{
        return this.password;
    }

    public getStatus(): string{
        return this.status
    }

    // _setters
    public setId(uid: string){
        this.uid = uid;
    }

    public setEmail(email: string){
        this.email = email;
    }

    public setUsername(username: string){
        this.username = username;
    }

    public setPassword(password: string){
        this.password = password;
    }

    public setStatus(status: string){
        this.status = status;
    }
}