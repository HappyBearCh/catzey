/**
 * Tenth batch of editorial essays.
 * Run with: npx tsx scripts/seed-essays-10.ts
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ESSAYS = [
  {
    title: 'Revolutionary Girl Utena: The Most Formally Ambitious Shoujo Anime',
    slug: 'revolutionary-girl-utena-most-formally-ambitious-shoujo-anime',
    category: 'anime',
    excerpt: 'Revolutionary Girl Utena aired in 1997 and used the structures of magical girl and fairy tale anime to conduct a formally sophisticated examination of gender, power, and the mechanisms by which people are imprisoned by the stories told about them. Its 1999 theatrical film remains one of the most formally ambitious sequences in anime history.',
    content: `"Revolutionary Girl Utena" directed by Kunihiko Ikuhara aired as a 39-episode television series in 1997, followed by the theatrical film "Adolescence of Utena" in 1999. The series follows Utena Tenjou, who has decided to become a prince â€” in the precise sense of the fairy tale archetype â€” and finds herself drawn into duels at Ohtori Academy in which the winner holds possession of the "Rose Bride," Anthy Himemiya, along with the power to "revolutionize the world." The series uses these structures to conduct a sustained examination of gender, power, and the specific mechanisms by which people are imprisoned by the stories told about them.

Ikuhara's visual style â€” developed at Toei on "Sailor Moon" before he left to pursue "Utena" independently â€” is unlike any other anime aesthetic. The repeated visual motifs: the upward spiral staircase, the rose seals, the castle in the sky, the dueling arena that descends from nowhere â€” are not decorative but structural, the same images accruing meaning through repetition until their symbolic function is dense with accumulated context. The shadow play sequences that interrupt narrative episodes â€” puppet shows that comment obliquely on the episode's events â€” introduce a formal disruption the series uses to signal the presence of its deeper mechanisms. "Utena" requires attention across its entire run to yield its full meaning; rewatching reveals imagery that was preparing later revelations from the first episodes.

The relationship between Utena and Anthy is the series' central subject. Anthy's function as the Rose Bride â€” the object to be won, the prize of the duels â€” is the series' most sustained engagement with how women are positioned as objects within the stories others tell about themselves. Utena's desire to rescue Anthy is sincere, but sincerity is not sufficient: the series is patient and unsentimental about demonstrating that noble motives operating within oppressive structures can reproduce those structures while believing themselves to be dismantling them. The resolution â€” what Utena's ultimate action actually achieves and what it costs â€” is one of anime's most carefully constructed endings.

The 1999 film retells the series' events in compressed and radically transformed form, using the theatrical context to pursue visual abstraction that television would not permit. Its final sequence â€” a visual transformation that deploys the series' accumulated symbolic vocabulary in a single extended image â€” is one of the most formally ambitious sequences in anime film history. Watching the series before the film is strongly recommended; watching the film alone misses what thirty-nine episodes were preparing.

Ikuhara's subsequent series â€” "Penguindrum" (2011) and "Yurikuma Arashi" (2015) â€” continued his formal approach in different contexts, confirming that "Utena"'s methods were not accidental but the expression of a distinctive directorial intelligence. "Utena" remains the fullest realization of that intelligence.`,
    tags: ['Revolutionary Girl Utena', 'Kunihiko Ikuhara', 'shoujo anime', 'J.C.Staff', 'anime 1997', 'gender anime'],
    entities: ['Kunihiko Ikuhara'],
    publishedAt: new Date('2026-03-18'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/revolutionary-girl-utena-most-formally-ambitious-shoujo-anime',
  },
  {
    title: '20th Century Boys: Urasawa\'s Other Epic',
    slug: '20th-century-boys-urasawa-other-epic',
    category: 'manga',
    excerpt: '20th Century Boys spans 26 volumes, three time periods, and a central mystery whose answer depends on everything the reader has been accumulating since volume one. It is Urasawa\'s most structurally ambitious work and his most demanding.',
    content: `"20th Century Boys" by Naoki Urasawa serialized in Big Comic Spirits from 1999 to 2006, with a short sequel "21st Century Boys" completing the story in 2007. The complete work spans 26 volumes. The series follows Kenji Endo, a convenience store owner who gradually realizes that a global cult threatening world destruction is carrying out a plan based on a childhood book of predictions he and his friends created in the 1960s. The mystery â€” who is the cult's leader, "Friend," and what is their true identity â€” drives the series across three decades of narrative time, from 1970s flashbacks to a near-future 2017 climax.

The structure is Urasawa's most ambitious. Three distinct time periods â€” the 1969â€“1971 childhood flashbacks, the 1997â€“2000 present, and a future 2015â€“2017 timeline â€” are managed simultaneously, and the relationships between them are the primary mechanism of mystery and revelation. The childhood flashbacks are the foundation: the series is interested in how children construct meaning and danger, how the games and stories of childhood persist in adult consciousness, and how the specific anxieties of a particular historical moment â€” Japan in 1969, shaped by that year's radicalism â€” produce particular adult pathologies. The Book of Prophecy that drives the plot is a children's story about the end of the world, and the series never stops being interested in what it means that a child imagined these specific catastrophes.

The cast management is extraordinary. Characters introduced as children return across decades, aged and changed, some dead and some transformed beyond recognition. The serial reader's accumulation of knowledge â€” who they were, what they wanted, what happened to them â€” is deployed against the reader in revelations that depend on that accumulated knowledge for their impact. Urasawa's management of long-term reader memory is, across his career, his most distinctive technical skill, and "20th Century Boys" uses it at the largest scale of any of his works.

The series' length and structural complexity are also its primary points of difficulty. The mystery sustains across 26 volumes through a combination of genuine plotting and deliberate obfuscation â€” some reveals are carefully prepared, others feel generated by the need to continue rather than resolved by structures laid earlier. The pacing in the later volumes is uneven in ways that "Monster"'s more contained scope avoided. These are real limitations.

What "20th Century Boys" achieves at its best â€” the management of an enormous cast across decades, the structural integration of childhood memory and adult consequence, the central mystery's deployment of everything the reader knows about who these people were as children â€” is available nowhere else in Urasawa's work at this scale.`,
    tags: ['20th Century Boys', 'Naoki Urasawa', 'Big Comic Spirits', 'manga mystery', 'manga 1990s', 'manga epic'],
    entities: ['Naoki Urasawa'],
    publishedAt: new Date('2026-03-20'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/20th-century-boys-urasawa-other-epic',
  },
  {
    title: 'Initial D: The Racing Manga That Shaped a Generation\'s Car Culture',
    slug: 'initial-d-racing-manga-shaped-car-culture',
    category: 'manga',
    excerpt: 'Initial D ran in Weekly Young Magazine from 1995 to 2013 and is the primary reason the Toyota AE86 became a globally sought-after collectors\' car. Its technical accuracy, Eurobeat soundtrack, and depiction of mountain road racing created an international car culture that did not exist before it.',
    content: `"Initial D" by Shuichi Shigeno serialized in Weekly Young Magazine from 1995 to 2013, producing 48 collected volumes. The series follows Takumi Fujiwara, a high school student who has spent four years making early-morning tofu deliveries in his father's Toyota AE86 on the mountain roads of Gunma Prefecture, developing extraordinary driving ability without knowing it. When the local street racing scene discovers what he can do, Takumi begins a career of increasingly high-stakes mountain racing against drivers who have trained deliberately for years. The series is a sports manga whose sport is illegal street racing, and it is the primary reason that the Toyota AE86 became one of the most culturally significant Japanese cars of the 20th century.

The technical content is genuinely detailed. Shigeno worked with automotive consultants to ensure the driving techniques depicted â€” heel-and-toe downshifting, the Scandinavian flick, oversteer management on narrow mountain roads â€” were accurate to real touge driving, and the series' depiction of how different cars and drivers interact with specific road conditions is specific enough that readers without driving experience learned actual automotive concepts through following the races. The cars in "Initial D" are treated as specific objects with specific characteristics â€” handling, power delivery, limitations â€” and the races are contests between different mechanical and human combinations rather than simply between drivers.

The cultural impact on car enthusiasm internationally was substantial. The Toyota AE86 Corolla â€” an inexpensive economy car by any objective measure â€” became a sought-after collectors' car in Japan, across Asia, and eventually globally, with its market value rising through the 1990s and 2000s as the generation that read "Initial D" entered adulthood and sought the car Takumi drove. The anime adaptations, whose Eurobeat soundtrack became a widely recognized cultural artifact decades after the original broadcasts, introduced the series to audiences who had not read the manga and generated a second-wave fandom with its own distinct cultural forms.

The series is not without limitations: the character development outside the racing context is minimal, the romantic subplot is underwritten, and the escalating performance of the cars eventually strains the technical realism in later volumes. But "Initial D"'s achievement within its specific scope â€” the translation of a technical discipline into a compelling serial narrative, the specific cultural influence on automotive enthusiasm, the creation of an aesthetic and emotional language for a form of competition that had previously existed without one â€” is substantial.`,
    tags: ['Initial D', 'Shuichi Shigeno', 'Weekly Young Magazine', 'racing manga', 'Toyota AE86', 'car culture'],
    entities: ['Shuichi Shigeno'],
    publishedAt: new Date('2026-03-22'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/initial-d-racing-manga-shaped-car-culture',
  },
  {
    title: 'Hajime no Ippo: The Boxing Manga That Never Stopped',
    slug: 'hajime-no-ippo-boxing-manga-never-stopped',
    category: 'manga',
    excerpt: 'Hajime no Ippo began in Weekly Shonen Magazine in 1989 and is still publishing â€” over 35 years, 1,400 chapters, and counting. It is the most comprehensive examination of boxing as sport and as human practice in manga history.',
    content: `"Hajime no Ippo" ("Fighting Spirit") by George Morikawa began serializing in Weekly Shonen Magazine in October 1989 and remains in publication â€” over 35 years, more than 1,400 chapters, and 140 collected volumes as of the mid-2020s. The series follows Makunouchi Ippo, a shy high school student who is bullied until he is rescued by professional boxer Mamoru Takamura, whose gym he joins. What begins as a story of a timid boy learning to stand up for himself develops, across decades of publication, into the most comprehensive examination of boxing as a sport and as a human practice in manga history.

The boxing content is the series' first and most consistent achievement. Morikawa researched boxing with a practitioner's depth, and the fights are technically detailed in ways that distinguish between styles, weight classes, ring strategies, and the physical and psychological demands that different fighting approaches place on different body types. Ippo's infighter style â€” overwhelming opponents at close range â€” is not a generic "power" approach but a specific technique with specific vulnerabilities, and the series develops those vulnerabilities honestly: opponents who can neutralize Ippo's infighting win, and the series does not pretend that heart and willpower override technical disadvantage when the disadvantage is sufficient.

The length of the series raises a question that applies to all very long-running manga: what does it mean to follow a serialization for decades, and what accumulates across that following that would not be available in a shorter work? "Hajime no Ippo"'s answer is the depth of its character roster. Takamura, Aoki, Kimura, Miyata, the various champions and opponents who pass through the series â€” these are characters whose development across hundreds of chapters produces a specific kind of investment that completed works cannot generate. The fights between characters the reader has followed for ten or twenty years carry emotional weight that derives from accumulated time more than from the architecture of any single arc.

The series' most controversial element in recent years has been the management of Ippo's character after he retires from professional boxing following brain damage â€” a narrative choice that honored boxing's actual medical realities at the cost of the series' core energy. Whether this represents Morikawa's most honest engagement with boxing's costs or a narrative miscalculation that the series has not fully recovered from is the central debate in current discussions of "Hajime no Ippo"'s legacy.`,
    tags: ['Hajime no Ippo', 'George Morikawa', 'Weekly Shonen Magazine', 'boxing manga', 'sports manga', 'long-running manga'],
    entities: ['George Morikawa'],
    publishedAt: new Date('2026-03-24'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/hajime-no-ippo-boxing-manga-never-stopped',
  },
  {
    title: 'Space Battleship Yamato: Japan\'s First Space Opera',
    slug: 'space-battleship-yamato-japans-first-space-opera',
    category: 'anime',
    excerpt: 'Space Battleship Yamato aired in 1974 and was the first anime organized around a sustained narrative of survival and loss with adult emotional stakes. Its choice to repurpose Japan\'s most famous WWII battleship as the vehicle of Earth\'s salvation placed it in a complex relationship to Japanese war memory that the franchise has never fully resolved.',
    content: `"Space Battleship Yamato" aired on Yomiuri TV from October 1974, directed by Yoshinobu Nishizaki with character designs by Leiji Matsumoto. Set in a future where Earth has been rendered nearly uninhabitable by alien bombardment, it follows the crew of the rebuilt battleship Yamato â€” the real WWII warship repurposed as a space vessel â€” on a voyage to the distant planet Iscandar to retrieve a device that will cleanse the Earth. The series was initially cancelled due to poor ratings and restored to a longer run by viewer response, establishing one of the first organized fan campaigns in anime history. It is the foundational text of the Japanese space opera genre and one of the works that established anime as a medium capable of sustained, serious narrative.

The emotional content was unusual for anime of its period. Prior anime had been primarily episodic, designed for young children, and managed for short-term entertainment rather than narrative development across episodes. "Yamato" was organized around a sustained narrative of survival and loss with adult emotional stakes â€” characters died, the mission's costs accumulated, and the ticking-clock structure (Earth's remaining habitable surface shrinking episode by episode) maintained tension across the run. The format established, for a Japanese audience, the possibility of following an anime over months with the expectation of narrative continuity and meaningful development.

The political subtext has been the most discussed element of "Yamato" criticism. The choice to repurpose Japan's most famous WWII battleship â€” the real Yamato was the largest battleship ever built and was sunk in a near-suicidal mission in 1945 â€” as the vehicle of Japan's salvation placed the series in a specific relationship to Japanese war memory. Whether this represents rehabilitation mythology or a more complex engagement with what the ship meant to Japanese culture is a debate the franchise has never fully resolved.

The 2012 remake "Space Battleship Yamato 2199" updated the visual style while substantially preserving the original narrative. Its critical reception â€” praised as one of the most faithful and accomplished remakes in anime history â€” demonstrated that the original story retained sufficient structural strength to anchor a contemporary production. "Yamato"'s direct influence on the subsequent development of Japanese space opera â€” on Matsumoto's subsequent works, on the mecha series that followed, and on "Mobile Suit Gundam"'s own engagement with warfare's costs â€” positions it as the ancestor of everything the genre has since become.`,
    tags: ['Space Battleship Yamato', 'Leiji Matsumoto', 'space opera anime', 'anime 1974', 'classic anime', 'Yamato 2199'],
    entities: ['Leiji Matsumoto', 'Yoshinobu Nishizaki'],
    publishedAt: new Date('2026-03-26'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/space-battleship-yamato-japans-first-space-opera',
  },
  {
    title: 'Macross: The Franchise That Fused Idol Culture with Giant Robots',
    slug: 'macross-franchise-fused-idol-culture-giant-robots',
    category: 'anime',
    excerpt: 'Super Dimension Fortress Macross aired in 1982 and established a template â€” love triangle, pop idol, music as the weapon that resolves an alien war â€” that the franchise has returned to in eight major series across forty years. Each entry asks what it means to use culture as a tool of reconciliation rather than a weapon of victory.',
    content: `"Super Dimension Fortress Macross" aired on TBS from October 1982, co-produced by Tatsunoko Production and Studio Nue. The series follows Hikaru Ichijyo, a civilian pilot drawn into an alien war, and the triangle between him, warrior pilot Misa Hayase, and pop idol Lynn Minmay â€” whose singing becomes a literal weapon of peace against the alien Zentradi, who have no knowledge of culture or love. The premise is preposterous and the execution is unexpectedly moving. The combination of mecha combat, soap opera romance, and the idea that music and culture might accomplish what weapons cannot was both a commercial formula and a genuine conviction, and the tension between those two things is what has kept the franchise alive across forty years and eight major series.

Lynn Minmay is the prototype for a recurring figure in anime culture: the idol whose performance is the diegetic mechanism of the plot's resolution. The Macross franchise's insistence on idol culture as a narrative element â€” every entry features music as a plot device, and the design of the idol character and her music is treated with as much seriousness as the mecha design â€” is unusual in a genre that typically treats such elements as marketing additions. The music produced for Macross series has consistently been high quality, and the in-universe idol's musical career parallels the real commercial career of the franchise's music releases in ways that are deliberately designed to be continuous.

The franchise's legal history is a significant factor in its international reception. Harmony Gold USA holds licenses to the original series and its 1984 theatrical film "Do You Remember Love?", and disputes with Big West historically prevented most subsequent Macross series from being legally distributed outside Japan. Western audiences knew "Robotech" â€” the Harmony Gold production that combined Macross with two unrelated series â€” rather than Macross itself, and were unable to access the franchise's later entries legally for decades. The resolution of these disputes in 2021 finally enabled international distribution of the franchise's newer series.

"Macross Frontier" (2008) and "Macross Delta" (2016) demonstrated that the franchise's fundamental elements â€” love triangle, idol culture, music as resolution, mecha combat â€” could sustain reinvention across new settings and generations. Each entry asks what it means to use culture and love as tools of reconciliation rather than weapons of victory, and each arrives at its own answer.`,
    tags: ['Macross', 'Super Dimension Fortress Macross', 'Studio Nue', 'idol anime', 'mecha anime', 'anime 1982'],
    entities: ['Studio Nue', 'Tatsunoko Production'],
    publishedAt: new Date('2026-03-28'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/macross-franchise-fused-idol-culture-giant-robots',
  },
  {
    title: 'The Tatami Galaxy: Masaaki Yuasa\'s Time Loop Masterpiece',
    slug: 'tatami-galaxy-masaaki-yuasa-time-loop-masterpiece',
    category: 'anime',
    excerpt: 'The Tatami Galaxy aired in 2010 as eleven episodes structured as variations on a theme: the same unnamed college student, the same starting choice, different paths, the same dissatisfied destination. The question is not how to escape the loop but what the accumulation of variations reveals about the narrator\'s actual problem.',
    content: `"The Tatami Galaxy" directed by Masaaki Yuasa and adapted from Tomihiko Morimi's novel aired as an eleven-episode series on Fuji TV's noitamina block in 2010. The series follows an unnamed college student who, at the beginning of each episode, attempts a different social path through his university years â€” joining different clubs, pursuing different relationships â€” and at the end of each episode finds himself back at the starting point. The format is a time loop structured as a set of variations rather than as a mystery to be solved: the question is not how to escape the loop but what the accumulation of variations reveals about the narrator's actual problem.

Yuasa's visual style â€” angular, flat, textured, with figures that distort under emotional pressure and backgrounds that respond to psychological states â€” is used in "The Tatami Galaxy" with a specificity that makes the series among his most visually accomplished. The narrator's Kyoto, cluttered with the specific visual density of a student's environment, is rendered as lived-in and observed rather than constructed. The tatami apartment that gives the series its title â€” a room the narrator repeatedly dismisses as too small for a full life â€” becomes the visual anchor for the series' central argument, which concerns what it means to value the life one has rather than the life one imagines in a different choice.

Morimi's source novel is one of the most distinctive Japanese novels of the 2000s, and Yuasa's adaptation preserves the novel's voice â€” the narrator's hyperliterate, self-dramatizing, fundamentally self-aware mode of presenting his own failures â€” while translating it into a visual medium through the quality of the editing and the relationship between dialogue and images. The rapid-fire narration, which reaches extreme speeds in the series' most agitated moments, is matched by editing rhythms that produce a verbal and visual saturation that is either thrilling or exhausting depending on the viewer's tolerance.

The penultimate episode â€” in which the narrator discovers that the tatami apartment he has been trying to escape is connected by doors to an infinite series of identical rooms, each containing a version of the life he chose in a previous episode â€” is one of the most formally inventive single episodes in anime. The revelation it stages is the series' central argument made spatial: the life available to him has always been the life he already has, and the fantasized alternative has been the obstacle rather than the destination.

"The Tatami Galaxy" is the work that introduced Yuasa to a significant international audience and most clearly demonstrates his capacity to use anime's visual freedom for the representation of interior experience through visual analogy.`,
    tags: ['The Tatami Galaxy', 'Masaaki Yuasa', 'Tomihiko Morimi', 'noitamina', 'anime 2010', 'time loop anime'],
    entities: ['Masaaki Yuasa', 'Tomihiko Morimi'],
    publishedAt: new Date('2026-03-30'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/tatami-galaxy-masaaki-yuasa-time-loop-masterpiece',
  },
  {
    title: 'Haibane Renmei: Atmosphere as Method',
    slug: 'haibane-renmei-atmosphere-as-method',
    category: 'anime',
    excerpt: 'Haibane Renmei aired in 2002 as 13 episodes with no dramatic stakes and no explained world. Its rules â€” why the Haibane cannot approach the walls, what the Day of Flight means â€” are legible as psychological meaning rather than fantasy world-building. Paying attention to the atmosphere is the work.',
    content: `"Haibane Renmei" aired as a 13-episode series in 2002, written and designed by Yoshitoshi ABe, animated by Radix. The series follows Rakka, a young woman who hatches from a cocoon with small grey wings and a halo, in a walled town inhabited by the Haibane â€” beings like her, all hatched from cocoons with no memory of a previous life, living among humans but forbidden from using money, owning new goods, or approaching the town's walls. The world's rules are unexplained; the series does not explain them; and the lack of explanation is not a narrative failure but the series' method.

The atmosphere of "Haibane Renmei" is its primary medium. The series is slow, deliberately paced, organized around small domestic moments and quiet conversations rather than events with dramatic stakes. The Haibane's daily life â€” their work, their relationships within the communal house, their interaction with the townspeople â€” is depicted with a warmth that does not require plot to generate feeling. ABe's character design, soft and slightly melancholy, and the series' color palette â€” muted, autumnal â€” establish a visual tone that is the emotional container for everything the characters experience.

The series' second half reveals the meaning the first half has been preparing. The Haibane's inability to approach the walls, their eventual "Day of Flight" when they leave the town by unknown means, and Rakka's discovery of why her wings have gone black â€” the connection between the wings' condition and something the character carries internally â€” make the world's rules legible as a system of psychological meaning rather than arbitrary world-building. The sins that darken wings, the forgiveness that allows flight, and the relationship between acceptance and departure are developed with enough restraint that the symbolism accumulates without feeling imposed.

ABe designed characters for "Serial Experiments Lain" and "NieA Under 7" before "Haibane Renmei," and all three share a quality of visual melancholy and atmospheric interiority. "Haibane Renmei" is the most emotionally complete of the three â€” the one in which the atmosphere's meaning is most fully realized in narrative terms â€” and the one that has retained the most consistent devotion from viewers who encountered it. Its smallness â€” 13 episodes, a limited budget, a premise without spectacle â€” is inseparable from its effect.`,
    tags: ['Haibane Renmei', 'Yoshitoshi ABe', 'Radix', 'iyashikei anime', 'anime 2002', 'atmospheric anime'],
    entities: ['Yoshitoshi ABe'],
    publishedAt: new Date('2026-04-01'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/haibane-renmei-atmosphere-as-method',
  },
  {
    title: 'Iyashikei: The Healing Anime Genre and What It Heals',
    slug: 'iyashikei-healing-anime-genre-what-it-heals',
    category: 'anime',
    excerpt: 'Iyashikei â€” "healing type" â€” is a Japanese genre designation for media designed to produce a sense of soothing, calming wellbeing. The fact that a stable commercial market exists for media whose stated purpose is to be restful reflects something specific about the conditions of Japanese life that such media is designed to address.',
    content: `"Iyashikei" (ç™’ã—ç³») translates roughly as "healing type" â€” a Japanese term for media, environments, and aesthetics designed to produce soothing, calming wellbeing. As a genre designation in manga and anime, it describes works whose primary function is to generate comfort and peace rather than excitement, tension, or dramatic development. The genre exists as a coherent commercial and artistic category in Japan in a way that has no precise equivalent in Western media, and the fact of its commercial viability â€” that there is a stable audience for media whose stated purpose is to be restful â€” reflects something specific about the conditions of Japanese life that such media is designed to address.

The genre's characteristic works include "Aria" (2005â€“2008), set on a terraformed Venice-like Mars in a future where the pace of life has slowed; "Yokohama Kaidashi Kikou" (1994â€“2006 manga), set in a post-apocalyptic Japan that has become quieter rather than more violent; "Non Non Biyori" (2013â€“2021), depicting rural childhood with a specificity that makes slowness feel like richness; and "Laid-Back Camp" (2018â€“present), following teenage girls camping in winter landscapes. What these works share is an interest in the quality of specific environments â€” the texture of place, the rhythm of daily activity, the particular beauty of ordinary moments â€” and a deliberate slowing of narrative pace to allow that interest to be sustained.

The social context that makes iyashikei commercially viable is not obscure. Japan's urban professional culture â€” the specific conditions of overwork, commuting, small living spaces, and social pressure that characterize life in Tokyo â€” produces a population with both the economic means to consume media and the specific stress that media designed to provide temporary escape might address. Iyashikei is not escapism in the sense of fantasy substitution â€” it does not offer power or adventure â€” but in the sense of environment substitution: it offers quiet, space, slower time, and the sense that the world contains places that are not exhausting.

"Aria" is the genre's most ambitious work. Set in a future city explicitly designed to reproduce Venice on a terraformed Mars, the series is interested in the relationship between place and experience â€” in what it means that humans would go to the expense of terraforming a planet and then recreate an Italian city on it. The female gondoliers who navigate the canals and the philosophy their mentor articulates about the pleasure of small things constitute, across three seasons, one of the most sustained arguments in anime for a particular way of engaging with the world.

What iyashikei heals â€” or attempts to heal â€” is the exhaustion produced by environments that are relentlessly demanding. The genre does not claim permanence; it offers temporary restoration. That a commercial market exists for that restoration through fiction tells you something about the conditions of the lives the fiction is designed to rest from.`,
    tags: ['iyashikei', 'Aria', 'Laid-Back Camp', 'healing anime', 'slice of life', 'Non Non Biyori'],
    entities: [],
    publishedAt: new Date('2026-04-03'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/iyashikei-healing-anime-genre-what-it-heals',
  },
  {
    title: 'Devilman: Go Nagai\'s Dark Fantasy That Changed What Endings Could Be',
    slug: 'devilman-go-nagai-dark-fantasy-changed-what-endings-could-be',
    category: 'manga',
    excerpt: 'Devilman ran in Weekly Shonen Magazine from 1972 to 1973 and ended with the destruction of humanity. The ending was so far outside the conventions of shonen magazine manga that it altered the terms of what Japanese popular fiction could do with a catastrophic conclusion. Its influence runs through Evangelion and beyond.',
    content: `"Devilman" by Go Nagai serialized in Weekly Shonen Magazine from 1972 to 1973, producing five collected volumes. The series follows Akira Fudo, a gentle teenager who fuses with the demon Amon to become Devilman â€” a demon's power controlled by a human heart â€” and fights against demons who seek to reclaim the Earth from humanity. The premise was a commercial packaging of a serious philosophical investigation, because what "Devilman" actually does across its five volumes is systematically destroy everything the premise promises to protect: the characters, the relationships, and finally humanity itself. The ending was so comprehensively dark that it altered the terms of what Japanese popular fiction could do with a catastrophic conclusion.

Nagai's art style is aggressive and expressive in ways unusual for manga of its period â€” his figures deform under emotional and physical pressure, his demons are genuinely unsettling in their visual design, and the violence has an energy that subsequent decades of dark manga have reproduced so frequently that its original impact is difficult to recover. The series was rejected by the anime standards of 1972: the TV anime adaptation produced simultaneously was substantially sanitized, depicting a Devilman who fights individual monsters and wins â€” a series with no relationship to the manga's escalating catastrophism.

The manga's conclusion â€” in which humanity, terrified by the revelation that demons walk among them, destroys itself in paranoid violence while Satan reveals that the war between humans and demons has been his personal catastrophe from the beginning â€” was so far outside shonen magazine conventions that it generated a legacy disproportionate to the series' brief original run. Hideaki Anno has cited "Devilman" as a direct influence on "Evangelion"'s catastrophic ending; the line from Nagai's willingness to end a popular series with the destruction of humanity to the postapocalyptic frameworks that became standard in Japanese SF runs directly through this work.

"Devilman Crybaby," the 2018 Netflix adaptation directed by Masaaki Yuasa, introduced the series to a generation unfamiliar with the 1972 original. Yuasa's adaptation preserved the manga's narrative structure and ending while expanding the character depth and applying his distinctive visual language to the apocalyptic content. It generated the largest single-moment international discussion of Nagai's work and demonstrated that the manga's core â€” the systematic destruction of everything the protagonist loves as the price of his humanity â€” had lost none of its power.

Go Nagai's broader legacy â€” "Mazinger Z," "Cutey Honey," "Violence Jack" â€” established him as one of the defining creators of the mecha and action genres. "Devilman" is the work that demonstrates the depth available within his commercial output.`,
    tags: ['Devilman', 'Go Nagai', 'Weekly Shonen Magazine', 'manga 1970s', 'Devilman Crybaby', 'dark manga'],
    entities: ['Go Nagai', 'Masaaki Yuasa'],
    publishedAt: new Date('2026-04-05'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/devilman-go-nagai-dark-fantasy-changed-what-endings-could-be',
  },
  {
    title: 'Planetes: The Hard SF Manga About Garbage Collectors in Space',
    slug: 'planetes-hard-sf-manga-garbage-collectors-space',
    category: 'manga',
    excerpt: 'Planetes by Makoto Yukimura ran from 1999 to 2004 and is one of the most technically rigorous science fiction manga ever published. Its subject is orbital debris collection in the mid-21st century. Its actual subject is the gap between individual ambition and the ordinary collective work that makes ambition possible.',
    content: `"Planetes" by Makoto Yukimura serialized in Weekly Morning from 1999 to 2004, producing four collected volumes. The series is set in the mid-21st century and follows the crew of a space debris collection vessel â€” astronauts whose job is to remove orbital junk that threatens human space infrastructure. The premise is deliberately mundane: the characters are not heroes in the conventional sense, their work is unglamorous, and the series is interested in what it actually means to live and work in space rather than in the adventure that space typically provides in SF. It is one of the most technically rigorous science fiction manga ever published and one of the most humanly honest.

Yukimura's research into orbital mechanics, spaceflight physiology, and the specific working conditions of a near-future space economy is evident throughout the series, and the technical content is integrated into character and narrative rather than presented as exposition. The effects of low gravity and radiation on long-duration astronauts, the specific social structure of a space station crew, and the economic pressures on a debris collection service operating in the early commercial space industry are depicted with enough specificity that "Planetes" has been cited by engineers and space industry workers as one of the few fictional depictions of space work that rings true.

The central character, Hachimaki, is a debris collector obsessed with owning his own spacecraft and joining the first crewed mission to Jupiter. His ambition generates the series' emotional tension: the gap between the ordinary, collective, service-oriented work of debris collection and the individual, heroic ambition of deep space exploration. The series examines whether individual ambition and collective responsibility can coexist, and what a person becomes when they commit themselves to an overwhelming goal at the cost of the relationships that give their life its actual texture.

The 2003â€“2004 anime adaptation by Sunrise worked with JAXA consultants on the depiction of spacecraft and orbital environments, and the series' visual authenticity â€” zero-gravity physics, realistic spacecraft design, accurate depictions of EVA suit procedures â€” established it as a reference for hard SF visual design in anime.

"Planetes" is the rare work that is both genuinely romantic about space and genuinely honest about what it costs. The ambition that sends people into space is the same ambition that isolates them from the people who love them and from the ordinary life that makes ambition meaningful. The series holds both truths simultaneously.`,
    tags: ['Planetes', 'Makoto Yukimura', 'Weekly Morning', 'hard SF manga', 'space anime', 'Sunrise'],
    entities: ['Makoto Yukimura', 'Sunrise'],
    publishedAt: new Date('2026-04-07'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/planetes-hard-sf-manga-garbage-collectors-space',
  },
  {
    title: 'The Ancient Magus\' Bride: Dark Fantasy and Found Family',
    slug: 'ancient-magus-bride-dark-fantasy-found-family',
    category: 'manga',
    excerpt: 'Kore Yamazaki\'s Ancient Magus\' Bride has been running since 2013, drawing on British folklore and Celtic mythology to build a world of extraordinary visual variety. Its central question â€” what a relationship between a being that doesn\'t understand human emotion and a human who doesn\'t trust her own worth can become â€” drives the series with patient honesty.',
    content: `"The Ancient Magus' Bride" ("MahÅ Tsukai no Yome") by Kore Yamazaki began serialization in Monthly Comic Blade in 2013 and continues. The series follows Chise Hatori, a "Sleigh Beggy" â€” a human with an unusual magical attunement that is valuable and destructive â€” who is purchased at auction by Elias Ainsworth, a non-human magus, who intends to make her both his apprentice and eventually his bride. The premise raises the ethical problems its setup implies: Chise's purchase was voluntary only in the sense that she had no better alternative, and the series is not unaware of the power differential. What it does with this awareness â€” how it develops both characters toward something more mutual without pretending the starting conditions were acceptable â€” is the series' most interesting sustained work.

Yamazaki's world-building draws on British folklore and Celtic mythology, populating its England with creatures from those traditions â€” faeries, Church Grim, the Wild Hunt â€” depicted with a specificity that communicates genuine research. The visual design of the non-human characters is extraordinarily varied, and the series' visual imagination in designing entities recognizably derived from specific folklore sources while being distinctively Yamazaki's own is one of its most consistent pleasures.

Elias himself is the series' most complex element. His appearance â€” a horned skull where a human head should be, a tall architectural frame â€” combined with his emotional underdevelopment makes him both threatening and vulnerable. The series is interested in what it means to form a relationship between a being that genuinely doesn't understand human emotion and a human so damaged by childhood that she doesn't trust her own worth. Neither character is in a position to know what they're doing, and the series tracks their development with patience.

The OVA prequel ("Those Awaiting a Star," 2016â€“2017) and the anime adaptation (2017â€“2018, by Wit Studio) extended the property's reach significantly, and subsequent anime seasons have continued the manga's adaptation. The series' length and pace â€” ongoing after more than a decade â€” mean that it has developed a readership willing to follow a slow, atmospheric story across many volumes.

That readership's loyalty reflects what the series delivers: a fantasy world rendered with genuine care, characters developing in believable increments, and a relationship that is working through real difficulties rather than resolving them through convenient plot mechanics.`,
    tags: ['The Ancient Magus Bride', 'Kore Yamazaki', 'Wit Studio', 'fantasy manga', 'British folklore', 'manga ongoing'],
    entities: ['Kore Yamazaki', 'Wit Studio'],
    publishedAt: new Date('2026-04-09'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/ancient-magus-bride-dark-fantasy-found-family',
  },
  {
    title: 'Crunchyroll and How Legal Streaming Changed Anime Forever',
    slug: 'crunchyroll-how-legal-streaming-changed-anime',
    category: 'industry',
    excerpt: 'Crunchyroll launched as a piracy site in 2006 and relaunched as a legal streaming platform in 2009. The simulcast model it pioneered â€” streaming episodes within hours of Japanese broadcast â€” created the global simultaneous anime discourse that now defines how the medium is consumed internationally.',
    content: `Crunchyroll was founded in 2006 by a group of UC Berkeley students who initially operated as a piracy site, hosting fansubs of anime without authorization from rights holders. In 2009, following investment from institutional funders and license negotiations with Japanese studios, the site relaunched as a legal streaming platform. The transition was both a business decision and a historical turning point: Crunchyroll's legal model demonstrated that an international anime audience would pay for access to licensed content, which changed the industry's assumptions about the international market's value.

The simulcast model â€” streaming episodes within hours of the Japanese broadcast â€” was Crunchyroll's most significant operational innovation. Prior to simulcast, international viewers accessed current anime through fansubs, typically delayed days or weeks from the Japanese broadcast. The simulcast closed this window, making international viewers current with the Japanese audience for the first time, and generating a global simultaneous discourse around each week's episodes that had not previously existed. The seasonal discussion culture that now characterizes international anime fandom â€” the first-episode rankings, the mid-season assessments, the finale discussions â€” developed partly through the infrastructure that simulcast provided.

The impact on Japanese production decisions was substantial. Once international streaming revenue was legible as a meaningful component of a series' commercial model, the categories of content that could be commercially viable expanded. Series with premises that would find a small Japanese theatrical audience could find a viable international streaming audience. The streaming era's effect on which anime got made and what those anime could be is not yet fully analyzable, but it is clearly real.

Funimation, which had dominated physical media distribution of anime in the English-speaking market since the 1990s through dubs of Dragon Ball Z and its subsequent catalog, merged with Crunchyroll in 2021 after Sony's acquisition of both companies. The consolidation of the two largest English-language anime platforms generated both efficiencies and concerns about market concentration. The subsequent years saw ongoing restructuring, licensing disputes, and the emergence of competing platforms (Netflix's anime investment, Amazon Prime Video's licensing) that suggest the streaming ecosystem has not stabilized.

What Crunchyroll's history demonstrates is the transition of the international anime market from a secondary afterthought â€” occasional export revenue, supplemented by fan labor the industry could not officially acknowledge â€” to a primary commercial consideration that shapes production decisions, licensing strategies, and the development of the medium itself.`,
    tags: ['Crunchyroll', 'anime streaming', 'simulcast', 'anime industry', 'Funimation', 'anime localization'],
    entities: ['Crunchyroll', 'Funimation', 'Sony'],
    publishedAt: new Date('2026-04-11'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/crunchyroll-how-legal-streaming-changed-anime',
  },
  {
    title: 'Ouran High School Host Club: The Reverse Harem That Knew What It Was',
    slug: 'ouran-high-school-host-club-reverse-harem-knew-what-it-was',
    category: 'manga',
    excerpt: 'Ouran High School Host Club ran in LaLa magazine from 2002 to 2010 and distinguished itself from straightforward reverse harem manga by having its characters articulate the genre machinery they are operating within. It is the reverse harem series that fans of the genre\'s subversion recommend to each other.',
    content: `"Ouran High School Host Club" by Bisco Hatori serialized in LaLa magazine from 2002 to 2010, producing 18 collected volumes. The series follows Haruhi Fujioka, a scholarship student at an elite private high school who accidentally breaks an expensive vase belonging to the school's Host Club â€” a group of attractive boys who entertain female students â€” and is forced to join the club to pay off the debt. Because Haruhi's short hair and practical clothing lead the club members to assume she is male, she is inducted as a host, and the subsequent management of the misunderstanding, and of the relationships that develop around it, constitutes the series' comic and romantic content.

What distinguishes "Ouran" from straightforward reverse harem manga is its consistent self-awareness. The Host Club's members categorize themselves by the type of appeal they provide â€” the princely type, the cool type, the mischievous type, the quiet type, the childlike type â€” and Hatori has the characters articulate these categories explicitly, framing the entire reverse harem apparatus as a system the series is analyzing rather than simply employing. The characters know they are performing versions of attractiveness, which is a fundamentally different relationship to the genre's mechanics than series that present those performances as genuine character.

Haruhi's relationship to gender is the series' most thoughtful element. She is not presented as a girl pretending to be a boy â€” she is presented as a person who does not find gender categories particularly interesting and who responds to the Host Club's continuous attempts to treat her as either specially female or as an honorary male with practical impatience. The series never resolves Haruhi's gender presentation into a conventional romantic conclusion that requires her to be legible within the heterosexual romance framework; the ending allows her approach to gender to remain as ambiguous as she maintains it throughout.

The 2006 anime adaptation by Bones was among the most faithful adaptations of the genre in its decade, preserving the manga's comedy and self-awareness while adding the visual warmth that the studio's production quality enabled. The combination of genuine affection for its characters and persistent analytical distance from the genre machinery it was deploying made "Ouran" the reverse harem that fans of the genre's subversion â€” people who found the appeal of the genre's archetypes interesting to analyze rather than simply to experience â€” could recommend to each other.`,
    tags: ['Ouran High School Host Club', 'Bisco Hatori', 'LaLa magazine', 'reverse harem', 'shoujo manga', 'Bones anime'],
    entities: ['Bisco Hatori', 'Bones'],
    publishedAt: new Date('2026-04-13'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/ouran-high-school-host-club-reverse-harem-knew-what-it-was',
  },
  {
    title: 'Slam Dunk: The Sports Manga That Made Japan Love Basketball',
    slug: 'slam-dunk-sports-manga-made-japan-love-basketball',
    category: 'manga',
    excerpt: 'Slam Dunk ran in Weekly Shonen Jump from 1990 to 1996 and sold over 120 million volumes. The measurable increase in basketball participation in Japan during its serialization run is one of the clearest documented cases of a manga changing a real sporting culture.',
    content: `"Slam Dunk" by Takehiko Inoue serialized in Weekly Shonen Jump from 1990 to 1996, producing 31 collected volumes and 276 chapters. The series follows Hanamichi Sakuragi, a juvenile delinquent with no interest in basketball who joins the sport to impress a girl, and discovers through the Shohoku High School team's competitive season that basketball itself is worth caring about. The series sold over 120 million volumes and generated an anime adaptation, but its specific cultural impact â€” a measurable increase in basketball participation in Japan during its serialization run â€” is among the clearest documented cases of a manga changing a real sporting culture.

The basketball in "Slam Dunk" is specific and accurate: the plays depicted are drawn from real NBA and high school basketball strategies of the early 1990s, and Inoue's visual management of team play â€” depicting how five players coordinate within a system â€” is more sophisticated than most sports manga, which tend to organize around individual star performances rather than collective tactical development. Sakuragi's position as a player with raw athletic ability but no basketball knowledge generates a structurally convenient device for explaining basketball basics while simultaneously creating a character arc that is genuinely dramatic: each thing Sakuragi learns changes what he is capable of, and the changes are visually legible.

The Interhigh tournament sequence â€” the final long arc, approximately the last twelve volumes â€” is the most sustained sports narrative in shonen manga history at its length. The Shohoku vs. Sannoh game that occupies the series' final stretch is a contest organized around two teams whose strengths and weaknesses generate genuine tactical drama that Inoue resolves with a specificity that makes the outcome feel inevitable without being predictable. The final pages of "Slam Dunk" â€” the game's conclusion and its aftermath â€” are among the most referenced in the medium for the emotional effect they achieve through restraint: showing the most important moment through its aftermath rather than its event.

The 2022 theatrical film "The First Slam Dunk," written and directed by Inoue himself, was the series' first anime content in over twenty-five years. Produced in CGI that Inoue had spent years developing a visual language for, the film focused on Ryota Miyagi and used the same Sannoh game from the manga's final arc as its primary setting. The film was a significant critical and commercial success, demonstrating that the series' emotional core retained its power for viewers who had followed the original serialization and for a new generation encountering it for the first time.`,
    tags: ['Slam Dunk', 'Takehiko Inoue', 'Weekly Shonen Jump', 'basketball manga', 'sports manga', 'manga 1990s'],
    entities: ['Takehiko Inoue'],
    publishedAt: new Date('2026-04-15'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/slam-dunk-sports-manga-made-japan-love-basketball',
  },
  {
    title: 'The Gekiga Tradition: The Alternative Manga That Changed What Comics Could Be',
    slug: 'gekiga-tradition-alternative-manga-changed-comics',
    category: 'manga',
    excerpt: 'Gekiga â€” "dramatic pictures" â€” emerged in the late 1950s as a term for manga addressing adult readers with visual realism and darker subject matter. The tradition it produced, centered on Garo magazine and artists like Yoshiharu Tsuge and Yoshihiro Tatsumi, established the permission that all serious adult manga has since used.',
    content: `"Gekiga" â€” literally "dramatic pictures" â€” is the term formalized by Yoshihiro Tatsumi in 1957 to describe a mode of manga that distinguished itself from the children's entertainment dominating the medium's early decades. Where Osamu Tezuka's foundational manga addressed a broad audience with morally clear narratives and appealing character designs, gekiga addressed adult readers with visual realism, darker subject matter, and an approach to storytelling that prioritized atmosphere and character psychology over plot resolution. The term emerged from artists who felt that "manga" â€” with its associations with children and entertainment â€” did not adequately describe what they were trying to do.

Tatsumi's short story collections â€” "Push Man and Other Stories," "Abandon the Old in Tokyo," "Good-Bye" â€” are the gekiga canon's most internationally available texts. His stories depict postwar Japanese men in specifically constrained circumstances: salaried workers in small apartments, industrial laborers in alienating conditions, ordinary people trapped by poverty, shame, and the social pressures of Japan's rapid economic development in the 1960s. The visual style â€” heavy inking, realistic figures, faces that show age and stress â€” is the expression of a worldview that takes the material conditions of life seriously. The stories do not resolve. They end in the condition they began, often worse, with characters' situations clarified rather than changed.

Yoshiharu Tsuge's "Neji-shiki" (1968) is the single most discussed work of the gekiga tradition. The story â€” a young man in a dreamlike landscape searching for a doctor to treat a wound that may be real or imagined â€” is a surrealist work that uses the visual language of realism to depict an interior experience with no direct external referent. It was published in Garo, the magazine that served as the primary venue for experimental manga throughout the 1960s and 1970s, and it was received as the moment when manga's formal possibilities were fully recognized as extending beyond any existing category.

The tradition's influence on subsequent manga is most visible in seinen manga's willingness to address adult subject matter without genre conventions â€” the dark realism of "Berserk," the psychological complexity of "Monster," the autobiographical intimacy of Inio Asano's work â€” all connect to the permission that gekiga established. Outside Japan, Adrian Tomine, Chris Ware, and other graphic novelists who have cited Japanese influences are in many cases citing the gekiga tradition specifically.

Garo magazine, which published Tsuge, Tatsumi, and dozens of other artists across its run from 1964 to 2002, was the institutional container for most of what the tradition produced. Its closure marked the end of the tradition's primary venue â€” though the formal and philosophical inheritance it left continues to shape what manga can be.`,
    tags: ['gekiga', 'Yoshihiro Tatsumi', 'Yoshiharu Tsuge', 'Garo magazine', 'alternative manga', 'manga history'],
    entities: ['Yoshihiro Tatsumi', 'Yoshiharu Tsuge'],
    publishedAt: new Date('2026-04-17'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/gekiga-tradition-alternative-manga-changed-comics',
  },
  {
    title: 'Captain Tsubasa: The Soccer Manga That Inspired Real Athletes',
    slug: 'captain-tsubasa-soccer-manga-inspired-real-athletes',
    category: 'manga',
    excerpt: 'Captain Tsubasa has been running since 1981. Multiple professional footballers â€” including Zidane, Torres, and SÃ¡nchez â€” have credited it as a primary motivation for pursuing the sport. Its physically impossible techniques communicate something real: the emotional intensity of total commitment to a single moment of athletic expression.',
    content: `"Captain Tsubasa" by YÅichi Takahashi began serializing in Weekly Shonen Jump in 1981 and has continued across multiple sequel series to the present day. The series follows Tsubasa Ozora, a boy from Shizuoka Prefecture whose goal is to win the World Cup for Japan, from his elementary school years through his professional European career. The series sold over 70 million copies, but its most significant cultural impact is the documented claim by multiple professional footballers â€” including Zinedine Zidane, Fernando Torres, Alexis SÃ¡nchez, and dozens of Japanese national team players â€” that "Captain Tsubasa" was a primary motivation for their choice to pursue professional football.

The football content is depicted with a freedom from physical realism that is both the series' most criticized and most creatively significant feature. Characters perform moves that are physically impossible: shots that take minutes to travel to the goal, bicycle kicks from impossible angles, goals scored from the players' own half. The physics are fantasy, and the series makes no attempt to ground them in the mechanics of actual football. What the exaggerated technique communicates instead is the emotional intensity of the game â€” the total commitment to a shot, the absolute will concentrated in a single moment of athletic expression â€” in a way that physically accurate depiction could not achieve.

The testimony of professional athletes who credit "Captain Tsubasa" points to a specific mechanism: the series made the desire to play football feel available and romantic before those players had encountered the actual mechanics of professional football. Tsubasa's relationship to the ball â€” "the ball is my friend" is his recurring declaration â€” communicates a connection to the sport that is prior to competition, prior to training, prior to the professionalization that transforms most elite athletes' relationship to their activity. The series preserved that romantic relationship to the sport for readers who were themselves at the age when it was forming.

The multiple sequel series â€” "World Youth," "Road to 2002," "Golden-23," "Rising Sun" â€” have followed Tsubasa through his adult career with varying degrees of creative energy. Takahashi's output across forty years and his commitment to his protagonist constitute themselves a remarkable fact about a creator's relationship to a work.

The series' primary achievement, however, is in the first serialization and in the specific emotional territory it established: that football was worth loving, that the desire to play it at the highest level was worth having, and that a ball-playing boy from Shizuoka could make the world's game his own.`,
    tags: ['Captain Tsubasa', 'YÅichi Takahashi', 'Weekly Shonen Jump', 'soccer manga', 'sports manga', 'manga 1980s'],
    entities: ['YÅichi Takahashi'],
    publishedAt: new Date('2026-04-19'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/captain-tsubasa-soccer-manga-inspired-real-athletes',
  },
  {
    title: 'Witch Hat Atelier: The Most Beautiful New Manga',
    slug: 'witch-hat-atelier-most-beautiful-new-manga',
    category: 'manga',
    excerpt: 'Kamome Shirahama\'s Witch Hat Atelier has been publishing since 2016 with a visual style derived from European illustration traditions rather than the manga vocabulary. Its pages look unlike anything else currently serializing, and its story about who is allowed to access knowledge and why matches the ambition of its visual achievement.',
    content: `"Witch Hat Atelier" ("Tongari BÅshi no Atelier") by Kamome Shirahama began serialization in Monthly Morning Two in 2016. The series follows Coco, a girl from a world where magic is performed by drawing sigils rather than innate power, who discovers that the ban on normal people learning magic â€” supposedly because non-witches cannot safely use it â€” conceals a different truth, and who joins an atelier of young witches in training while investigating the ban's actual origins. The premise is familiar; the execution is not, because Shirahama's visual style is so far outside the standard manga visual vocabulary that the series has generated discussion of its visual achievement independent of its narrative.

Shirahama's linework derives from European illustration traditions â€” particularly the Franco-Belgian bande dessinÃ©e aesthetic and the decorative fine art traditions of the late 19th century â€” rather than from the manga tradition, which produces pages that read differently from any other manga currently publishing. The clothing design, the architectural detail, the specific way she draws foliage, water, and light are adaptations of illustration techniques that manga's pen-nib tradition does not typically employ. The result is a series that looks unlike anything in its context: dense with hand-crafted detail, visually lush in ways that communicate the physical richness of the world being depicted.

The narrative's interest in accessibility â€” in the politics of who is allowed to access power and why â€” is developed with enough seriousness that the series does not function only as a vehicle for beautiful pages. The witches' ban on sharing magic knowledge, its stated justifications and its actual reasons, and the different characters' relationships to the gatekeeping system constitute an ongoing argument about how knowledge is controlled and what it means for control to be maintained by fear rather than genuine necessity. The argument is not heavy-handed; it emerges through the characters' different positions and choices rather than through expository declaration.

Shirahama's publication pace is slow â€” the series has taken over eight years to produce nine volumes â€” but the density of each volume's visual content makes the accumulation feel substantial rather than sparse. The series is one of the clearest demonstrations that the manga format can accommodate visual traditions outside its own, and that the result of such accommodation can be work that is immediately distinctive and that expands the vocabulary of what the format can look like.`,
    tags: ['Witch Hat Atelier', 'Kamome Shirahama', 'Monthly Morning Two', 'fantasy manga', 'manga art', 'manga 2010s'],
    entities: ['Kamome Shirahama'],
    publishedAt: new Date('2026-04-21'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/witch-hat-atelier-most-beautiful-new-manga',
  },
  {
    title: 'Skip Beat: The Manga About Fame That Takes Its Subject Seriously',
    slug: 'skip-beat-manga-about-fame-takes-subject-seriously',
    category: 'manga',
    excerpt: 'Skip Beat has been running in Hana to Yume since 2002 and is still ongoing. It follows a girl who enters the entertainment industry for revenge and discovers that performance itself requires accessing who she actually is. Over 45 volumes it has become the most thorough examination of acting as a discipline in shoujo manga.',
    content: `"Skip Beat!" by Yoshiki Nakamura began serializing in Hana to Yume in 2002 and continues. The series follows Kyoko Mogami, a teenager who discovers that her childhood friend and first love has used her as a domestic servant while pursuing his pop idol career, and who resolves to enter the entertainment industry herself and destroy him professionally. What begins as a revenge story rapidly becomes something more interesting: a sustained examination of what performing as someone other than yourself requires, what it reveals about who you actually are, and what it means to discover genuine talent inside a motivation that was originally petty.

The performance content is the series' most distinctive achievement. Nakamura is interested in acting â€” in the specific psychological and technical demands of creating a character who is not yourself â€” with a seriousness that performance media rarely brings to its subject. Kyoko's progression through the entertainment industry generates scenarios that require her to access emotions she has suppressed, embody types she has never been, and discover that the act of performing a character can be a means of self-knowledge rather than self-erasure. The series' treatment of acting as a discipline with its own demands and its own truths distinguishes it from manga that use the entertainment industry as backdrop rather than subject.

The romance content â€” developed gradually, over decades of publication, between Kyoko and Ren Tsuruga, the top actor she initially encounters as an obstacle â€” is one of the most extended slow-burn romance constructions in manga history. The relationship's development depends on each character's psychological growth rather than on external plot events, which means that the romance can only progress as the characters themselves progress. Nakamura's patience with this dependency, and the readership's patience in following it, produce an investment in the eventual resolution that faster-developing romances cannot generate.

"Skip Beat!"'s length â€” over 45 volumes and still ongoing â€” reflects the specific ambitions its premise requires. A story about becoming genuinely excellent at performance, and about a person discovering who they are through the process of becoming someone else, cannot be resolved quickly without betraying the claim that the development is real rather than narrative convenience.

The series' length is the cost of taking its subject seriously, and the readership that has followed it for over twenty years has found that cost worth paying.`,
    tags: ['Skip Beat', 'Yoshiki Nakamura', 'Hana to Yume', 'shoujo manga', 'entertainment manga', 'ongoing manga'],
    entities: ['Yoshiki Nakamura'],
    publishedAt: new Date('2026-04-23'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/skip-beat-manga-about-fame-takes-subject-seriously',
  },
];

async function main() {
  console.log(`Seeding ${ESSAYS.length} essays (batch 10)...`);
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

