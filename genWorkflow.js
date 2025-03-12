const fs = require('fs');

// Function to generate random name and description
const generateRandomText = (length) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

// Function to create workflow YAML file
const createWorkflowFile = (index) => {
  const randomName = generateRandomText(10); // Random name
  const randomDescription = generateRandomText(20); // Random description

  const workflowContent = `
name: ${randomName} Workflow
description: This is a simple workflow ${randomDescription}
on:
  push:
    branches:
      - main
    paths: 
      - .github/workflows/workflow${index}.yml
  workflow_dispatch:

jobs:
  hello_world_job:
    runs-on: ubuntu-latest

    steps:
    - name: Say Hello
      run: echo "From workflow${index}.yml" >> $GITHUB_STEP_SUMMARY
`;

  fs.writeFileSync(`workflow${index}.yml`, workflowContent);
};

// Generate workflow2.yml to workflow100.yml
for (let i = 1; i <= 100; i++) {
  createWorkflowFile(i);
}

console.log("Workflow files generated!");
