"use strict";

//Class User declaration
class User {
  constructor(
    firstName,
    lastName,
    username,
    password,

    pageSize = 10,
    category = "sports"
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.username = username;
    this.password = password;

    this.pageSize = pageSize;
    this.category = category;
  }
}

//Class Task declaration
class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
