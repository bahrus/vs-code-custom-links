# vs-code-custom-links

## Features

Custom Attribute Configuration: Add any attributes you want through VS Code settings
Ctrl+Click Navigation: Works on all configured attributes plus built-in src and href
Supports Multiple Link Types:

ID references (#my-id) - jumps to that element in the document
External URLs (http://, https://)
Relative file paths



## Setup Instructions

Create a new folder for your extension (e.g., custom-link-attributes)
Create the following file structure:

   custom-link-attributes/
   ├── src/
   │   └── extension.ts    (first artifact)
   ├── package.json        (second artifact)
   └── tsconfig.json       (third artifact)

Open terminal in the extension folder and run:

bash   npm install
   npm run compile

Press F5 in VS Code to launch the extension in debug mode

##  How to Use

Once installed, open VS Code settings (Ctrl+,)
Search for "Custom Link Attributes"
Add your custom attributes, for example: ["data-src", "data-href", "custom-link"]

Now any HTML element with those attributes will have clickable links that work just like src and href!
Example:
html<div data-src="./other-page.html">Link to file</div>
<div custom-link="#section-2">Jump to section</div>
Would you like me to add any additional features, such as support for other file types beyond HTML?RetryClaude does not have the ability to run the code it generates yet.Claude can make mistakes. Please double-check responses. Sonnet 4.5