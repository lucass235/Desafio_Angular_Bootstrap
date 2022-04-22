import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ab-control-error',
  templateUrl: './control-error.component.html',
  styleUrls: ['./control-error.component.css'],
})
export class ControlErrorComponent implements OnInit {
  @Input() label?: string;
  @Input() errorMessage?: string;

  constructor() {}

  ngOnInit(): void {}
}
