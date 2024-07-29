import JSZip from 'jszip';
import fetchAndWriteSVGsForProject from './fetchSVGs'; // Assuming you have the fetchAndWriteSVGsForProject function

export async function fetchAndCreateZipForProject(projectId: any) {
    try {
        // Fetch SVGs for the current project and create React components
        await fetchAndWriteSVGsForProject(projectId);

        // Generate zip file
        const zip = new JSZip();
        // Add React component files to the zip
        // Here, you can add the generated React component files to the zip
        // For demonstration purposes, let's add a sample component
        zip.file('SampleComponent.jsx', 'const SampleComponent = () => { return <div>Sample Component</div>; }; export default SampleComponent;');

        // Generate the zip file
        zip.generateAsync({ type: 'blob' }).then((content) => {
            // Trigger download
            const element = document.createElement('a');
            const url = URL.createObjectURL(content);
            element.href = url;
            element.download = 'react_components.zip';
            document.body.appendChild(element);
            element.click();
            URL.revokeObjectURL(url);
        });
    } catch (error) {
        console.error('Error fetching and creating zip:', error);
    }
}