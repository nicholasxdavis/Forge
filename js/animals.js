// js/script.js

// Function to generate random names
function generateNames(count) {
    const names = [
    'Dog', 'Cat', 'Lizard', 'Elephant', 'Lion', 'Tiger', 'Bear', 'Wolf', 'Fox',
    'Rabbit', 'Deer', 'Giraffe', 'Zebra', 'Horse', 'Cow', 'Pig', 'Sheep', 'Goat',
    'Chicken', 'Duck', 'Goose', 'Turkey', 'Peacock', 'Penguin', 'Kangaroo', 'Koala',
    'Panda', 'Crocodile', 'Alligator', 'Hippopotamus', 'Rhinoceros', 'Bat', 'Owl',
    'Eagle', 'Falcon', 'Hawk', 'Parrot', 'Sparrow', 'Flamingo', 'Swan', 'Ostrich',
    'Camel', 'Dolphin', 'Whale', 'Shark', 'Octopus', 'Squid', 'Jellyfish', 'Starfish',
    'Seal', 'Walrus', 'Otter', 'Beaver', 'Moose', 'Antelope', 'Buffalo', 'Bison',
    'Cheetah', 'Leopard', 'Hyena', 'Meerkat', 'Porcupine', 'Armadillo', 'Sloth',
    'Monkey', 'Gorilla', 'Chimpanzee', 'Baboon', 'Orangutan', 'Lemur', 'Raccoon',
    'Skunk', 'Badger', 'Weasel', 'Ferret', 'Mongoose', 'Hedgehog', 'Hamster', 'Gerbil',
    'Guinea Pig', 'Chinchilla', 'Mouse', 'Rat', 'Squirrel', 'Chipmunk', 'Platypus',
    'Echidna', 'Turtle', 'Tortoise', 'Frog', 'Toad', 'Newt', 'Salamander', 'Snake',
    'Lizard', 'Iguana', 'Chameleon', 'Gecko', 'Cobra', 'Viper', 'Python', 'Boa',
    'Komodo Dragon', 'Monitor Lizard', 'Gila Monster', 'Bearded Dragon', 'Dragonfly',
    'Butterfly', 'Moth', 'Bee', 'Wasp', 'Hornet', 'Ant', 'Termite', 'Beetle',
    'Ladybug', 'Firefly', 'Grasshopper', 'Cricket', 'Locust', 'Cockroach', 'Praying Mantis',
    'Stick Insect', 'Caterpillar', 'Centipede', 'Millipede', 'Scorpion', 'Spider',
    'Tarantula', 'Black Widow', 'Brown Recluse', 'Wolf Spider', 'Orb Weaver', 'Crab',
    'Lobster', 'Shrimp', 'Prawn', 'Clam', 'Oyster', 'Mussel', 'Snail', 'Slug',
    'Earthworm', 'Leech', 'Flatworm', 'Roundworm', 'Tapeworm', 'Jellyfish', 'Sea Anemone',
    'Coral', 'Sponge', 'Sea Urchin', 'Sea Cucumber', 'Starfish', 'Sand Dollar',
    'Aardvark', 'Aardwolf', 'Albatross', 'Allosaurus', 'Alpaca', 'Amphibian', 'Anaconda',
    'Angelfish', 'Anglerfish', 'Antelope', 'Ape', 'Archaeopteryx', 'Arctic Fox', 'Arctic Hare',
    'Armadillo', 'Aurochs', 'Axolotl', 'Babirusa', 'Baboon', 'Badger', 'Bald Eagle',
    'Bandicoot', 'Barn Owl', 'Barnacle', 'Barracuda', 'Basilisk', 'Basking Shark', 'Basset Hound',
    'Batfish', 'Beagle', 'Bearded Collie', 'Beetle', 'Beluga Whale', 'Bengal Tiger', 'Bernese Mountain Dog',
    'Binturong', 'Bird', 'Birman', 'Bison', 'Black Marlin', 'Black Mamba', 'Black Panther',
    'Black Widow Spider', 'Blobfish', 'Bloodhound', 'Blue Jay', 'Blue Whale', 'Boa Constrictor', 'Bobcat',
    'Bolognese Dog', 'Bonito', 'Bonobo', 'Booby', 'Border Collie', 'Bornean Orangutan', 'Boston Terrier',
    'Bottlenose Dolphin', 'Box Jellyfish', 'Boxer Dog', 'Boykin Spaniel', 'Brazilian Terrier', 'Brown Bear',
    'Budgerigar', 'Buffalo', 'Bull Shark', 'Bulldog', 'Bullfrog', 'Bumblebee', 'Burmese',
    'Burrowing Frog', 'Butterfly Fish', 'Buzzard', 'Caiman', 'Caiman Lizard', 'Cairn Terrier', 'Camel',
    'Canaan Dog', 'Capybara', 'Caracal', 'Carolina Dog', 'Cassowary', 'Catfish', 'Caterpillar',
    'Catshark', 'Cattle', 'Cavapoo', 'Centipede', 'Cesky Fousek', 'Chameleon', 'Chamois',
    'Cheetah', 'Chesapeake Bay Retriever', 'Chickadee', 'Chicken', 'Chihuahua', 'Chimpanzee', 'Chinchilla',
    'Chinese Crested Dog', 'Chinook', 'Chipmunk', 'Chow Chow', 'Cichlid', 'Civet', 'Coati',
    'Cockapoo', 'Cockatoo', 'Cockroach', 'Collared Peccary', 'Collie', 'Colossal Squid', 'Common Buzzard',
    'Common Frog', 'Common Loon', 'Common Toad', 'Common Wombat', 'Conure', 'Copperhead', 'Coral Snake',
    'Cottontail', 'Coyote', 'Crab-Eating Macaque', 'Crane', 'Crayfish', 'Crested Gecko', 'Cricket',
    'Crocodile', 'Cross River Gorilla', 'Curly Coated Retriever', 'Cuscus', 'Cuttlefish', 'Dachshund',
    'Dalmatian', 'Darwin’s Frog', 'Deer', 'Desert Tortoise', 'Dhole', 'Dingo', 'Discus',
    'Doberman Pinscher', 'Dodo', 'Dog', 'Dogo Argentino', 'Dogue De Bordeaux', 'Dolphin', 'Donkey',
    'Dorkie', 'Dormouse', 'Dotterel', 'Doublure', 'Douc', 'Drever', 'Drum Fish',
    'Duck', 'Dugong', 'Dunker', 'Dusky Dolphin', 'Dwarf Crocodile', 'Eagle', 'Earwig',
    'Earthworm', 'Eastern Bluebird', 'Eastern Gorilla', 'Eastern Lowland Gorilla', 'Echidna', 'Eel', 'Egyptian Mau',
    'Electric Eel', 'Elephant', 'Elephant Seal', 'Elephant Shrew', 'Emperor Penguin', 'Emperor Tamarin', 'Emu',
    'English Bulldog', 'English Cocker Spaniel', 'English Cream Golden Retriever', 'English Pointer', 'English Setter', 'English Shepherd',
    'English Springer Spaniel', 'Entlebucher Mountain Dog', 'Epagneul Pont Audemer', 'Eskimoinu', 'Eskimo Dog', 'Estrela Mountain Dog',
    'Eurasian Beaver', 'Eurasian Lynx', 'Eurasian Nuthatch', 'European Starling', 'Evening Grosbeak', 'Eyelash Viper', 'Fairy Basslet',
    'Falcon', 'Fallow Deer', 'False Killer Whale', 'Fangtooth', 'Fennec Fox', 'Fer-de-lance', 'Ferret',
    'Fiddler Crab', 'Field Spaniel', 'Fin Whale', 'Finnish Lapphund', 'Finnish Spitz', 'Fire Salamander', 'Fire-bellied Toad',
    'Firefly', 'Fishing Cat', 'Flamingo', 'Flat-Coated Retriever', 'Flounder', 'Fly', 'Flying Fish',
    'Flying Lemur', 'Flying Squirrel', 'Fossa', 'Fox', 'French Bulldog', 'Frilled Lizard', 'Frilled Shark',
    'Frog', 'Frogfish', 'Frogmouth', 'Fruit Bat', 'Fruit Fly', 'Galápagos Penguin', 'Galápagos Tortoise',
    'Galago', 'Gar', 'Gazelle', 'Gecko', 'Genet', 'Gentoo Penguin', 'Gerbil',
    'Gharial', 'Ghost Crab', 'Giant African Land Snail', 'Giant Armadillo', 'Giant Clam', 'Giant Otter', 'Giant Panda Bear',
    'Giant Schnauzer', 'Gibbon', 'Gila Monster', 'Giraffe', 'Glass Lizard', 'Glow Worm', 'Goat',
    'Goblin Shark', 'Golden Eagle', 'Golden Lion Tamarin', 'Golden Oriole', 'Golden Retriever', 'Goose', 'Gopher',
    'Gopher Tortoise', 'Gorilla', 'Goshawk', 'Grasshopper', 'Gray Fox', 'Gray Tree Frog', 'Great Blue Heron',
    'Great Crested Newt', 'Great Dane', 'Great Egret', 'Great Pyrenees', 'Greater Swiss Mountain Dog', 'Green Anole', 'Green Bee-Eater',
    'Green Frog', 'Green Iguana', 'Green Sea Turtle', 'Green Tree Frog', 'Greenland Dog', 'Grey Mouse Lemur', 'Grey Reef Shark',
    'Grey Seal', 'Greyhound', 'Grizzly Bear', 'Grouse', 'Guanaco', 'Guinea Fowl', 'Guinea Pig',
    'Guppy', 'Gyrfalcon', 'Haddock', 'Hagfish', 'Hammerhead Shark', 'Hamster', 'Harbor Seal',
    'Hardhead Catfish', 'Hare', 'Harlequin Rasbora', 'Harp Seal', 'Harpy Eagle', 'Harrier', 'Harris’s Hawk',
    'Havanese', 'Hawk', 'Hedgehog', 'Hercules Beetle', 'Hermit Crab', 'Heron', 'Highland Cattle',
    'Hippopotamus', 'Hoary Bat', 'Hognose Snake', 'Honey Badger', 'Honey Bee', 'Horn Shark', 'Hornbill',
    'Horned Frog', 'Horned Lizard', 'Horse', 'House Finch', 'House Fly', 'Hoverfly', 'Howler Monkey',
    'Human', 'Humboldt Penguin', 'Hummingbird', 'Humpback Whale', 'Hyena', 'Hyrax', 'Ibis',
    'Ibizan Hound', 'Iguana', 'Immortal Jellyfish', 'Impala', 'Indian Elephant', 'Indian Giant Squirrel', 'Indian Palm Squirrel',
    'Indian Rhinoceros', 'Indigo Bunting', 'Indigo Snake', 'Inland Taipan', 'Insect', 'Irish Setter', 'Irish Terrier',
    'Irish WolfHound', 'Isopod', 'Italian Greyhound', 'Ivory Gull', 'Jacana', 'Jack Russell', 'Jackal',
    'Jaguar', 'Jaguarundi', 'Japanese Beetle', 'Japanese Chin', 'Japanese Macaque', 'Japanese Terrier', 'Javan Rhinoceros',
    'Javanese', 'Jellyfish', 'Jerboa', 'Joey', 'Jumping Spider', 'Junglefowl', 'Junco',
    'Kakapo', 'Kangaroo', 'Kangaroo Rat', 'Keel-Billed Toucan', 'Keeshond', 'Kelp Bass', 'Kelp Greenling',
    'Kelp Gull', 'Kemp’s Ridley Sea Turtle', 'Kermode Bear', 'Kestrel', 'King Crab', 'King Penguin', 'King Shepherd',
    'Kingfisher', 'Kinglet', 'Kingsnake', 'Kinkajou', 'Kiwi', 'Koala', 'Kodkod',
    'Komodo Dragon', 'Kooikerhondje', 'Kookaburra', 'Koolie', 'Kori Bustard', 'Kouprey', 'Krill',
    'Kudu', 'Kusimanse', 'Labrador Retriever', 'Lace Monitor', 'Ladybug', 'Lake Sturgeon', 'Lancetfish',
    'Land Hermit Crab', 'Lappet-Faced Vulture', 'Lark', 'Laughing Kookaburra', 'Lava Gull', 'Leaf-Tailed Gecko', 'Leafcutter Ant',
    'Leech', 'Lemming', 'Lemon Shark', 'Lemur', 'Leopard', 'Leopard Cat', 'Leopard Gecko',
    'Leopard Seal', 'Leopard Tortoise', 'Lhasa Apso', 'Liger', 'Lion', 'Lionfish', 'Little Brown Bat',
    'Little Penguin', 'Lizard', 'Llama', 'Lobster', 'Locust', 'Loggerhead Sea Turtle', 'Long-Eared Owl',
    'Longfin Bannerfish', 'Longhorn Cowfish', 'Longnose Gar', 'Lorikeet', 'Loris', 'Lovebird', 'Lowchen',
    'Lynx', 'Macaque', 'Macaroni Penguin', 'Macaw', 'Magellanic Penguin', 'Magpie', 'Maine Coon',
    'Malayan Civet', 'Malayan Tiger', 'Mallard', 'Maltese', 'Mamba', 'Mammoth', 'Manatee',
    'Mandarin Duck', 'Mandrill', 'Manta Ray', 'Marbled Salamander', 'Maremma Sheepdog', 'Margay', 'Marine Toad',
    'Markhor', 'Marlin', 'Marmoset', 'Marmot', 'Marsupial Mole', 'Masked Palm Civet', 'Massasauga',
    'Mastiff', 'Mayfly', 'Meadowlark', 'Meerkat', 'Megamouth Shark', 'Mexican Black Kingsnake', 'Mexican Free-Tailed Bat',
    'Mink', 'Mole', 'Mollusk', 'Mongoose', 'Mongrel', 'Monitor Lizard', 'Monkey',
    'Monte Iberia Eleuth', 'Moorhen', 'Moose', 'Moray Eel', 'Moth', 'Mountain Bluebird', 'Mountain Cur',
    'Mountain Gorilla', 'Mountain Lion', 'Mouse', 'Mourning Dove', 'Mudi', 'Mudskipper', 'Mule',
    'Muskox', 'Muskrat', 'Mussurana', 'Narwhal', 'Natterjack', 'Nautilus', 'Nebelung',
    'Nēnē', 'Neon Tetra', 'Neptune Grouper', 'Nēnē', 'New Guinea Singing Dog', 'Newfoundland', 'Newt',
    'Nightingale', 'Nile Crocodile', 'Nudibranch', 'Numbat', 'Nunbird', 'Nuthatch', 'Nutria',
    'Nyala', 'Ochre Sea Star', 'Octopus', 'Okapi', 'Old English Sheepdog', 'Olm', 'Opossum',
    'Orangutan', 'Orca', 'Oregon Newt', 'Oriental Cockroach', 'Ornate Box Turtle', 'Ornate Hawk-Eagle', 'Ostrich',
    'Otter', 'Ovenbird', 'Owl', 'Ox', 'Oxpecker', 'Oyster', 'Pademelon',
    'Painted Turtle', 'Pangolin', 'Panther', 'Papillon', 'Parakeet', 'Parrot', 'Parrotfish',
    'Partridge', 'Peacock', 'Peacock Bass', 'Peacock Spider', 'Pekingese', 'Pelican', 'Penguin',
    'Persian Cat', 'Pharaoh Hound', 'Pheasant', 'Pied Tamarin', 'Pig', 'Pigeon', 'Pika',
    'Pike', 'Pine Marten', 'Pink Fairy Armadillo', 'Piranha', 'Pit Bull', 'Pitta', 'Platypus',
    'Pointer', 'Poison Dart Frog', 'Polar Bear', 'Polish Lowland Sheepdog', 'Polyphemus Moth', 'Pomeranian', 'Pond Skater',
    'Poodle', 'Pool Frog', 'Porbeagle Shark', 'Porcupine', 'Porpoise', 
    'Potoroo', 'Prawn', 'Praying Mantis', 'Proboscis Monkey', 'Pronghorn', 'Pufferfish', 'Puffin',
    'Pug', 'Puma', 'Pygmy Elephant', 'Pygmy Goat', 'Pygmy Hippopotamus', 'Pygmy Marmoset', 'Pygmy Python',
    'Quail', 
    'Ragdoll', 'Rail', 'Rainbow Fish', 'Rainbow Lorikeet', 'Rat', 'Rattlesnake', 'Red Panda',
    'Red Wolf', 'Red-Handed Tamarin', 'Redback Spider', 'Reef Shark', 'Reindeer', 'Remora', 'Rhea',
    'Rhino', 'Rhinoceros Beetle', 'Ribbonsnake', 'Ringed Kingfisher', 'Ringtail', 'River Dolphin', 'River Otter',
    'Robin', 'Rock Hyrax', 'Rockfish', 'Rockhopper Penguin', 'Rodent', 'Rooster', 'Roseate Spoonbill',
    'Rottweiler', 'Royal Penguin', 'Russian Blue', 'Sabre-Toothed Tiger', 'Saiga', 'Salamander', 'Salmon',
    'Saltwater Crocodile', 'Sambar', 'Samoyed', 'Sand Dollar', 'Sand Lizard', 'Sand Tiger Shark', 'Sawfish',
    'Scallop', 'Scarab Beetle', 'Scarlet Ibis', 'Scorpion', 'Scots Dumpy', 'Sea Anemone', 'Sea Bass',
    'Sea Dragon', 'Sea Lion', 'Sea Otter', 'Sea Slug', 'Sea Snake', 'Sea Squirt', 'Sea Turtle',
    'Seagull', 'Seahorse', 'Seal', 'Sedge Warbler', 'Serval', 'Shark', 'Sheep',
    'Sheltie', 'Shih Tzu', 'Shingleback', 'Shoebill Stork', 'Shovelnose Guitarfish', 'Siamang', 'Siberian Husky',
    'Siberian Tiger', 'Silkie Chicken', 'Silver Dollar', 'Silverfish', 'Skate Fish', 'Skink', 'Skipper',
    'Skunk', 'Slender Loris', 'Sloth', 'Sloth Bear', 'Slow Worm', 'Slug', 'Smelt',
    'Snail', 'Snake', 'Snipe', 'Snow Goose', 'Snow Leopard', 'Snow Monkey', 'Snowshoe',
    'Society Finch', 'Sockeye Salmon', 'Softshell Turtle', 'Solitary Bee', 'Sora', 'South American Coati', 'Southern Elephant Seal',
    'Southern Right Whale', 'Sparrow', 'Spectacled Bear', 'Sperm Whale', 'Spider Monkey', 'Spinner Dolphin', 'Spiny Dogfish',
    'Spiny Hill Turtle', 'Sponge', 'Spoonbill', 'Spotted Hyena', 'Squid', 'Squirrel', 'Squirrel Monkey',
    'St. Bernard', 'Stag Beetle', 'Star-nosed Mole', 'Starfish', 
    'Stilt', 'Stingray', 'Stoat', 'Stonefish', 'Stork', 'Sugar Glider', 'Sumatran Elephant',
    'Sumatran Orangutan', 'Sumatran Rhinoceros', 'Sumatran Tiger', 'Sun Bear', 'Sun Conure', 'Sunfish', 'Swallow',
    'Swallowtail Butterfly', 'Swan', 'Swarm', 'Swedish Vallhund', 'Swift', 'Swordfish', 'Syrian Hamster',
    'Tamarin', 'Tamarin Monkey', 'Tang', 'Tapanuli Orangutan', 'Tapir', 'Tarpon', 'Tasmanian Devil',
    'Tawny Owl', 'Termite', 'Tetra', 'Thorny Devil', 'Thresher Shark', 'Thrush', 'Tick',
    'Tibetan Fox', 'Tibetan Mastiff', 'Tiger', 'Tiger Beetle', 'Tiger Moth', 'Tiger Salamander', 'Tiger Shark',
    'Titi', 'Toad', 'Tomato Frog', 'Tortoise', 'Toucan', 'Tree Frog', 'Tree Kangaroo',
    'Tree Sparrow', 'Tree Swallow', 'Tropicbird', 'Tuatara', 'Turkey', 'Turkish Van', 'Turtle',
    'Tusker', 'Twayblade', 'Tyrannosaurus Rex', 'Uguisu', 'Uinta Ground Squirrel', 'Umbrellabird', 'Uromastyx',
    'Urutu', 'Utonagan', 'Vampire Bat', 'Vampire Squid', 'Vaquita', 'Velociraptor', 'Vervet Monkey',
    'Vicuña', 'Vinegaroon', 'Viper', 'Viperfish', 'Virginia Opossum', 'Visayan Spotted Deer', 'Vizsla',
    'Vole', 'Vulture', 'Wallaby', 'Walrus', 'Wandering Albatross', 'Warthog', 'Wasp',
    'Water Buffalo', 'Water Dragon', 'Water Monitor', 'Water Vole', 'Weasel', 'Weimaraner', 'Welsh Corgi',
    'Welsh Springer Spaniel', 'West Highland Terrier', 'Western Gorilla', 'Western Lowland Gorilla', 'Whale', 'Whale Shark', 'Whippet',
    'White Bass', 'White Ibis', 'White Rhinoceros', 'White Tiger', 'White-faced Capuchin', 'Whitefish', 'Whooper Swan',
    'Wildebeest', 'Wobbegong', 'Wolf', 'Wolf Eel', 'Wolf Fish', 'Wolverine', 'Wombat',
    'Wood Bison', 'Wood Frog', 'Wood Turtle', 'Woodlouse', 'Woodpecker', 'Woolly Mammoth', 'Woolly Monkey',
    'Wrasse', 'Wren', 'X-Ray Tetra', 'Xenops', 'Xerus', 'Xoloitzcuintli', 'Yak',
    'Yellow-Eyed Penguin', 'Yellowfin Tuna', 'Yeti Crab', 'Yorkshire Terrier', 'Yosemite Toad', 'Zebra', 'Zebra Finch',
    'Zebra Pleco', 'Zebra Shark', 'Zebu', 'Zokor', 'Zonkey', 'Zorse', 'Zuchon'
];
    
    let generatedNames = '';
    let usedNames = new Set();

    if (count > names.length) {
        count = names.length;
    }

    while (usedNames.size < count) {
        const randomIndex = Math.floor(Math.random() * names.length);
        const selectedName = names[randomIndex];

        if (!usedNames.has(selectedName)) {
            usedNames.add(selectedName);
            generatedNames += selectedName + '\n';
        }
    }

    return generatedNames;
}

// Function to display generated names
function displayNames() {
    const nameCount = document.getElementById('name-count').value;
    const genSection = document.getElementById('gen');

    genSection.innerHTML = generateNames(nameCount).replace(/\n/g, '<br>');
}

// Function to handle regenerate button click
function regenerateNames() {
    displayNames();
}

// Function to handle save button click
function saveNames() {
    const genSection = document.getElementById('gen');
    const generatedNames = genSection.innerText;
    const blob = new Blob([generatedNames], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated_names.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Event listener for the regenerate button
document.getElementById('regenerate-btn').addEventListener('click', regenerateNames);

// Event listener for the save button
document.getElementById('save-btn').addEventListener('click', saveNames);

// Show the gen section and display names when the page loads
window.addEventListener('load', () => {
    displayNames();
    document.getElementById('gen').style.display = 'block';
});
