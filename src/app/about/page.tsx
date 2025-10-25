export default function AboutPage() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">About Better Bets</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-6">
              Better Bets is an advanced arbitrage betting calculator designed to help betting enthusiasts 
              find guaranteed profit opportunities across multiple bookmakers. Our sophisticated algorithm 
              calculates optimal bet distributions to ensure profits regardless of the outcome.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">What is Arbitrage Betting?</h2>
            <p className="text-gray-700 mb-6">
              Arbitrage betting, also known as "arbing," is a betting technique that involves placing bets 
              on all possible outcomes of an event at different bookmakers to guarantee a profit. This is 
              possible when bookmakers have different opinions on the probability of an event occurring, 
              creating price discrepancies that can be exploited.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How It Works</h2>
            <ol className="list-decimal list-inside text-gray-700 mb-6 space-y-2">
              <li>Enter odds from multiple bookmakers for the same event</li>
              <li>Our algorithm calculates the optimal bet amounts for each outcome</li>
              <li>Place the calculated bets across different bookmakers</li>
              <li>Guarantee a profit regardless of which outcome occurs</li>
            </ol>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Features</h2>
            <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
              <li>Advanced arbitrage calculation engine</li>
              <li>Support for multiple bookmakers and bonus types</li>
              <li>CSV import/export for bulk odds management</li>
              <li>Calculation history and tracking</li>
              <li>Responsive design for mobile and desktop</li>
              <li>Secure authentication and data protection</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Disclaimer</h2>
            <p className="text-gray-700 mb-6">
              Please note that arbitrage betting opportunities are rare and may not always be available. 
              Always ensure you comply with the terms and conditions of each bookmaker. Better Bets is 
              a tool to assist with calculations and does not guarantee profits or betting success.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
