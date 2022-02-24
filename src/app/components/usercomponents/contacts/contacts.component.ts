import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl,  Validators } from '@angular/forms';
import { AuthStateService } from 'src/app/services/state/auth-state.service';
import { TokenService } from 'src/app/services/token/token.service';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  useriD:any = this.token.getUserid();
contactForm= new FormGroup({
  user_id: new FormControl( this.useriD ,[Validators.required]),
  firstname: new FormControl('',[Validators.required]),
  lastname: new FormControl('', Validators.required),
  email: new FormControl('', [Validators.required, Validators.email]),
  company:new FormControl('', Validators.required),
})
get user_id() { return this.contactForm.get('user_id');}
get firstname() { return this.contactForm.get('firstname');}
get lastname() { return this.contactForm.get('lastname');}
get email() { return this.contactForm.get('email');}
get company() { return this.contactForm.get('company'); }


contacts: any;
closeResult: string;
  constructor( 
    private modalService: NgbModal,
    private token:TokenService,
    private auth: AuthService) { 

    // this.auth.contactUsers().subscribe((data:any)=>{
    //   console.log(data);
    //   this.contacts= data;
    // })
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
}


getAllContact(){
  this.auth.contactUsers().subscribe((data:any)=>{
    console.log(data);
    this.contacts= data;
  
  })
}






}





  // getContact(){
  //   this.auth.contactUsers().
  //   subscribe((data:any)=>{
  //     this.contacts = data;
  //   })
  // }

 