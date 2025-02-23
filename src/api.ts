import type { BookmakerOdds, Bookmaker } from './types';

const API_KEY = import.meta.env.VITE_ODDS_API_KEY;
const BASE_URL = 'https://api.the-odds-api.com/v4';
const SOCCER_KEY = 'soccer';
const REGION = 'eu';  // Vi bruger kun EU regionen for danske bookmakers

// Tilføj standard værdier for dage og ligaer
const DEFAULT_DAYS = 7;  // Standard 7 dage frem
export const SOCCER_LEAGUES = {
    'champions-league': 'Champions League',
    'europa-league': 'Europa League',
    'conference-league': 'Conference League',
    'superliga': 'Superliga',
    'premier-league': 'Premier League',
    'la-liga': 'La Liga',
    'bundesliga': 'Bundesliga',
    'serie-a': 'Serie A',
    'ligue-1': 'Ligue 1',
    'eredivisie': 'Eredivisie'
} as const;

// Tilføj mapping mellem API bookmaker navne og vores system navne
const BOOKMAKER_NAME_MAPPING: { [key: string]: string } = {
    'unibet_eu': 'Unibet',
    'bet365': 'Bet365',
    'leovegas': 'LeoVegas',
    'comeon': 'ComeOn',
    'nordicbet': 'NordicBet',
    'sport888': '888sport',
    'bet25': 'Bet25',
    'expekt': 'Expekt',
    'cashpoint': 'Cashpoint',
    'jackpotbet': 'Jackpotbet',
    'tipwin': 'Tipwin',
    'betano': 'Betano',
    'mrgreen': 'Mrgreen',
    'mrplay': 'Mrplay'
}; 

// Tilføj validering af API-nøgle
if (!API_KEY) {
    const errorMessage = 'VITE_ODDS_API_KEY er ikke konfigureret i .env filen';
    console.error(errorMessage);
    throw new Error(errorMessage);
} else {
    console.log('API nøgle er konfigureret:', API_KEY.substring(0, 5) + '...');
}

export interface ApiMatch {
    id: string;
    sport_key: string;
    sport_title: string;
    commence_time: string;
    home_team: string;
    away_team: string;
    bookmakers: Array<{
        key: string;
        title: string;
        markets: Array<{
            key: string;
            outcomes: Array<{
                name: string;
                price: number;
            }>;
        }>;
    }>;
}

export interface Sport {
    key: string;
    title: string;
    group: string;
    details: string;
    active: boolean;
}

export async function fetchAvailableSports(): Promise<Sport[]> {
    try {
        console.log('Henter sportsgrene...');
        const url = new URL(`${BASE_URL}/sports`);
        url.searchParams.append('apiKey', API_KEY);
        
        console.log('Request URL:', url.toString().replace(API_KEY, 'XXXXX'));

        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Fejl:', {
                status: response.status,
                statusText: response.statusText,
                errorText
            });
            throw new Error(`API Fejl: ${response.status} ${response.statusText}`);
        }

        const sports = await response.json();
        console.log('Modtaget sportsgrene:', sports.length);
        
        if (!Array.isArray(sports)) {
            throw new Error('Uventet API svar - forventede en liste af sportsgrene');
        }

        return sports
            .filter((sport: Sport) => sport.active)
            .sort((a: Sport, b: Sport) => a.title.localeCompare(b.title, 'da'));
    } catch (error) {
        console.error('Detaljeret fejl ved hentning af sportsgrene:', error);
        throw new Error('Der kunne ikke hentes sportsgrene. Kontroller din internetforbindelse og prøv igen.');
    }
} 

interface FetchMatchesOptions {
    daysFromNow?: number;
    league?: keyof typeof SOCCER_LEAGUES;
}

