import html2pdf from 'html2pdf.js';

export const generateProjectPDF = (projectTitle: string, projectData: any) => {
  const element = document.createElement('div');
  element.innerHTML = `
    <div style="font-family: Arial, sans-serif; padding: 40px; background: white;">
      <div style="text-align: center; margin-bottom: 40px; border-bottom: 3px solid #0369a1; padding-bottom: 20px;">
        <h1 style="color: #0369a1; margin: 0; font-size: 32px;">${projectTitle}</h1>
        <p style="color: #666; margin: 10px 0 0 0; font-size: 14px;">Project Report</p>
      </div>

      <div style="margin-bottom: 30px;">
        <h2 style="color: #0369a1; font-size: 18px; border-bottom: 2px solid #06b6d4; padding-bottom: 10px;">Project Overview</h2>
        <p style="color: #333; line-height: 1.6; margin: 15px 0;">${projectData.description}</p>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; border-left: 4px solid #0369a1;">
          <p style="color: #666; font-size: 12px; margin: 0 0 5px 0;">Status</p>
          <p style="color: #0369a1; font-weight: bold; font-size: 16px; margin: 0;">${projectData.status}</p>
        </div>
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; border-left: 4px solid #0369a1;">
          <p style="color: #666; font-size: 12px; margin: 0 0 5px 0;">Location</p>
          <p style="color: #0369a1; font-weight: bold; font-size: 16px; margin: 0;">${projectData.location}</p>
        </div>
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; border-left: 4px solid #0369a1;">
          <p style="color: #666; font-size: 12px; margin: 0 0 5px 0;">Budget</p>
          <p style="color: #0369a1; font-weight: bold; font-size: 16px; margin: 0;">${projectData.budget}</p>
        </div>
        <div style="background: #f0f9ff; padding: 15px; border-radius: 8px; border-left: 4px solid #0369a1;">
          <p style="color: #666; font-size: 12px; margin: 0 0 5px 0;">Duration</p>
          <p style="color: #0369a1; font-weight: bold; font-size: 16px; margin: 0;">${projectData.duration}</p>
        </div>
      </div>

      <div style="margin-bottom: 30px;">
        <h2 style="color: #0369a1; font-size: 18px; border-bottom: 2px solid #06b6d4; padding-bottom: 10px;">Key Metrics</h2>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;">
          <div style="background: #ecfdf5; padding: 12px; border-radius: 6px;">
            <p style="color: #666; font-size: 12px; margin: 0 0 5px 0;">Impact</p>
            <p style="color: #059669; font-weight: bold; margin: 0;">${projectData.impact}</p>
          </div>
          <div style="background: #ecfdf5; padding: 12px; border-radius: 6px;">
            <p style="color: #666; font-size: 12px; margin: 0 0 5px 0;">ROI</p>
            <p style="color: #059669; font-weight: bold; margin: 0;">${projectData.roi}</p>
          </div>
        </div>
      </div>

      <div style="margin-bottom: 30px;">
        <h2 style="color: #0369a1; font-size: 18px; border-bottom: 2px solid #06b6d4; padding-bottom: 10px;">Technologies Used</h2>
        <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-top: 15px;">
          ${projectData.technologies.map((tech: string) => `
            <span style="background: #dbeafe; color: #0369a1; padding: 6px 12px; border-radius: 20px; font-size: 13px; font-weight: 500;">
              ${tech}
            </span>
          `).join('')}
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
        <div>
          <h3 style="color: #0369a1; font-size: 16px; margin: 0 0 10px 0;">Challenges</h3>
          <ul style="color: #333; margin: 0; padding-left: 20px; line-height: 1.8;">
            ${projectData.challenges.map((challenge: string) => `<li>${challenge}</li>`).join('')}
          </ul>
        </div>
        <div>
          <h3 style="color: #059669; font-size: 16px; margin: 0 0 10px 0;">Solutions</h3>
          <ul style="color: #333; margin: 0; padding-left: 20px; line-height: 1.8;">
            ${projectData.solutions.map((solution: string) => `<li>${solution}</li>`).join('')}
          </ul>
        </div>
      </div>

      <div style="background: linear-gradient(135deg, #0369a1 0%, #06b6d4 100%); color: white; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
        <h3 style="margin: 0 0 10px 0; font-size: 16px;">Client Testimonial</h3>
        <p style="margin: 0; font-style: italic; line-height: 1.6;">"${projectData.testimonial}"</p>
        <p style="margin: 10px 0 0 0; font-weight: bold; font-size: 14px;">- ${projectData.testimonialAuthor}</p>
      </div>

      <div style="text-align: center; color: #999; font-size: 12px; border-top: 1px solid #ddd; padding-top: 20px;">
        <p style="margin: 0;">Generated on ${new Date().toLocaleDateString()} | MEGABOTICS Project Report</p>
      </div>
    </div>
  `;

  const options = {
    margin: 10,
    filename: `${projectTitle.replace(/\s+/g, '_')}_Report.pdf`,
    image: { type: 'jpeg' as const, quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
  };

  (html2pdf() as any).set(options).from(element).save();
};

export const shareProject = (projectTitle: string, projectUrl: string) => {
  const shareText = `Check out this amazing project: ${projectTitle} on MEGABOTICS`;
  
  if (navigator.share) {
    navigator.share({
      title: projectTitle,
      text: shareText,
      url: projectUrl,
    }).catch((err) => console.log('Error sharing:', err));
  } else {
    // Fallback: Copy to clipboard
    const text = `${shareText}\n${projectUrl}`;
    navigator.clipboard.writeText(text).then(() => {
      alert('Project link copied to clipboard!');
    });
  }
};
