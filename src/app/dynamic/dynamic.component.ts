import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dynamic',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.css']
})
export class DynamicComponent implements OnInit {
  dynamicForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.dynamicForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      additionalFields: this.formBuilder.array([]) 
    });
  }

  get additionalFields(): FormArray {
    return this.dynamicForm.get('additionalFields') as FormArray;
  }

  addField() {
    const newField = this.formBuilder.group({
      name: ['', Validators.required], 
      value: ['', Validators.required]  
    });
    this.additionalFields.push(newField);
  }

  removeField(index: number) {
    this.additionalFields.removeAt(index);
  }

  onSubmit() {
    if (this.dynamicForm.valid) {
      console.log('Form Submitted', this.dynamicForm.value);
      this.dynamicForm.reset(); 
    }
  }
}
