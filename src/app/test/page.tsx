'use client';

import React, { useState, useEffect } from 'react';
import { runAllTests } from '../../lib/test-suite';

interface TestResult {
  category: string;
  passed: number;
  total: number;
  percentage: number;
}

export default function TestPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [overallScore, setOverallScore] = useState<number | null>(null);
  const [testLog, setTestLog] = useState<string[]>([]);

  const runTests = async () => {
    setIsRunning(true);
    setTestLog([]);
    setTestResults([]);
    setOverallScore(null);

    // Capture console.log output
    const originalLog = console.log;
    const logs: string[] = [];
    
    console.log = (...args) => {
      logs.push(args.join(' '));
      originalLog(...args);
    };

    try {
      const results = await runAllTests();
      
      // Convert results to TestResult format
      const testResults: TestResult[] = [
        {
          category: 'Calculator',
          passed: results.calculator,
          total: 3,
          percentage: Math.round((results.calculator / 3) * 100)
        },
        {
          category: 'API',
          passed: results.api,
          total: 2,
          percentage: Math.round((results.api / 2) * 100)
        },
        {
          category: 'UI',
          passed: results.ui,
          total: 2,
          percentage: Math.round((results.ui / 2) * 100)
        },
        {
          category: 'PWA',
          passed: results.pwa,
          total: 3,
          percentage: Math.round((results.pwa / 3) * 100)
        },
        {
          category: 'Performance',
          passed: results.performance,
          total: 2,
          percentage: Math.round((results.performance / 2) * 100)
        }
      ];

      setTestResults(testResults);
      
      const totalPassed = Object.values(results).reduce((sum, count) => sum + count, 0);
      const totalPossible = 12;
      setOverallScore(Math.round((totalPassed / totalPossible) * 100));
      
    } catch (error) {
      console.error('Test execution failed:', error);
    } finally {
      console.log = originalLog;
      setTestLog(logs);
      setIsRunning(false);
    }
  };

  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-100';
    if (percentage >= 70) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Test Suite</h1>
        <p className="text-gray-600">
          Comprehensive testing for Better Bets application
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Test Controls */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Test Controls</h2>
          
          <button
            onClick={runTests}
            disabled={isRunning}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${
              isRunning
                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isRunning ? (
              <div className="flex items-center justify-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Running Tests...
              </div>
            ) : (
              'Run All Tests'
            )}
          </button>

          {overallScore !== null && (
            <div className={`mt-6 p-4 rounded-lg ${getScoreBgColor(overallScore)}`}>
              <div className="text-center">
                <div className={`text-3xl font-bold ${getScoreColor(overallScore)}`}>
                  {overallScore}%
                </div>
                <div className="text-sm text-gray-600 mt-1">
                  Overall Test Score
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Test Results */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Test Results</h2>
          
          {testResults.length > 0 ? (
            <div className="space-y-4">
              {testResults.map((result, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{result.category}</h3>
                    <span className={`px-2 py-1 rounded-full text-sm font-medium ${getScoreBgColor(result.percentage)} ${getScoreColor(result.percentage)}`}>
                      {result.passed}/{result.total}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        result.percentage >= 90 ? 'bg-green-500' :
                        result.percentage >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${result.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">
                    {result.percentage}% passed
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              Click "Run All Tests" to see results
            </div>
          )}
        </div>
      </div>

      {/* Test Log */}
      {testLog.length > 0 && (
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Test Log</h2>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm max-h-96 overflow-y-auto">
            {testLog.map((log, index) => (
              <div key={index} className="mb-1">
                {log}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Test Information */}
      <div className="mt-8 bg-blue-50 rounded-xl p-6">
        <h2 className="text-xl font-bold text-blue-900 mb-4">Test Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Calculator Tests</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Arbitrage calculation accuracy</li>
              <li>• Odds validation</li>
              <li>• Customer management</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">API Tests</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Endpoint accessibility</li>
              <li>• Health check</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">UI Tests</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Responsive design</li>
              <li>• Accessibility compliance</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">PWA Tests</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Service worker support</li>
              <li>• Manifest validation</li>
              <li>• Offline capability</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Performance Tests</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Page load time</li>
              <li>• Memory usage</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
