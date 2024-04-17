import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Usuario{
  nombre: string;
  correo: string;
  password: string;
}

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent implements OnInit {
  formularioCreado: FormGroup;
  esNuevo:boolean = true;
  posicionRel:number = -1;


  usuarios: Array<Usuario>  = new Array<Usuario>();
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.usuarios.push({
      nombre: 'Antoni',
      correo: 'Anto@gmail.com',
      password: '12345678'

    },
    {
      nombre: 'Sofia',
      correo: 'Sofia@gmail.com',
      password: '12345678'
    },
    {
      nombre: 'Soni',
      correo: 'Soni@gmail.com',
      password: '12345678'
    }
  );
    this.crearFormulario();

  }

  crearFormulario(){
    this.formularioCreado = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['',Validators.compose([
        Validators.required, Validators.email
      ])],
      password: ['', Validators.compose([
        Validators.required, Validators.minLength(8)
      ])]
    })
  }

  agregar(){
    this.usuarios.push(this.formularioCreado.value as Usuario);
    this.formularioCreado.reset();
    //console.log(this.formularioCreado.value);
  }

  

  editarUsuario(posicion: number){
    
    //this.formularioCreado.patchValue({ nombre: this.usuarios[posicion].nombre });
    //this.formularioCreado.patchValue({ correo: this.usuarios[posicion].correo });
    //this.formularioCreado.patchValue({ password: this.usuarios[posicion].password });

    this.formularioCreado.setValue({
      nombre:   this.usuarios[posicion].nombre,
      correo:   this.usuarios[posicion].correo,
      password: this.usuarios[posicion].password
    })


    this.esNuevo = false;
    this.posicionRel = posicion;
    //this.usuarios[posicion].nombre = 'Anto';
    //this.usuarios[posicion].correo = 'Anto@gmail.com';
    //this.usuarios[posicion].password = '12345678';
    console.log(this.formularioCreado.controls);

  }


  editar(){
    this.usuarios[this.posicionRel].nombre = this.formularioCreado.value.nombre;
    this.usuarios[this.posicionRel].correo = this.formularioCreado.value.correo;
    this.usuarios[this.posicionRel].password = this.formularioCreado.value.password;
    this.formularioCreado.reset();
    this.esNuevo = true;
    this.posicionRel = -1;
  }


  eliminarrUsuario(posicion: number){
      this.usuarios.splice(posicion,1)
      this.formularioCreado.reset();
      this.esNuevo = true;
  }

}
