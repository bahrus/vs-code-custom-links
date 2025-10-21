"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
const path = require("path");
const node_html_parser_1 = require("node-html-parser");
function activate(context) {
    const linkProvider = new CustomLinkProvider();
    context.subscriptions.push(vscode.languages.registerDocumentLinkProvider({ language: 'html', scheme: 'file' }, linkProvider));
}
class CustomLinkProvider {
    provideDocumentLinks(document, token) {
        const links = [];
        const config = vscode.workspace.getConfiguration('customLinkAttributes');
        const customAttributes = config.get('attributes', []);
        // Combine default attributes (src, href) with custom ones
        //const allAttributes = ['src', 'href', 'imp-h', ...customAttributes];
        const allAttributes = ['imp-h', , 'be-importing', 'be-written', '📥', '📜', ...customAttributes];
        const text = document.getText();
        const parsedHTML = (0, node_html_parser_1.parse)(text);
        const lookup = {};
        const scripts = Array.from(parsedHTML.querySelectorAll('script'));
        for (const importMap of scripts) {
            const type = importMap.getAttribute('type');
            if (type !== 'importmap')
                continue;
            const inner = importMap.innerHTML;
            const parsedJSON = JSON.parse(inner);
            const imports = parsedJSON['imports'];
            for (const key in imports) {
                lookup[key] = imports[key];
            }
        }
        for (const attr of allAttributes) {
            // Match attribute patterns like attr="value" or attr='value'
            const regex = new RegExp(`${attr}\\s*=\\s*["']([^"']+)["']`, 'gi');
            let match;
            while ((match = regex.exec(text)) !== null) {
                let value = match[1];
                const startPos = document.positionAt(match.index + match[0].indexOf(value));
                const endPos = document.positionAt(match.index + match[0].indexOf(value) + value.length);
                const range = new vscode.Range(startPos, endPos);
                if (value.startsWith('#') ||
                    value.startsWith('http://') ||
                    value.startsWith('https://') ||
                    value.startsWith('..') ||
                    value.startsWith('/'))
                    continue;
                for (const key in lookup) {
                    if (value.startsWith(key)) {
                        value = value.replace(key, lookup[key]);
                    }
                }
                // Handle different types of links
                if (value.startsWith('#')) {
                    // ID reference - link to element with that ID in the same document
                    const targetId = value.substring(1);
                    const link = new vscode.DocumentLink(range);
                    link.target = vscode.Uri.parse(`${document.uri.toString()}#${targetId}`);
                    links.push(link);
                }
                else if (value.startsWith('http://') || value.startsWith('https://')) {
                    // External URL
                    const link = new vscode.DocumentLink(range);
                    link.target = vscode.Uri.parse(value);
                    links.push(link);
                }
                else if (!value.includes(':')) {
                    // Relative file path
                    const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
                    if (workspaceFolder) {
                        const documentDir = path.dirname(document.uri.fsPath);
                        const absolutePath = path.resolve(documentDir, value);
                        const link = new vscode.DocumentLink(range);
                        link.target = vscode.Uri.file(absolutePath);
                        links.push(link);
                    }
                }
            }
        }
        return links;
    }
    resolveDocumentLink(link) {
        return link;
    }
}
function deactivate() { }
//# sourceMappingURL=extension.js.map