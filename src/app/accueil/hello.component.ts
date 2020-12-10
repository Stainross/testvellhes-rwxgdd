import { Component, Input } from "@angular/core";

@Component({
  selector: "hello",
  template: `
    <p>Nova:{{ novaGroup }} Nutri:{{ nutriScore }}</p>
    <img src="{{ imageUrl }}" />
    <h1>{{ name }}</h1>
  `,
  styles: [
    `
      h1 {
        font-family: Lato;
      }
    `
  ]
})
export class HelloComponent {
  @Input() name: string;
  @Input() novaGroup: string;
  @Input() imageUrl: string;
  @Input() nutriScore: string;
}
