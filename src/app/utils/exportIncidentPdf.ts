export function exportIncidentPdf(incident: any) {
  const win = window.open('', '_blank');
  if (!win) return;
  const style = `
    body { font-family: Arial, sans-serif; padding: 20px; }
    h1 { margin-top: 0; }
    p { margin: 4px 0; }
  `;
  win.document.write(`
    <html>
      <head>
        <title>Incident ${incident.incidentNumber}</title>
        <style>${style}</style>
      </head>
      <body>
        <h1>${incident.title}</h1>
        <p><strong>Incident Number:</strong> ${incident.incidentNumber}</p>
        <p><strong>Date:</strong> ${incident.date} ${incident.time}</p>
        <p><strong>Location:</strong> ${incident.location}</p>
        <p><strong>Reported By:</strong> ${incident.reportedBy}</p>
        <p><strong>Status:</strong> ${incident.status}</p>
        <p><strong>Description:</strong><br/>${incident.description.replace(/\n/g, '<br/>')}</p>
      </body>
    </html>
  `);
  win.document.close();
  win.print();
}
