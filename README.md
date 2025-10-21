# vs-code-custom-links

## Features

This extension automatically resolves some custom attributes so that they are tried like the href or src attributes, with a bit of a twist:

### Example

```html
<html>
    <head>
        <script type=importmap>
            {
                "imports": {
                    "my-package/": "/node_modules/my-package/"
                }
            }           
        </script>
    </head>
    <body>
        <my-html-based-web-component imp-h="my-package/root.html"></my-html-based-web-component>


        <script type=module>
            import './imp-h.js';
        </script>
    </body>
</html>
```

Assuming node module my-package has a file called root.html, right clicking on the imp-h attribute will take you to that file.

This extension provides out of the box support for [imp-h](https://www.npmjs.com/package/imp-h), [be-importing](https://www.npmjs.com/package/be-importing) and [be-written](https://www.npmjs.com/package/be-written).

##  Adding support for additional attributes

To add your  additional custom attributes, for example: ["data-src", "data-href", "custom-link"]:

Open VS Code settings (Ctrl+,)
Search for "Custom Link Attributes"

