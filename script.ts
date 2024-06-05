import mermaid from 'mermaid'

mermaid.initialize({
    securityLevel: 'loose',
    startOnLoad: true,
    flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'cardinal' },
});
const renderMermaidAsync=async(mermaidCode: string) =>{
    try {
        const { svg, bindFunctions } = await renderMermaid(mermaidCode);
        const dashDiv = document.getElementById('dashDiv');
        if (dashDiv) {
            dashDiv.innerHTML = svg;
            if (bindFunctions) {
                bindFunctions(dashDiv);
            }
        }
    } catch (error) {
        console.error('Error rendering Mermaid:', error);
    }
}
const renderMermaid = async (str: string) => {
    try {
        const { svg, bindFunctions } = await mermaidDiagram(str);
        return { svg, bindFunctions };
    } catch (error) {
        console.error('Error rendering mermaid diagram:', error);
        return { svg: '', bindFunctions: undefined };
    }
};
const mermaidDiagram = async (str: string) => mermaid.render('graph' + Date.now(), str);
const mermaidCode:string = `
gantt
title A Gantt Diagram
dateFormat  YYYY-MM-DD
section Section
A task           :a1, 2014-01-01, 30d
Another task     :after a1  , 20d
section Another
Task in sec      :2014-01-12  , 12d
another task      : 24d
`;
renderMermaidAsync(mermaidCode)