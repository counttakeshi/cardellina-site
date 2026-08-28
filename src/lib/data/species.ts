import type { TierCode, ZoneCode } from './taxonomy';

export interface Species {
	slug: string;
	commonName: string;
	scientificName: string;
	family: string;
	tier: TierCode;
	zones: ZoneCode[];
	/** Short badge shown beside the name (MX / W-MX / NCA). Absent for non-endemics. */
	tierBadge?: string;
	/** Full-size photos shown in the inline gallery panel. */
	photos?: string[];
	/** True when the bird has a full account page at /birds/<slug>. */
	hasAccount?: boolean;
}

/**
 * The Chiapas Bird Library — 125 species across 26 families,
 * transcribed from the live site. Family order is taxonomic, matching the original.
 */
export const species: Species[] = [
	{
		slug: "slaty-breasted-tinamou",
		commonName: "Slaty-breasted Tinamou",
		scientificName: "Crypturellus boucardi",
		family: "Tinamous",
		tier: "mxca",
		zones: ["rainforest"]
	},
	{
		slug: "thicket-tinamou",
		commonName: "Thicket Tinamou",
		scientificName: "Crypturellus cinnamomeus",
		family: "Tinamous",
		tier: "mxca",
		zones: ["thorn"]
	},
	{
		slug: "crested-guan",
		commonName: "Crested Guan",
		scientificName: "Penelope purpurascens",
		family: "Guans, Chachalacas & Quail",
		tier: "wide",
		zones: ["rainforest"],
		photos: ["https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/crested-guan-CKPoAxdUhmbgjmxZ.jpg","https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/crested-guan-2-IwURyHPiaRvtUSCZ.jpg"]
	},
	{
		slug: "great-curassow",
		commonName: "Great Curassow",
		scientificName: "Crax rubra",
		family: "Guans, Chachalacas & Quail",
		tier: "mxca",
		zones: ["rainforest"]
	},
	{
		slug: "highland-guan",
		commonName: "Highland Guan",
		scientificName: "Penelopina nigra",
		family: "Guans, Chachalacas & Quail",
		tier: "nca",
		zones: ["cloud"],
		tierBadge: "NCA"
	},
	{
		slug: "horned-guan",
		commonName: "Horned Guan",
		scientificName: "Oreophasis derbianus",
		family: "Guans, Chachalacas & Quail",
		tier: "nca",
		zones: ["cloud"],
		tierBadge: "NCA",
		photos: ["https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/horned-guan-mv02ExGWQJC0k2xv.jpg"],
		hasAccount: true
	},
	{
		slug: "ocellated-quail",
		commonName: "Ocellated Quail",
		scientificName: "Cyrtonyx ocellatus",
		family: "Guans, Chachalacas & Quail",
		tier: "nca",
		zones: ["pineoak"],
		tierBadge: "NCA"
	},
	{
		slug: "singing-quail",
		commonName: "Singing Quail",
		scientificName: "Dactylortyx thoracicus",
		family: "Guans, Chachalacas & Quail",
		tier: "mxca",
		zones: ["cloud"]
	},
	{
		slug: "spotted-wood-quail",
		commonName: "Spotted Wood-Quail",
		scientificName: "Odontophorus guttatus",
		family: "Guans, Chachalacas & Quail",
		tier: "mxca",
		zones: ["cloud"]
	},
	{
		slug: "west-mexican-chachalaca",
		commonName: "West Mexican Chachalaca",
		scientificName: "Ortalis poliocephala",
		family: "Guans, Chachalacas & Quail",
		tier: "wmx",
		zones: ["thorn"],
		tierBadge: "W-MX"
	},
	{
		slug: "white-bellied-chachalaca",
		commonName: "White-bellied Chachalaca",
		scientificName: "Ortalis leucogastra",
		family: "Guans, Chachalacas & Quail",
		tier: "nca",
		zones: ["coast"],
		tierBadge: "NCA"
	},
	{
		slug: "band-tailed-pigeon",
		commonName: "Band-tailed Pigeon",
		scientificName: "Patagioenas fasciata",
		family: "Pigeons & Doves",
		tier: "mxca",
		zones: ["pineoak"]
	},
	{
		slug: "maroon-chested-ground-dove",
		commonName: "Maroon-chested Ground Dove",
		scientificName: "Paraclaravis mondetoura",
		family: "Pigeons & Doves",
		tier: "wide",
		zones: ["cloud"]
	},
	{
		slug: "buff-collared-nightjar",
		commonName: "Buff-collared Nightjar",
		scientificName: "Antrostomus ridgwayi",
		family: "Nightjars & Potoos",
		tier: "mxca",
		zones: ["thorn"]
	},
	{
		slug: "mexican-whip-poor-will",
		commonName: "Mexican Whip-poor-will",
		scientificName: "Antrostomus arizonae",
		family: "Nightjars & Potoos",
		tier: "mxca",
		zones: ["pineoak"]
	},
	{
		slug: "tawny-collared-nightjar",
		commonName: "Tawny-collared Nightjar",
		scientificName: "Antrostomus salvini",
		family: "Nightjars & Potoos",
		tier: "mx",
		zones: ["rainforest"],
		tierBadge: "MX"
	},
	{
		slug: "amethyst-throated-mountain-gem",
		commonName: "Amethyst-throated Mountain-gem",
		scientificName: "Lampornis amethystinus",
		family: "Hummingbirds",
		tier: "mxca",
		zones: ["cloud"]
	},
	{
		slug: "azure-crowned-hummingbird",
		commonName: "Azure-crowned Hummingbird",
		scientificName: "Saucerottia cyanocephala",
		family: "Hummingbirds",
		tier: "mxca",
		zones: ["pineoak"]
	},
	{
		slug: "berylline-hummingbird",
		commonName: "Berylline Hummingbird",
		scientificName: "Saucerottia beryllina",
		family: "Hummingbirds",
		tier: "mxca",
		zones: ["pineoak"]
	},
	{
		slug: "black-crested-coquette",
		commonName: "Black-crested Coquette",
		scientificName: "Lophornis helenae",
		family: "Hummingbirds",
		tier: "mxca",
		zones: ["rainforest"]
	},
	{
		slug: "blue-tailed-hummingbird",
		commonName: "Blue-tailed Hummingbird",
		scientificName: "Saucerottia cyanura",
		family: "Hummingbirds",
		tier: "nca",
		zones: ["pacslope"],
		tierBadge: "NCA"
	},
	{
		slug: "broad-tailed-hummingbird",
		commonName: "Broad-tailed Hummingbird",
		scientificName: "Selasphorus platycercus",
		family: "Hummingbirds",
		tier: "mxca",
		zones: ["pineoak"]
	},
	{
		slug: "canivet-s-emerald",
		commonName: "Canivet's Emerald",
		scientificName: "Cynanthus canivetii",
		family: "Hummingbirds",
		tier: "mxca",
		zones: ["thorn"]
	},
	{
		slug: "cinnamon-hummingbird",
		commonName: "Cinnamon Hummingbird",
		scientificName: "Amazilia rutila",
		family: "Hummingbirds",
		tier: "mxca",
		zones: ["thorn"]
	},
	{
		slug: "emerald-chinned-hummingbird",
		commonName: "Emerald-chinned Hummingbird",
		scientificName: "Abeillia abeillei",
		family: "Hummingbirds",
		tier: "nca",
		zones: ["cloud"],
		tierBadge: "NCA"
	},
	{
		slug: "garnet-throated-hummingbird",
		commonName: "Garnet-throated Hummingbird",
		scientificName: "Lamprolaima rhami",
		family: "Hummingbirds",
		tier: "nca",
		zones: ["cloud"],
		tierBadge: "NCA"
	},
	{
		slug: "green-fronted-hummingbird",
		commonName: "Green-fronted Hummingbird",
		scientificName: "Ramosomyia viridifrons",
		family: "Hummingbirds",
		tier: "wmx",
		zones: ["thorn"],
		tierBadge: "W-MX"
	},
	{
		slug: "green-throated-mountain-gem",
		commonName: "Green-throated Mountain-gem",
		scientificName: "Lampornis viridipallens",
		family: "Hummingbirds",
		tier: "nca",
		zones: ["cloud"],
		tierBadge: "NCA",
		photos: ["https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/green-throated-mountain-gem-1-BsIEUutE5zt2I5cS.jpg","https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/green-throated-mountain-gem-2-AfkqjWFIZA8j6CIi.jpg"]
	},
	{
		slug: "plain-capped-starthroat",
		commonName: "Plain-capped Starthroat",
		scientificName: "Heliomaster constantii",
		family: "Hummingbirds",
		tier: "mxca",
		zones: ["thorn"]
	},
	{
		slug: "purple-crowned-fairy",
		commonName: "Purple-crowned Fairy",
		scientificName: "Heliothryx barroti",
		family: "Hummingbirds",
		tier: "mxca",
		zones: ["rainforest"]
	},
	{
		slug: "rivoli-s-hummingbird",
		commonName: "Rivoli's Hummingbird",
		scientificName: "Eugenes fulgens",
		family: "Hummingbirds",
		tier: "mxca",
		zones: ["pineoak"],
		photos: ["https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/sabes_aves_rivolis_hummingbird-4K4YnfKdpJWaTbqo.JPG"]
	},
	{
		slug: "scaly-breasted-hummingbird",
		commonName: "Scaly-breasted Hummingbird",
		scientificName: "Phaeochroa cuvierii",
		family: "Hummingbirds",
		tier: "mxca",
		zones: ["rainforest"]
	},
	{
		slug: "slender-sheartail",
		commonName: "Slender Sheartail",
		scientificName: "Doricha enicura",
		family: "Hummingbirds",
		tier: "nca",
		zones: ["pineoak"],
		tierBadge: "NCA",
		photos: ["https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/slender-sheartail-qMw7TVBhS9Q1882N.jpg"]
	},
	{
		slug: "stripe-tailed-hummingbird",
		commonName: "Stripe-tailed Hummingbird",
		scientificName: "Eupherusa eximia",
		family: "Hummingbirds",
		tier: "mxca",
		zones: ["cloud"]
	},
	{
		slug: "white-eared-hummingbird",
		commonName: "White-eared Hummingbird",
		scientificName: "Basilinna leucotis",
		family: "Hummingbirds",
		tier: "mxca",
		zones: ["pineoak"],
		photos: ["https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/sabes_aves_basilina_leucotis-KRKtKHveZzcPOm7i.jpg"]
	},
	{
		slug: "agami-heron",
		commonName: "Agami Heron",
		scientificName: "Agamia agami",
		family: "Rails, Crakes & Waterbirds",
		tier: "wide",
		zones: ["wetland"]
	},
	{
		slug: "ruddy-crake",
		commonName: "Ruddy Crake",
		scientificName: "Laterallus ruber",
		family: "Rails, Crakes & Waterbirds",
		tier: "mxca",
		zones: ["wetland"]
	},
	{
		slug: "black-and-white-hawk-eagle",
		commonName: "Black-and-white Hawk-Eagle",
		scientificName: "Spizaetus melanoleucus",
		family: "Raptors",
		tier: "wide",
		zones: ["rainforest"]
	},
	{
		slug: "harpy-eagle",
		commonName: "Harpy Eagle",
		scientificName: "Harpia harpyja",
		family: "Raptors",
		tier: "wide",
		zones: ["rainforest"]
	},
	{
		slug: "king-vulture",
		commonName: "King Vulture",
		scientificName: "Sarcoramphus papa",
		family: "Raptors",
		tier: "wide",
		zones: ["rainforest"]
	},
	{
		slug: "orange-breasted-falcon",
		commonName: "Orange-breasted Falcon",
		scientificName: "Falco deiroleucus",
		family: "Raptors",
		tier: "wide",
		zones: ["rainforest"]
	},
	{
		slug: "ornate-hawk-eagle",
		commonName: "Ornate Hawk-Eagle",
		scientificName: "Spizaetus ornatus",
		family: "Raptors",
		tier: "wide",
		zones: ["rainforest"],
		photos: ["https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/ornate-hawk-eagle-mP4OGNwpvehoNJQq.jpg"]
	},
	{
		slug: "black-and-white-owl",
		commonName: "Black-and-white Owl",
		scientificName: "Strix nigrolineata",
		family: "Owls",
		tier: "mxca",
		zones: ["rainforest"],
		photos: ["https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/black-and-white-owl-photo_-jaime-pa-c-rez-AR0L0bvD6wckvp2o.jpg"]
	},
	{
		slug: "crested-owl",
		commonName: "Crested Owl",
		scientificName: "Lophostrix cristata",
		family: "Owls",
		tier: "wide",
		zones: ["rainforest"]
	},
	{
		slug: "middle-american-screech-owl",
		commonName: "Middle American Screech-Owl",
		scientificName: "Megascops guatemalae",
		family: "Owls",
		tier: "mxca",
		zones: ["rainforest"]
	},
	{
		slug: "pacific-screech-owl",
		commonName: "Pacific Screech-Owl",
		scientificName: "Megascops cooperi",
		family: "Owls",
		tier: "mxca",
		zones: ["thorn"]
	},
	{
		slug: "spectacled-owl",
		commonName: "Spectacled Owl",
		scientificName: "Pulsatrix perspicillata",
		family: "Owls",
		tier: "wide",
		zones: ["rainforest"]
	},
	{
		slug: "black-headed-trogon",
		commonName: "Black-headed Trogon",
		scientificName: "Trogon melanocephalus",
		family: "Trogons & Quetzal",
		tier: "mxca",
		zones: ["rainforest"],
		photos: ["https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/black-headed-trogon-8fNX9TIpLIQYBb1q.jpg"]
	},
	{
		slug: "citreoline-trogon",
		commonName: "Citreoline Trogon",
		scientificName: "Trogon citreolus",
		family: "Trogons & Quetzal",
		tier: "wmx",
		zones: ["thorn"],
		tierBadge: "W-MX"
	},
	{
		slug: "gartered-trogon",
		commonName: "Gartered Trogon",
		scientificName: "Trogon caligatus",
		family: "Trogons & Quetzal",
		tier: "mxca",
		zones: ["rainforest"],
		photos: ["https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/gartered-trogon-mP432bzGwoUoL9jv.jpg"]
	},
	{
		slug: "mountain-trogon",
		commonName: "Mountain Trogon",
		scientificName: "Trogon mexicanus",
		family: "Trogons & Quetzal",
		tier: "mxca",
		zones: ["pineoak"],
		photos: ["https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/mountain-trogon-M4lDamBkHGnFnPex.jpg"]
	},
	{
		slug: "resplendent-quetzal",
		commonName: "Resplendent Quetzal",
		scientificName: "Pharomachrus mocinno",
		family: "Trogons & Quetzal",
		tier: "nca",
		zones: ["cloud"],
		tierBadge: "NCA",
		hasAccount: true
	},
	{
		slug: "slaty-tailed-trogon",
		commonName: "Slaty-tailed Trogon",
		scientificName: "Trogon massena",
		family: "Trogons & Quetzal",
		tier: "mxca",
		zones: ["rainforest"]
	},
	{
		slug: "blue-throated-motmot",
		commonName: "Blue-throated Motmot",
		scientificName: "Aspatha gularis",
		family: "Motmots",
		tier: "nca",
		zones: ["cloud"],
		tierBadge: "NCA",
		photos: ["https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/sabes_aves_blue-throated_motmot-NFfUHZuU255VnhZE.JPG"]
	},
	{
		slug: "russet-crowned-motmot",
		commonName: "Russet-crowned Motmot",
		scientificName: "Momotus mexicanus",
		family: "Motmots",
		tier: "wmx",
		zones: ["thorn"],
		tierBadge: "W-MX",
		photos: ["https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/russet-crowned-motmot-AR0MD0JLlJi4JGXO.jpg"]
	},
	{
		slug: "turquoise-browed-motmot",
		commonName: "Turquoise-browed Motmot",
		scientificName: "Eumomota superciliosa",
		family: "Motmots",
		tier: "mxca",
		zones: ["thorn"],
		photos: ["https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/turquoise-browed-motmot-hwikmYfulmi5nHCi.jpg","https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/turquoise-browed-motmot-Aq2WEx31G4floEx0.jpg"]
	},
	{
		slug: "collared-aracari",
		commonName: "Collared Aracari",
		scientificName: "Pteroglossus torquatus",
		family: "Toucans",
		tier: "mxca",
		zones: ["rainforest"],
		photos: ["https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/collared-aracari-photo_-jaime-pa-c-rez-AMq1q4LoPbF5nQvP.jpg","https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/collared-aracari-2-LXlUuKMlNxIaN8DU.jpg"]
	},
	{
		slug: "keel-billed-toucan",
		commonName: "Keel-billed Toucan",
		scientificName: "Ramphastos sulfuratus",
		family: "Toucans",
		tier: "mxca",
		zones: ["rainforest"],
		photos: ["https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/1759259147357-Y4LPxjKeznsOKOKp.jpg"]
	},
	{
		slug: "northern-emerald-toucanet",
		commonName: "Northern Emerald-Toucanet",
		scientificName: "Aulacorhynchus prasinus",
		family: "Toucans",
		tier: "mxca",
		zones: ["cloud"]
	},
	{
		slug: "guatemalan-flicker",
		commonName: "Guatemalan Flicker",
		scientificName: "Colaptes mexicanoides",
		family: "Woodpeckers",
		tier: "nca",
		zones: ["pineoak"],
		tierBadge: "NCA"
	},
	{
		slug: "barred-parakeet",
		commonName: "Barred Parakeet",
		scientificName: "Bolborhynchus lineola",
		family: "Parrots",
		tier: "wide",
		zones: ["cloud"]
	},
	{
		slug: "green-parakeet",
		commonName: "Green Parakeet",
		scientificName: "Psittacara holochlorus",
		family: "Parrots",
		tier: "mxca",
		zones: ["thorn"]
	},
	{
		slug: "pacific-parakeet",
		commonName: "Pacific Parakeet",
		scientificName: "Psittacara strenuus",
		family: "Parrots",
		tier: "nca",
		zones: ["pacslope"],
		tierBadge: "NCA"
	},
	{
		slug: "red-lored-amazon",
		commonName: "Red-lored Amazon",
		scientificName: "Amazona autumnalis",
		family: "Parrots",
		tier: "mxca",
		zones: ["rainforest"],
		photos: ["https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/red-lored-amazon-MwRLmtrCILFf0EgE.jpg"]
	},
	{
		slug: "scarlet-macaw",
		commonName: "Scarlet Macaw",
		scientificName: "Ara macao",
		family: "Parrots",
		tier: "wide",
		zones: ["rainforest"],
		photos: ["https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/scarlet-macaw-VuZUDrvypQ0vU3dv.jpg"]
	},
	{
		slug: "yellow-headed-amazon",
		commonName: "Yellow-headed Amazon",
		scientificName: "Amazona oratrix",
		family: "Parrots",
		tier: "mx",
		zones: ["coast"],
		tierBadge: "MX",
		photos: ["https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/yellow-headed-amazon-RwBRxOKOv3wii34L.png"]
	},
	{
		slug: "yellow-naped-amazon",
		commonName: "Yellow-naped Amazon",
		scientificName: "Amazona auropalliata",
		family: "Parrots",
		tier: "mxca",
		zones: ["coast"]
	},
	{
		slug: "belted-flycatcher",
		commonName: "Belted Flycatcher",
		scientificName: "Xenotriccus callizonus",
		family: "Tyrant Flycatchers",
		tier: "nca",
		zones: ["thorn"],
		tierBadge: "NCA",
		photos: ["https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/saves_aves_belted_flyctacher-yle4qopkavupwgkq_le_upscale_prime_light_ai_30-W0ccOL9OyvD1PW60.jpg"]
	},
	{
		slug: "flammulated-flycatcher",
		commonName: "Flammulated Flycatcher",
		scientificName: "Ramphotrigon flammulatum",
		family: "Tyrant Flycatchers",
		tier: "wmx",
		zones: ["thorn"],
		tierBadge: "W-MX"
	},
	{
		slug: "guatemalan-tyrannulet",
		commonName: "Guatemalan Tyrannulet",
		scientificName: "Zimmerius vilissimus",
		family: "Tyrant Flycatchers",
		tier: "nca",
		zones: ["cloud"],
		tierBadge: "NCA",
		photos: ["https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/guatemalan-tyrannulet-HFmbr5dlTSRWWVe9.jpg"]
	},
	{
		slug: "pine-flycatcher",
		commonName: "Pine Flycatcher",
		scientificName: "Empidonax affinis",
		family: "Tyrant Flycatchers",
		tier: "mxca",
		zones: ["pineoak"]
	},
	{
		slug: "salvadoran-flycatcher",
		commonName: "Salvadoran Flycatcher",
		scientificName: "Myiarchus tuberculifer",
		family: "Tyrant Flycatchers",
		tier: "nca",
		zones: ["thorn"],
		tierBadge: "NCA"
	},
	{
		slug: "stub-tailed-spadebill",
		commonName: "Stub-tailed Spadebill",
		scientificName: "Platyrinchus cancrominus",
		family: "Tyrant Flycatchers",
		tier: "mxca",
		zones: ["rainforest"],
		photos: ["https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/stub-tailed-spadebill-pyQ7sCdb07PFlsDi.jpg"]
	},
	{
		slug: "yellowish-flycatcher",
		commonName: "Yellowish Flycatcher",
		scientificName: "Empidonax flavescens",
		family: "Tyrant Flycatchers",
		tier: "nca",
		zones: ["cloud"],
		tierBadge: "NCA"
	},
	{
		slug: "long-tailed-manakin",
		commonName: "Long-tailed Manakin",
		scientificName: "Chiroxiphia linearis",
		family: "Cotingas & Manakins",
		tier: "nca",
		zones: ["pacslope"],
		tierBadge: "NCA",
		photos: ["https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/long-tailed-manakin-photo_-jaime-pa-c-rez-AoPWPGpV7yI0kkl5.jpg"]
	},
	{
		slug: "lovely-cotinga",
		commonName: "Lovely Cotinga",
		scientificName: "Cotinga amabilis",
		family: "Cotingas & Manakins",
		tier: "mxca",
		zones: ["rainforest"]
	},
	{
		slug: "red-capped-manakin",
		commonName: "Red-capped Manakin",
		scientificName: "Ceratopipra mentalis",
		family: "Cotingas & Manakins",
		tier: "mxca",
		zones: ["rainforest"]
	},
	{
		slug: "white-collared-manakin",
		commonName: "White-collared Manakin",
		scientificName: "Manacus candei",
		family: "Cotingas & Manakins",
		tier: "mxca",
		zones: ["rainforest"]
	},
	{
		slug: "green-shrike-vireo",
		commonName: "Green Shrike-Vireo",
		scientificName: "Vireolanius pulchellus",
		family: "Vireos",
		tier: "mxca",
		zones: ["rainforest"]
	},
	{
		slug: "azure-hooded-jay",
		commonName: "Azure-hooded Jay",
		scientificName: "Cyanolyca cucullata",
		family: "Jays",
		tier: "mxca",
		zones: ["cloud"],
		photos: ["https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/azure-hooded-jay-w6Bqp2psIEeDOfzQ.jpg"]
	},
	{
		slug: "black-throated-jay",
		commonName: "Black-throated Jay",
		scientificName: "Cyanolyca pumilo",
		family: "Jays",
		tier: "nca",
		zones: ["cloud"],
		tierBadge: "NCA"
	},
	{
		slug: "unicolored-jay",
		commonName: "Unicolored Jay",
		scientificName: "Aphelocoma unicolor",
		family: "Jays",
		tier: "nca",
		zones: ["cloud"],
		tierBadge: "NCA"
	},
	{
		slug: "white-throated-magpie-jay",
		commonName: "White-throated Magpie-Jay",
		scientificName: "Calocitta formosa",
		family: "Jays",
		tier: "mxca",
		zones: ["thorn"]
	},
	{
		slug: "black-capped-swallow",
		commonName: "Black-capped Swallow",
		scientificName: "Notiochelidon pileata",
		family: "Swallows",
		tier: "nca",
		zones: ["pineoak"],
		tierBadge: "NCA",
		photos: ["https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/black-capped-swallow-vYDUGfI4yq2m07pL.jpg"]
	},
	{
		slug: "giant-wren",
		commonName: "Giant Wren",
		scientificName: "Campylorhynchus chiapensis",
		family: "Wrens",
		tier: "mx",
		zones: ["coast"],
		tierBadge: "MX",
		photos: ["https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/_dsc0870-UHFcPZY27edAPFr1.JPG"]
	},
	{
		slug: "nava-s-wren",
		commonName: "Nava's Wren",
		scientificName: "Hylorchilus navai",
		family: "Wrens",
		tier: "mx",
		zones: ["thorn"],
		tierBadge: "MX"
	},
	{
		slug: "rufous-backed-wren",
		commonName: "Rufous-backed Wren",
		scientificName: "Campylorhynchus capistratus",
		family: "Wrens",
		tier: "mxca",
		zones: ["thorn"]
	},
	{
		slug: "rufous-browed-wren",
		commonName: "Rufous-browed Wren",
		scientificName: "Troglodytes rufociliatus",
		family: "Wrens",
		tier: "nca",
		zones: ["cloud"],
		tierBadge: "NCA",
		photos: ["https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/sabes_aves_rufous-browed_wren-ozWNJPc9Zns8f5zO.JPG"]
	},
	{
		slug: "russet-naped-wren",
		commonName: "Russet-naped Wren",
		scientificName: "Campylorhynchus humilis",
		family: "Wrens",
		tier: "wmx",
		zones: ["thorn"],
		tierBadge: "W-MX"
	},
	{
		slug: "white-bellied-wren",
		commonName: "White-bellied Wren",
		scientificName: "Uropsila leucogastra",
		family: "Wrens",
		tier: "mxca",
		zones: ["thorn"]
	},
	{
		slug: "black-thrush",
		commonName: "Black Thrush",
		scientificName: "Turdus infuscatus",
		family: "Thrushes & Solitaires",
		tier: "nca",
		zones: ["cloud"],
		tierBadge: "NCA"
	},
	{
		slug: "black-headed-nightingale-thrush",
		commonName: "Black-headed Nightingale-Thrush",
		scientificName: "Catharus mexicanus",
		family: "Thrushes & Solitaires",
		tier: "mxca",
		zones: ["cloud"],
		photos: ["https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/black-headed-nightingale-thrush-nTqJPgsmKfcxaxAu.jpg"]
	},
	{
		slug: "mountain-thrush",
		commonName: "Mountain Thrush",
		scientificName: "Turdus plebejus",
		family: "Thrushes & Solitaires",
		tier: "nca",
		zones: ["cloud"],
		tierBadge: "NCA"
	},
	{
		slug: "ruddy-capped-nightingale-thrush",
		commonName: "Ruddy-capped Nightingale-Thrush",
		scientificName: "Catharus frantzii",
		family: "Thrushes & Solitaires",
		tier: "mxca",
		zones: ["cloud"]
	},
	{
		slug: "rufous-collared-robin",
		commonName: "Rufous-collared Robin",
		scientificName: "Turdus rufitorques",
		family: "Thrushes & Solitaires",
		tier: "nca",
		zones: ["cloud","pineoak"],
		tierBadge: "NCA"
	},
	{
		slug: "slate-colored-solitaire",
		commonName: "Slate-colored Solitaire",
		scientificName: "Myadestes unicolor",
		family: "Thrushes & Solitaires",
		tier: "mxca",
		zones: ["cloud"],
		photos: ["https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/slate-colored-solitaire-ED5x0xZ5NKF6Z27s.jpg"]
	},
	{
		slug: "yellow-throated-nightingale-thrush",
		commonName: "Yellow-throated Nightingale-Thrush",
		scientificName: "Catharus dryas",
		family: "Thrushes & Solitaires",
		tier: "nca",
		zones: ["cloud"],
		tierBadge: "NCA"
	},
	{
		slug: "blue-and-white-mockingbird",
		commonName: "Blue-and-white Mockingbird",
		scientificName: "Melanotis hypoleucus",
		family: "Mockingbirds",
		tier: "nca",
		zones: ["cloud","pineoak"],
		tierBadge: "NCA",
		photos: ["https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/blue-and-white-mockingbird-1-NCnEIapZ3vpQC2sm.jpg","https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/blue-and-white-mockingbird-2-XpFHUZKbXKFSe1oj.jpg"]
	},
	{
		slug: "black-capped-siskin",
		commonName: "Black-capped Siskin",
		scientificName: "Spinus atriceps",
		family: "Finches, Euphonias & Siskins",
		tier: "nca",
		zones: ["pineoak"],
		tierBadge: "NCA"
	},
	{
		slug: "blue-crowned-chlorophonia",
		commonName: "Blue-crowned Chlorophonia",
		scientificName: "Chlorophonia occipitalis",
		family: "Finches, Euphonias & Siskins",
		tier: "nca",
		zones: ["cloud"],
		tierBadge: "NCA",
		photos: ["https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/sabes_aves_blue-crowned_chlorophonia-1-YD0w1yZbj5fb90o7.jpg"]
	},
	{
		slug: "pine-siskin",
		commonName: "Pine Siskin",
		scientificName: "Spinus pinus",
		family: "Finches, Euphonias & Siskins",
		tier: "mxca",
		zones: ["pineoak"]
	},
	{
		slug: "red-crossbill",
		commonName: "Red Crossbill",
		scientificName: "Loxia curvirostra",
		family: "Finches, Euphonias & Siskins",
		tier: "mxca",
		zones: ["pineoak"]
	},
	{
		slug: "cinnamon-tailed-sparrow",
		commonName: "Cinnamon-tailed Sparrow",
		scientificName: "Peucaea sumichrasti",
		family: "Sparrows & Brushfinches",
		tier: "mx",
		zones: ["thorn"],
		tierBadge: "MX"
	},
	{
		slug: "gray-crowned-ground-sparrow",
		commonName: "Gray-crowned Ground-Sparrow",
		scientificName: "Melozone kieneri",
		family: "Sparrows & Brushfinches",
		tier: "nca",
		zones: ["pacslope"],
		tierBadge: "NCA"
	},
	{
		slug: "green-backed-sparrow",
		commonName: "Green-backed Sparrow",
		scientificName: "Arremonops chloronotus",
		family: "Sparrows & Brushfinches",
		tier: "nca",
		zones: ["rainforest"],
		tierBadge: "NCA"
	},
	{
		slug: "olive-sparrow",
		commonName: "Olive Sparrow",
		scientificName: "Arremonops rufivirgatus",
		family: "Sparrows & Brushfinches",
		tier: "mxca",
		zones: ["thorn"]
	},
	{
		slug: "stripe-headed-sparrow",
		commonName: "Stripe-headed Sparrow",
		scientificName: "Peucaea ruficauda",
		family: "Sparrows & Brushfinches",
		tier: "mxca",
		zones: ["thorn"]
	},
	{
		slug: "white-faced-ground-sparrow",
		commonName: "White-faced Ground-Sparrow",
		scientificName: "Melozone biarcuata",
		family: "Sparrows & Brushfinches",
		tier: "nca",
		zones: ["pineoak"],
		tierBadge: "NCA"
	},
	{
		slug: "white-naped-brushfinch",
		commonName: "White-naped Brushfinch",
		scientificName: "Atlapetes albinucha",
		family: "Sparrows & Brushfinches",
		tier: "mxca",
		zones: ["cloud"],
		photos: ["https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/white-naped-brushfinch-EOFbbzpwUGpok9UL.jpg"]
	},
	{
		slug: "bar-winged-oriole",
		commonName: "Bar-winged Oriole",
		scientificName: "Icterus maculialatus",
		family: "Blackbirds & Orioles",
		tier: "nca",
		zones: ["thorn"],
		tierBadge: "NCA"
	},
	{
		slug: "montezuma-oropendola",
		commonName: "Montezuma Oropendola",
		scientificName: "Psarocolius montezuma",
		family: "Blackbirds & Orioles",
		tier: "mxca",
		zones: ["rainforest"]
	},
	{
		slug: "yellow-winged-cacique",
		commonName: "Yellow-winged Cacique",
		scientificName: "Cassiculus melanicterus",
		family: "Blackbirds & Orioles",
		tier: "wmx",
		zones: ["thorn"],
		tierBadge: "W-MX",
		photos: ["https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/yellow-winged-cacique-si9c5eXF04ZJMbgB.jpg"]
	},
	{
		slug: "fan-tailed-warbler",
		commonName: "Fan-tailed Warbler",
		scientificName: "Basileuterus lachrymosus",
		family: "Warblers",
		tier: "mxca",
		zones: ["thorn"]
	},
	{
		slug: "golden-browed-warbler",
		commonName: "Golden-browed Warbler",
		scientificName: "Basileuterus belli",
		family: "Warblers",
		tier: "mxca",
		zones: ["cloud"]
	},
	{
		slug: "golden-cheeked-warbler",
		commonName: "Golden-cheeked Warbler",
		scientificName: "Setophaga chrysoparia",
		family: "Warblers",
		tier: "mxca",
		zones: ["pineoak"],
		photos: ["https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/saves_aves_golden-cheeked_warbler-fO82HsR2CVu7j9hq.png"]
	},
	{
		slug: "gray-throated-chat",
		commonName: "Gray-throated Chat",
		scientificName: "Granatellus sallaei",
		family: "Warblers",
		tier: "mxca",
		zones: ["rainforest"]
	},
	{
		slug: "pink-headed-warbler",
		commonName: "Pink-headed Warbler",
		scientificName: "Cardellina versicolor",
		family: "Warblers",
		tier: "nca",
		zones: ["pineoak","cloud"],
		tierBadge: "NCA",
		photos: ["https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/pink-headed-warbler-Y4LDbp8VMLCx8rRX.jpg"],
		hasAccount: true
	},
	{
		slug: "red-breasted-chat",
		commonName: "Red-breasted Chat",
		scientificName: "Granatellus venustus",
		family: "Warblers",
		tier: "wmx",
		zones: ["thorn"],
		tierBadge: "W-MX"
	},
	{
		slug: "azure-rumped-tanager",
		commonName: "Azure-rumped Tanager",
		scientificName: "Poecilostreptus cabanisi",
		family: "Tanagers, Buntings & allies",
		tier: "nca",
		zones: ["pacslope"],
		tierBadge: "NCA"
	},
	{
		slug: "blue-seedeater",
		commonName: "Blue Seedeater",
		scientificName: "Amaurospiza concolor",
		family: "Tanagers, Buntings & allies",
		tier: "mxca",
		zones: ["cloud"]
	},
	{
		slug: "cinnamon-bellied-flowerpiercer",
		commonName: "Cinnamon-bellied Flowerpiercer",
		scientificName: "Diglossa baritula",
		family: "Tanagers, Buntings & allies",
		tier: "mxca",
		zones: ["cloud"]
	},
	{
		slug: "golden-hooded-tanager",
		commonName: "Golden-hooded Tanager",
		scientificName: "Stilpnia larvata",
		family: "Tanagers, Buntings & allies",
		tier: "mxca",
		zones: ["rainforest"]
	},
	{
		slug: "orange-breasted-bunting",
		commonName: "Orange-breasted Bunting",
		scientificName: "Passerina leclancherii",
		family: "Tanagers, Buntings & allies",
		tier: "wmx",
		zones: ["thorn"],
		tierBadge: "W-MX"
	},
	{
		slug: "rose-bellied-bunting",
		commonName: "Rose-bellied Bunting",
		scientificName: "Passerina rositae",
		family: "Tanagers, Buntings & allies",
		tier: "mx",
		zones: ["thorn"],
		tierBadge: "MX",
		photos: ["https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/rose-bellied-bunting-m2Wa32VjWETn9NkA.png"],
		hasAccount: true
	},
	{
		slug: "yellow-grosbeak",
		commonName: "Yellow Grosbeak",
		scientificName: "Pheucticus chrysopeplus",
		family: "Tanagers, Buntings & allies",
		tier: "mxca",
		zones: ["thorn"],
		photos: ["https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1400/YofU1cddTQzjoQ8J/yellow-grosbeak-EBPvotaS7J1A3VuE.png"]
	}
];

/** Family headings in their original taxonomic order. */
export const familyOrder: string[] = [
	"Tinamous",
	"Guans, Chachalacas & Quail",
	"Pigeons & Doves",
	"Nightjars & Potoos",
	"Hummingbirds",
	"Rails, Crakes & Waterbirds",
	"Raptors",
	"Owls",
	"Trogons & Quetzal",
	"Motmots",
	"Toucans",
	"Woodpeckers",
	"Parrots",
	"Tyrant Flycatchers",
	"Cotingas & Manakins",
	"Vireos",
	"Jays",
	"Swallows",
	"Wrens",
	"Thrushes & Solitaires",
	"Mockingbirds",
	"Finches, Euphonias & Siskins",
	"Sparrows & Brushfinches",
	"Blackbirds & Orioles",
	"Warblers",
	"Tanagers, Buntings & allies"
];

export function getSpeciesBySlug(slug: string): Species | undefined {
	return species.find((s) => s.slug === slug);
}
