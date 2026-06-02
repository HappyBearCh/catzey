import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const MOCK_ARTICLES = [
  {
    title: 'Bosnia and Herzegovina Advances EU Membership Negotiations',
    content:
      "Bosnia and Herzegovina has taken a significant step toward European Union membership after completing a new round of accession negotiations in Brussels. Officials from both sides confirmed substantial progress on key reform areas including rule of law, anti-corruption measures, and judicial independence.\n\nEU enlargement commissioner praised the efforts of Sarajevo's government, noting that the pace of reforms has exceeded expectations. The next review is scheduled for later this year, with analysts cautiously optimistic about Bosnia's trajectory.\n\nCitizens in Sarajevo expressed mixed reactions, with many welcoming the news while others called for faster economic improvements alongside the political reforms. Business associations highlighted the potential benefits of EU market access for Bosnian exporters.",
    excerpt:
      'Bosnia and Herzegovina completed a new round of EU accession negotiations in Brussels, with officials noting significant progress on judicial and anti-corruption reforms.',
    slug: 'bosnia-eu-membership-negotiations',
    imageUrl: 'https://images.unsplash.com/photo-1607139021223-8afe2ba7e6b1?w=800',
    category: 'politics',
    source: 'istraga.ba',
    sourceUrl: 'https://istraga.ba/seed/1',
    publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
  },
  {
    title: 'Sarajevo Named Among Europe\'s Top 10 Rising Travel Destinations',
    content:
      "Sarajevo has been included on a prestigious European travel industry list recognizing it as one of the continent's fastest-growing tourist destinations. The city's unique blend of Ottoman, Austro-Hungarian, and Yugoslav architecture, combined with its vibrant café culture and growing gastronomy scene, drew record numbers of visitors last year.\n\nThe Baščaršija district in particular has seen a surge in boutique hotels and artisan shops. Local tourism officials credit recent infrastructure improvements, including a renovated tram network and expanded airport connections, for the boom.\n\nTravel operators from Germany, France, and the United Kingdom reported a significant increase in Sarajevo-bound bookings, with many visitors extending their stays to explore wider Bosnia and Herzegovina.",
    excerpt:
      'Sarajevo earned a spot on a major European travel industry list, with record visitor numbers driven by the city\'s unique cultural heritage and improved infrastructure.',
    slug: 'sarajevo-top-travel-destination-europe',
    imageUrl: 'https://images.unsplash.com/photo-1585867350268-ede9c14d99c0?w=800',
    category: 'travel',
    source: 'radiosarajevo.ba',
    sourceUrl: 'https://radiosarajevo.ba/seed/1',
    publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    title: 'Bosnia\'s Tech Startups Attract Record €45M in Foreign Investment',
    content:
      "A cluster of technology startups headquartered in Sarajevo and Banja Luka have collectively secured €45 million in venture capital funding this year, marking a new high for Bosnia's emerging tech ecosystem. The investment was led by regional funds from Vienna and Berlin, with participation from Silicon Valley-connected angel investors.\n\nThe boom is partly attributed to the growing talent pipeline from the country's universities, particularly in software engineering and cybersecurity. Several companies are developing AI-powered solutions for the healthcare and logistics sectors.\n\nThe government announced a new tax incentive package aimed at retaining tech workers who might otherwise emigrate, a long-standing challenge for the country. A new technology park in Tuzla is expected to open next spring, adding further capacity.",
    excerpt:
      'Bosnian tech startups raised a record €45 million in foreign investment this year, with Sarajevo and Banja Luka establishing themselves as growing Eastern European tech hubs.',
    slug: 'bosnia-tech-startups-45m-investment',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800',
    category: 'tech',
    source: 'istraga.ba',
    sourceUrl: 'https://istraga.ba/seed/2',
    publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
  },
  {
    title: 'Bosnian Football Federation Signs Historic Deal with Bundesliga',
    content:
      "The Football Federation of Bosnia and Herzegovina has announced a landmark partnership agreement with the German Bundesliga that will see direct youth development exchange programs established between clubs. The five-year agreement includes training academies, coaching clinics, and scouting cooperation.\n\nUnder the deal, up to twenty Bosnian youth players per season will train with Bundesliga clubs, gaining exposure to world-class coaching methodologies. In return, German clubs gain preferential scouting access to Bosnia's domestic league.\n\nThe national team coach called the deal 'transformative' for Bosnian football, noting that several current players who trained abroad early in their careers have become the backbone of the national squad. The federation hopes the program will produce the next generation of international stars.",
    excerpt:
      'The Football Federation of Bosnia and Herzegovina signed a five-year youth development partnership with the German Bundesliga, including player exchanges and coaching clinics.',
    slug: 'bosnian-football-bundesliga-deal',
    imageUrl: 'https://images.unsplash.com/photo-1551958219-acbc595d9b8f?w=800',
    category: 'sport',
    source: 'radiosarajevo.ba',
    sourceUrl: 'https://radiosarajevo.ba/seed/2',
    publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
  },
  {
    title: 'Stari Most Bridge in Mostar Celebrates 30 Years Since Reconstruction',
    content:
      "The iconic Stari Most (Old Bridge) in Mostar is marking the thirtieth anniversary of its reconstruction following its destruction during the 1990s conflict. Cultural events, ceremonies, and an international photography exhibition are being held across the city to commemorate the milestone.\n\nThe bridge, a UNESCO World Heritage Site, was rebuilt using original Ottoman techniques and local stone quarried from the same source used in its sixteenth-century construction. It has become one of the most recognizable symbols of post-war reconciliation in the Balkans.\n\nLocal officials invited dignitaries from across Europe and the former Yugoslav states to attend the celebrations. Divers competed in the traditional jumping contest from the bridge's arch, a centuries-old tradition that has been revived as an annual sporting event drawing international competitors.",
    excerpt:
      'Mostar marked thirty years since the reconstruction of the iconic Stari Most bridge with cultural events and an international photography exhibition celebrating the symbol of reconciliation.',
    slug: 'stari-most-mostar-30-anniversary',
    imageUrl: 'https://images.unsplash.com/photo-1590959651373-a281c5f8e5f6?w=800',
    category: 'culture',
    source: 'istraga.ba',
    sourceUrl: 'https://istraga.ba/seed/3',
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    title: 'Bosnia Implements Nationwide Health Screening Programme for Youth',
    content:
      "The Ministry of Health of Bosnia and Herzegovina has launched a nationwide preventive health screening programme targeting citizens between the ages of eighteen and thirty-five. The initiative, partly funded by EU health grants, focuses on cardiovascular health, diabetes risk, and mental health assessment.\n\nMobile screening units will visit smaller municipalities across the country over the next eighteen months, making services accessible to populations that previously had to travel to major cities for checkups. The programme includes free consultations with specialists and follow-up care.\n\nHealth officials cited post-pandemic data showing a rise in undiagnosed chronic conditions among younger Bosnians as the primary motivation. Digital health records introduced alongside the programme are expected to improve long-term healthcare coordination across the country's complex institutional structure.",
    excerpt:
      'Bosnia launched a nationwide health screening programme for 18-35 year olds, with mobile units visiting smaller municipalities and free specialist consultations offered to participants.',
    slug: 'bosnia-nationwide-health-screening-youth',
    imageUrl: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800',
    category: 'health',
    source: 'radiosarajevo.ba',
    sourceUrl: 'https://radiosarajevo.ba/seed/3',
    publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
  },
  {
    title: 'Sarajevo Film Festival Announces Record 400 Film Submissions for 2025',
    content:
      "The Sarajevo Film Festival, one of Southeast Europe's premier cinematic events, has received a record four hundred film submissions for its upcoming edition. Organisers attribute the surge to growing global interest in Balkan cinema and the festival's expanding international reputation.\n\nThis year's programme will feature a special retrospective section dedicated to Bosnian films of the 1990s, offering younger audiences a window into the cultural resilience maintained during a period of conflict. A new competition category for documentary shorts has been added.\n\nSeveral major European distributors have confirmed attendance, raising hopes for Bosnian productions to secure wider international distribution deals. The festival, held every August in Sarajevo, is credited with having launched the careers of numerous acclaimed regional filmmakers.",
    excerpt:
      'The Sarajevo Film Festival received a record 400 submissions for its 2025 edition, with a new documentary category and a retrospective of 1990s Bosnian cinema added to the programme.',
    slug: 'sarajevo-film-festival-2025-record-submissions',
    imageUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800',
    category: 'entertainment',
    source: 'istraga.ba',
    sourceUrl: 'https://istraga.ba/seed/4',
    publishedAt: new Date(Date.now() - 7 * 60 * 60 * 1000),
  },
  {
    title: 'Bosnia Signs New Agricultural Export Agreement with Gulf States',
    content:
      "Bosnia and Herzegovina has concluded a new agricultural export framework with three Gulf Cooperation Council member states, opening significant new markets for Bosnian organic produce, dairy products, and lamb. The agreement, signed in Sarajevo, is expected to generate approximately €80 million in annual exports when fully operational.\n\nBosnian organic certification has gained recognition in the Gulf market, where consumers are increasingly seeking certified halal and pesticide-free food products. Local farmers in rural Herzegovina have been among the first to benefit from pilot export shipments.\n\nThe Chamber of Foreign Trade of BiH called the deal 'one of the most strategically important commercial agreements in a decade.' Infrastructure investments in cold-chain logistics at Sarajevo and Tuzla airports are planned to support the increased export volume.",
    excerpt:
      "Bosnia signed an agricultural export agreement with Gulf states expected to generate €80 million annually, with organic produce and dairy products leading the new trade relationship.",
    slug: 'bosnia-agricultural-export-gulf-states',
    imageUrl: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800',
    category: 'business',
    source: 'radiosarajevo.ba',
    sourceUrl: 'https://radiosarajevo.ba/seed/4',
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
  },
  {
    title: 'UN Report Highlights Bosnia as Model for Post-Conflict Reconstruction',
    content:
      "A newly released United Nations Development Programme report has cited Bosnia and Herzegovina as a case study in post-conflict urban and institutional reconstruction, pointing to Sarajevo's transformation over the past three decades as evidence that sustainable rebuilding is achievable in divided societies.\n\nThe report, prepared for a global conference on sustainable development, highlights investment in education infrastructure, the revival of inter-ethnic municipal institutions, and community-led cultural programmes as key contributors to stability.\n\nWhile the report acknowledges ongoing challenges including emigration, political gridlock, and economic inequality, it concludes that Bosnia's experience offers transferable lessons for other post-conflict nations. Several African Union delegations have expressed interest in study visits to Bosnia as a result.",
    excerpt:
      'A UNDP report cited Bosnia and Herzegovina as a global case study in post-conflict reconstruction, highlighting Sarajevo\'s transformation as a model for divided societies.',
    slug: 'un-report-bosnia-post-conflict-reconstruction-model',
    imageUrl: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800',
    category: 'world',
    source: 'istraga.ba',
    sourceUrl: 'https://istraga.ba/seed/5',
    publishedAt: new Date(Date.now() - 9 * 60 * 60 * 1000),
  },
  {
    title: 'Investigation Reveals Misuse of Public Funds in Road Construction Contracts',
    content:
      "An investigative report has uncovered evidence of systematic misuse of public funds in a series of road construction contracts awarded in two Bosnian cantons. The investigation, conducted over six months by a consortium of journalists, found that contracts worth approximately thirty million euros were awarded to companies with political connections without following proper tendering procedures.\n\nDocuments obtained under freedom of information requests show that specifications for several contracts were written in ways that effectively excluded competitive bidders, ensuring predetermined outcomes. Some of the contracts were completed at costs significantly above market rates, with quality assessments noting below-standard construction.\n\nThe Anti-Corruption Agency has confirmed it has opened a formal inquiry based on the published findings. The canton authorities named in the report denied wrongdoing and said they welcomed the inquiry as an opportunity to demonstrate transparency.",
    excerpt:
      "An investigative report revealed €30 million in public road construction contracts were awarded without proper tendering to politically connected companies in two Bosnian cantons.",
    slug: 'investigation-public-funds-road-construction-contracts',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800',
    category: 'bosnia',
    source: 'istraga.ba',
    sourceUrl: 'https://istraga.ba/seed/6',
    publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000),
  },
];

async function main() {
  console.log('Seeding database with mock articles...');

  for (const article of MOCK_ARTICLES) {
    await prisma.article.upsert({
      where: { sourceUrl: article.sourceUrl },
      create: article,
      update: { publishedAt: article.publishedAt },
    });
  }

  const count = await prisma.article.count();
  console.log(`Done. Database now has ${count} articles.`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
