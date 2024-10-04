import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { EvenService } from './services/even.service';
interface Field {
  label: string;
  type: string;
  value: string;
}
interface FormData {
  name: string;
  email: string;
  fields: Field[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  dynamicForm: FormGroup;
  savedData: FormData[] = [];
  constructor(private fb: FormBuilder, private sevice: EvenService) {

    this.dynamicForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.email, Validators.required]],
      number: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      fields: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.loadFormData();
    this.sevice.observerName.subscribe((data) => {
      console.log(data);
    })
  }

  get fields() {
    return this.dynamicForm.get('fields') as FormArray;
  }


  addField() {
    const newField = this.fb.group({
      label: ['', Validators.required],
      type: ['text', Validators.required],
      value: ['', Validators.required]
    });
    this.fields.push(newField);
  }

  removeField(index: number) {
    (this.dynamicForm.get('fields') as FormArray).removeAt(index)
    this.fields.removeAt(index);
  }



  submit() {
    const formData = this.dynamicForm.value;
    const existingData = localStorage.getItem('formData');
    const formDataArray = existingData ? JSON.parse(existingData) : [];
    formDataArray.push(formData);
    localStorage.setItem('formData', JSON.stringify(formDataArray));
    this.loadFormData();
    this.dynamicForm.reset();
    this.fields.clear();
  }

  loadFormData() {
    const data = localStorage.getItem('formData');
    if (data) {
      this.savedData = JSON.parse(data);
    }
  }


}


//[1,2,3,4,5]