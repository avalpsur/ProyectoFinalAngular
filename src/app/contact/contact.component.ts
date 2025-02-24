import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  correoEnviado = false;
  errorEnvio = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      from_name: ['', [Validators.required, Validators.minLength(3)]], 
      reply_to: ['', [Validators.required, Validators.email]],         
      mensaje: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  enviarCorreo() {
    const serviceID = 'service_5bfc2qp';        
    const templateID = 'template_93xe7fg';   
    const publicKey = 'RZXVvA9pH_vsN3PB-';    

    if (this.contactForm.valid) {
      emailjs.send(serviceID, templateID, this.contactForm.value, publicKey)
        .then(() => {
          console.log('¡Correo enviado con éxito!');
          this.correoEnviado = true;
          this.errorEnvio = false;
          this.contactForm.reset();
        })
        .catch((error) => {
          console.error('Error al enviar el correo:', error);
          this.correoEnviado = false;
          this.errorEnvio = true;
        });
    }
  }
}
