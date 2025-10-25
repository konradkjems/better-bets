// Enhanced CSV utilities for Better Bets
import { Customer, BOOKMAKERS, BookmakerInfo } from './calculator';

export interface CsvExportOptions {
  includeHeaders?: boolean;
  includeEmptyRows?: boolean;
  format?: 'template' | 'data' | 'results';
  delimiter?: ',' | ';' | '\t';
}

export interface CsvImportResult {
  success: boolean;
  importedCount: number;
  errors: string[];
  warnings: string[];
}

// Enhanced CSV template generation with more options
export function generateCsvTemplate(
  customers: Customer[], 
  options: CsvExportOptions = {}
): string {
  const {
    includeHeaders = true,
    includeEmptyRows = true,
    format = 'template',
    delimiter = ','
  } = options;

  const bookmakers = customers.length === 0 ? BOOKMAKERS : customers[0].bookmakers;
  
  let headers: string[];
  let rows: string[][];

  switch (format) {
    case 'template':
      headers = ['Bookmaker', 'Hold 1', 'Uafgjort', 'Hold 2', 'Min. Odds', 'Indsats'];
      rows = bookmakers.map(bookmaker => [
        bookmaker.name,
        '',
        '',
        '',
        bookmaker.minOdds.toString(),
        bookmaker.fixedStake.toString()
      ]);
      break;
    
    case 'data':
      headers = ['Bookmaker', 'Hold 1', 'Uafgjort', 'Hold 2', 'Aktiv'];
      rows = bookmakers.map(bookmaker => [
        bookmaker.name,
        bookmaker.odds?.team1?.toString() || '',
        bookmaker.odds?.draw?.toString() || '',
        bookmaker.odds?.team2?.toString() || '',
        bookmaker.isActive ? 'Ja' : 'Nej'
      ]);
      break;
    
    case 'results':
      headers = ['Bookmaker', 'Bet Type', 'Indsats', 'Odds', 'Potentiel Gevinst'];
      rows = bookmakers
        .filter(bm => bm.isActive && bm.odds)
        .map(bookmaker => [
          bookmaker.name,
          'Hold 1',
          bookmaker.fixedStake.toString(),
          bookmaker.odds!.team1.toString(),
          (bookmaker.fixedStake * bookmaker.odds!.team1).toFixed(2)
        ]);
      break;
    
    default:
      headers = ['Bookmaker', 'Hold 1', 'Uafgjort', 'Hold 2'];
      rows = bookmakers.map(bookmaker => [bookmaker.name, '', '', '']);
  }

  if (!includeEmptyRows && format === 'template') {
    rows = rows.filter(row => row.some(cell => cell.trim() !== ''));
  }

  const csvContent = '\uFEFF' + [
    ...(includeHeaders ? [headers.join(delimiter)] : []),
    ...rows.map((row: string[]) => row.join(delimiter))
  ].join('\r\n');

  return csvContent;
}

