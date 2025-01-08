function calculateArbitrage() {
    const totalAmount = parseFloat(document.getElementById('totalAmount').value);
    const odds1 = parseFloat(document.getElementById('odds1').value);
    const odds2 = parseFloat(document.getElementById('odds2').value);
    const odds3 = parseFloat(document.getElementById('odds3').value);

    if (!totalAmount || !odds1 || !odds2 || !odds3) {
        alert('Venligst udfyld alle felter');
        return;
    }

    // Beregn arbitrage mulighed
    const impliedProb1 = 1 / odds1;
    const impliedProb2 = 1 / odds2;
    const impliedProb3 = 1 / odds3;
    const totalImpliedProb = impliedProb1 + impliedProb2 + impliedProb3;

    // Hvis total sandsynlighed er under 1, er der en arbitrage mulighed
    const isArbitrage = totalImpliedProb < 1;
    
    // Beregn optimal fordeling
    const stake1 = (totalAmount * impliedProb1) / totalImpliedProb;
    const stake2 = (totalAmount * impliedProb2) / totalImpliedProb;
    const stake3 = (totalAmount * impliedProb3) / totalImpliedProb;

    // Beregn potentiel profit
    const potentialReturn1 = stake1 * odds1;
    const potentialReturn2 = stake2 * odds2;
    const potentialReturn3 = stake3 * odds3;

    // Vis resultater
    const resultsBody = document.getElementById('resultsBody');
    resultsBody.innerHTML = `
        <tr>
            <td>Hold 1</td>
            <td>${stake1.toFixed(2)} DKK</td>
            <td>${potentialReturn1.toFixed(2)} DKK</td>
        </tr>
        <tr>
            <td>Uafgjort</td>
            <td>${stake2.toFixed(2)} DKK</td>
            <td>${potentialReturn2.toFixed(2)} DKK</td>
        </tr>
        <tr>
            <td>Hold 2</td>
            <td>${stake3.toFixed(2)} DKK</td>
            <td>${potentialReturn3.toFixed(2)} DKK</td>
        </tr>
    `;

    // Beregn og vis profit information
    const expectedReturn = potentialReturn1; // Alle returns burde være ens
    const profit = expectedReturn - totalAmount;
    const profitPercentage = (profit / totalAmount) * 100;

    const profitInfo = document.getElementById('profitInfo');
    profitInfo.innerHTML = `
        ${isArbitrage ? 'Arbitrage mulighed fundet!' : 'Ingen sikker arbitrage mulighed.'}
        <br>
        Forventet afkast: ${expectedReturn.toFixed(2)} DKK
        <br>
        Profit: ${profit.toFixed(2)} DKK (${profitPercentage.toFixed(2)}%)
    `;

    // Vis resultat sektion
    document.getElementById('results').style.display = 'block';
} 