const fs = require('fs');
const path = require('path');
const ExcelJS = require('exceljs');
const { getLatestResults, parseResults } = require('./reportHelper');

async function generateExcelReport() {
  const wdioResults = getLatestResults();
  if (!wdioResults) {
    console.log('No results to generate report from.');
    return;
  }

  const results = parseResults(wdioResults);
  const total = results.length;
  const passed = results.filter(r => r.status === 'passed').length;
  const failed = results.filter(r => r.status === 'failed').length;
  const skipped = results.filter(r => r.status === 'skipped').length;
  const passPercent = total > 0 ? ((passed / total) * 100).toFixed(2) : 0;

  const workbook = new ExcelJS.Workbook();
  workbook.creator = 'FleetSync QA';
  workbook.created = new Date();

  // Sheet 1: Summary
  const summarySheet = workbook.addWorksheet('Test Summary');
  summarySheet.columns = [
    { header: 'Metric', key: 'metric', width: 30 },
    { header: 'Value', key: 'value', width: 20 }
  ];
  summarySheet.addRow({ metric: 'Total Tests', value: total });
  summarySheet.addRow({ metric: 'Passed', value: passed });
  summarySheet.addRow({ metric: 'Failed', value: failed });
  summarySheet.addRow({ metric: 'Skipped', value: skipped });
  summarySheet.addRow({ metric: 'Pass %', value: `${passPercent}%` });

  // Formatting summary sheet
  summarySheet.getRow(1).font = { bold: true };
  
  // Sheet 2: Details
  const detailSheet = workbook.addWorksheet('Test Case Details');
  detailSheet.columns = [
    { header: 'Test Title', key: 'title', width: 50 },
    { header: 'Module (Suite)', key: 'suite', width: 30 },
    { header: 'Status', key: 'status', width: 15 },
    { header: 'Platform', key: 'platform', width: 15 },
    { header: 'Duration (ms)', key: 'duration', width: 15 },
    { header: 'Error', key: 'error', width: 50 }
  ];
  
  detailSheet.getRow(1).font = { bold: true };
  
  results.forEach(res => {
    const row = detailSheet.addRow(res);
    if (res.status === 'passed') {
      row.getCell('status').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF00FF00' } };
    } else if (res.status === 'failed') {
      row.getCell('status').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF0000' } };
    }
  });

  // Ensure output directory exists
  const outDir = path.resolve(__dirname, '../../Vulnerability Test Results');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const outputPath = path.join(outDir, 'appium-test-report.xlsx');
  await workbook.xlsx.writeFile(outputPath);
  console.log(`✅ Excel report generated successfully at: ${outputPath}`);
}

generateExcelReport().catch(console.error);
