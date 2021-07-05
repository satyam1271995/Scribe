  
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { schema } from 'ngx-editor';
import { DOMSerializer } from "prosemirror-model";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  editorConfig: any;
  title: string;
  content: string;
  @Output('postCreated') postCreated = new EventEmitter();

  constructor() {
    
  }

  ngOnInit() {
  }

  createPost(){

    let contentNode = schema.nodeFromJSON(this.content);
let html: DocumentFragment = DOMSerializer.fromSchema(schema).serializeFragment(contentNode.content);

firebase.firestore().collection("posts").add({
      title: this.title,
      content: html.textContent, //add this
      owner: firebase.auth().currentUser.uid,
      created: firebase.firestore.FieldValue.serverTimestamp()
    }).then((data) => {
      console.log(data);
      this.postCreated.emit();
    }).catch((error) => {
      console.log(error);
    });

  }

}