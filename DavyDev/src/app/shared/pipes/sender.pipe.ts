//for transforming name of a message's author.
import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "sender"
})

export class SenderPipe implements PipeTransform {
    transform(name: string, self: string): string{
        let text="from ";
        
       text+=name===self ? 'me' : name
        //use ternary operator
        return text;
    }
}