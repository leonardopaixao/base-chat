export class Channel{

    public uid      ?: string;
    public guest    ?: string;
    public owner    ?: string;
    public status   ?: string;
    public messages ?: string;

    constructor( uid ?: string, guest ?: string, owner ?: string, status ?: string, messages ?: string ){
        this.uid      = uid;
        this.guest    = guest;
        this.owner    = owner;
        this.status   = status;
        this.messages = messages;
    }

    // _getters
    public getId():string{
        return this.uid;
    }

    public getGuest():string{
        return this.guest;
    }

    public getOwner():string{
        return this.owner;
    }

    public getStatus():string{
        return this.status;
    }

    public getMessages():string{
        return this.messages;
    }

    // _setters
    public setGuest(guest: string):void{
        this.guest = guest;
    }

    public setStatus(status: string):void{
        this.status = status;
    }
}