// Enhanced CSV parsing with better error handling
export function parseCsvData(
  csvContent: string, 
  customer: Customer,
  options: { delimiter?: string; skipEmptyRows?: boolean } = {}
): CsvImportResult {
  const { delimiter = ',', skipEmptyRows = true } = options;
  
  const result: CsvImportResult = {
    success: false,
    importedCount: 0,
    errors: [],
    warnings: []
  };

  try {
    // Remove BOM if present
    const cleanContent = csvContent.replace(/^\uFEFF/, '');
    const lines = cleanContent.split(/\r?\n/).filter(line => 
      skipEmptyRows ? line.trim() : true
    );

    if (lines.length < 2) {
      result.errors.push('CSV filen skal indeholde mindst en header og en datarække');
      return result;
    }

    const headers = lines[0].split(delimiter).map(h => h.trim().toLowerCase());
    
    // Support multiple column name variations
    const bookmakerIndex = headers.findIndex(h => 
      h.includes('bookmaker') || h.includes('bookie') || h.includes('site') || h.includes('udbyder')
    );
    const team1Index = headers.findIndex(h => 
      h.includes('team1') || h.includes('hold 1') || h.includes('home') || h.includes('hjemme')
    );
    const drawIndex = headers.findIndex(h => 
      h.includes('draw') || h.includes('uafgjort') || h.includes('x') || h.includes('uafgjort')
    );
    const team2Index = headers.findIndex(h => 
      h.includes('team2') || h.includes('hold 2') || h.includes('away') || h.includes('ude')
    );

    if (bookmakerIndex === -1) {
      result.errors.push('CSV skal indeholde en kolonne med bookmaker navne');
      return result;
    }

    if (team1Index === -1 || drawIndex === -1 || team2Index === -1) {
      result.errors.push('CSV skal indeholde kolonner med odds for alle tre udfald (Hold 1, Uafgjort, Hold 2)');
      return result;
    }

    // Parse data rows
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const values = line.split(delimiter).map(v => v.trim().replace(/"/g, ''));
      
      if (values.length < Math.max(bookmakerIndex, team1Index, drawIndex, team2Index) + 1) {
        result.warnings.push(`Række ${i + 1}: Ufuldstændig data, springer over`);
        continue;
      }

      const bookmakerName = values[bookmakerIndex];
      if (!bookmakerName) {
        result.warnings.push(`Række ${i + 1}: Ingen bookmaker navn, springer over`);
        continue;
      }

      // Parse odds with better number handling
      const parseOdds = (oddsStr: string): number | null => {
        const cleaned = oddsStr.replace(/[^\d.,]/g, '').replace(',', '.');
        const parsed = parseFloat(cleaned);
        return isNaN(parsed) || parsed <= 0 ? null : parsed;
      };

      const team1Odds = parseOdds(values[team1Index] || '');
      const drawOdds = parseOdds(values[drawIndex] || '');
      const team2Odds = parseOdds(values[team2Index] || '');

      if (!team1Odds || !drawOdds || !team2Odds) {
        result.warnings.push(`Række ${i + 1}: Ugyldige odds for ${bookmakerName}`);
        continue;
      }

      // Find matching bookmaker (case-insensitive)
      const bookmakerIndex_inArray = customer.bookmakers.findIndex(bm => 
        bm.name.toLowerCase() === bookmakerName.toLowerCase()
      );

      if (bookmakerIndex_inArray !== -1) {
        const bookmaker = customer.bookmakers[bookmakerIndex_inArray];
        
        // Validate minimum odds
        if (team1Odds < bookmaker.minOdds || drawOdds < bookmaker.minOdds || team2Odds < bookmaker.minOdds) {
          result.warnings.push(`${bookmakerName}: Odds under minimum (${bookmaker.minOdds})`);
        }

        bookmaker.odds = {
          team1: team1Odds,
          draw: drawOdds,
          team2: team2Odds
        };
        bookmaker.isActive = true;
        result.importedCount++;
      } else {
        result.warnings.push(`Bookmaker ikke fundet: ${bookmakerName}`);
      }
    }

    result.success = result.importedCount > 0;
    if (result.importedCount === 0) {
      result.errors.push('Ingen gyldige odds blev importeret');
    }

  } catch (error) {
    result.errors.push(`Fejl ved parsing af CSV: ${error instanceof Error ? error.message : 'Ukendt fejl'}`);
  }

  return result;
}

// Export current calculation results to CSV
export function exportCalculationResults(
  calculationResult: any,
  customer: Customer,
  options: CsvExportOptions = {}
): string {
  const {
    includeHeaders = true,
    delimiter = ','
  } = options;

  const headers = [
    'Bookmaker',
    'Bet Type', 
    'Odds',
    'Indsats (DKK)',
    'Faktisk Omkostning (DKK)',
    'Potentiel Gevinst (DKK)',
    'Profit (DKK)'
  ];

  const rows = calculationResult.allBookmakers.map((bm: any) => {
    const betType = bm.betType === 'team1' ? 'Hold 1' :
                   bm.betType === 'draw' ? 'Uafgjort' : 'Hold 2';
    const odds = bm.betType === 'team1' ? bm.team1Odds :
                 bm.betType === 'draw' ? bm.drawOdds : bm.team2Odds;
    const potentialWin = bm.fixedStake * odds;
    const profit = potentialWin - bm.actualCost;

    return [
      bm.name,
      betType,
      odds.toFixed(2),
      bm.fixedStake.toFixed(2),
      bm.actualCost.toFixed(2),
      potentialWin.toFixed(2),
      profit.toFixed(2)
    ];
  });

  // Add summary row
  rows.push([
    'TOTAL',
    '',
    '',
    calculationResult.totalStake.toFixed(2),
    calculationResult.totalActualCost.toFixed(2),
    '',
    calculationResult.profit.toFixed(2)
  ]);

  const csvContent = '\uFEFF' + [
    ...(includeHeaders ? [headers.join(delimiter)] : []),
    ...rows.map((row: string[]) => row.join(delimiter))
  ].join('\r\n');

  return csvContent;
}

// Download CSV file
export function downloadCsvFile(content: string, filename: string): void {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}

// Validate CSV file before upload
export function validateCsvFile(file: File): { valid: boolean; error?: string } {
  if (!file.name.toLowerCase().endsWith('.csv')) {
    return { valid: false, error: 'Filen skal være en CSV fil' };
  }

  if (file.size > 5 * 1024 * 1024) { // 5MB limit
    return { valid: false, error: 'Filen er for stor (max 5MB)' };
  }

  if (file.size === 0) {
    return { valid: false, error: 'Filen er tom' };
  }

  return { valid: true };
}
