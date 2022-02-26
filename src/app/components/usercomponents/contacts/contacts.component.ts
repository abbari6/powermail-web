import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl,  Validators, FormBuilder } from '@angular/forms';
import { AuthStateService } from 'src/app/services/state/auth-state.service';
import { TokenService } from 'src/app/services/token/token.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ContactModel } from './contacts.model';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})

export class ContactsComponent implements OnInit {
  useriD:any = this.token.getUserid();
  totalLength:any;
  page:number=1;
  contactForm !: FormGroup;
  contactModelObj : ContactModel = new ContactModel();

get user_id() { return this.contactForm.get('user_id');}
get firstname() { return this.contactForm.get('firstname');}
get lastname() { return this.contactForm.get('lastname');}
get email() { return this.contactForm.get('email');}
get company() { return this.contactForm.get('company'); }

formValue !: FormGroup;
contacts: any;
closeResult: string;

  constructor( 
    private modalService: NgbModal,
    private token:TokenService,
    private auth: AuthService,
    private formbuilder: FormBuilder) { 

   
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

addContact()
{
  console.log(this.contactForm.value);
  this.auth.addContact(this.contactForm.value)
  .subscribe(
    result=> {
      console.log(result);
      alert('contact added successfully')
            this.contactForm.reset();

      this.getAllContact();
    },
    
    ()=>
     {
       this.contactForm.reset()
     }
  )
}

ngOnInit(): void {
  
this.getAllContact();
this.contactForm= this.formbuilder.group({
  user_id: new FormControl( this.useriD ,[Validators.required]),
  firstname: new FormControl('',[Validators.required]),
  
  lastname: new FormControl('', Validators.required),
  email: new FormControl('', [Validators.required, Validators.email]),
  company:new FormControl('', Validators.required),
  
})
}


getAllContact(){
  this.auth.contactUsers().subscribe((data:any)=>{
    this.totalLength= data.length;
    console.log(data);
    this.contacts= data;
  
  })
}

onEdit(con: any){
 // this.showAdd=false;
 // this.showUpdate= true;
  // this.contactModelObj = emp.id;
  this.formValue.controls['firstName'].setValue(con.firstname);
  this.formValue.controls['lastName'].setValue(con.lastname);
  this.formValue.controls['email'].setValue(con.email);
  this.formValue.controls['contact'].setValue(con.contact);
}




}





 
 