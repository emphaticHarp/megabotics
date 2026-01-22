export const exportProjectsAsCSV = (projects: any[]) => {
  const headers = ['ID', 'Title', 'Category', 'Location', 'Status', 'Budget', 'Duration', 'ROI', 'Team Size', 'Rating', 'Impact'];
  
  const rows = projects.map(p => [
    p.id,
    p.title,
    p.category,
    p.location,
    p.status,
    typeof p.budget === 'number' ? `₹${(p.budget / 100000).toFixed(1)} Lakh` : p.budget,
    typeof p.duration === 'number' ? `${p.duration} months` : p.duration,
    typeof p.roi === 'number' ? `${p.roi}%` : p.roi,
    p.team,
    p.rating,
    p.impact,
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `projects_${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

export const exportProjectsAsPDF = (projects: any[]) => {
  const html2pdf = require('html2pdf.js');
  
  const element = document.createElement('div');
  element.innerHTML = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h1 style="color: #0369a1; text-align: center; margin-bottom: 30px;">MEGABOTICS Projects Report</h1>
      <p style="text-align: center; color: #666; margin-bottom: 30px;">Generated on ${new Date().toLocaleDateString('en-IN')}</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <thead>
          <tr style="background-color: #0369a1; color: white;">
            <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">Project</th>
            <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">Category</th>
            <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">Status</th>
            <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">ROI</th>
            <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">Rating</th>
          </tr>
        </thead>
        <tbody>
          ${projects.map((p, idx) => `
            <tr style="background-color: ${idx % 2 === 0 ? '#f9f9f9' : 'white'};">
              <td style="border: 1px solid #ddd; padding: 10px;">${p.title}</td>
              <td style="border: 1px solid #ddd; padding: 10px;">${p.category}</td>
              <td style="border: 1px solid #ddd; padding: 10px;">
                <span style="background-color: ${p.status === 'Completed' ? '#d1fae5' : '#dbeafe'}; color: ${p.status === 'Completed' ? '#065f46' : '#0c4a6e'}; padding: 4px 8px; border-radius: 4px;">
                  ${p.status}
                </span>
              </td>
              <td style="border: 1px solid #ddd; padding: 10px; color: #059669; font-weight: bold;">${typeof p.roi === 'number' ? p.roi + '%' : p.roi}</td>
              <td style="border: 1px solid #ddd; padding: 10px;">★ ${p.rating}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>

      <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #0369a1;">
        <h2 style="color: #0369a1; margin-bottom: 10px;">Summary Statistics</h2>
        <p><strong>Total Projects:</strong> ${projects.length}</p>
        <p><strong>Completed:</strong> ${projects.filter(p => p.status === 'Completed').length}</p>
        <p><strong>Ongoing:</strong> ${projects.filter(p => p.status === 'Ongoing').length}</p>
        <p><strong>Average ROI:</strong> ${Math.round(projects.reduce((sum, p) => sum + (typeof p.roi === 'number' ? p.roi : parseInt(p.roi)), 0) / projects.length)}%</p>
      </div>
    </div>
  `;

  const options = {
    margin: 10,
    filename: `projects_report_${new Date().toISOString().split('T')[0]}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { orientation: 'landscape', unit: 'mm', format: 'a4' },
  };

  html2pdf().set(options).from(element).save();
};
