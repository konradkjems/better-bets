import { getCurrentCustomer, generateBookmakerId, BookmakerOdds } from './main';

interface Bookmaker {
    name: string;
}

export function parseDecimalValue(value: string): number {
    // Fjern eventuelle whitespace og citationstegn
    const cleaned = value.trim().replace(/^"(.*)"$/, '$1');
    
    // Hvis værdien indeholder komma, antag at det er decimalseparator
    if (cleaned.includes(',')) {
        // Erstat komma med punktum og fjern eventuelle andre kommaer
        const parts = cleaned.split(',');
        if (parts.length > 2) {
            // Hvis der er flere kommaer, tag kun de første to dele
            return parseFloat(parts[0] + '.' + parts[1]);
        }
        return parseFloat(cleaned.replace(',', '.'));
    }
    
    // Ellers prøv at parse direkte
    return parseFloat(cleaned);
}

export function handleFileUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    
    if (!file) {
        alert('Ingen fil valgt');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const text = e.target?.result as string;
        if (!text) {
            alert('Kunne ikke læse filen');
            return;
        }

        // Split på både \n og \r\n for at håndtere forskellige filformater
        const lines = text.split(/\r?\n/).filter(line => line.trim());
        const customer = getCurrentCustomer();
        
        console.log('Indlæser CSV fil med følgende indhold:', text);
        console.log('Linjer efter split:', lines);
        
        if (lines.length < 2) {
            alert('CSV filen er tom eller mangler data');
            return;
        }

        // Validér header
        const headerRow = lines[0].toLowerCase();
        if (!headerRow.includes('bookmaker') || 
            !headerRow.includes('hold 1') || 
            !headerRow.includes('uafgjort') || 
            !headerRow.includes('hold 2')) {
            alert('CSV filen har ikke det korrekte format. Brug venligst skabelonen.');
            return;
        }

        let updatedCount = 0;
        
        // Start fra linje 1 for at skippe header
        for (let i = 1; i < lines.length; i++) {
            const row = lines[i];
            if (!row.trim()) continue;
            
            // Split på semikolon i stedet for komma
            const cells = row.split(';').map(cell => cell.trim());
            const [bookmaker, ...oddsCells] = cells;
            
            if (!bookmaker) continue;
            
            console.log('Behandler række:', { bookmaker, odds: oddsCells });
            
            // Find den matchende bookmaker (case-insensitive)
            const matchingBookmaker = customer.bookmakers.find(
                b => b.name.toLowerCase() === bookmaker.toLowerCase()
            );
            
            if (!matchingBookmaker) {
                console.warn(`Kunne ikke finde bookmaker: ${bookmaker}`);
                continue;
            }
            
            const bookmakerId = generateBookmakerId(matchingBookmaker.name);
            const team1Input = document.getElementById(`${bookmakerId}-team1`) as HTMLInputElement;
            const drawInput = document.getElementById(`${bookmakerId}-draw`) as HTMLInputElement;
            const team2Input = document.getElementById(`${bookmakerId}-team2`) as HTMLInputElement;
            
            if (!team1Input || !drawInput || !team2Input) {
                console.warn(`Kunne ikke finde input felter for ${matchingBookmaker.name}`);
                continue;
            }

            let updatedFields = 0;

            // Parse og opdater hver odds værdi
            if (oddsCells[0]) {
                const team1Value = parseDecimalValue(oddsCells[0]);
                if (!isNaN(team1Value) && team1Value > 0) {
                    team1Input.value = team1Value.toString();
                    team1Input.dispatchEvent(new Event('input', { bubbles: true }));
                    updatedFields++;
                    console.log(`Sat ${matchingBookmaker.name} team1 til ${team1Value}`);
                }
            }

            if (oddsCells[1]) {
                const drawValue = parseDecimalValue(oddsCells[1]);
                if (!isNaN(drawValue) && drawValue > 0) {
                    drawInput.value = drawValue.toString();
                    drawInput.dispatchEvent(new Event('input', { bubbles: true }));
                    updatedFields++;
                    console.log(`Sat ${matchingBookmaker.name} draw til ${drawValue}`);
                }
            }
            
            if (oddsCells[2]) {
                const team2Value = parseDecimalValue(oddsCells[2]);
                if (!isNaN(team2Value) && team2Value > 0) {
                    team2Input.value = team2Value.toString();
                    team2Input.dispatchEvent(new Event('input', { bubbles: true }));
                    updatedFields++;
                    console.log(`Sat ${matchingBookmaker.name} team2 til ${team2Value}`);
                }
            }

            if (updatedFields > 0) {
                updatedCount++;
            }
        }

        // Nulstil input feltet så samme fil kan uploades igen
        input.value = '';

        if (updatedCount > 0) {
            alert(`CSV fil er blevet indlæst. Opdaterede odds for ${updatedCount} bookmakere.`);
            
            // Trigger beregning automatisk efter upload
            const calculateButton = document.getElementById('calculateButton');
            if (calculateButton) {
                calculateButton.click();
            }
        } else {
            alert('Ingen odds blev opdateret. Tjek at CSV filen har det korrekte format.');
        }
    };
    
    reader.onerror = () => {
        alert('Der opstod en fejl ved indlæsning af filen');
        console.error('FileReader error:', reader.error);
    };
    
    reader.readAsText(file);
} 