/**
 * Eighth batch of editorial essays.
 * Run with: npx tsx scripts/seed-essays-8.ts
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ESSAYS = [
  {
    title: 'Berserk: Kentaro Miura and the Unfinished Masterpiece',
    slug: 'berserk-kentaro-miura-unfinished-masterpiece',
    category: 'manga',
    excerpt: 'Kentaro Miura spent thirty-two years drawing Berserk before dying in 2021 with the story unfinished. It is one of the most visually ambitious and emotionally demanding manga ever published. Here is an honest account of what it achieved and what it cost.',
    content: `Kentaro Miura began serializing "Berserk" in Young Animal magazine in August 1989 and continued until his death in May 2021 at the age of 54. The series follows Guts, a mercenary born from a hanged corpse on a battlefield, through an extraordinarily dark medieval fantasy world. Over thirty-two years and forty collected volumes, Miura produced one of the most accomplished and demanding manga ever published â€” a work of such visual ambition and emotional depth that its unfinished state at the time of his death felt to many readers like a loss out of proportion to the usual grief of a cancelled series.

The visual standard Miura established is what the medium typically compares against when discussing artistic ambition. His page compositions â€” the architecture of individual panels, the management of black space, the creature designs that combined organic horror with structural complexity â€” required production time that forced extended hiatuses, some lasting years. These hiatuses generated frustration in the fan community while simultaneously being the cost of the standard Miura refused to compromise. The battle sequences in the Golden Age arc, which Miura drew in the mid-1990s, have not been surpassed in action manga for detail and dynamic clarity.

The narrative structure is formally sophisticated in ways that the series' dark reputation sometimes obscures. "Berserk" is built around a flashback â€” the Golden Age arc explains how Guts arrived at the condition in which the manga opens. Miura uses this structure to make the backstory devastating in retroactive ways: the reader's investment in Guts and Griffith accumulates across hundreds of chapters, which makes the Eclipse â€” the series' central catastrophic event â€” function as a betrayal felt at the depth of the reader's own attachment rather than as an abstract narrative event.

The Eclipse is the most discussed scene in manga history among serious readers, and the discussion is primarily about what it asks of its audience. Its content is depicted with a graphic directness that many readers cannot and should not be required to engage with. Miura's argument, made across thousands of pages leading to that event, is that its horror is the load-bearing element: that the world it introduces, in which those with ambition can purchase power at the cost of those who trust them, cannot be established otherwise. Whether that argument justifies the content is a legitimate question that readers must resolve individually.

The serialization continues under Kouji Mori, Miura's closest friend, working from Miura's notes and their conversations about how the series would develop. The arrangement generates understandable unease among readers who feel that an unfinished work of this kind belongs in its unfinished state â€” and understandable gratitude among readers for whom closure matters more than purity. Both responses are the natural product of a series that generated thirty-two years of investment. Miura left behind pages that demonstrate what "Berserk" would have continued to be, and what those pages represent has not diminished since his death.`,
    tags: ['Berserk', 'Kentaro Miura', 'Young Animal', 'dark fantasy manga', 'manga 1990s', 'Kouji Mori'],
    entities: ['Kentaro Miura', 'Young Animal', 'Kouji Mori'],
    publishedAt: new Date('2026-01-03'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/berserk-kentaro-miura-unfinished-masterpiece',
  },
  {
    title: 'The Fate Franchise: How One Visual Novel Became a Multi-Medium Empire',
    slug: 'fate-franchise-visual-novel-multi-medium-empire',
    category: 'light-novels',
    excerpt: 'Type-Moon published Fate/stay night in 2004 as a PC visual novel with three routes. Twenty years later, the franchise spans dozens of anime, theatrical films, and a mobile game generating billions annually. Here is how that happened.',
    content: `Type-Moon published "Fate/stay night" as a visual novel for PC in January 2004. The game â€” written by Kinoko Nasu, illustrated by Takashi Takeuchi â€” presented three separate narrative routes through a story about mages competing in a secret tournament using summoned historical and mythological heroes. The three routes are distinct enough in theme and emotional register that they function as related but independent works, each exploring different aspects of the story's central questions about heroism, sacrifice, and whether idealism can survive contact with reality. Twenty years later, the franchise encompasses dozens of anime series, manga adaptations, mobile games generating billions annually, theatrical films, and a global fanbase of unusual intensity.

The architecture of the original visual novel made the franchise's expansion structurally possible. Each route features a different heroine and a different thematic focus: the Fate route examines the nature of heroic idealism; Unlimited Blade Works examines the costs of self-determination; Heaven's Feel examines the ethics of choosing one person's survival over abstract principle. The routes can be read as conversations with each other, and the protagonist's development across them adds up to something that no single route achieves independently. This modular architecture translated well to adaptation: different studios could adapt different routes without duplicating each other.

"Fate/Zero," the prequel written by Gen Urobuchi and adapted by ufotable in 2011â€“2012, was the work that transformed Fate from a niche franchise into a mainstream anime property. Urobuchi's analysis of the Grail War's participants â€” each a person whose worldview the series takes seriously before dismantling â€” applied his characteristic approach to the setting's moral complexity in ways that did not require familiarity with the original game. The ufotable adaptation's visual quality established production standards that subsequent Fate anime attempted to match. "Fate/stay night: Unlimited Blade Works" (ufotable, 2014â€“2015) and the "Heaven's Feel" film trilogy (2017â€“2020) completed ufotable's coverage of the original game's routes.

The mobile game "Fate/Grand Order," launched in 2015, represents the franchise's most commercially significant development. FGO is a gacha game in which players collect Servants â€” the historical and mythological heroes of the visual novel â€” and deploy them in turn-based combat. The game has generated billions in revenue by combining the franchise's existing appeal with the gacha model's monetization mechanics. New Servants introduced in FGO have become more popular than characters from the original visual novel, and the game has developed its own fanbase that may never have engaged with the original medium.

What is clearest, and worth stating plainly, is that the original visual novel's three routes constitute a work of genuine literary ambition, and that the franchise grown around them ranges from very good (Fate/Zero, the ufotable films) to functionally unrelated to what the original work was. The capacity to be both things simultaneously â€” to sustain an expanding commercial empire while the original work remains valid â€” is the most interesting thing about the franchise's history.`,
    tags: ['Fate/stay night', 'Type-Moon', 'Kinoko Nasu', 'ufotable', 'Fate/Zero', 'visual novel'],
    entities: ['Type-Moon', 'Kinoko Nasu', 'ufotable', 'Gen Urobuchi'],
    publishedAt: new Date('2026-01-05'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/fate-franchise-visual-novel-multi-medium-empire',
  },
  {
    title: 'The Promised Neverland: How the Second Half Lost What the First Half Built',
    slug: 'promised-neverland-how-second-half-lost-what-first-built',
    category: 'manga',
    excerpt: 'The Promised Neverland opened as one of the strongest manga premises in Jump\'s recent history. Its post-escape story failed to honor what made that opening work. Here\'s an honest account of what happened.',
    content: `"The Promised Neverland" by Kaiu Shirai and Posuka Demizu began serializing in Weekly Shonen Jump in August 2016. Through its first twenty-odd chapters, it was widely regarded as one of the strongest openings in Jump's recent history. The premise â€” a group of children at an orphanage discover they are being raised as food for demons and plan an escape â€” generated genuine tension through the constraint of its setting and the intelligence of its characters. The escape arc's cat-and-mouse dynamic between the children, led by Emma, Ray, and Norman, and the orphanage's manager Isabella was constructed with a sophistication unusual for the magazine's demographic. The comparison to "Death Note" â€” another Jump series built around the mutual maneuvering of two highly intelligent antagonists â€” was not without reason.

The first arc ends with the escape. What follows â€” the outside world, the expanded conflict with the demon world's power structures, the discovery that the world has been negotiated into its current configuration â€” is where critical consensus divided. The post-escape story required the series to expand from the tight tension of a single location and single antagonist into a larger world with political structures and an expanded cast. The expansion was not itself the problem. The problem was that the mechanics of the first arc â€” the specific intelligence that made Emma and Norman feel worthy of their antagonist â€” were not sustainable across the larger canvas. Solutions arrived through power-ups, time skips, and plot developments that discarded established characters in ways that felt like asset liquidation rather than narrative development.

The manga's ending â€” in which Emma uses a wish to rewrite the arrangement of reality â€” was received by a substantial portion of the fanbase as a betrayal of the series' early commitment to earned solutions. The wish mechanic, introduced in the final stretch, felt like an acknowledgment that the narrative had written itself into a corner it could not solve using its established tools. The ending is not incoherent, and Shirai clearly had thematic intentions â€” Emma's choice to sacrifice her own memory is consistent with her core values. But the mechanism by which the choice was enabled does not feel like the series the first arc established.

The anime's second season, produced by CloverWorks, responded to the manga's later problems by making different choices: compressing, reordering, and constructing an alternate ending. The reception was negative. Manga readers felt the compression was disrespectful to the material; anime-only viewers found the pacing incoherent. The season became a case study in how adapting a manga in difficulty requires choosing between bad options.

What the series' trajectory demonstrates is that a premise fully realized in a contained space is difficult to extend without either repeating itself or abandoning what made it work. The first volume remains one of Jump's finest, and the complete series is an instructive example of the gap between a strong premise and the same premise required to sustain a long-running serial.`,
    tags: ['The Promised Neverland', 'Kaiu Shirai', 'Posuka Demizu', 'Weekly Shonen Jump', 'manga endings', 'CloverWorks'],
    entities: ['Kaiu Shirai', 'Posuka Demizu', 'CloverWorks'],
    publishedAt: new Date('2026-01-07'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/promised-neverland-how-second-half-lost-what-first-built',
  },
  {
    title: 'Rumiko Takahashi: The World\'s Most Successful Female Manga Creator',
    slug: 'rumiko-takahashi-worlds-most-successful-female-manga-creator',
    category: 'manga',
    excerpt: 'Rumiko Takahashi\'s series â€” Urusei Yatsura, Maison Ikkoku, Ranma Â½, Inuyasha â€” have sold over 200 million copies. She has been serializing since 1978. Here is what she does and why it works.',
    content: `Rumiko Takahashi is the most commercially successful female manga creator in history and one of the most commercially successful manga creators of any gender. Her series "Urusei Yatsura," "Maison Ikkoku," "Ranma Â½," "Inuyasha," and "Rin-ne" have collectively sold over 200 million copies. She has been serializing manga since 1978 and continues to do so. The breadth of her commercial achievement is large enough to obscure the more specific discussion of what she does and why it works.

Takahashi's career began with "Urusei Yatsura" in 1978, a romantic comedy whose central premise â€” an unlucky human boy accidentally engaged to an alien princess â€” established her signature tonal register: absurdist comedy, genuine romantic feeling, an ensemble large enough to sustain comedy through variety, and an underlying emotional warmth that the comedy never entirely dispels. The series ran for nine years in Weekly Shonen Sunday, generating two TV anime series and four theatrical films, including Mamoru Oshii's "Beautiful Dreamer" (1984), which used the franchise to pursue formal preoccupations that were entirely Oshii's own.

"Maison Ikkoku," which ran concurrently with "Urusei Yatsura" from 1980 to 1987, demonstrated that Takahashi could work in a completely different register. A straightforward adult romance between a university student and his apartment building's widowed manager, it has no fantasy or science fiction elements â€” it is a realistic depiction of adult lives complicated by grief, family pressure, and the specific difficulty of love between people who both have histories. The series is Takahashi's most emotionally serious work and is frequently cited as the first manga that described something real about romantic love to readers who encountered it as young adults.

"Ranma Â½" returned to absurdist territory with a martial artist who turns into a girl when splashed with cold water. "Inuyasha," beginning in 1996, moved toward darker fantasy â€” its story of a girl from modern Japan entangled with a half-demon in the Sengoku period ran for twelve years. The range across these series â€” comedy, realistic romance, martial arts comedy, historical fantasy â€” is unusual even among mangaka with careers of comparable length.

What connects them is Takahashi's consistent interest in relationships complicated by circumstance and character rather than resolved by plot. Her characters do not get together when the villain is defeated; they get together, or don't, based on the specific difficulties their personalities and situations create for each other. This produces manga that are more emotionally satisfying over long serialization than series organized around external plot resolution, because the emotional core does not depend on event resolution but on the genuinely difficult question of whether these specific people can actually work it out.`,
    tags: ['Rumiko Takahashi', 'Urusei Yatsura', 'Maison Ikkoku', 'Ranma Â½', 'Inuyasha', 'manga creator'],
    entities: ['Rumiko Takahashi', 'Weekly Shonen Sunday'],
    publishedAt: new Date('2026-01-09'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/rumiko-takahashi-worlds-most-successful-female-manga-creator',
  },
  {
    title: 'The Melancholy of Haruhi Suzumiya: The Anime That Rewired 2006',
    slug: 'melancholy-haruhi-suzumiya-anime-rewired-2006',
    category: 'light-novels',
    excerpt: 'Haruhi Suzumiya premiered in April 2006 and dominated anime conversation in a way no subsequent single season has replicated. Here is what it was, what it did, and why the Endless Eight still generates argument.',
    content: `"The Melancholy of Haruhi Suzumiya" premiered in April 2006 as an anime adaptation of Nagaru Tanigawa's light novel series. Produced by Kyoto Animation and directed by Tatsuya Ishihara, its first season aired in a non-chronological order â€” episodes numbered by broadcast position but telling the story out of sequence, with the chronological order revealed separately on DVD. This structural choice was one component of a phenomenon that dominated anime conversation in 2006 in a way no subsequent single season has quite replicated.

The series follows Kyon, a cynical high school student who becomes involved with Haruhi Suzumiya â€” a girl who, without knowing it, has the ability to reshape reality based on her desires, and who would destroy and recreate the universe if she became sufficiently bored. The supernatural entities surrounding Haruhi have organized to prevent this through the simple strategy of keeping her engaged and happy. Kyon, an ordinary person, is the only one who interacts with Haruhi as a person rather than as a cosmic force to be managed, which gives him a role no one else can fill.

The cultural penetration of "Haruhi Suzumiya" in 2006 and 2007 was specific to its moment in internet culture. The series was among the first anime to generate widespread fan engagement through the early anime blog and forum ecosystem. The "Hare Hare Yukai" ending dance was documented being replicated at conventions worldwide in videos circulating through the early years of YouTube. The light novel series, then not yet concluded, was read with an intensity that Tanigawa's subsequent production pace â€” very slow, with multi-year gaps between installments â€” would frustrate for fifteen years.

The 2009 second season's "Endless Eight" â€” eight consecutive episodes depicting the same two-week time loop with different animation but nearly identical narrative content â€” tested audience investment with a dedication that divided opinion sharply. Those who found it a formal experiment noted that experiencing eight episodes simulates, in compressed form, what the characters experienced over 15,000 iterations. Those who found it a waste of animation budget and audience time were not wrong either. The arc remains one of the more discussed formal provocations in anime production history.

"Haruhi Suzumiya"'s specific importance is its demonstration that a light novel adaptation with an unusual structural approach could generate the cultural saturation previously associated only with long-running shonen. It established light novel adaptations as a commercially significant category and demonstrated audience appetite for stories with female leads who were genuinely unusual rather than conventionally appealing. Its influence on subsequent KyoAni productions, and on light novel adaptations generally, marks a clear before-and-after in the category's history.`,
    tags: ['Haruhi Suzumiya', 'Nagaru Tanigawa', 'Kyoto Animation', 'light novels', 'anime 2006', 'Endless Eight'],
    entities: ['Nagaru Tanigawa', 'Kyoto Animation'],
    publishedAt: new Date('2026-01-11'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/melancholy-haruhi-suzumiya-anime-rewired-2006',
  },
  {
    title: 'Monogatari: The Series That Refuses to Be Anything Straightforward',
    slug: 'monogatari-series-refuses-to-be-anything-straightforward',
    category: 'light-novels',
    excerpt: 'Nisio Isin\'s Monogatari series began in 2006 and has extended across twenty-plus installments. Shaft\'s adaptation is among the most stylistically distinctive anime of its decade. Here\'s what the series is actually doing.',
    content: `Nisio Isin began publishing the Monogatari series with "Bakemonogatari" in 2006, and the series has continued through more than twenty installments across multiple narrative arcs. The anime adaptation by Shaft â€” beginning with "Bakemonogatari" in 2009, directed by Akiyuki Shinbo â€” became one of the most stylistically distinctive anime of its decade, generating sustained critical engagement and an international fanbase unusual for a series whose narrative complexity and visual density make it genuinely difficult to watch casually.

The series follows Koyomi Araragi, a high school student who survived a vampire encounter and retained partial vampiric regeneration, as he becomes involved in the supernatural afflictions affecting people around him. Each arc centers on a different character, their psychological problem, and the supernatural manifestation of that problem. Hitagi Senjogahara's weightlessness â€” the inability to feel that she exists in space â€” manifests her trauma from a cult encounter; Mayoi Hachikuji's wandering spirit manifests her inability to reach a destination she doesn't want to reach. The pattern is consistent, making the series function as an anthology of character psychology rather than a conventional narrative.

Shaft's adaptation style â€” flash cuts to black frames with text, unusual angles, limited animation used deliberately rather than as budget compromise, architecturally impossible spaces â€” became so associated with Nisio Isin's dialogue-heavy source material that distinguishing what belongs to the novels and what belongs to Shinbo and Shaft requires familiarity with both. Nisio Isin's prose is itself formally unusual: extended dialogue sequences that are as much about the pleasure of verbal exchange as about information transmitted, conversations that circle their subjects through oblique approaches rather than direct statement.

The series' relationship with its female characters has generated sustained critical discussion. The camera's treatment of Senjogahara, Hanekawa, Shinobu, and the other central women is frequently intimate in ways that generate discomfort alongside the genuine psychological depth with which each is depicted. Nisio Isin has engaged with this tension explicitly within the text â€” certain later installments contain passages in which the narrative's relationship to its own objectification is questioned from within â€” which is a more sophisticated engagement than most series attempt, while not being a resolution of it. The discomfort and the depth coexist.

The Monogatari series' longevity â€” still producing new installments after nearly twenty years â€” reflects a readership that has remained genuinely interested in Nisio Isin's ongoing exploration of characters followed across that time. The later arcs' reward of long-term readers, who can follow the emotional development of characters first encountered a decade earlier, is the specific satisfaction that extended serialization enables and condensed media cannot replicate.`,
    tags: ['Monogatari', 'Nisio Isin', 'Shaft', 'Bakemonogatari', 'light novels', 'anime aesthetics'],
    entities: ['Nisio Isin', 'Shaft', 'Akiyuki Shinbo'],
    publishedAt: new Date('2026-01-13'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/monogatari-series-refuses-to-be-anything-straightforward',
  },
  {
    title: 'Sword Art Online: The Series That Changed What Isekai Was',
    slug: 'sword-art-online-series-changed-what-isekai-was',
    category: 'light-novels',
    excerpt: 'Sword Art Online became the biggest anime of 2012 and one of the most polarizing franchises in the medium. Here\'s an honest account of what it did well, where it failed, and what it changed.',
    content: `Reki Kawahara began writing "Sword Art Online" as a web novel in 2002, published as a light novel from 2009 and adapted into anime by A-1 Pictures in 2012. The series became the biggest anime of its year and one of the most polarizing franchises in the medium's recent history. The intensity of both SAO's defense and its criticism reflects a series that made choices consequential enough to generate actual disagreement about what those choices mean.

The premise â€” players of a virtual reality MMORPG are trapped inside the game by its creator, with death in the game resulting in death in reality â€” is one of the most immediately compelling in the genre. The Aincrad arc's survival stakes, combined with Kirito's positioning as a solo player navigating a world where cooperation is necessary and trust is dangerous, created narrative tension in its best moments. The relationship between Kirito and Asuna, developed as a partnership between two capable people who find each other by finding themselves in similar circumstances, was the anime's emotional center.

The criticisms are real. The Alfheim Online arc, which follows Aincrad, introduced a storyline involving Asuna's kidnapping and sexual threat that reduced her from the series' strongest character to a passive object of rescue â€” a tonal regression that many viewers experienced as a betrayal of what had been established. The subsequent arcs' management of Kirito's relationship with an expanding cast of devoted women, combined with narrative tendencies toward solutions centered on Kirito's individual ability, generated the criticism that the series mistakes wish-fulfillment for characterization. The criticism is not wrong. It is also not the complete account.

What SAO did for the isekai genre was practical as much as artistic. Its commercial success demonstrated to publishers and studios that light novel adaptations set in game-world-adjacent fantasy settings were broadly appealing to the demographic that streaming platforms were building their anime libraries around. The dozens of isekai anime that followed â€” including many that made the "trapped in a game" premise their explicit point of departure â€” are commercially connected to SAO's breakthrough. This is not entirely a recommendation, since some of what SAO demonstrated the market would bear was the combination of game-world setting and male-gaze characterization that the post-SAO wave reproduced with varying degrees of self-awareness.

The series has continued through the Alicization arc and beyond. Kirito's incapacitation for a significant stretch of Alicization forces the narrative to develop other characters, particularly Alice, in ways that partially address earlier criticisms. The series remains interesting precisely because the gap between its best moments and its worst is wide enough that both its defenders and critics are responding to something real.`,
    tags: ['Sword Art Online', 'Reki Kawahara', 'A-1 Pictures', 'isekai', 'light novels', 'game anime'],
    entities: ['Reki Kawahara', 'A-1 Pictures'],
    publishedAt: new Date('2026-01-15'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/sword-art-online-series-changed-what-isekai-was',
  },
  {
    title: 'Vagabond: Takehiko Inoue\'s Unfinished Samurai Masterpiece',
    slug: 'vagabond-takehiko-inoue-unfinished-samurai-masterpiece',
    category: 'manga',
    excerpt: 'Takehiko Inoue has been unable to finish Vagabond since 2015. The thirty-seven existing volumes are among the finest manga ever drawn. Here\'s what the series is, why the hiatus happened, and whether you should read something that may never be completed.',
    content: `Takehiko Inoue began serializing "Vagabond" in Weekly Morning in 1998, adapting Eiji Yoshikawa's historical novel "Musashi" about the legendary swordsman Miyamoto Musashi. The series is currently on indefinite hiatus, with the most recent chapter published in 2015. Inoue has given occasional interviews indicating that he intends to continue but cannot determine how â€” that the series is not abandoned but that its conclusion remains beyond what he can currently execute. The hiatus has become one of manga's most discussed absences: a work of extraordinary quality that cannot be finished by the artist who began it, for reasons the artist himself has not fully explained.

The visual achievement of "Vagabond" is the first thing most readers encounter. Inoue draws with actual sumi-e ink brushes rather than standard manga pen nibs, and his splash pages have a painterly quality rare in the medium, producing an atmospheric specificity calibrated to the historical period and the philosophical weight of the story. The swordfight sequences manage to convey speed and violence while maintaining the spatial clarity that choreography requires; the still moments between violence have a compositional deliberateness that gives the violence its proper weight by contrast.

The narrative Inoue constructs around the historical record is one of manga's most serious engagements with the question of what a life of martial pursuit means. Musashi begins the series as a brutal young man seeking to become the strongest swordsman in Japan, and the series follows his gradual recognition that strength â€” the thing he has organized his identity around â€” is not sufficient to the life he is actually living. His encounters with Sasaki Kojiro, who was historically deaf and whose experience is rendered with both care and invention, and with the monk Takuan, whose interventions reframe Musashi's martial drive in Buddhist terms, develop the series' central philosophical content across thirty-seven volumes.

The hiatus generates a specific reader relationship that few ongoing series create. Readers who have followed "Vagabond" for over twenty years have processed their relationship to its incompleteness in ways that vary: some maintain patient expectation, some have mourned it as effectively finished, some return to the existing volumes periodically as a completed object rather than a waiting serialization. Inoue has framed his inability to continue as a creative crisis â€” he is not unable to draw (his basketball manga "Real" continues) but unable to determine what Musashi's story means at the level of resolution.

The honest answer to "should you read Vagabond?" is yes, with the understanding that you are reading something incomplete. The thirty-seven existing volumes are not a fragment but a substantial, deeply realized portion of a larger work, complete enough in its local effects â€” chapter by chapter, arc by arc â€” to justify engagement on its own terms.`,
    tags: ['Vagabond', 'Takehiko Inoue', 'samurai manga', 'Weekly Morning', 'manga hiatus', 'Miyamoto Musashi'],
    entities: ['Takehiko Inoue', 'Eiji Yoshikawa'],
    publishedAt: new Date('2026-01-17'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/vagabond-takehiko-inoue-unfinished-samurai-masterpiece',
  },
  {
    title: 'Samurai Champloo: Shinichiro Watanabe\'s Other Masterpiece',
    slug: 'samurai-champloo-shinichiro-watanabe-other-masterpiece',
    category: 'anime',
    excerpt: 'Samurai Champloo aired in 2004, five years after Cowboy Bebop ended. Where Bebop used jazz, Champloo used hip-hop â€” an anachronistic imposition on Edo-period Japan that turned out to be exactly the right choice.',
    content: `"Samurai Champloo," directed by Shinichiro Watanabe and produced by Manglobe, aired in 2004 â€” five years after "Cowboy Bebop." Where Bebop had used jazz as its musical and emotional foundation, Champloo used hip-hop: its anachronistic soundtrack by composers Nujabes, Fat Jon, and Tsutchie imposed contemporary beats on Edo-period Japan in a way that was initially jarring and quickly revealed itself as the series' central aesthetic argument. The anachronism is the point. Samurai Champloo is not a series that takes place in the Edo period and happens to have a hip-hop soundtrack; it is a series about the way that aesthetic forms from different historical moments can be combined to make something that belongs to neither.

The three central characters â€” Mugen, an Okinawan fighter whose swordsmanship is derived from breakdancing; Jin, a classically trained ronin of exceptional ability; and Fuu, a teenage girl searching for a samurai who smells of sunflowers â€” are kept together by a promise made in the first episode. The episodic structure uses their journey as a frame for largely standalone stories set in Edo-period Japan's social margins: the criminal underworld, its internal politics, its contact with Christianity and Western influence, and its social hierarchies.

The fight choreography is the series' most technically accomplished element. Mugen's style â€” a fictional martial art combining breakdancing footwork with improvised striking from any body position â€” required animators to solve the problem of depicting movement for which no reference material existed. The solution was to study actual breakdancing extensively and build Mugen's combat vocabulary from that study, producing a fight style that feels internally consistent rather than arbitrarily unusual. Jin's classical style, precise and minimal, serves as the visual counterpoint â€” two swordsmen whose opposite aesthetics define them as characters as much as their personalities do.

Nujabes's contribution cannot be discussed without acknowledging his death in 2010 in a traffic accident at 36. His music for "Samurai Champloo" â€” meditative beats combining jazz samples with hip-hop production â€” achieved a quality that no subsequent release in the genre has quite matched, and the series cannot be separated from it. The opening theme "Battlecry," the ending "Fly," and the introspective tracks accompanying the series' quieter moments constitute an audioscape of a specific emotional register.

The series' ending achieves something difficult: it gives three characters whose relationship has been defined by episodic wandering and mutual antagonism a conclusion that honors what that relationship actually was without converting it into something it wasn't. They do not travel together because they love each other; they travel together because circumstances made it necessary, and what develops across twenty-six episodes is not love but something more specific and more resistant to naming. The ending respects that specificity, and it is the right ending.`,
    tags: ['Samurai Champloo', 'Shinichiro Watanabe', 'Manglobe', 'Nujabes', 'hip-hop anime', 'anime 2004'],
    entities: ['Shinichiro Watanabe', 'Manglobe', 'Nujabes'],
    publishedAt: new Date('2026-01-19'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/samurai-champloo-shinichiro-watanabe-other-masterpiece',
  },
  {
    title: 'Comiket and the Doujinshi Tradition: Japan\'s Self-Publishing Culture',
    slug: 'comiket-doujinshi-tradition-japans-self-publishing-culture',
    category: 'industry',
    excerpt: 'Comiket draws over 700,000 attendees and hosts 35,000 circles selling self-published work. Much of it is fan-made derivative content operating in a legal gray area the entertainment industry has tacitly permitted for fifty years. Here\'s why.',
    content: `Comiket â€” the Comic Market â€” is held twice annually in Tokyo at the Tokyo Big Sight convention center. Since its founding in 1975, it has grown from a gathering of 32 circles selling self-published works to an event drawing over 700,000 attendees across three days and hosting approximately 35,000 participating circles. It is the world's largest self-publishing event. The commerce it hosts is technically and legally complicated â€” much of what is sold is fan-made derivative work based on commercial intellectual properties, occupying a legal gray area that the Japanese entertainment industry has tacitly permitted to exist for fifty years because the ecosystem it enables is understood to benefit the industry more than strict copyright enforcement would.

The doujinshi â€” the self-published work, typically manga but also novels, illustration collections, games, and music â€” is a format older than Comiket itself. Self-published manga circulated in Japan from at least the 1950s, and the tradition of amateur manga clubs in Japanese universities developed a generation of creators who would go on to professional careers. What Comiket provided was infrastructure: a biannual marketplace with reliable attendance, a distribution system for circles that could not maintain regular publishing schedules, and a social context in which amateur creators could connect with each other and with readers interested in what they were doing.

The relationship between doujinshi and professional manga is more continuous than the amateur/professional distinction suggests. Many of Japan's most commercially successful mangaka began as doujinshi creators â€” CLAMP began as a doujinshi circle. Masashi Kishimoto and Eiichiro Oda both have documented relationships with the amateur manga community. The path from doujinshi to professional serialization is well-established, and editors at major publishers attend Comiket specifically to identify promising creators. Doujinshi is not the amateur alternative to professional manga; it is one of professional manga's primary recruitment pipelines.

The specific content Comiket is most known for internationally â€” doujinshi depicting commercial property characters in scenarios they do not appear in professionally â€” generates the most complex part of the legal discussion. Publishers and rights-holders have generally maintained a policy of non-enforcement regarding doujinshi that do not directly compete with the commercial property, that are sold at limited scale in specific venues, and that are clearly marked as unofficial. This tolerance has been consistent enough for fifty years that the doujinshi community operates within it as a stable environment. The reasons are partly practical (enforcement costs would outweigh any benefit), partly cultural (the tradition predates current copyright norms), and partly commercial (fan engagement is economically valuable to the properties it derives from).

Comiket's physical existence â€” the specific experience of attending an event of that scale, queueing for circles whose works sell out in minutes â€” is a cultural institution with no direct equivalent outside Japan. Its combination of commercial activity, fan community, and creative production represents a specifically Japanese organization of the relationship between professional entertainment and its audience.`,
    tags: ['Comiket', 'doujinshi', 'Comic Market', 'fan culture', 'manga self-publishing', 'anime industry'],
    entities: ['Japan'],
    publishedAt: new Date('2026-01-21'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/comiket-doujinshi-tradition-japans-self-publishing-culture',
  },
  {
    title: 'K-On! and the Invention of CGDCT',
    slug: 'k-on-invention-cgdct-cute-girls-doing-cute-things',
    category: 'anime',
    excerpt: 'K-On! follows four high school girls in a light music club with no central conflict and no dramatic stakes. It is the purest example of what CGDCT â€” Cute Girls Doing Cute Things â€” looks like when it\'s done right.',
    content: `"K-On!" by Kakifly began as a manga in Manga Time Kirara in 2007 and was adapted into anime by Kyoto Animation in 2009, with a second season in 2010 and a theatrical film in 2011. The series follows four high school girls who form a light music club: Yui, who has never played an instrument; Ritsu, the drummer; Mio, the bassist with stage fright; and Tsumugi, the keyboardist from a wealthy family. The series has no central conflict, no significant dramatic stakes, and no transformation arc â€” its subject is the pleasure of small groups of friends doing things they enjoy together, and its achievement is making that subject sufficient for two seasons and a feature film.

The genre label "CGDCT" â€” Cute Girls Doing Cute Things â€” emerged partly in response to K-On! and the works that followed its model. The label is sometimes used dismissively, as shorthand for anime without plot or substance, and sometimes used precisely, as a description of a genre that privileges the texture of daily life and character interaction over event-driven narrative. K-On! is the clearest example at its best, and examining what it actually does reveals why "no plot" is not the same as "no content."

The emotional content of K-On! is structured around small moments: the way Yui's relationship with her guitar develops in parallel with her eating habits, the way Mio's stage fright functions as a recurring character expression rather than a problem to be solved, the way the club room becomes a space whose warmth is produced by accumulation rather than by any single event. KyoAni's visual realization â€” the specific quality of afternoon light in the club room, the care in depicting instruments being played correctly, the attention to characters' faces during musical performance â€” gave the small-scale content a visual richness that communicated without stating: this place and these people are worth attending to.

The second season's finale and the theatrical film both use the knowledge of ending â€” the girls' final year of high school â€” to generate a form of anticipatory grief that accumulates across the season and releases with an effectiveness that the series' deliberately un-dramatic approach makes possible rather than impossible. Because nothing dramatic has been building, the loss of the ordinary is the loss that hits hardest. The finale works because the series spent two seasons establishing that the ordinary is what matters.

The influence of K-On! on subsequent anime is visible in the genre's commercial viability, in KyoAni's subsequent productions, and in the ambient standard for how moe aesthetics and daily-life content could be combined at high production quality. "Laid-Back Camp," "Is the Order a Rabbit?" and many others operate in the space that K-On! established as viable. The specific warmth of those series traces back to a four-girl light music club that doesn't need to be threatened to be worth saving.`,
    tags: ['K-On!', 'Kyoto Animation', 'CGDCT', 'moe anime', 'slice of life', 'music anime'],
    entities: ['Kyoto Animation'],
    publishedAt: new Date('2026-01-23'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/k-on-invention-cgdct-cute-girls-doing-cute-things',
  },
  {
    title: 'Evangelion\'s Rebuild: What Anno Was Trying to Say the Second Time',
    slug: 'evangelion-rebuild-what-anno-was-trying-to-say',
    category: 'anime',
    excerpt: 'The Rebuild of Evangelion tetralogy began in 2007 as an apparent retelling with better production values and concluded in 2021 as something considerably stranger â€” a film series that used the language of its own origins to say something about its creator\'s relationship to those origins.',
    content: `The "Rebuild of Evangelion" tetralogy â€” four theatrical films released in 2007, 2009, 2012, and 2021 â€” began as what appeared to be a retelling of "Neon Genesis Evangelion" with improved production values and concluded as something considerably stranger: a film series that used the language of its own origins to say something about its creator's relationship to those origins. "Evangelion: 3.0+1.0 Thrice Upon a Time," the fourth film, released fourteen years after the first, is one of the most explicitly self-analytical works in animation history.

The first two films â€” "1.0: You Are (Not) Alone" and "2.0: You Can (Not) Advance" â€” function primarily as accessible remakes of the original series' early arcs. The production values are significantly improved; the character relationships are compressed and clarified; and "2.0" introduces new elements â€” particularly the character Mari and the "Beast Mode" Eva activation â€” suggesting the story is developing away from the original series. "2.0"'s ending, in which Shinji triggers a near-Third Impact in an attempt to save Rei, is more emotionally direct than the equivalent moment in the series: Shinji acts from love rather than confusion, which changes the moral weight of what he causes.

"3.0: You Can (Not) Redo" abandoned the remake framework entirely and placed viewers in a world where 14 years had passed since Shinji triggered the near-Third Impact, where everyone who survived blames Shinji for it, and where the familiar emotional supports â€” Misato's mentorship, Rei's mysterious affection, NERV as an institution â€” have been radically altered or destroyed. The film was polarizing: many viewers experienced it as a deliberate cruelty toward both Shinji and the audience. Anno later described the film as a reflection of his mental state during production, which had been difficult. The film's refusal to be kind to its audience is consistent with the original series' relationship to its audience, but viewers who had waited three years experienced it as withholding rather than confrontation.

"3.0+1.0" synthesizes what the previous films established into a resolution that is simultaneously a narrative conclusion and an authorial statement. Shinji's gradual recovery, his relationship with a community in the rebuilt world, and the final sequence in which he writes the Eva â€” and by extension the franchise â€” out of existence are all readable as Anno's working-through of his relationship with the series and its audience. The finale's shift to live-action footage, its positioning of the adult voice cast in real-world settings, and Shinji's statement that he no longer needs the Eva are a direct address: the series is finished because its creator has said what he needed to say through it and is choosing to leave it behind.

Whether the choice feels earned depends on how much you have invested in the journey to that point, and on whether you believe Anno's self-analysis is as complete as the film's conclusion implies.`,
    tags: ['Evangelion Rebuild', 'Hideaki Anno', 'Neon Genesis Evangelion', 'Khara', 'anime film', 'Anno self-analysis'],
    entities: ['Hideaki Anno', 'Khara'],
    publishedAt: new Date('2026-01-25'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/evangelion-rebuild-what-anno-was-trying-to-say',
  },
  {
    title: 'Tokyo Ghoul: How a Promising Manga Lost Its Way',
    slug: 'tokyo-ghoul-promising-manga-lost-its-way',
    category: 'manga',
    excerpt: 'Tokyo Ghoul\'s first series was one of the most genuinely impressive manga premises of its decade. Its sequel, Tokyo Ghoul:re, demonstrated the specific form of deterioration that affects long-running dark manga when the premise is exhausted before the commercial interest is.',
    content: `Sui Ishida began serializing "Tokyo Ghoul" in Weekly Young Jump in September 2011. The first series â€” 143 chapters across fourteen volumes, ending September 2014 â€” was one of the most genuinely impressive manga premises of its decade: a world in which ghouls appear human but must consume human flesh to survive, followed by Ken Kaneki, a college student who undergoes a partial ghoul transformation after a botched murder attempt. The premise generated immediate narrative tension, placing Kaneki between two worlds both trying to use or destroy him. Ishida developed it with a visual style â€” heavily influenced by painting and illustration traditions outside manga conventions â€” that gave the horror content an aesthetic credibility unusual in mainstream serialization.

The first series' best qualities were its specificity and willingness to follow its premise honestly. The Aogiri Tree arc, in which Kaneki is captured and tortured for ten days, generated the series' most discussed sequence: Kaneki's psychological break, his identity inversion from passive to aggressive, and the iconic image of him cracking his fingers â€” a gesture adopted from his torturer â€” which became one of manga's most replicated visual moments. Ishida's decision to have Kaneki not be rescued but to escape by becoming someone different â€” someone who had broken and rebuilt themselves around violence â€” was a serious narrative choice that subsequent material did not fully honor.

"Tokyo Ghoul:re," the sequel beginning in 2014, followed Haise Sasaki, an amnesiac ghoul investigator, in a narrative that gradually revealed its relationship to Kaneki's story. The early volumes of :re demonstrated that Ishida could sustain quality across multiple arcs; the later volumes demonstrated the specific form of deterioration that affects long-running dark manga when the emotional logic of the premise is exhausted before the publisher's commercial interest is. The later arcs introduced power scaling and factional conflict at a scale the series' psychological foundation could not support, and the final arc's management of its revelations and character deaths generated widespread reader disappointment. Ishida has been candid in subsequent interviews about his struggle with the material and the conditions of its production.

The anime adaptation history compounds the pattern. The 2014 first season, produced by Studio Pierrot, was praised within the constraints of a 12-episode format. The Root A second season, diverging from the manga, satisfied neither manga readers nor anime-only viewers. The :re adaptation suffered from compression that turned complex character material into incoherence. The pattern â€” quality declining under commercial pressure, adaptation choices that served schedules over storytelling â€” is common enough to be unremarkable, but its effect on a series whose first arc was so strong makes the contrast particularly clear.

What remains is the first series: 143 chapters of serious, visually ambitious dark fantasy that holds its premise with more integrity than most manga manages across comparable length. Reading it as a complete object â€” treating the sequel as optional â€” is the approach most likely to leave the reader with the experience the material's best qualities deserve.`,
    tags: ['Tokyo Ghoul', 'Sui Ishida', 'Weekly Young Jump', 'dark manga', 'Studio Pierrot', 'manga 2010s'],
    entities: ['Sui Ishida', 'Studio Pierrot'],
    publishedAt: new Date('2026-01-27'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/tokyo-ghoul-promising-manga-lost-its-way',
  },
  {
    title: 'Sound! Euphonium: Kyoto Animation\'s Other Masterpiece',
    slug: 'sound-euphonium-kyoani-other-masterpiece',
    category: 'anime',
    excerpt: 'Sound! Euphonium applies the structures of competitive sports anime to orchestral band music. Its three seasons, completed in 2024, represent one of the most fully realized character arcs in recent anime â€” and the third season carries weight beyond its narrative.',
    content: `"Sound! Euphonium," adapted by Kyoto Animation from Ayano Takeda's light novel series, aired its first season in 2015, its second in 2016, and its third in 2024. The series follows Kumiko Oumae, a first-year high school student who joins her school's concert band hoping to reach the national competition, and tracks the band's development across three competitive years. As a premise, it is a sports anime about music â€” the structures of competitive sport applied to orchestral band preparation and performance â€” and its achievement is executing that premise with a human seriousness that the genre rarely attempts.

The series' central emotional engine in its first two seasons is Kumiko's relationship with Reina Kousaka, a trumpet player whose dedication to excellence is absolute and whose private, intense personality is in productive tension with Kumiko's more observational and socially adaptive nature. The scenes between Kumiko and Reina â€” particularly the sequence in the first season where they climb a mountain at night and Reina performs on the peak â€” became among the most discussed in KyoAni's recent catalogue, both for their visual beauty and for the emotional register they established: a closeness depicted with enough specificity to feel real without resolving the question of what it means.

The management of ensemble conflict is the series' structural achievement. Band dynamics â€” who receives the solo, how the first chair is assigned, what happens when talent and effort and seniority conflict â€” are handled with a psychological accuracy that makes the stakes feel adult rather than schematic. The "Natsuki and Yuuko" subplot in the first season, in which a third-year's graceful response to being displaced by a more talented second-year becomes a model for how adults absorb disappointment, is executed with the restraint of a series that trusts its audience to feel the weight of an understated scene.

The third season's 2024 arrival â€” eight years after the second season, produced by a studio that had survived the 2019 arson attack that killed 36 staff members â€” carried emotional weight beyond its narrative content. Watching KyoAni complete the adaptation of a series they had committed to before the attack, with the studio's characteristic visual craft maintained, is an experience that cannot be separated from knowledge of what it cost to still be there to do it. The third season is also the strongest of the three: Kumiko's development from a slightly passive observer of others' conflicts to someone willing to occupy leadership and make difficult decisions is one of the most satisfying character trajectories in recent anime.

The series as a complete work is a major achievement, and one that required a studio's survival to exist.`,
    tags: ['Sound! Euphonium', 'Ayano Takeda', 'Kyoto Animation', 'music anime', 'band anime', 'anime 2024'],
    entities: ['Ayano Takeda', 'Kyoto Animation'],
    publishedAt: new Date('2026-01-29'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/sound-euphonium-kyoani-other-masterpiece',
  },
  {
    title: 'Erased: The Thriller That Nailed Its First Half',
    slug: 'erased-thriller-that-nailed-its-first-half',
    category: 'manga',
    excerpt: 'Erased opens with one of the most economical premise constructions in manga: adult consciousness, childhood second chance, unsolved murders, and a ticking clock. The first half delivers on all of it. The second half is more complicated.',
    content: `"Erased" ("Boku dake ga Inai Machi") by Kei Sanbe serialized in Monthly Big Comic Spirits from 2012 to 2016 and was adapted into anime by A-1 Pictures in 2016. The premise: Satoru Fujinuma, a struggling manga artist with the ability to involuntarily travel back in time by minutes before accidents occur, is sent back eighteen years after being framed for his mother's murder â€” to his own childhood in 1988, when a series of child abductions took place. Satoru uses the second chance to prevent the abductions and identify the killer, knowing that solving the crime in the past will affect the circumstances of his present.

The convergence of mechanisms is economical: the time travel, the unsolved crimes, the adult consciousness in a child's body, the friendships developed with children at risk â€” all serve each other rather than competing for narrative space. The first half maintains suspense and emotional investment simultaneously. Kayo Hinazuki â€” the first intended victim, an abused child who has learned not to expect kindness â€” is rendered with specific detail, and her relationship with Satoru, who knows she will die if he fails, develops the series' most affecting material.

The killer's identity is revealed at the series' midpoint, and the challenge of the second half is sustaining tension when the mystery's solution is known. The approach is to shift from identification to confrontation: Satoru knows who the killer is, the killer knows Satoru knows, and the question becomes whether Satoru can expose the killer before being eliminated. This shift works intermittently â€” the confrontation structure is less intrinsically compelling than the mystery structure, and the killer's psychology, developed in the second half, is somewhat schematic compared to the victim characterizations that made the first half strong.

The A-1 Pictures anime adaptation compressed the manga's timeline into 12 episodes with some success, but the adaptation choice generating the most discussion was the ending: the anime's final episode diverges from the manga in ways that affect the resolution of Satoru's central relationship. Manga readers found the anime's ending rushed and emotionally less complete; anime-only viewers generally found it satisfying. The divergence is instructive: the manga takes more time with Satoru's recovery and the consequences of his repeated time displacement, while the anime prioritizes closure. Both are coherent choices.

Sanbe has described the series' autobiographical dimension: his own experiences with childhood social isolation and adult professional struggle informed Satoru's character, and the series' treatment of what it means to have a second chance at a moment you failed â€” to be able, just once, to do for someone what no one did for you â€” draws from personal material in ways that readers who have experienced similar feelings recognize.`,
    tags: ['Erased', 'Boku dake ga Inai Machi', 'Kei Sanbe', 'A-1 Pictures', 'manga thriller', 'time travel manga'],
    entities: ['Kei Sanbe', 'A-1 Pictures'],
    publishedAt: new Date('2026-01-31'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/erased-thriller-that-nailed-its-first-half',
  },
  {
    title: 'Black Lagoon: The Action Anime Built for Adults',
    slug: 'black-lagoon-action-anime-built-for-adults',
    category: 'manga',
    excerpt: 'Black Lagoon does not soften its violence, does not moralize about its characters\' criminal activities, and does not organize its plot around the protagonist\'s eventual choice to do the right thing. It is one of action manga\'s most adult achievements.',
    content: `Rei Hiroe began serializing "Black Lagoon" in Monthly Sunday Gene-X in 2002, and the series has continued â€” with irregular publication pace â€” since then. The anime adaptation by Madhouse aired in 2006 and produced two seasons and an OVA. The series follows Rokuro "Rock" Okajima, a Japanese salaryman taken hostage by pirates who chooses to join his captors rather than return to the corporate life that abandoned him, as he navigates the criminal underworld of the fictional Southeast Asian port city of Roanapur.

The series' most immediately distinctive quality is its adult register. "Black Lagoon" does not soften its depictions of violence, does not moralize about the criminal activities of its characters, and does not construct the plot around Rock's eventual choice to do the right thing. The characters operate in a world with functional moral rules â€” contracts are honored, certain actions are recognized as catastrophic even by criminal standards, professional reputation matters â€” but these are not the moral framework of a society that extends protections to the people in Roanapur. The series is not nihilistic but is consistently honest about the specific social world it is depicting.

Revy, Rock's primary partner, is one of the more distinctive female characters in action manga. Her backstory â€” disclosed in the second season â€” is the kind of background that action series sometimes use to explain female violence through victimization, but Hiroe is careful to present it as context rather than cause, and to develop Revy's present-day character as someone who has built her own identity around violence as a functional strategy rather than as psychological damage awaiting healing. The distinction matters: Revy is not a broken person waiting to be repaired by Rock's presence, and the series is not organized around that possibility.

The antagonists are consistently the series' strongest element. The Lagoon Company's adversaries â€” the Rip-Off Church, the Washimine group, the various criminal organizations inhabiting Roanapur â€” are characterized with enough specificity that they feel like participants in a world rather than obstacles. The "Roberta's Blood Trail" OVA, introducing a former FARC soldier turned maid who becomes a one-woman army of revenge, is the series' most ambitious extended narrative and most clearly demonstrates what "Black Lagoon" can do when its character work sustains rather than interrupts its action sequences.

Hiroe's publication pace has been extremely irregular in recent years, and the series has experienced hiatuses that generated periodic uncertainty about whether it would continue. It has continued. The existing material represents one of action manga's most adult achievements: a series that treats its genre framework as the setting for an honest examination of what people become when they live entirely outside the structures most people take for granted.`,
    tags: ['Black Lagoon', 'Rei Hiroe', 'Madhouse', 'action manga', 'seinen manga', 'crime anime'],
    entities: ['Rei Hiroe', 'Madhouse'],
    publishedAt: new Date('2026-02-02'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/black-lagoon-action-anime-built-for-adults',
  },
  {
    title: 'Ping Pong the Animation: A Sports Anime That Isn\'t About Sports',
    slug: 'ping-pong-animation-sports-anime-not-about-sports',
    category: 'anime',
    excerpt: 'Ping Pong the Animation, directed by Masaaki Yuasa from a manga by Taiyou Matsumoto, is eleven episodes and one of the most fully realized single-season anime in the medium\'s history. The sport is a container for a question about why human beings devote themselves to excellence.',
    content: `"Ping Pong the Animation," directed by Masaaki Yuasa from a manga by Taiyou Matsumoto, aired in 2014 as an eleven-episode adaptation of the five-volume manga Matsumoto serialized in 1996. The anime had a production history that included rights complications spanning nearly twenty years between the manga's publication and its adaptation, and its final form â€” visually distinctive, emotionally precise, structured around ping pong as a philosophical framework rather than a competitive one â€” is one of the most fully realized single-season anime in the medium's history.

The visual style is the first thing most viewers confront. Yuasa's aesthetic â€” angular character designs, bold linework, deliberate use of minimal backgrounds, exaggerated physical expression â€” is built directly from Matsumoto's manga source, which was itself unusually abstract in its visual language for a sports series. The match sequences use this visual freedom to depict the subjective experience of high-level athletic performance: time distortions, spatial abstractions, the specific visual field of focused attention during competition. The approach captures something the realistic approach cannot â€” the phenomenology of being inside the movement rather than watching it from outside.

The series follows two childhood friends â€” Peco, who is naturally talented and treats ping pong as play, and Smile, who is technically superior but emotionally disengaged from competition â€” through a tournament arc whose results are less important than what the competition reveals about each character's relationship to the sport and to themselves. The other competitors are characterized with comparable depth: Wenge Kong, a Chinese player exiled from his national team who has reduced himself to a technical instrument; Sanwa's Dragon, a dominating player whose perfection is inseparable from his alienation; Sakuma, whose talent peaked in middle school and who plays competitively into his limitations. Each embodies a different relationship to excellence and loss.

The series' emotional climax does not arrive through athletic victory. What Peco and Smile are trying to find â€” what ping pong is being used to find â€” is a way of being alive that is self-determined rather than defined by the expectations of talent, obligation, or fear of failure. Yuasa and Matsumoto are interested in why any human being devotes themselves to becoming excellent at something, and what it costs and produces, and ping pong is simply the most honest and available container for that question in this particular story.

Eleven episodes. Matsumoto's five-volume manga adapted essentially complete. A production that took two decades to happen and was worth the wait. It is the sports anime to show someone who thinks they don't like sports anime.`,
    tags: ['Ping Pong the Animation', 'Masaaki Yuasa', 'Taiyou Matsumoto', 'sports anime', 'anime 2014', 'MAPPA'],
    entities: ['Masaaki Yuasa', 'Taiyou Matsumoto'],
    publishedAt: new Date('2026-02-04'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/ping-pong-animation-sports-anime-not-about-sports',
  },
  {
    title: 'The Big Three Era: What It Was Like to Watch Naruto, Bleach, and One Piece at the Same Time',
    slug: 'big-three-era-naruto-bleach-one-piece-simultaneously',
    category: 'industry',
    excerpt: 'Between roughly 2003 and 2010, three Jump manga were adapted simultaneously into year-round anime. For a generation of Western fans, following all three was standard practice. Here\'s what that era actually was and what it produced.',
    content: `Between approximately 2003 and 2010, three manga serialized in Weekly Shonen Jump were adapted simultaneously into anime that aired year-round with minimal hiatus: "Naruto" (manga 1999, anime 2002), "Bleach" (manga 2001, anime 2004), and "One Piece" (manga 1997, anime 1999). The period during which all three were actively producing new episodes lasted approximately seven years, and for an entire generation of anime viewers â€” particularly in Western markets where Toonami, Adult Swim, and early streaming ecosystems were building the infrastructure for anime's international expansion â€” following all three was a standard practice rather than a remarkable commitment. The "Big Three" label emerged from this practice and remains the most commonly used shorthand for a specific era of shonen anime fandom.

The practical experience of following all three simultaneously is difficult to convey to viewers who did not. Each series was a year-round commitment producing hundreds of episodes; each had its own community organized around weekly manga chapter releases and weekly or biweekly anime episodes; each was actively producing content for years without concluding. Following all three meant following stories that felt open-ended in a way that is structurally different from watching completed series â€” the uncertainty of ongoing serialization, the community speculation about long-term plot developments, the specific investment of waiting for the next chapter of a story that would not end for years, were constitutive elements of the experience.

The quality differentiation that subsequent critical perspective has introduced was less relevant during the period when all three were actively ongoing. All three had peaks and valleys â€” Naruto's Chunin Exams and the Pain arc; Bleach's Soul Society arc followed by the Hueco Mundo arc's extended stay; One Piece's Marineford arc â€” and these were experienced in real time rather than as portions of a complete work whose overall quality can be assessed. The tendency to declare one definitively better ("One Piece has remained consistent; Naruto had a good ending; Bleach collapsed") applies completed-work analysis to an experience that was not experienced as completed works.

What the Big Three era produced, beyond its narrative content, was a generation of Western anime fans for whom these three series were the primary site of engagement with the medium and whose relationship to anime was shaped by the specific practice of following multiple year-round series with weekly update cycles and large, active online communities. The infrastructure of contemporary anime fandom â€” the wiki culture, the episode discussion threads, the dedicated community spaces, the practices of following seasonal shows that replaced following year-round ones â€” developed partly in the context of this era and partly in reaction to it. Understanding the Big Three era as a cultural phenomenon rather than simply a collection of three long series is necessary for understanding the development of international anime fandom as a whole.`,
    tags: ['Big Three', 'Naruto', 'Bleach', 'One Piece', 'shonen anime', 'anime fandom history'],
    entities: ['Shueisha', 'Toonami'],
    publishedAt: new Date('2026-02-06'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/big-three-era-naruto-bleach-one-piece-simultaneously',
  },
  {
    title: 'The Magical Girl After Madoka: How One Anime Changed a Genre\'s DNA',
    slug: 'magical-girl-after-madoka-how-one-anime-changed-genres-dna',
    category: 'anime',
    excerpt: 'Puella Magi Madoka Magica premiered in January 2011 and its effects on the magical girl genre are now legible across a decade of subsequent production. Here\'s what it broke permanently, what it changed the terms of, and what it couldn\'t alter even when it tried.',
    content: `"Puella Magi Madoka Magica" premiered in January 2011 and concluded its television run in April of that year. The anime's effects on the magical girl genre it deconstructed are now legible across a decade of subsequent production, and examining those effects reveals something about how genre deconstruction works: what it breaks permanently, what it changes the terms of, and what it cannot alter even when it wants to.

The most direct effects are visible in magical girl anime produced in the years immediately following Madoka. "Day Break Illusion" (2013), "Yuki Yuna Is a Hero" (2014), and several other series incorporated the darker tonal possibilities that Madoka had demonstrated were viable without necessarily engaging with the structural argument that made Madoka's darkness meaningful. The result was a wave of magical girl anime with dark content that used suffering as aesthetic rather than as the foundation of genuine thematic investigation â€” the imitation of Madoka's surface without the philosophical framework the surface was serving. This is the standard risk of successful deconstruction: the deconstruction's formal moves become available for imitation before its actual argument is understood.

The more interesting effects appeared in productions that engaged with Madoka's argument directly. "Magical Girl Raising Project" (2016) and "Mahou Shoujo Site" (2018) pushed the dark magical girl premise into territory explicitly about the genre's relationship to violence against women â€” the ways in which the magical girl's typical story maps onto structures of exploitation that the original genre's cheerful packaging obscured. These series are not better than Madoka, but they demonstrate that it opened a critical space within the genre that serious creators could work in.

The production most directly engaged with Madoka's legacy is "Magical Girl Spec-Ops Asuka" (2019), whose premise â€” a former magical girl dealing with PTSD after surviving the war for which she was conscripted â€” makes the post-traumatic dimension of Madoka's ending explicit and develops it over a full series. The quality of the execution is uneven, but the directness of the engagement is notable: Asuka attempts to portray what happens to Madoka's girls after the conclusion.

The original genre has not disappeared. "Precure" â€” the franchise that is the backbone of children's magical girl anime â€” has continued producing series annually without registering significant influence from Madoka's argument, because Precure's audience is not Madoka's audience. The coexistence of the light and dark branches of the magical girl tradition in the decade after Madoka is itself the genre's most interesting feature: Madoka established that the genre could contain its darkest implications, and the genre's subsequent development has produced both serious engagements with those implications and cheerful series that never needed to engage with them. Both are legitimate, and both are the genre.`,
    tags: ['magical girl genre', 'Madoka Magica', 'Yuki Yuna', 'Precure', 'genre deconstruction', 'anime analysis'],
    entities: [],
    publishedAt: new Date('2026-02-08'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/magical-girl-after-madoka-how-one-anime-changed-genres-dna',
  },
];

async function main() {
  console.log(`Seeding ${ESSAYS.length} essays (batch 8)...`);
  let created = 0;
  let skipped = 0;

  for (const essay of ESSAYS) {
    const exists = await prisma.article.findUnique({ where: { slug: essay.slug } });
    if (exists) { skipped++; continue; }

    await prisma.article.create({
      data: {
        title: essay.title,
        slug: essay.slug,
        category: essay.category,
        excerpt: essay.excerpt,
        content: essay.content,        imageUrl: null,
        source: essay.source,
        sourceUrl: essay.sourceUrl,
        publishedAt: essay.publishedAt,
        published: true,        tags: essay.tags,
        entities: essay.entities,
        views: 0,
      },
    });
    created++;
    console.log(`  âœ“ ${essay.title}`);
  }

  console.log(`\nDone. Created: ${created}, Skipped (already exist): ${skipped}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

