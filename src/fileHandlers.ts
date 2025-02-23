import type { BookmakerOdds } from './types';
import { downloadCSV } from './utils';

export function handleFileUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
        const text = e.target?.result as string;
        if (!text) return;

        try {
            const rows = text.split('\n');
            const headers = rows[0].split(',');
            
            // Valider headers
            const requiredHeaders = ['name', 'team1', 'draw', 'team2', 'fixedStake', 'minOdds'];
            const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
            
            if (missingHeaders.length > 0) {
                throw new Error(`Manglende kolonner: ${missingHeaders.join(', ')}`);
            }

            // Parse data
            const bookmakers: Partial<BookmakerOdds>[] = rows.slice(1)
                .filter(row => row.trim())
                .map(row => {
                    const values = row.split(',');
                    return {
                        name: values[headers.indexOf('name')],
                        team1: parseFloat(values[headers.indexOf('team1')]),
                        draw: parseFloat(values[headers.indexOf('draw')]),
                        team2: parseFloat(values[headers.indexOf('team2')]),
                        fixedStake: parseFloat(values[headers.indexOf('fixedStake')]),
                        minOdds: parseFloat(values[headers.indexOf('minOdds')]),
                        isActive: true
                    };
                });

            // Valider data
            const invalidBookmakers = bookmakers.filter(b => 
                !b.name || 
                isNaN(b.team1 || 0) || 
                isNaN(b.draw || 0) || 
                isNaN(b.team2 || 0) || 
                isNaN(b.fixedStake || 0) || 
                isNaN(b.minOdds || 0)
            );

            if (invalidBookmakers.length > 0) {
                throw new Error(`Ugyldige data for bookmakere: ${invalidBookmakers.map(b => b.name).join(', ')}`);
            }

            // Send data til main.ts
            const event = new CustomEvent('oddsUploaded', { 
                detail: bookmakers 
            });
            window.dispatchEvent(event);

        } catch (error) {
            console.error('Fejl ved parsing af CSV:', error);
            alert(`Fejl ved indlæsning af fil: ${error instanceof Error ? error.message : 'Ukendt fejl'}`);
        }
    };

    reader.readAsText(file);
}

export function downloadTemplate() {
    const headers = ['name', 'team1', 'draw', 'team2', 'fixedStake', 'minOdds'];
    const exampleData = [
        ['Unibet', '2.10', '3.40', '3.20', '100', '1.5'],
        ['Bet365', '2.15', '3.35', '3.15', '100', '1.5']
    ];

    const csvContent = [
        headers.join(','),
        ...exampleData.map(row => row.join(','))
    ].join('\n');

    downloadCSV(csvContent, 'odds_template.csv');
} 