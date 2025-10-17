export const categories = Object.freeze({
  drama: "Drama",
  action: "Action",
  crime: "Crime",
  biography: "Biography",
  adventure: "Adventure",
  comedy: "Comedy",
});

export const movies = [
  {
    title: "Fight Club",
    director: "David Fincher",
    actors: "Brad Pitt, Edward Norton, Helena Bonham Carter",
    year: 1999,
    description:
      "An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.",
    category: "Drama",
    rating: 8.8,
  },
  {
    title: "The Dark Knight",
    director: "Christopher Nolan",
    actors: "Christian Bale, Heath Ledger, Aaron Eckhart",
    year: 2008,
    description:
      "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    category: "Action",
    rating: 9,
  },
  {
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    actors: "Samuel L. Jackson, Uma Thurman, Bruce Willis",
    year: 1994,
    description:
      "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    category: "Crime",
    rating: 8.9,
  },
  {
    title: "Schindler's List",
    director: "Steven Spielberg",
    actors: "Liam Neeson, Ralph Fiennes, Ben Kingsley",
    year: 1993,
    description:
      "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
    category: "Biography",
    rating: 8.9,
  },
  {
    title: "The Lord of theRing: The Return of the King",
    director: "Peter Jackson",
    actors: "Elijah Wood, Viggo Mortensen, Ian McKellen",
    year: 2003,
    description:
      "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
    category: "Adventure",
    rating: 8.9,
  },
  {
    title: "The Social Network",
    director: "David Fincher",
    actors: "Jesse Eisenberg, Andrew Garfield, Justin Timberlake",
    year: 2010,
    description:
      "Harvard student Mark Zuckerberg creates the social networking site that would become known as Facebook, but is later sued by two brothers who claimed he stole their idea, and the co-founder who was later squeezed out of the business.",
    category: "Biography",
    rating: 7.7,
  },
  {
    title: "Goodfellas",
    director: "Martin Scorsese",
    actors: "Robert De Niro, Ray Liotta, Joe Pesci",
    year: 1990,
    description:
      "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate.",
    category: "Biography",
    rating: 8.7,
  },
  {
    title: "Inception",
    director: "Christopher Nolan",
    actors: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page",
    year: 2010,
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    category: "Action",
    rating: 8.8,
  },
  {
    title: "Pulp Fiction",
    director: "Quentin Tarantino",
    actors: "John Travolta, Uma Thurman, Samuel L. Jackson",
    year: 1994,
    description:
      "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    category: "Crime",
    rating: 8.9,
  },
  {
    title: "The Lord of theRing: The Fellowship of the Ring",
    director: "Peter Jackson",
    actors: "Elijah Wood, Ian McKellen, Orlando Bloom",
    year: 2001,
    description:
      "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
    category: "Adventure",
    rating: 8.8,
  },
  {
    title: "Se7en",
    director: "David Fincher",
    actors: "Morgan Freeman, Brad Pitt, Kevin Spacey",
    year: 1995,
    description:
      "Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motives.",
    category: "Crime",
    rating: 8.6,
  },
  {
    title: "Forrest Gump",
    director: "Robert Zemeckis",
    actors: "Tom Hanks, Robin Wright, Gary Sinise",
    year: 1994,
    description:
      "The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other historical events unfold through the perspective of an Alabama man with an IQ of 75.",
    category: "Drama",
    rating: 8.8,
  },
  {
    title: "Django Unchained",
    director: "Quentin Tarantino",
    actors: "Jamie Foxx, Christoph Waltz, Leonardo DiCaprio",
    year: 2012,
    description:
      "With the help of a German bounty hunter, a freed slave sets out to rescue his wife from a brutal Mississippi plantation owner.",
    category: "Drama",
    rating: 8.4,
  },
  {
    title: "The Dark Knight Rises",
    director: "Christopher Nolan",
    actors: "Christian Bale, Tom Hardy, Anne Hathaway",
    year: 2012,
    description:
      "Eight years after the Joker's reign of anarchy, Batman, with the help of the enigmatic Catwoman, is forced from his exile to save Gotham City from the brutal guerrilla terrorist Bane.",
    category: "Action",
    rating: 8.4,
  },
  {
    title: "Saving Private Ryan",
    director: "Steven Spielberg",
    actors: "Tom Hanks, Matt Damon, Tom Sizemore",
    year: 1998,
    description:
      "Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.",
    category: "Action",
    rating: 8.6,
  },
  {
    title: "The Lord of theRing: The Two Towers",
    director: "Peter Jackson",
    actors: "Elijah Wood, Ian McKellen, Viggo Mortensen",
    year: 2002,
    description:
      "While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron's new ally, Saruman, and his hordes of Isengard.",
    category: "Adventure",
    rating: 8.7,
  },
  {
    title: "Gone Girl",
    director: "David Fincher",
    actors: "Ben Affleck, Rosamund Pike, Neil Patrick Harris",
    year: 2014,
    description:
      "With his wife's disappearance having become the focus of an intense media circus, a man sees the spotlight turned on him when it's suspected that he may not be innocent.",
    category: "Drama",
    rating: 8.1,
  },
  {
    title: "Casino",
    director: "Martin Scorsese",
    actors: "Robert De Niro, Joe Pesci, Sharon Stone",
    year: 1995,
    description:
      "A tale of greed, deception, money, power, and murder occur between two bestfriend: a mafia enforcer and a casino executive compete against each other over a gambling empire, and over a fast-living and fast-loving socialite.",
    category: "Crime",
    rating: 8.2,
  },
  {
    title: "Inception",
    director: "Christopher Nolan",
    actors: "Leonardo DiCaprio, Ken Watanabe, Joseph Gordon-Levitt",
    year: 2010,
    description:
      "Cobb, a skilled thief who commits corporate espionage by infiltrating the subconscious of his targets, is offered a chance to regain his old life as payment for a task considered to beimpossibl: inception.",
    category: "Action",
    rating: 8.8,
  },
  {
    title: "Once Upon a Time... in Hollywood",
    director: "Quentin Tarantino",
    actors: "Leonardo DiCaprio, Brad Pitt, Margot Robbie",
    year: 2019,
    description:
      "A faded television actor and his stunt double strive to achieve fame and success in the final years of Hollywood's Golden Age in 1969 Los Angeles.",
    category: "Comedy",
    rating: 7.6,
  },
  {
    title: "The Lord of theRing: The Return of the King",
    director: "Peter Jackson",
    actors: "Elijah Wood, Ian McKellen, Liv Tyler",
    year: 2003,
    description:
      "A meek Hobbit and eight companions set out on a journey to destroy the One Ring and the Dark Lord Sauron.",
    category: "Adventure",
    rating: 8.9,
  },
  {
    title: "Zodiac",
    director: "David Fincher",
    actors: "Jake Gyllenhaal, Robert Downey Jr., Mark Ruffalo",
    year: 2007,
    description:
      "In the late 1960s/early 1970s, a San Francisco cartoonist becomes an amateur detective obsessed with tracking down the Zodiac Killer, an unidentified individual who terrorizes Northern California with a killing spree.",
    category: "Crime",
    rating: 7.7,
  },
  {
    title: "The Wolf of Wall Street",
    director: "Martin Scorsese",
    actors: "Leonardo DiCaprio, Jonah Hill, Margot Robbie",
    year: 2013,
    description:
      "Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption, and the federal government.",
    category: "Biography",
    rating: 8.2,
  },
  {
    title: "Interstellar",
    director: "Christopher Nolan",
    actors: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
    year: 2014,
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    category: "Adventure",
    rating: 8.6,
  },
  {
    title: "The Hateful Eight",
    director: "Quentin Tarantino",
    actors: "Samuel L. Jackson, Kurt Russell, Jennifer Jason Leigh",
    year: 2015,
    description:
      "In post-Civil War Wyoming, bounty hunters try to find shelter during a blizzard but get involved in a plot of betrayal and deception. Will they survive?",
    category: "Drama",
    rating: 7.8,
  },
];
