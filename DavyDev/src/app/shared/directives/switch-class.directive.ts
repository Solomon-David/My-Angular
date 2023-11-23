import { Directive, ElementRef, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[switchclass]'
})


export class SwitchClassDirective implements OnInit, OnChanges {
  
  @Input() switchclass: boolean=true;
  @Input() truthy: string='';
  @Input() falsy: string='';


  constructor(private elem: ElementRef) {

   }

  switcher(){
    if(this.switchclass){
      this.elem.nativeElement.classList.remove(this.falsy);
      this.elem.nativeElement.classList.add(this.truthy);
    }
    else{
      this.elem.nativeElement.classList.remove(this.truthy);
      this.elem.nativeElement.classList.add(this.falsy);
    }
    
  }
  ngOnInit(): void {
    this.switcher();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.switcher();
  }
 
}
