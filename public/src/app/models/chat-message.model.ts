export class ChatMessage{
    public $key     ?: string;
    public email    ?: string;
    public username ?: string;
    public message  ?: string;
    public timeSent ?: string;

    constructor( email?: string, username?: string, message?: string, timeSent?: string ){
        this.email    = email;
        this.message  = message;
        this.timeSent = timeSent;
        this.username = username;
    }

    // _getters
    public getEmail(): string{
        return this.email;
    }

    public getUserName(): string{
        return this.username;
    }

    public getMessage(): string{
        return this.message;
    }

    public getTimeSent(): string{
        return this.timeSent;
    }

    // _setters
    public setEmail(email: string): void{
        this.email = email;
    }

    public setUserName(username: string): void{
        this.username = username;
    }

    public setMessage(message: string): void{
        this.message = message;
    }
}