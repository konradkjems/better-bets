'use client';

import React, { useState } from 'react';
import { Customer } from '../../lib/calculator';
import { 
  generateCsvTemplate, 
  parseCsvData, 
  exportCalculationResults,
  downloadCsvFile,
  validateCsvFile,
  CsvImportResult,
  CsvExportOptions
} from '../../lib/csv-utils';

interface CsvManagerProps {
  customers: Customer[];
  currentCustomer: Customer | null;
  calculationResult?: any;
  onImportComplete: (result: CsvImportResult) => void;
}

export function CsvManager({ 
  customers, 
  currentCustomer, 
  calculationResult,
  onImportComplete 
}: CsvManagerProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [importResult, setImportResult] = useState<CsvImportResult | null>(null);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [exportOptions, setExportOptions] = useState<CsvExportOptions>({
    includeHeaders: true,
    includeEmptyRows: true,
    format: 'template',
    delimiter: ','
  });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !currentCustomer) return;

    setIsUploading(true);
    setImportResult(null);

    // Validate file
    const validation = validateCsvFile(file);
    if (!validation.valid) {
      onImportComplete({
        success: false,
        importedCount: 0,
        errors: [validation.error!],
        warnings: []
      });
      setIsUploading(false);
      return;
    }

    try {
      const csvContent = await file.text();
      const result = parseCsvData(csvContent, currentCustomer);
      
      setImportResult(result);
      onImportComplete(result);
    } catch (error) {
      const errorResult: CsvImportResult = {
        success: false,
        importedCount: 0,
        errors: [`Fejl ved læsning af fil: ${error instanceof Error ? error.message : 'Ukendt fejl'}`],
        warnings: []
      };
      setImportResult(errorResult);
      onImportComplete(errorResult);
    } finally {
      setIsUploading(false);
      // Reset file input
      event.target.value = '';
    }
  };

  const handleDownloadTemplate = () => {
    const csvContent = generateCsvTemplate(customers, exportOptions);
    downloadCsvFile(csvContent, 'odds_template.csv');
  };

  const handleDownloadData = () => {
    if (!currentCustomer) return;
    const csvContent = generateCsvTemplate([currentCustomer], { ...exportOptions, format: 'data' });
    downloadCsvFile(csvContent, 'current_odds_data.csv');
  };

  const handleDownloadResults = () => {
    if (!calculationResult || !currentCustomer) return;
    const csvContent = exportCalculationResults(calculationResult, currentCustomer, exportOptions);
    downloadCsvFile(csvContent, 'calculation_results.csv');
  };

  return (
    <div className="space-y-4">
      {/* Upload Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">CSV Import</h3>
        
        <div className="flex items-center gap-4">
          <label className="btn-secondary flex items-center gap-2 cursor-pointer">
            <input 
              type="file" 
              accept=".csv" 
              onChange={handleFileUpload}
              className="hidden"
              disabled={isUploading || !currentCustomer}
            />
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
            </svg>
            {isUploading ? 'Uploader...' : 'Upload CSV'}
          </label>
          
          {!currentCustomer && (
            <span className="text-sm text-gray-500">Vælg en kunde først</span>
          )}
        </div>

        {/* Import Results */}
        {importResult && (
          <div className={`mt-4 p-3 rounded-lg ${
            importResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}>
            <div className="flex items-center gap-2 mb-2">
              <svg className={`w-5 h-5 ${importResult.success ? 'text-green-600' : 'text-red-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={importResult.success ? "M5 13l4 4L19 7" : "M6 18L18 6M6 6l12 12"}/>
              </svg>
              <span className={`font-medium ${importResult.success ? 'text-green-800' : 'text-red-800'}`}>
                {importResult.success ? 'Import gennemført' : 'Import fejlede'}
              </span>
            </div>
            
            <p className={`text-sm ${importResult.success ? 'text-green-700' : 'text-red-700'}`}>
              {importResult.importedCount} bookmakere importeret
            </p>

            {importResult.errors.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-medium text-red-800">Fejl:</p>
                <ul className="text-sm text-red-700 list-disc list-inside">
                  {importResult.errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )}

            {importResult.warnings.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-medium text-yellow-800">Advarsler:</p>
                <ul className="text-sm text-yellow-700 list-disc list-inside">
                  {importResult.warnings.map((warning, index) => (
                    <li key={index}>{warning}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Export Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">CSV Export</h3>
          <button
            onClick={() => setShowExportOptions(!showExportOptions)}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {showExportOptions ? 'Skjul indstillinger' : 'Vis indstillinger'}
          </button>
        </div>

        {/* Export Options */}
        {showExportOptions && (
          <div className="mb-4 p-3 bg-gray-50 rounded-lg space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Format</label>
                <select
                  value={exportOptions.format}
                  onChange={(e) => setExportOptions({...exportOptions, format: e.target.value as any})}
                  className="input-field text-sm"
                >
                  <option value="template">Skabelon</option>
                  <option value="data">Nuværende data</option>
                  <option value="results">Beregningsresultater</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Separator</label>
                <select
                  value={exportOptions.delimiter}
                  onChange={(e) => setExportOptions({...exportOptions, delimiter: e.target.value as any})}
                  className="input-field text-sm"
                >
                  <option value=",">Komma (,)</option>
                  <option value=";">Semikolon (;)</option>
                  <option value="\t">Tabulator</option>
                </select>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={exportOptions.includeHeaders}
                  onChange={(e) => setExportOptions({...exportOptions, includeHeaders: e.target.checked})}
                  className="form-checkbox"
                />
                <span className="text-sm text-gray-700">Inkluder headers</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={exportOptions.includeEmptyRows}
                  onChange={(e) => setExportOptions({...exportOptions, includeEmptyRows: e.target.checked})}
                  className="form-checkbox"
                />
                <span className="text-sm text-gray-700">Inkluder tomme rækker</span>
              </label>
            </div>
          </div>
        )}

        {/* Export Buttons */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleDownloadTemplate}
            className="btn-secondary flex items-center gap-2"
            disabled={customers.length === 0}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            Download Skabelon
          </button>

          <button
            onClick={handleDownloadData}
            className="btn-secondary flex items-center gap-2"
            disabled={!currentCustomer}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            Download Data
          </button>

          <button
            onClick={handleDownloadResults}
            className="btn-secondary flex items-center gap-2"
            disabled={!calculationResult}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
            </svg>
            Download Resultater
          </button>
        </div>

        {/* Help Text */}
        <div className="mt-3 text-sm text-gray-600">
          <p><strong>Skabelon:</strong> Tom CSV med bookmaker navne til udfyldning</p>
          <p><strong>Data:</strong> Nuværende odds data fra valgt kunde</p>
          <p><strong>Resultater:</strong> Beregningsresultater med indsatser og gevinster</p>
        </div>
      </div>
    </div>
  );
}
