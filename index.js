const parse = require('csv-parser');
const fs = require('fs');
const HabitablePlanets = [];

function isHabitablePlanets(planet) {
    // Convert string values to numbers and ensure correct comparisons
    const koiInsol = parseFloat(planet['koi_insol']);
    const koiPrad = parseFloat(planet['koi_prad']);
    
    return planet['koi_disposition'] === 'CONFIRMED'
        && koiInsol > 0.36 && koiInsol < 1.11
        && koiPrad < 1.6;
}

fs.createReadStream('kepler_data.csv')
    .pipe(parse({
        comment: '#',
        columns: true,
    }))
    .on('data', (data) => {
        // Log each planet to check the values before filtering
        console.log("Planet Data: ", data);
        
        if (isHabitablePlanets(data)) {
            HabitablePlanets.push(data);
        }
    })
    .on('error', (err) => {
        console.log(err);
    })
    .on('end', () => {
        // Log planet names or a message if none were found
        if (HabitablePlanets.length > 0) {
            console.log("Habitable Planets List: ");
            HabitablePlanet.forEach((planet, index) => {
                console.log(`Planet ${index + 1}: `, planet['kepler_name']);
            });
        } else {
            console.log('No habitable planets found.');
        }

        console.log(`${isHabitablePlanets.length} habitable planets found!`);
        console.log('done');
    });