export async function fetchSoccerMatches(options: FetchMatchesOptions = {}): Promise<ApiMatch[]> {
    try {
        const { daysFromNow = DEFAULT_DAYS, league } = options;
        console.log('Henter fodboldkampe fra EU regionen...');
        console.log('Søgekriterier:', { daysFromNow, league });
        console.log('API nøgle status:', API_KEY ? 'Konfigureret' : 'Mangler');
        
        // Beregn start og slut datoer for hele perioden
        const now = new Date();
        const startDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
        startDate.setUTCHours(0, 0, 0, 0); // Sæt starttidspunkt til midnat

        const endDate = new Date(startDate);
        endDate.setUTCDate(startDate.getUTCDate() + daysFromNow - 1); // Juster for at inkludere hele sidste dag
        endDate.setUTCHours(23, 59, 59, 0);
        
        // Debug log for dato beregning
        console.log('Dato beregning:', {
            now: now.toISOString(),
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
            daysFromNow
        });

        // Formater datoerne præcist som API'en kræver
        const formatDate = (date: Date) => {
            const year = date.getUTCFullYear();
            const month = String(date.getUTCMonth() + 1).padStart(2, '0');
            const day = String(date.getUTCDate()).padStart(2, '0');
            const hours = String(date.getUTCHours()).padStart(2, '0');
            const minutes = String(date.getUTCMinutes()).padStart(2, '0');
            const seconds = String(date.getUTCSeconds()).padStart(2, '0');
            return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
        };

        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(endDate);

        console.log('Henter kampe for periode:', {
            start: formattedStartDate,
            end: formattedEndDate
        });

        const url = new URL(`${BASE_URL}/sports/${SOCCER_KEY}/odds`);
        url.searchParams.append('apiKey', API_KEY);
        url.searchParams.append('regions', REGION);
        url.searchParams.append('markets', 'h2h');
        url.searchParams.append('dateFormat', 'iso');
        url.searchParams.append('oddsFormat', 'decimal');
        url.searchParams.append('commenceTimeFrom', formattedStartDate);
        url.searchParams.append('commenceTimeTo', formattedEndDate);

        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
            }
        });

        if (!response.ok) {
            throw new Error(`API Fejl: ${response.status} ${response.statusText}`);
        }

        const matches = await response.json();
        
        if (!Array.isArray(matches)) {
            throw new Error('Uventet API svar - forventede en liste af kampe');
        }

        console.log('Samlet antal kampe:', matches.length);

        if (matches.length === 0) {
            throw new Error('Ingen kampe fundet i den specificerede periode');
        }

        // Log alle modtagne kampe med deres datoer
        console.log('Modtagne kampe med datoer:', matches.map(match => ({
            teams: `${match.home_team} vs ${match.away_team}`,
            date: new Date(match.commence_time).toLocaleString('da-DK', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                timeZone: 'Europe/Copenhagen'
            }),
            rawDate: match.commence_time
        })));

        // Filtrer efter liga hvis specificeret
        let filteredMatches = matches;
        if (league) {
            const leagueName = SOCCER_LEAGUES[league].toLowerCase();
            console.log('Søger efter liga:', leagueName);
            
            filteredMatches = matches.filter(match => {
                const matchTitle = match.sport_title.toLowerCase();
                const homeTeam = match.home_team.toLowerCase();
                const awayTeam = match.away_team.toLowerCase();
                
                // Log hver kamp for debugging
                console.log('Undersøger kamp:', {
                    title: matchTitle,
                    teams: `${homeTeam} vs ${awayTeam}`,
                    isMatch: matchTitle.includes(leagueName)
                });

                // Basis tjek for alle ligaer
                if (matchTitle.includes(leagueName)) {
                    return true;
                }

                // Ekstra tjek kun for Premier League
                if (league === 'premier-league') {
                    return matchTitle.includes('premier league') || 
                           (homeTeam.includes('manchester') || awayTeam.includes('manchester')) ||
                           (homeTeam.includes('liverpool') || awayTeam.includes('liverpool')) ||
                           (homeTeam.includes('chelsea') || awayTeam.includes('chelsea')) ||
                           (homeTeam.includes('arsenal') || awayTeam.includes('arsenal'));
                }

                return false;
            });
            
            console.log(`Filtreret til ${filteredMatches.length} kampe for ${SOCCER_LEAGUES[league]}`);
            
            // Log de fundne kampe
            if (filteredMatches.length > 0) {
                console.log('Fundne kampe:', filteredMatches.map(match => ({
                    teams: `${match.home_team} vs ${match.away_team}`,
                    title: match.sport_title,
                    date: match.commence_time
                })));
            }
        }

        // Sorter efter dansk tid
        return filteredMatches.sort((a: ApiMatch, b: ApiMatch) => {
            const dateA = new Date(a.commence_time);
            const dateB = new Date(b.commence_time);
            return dateA.getTime() - dateB.getTime();
        });
    } catch (error) {
        console.error('Detaljeret fejl ved hentning af kampe:', error);
        if (error instanceof Error) {
            throw new Error(`Der kunne ikke hentes kampe: ${error.message}`);
        }
        throw new Error('Der kunne ikke hentes kampe. Kontroller din internetforbindelse og prøv igen.');
    }
}

