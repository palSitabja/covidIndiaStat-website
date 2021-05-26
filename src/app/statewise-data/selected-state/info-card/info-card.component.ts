import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.css']
})
export class InfoCardComponent implements OnInit {
  @Input() cardHeading:string
  @Input() color:string
  @Input() icon:string
  @Input() strongText:string
  @Input() smallText:string
  constructor() { }

  ngOnInit(): void {
  }

}
