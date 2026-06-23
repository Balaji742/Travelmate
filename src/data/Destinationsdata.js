import bali1 from "../assets/bali1.jpg";
import paris from "../assets/paris.jpg";
import dubai from "../assets/dubai.jpg";
import tokyo from "../assets/tokyo.jpg";
import maldives from "../assets/maldives.jpg";
import banff from "../assets/banff.jpg";
import santorini from "../assets/santorini.jpg";
import swiss from "../assets/swiss.jpg";
import newyork from "../assets/newyork.jpg";
import singapore from "../assets/singapore.jpg";
import sydney from "../assets/sydney.jpg";
import goa from "../assets/goa.jpg";
import london from "../assets/london.jpg";
import rome from "../assets/rome.jpg";
import fuji from "../assets/fuji.jpg";

export const destinations = [
    {
        id: 1,
        title: "Bali",
        country: "Indonesia",
        category: "Beach",
        price: "$999",
        image: bali1,
        description:
            "Bali is a beautiful island in Indonesia known for its stunning beaches, lush green rice terraces, ancient temples, and vibrant culture. It is one of the world's most popular tourist destinations, attracting visitors with its natural beauty, water sports, nightlife, and traditional Balinese heritage. Travelers can enjoy activities such as surfing, hiking, temple visits, and exploring scenic waterfalls. Bali offers a perfect mix of relaxation, adventure, and cultural experiences.",
        rating: {
            rate: 3.9,
            count: 120
        },
        duration: {
            ShortTrip: "3 Days / 2 Nights",
            StandardTrip: "5 Days / 4 Nights",
            ExtendedTrip: "7 Days / 6 Nights"
        },
        bestSeason: "April - October",
        GroupSize: "2 - 10 Travelers",
        latitude: -8.4095,
        longitude: 115.1889
    },
    {
        id: 2,
        title: "Paris",
        country: "France",
        category: "City",
        price: "$1499",
        image: paris,
        description:
            "Paris is the capital city of France, famous for its iconic landmarks, world-class museums, charming streets, and rich cultural heritage. Known as the 'City of Light', Paris attracts millions of visitors every year with attractions like the Eiffel Tower, Louvre Museum, Notre-Dame Cathedral, and Seine River cruises. Travelers can enjoy fine dining, shopping, art galleries, historic architecture, and romantic experiences throughout the city.",
        rating: {
            rate: 4.7,
            count: 350
        },
        duration: {
            ShortTrip: "3 Days / 2 Nights",
            StandardTrip: "5 Days / 4 Nights",
            ExtendedTrip: "7 Days / 6 Nights"
        },
        bestSeason: "April - June, September - October",
        GroupSize: "2 - 15 Travelers",
        latitude: 48.8566,
        longitude: 2.3522
    },
    {
        id: 3,
        title: "Dubai",
        country: "UAE",
        category: "City",
        price: "$1299",
        image: dubai,
        description:
            "Dubai is a modern city in the United Arab Emirates, renowned for its futuristic skyline, luxury shopping, world-class attractions, and vibrant nightlife. Visitors can explore iconic landmarks such as the Burj Khalifa, Palm Jumeirah, Dubai Mall, and the Dubai Marina. From desert safaris and cultural experiences to beaches and adventure activities, Dubai offers a unique blend of tradition and innovation.",
        rating: {
            rate: 4.6,
            count: 280
        },
        duration: {
            ShortTrip: "3 Days / 2 Nights",
            StandardTrip: "5 Days / 4 Nights",
            ExtendedTrip: "7 Days / 6 Nights"
        },
        bestSeason: "November - March",
        GroupSize: "2 - 15 Travelers",
        latitude: 25.2048,
        longitude: 55.2708
    },
    {
        id: 4,
        title: "Tokyo",
        country: "Japan",
        category: "City",
        price: "$1799",
        image: tokyo,
        description:
            "Tokyo is the capital city of Japan, known for its cutting-edge technology, vibrant culture, historic temples, and world-famous cuisine. Visitors can explore iconic attractions such as Tokyo Tower, Shibuya Crossing, Senso-ji Temple, and the Imperial Palace. From bustling shopping districts and anime culture to serene gardens and traditional experiences, Tokyo offers a unique blend of modern innovation and rich heritage.",
        rating: {
            rate: 4.8,
            count: 420
        },
        duration: {
            ShortTrip: "3 Days / 2 Nights",
            StandardTrip: "5 Days / 4 Nights",
            ExtendedTrip: "7 Days / 6 Nights"
        },
        bestSeason: "March - May, September - November",
        GroupSize: "2 - 12 Travelers",
        latitude: 35.6762,
        longitude: 139.6503
    }, {
        id: 5,
        title: "Maldives",
        country: "Maldives",
        category: "Beach",
        price: "$1899",
        image: maldives,
        description:
            "The Maldives is a tropical paradise in the Indian Ocean, famous for its crystal-clear waters, white sandy beaches, luxury resorts, and vibrant marine life. Visitors can enjoy snorkeling, scuba diving, island hopping, sunset cruises, and relaxing overwater villa stays. With its breathtaking scenery and peaceful atmosphere, the Maldives is one of the world's most sought-after destinations for couples, families, and beach lovers.",
        rating: {
            rate: 4.9,
            count: 500
        },
        duration: {
            ShortTrip: "3 Days / 2 Nights",
            StandardTrip: "5 Days / 4 Nights",
            ExtendedTrip: "7 Days / 6 Nights"
        },
        bestSeason: "November - April",
        GroupSize: "2 - 8 Travelers",
        latitude: 3.2028,
        longitude: 73.2207
    },
    {
        id: 6,
        title: "Banff",
        country: "Canada",
        category: "Mountain",
        price: "$1699",
        image: banff,
        description:
            "Banff is a breathtaking mountain destination in Canada, renowned for its stunning landscapes, turquoise lakes, snow-capped peaks, and outdoor adventures. Located in the heart of Banff National Park, visitors can explore attractions such as Lake Louise, Moraine Lake, Banff Gondola, and scenic hiking trails. Whether it's skiing in winter, hiking in summer, or simply enjoying the natural beauty, Banff offers an unforgettable experience for nature lovers and adventure seekers.",
        rating: {
            rate: 4.8,
            count: 310
        },
        duration: {
            ShortTrip: "3 Days / 2 Nights",
            StandardTrip: "5 Days / 4 Nights",
            ExtendedTrip: "7 Days / 6 Nights"
        },
        bestSeason: "June - September, December - March",
        GroupSize: "2 - 12 Travelers",
        latitude: 51.1784,
        longitude: -115.5708
    },
    {
        id: 7,
        title: "Santorini",
        country: "Greece",
        category: "Beach",
        price: "$1599",
        image: santorini,
        description:
            "Santorini is a stunning Greek island in the Aegean Sea, famous for its whitewashed buildings, blue-domed churches, dramatic cliffs, and breathtaking sunsets. Visitors can explore charming villages like Oia and Fira, relax on unique volcanic beaches, enjoy boat tours around the caldera, and experience the island's rich history and Mediterranean cuisine. Santorini is one of the world's most romantic destinations, offering a perfect blend of beauty, culture, and relaxation.",
        rating: {
            rate: 4.8,
            count: 390
        },
        duration: {
            ShortTrip: "3 Days / 2 Nights",
            StandardTrip: "5 Days / 4 Nights",
            ExtendedTrip: "7 Days / 6 Nights"
        },
        bestSeason: "April - June, September - October",
        GroupSize: "2 - 10 Travelers",
        latitude: 36.3932,
        longitude: 25.4615
    },
    {
        id: 8,
        title: "Swiss Alps",
        country: "Switzerland",
        category: "Mountain",
        price: "$2199",
        image: swiss,
        description:
            "The Swiss Alps are one of the world's most spectacular mountain regions, renowned for their snow-capped peaks, picturesque villages, crystal-clear lakes, and year-round outdoor adventures. Visitors can enjoy skiing, snowboarding, hiking, scenic train journeys, and breathtaking views of iconic mountains such as the Matterhorn and Jungfrau. Combining natural beauty, luxury resorts, and charming alpine culture, the Swiss Alps offer an unforgettable experience for nature lovers and adventure seekers.",
        rating: {
            rate: 4.9,
            count: 450
        },
        duration: {
            ShortTrip: "3 Days / 2 Nights",
            StandardTrip: "5 Days / 4 Nights",
            ExtendedTrip: "7 Days / 6 Nights"
        },
        bestSeason: "December - March, June - September",
        GroupSize: "2 - 12 Travelers",
        latitude: 46.8182,
        longitude: 8.2275
    },
    {
        id: 9,
        title: "New York",
        country: "USA",
        category: "City",
        price: "$1699",
        image: newyork,
        description:
            "New York City is one of the world's most iconic destinations, famous for its towering skyscrapers, vibrant culture, world-class entertainment, and diverse neighborhoods. Visitors can explore landmarks such as Times Square, the Statue of Liberty, Central Park, and the Empire State Building. From Broadway shows and renowned museums to shopping, dining, and nightlife, New York offers an exciting and unforgettable urban experience for travelers of all interests.",
        rating: {
            rate: 4.7,
            count: 480
        },
        duration: {
            ShortTrip: "3 Days / 2 Nights",
            StandardTrip: "5 Days / 4 Nights",
            ExtendedTrip: "7 Days / 6 Nights"
        },
        bestSeason: "April - June, September - November",
        GroupSize: "2 - 15 Travelers",
        latitude: 40.7128,
        longitude: -74.0060
    },
    {
        id: 10,
        title: "Singapore",
        country: "Singapore",
        category: "City",
        price: "$1399",
        image: singapore,
        description:
            "Singapore is a vibrant city-state in Southeast Asia, known for its modern skyline, world-class attractions, diverse culture, and exceptional cleanliness. Visitors can explore iconic landmarks such as Marina Bay Sands, Gardens by the Bay, Sentosa Island, and Merlion Park. From luxury shopping and delicious street food to futuristic architecture and lush green spaces, Singapore offers a unique blend of innovation, culture, and entertainment.",
        rating: {
            rate: 4.8,
            count: 430
        },
        duration: {
            ShortTrip: "3 Days / 2 Nights",
            StandardTrip: "5 Days / 4 Nights",
            ExtendedTrip: "7 Days / 6 Nights"
        },
        bestSeason: "February - April",
        GroupSize: "2 - 12 Travelers",
        latitude: 1.3521,
        longitude: 103.8198
    },
    {
        id: 11,
        title: "Sydney",
        country: "Australia",
        category: "City",
        price: "$1999",
        image: sydney,
        description:
            "Sydney is Australia's largest and most iconic city, famous for its stunning harbor, world-renowned landmarks, beautiful beaches, and vibrant cultural scene. Visitors can explore attractions such as the Sydney Opera House, Sydney Harbour Bridge, Bondi Beach, and Darling Harbour. From coastal walks and outdoor adventures to fine dining, shopping, and nightlife, Sydney offers a perfect blend of natural beauty and modern city life.",
        rating: {
            rate: 4.8,
            count: 410
        },
        duration: {
            ShortTrip: "3 Days / 2 Nights",
            StandardTrip: "5 Days / 4 Nights",
            ExtendedTrip: "7 Days / 6 Nights"
        },
        bestSeason: "September - November, March - May",
        GroupSize: "2 - 15 Travelers",
        latitude: -33.8688,
        longitude: 151.2093
    },
    {
        id: 12,
        title: "Goa",
        country: "India",
        category: "Beach",
        price: "$799",
        image: goa,
        description:
            "Goa is India's most popular beach destination, known for its golden sandy beaches, vibrant nightlife, Portuguese heritage, and tropical atmosphere. Visitors can relax on famous beaches like Baga, Calangute, and Palolem, explore historic churches and forts, enjoy water sports, and experience Goa's lively food and music culture. Whether you're looking for adventure, relaxation, or cultural experiences, Goa offers a perfect coastal getaway.",
        rating: {
            rate: 4.6,
            count: 380
        },
        duration: {
            ShortTrip: "3 Days / 2 Nights",
            StandardTrip: "5 Days / 4 Nights",
            ExtendedTrip: "7 Days / 6 Nights"
        },
        bestSeason: "November - February",
        GroupSize: "2 - 15 Travelers",
        latitude: 15.2993,
        longitude: 74.1240
    },

    {
        id: 13,
        title: "London",
        country: "United Kingdom",
        category: "City",
        price: "$1899",
        image: london,
        description:
            "London is the capital city of the United Kingdom, renowned for its rich history, iconic landmarks, world-class museums, and vibrant cultural scene. Visitors can explore famous attractions such as Buckingham Palace, the Tower of London, Big Ben, and the London Eye. From historic architecture and royal heritage to shopping, theatre, and diverse cuisine, London offers an unforgettable experience for travelers from around the world.",
        rating: {
            rate: 4.8,
            count: 460
        },
        duration: {
            ShortTrip: "3 Days / 2 Nights",
            StandardTrip: "5 Days / 4 Nights",
            ExtendedTrip: "7 Days / 6 Nights"
        },
        bestSeason: "March - May, September - November",
        GroupSize: "2 - 15 Travelers",
        latitude: 51.5074,
        longitude: -0.1278
    },

    {
        id: 14,
        title: "Rome",
        country: "Italy",
        category: "Historical",
        price: "$1699",
        image: rome,
        description:
            "Rome is the capital city of Italy and one of the world's most historic destinations, famous for its ancient monuments, Renaissance art, and rich cultural heritage. Visitors can explore iconic landmarks such as the Colosseum, Roman Forum, Pantheon, and Vatican City. From historic architecture and world-famous cuisine to charming piazzas and vibrant street life, Rome offers a captivating journey through centuries of history and culture.",
        rating: {
            rate: 4.8,
            count: 440
        },
        duration: {
            ShortTrip: "3 Days / 2 Nights",
            StandardTrip: "5 Days / 4 Nights",
            ExtendedTrip: "7 Days / 6 Nights"
        },
        bestSeason: "April - June, September - October",
        GroupSize: "2 - 15 Travelers",
        latitude: 41.9028,
        longitude: 12.4964
    },
    {
        id: 15,
        title: "Mount Fuji",
        country: "Japan",
        category: "Mountain",
        price: "$1499",
        image: fuji,
        description:
            "Mount Fuji is Japan's highest and most iconic mountain, celebrated for its perfect cone-shaped peak, breathtaking scenery, and cultural significance. Visitors can enjoy hiking trails, scenic viewpoints, lakes, hot springs, and stunning views of the mountain throughout the year. Surrounded by beautiful natural landscapes and traditional Japanese culture, Mount Fuji offers an unforgettable experience for nature lovers, photographers, and adventure seekers.",
        rating: {
            rate: 4.9,
            count: 390
        },
        duration: {
            ShortTrip: "2 Days / 1 Night",
            StandardTrip: "4 Days / 3 Nights",
            ExtendedTrip: "6 Days / 5 Nights"
        },
        bestSeason: "July - September, October - November",
        GroupSize: "2 - 10 Travelers",
        latitude: 35.3606,
        longitude: 138.7274
    }


];