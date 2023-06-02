import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mongodb',
  templateUrl: './mongodb.component.html',
  styleUrls: ['./mongodb.component.css']
})
export class MongodbComponent implements OnInit {

  code= `// Defining the user schema
  const userSchema = new mongoose.Schema({
      username: {
          type: String,
          required: true,
          unique: true,
          trim: true
      },
      password: {
          type: String,
          required: true,
          select: false 
      },
      email: {
          type: String,
          required: true,
          unique: true,
          trim: true
      }
  });

  // Creating the User model from the schema
  const User = mongoose.model("User", userSchema);

  // Exporting the User model
  module.exports = User;`


  constructor() { }

  ngOnInit(): void {
  }

}
