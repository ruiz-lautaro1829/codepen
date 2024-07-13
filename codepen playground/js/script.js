let $ = selector => document.querySelector(selector);

require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.30.1/min/vs' }});
require(['vs/editor/editor.main'], function() {
    let html5 = monaco.editor.create(document.getElementById('editor-html'), {
        value: [
            '<!-- editor html-->'
        ].join('\n'),
        language: 'html',
        theme: 'vs-dark',
        automaticLayout: true
    });

    let css = monaco.editor.create(document.getElementById('editor-css'), {
        value: [
            'body {',
            '\tbackground-color: #ddd;',
            '\tcolor: #111;',
            '}'
        ].join('\n'),
        language: 'css',
        theme: 'vs-dark',
        automaticLayout: true
    });

    let js = monaco.editor.create(document.getElementById('editor-js'), {
        value: [
            'console.log("Creando un playground parte 1p!");'
        ].join('\n'),
        language: 'javascript',
        theme: 'vs-dark',
        automaticLayout: true
    });

    emmetMonaco.emmetHTML(monaco);

    html5.onDidChangeModelContent(playground);
    css.onDidChangeModelContent(playground);
    js.onDidChangeModelContent(playground);

    function playground() {
        $("#preview").setAttribute("srcdoc", getvalue());
    } 
playground()
    function getvalue() {
        let html = html5.getValue();
        let cssContent = css.getValue();
        let jsContent = js.getValue();

        return `
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>${cssContent}</style>  
</head>
<body>
${html}
<script>${jsContent}</script>
</body>
</html>`;
    };
});