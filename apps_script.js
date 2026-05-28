// ============================================================
// 바디프렌드 VOC 조사 — Google Apps Script 백엔드
// Google Sheets Apps Script 편집기에 붙여넣고 웹앱으로 배포
// ============================================================

const SHEET_ID = '10C_qiZUTuz7osNsvjZZFiKGdN_A6wNOGgK0aQx7qAQY';

// CORS 헤더 설정 (GitHub Pages 외부 도메인에서 접근 허용)
function setCORSHeaders(output) {
  return output
    .setMimeType(ContentService.MimeType.JSON);
}

// POST — 설문 응답 저장
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheetName = 'Survey_' + data._survey;
    var sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
      var headers = Object.keys(data);
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      // 헤더 스타일
      sheet.getRange(1, 1, 1, headers.length)
        .setBackground('#1a1918')
        .setFontColor('#ffffff')
        .setFontWeight('bold');
    }

    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var row = headers.map(function(h) {
      return data[h] !== undefined
        ? (Array.isArray(data[h]) ? data[h].join(', ') : data[h])
        : '';
    });
    sheet.appendRow(row);

    return setCORSHeaders(
      ContentService.createTextOutput(JSON.stringify({ status: 'ok' }))
    );
  } catch(err) {
    return setCORSHeaders(
      ContentService.createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
    );
  }
}

// GET — 설문 데이터 조회 (대시보드용)
function doGet(e) {
  try {
    var survey = e.parameter.survey;
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var sheetName = 'Survey_' + survey;
    var sheet = ss.getSheetByName(sheetName);

    if (!sheet) {
      return setCORSHeaders(
        ContentService.createTextOutput(JSON.stringify({ data: [] }))
      );
    }

    var values = sheet.getDataRange().getValues();
    var headers = values[0];
    var rows = values.slice(1).map(function(row) {
      var obj = {};
      headers.forEach(function(h, i) { obj[h] = row[i]; });
      return obj;
    });

    return setCORSHeaders(
      ContentService.createTextOutput(JSON.stringify({ data: rows }))
    );
  } catch(err) {
    return setCORSHeaders(
      ContentService.createTextOutput(JSON.stringify({ data: [], error: err.toString() }))
    );
  }
}
