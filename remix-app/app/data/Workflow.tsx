export class Workflow {
    name: string;
    description: string;
    contents: string;
    pin: boolean;
  
    constructor(name: string, description: string, contents: string, pin: boolean) {
      this.name = name;
      this.description = description;
      this.contents = contents;
      this.pin = pin;
    }
  }