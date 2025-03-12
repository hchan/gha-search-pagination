export class Workflow {
    filename: string;
    name: string;
    description: string;
    contents: string;
    pin: boolean;
  
    constructor(filename: string, name: string, description: string, contents: string, pin: boolean) {
      this.filename = filename;
      this.name = name;
      this.description = description;
      this.contents = contents;
      this.pin = pin;
    }
  }