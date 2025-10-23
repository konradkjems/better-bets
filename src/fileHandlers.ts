import { getCurrentCustomer, generateBookmakerId } from './main';

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

function syncInputFields(bookmakerId: string, team1Input: HTMLInputElement, drawInput: HTMLInputElement, team2Input: HTMLInputElement): void {
    // Find både expanded og collapsed input felter
    const team1Expanded = document.getElementById(`${bookmakerId}-team1`) as HTMLInputElement;
    const team1Collapsed = document.getElementById(`${bookmakerId}-team1-inline`) as HTMLInputElement;
    const drawExpanded = document.getElementById(`${bookmakerId}-draw`) as HTMLInputElement;
    const drawCollapsed = document.getElementById(`${bookmakerId}-draw-inline`) as HTMLInputElement;
    const team2Expanded = document.getElementById(`${bookmakerId}-team2`) as HTMLInputElement;
    const team2Collapsed = document.getElementById(`${bookmakerId}-team2-inline`) as HTMLInputElement;
    
    // Synkroniser team1
    if (team1Expanded && team1Collapsed) {
        team1Expanded.value = team1Input.value;
        team1Collapsed.value = team1Input.value;
    }
    
    // Synkroniser draw
    if (drawExpanded && drawCollapsed) {
        drawExpanded.value = drawInput.value;
        drawCollapsed.value = drawInput.value;
    }
    
    // Synkroniser team2
    if (team2Expanded && team2Collapsed) {
        team2Expanded.value = team2Input.value;
        team2Collapsed.value = team2Input.value;
    }
}

function syncAllBookmakerCards(): void {
    // Find all BookmakerCard instances and sync their input fields
    const bookmakerCards = document.querySelectorAll('[data-bookmaker]');
    bookmakerCards.forEach(card => {
        const bookmakerAttr = card.getAttribute('data-bookmaker');
        if (bookmakerAttr) {
            // Convert back to bookmaker name
            const bookmakerName = bookmakerAttr.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
            const bookmakerId = generateBookmakerId(bookmakerName);
            
            ['team1', 'draw', 'team2'].forEach(field => {
                const expandedInput = document.getElementById(`${bookmakerId}-${field}`) as HTMLInputElement;
                const inlineInput = document.getElementById(`${bookmakerId}-${field}-inline`) as HTMLInputElement;
                
                if (expandedInput && inlineInput) {
                    // Sync both ways
                    expandedInput.value = inlineInput.value;
                    inlineInput.value = expandedInput.value;
                }
            });
        }
    });
}

export function handleFileUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    
    if (!file) {
        alert('Ingen fil valgt');
        return;
    }

    // Valider filtype
    const validTypes = ['text/csv', 'application/csv', 'text/plain'];
    const validExtensions = ['.csv'];
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    
    if (!validTypes.includes(file.type) && !validExtensions.includes(fileExtension)) {
        alert('Venligst vælg en CSV fil (.csv). Den valgte fil er ikke en gyldig CSV fil.');
        input.value = ''; // Ryd input feltet
        return;
    }

    // Valider filstørrelse (max 1MB)
    const maxSize = 1024 * 1024; // 1MB
    if (file.size > maxSize) {
        alert('Filen er for stor. Maksimal størrelse er 1MB.');
        input.value = '';
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const text = e.target?.result as string;
        if (!text) {
            alert('Kunne ikke læse filen');
            return;
        }

        // Valider at filen ikke er tom
        if (text.trim().length === 0) {
            alert('CSV filen er tom');
            return;
        }

        // Split på både \n og \r\n for at håndtere forskellige filformater
        const lines = text.split(/\r?\n/).filter(line => line.trim());
        const customer = getCurrentCustomer();
        
        console.log('Indlæser CSV fil med følgende indhold:', text);
        console.log('Linjer efter split:', lines);
        
        if (lines.length < 2) {
            alert('CSV filen mangler data. Der skal være mindst en header række og en data række.');
            return;
        }

        // Valider header format
        const headerRow = lines[0].toLowerCase();
        const requiredHeaders = ['bookmaker', 'hold 1', 'uafgjort', 'hold 2'];
        const hasRequiredHeaders = requiredHeaders.every(header => headerRow.includes(header));
        
        if (!hasRequiredHeaders) {
            alert(`CSV filen har ikke det korrekte format. Header skal indeholde: ${requiredHeaders.join(', ')}.\n\nBrug venligst skabelonen ved at klikke på "Download Skabelon".`);
            return;
        }

        let updatedCount = 0;
        let errorCount = 0;
        
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
                errorCount++;
                continue;
            }
            
            const bookmakerId = generateBookmakerId(matchingBookmaker.name);
            const team1Input = document.getElementById(`${bookmakerId}-team1`) as HTMLInputElement || 
                              document.getElementById(`${bookmakerId}-team1-inline`) as HTMLInputElement;
            const drawInput = document.getElementById(`${bookmakerId}-draw`) as HTMLInputElement || 
                             document.getElementById(`${bookmakerId}-draw-inline`) as HTMLInputElement;
            const team2Input = document.getElementById(`${bookmakerId}-team2`) as HTMLInputElement || 
                              document.getElementById(`${bookmakerId}-team2-inline`) as HTMLInputElement;
            
            if (!team1Input || !drawInput || !team2Input) {
                console.warn(`Kunne ikke finde input felter for ${matchingBookmaker.name}`);
                errorCount++;
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
                
                // Synkroniser mellem expanded og collapsed input felter
                syncInputFields(bookmakerId, team1Input, drawInput, team2Input);
            }
        }

        // Nulstil input feltet så samme fil kan uploades igen
        input.value = '';

        if (updatedCount > 0) {
            let message = `CSV fil er blevet indlæst succesfuldt!\n\nOpdaterede odds for ${updatedCount} bookmakere.`;
            if (errorCount > 0) {
                message += `\n\n${errorCount} rækker kunne ikke behandles (ukendte bookmakere eller manglende data).`;
            }
            alert(message);
            
            // Sync all BookmakerCard instances
            syncAllBookmakerCards();
            
            // Trigger beregning automatisk efter upload
            const calculateButton = document.getElementById('calculateButton');
            if (calculateButton) {
                calculateButton.click();
            }
        } else {
            alert('Ingen odds blev opdateret. Tjek at CSV filen har det korrekte format og indeholder gyldige bookmakere.\n\nBrug venligst skabelonen ved at klikke på "Download Skabelon".');
        }
    };
    
    reader.onerror = () => {
        alert('Der opstod en fejl ved indlæsning af filen');
        console.error('FileReader error:', reader.error);
    };
    
    reader.readAsText(file);
} 