// Hjælpefunktion til at konvertere API odds til vores format
export function convertApiOddsToBookmakerOdds(match: ApiMatch, bookmakerInfo: Bookmaker[]): BookmakerOdds[] {
    if (!match || !match.bookmakers || !Array.isArray(match.bookmakers)) {
        console.error('Ugyldigt match objekt modtaget:', match);
        throw new Error('Kunne ikke finde odds for den valgte kamp');
    }

    if (match.bookmakers.length === 0) {
        console.warn('Ingen bookmaker odds fundet for kampen');
        throw new Error('Der er ingen odds tilgængelige for denne kamp endnu');
    }

    console.log('Konverterer odds for kamp:', {
        homeTeam: match.home_team,
        awayTeam: match.away_team,
        bookmakers: match.bookmakers.length
    });

    // Debug: Log alle bookmakers fra API'en
    console.log('API bookmakers:', match.bookmakers.map(b => ({
        key: b.key,
        title: b.title
    })));

    // Debug: Log vores system bookmakers
    console.log('System bookmakers:', bookmakerInfo.map(b => b.name));

    // Debug: Log mapping mellem API og system
    console.log('Bookmaker mapping:', BOOKMAKER_NAME_MAPPING);

    const odds = match.bookmakers
        .map(apiBookmaker => {
            // Debug: Log hver bookmaker vi prøver at matche
            console.log('Prøver at matche bookmaker:', {
                apiKey: apiBookmaker.key,
                apiTitle: apiBookmaker.title,
                mappedName: BOOKMAKER_NAME_MAPPING[apiBookmaker.key]
            });

            if (!apiBookmaker || !apiBookmaker.markets || !Array.isArray(apiBookmaker.markets)) {
                console.warn('Ugyldig bookmaker data:', apiBookmaker);
                return null;
            }

            const market = apiBookmaker.markets[0]; // Vi bruger kun h2h marked
            if (!market || !market.outcomes || !Array.isArray(market.outcomes)) {
                console.warn('Ingen gyldige markeder fundet for bookmaker:', apiBookmaker.title);
                return null;
            }

            // Brug API'ens key til at finde det korrekte bookmaker navn
            const mappedBookmakerName = BOOKMAKER_NAME_MAPPING[apiBookmaker.key];
            
            // Debug: Log mapping resultatet
            console.log('Mapping resultat:', {
                apiKey: apiBookmaker.key,
                mappedName: mappedBookmakerName,
                foundInSystem: bookmakerInfo.some(b => b.name === mappedBookmakerName)
            });

            const bookmaker = bookmakerInfo.find(b => 
                b.name === mappedBookmakerName
            );

            if (!bookmaker) {
                console.warn('Bookmaker ikke fundet i vores system:', apiBookmaker.key, '(mapped to:', mappedBookmakerName, ')');
                return null;
            }

            const homeOdds = market.outcomes.find(o => o.name === match.home_team)?.price || 0;
            const awayOdds = market.outcomes.find(o => o.name === match.away_team)?.price || 0;
            const drawOdds = market.outcomes.find(o => o.name === 'Draw')?.price || 0;

            if (!homeOdds || !awayOdds || !drawOdds) {
                console.warn('Manglende odds for bookmaker:', {
                    bookmaker: apiBookmaker.key,
                    homeOdds,
                    drawOdds,
                    awayOdds
                });
                return null;
            }

            return {
                name: bookmaker.name,
                team1: homeOdds,
                draw: drawOdds,
                team2: awayOdds,
                fixedStake: bookmaker.fixedStake,
                actualCost: bookmaker.actualCost,
                minOdds: bookmaker.minOdds,
                preferLoss: bookmaker.preferLoss,
                avoidWin: bookmaker.avoidWin,
                isActive: bookmaker.isActive
            };
        })
        .filter(Boolean) as BookmakerOdds[];

    // Debug: Log de konverterede odds
    console.log('Antal konverterede odds:', odds.length);
    console.log('Konverterede bookmakers:', odds.map(o => o.name));

    if (odds.length === 0) {
        throw new Error('Ingen brugbare odds fundet for denne kamp');
    }

    return odds;
} 