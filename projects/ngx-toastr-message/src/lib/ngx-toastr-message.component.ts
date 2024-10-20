import { Component, inject, OnInit } from '@angular/core';
import {
  NgxToastrMessageService,
  ToasterMessage,
} from './ngx-toastr-message.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-ngx-toastr-message',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toaster-container">
      @for (message of messages; track message) {
      <div
        [ngClass]="message.type"
        [style.fontSize.px]="message.options?.fontSize"
        class="toaster-message"
      >
        {{ message.message }}
      </div>
      }
    </div>
  `,
  styles: `
  .toaster-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}

.toaster-message {
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
  color: white;
}

.success {
  background-color: green;
}

.error {
  background-color: red;
}

.info {
  background-color: blue;
}

.warning {
  background-color: orange;
}
`,
})
export class NgxToastrMessageComponent implements OnInit {
  messages: ToasterMessage[] = [];
  private ngxToastrMessageService = inject(NgxToastrMessageService);

  ngOnInit(): void {
    this.ngxToastrMessageService.messages$.subscribe((message) => {
      this.messages.push(message);
      setTimeout(() => this.removeMessage(message), 3000);
    });
  }

  removeMessage(message: ToasterMessage) {
    this.messages = this.messages.filter((m) => m !== message);
  }
}
