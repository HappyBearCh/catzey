/**
 * Ninth batch of editorial essays.
 * Run with: npx tsx scripts/seed-essays-9.ts
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ESSAYS = [
  {
    title: 'Chainsaw Man: Tatsuki Fujimoto\'s Breakout',
    slug: 'chainsaw-man-tatsuki-fujimoto-breakout',
    category: 'manga',
    excerpt: 'Chainsaw Man was the series that broke Tatsuki Fujimoto into mainstream visibility. It is gorier and more anarchic than standard Jump fare, and it uses that anarchy to do something most shonen doesn\'t: make death feel genuinely arbitrary.',
    content: `Tatsuki Fujimoto had published two well-regarded series before "Chainsaw Man" — "Fire Punch" (2016–2018) and several one-shots — but "Chainsaw Man" was the work that broke through to mainstream visibility. Serialized in Weekly Shonen Jump from December 2018, the first part concluded in December 2020 with 97 chapters; the second part began in Jump+ in July 2022 and continues. The series follows Denji, a young man living in extreme poverty who merges with his pet devil Pochita to survive, becoming a hybrid devil hunter with chainsaw appendages. The series was adapted into anime by MAPPA in 2022 to significant critical and commercial reception.

What distinguishes "Chainsaw Man" in the context of contemporary shonen is its management of tonal register. The series is genuinely funny — Denji's desires are comically simple (food, women, normal life) and his pursuit of them generates comedy against the backdrop of apocalyptic violence — but the humor does not soften the darkness; it creates contrast that makes the darkness more unsettling rather than less. The deaths of characters the reader has been given reason to care about arrive without the narrative preparation that conventional shonen uses to signal importance, which produces a reading experience of genuine uncertainty: anyone can die, for reasons that may be arbitrary, and the series will continue without them.

Fujimoto's chapter structure is unusually economical. Individual chapters end on transitions rather than cliffhangers, building scenes that develop character and atmosphere at a pace slower than Jump's typical action rhythm. The visual storytelling is precise: Fujimoto communicates emotional states through staging, expression, and physical distance between characters rather than through internal monologue or expository dialogue. This visual economy is more common in seinen manga than in shonen, and its presence in Jump — which has commercial incentives toward narrative accessibility — is part of what made the series feel unusual in its context.

The female characters in Part 1 are among the series' most discussed elements. Makima, the central antagonist and authority figure, is constructed as an enigma whose appeal and danger are deliberately conflated — the reader's uncertainty about whether to trust her mirrors Denji's, and the resolution of that uncertainty is one of manga's more effective villain reveals. Power, the Blood Fiend who becomes Denji's closest companion, is a character of distinctive comedy and unexpected emotional depth whose arc in Part 1 delivers one of the series' most affecting sequences.

Part 2, following a different protagonist in a post-Part-1 world, has developed in directions that divided readers who loved Part 1 while generating new readers who prefer its slower pace and more psychological focus. Fujimoto's willingness to change what the series is across its installments — Part 2 is not trying to replicate what Part 1 was — is consistent with the creative restlessness that characterizes his complete body of work.`,
    tags: ['Chainsaw Man', 'Tatsuki Fujimoto', 'Weekly Shonen Jump', 'MAPPA', 'manga 2010s', 'dark shonen'],
    entities: ['Tatsuki Fujimoto', 'MAPPA'],
    publishedAt: new Date('2026-02-10'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/chainsaw-man-tatsuki-fujimoto-breakout',
  },
  {
    title: 'Fullmetal Alchemist: What the Two Anime Each Got Right',
    slug: 'fullmetal-alchemist-two-anime-what-they-got-right',
    category: 'anime',
    excerpt: 'Fullmetal Alchemist has been adapted into anime twice: in 2003 before the manga finished, and as Brotherhood in 2009 following the complete story. The comparison is usually resolved too quickly. Here is what each version achieved that the other could not.',
    content: `"Fullmetal Alchemist," Hiromu Arakawa's manga, has been adapted into anime twice: in 2003 by Studio Bones before the manga was complete, and in 2009 as "Fullmetal Alchemist: Brotherhood" following the manga's full narrative. The two adaptations are the most commonly used example in discussions of faithful adaptation versus independent creative interpretation, and that discussion often resolves too quickly into "Brotherhood is better" without examining what the 2003 anime achieved that Brotherhood could not have.

The 2003 anime confronted the structural challenge of adapting an ongoing manga: it had access to the story's early chapters and thematic foundations but had no access to the narrative's resolution. The adaptation's creative team chose to develop an independent storyline — sharing the beginning with Arakawa's manga while diverging as new material ran out. The resulting series has a different emotional logic from Brotherhood: darker, more interested in grief and institutional complicity, and built around a version of Ed and Al's relationship that has a specific quality of desperate attachment not present in the same way in the manga's more ultimately hopeful framework. The 2003 anime's Hohenheim, the 2003 anime's Dante, and the Elrics' journey through the Gate exist in a more philosophically pessimistic moral universe than the manga.

"Brotherhood," adapting the complete manga, compressed the early chapters that the 2003 anime had covered extensively — a decision that frustrated viewers who came to Brotherhood first and found those arcs rushed, and that Brotherhood partisans defend on the grounds that the series was explicitly for manga readers who did not need a second extended treatment of material they already knew. Once Brotherhood reaches the content the 2003 anime had not covered, the pacing normalizes and the series builds into what most critics regard as one of the finest long-form anime ever produced: a complete narrative with moral seriousness, satisfying structural development, and a conclusion that earns its emotional weight.

The honest comparison is not "which is better" but "what does each do that the other cannot." The 2003 anime is a work of independent artistic vision applied to shared source material — an original ending that generates genuine feeling while diverging from Arakawa's intentions. Brotherhood is a faithful adaptation of what most critics regard as the superior text, but a faithful adaptation of a complete text is still a different object from the text itself, and Brotherhood's early compression is the concrete evidence of that difference.

Both exist and both reward engagement. Declaring one irrelevant to anyone who has seen the other is a category error. The 2003 anime is not a failed attempt at Brotherhood; it is a different work that happens to share an opening, and its emotional register — darker, more resigned, more preoccupied with the impossibility of returning things to what they were — is a legitimate interpretation of the material that the manga's ultimate optimism chose not to pursue.`,
    tags: ['Fullmetal Alchemist', 'Brotherhood', 'Studio Bones', 'Hiromu Arakawa', 'anime adaptation', 'anime 2009'],
    entities: ['Hiromu Arakawa', 'Studio Bones'],
    publishedAt: new Date('2026-02-12'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/fullmetal-alchemist-two-anime-what-they-got-right',
  },
  {
    title: 'Legend of the Galactic Heroes: The Space Opera That Refuses Easy Politics',
    slug: 'legend-galactic-heroes-space-opera-refuses-easy-politics',
    category: 'anime',
    excerpt: 'Legend of the Galactic Heroes is a 110-episode OVA from 1988 to 1997 built around two protagonists — one reforming an autocracy, one defending a corrupt democracy. It is structured around the proposition that neither system is as simple as its advocates claim.',
    content: `"Legend of the Galactic Heroes" is a 110-episode OVA produced by Kitty Films from 1988 to 1997, based on the novel series by Yoshiki Tanaka serialized from 1982 to 1987. It follows two protagonists: Reinhard von Lohengramm, a prodigiously talented aristocrat rising through the autocratic Galactic Empire to reshape it from within; and Yang Wen-li, a historian-turned-admiral who defends the corrupt but democratically organized Free Planets Alliance against Reinhard's expanding influence. The series is structured around the proposition that neither system is as simple as its advocates claim, and that the most dangerous people on either side are those who believe otherwise.

The series' political seriousness is its most distinctive quality. Tanaka and the OVA's writers engage with the question of what democracy actually requires — not as a slogan but as a functioning system that depends on an informed and engaged citizenry — with enough specificity that scenes set in Alliance legislative bodies generate genuine suspense. Democracy in the series is vulnerable not to military defeat but to the willingness of its citizens to trade political engagement for personal security, and Yang's frustration at watching this happen in real time is the series' most contemporary element. The institutional failures depicted — politicians who use democratic language to entrench their own power, citizens who elect demagogues because competent governance is boring — are not abstract historical material.

Reinhard is one of the great figures in anime history in the specific sense that the series takes his project seriously enough to make him genuinely sympathetic while never pretending that autocracy, however benevolent, is compatible with human dignity. The tragedy is structural: Reinhard's intelligence and personal virtue are real, and so is the system he is building, and the system will not survive him because it is designed around him rather than around principles that outlast individuals. Yang, who understands this clearly, cannot stop it because the democratic system he defends keeps generating obstacles to effective resistance from within.

The production values of the 1988–1997 OVA are dated by contemporary standards, and the 2018 reboot ("Die Neue These") offers more visually modern access to the story. The reboot remains unfinished as an adaptation; the original OVA is complete and remains the full experience. For viewers willing to engage with animation that does not chase contemporary aesthetic standards, the original is preferable for the accumulated weight of 110 episodes of character development — Reinhard and Yang's parallel arcs across that length produce an emotional investment that a shorter work cannot replicate.

The series' status in the anime canon is that of a work too important to be ignored and too demanding to be casually recommended. Its reputation among viewers who engage with it seriously as the greatest anime ever made reflects a real achievement: a space opera that treats politics, history, and human institutions with the seriousness those subjects deserve, while sustaining character work that makes the political stakes feel personal rather than abstract.`,
    tags: ['Legend of the Galactic Heroes', 'Yoshiki Tanaka', 'space opera', 'anime OVA', 'anime 1988', 'political anime'],
    entities: ['Yoshiki Tanaka'],
    publishedAt: new Date('2026-02-14'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/legend-galactic-heroes-space-opera-refuses-easy-politics',
  },
  {
    title: 'Mamoru Hosoda: The Director Who Keeps Making Films About Families',
    slug: 'mamoru-hosoda-director-keeps-making-films-about-families',
    category: 'anime',
    excerpt: 'Mamoru Hosoda is the director most frequently positioned as Miyazaki\'s successor — a comparison that is both useful shorthand and an obstacle to understanding what he actually does. His films are organized around the family and its difficulty, not the world and its strangeness.',
    content: `Mamoru Hosoda directed "The Girl Who Leapt Through Time" (2006), "Summer Wars" (2009), "Wolf Children" (2012), "The Boy and the Beast" (2015), "Mirai" (2018), and "Belle" (2021). His career is characterized by consistent thematic preoccupations — family, the relationship between digital and physical space, the experience of growing up — executed with an emotional directness that can feel simple in comparison with Miyazaki's denser allegorical mode but is doing something genuinely different.

"The Girl Who Leapt Through Time," Hosoda's first work at Madhouse after leaving Toei, established the emotional register he would continue to develop: a young person confronting the consequences of choices made without full understanding of what they cost, learning to accept the irreversibility of time. The time travel premise is the vehicle for a genuinely felt coming-of-age story, and the film's approach to its female protagonist — Makoto's immaturity and selfishness are depicted with sympathy rather than judgment — established that Hosoda was interested in his characters' full humanity rather than in heroic idealization.

"Summer Wars" and "Wolf Children" represent the two poles of Hosoda's work. "Summer Wars" is kinetic and sociable — a large extended family resisting a catastrophic AI system together — while "Wolf Children" is quiet and intimate, following a mother raising two half-werewolf children over twelve years with minimal external conflict. Both are organized around family as the primary unit of human experience, a thematic commitment that runs through all of Hosoda's work and distinguishes him from Miyazaki, whose films more typically place protagonists in a world that is larger than their domestic context.

"Belle" (2021) returned to the online-world-and-real-world structure of "Summer Wars" with a more contemporary understanding of virtual platform dynamics: the film's engagement with identity performance online, parasocial relationships, and the way virtual celebrity amplifies real vulnerability reflected an internet that had developed significantly since 2009. The Beauty and the Beast structure overlaid on these concerns was received as more or less successful depending on the viewer's tolerance for the combination of emotional directness and genre framework.

The comparison with Miyazaki is limiting not because Hosoda is lesser but because they are doing different things. Miyazaki's cinema is organized around the world and its strangeness; Hosoda's is organized around the family and its difficulty. The scale is different, the emotional mode is different, and the comparison can only go so far. What Hosoda has built is a consistent body of work with a specific emotional intelligence — an understanding of what families ask of each other, and what growing up costs — that does not need Miyazaki's shadow to justify its existence.`,
    tags: ['Mamoru Hosoda', 'Wolf Children', 'Summer Wars', 'Belle', 'Madhouse', 'anime film'],
    entities: ['Mamoru Hosoda', 'Madhouse'],
    publishedAt: new Date('2026-02-16'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/mamoru-hosoda-director-keeps-making-films-about-families',
  },
  {
    title: 'Fist of the North Star: The Post-Apocalyptic Manga That Defined 1980s Action',
    slug: 'fist-of-the-north-star-post-apocalyptic-1980s-action',
    category: 'manga',
    excerpt: 'Hokuto no Ken ran in Weekly Shonen Jump from 1983 to 1988 and established the visual grammar of post-apocalyptic manga violence for decades. Its blend of Mad Max aesthetics and martial arts philosophy produced one of the medium\'s most enduring franchises.',
    content: `"Fist of the North Star" ("Hokuto no Ken") by writer Buronson and artist Tetsuo Hara serialized in Weekly Shonen Jump from 1983 to 1988, producing 245 chapters and an anime that began airing in 1984. Set in a post-nuclear apocalypse where society has collapsed and the strong prey on the weak, it follows Kenshiro, master of Hokuto Shinken — a secret martial art that targets internal pressure points to cause the human body to destroy itself from within. The series generated a franchise that has remained commercially active for four decades and established visual and narrative conventions for post-apocalyptic manga action that subsequent works inherited rather than invented.

The visual design drew heavily from contemporary cultural sources: "Mad Max 2: The Road Warrior" (1981) provided the post-apocalyptic wasteland aesthetic, and Bruce Lee's martial arts iconography provided the physical template for Kenshiro. Hara's art style — extremely muscular characters, dynamic action poses, expressive violence — was calibrated for maximum kinetic impact in the weekly publication context. The series' visual grammar for depicting fight sequences established conventions that action manga would employ for decades. The exchange "You are already dead" ("Omae wa mou shindeiru") — Kenshiro informing defeated opponents that their internal organs are already rupturing — became one of the most quoted lines in manga history.

The narrative is structured around a series of antagonists of escalating power and thematic complexity, beginning with opportunistic warlords and culminating in Raoh, Kenshiro's eldest brother, whose ambition to conquer the post-apocalyptic world is presented with genuine ideological seriousness. Raoh is not a simple villain: his desire to impose order on chaos is comprehensible, his personal code has integrity, and his relationship with Kenshiro generates the series' most emotionally resonant material. The sequence of Raoh's death, and what he says to the sky in his final moments, is remembered by readers who encountered it in youth as one of manga's most affecting concluding images.

The series' limitations are real: its female characters are consistently passive victims or prizes, the episodic structure means emotional investments are regularly abandoned as the story moves to new antagonists, and the violence's escalation eventually produces a kind of numbness. These are the limitations of its moment and commercial context — a weekly shonen manga of the mid-1980s was not designed for the sustained character development that subsequent decades of manga would make a standard expectation.

What "Fist of the North Star" represents historically is the fusion of Western genre sources with Japanese martial arts storytelling that would become the template for action manga's global appeal. Its visual language was distributed globally through the anime, and its influence on subsequent post-apocalyptic fiction in Japan and internationally is measurable in the directness of its derivatives.`,
    tags: ['Fist of the North Star', 'Hokuto no Ken', 'Buronson', 'Tetsuo Hara', 'Weekly Shonen Jump', 'manga 1980s'],
    entities: ['Buronson', 'Tetsuo Hara'],
    publishedAt: new Date('2026-02-18'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/fist-of-the-north-star-post-apocalyptic-1980s-action',
  },
  {
    title: 'Gintama: The Comedy That Earns Every Serious Moment',
    slug: 'gintama-comedy-earns-every-serious-moment',
    category: 'manga',
    excerpt: 'Gintama ran in Weekly Shonen Jump for sixteen years, combining fourth-wall-breaking gag chapters with dramatic arcs of genuine emotional power. It is the most consistent evidence in manga that comedy and serious feeling are not incompatible.',
    content: `"Gintama" by Hideaki Sorachi serialized in Weekly Shonen Jump from 2003 to 2019, producing 77 collected volumes. Set in an alternate-history Edo where feudal Japan has been conquered by aliens and samurai have been stripped of their swords, the series follows Gintoki Sakata — a former samurai revolutionary who now runs an odd-jobs shop — through a combination of parody comedy, fourth-wall-breaking gag chapters, and serious dramatic arcs that are significantly more emotionally powerful than the surrounding comedy would suggest. The series is the most consistent evidence in manga for the proposition that comedy and genuine feeling are not incompatible.

The gag content is the first thing readers encounter and often the barrier to entry for those who approach manga through the serious tonal register of its more critically discussed works. Gintama's humor is referential, absurdist, and frequently crude, operating through volume and comedic timing rather than narrative elegance. Chapters parody other Jump series, public figures, genre conventions, and the manga industry itself with a freedom that required a popularity robust enough to withstand the consequences. Sorachi's running relationship with Jump's editorial department — the joke of a Jump mangaka constantly getting away with breaking the rules — is only funny because he is actually getting away with it.

The dramatic arcs work because of the comedy rather than despite it. The Yoshiwara in Flames arc, the Rakuyou arc, and the Farewell Shinsengumi arc are structured as genuine dramatic content — character development, stakes, violence with consequences — and they land with emotional force because the reader has invested in characters whose comic presentation has revealed rather than concealed their full humanity. Gintoki's backstory, disclosed gradually across the series, makes the comedy's constant deflection of seriousness readable as character rather than narrative evasion: he is someone whose experience of war has made him unwilling to take the world seriously, and the comedy is the expression of that posture.

The supporting cast — the Shinsengumi, the Yorozuya, the recurring antagonists — is large enough to sustain years of ensemble comedy and developed enough to sustain genuinely affecting dramatic moments centered on relationships the reader has watched develop across hundreds of chapters. Hijikata and Sougo's abusive partnership, Katsura's dedication to a revolution treated with simultaneous sympathy and ridicule, Kagura's alien family obligations — each generates material that works as comedy and as something else simultaneously.

The barrier to reading "Gintama" is real: 77 volumes is a commitment, the early chapters are less polished than what follows, and the referential humor requires familiarity with Japanese pop culture to land fully. For readers who engage with it, however, the series' complete arc represents one of the most accomplished demonstrations in long-running manga that genuine feeling and sustained comedy can sustain each other across an extended work.`,
    tags: ['Gintama', 'Hideaki Sorachi', 'Weekly Shonen Jump', 'comedy manga', 'samurai manga', 'manga 2000s'],
    entities: ['Hideaki Sorachi'],
    publishedAt: new Date('2026-02-20'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/gintama-comedy-earns-every-serious-moment',
  },
  {
    title: 'Spice and Wolf: The Economics Romance',
    slug: 'spice-and-wolf-economics-romance',
    category: 'light-novels',
    excerpt: 'Spice and Wolf uses conversations about medieval trade economics as the vehicle for a slow-burn romance between two highly intelligent adults. It is the light novel that made the unlikely combination of commodity arbitrage and character-driven romance into a cult classic.',
    content: `"Spice and Wolf" by Isuna Hasekura began as a light novel series in 2006, ran until 2011, and was adapted into anime in 2008 and 2009, with a 2024 remake. The series follows Kraft Lawrence, a traveling merchant in a vaguely medieval European setting, who encounters Holo, a wolf deity who has been forgotten by the village she once protected and decides to accompany Lawrence on his travels north to her original home. The series' appeal rests on an unusual combination: conversations about medieval trade economics used as the vehicle for a slow-burn romance between two highly intelligent adults.

The economics content is real, not decorative. Hasekura researched medieval commerce extensively, and the business transactions Lawrence navigates — currency speculation, commodity arbitrage, trade guild politics — are depicted with enough specificity to be genuinely illuminating about how pre-industrial markets functioned. Lawrence's expertise is shown rather than stated: his assessments of business opportunities, his reading of market conditions, and his negotiations with other merchants demonstrate professional competence that the series respects. The economics is not simplified for narrative accessibility, which is a significant commercial risk in light novel publishing and the reason the series' success was unexpected enough to generate discussion.

Holo is the series' defining achievement. A wolf deity with centuries of accumulated experience who has learned to read human society with the detachment of a long-lived observer, she is more sophisticated than Lawrence in most respects while simultaneously experiencing vulnerability around the fact of her displacement — her home is gone, the people who remembered her are dead, and what she is traveling toward is uncertain. The dynamic between Lawrence's worldly practical competence and Holo's intellectual and emotional range generates conversations that are the series' main pleasure: two people testing each other, finding each other's edges, and slowly recognizing mutual regard through the texture of disagreement and wit.

The 2024 remake anime, produced by Passione, was received warmly by both existing fans returning to the property and new viewers encountering it for the first time. It benefited from improved production resources and covered light novel content not reached by the original anime, giving returning viewers new narrative material rather than simply a visual upgrade.

"Spice and Wolf" occupies a genuinely unusual position in the light novel landscape: a romance for adults who want their romance to also be interesting, a fantasy novel for people who find the genre's action-focus unsatisfying, and an economics text disguised as a love story. All three descriptions are accurate, and their conjunction is why the series has lasted.`,
    tags: ['Spice and Wolf', 'Isuna Hasekura', 'light novels', 'medieval anime', 'romance anime', 'economics anime'],
    entities: ['Isuna Hasekura'],
    publishedAt: new Date('2026-02-22'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/spice-and-wolf-economics-romance',
  },
  {
    title: 'CLAMP: The All-Female Collective That Redefined Manga',
    slug: 'clamp-all-female-collective-redefined-manga',
    category: 'manga',
    excerpt: 'CLAMP — four women who began as a doujinshi circle in the 1980s — became one of the most commercially successful and visually distinctive manga creation groups in the industry\'s history. Their works span magical girl, dark fantasy, science fiction, and surreal horror.',
    content: `CLAMP is a manga collective of four women — Nanase Ohkawa, Mokona, Tsubaki Nekoi, and Satsuki Igarashi — who began as a doujinshi circle in the late 1980s and became one of the most commercially successful and artistically distinctive manga creation groups in the industry's history. Their works include "Cardcaptor Sakura," "X/1999," "Magic Knight Rayearth," "Chobits," "xxxHolic," "Tsubasa: Reservoir Chronicle," and "Clover," spanning magical girl, dark fantasy, science fiction, and surreal horror. The range across these titles, and the consistent visual identity maintained across that range, is the first evidence that CLAMP is doing something individual creators rarely achieve across such varied subject matter.

CLAMP's visual style is immediately recognizable: elongated figures with distinctive proportions, elaborate costume design, dense decorative detail in backgrounds and clothing derived from Japanese textile and pattern traditions, and an ability to modulate from cute and accessible to stark and foreboding within single works. "Cardcaptor Sakura" and "X/1999" were produced concurrently — one of the most cheerful magical girl series ever drawn and one of the darkest apocalyptic fantasies in manga — by the same four people using the same visual vocabulary. The tonal range the style can accommodate is remarkable.

The thematic concerns appearing consistently across CLAMP's works are more visible than might be expected from a group working across such varied genres. Relationships between people of radically different power levels recur throughout the catalogue. The ethics of love and protection, the cost of prophecy and fate, the question of whether destiny can be resisted or only endured: these are the questions that "X/1999," "xxxHolic," "Tsubasa," and "Clover" ask from different angles. The unifying philosophy is recognizable once you have read enough of the work to identify it.

"X/1999" remains officially unfinished after Kadokawa suspended it in the mid-2000s due to the graphic violence's conflict with the magazine's changing editorial stance. The series was building toward an apocalyptic conclusion that would resolve the interlocking fates of its many characters, and its suspension — mid-arc, with the resolution still pending — is one of the more painful open questions in manga. CLAMP has indicated in interviews that they still intend to finish it; the gap between that intention and action has now exceeded twenty years.

CLAMP's position as an all-female creative collective working primarily in shojo and for female readership within an industry whose major publications are predominantly male-staffed has been discussed by critics of gender representation in the manga industry. What is clearer is that their commercial and critical success — sustained across four decades, across genres, across audiences from children to adults — demonstrates what the industry's structural barriers against female creators have meant for the work that doesn't exist because those barriers were not overcome.`,
    tags: ['CLAMP', 'Cardcaptor Sakura', 'X/1999', 'Tsubasa', 'manga collective', 'shoujo manga'],
    entities: ['CLAMP', 'Nanase Ohkawa'],
    publishedAt: new Date('2026-02-24'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/clamp-all-female-collective-redefined-manga',
  },
  {
    title: 'Shirobako: The Anime About Making Anime',
    slug: 'shirobako-anime-about-making-anime',
    category: 'anime',
    excerpt: 'Shirobako is the most complete and honest depiction of anime production work ever committed to fiction. It generates emotional investment both in the work being depicted and in the people doing it — a workplace drama where the stakes are real because the craft is real.',
    content: `"Shirobako," produced by P.A. Works and directed by Tsutomu Mizushima, aired in 2014–2015 and released a theatrical film continuation in 2020. The series follows Aoi Miyamori, a production assistant at the fictional anime studio Musashino Animation, through two productions: a drama series that is struggling to stay on schedule and a second original fantasy series whose development problems generate the show's second half. "Shirobako" is the most complete and honest depiction of anime production work ever committed to fiction, and it achieves something unusual: a workplace drama that generates emotional investment both in the work being depicted and in the people doing it.

The production process documentation is genuinely detailed. "Shirobako" depicts key animation, in-between animation, background art, 3D modeling, scriptwriting, sound recording, voice casting, scheduling, and the relationships between studios, production committees, and broadcast schedules with enough specificity that industry professionals have cited it as accurate to their experience. The depiction of the production assistant's role in particular — running between departments, managing the cascading delays that any complex production generates, performing the invisible coordination that determines whether an episode is delivered on time — is the series' most valuable industry documentation.

What makes "Shirobako" more than a documentary is its understanding of why people do this work. The five main characters — childhood friends who made an amateur anime together in high school and are now at different stages of professional entry in the industry — are each working through the specific gap between their love of anime and the reality of anime production. The gap is not presented as disillusionment: the series is not cynical about the industry. It understands that love for a medium and competent professional work within that medium are different things, and that developing the latter while sustaining the former is the actual challenge.

The recurring presence of veteran animators, retired directors, and experienced scriptwriters who appear as mentors or obstacles provides historical depth and the sense that the industry being depicted has a tradition the young characters are joining rather than inventing. When these figures speak about their experience — what the industry was, what they gave to it, what remains — the series briefly widens its scope to a longer view of what professional creative work means over a career.

"Shirobako" is the work to recommend to anyone who has ever wondered what actually goes into the anime they watch — and to anyone who has tried to do creative work professionally and found the distance between love and competence harder to close than they expected.`,
    tags: ['Shirobako', 'P.A. Works', 'anime production', 'anime industry', 'anime 2014', 'behind the scenes'],
    entities: ['P.A. Works'],
    publishedAt: new Date('2026-02-26'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/shirobako-anime-about-making-anime',
  },
  {
    title: 'The Rose of Versailles: The Manga That Invented Modern Shoujo',
    slug: 'rose-of-versailles-manga-invented-modern-shoujo',
    category: 'manga',
    excerpt: 'Riyoko Ikeda\'s Rose of Versailles ran in 1972 and 1973 and made the argument that manga for girls could be as historically and politically ambitious as manga for boys. The conventions it established became the genre\'s conventions.',
    content: `"The Rose of Versailles" ("Versailles no Bara") by Riyoko Ikeda serialized in Weekly Margaret from 1972 to 1973 and was adapted into an enormously successful anime by Tokyo Movie Shinsha in 1979–1980. Set in pre-revolutionary France and centering on Oscar François de Jarjayes — a woman raised as a man to serve as commander of the Royal Guard, who serves Marie Antoinette and eventually sides with the revolutionary Third Estate — it is one of the most historically and politically ambitious manga ever produced for a young female audience and one of the works most responsible for establishing what shoujo manga could do.

The historical content is substantive. Ikeda researched the French Revolution extensively, and the manga depicts actual historical figures — Marie Antoinette, Louis XVI, Robespierre — alongside fictional characters with enough contextual accuracy that the series has been used in Japanese secondary school contexts as an introduction to 18th-century French history. The political tensions of the period — class resentment, aristocratic privilege, the failure of the monarchy to adapt to social change — are depicted with a seriousness that does not simplify in the direction of either revolutionary romanticism or aristocratic nostalgia.

Oscar is the series' defining achievement. A character who inhabits a male social role while maintaining female identity, whose authority is professional and whose emotional life is private, whose relationships with both Andre and with the social world she serves generate the series' deepest dramatic content, she is one of manga's most psychologically complex protagonists. The series' willingness to follow her through contradictions — her loyalty to a queen she recognizes as politically destructive, her gradual shift of allegiance as the revolution approaches, her management of her own desire in a social world that has no category for what she is — gives "Rose of Versailles" a moral seriousness that the romance content never simplifies.

The influence on subsequent shoujo manga is so pervasive that it is sometimes difficult to identify — the conventions it established became the genre's conventions, which makes the origination invisible. The intersection of historical drama and female interiority, the use of male-coded protagonists in female-audience works, the engagement with political content as the context for personal drama: all of these are visible in "The Rose of Versailles" and all became standard tools of the shoujo tradition.

It is one of the works that made the argument, in 1972, that manga for girls could be as serious and as historically ambitious as manga for boys — and that argument has been followed by the genre ever since.`,
    tags: ['Rose of Versailles', 'Riyoko Ikeda', 'shoujo manga', 'manga 1970s', 'French Revolution manga', 'Weekly Margaret'],
    entities: ['Riyoko Ikeda'],
    publishedAt: new Date('2026-02-28'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/rose-of-versailles-manga-invented-modern-shoujo',
  },
  {
    title: 'Lone Wolf and Cub: The Chambara Manga That Influenced Everything',
    slug: 'lone-wolf-and-cub-chambara-manga-influenced-everything',
    category: 'manga',
    excerpt: 'Kazuo Koike and Goseki Kojima\'s Lone Wolf and Cub ran for 8,700 pages from 1970 to 1976. Its visual achievement in depicting sword combat, its emotional core in the relationship between Ogami and his son, and its global influence through the Shogun Assassin films make it one of the foundational works of the medium.',
    content: `"Lone Wolf and Cub" ("Kozure Okami") written by Kazuo Koike and illustrated by Goseki Kojima serialized in Big Comic from 1970 to 1976, producing 28 collected volumes and 8,700 pages. The series follows Ogami Itto, the Shogun's former official executioner, who has been framed for treason by the Yagyu clan, watched his wife be murdered, and now wanders feudal Japan as an assassin-for-hire with his infant son Daigoro in a wooden cart. It is one of the foundational works of seinen manga, one of the most technically accomplished long-form visual narratives in the medium's history, and one of the works most directly responsible for introducing Japanese manga aesthetics to Western audiences through its 1987 First Comics translation and the Shogun Assassin films derived from its anime adaptations.

Kojima's artwork is the series' most immediately striking quality. His visual vocabulary — the specific way he depicts the Edo period's physical textures, the spatial management of swordfight sequences across multiple panels, the compositional intelligence of his splash pages — is among the highest achievements in manga visual storytelling. The combat sequences are anatomically specific, dynamically clear, and paced with a management of time and impact that influenced action manga's visual grammar for decades. Koike's scripts understood what Kojima's art could do and were written to enable it.

The series' emotional core is the relationship between Ogami and Daigoro. Ogami's path of revenge — "the demon's way" — requires him to accept his and his son's deaths as already decided, which produces a figure of complete detachment who nevertheless demonstrates, through his relationship with Daigoro and through specific choices across the series, that he is not indifferent to life but has placed himself outside its ordinary claims. Daigoro, who witnesses everything without understanding most of it and who occasionally demonstrates an equanimity beyond his years, is an unusual figure in action fiction: a child whose silence and observation are emotionally central rather than peripheral to the narrative.

Koike went on to create "Crying Freeman" and other works of comparable craftsmanship, and Kojima's influence on Japanese manga illustration is measurable across the work of artists who studied his spatial and figure drawing. The global influence of "Lone Wolf and Cub" — through the Shogun Assassin films' wide VHS distribution, through its First Comics translation, and through its identification as an influence by artists including Frank Miller, whose "Daredevil: Born Again" explicitly draws on it — is one of the clearest cases of a manga work shaping non-Japanese visual storytelling.

The series is the standard reference point in discussions of manga's potential for sustained visual and narrative excellence — the work that demonstrates what 8,700 pages of genuine craft can accumulate into.`,
    tags: ['Lone Wolf and Cub', 'Kazuo Koike', 'Goseki Kojima', 'chambara manga', 'manga 1970s', 'seinen manga'],
    entities: ['Kazuo Koike', 'Goseki Kojima'],
    publishedAt: new Date('2026-03-02'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/lone-wolf-and-cub-chambara-manga-influenced-everything',
  },
  {
    title: 'Monster: Naoki Urasawa\'s Greatest Work',
    slug: 'monster-naoki-urasawa-greatest-work',
    category: 'manga',
    excerpt: 'Monster follows a Japanese surgeon who saved the life of a boy who grew into a serial killer. Over 18 volumes and post-Cold War Central Europe, it asks whether a life saved becomes the saver\'s responsibility. It is the Urasawa work with the broadest cross-cultural reach.',
    content: `"Monster" by Naoki Urasawa serialized in Big Comic Original from 1994 to 2001, producing 18 collected volumes. The series follows Dr. Kenzo Tenma, a Japanese neurosurgeon working in Düsseldorf who saved the life of a young boy, Johan Liebert, over the life of the city's mayor — a choice that cost him his career advancement and which he came to doubt when the boy he saved grew into a serial killer responsible for deaths across Central Europe. Tenma, now a fugitive suspected of murders he did not commit, pursues Johan across a Europe still processing its Cold War history, trying to stop the killer while confronting the question of whether a life saved becomes the saver's responsibility.

The thriller structure is executed with the plot architecture Urasawa had developed in earlier series and would refine further in "20th Century Boys": complex intersecting storylines, characters whose motivations are revealed gradually, and a management of long-term narrative tension that sustains across eighteen volumes without losing the threads it has established. The scale of the cast — German police, former East German secret service operatives, neo-Nazis, Czech orphanage workers, street children, Dutch detectives — and the geographic range across Germany, Austria, and the Czech Republic give the thriller mechanics the texture of a real Europe rather than a generic thriller setting.

Johan Liebert is one of manga's most fully realized antagonists. His ability to inspire devotion in people he will eventually destroy, his psychology — partially revealed through the childhood trauma that produced him, partially maintained as deliberate mystery — and his relationship with his twin sister Anna generate the series' philosophical substance. The question at the center is a dark one: whether there are people who simply should not exist, constituted from their origins such that their existence produces only destruction. The specific circumstances of Johan's creation within Cold War experimental psychiatry give this question historical grounding that prevents it from being merely abstract.

The Netflix anime adaptation (2004, Madhouse) is one of the most faithful long-form adaptations in the medium's history — 74 episodes adapting the complete manga without significant compression or creative divergence. Its production quality is not exceptional by contemporary standards, but the faithfulness means it functions as an essentially equivalent experience to the manga for those who prefer animation.

"Monster" is the Urasawa work most often cited by readers outside Japan as their introduction to his mode of long-form thriller construction, and its standing in the global graphic novel critical conversation — as a work engaging seriously with post-War European history, ethical questions about medicine and responsibility, and the roots of violence in institutional structures — gives it a cross-cultural legibility that his more Japan-specific works do not quite achieve.`,
    tags: ['Monster', 'Naoki Urasawa', 'Big Comic Original', 'manga thriller', 'Madhouse', 'manga 1990s'],
    entities: ['Naoki Urasawa', 'Madhouse'],
    publishedAt: new Date('2026-03-04'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/monster-naoki-urasawa-greatest-work',
  },
  {
    title: 'Parasyte: The Alien Invasion Manga That Isn\'t About Aliens',
    slug: 'parasyte-alien-invasion-manga-not-about-aliens',
    category: 'manga',
    excerpt: 'Hitoshi Iwaaki\'s Parasyte ran from 1988 to 1995 and used alien parasites taking over human bodies to ask a simple, uncomfortable question: what actually separates humans from any other predator? The answer it finds is not reassuring.',
    content: `"Parasyte" ("Kiseijuu: Sei no Kakuritsu") by Hitoshi Iwaaki serialized in Monthly Afternoon from 1988 to 1995. Alien parasites arrive on Earth and burrow into humans through the ear canal, taking over the brain and using the host body as camouflage while hunting other humans for food. Shinichi Izumi is a high school student whose parasite, Migi, fails to reach his brain and instead settles in his right hand. The two are forced into an arrangement: Migi protects Shinichi from other parasites who would kill a human with a cohabiting but brain-independent parasite, while Shinichi provides Migi access to the world. The series uses this relationship to examine what separates humans from other predators, and whether the biological fact of being human constitutes a moral claim.

The central relationship between Shinichi and Migi is the series' primary achievement. Migi is initially without human feeling — rational, amoral, interested only in its own survival — but extended proximity to Shinichi and to human social life generates gradual development that neither character can fully articulate. Shinichi, conversely, undergoes a transformation in which the presence of Migi's tissue changes his biological makeup and begins to distance him from the emotional responses that connect him to the humans around him. The two move in opposite directions: Migi toward something resembling humanity, Shinichi toward something resembling Migi. The irony is structural and deliberate.

The ecological argument is the series' philosophical backbone. The parasites are predators; humans are also predators; the difference between them is one of scale and of the human capacity to construct moral frameworks that constrain predation within the species while permitting it against others. The series asks, without resolving, whether a species that has destroyed most of its ecological context while justifying the destruction through moral frameworks that don't apply to non-human life has a legitimate claim to be horrified by predators who simply treat humans as humans treat everything else.

The 2014 anime adaptation by Madhouse modernized the 1990s setting and was received as a faithful and technically accomplished adaptation. The character designs were updated, but the narrative and philosophical content were preserved with enough fidelity that manga readers found the adaptation satisfying. The anime's treatment of the more graphically violent content benefited from animation's ability to depict the parasites' physical transformations in motion, which the manga's still panels could suggest but not fully realize.

"Parasyte" is a shorter and more structurally contained work than most series discussed in these essays — eight collected volumes, a complete narrative. Everything it has to say is said in a bounded space, and the conclusion is the one the premise was always building toward.`,
    tags: ['Parasyte', 'Kiseijuu', 'Hitoshi Iwaaki', 'Monthly Afternoon', 'Madhouse', 'sci-fi manga'],
    entities: ['Hitoshi Iwaaki', 'Madhouse'],
    publishedAt: new Date('2026-03-06'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/parasyte-alien-invasion-manga-not-about-aliens',
  },
  {
    title: 'Fruits Basket: What It Knows About Family',
    slug: 'fruits-basket-what-it-knows-about-family',
    category: 'manga',
    excerpt: 'Fruits Basket ran from 1998 to 2006 and is one of the most serious examinations of intergenerational trauma and emotional abuse in shoujo manga. Its 2019 remake finally adapted the complete story, including the second half the original anime never reached.',
    content: `"Fruits Basket" by Natsuki Takaya serialized in Monthly Hana to Yume from 1998 to 2006, producing 23 collected volumes. The series follows Tohru Honda, an orphaned high school girl who comes to live with the Sohma family and discovers that members of the family transform into animals of the Chinese zodiac when embraced by a member of the opposite sex. The premise sounds comic — and was partly marketed as one — but the series it generates is one of the most serious examinations of intergenerational trauma, emotional abuse, and the question of whether people shaped by damaged families can build something different in shoujo manga.

The Sohma family's curse is the series' central metaphor, deployed with enough consistency that it accumulates meaning across the series rather than functioning as a single-use conceit. The curse as control mechanism — the family's head, Akito, maintains authority over the cursed family members through their physical isolation and emotional dependence — is a sustained examination of how abuse perpetuates itself through structures that the abused understand as care. The zodiac members' individual damage, and the specific forms of distortion their relationships with Akito have produced, are developed with enough psychological specificity that each character's arc feels like a distinct case study rather than a variation on a theme.

Tohru's character is the series' most debated element. Her consistent compassion — her tendency to extend understanding to people who have treated her badly, her refusal to protect herself at the cost of someone else's pain — can be read as idealized to the point of implausibility. Takaya is aware of this reading, and the series returns to it: Tohru's self-erasure is partly examined as a form of damage rather than simply as virtue, and her gradual development toward a sense of her own right to exist is one of the series' most quietly affecting arcs. Whether Takaya fully succeeds in making the compassion feel earned rather than given is a legitimate question; the seriousness with which the series treats the question is itself meaningful.

The 2019 remake anime, produced by TMS Entertainment and adapting the complete manga across three seasons, is the version most readers now encounter. The original 2001 anime adapted the first two-thirds without resolution, frustrating readers who had been following the series. The remake's fidelity to the complete text — including the manga's darker second half dealing with Akito's backstory and the mechanism of the curse's resolution — makes it the definitive adaptation and one of the best recent examples of a faithful manga-to-anime translation.`,
    tags: ['Fruits Basket', 'Natsuki Takaya', 'TMS Entertainment', 'shoujo manga', 'manga 1990s', 'anime 2019'],
    entities: ['Natsuki Takaya', 'TMS Entertainment'],
    publishedAt: new Date('2026-03-08'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/fruits-basket-what-it-knows-about-family',
  },
  {
    title: 'Assassination Classroom: The Manga That Earned Its Ending',
    slug: 'assassination-classroom-manga-earned-its-ending',
    category: 'manga',
    excerpt: 'Assassination Classroom ran in Weekly Shonen Jump from 2012 to 2016 with a premise designed to resolve in only one way. How Yusei Matsui handles that resolution — what the killing means and how the students process it — is what determines whether the preceding volumes add up.',
    content: `"Assassination Classroom" ("Ansatsu Kyōshitsu") by Yusei Matsui serialized in Weekly Shonen Jump from 2012 to 2016, producing 21 collected volumes. An octopus-like creature has destroyed most of the moon, announced that he will destroy the Earth within a year, and agreed to teach the bottom-ranked class of a junior high school while allowing — requiring — his students to attempt to assassinate him. The creature, named Korosensei by his students, moves at Mach 20, is immune to conventional weapons, and is simultaneously the best teacher any of them has ever had. The series is a comedy, a school drama, and, in its final chapters, one of the more emotionally effective endings in recent Jump serialization.

The premise's logic generates its thematic content with unusual tidiness. A teacher who will die at the end of the school year regardless of outcome has no motivation to manage students for his own convenience — no reason to hide who they are or dampen their capacities for institutional smoothness. Korosensei's teaching methods are specific to each student's needs rather than calibrated to a median, and the series depicts the bottom-ranked Class E developing competencies — combat, social intelligence, academic improvement, the specific skills of assassination — that the school's conventional structure had declared them incapable of. The extended metaphor of assassination-as-education (learning to understand someone deeply enough to find their weaknesses) is the organizing logic of both the comedy and the character development.

The students — a class of twenty-eight, each with distinct characterization — are the series' largest structural achievement. Maintaining character differentiation across that number of characters at weekly publication pace for four years is a technical accomplishment the series largely achieves. The moments when individual students' arcs reach resolution — their assassination attempts, their academic developments, their growing understanding of what Korosensei is actually teaching them — are distributed across the run with enough frequency that the cast never feels neglected despite its size.

The series' final arc requires the premise's logic to follow through on what it has always implied: Korosensei will die, and the class will be the agents of that death. How Matsui handles this resolution — what the killing means, how the students process it, and what the series ultimately says about the relationship between teacher and students — is the work's most significant test and the element that determines whether the preceding volumes add up to what they promised.

The ending earns the preceding content. That is not as common in Jump serialization as it should be, and it is worth saying plainly.`,
    tags: ['Assassination Classroom', 'Yusei Matsui', 'Weekly Shonen Jump', 'manga 2010s', 'school manga', 'comedy manga'],
    entities: ['Yusei Matsui'],
    publishedAt: new Date('2026-03-10'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/assassination-classroom-manga-earned-its-ending',
  },
  {
    title: 'That Time I Got Reincarnated as a Slime: The Optimistic Isekai',
    slug: 'that-time-reincarnated-slime-optimistic-isekai',
    category: 'light-novels',
    excerpt: 'Tensura is not interested in suffering as characterization. Its power fantasy is unusually specific: not combat dominance but administrative competence — being the person who builds something good through intelligence and preparation rather than through violence.',
    content: `"That Time I Got Reincarnated as a Slime" ("Tensei Shitara Slime Datta Ken") by Fuse began as a web novel in 2013, was published as a light novel from 2014, and was adapted into anime by 8-Bit in 2018. The series follows Satoru Mikami, a 37-year-old office worker who is stabbed to death and reincarnated in a fantasy world as a slime with an unusual ability to absorb and replicate the abilities of anything it consumes. The slime names itself Rimuru Tempest, befriends a dragon, becomes the leader of a community of monsters, and proceeds to build a stable multicultural society while forming alliances with increasingly powerful factions.

The tonal distinction from darker isekai — Re:Zero, Mushoku Tensei — is immediate and intentional. "Tensura" is not interested in suffering as characterization or in the costs of violence as thematic material. Its protagonist is competent from the beginning, his alliances generally succeed, the monsters he leads are given agency and warmth, and the series' satisfactions are primarily the satisfactions of watching a well-organized person building something good. The power fantasy is unusually specific: not fantasy of combat dominance but of administrative competence — of being the person who can organize a city, manage competing interests, and solve problems through intelligence and preparation rather than through violence.

The monster community — the city of Tempest, built by Rimuru for the monsters who have aligned with him — is the series' most appealing element. The characters who populate it, from the goblin leaders to the Ogre warriors to the various beings who join across the series, are developed with enough individuality that the city functions as a community rather than a backdrop. The series is genuinely interested in what it would take to build a stable society from scratch, and the nation-building content — trade agreements, defensive alliances, social organization — is developed with more specificity than most isekai attempts.

The series' length reflects a readership that finds the optimistic isekai formula as renewable as the darker alternatives. The "build something rather than just survive something" structure can sustain across many volumes because there is always more to build, more alliances to form, more problems that a competent protagonist with good values and useful abilities can solve.

"Tensura" sits at the other end of the isekai spectrum from Re:Zero and Mushoku Tensei and is not trying to be them. It is trying to be the fantasy of competence and community-building done well, and within those terms it largely succeeds.`,
    tags: ['That Time I Got Reincarnated as a Slime', 'Tensura', 'Fuse', 'isekai', 'light novels', '8-Bit anime'],
    entities: ['Fuse'],
    publishedAt: new Date('2026-03-12'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/that-time-reincarnated-slime-optimistic-isekai',
  },
  {
    title: 'Tokyopop and the 2000s Manga Boom in the West',
    slug: 'tokyopop-2000s-manga-boom-west',
    category: 'industry',
    excerpt: 'In 2001, Tokyopop adopted unflipped pages and a $9.99 price point and changed how manga reached English-speaking readers. What followed was a genuine cultural mainstreaming of manga — and a collapse that reshaped the industry for a decade afterward.',
    content: `In 2001, Tokyopop — a Los Angeles-based publisher founded by Stu Levy in 1996 — made two decisions that changed how manga reached English-speaking readers: it adopted the "100% Authentic Manga" format (right-to-left reading, unflipped pages, smaller trim size) and implemented a $9.99 price point for single volumes. Previous manga translation in the United States had "flipped" pages to read left-to-right, altering artwork composition and requiring text redraws; Tokyopop's decision to preserve original reading direction treated manga as a format with its own conventions rather than a variant of American comics. The lower price point opened a mass-market audience that the $15–20 price of previous releases had excluded.

What followed between 2001 and 2007 was the American manga boom: a period in which manga volumes became a significant presence in mainstream bookstores — Borders, Barnes & Noble, Walmart — rather than specialty comic shops, in which annual manga sales grew from under $50 million to over $200 million in the US market, and in which properties like "Fruits Basket," "Naruto," "Fullmetal Alchemist," and "Inuyasha" achieved bestseller status. The boom represented a genuine cultural mainstreaming of manga as a format, driven partly by anime's simultaneous presence on Cartoon Network's Toonami block, which had introduced the properties that readers were now seeking in print.

Tokyopop's role in the boom included both commercially successful licensed titles and an initiative — the "Rising Stars of Manga" contest and subsequent "OEL" (Original English Language) manga program — that attempted to develop Western creators working in manga-influenced styles. The OEL program was commercially unsuccessful and generated criticism from Japanese publishers who objected to the use of the manga label for non-Japanese work, but it represented a genuine attempt to determine whether the format had cross-cultural viability as a creative mode rather than simply as a distribution channel for Japanese content.

The boom ended between 2007 and 2009, driven by a combination of market saturation, the 2008 financial crisis's effect on discretionary spending, the rise of scanlation providing free access to unlicensed titles, and Tokyopop's own contractual problems with publishers and creators. Tokyopop ceased North American publishing operations in 2011. The manga market subsequently stabilized at a lower level, consolidated around fewer publishers — Viz Media, Kodansha USA, Yen Press — and was revived in the mid-2010s by digital platforms and Crunchyroll's simulcast model creating anime audiences who sought source manga.

The boom and its collapse are the most significant event in the history of manga publishing in English, and their lessons about format accessibility, price points, and the relationship between anime viewership and manga readership continued to shape industry decisions for a decade after Tokyopop's exit.`,
    tags: ['Tokyopop', 'manga boom', 'manga industry', 'manga localization', 'Western manga', 'manga 2000s'],
    entities: ['Tokyopop', 'Viz Media', 'Kodansha USA'],
    publishedAt: new Date('2026-03-14'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/tokyopop-2000s-manga-boom-west',
  },
  {
    title: 'Joe Hisaishi: The Composer Who Gave Studio Ghibli Its Sound',
    slug: 'joe-hisaishi-composer-studio-ghibli-sound',
    category: 'industry',
    excerpt: 'Joe Hisaishi has composed the scores for almost every major Studio Ghibli film across forty years. The emotional landscape of Ghibli\'s films is inseparable from what he brought to them. Great film music is heard and not consciously noticed — Hisaishi\'s scores are, by this measure, the most successful film music of the last forty years.',
    content: `Joe Hisaishi has composed the scores for almost every major Studio Ghibli film: "Nausicaä of the Valley of the Wind" (1984), "Castle in the Sky" (1986), "My Neighbor Totoro" (1988), "Kiki's Delivery Service" (1989), "Porco Rosso" (1992), "Princess Mononoke" (1997), "Spirited Away" (2002), "Howl's Moving Castle" (2004), "Ponyo" (2008), "The Wind Rises" (2013), and "The Boy and the Heron" (2023). The list spans forty years of collaboration, and the emotional landscape of Ghibli's films is inseparable from what Hisaishi has brought to them. To identify what Ghibli sounds like is to identify what Hisaishi sounds like.

Hisaishi's compositional approach draws on classical European film scoring traditions while incorporating elements from minimalism and Japanese musical culture. His most characteristic work uses sustained melodic lines over relatively simple harmonic structures, trusting the melody to carry emotional weight that busier arrangements would distribute across more elements. The theme from "My Neighbor Totoro" — a melody the film states and then returns to in various contexts — is among the most emotionally immediate pieces of film music ever written, and its simplicity is the source of its power rather than a limitation of it.

The collaborative relationship between Hisaishi and Miyazaki is long enough and close enough that attributing specific musical choices entirely to either is impossible. Miyazaki has been involved in the emotional specification of scores — what a sequence should feel like, what emotional register a transition should produce — and Hisaishi has shaped the timing and pacing of scenes around his musical ideas. The collaboration is closer to co-authorship than to a director using a hired composer, and the quality of both men's work in the partnership exceeds what either has produced most frequently in other contexts.

The "Princess Mononoke" score is perhaps Hisaishi's most ambitious Ghibli achievement. The film's subject — ecological conflict with no easy resolution — required music that could hold opposing forces without resolving them into a simple emotional register. Hisaishi's approach — combining orchestral weight with Japanese instruments, maintaining melodic beauty within harmonic complexity — produced a score that functions as its own argument about the film's themes rather than simply illustrating them.

Great film music is heard and not consciously noticed; it shapes the emotional experience of watching without drawing attention to itself as craft. Hisaishi's scores for Ghibli are, by this measure, the most successful film music of the last forty years: integral to the experience of the films in a way that makes them inextricable, felt by audiences who could not name the composer, and immediately recognizable once identified as the sound of a specific studio's emotional world.`,
    tags: ['Joe Hisaishi', 'Studio Ghibli', 'anime music', 'film composer', 'My Neighbor Totoro', 'Princess Mononoke'],
    entities: ['Joe Hisaishi', 'Studio Ghibli', 'Hayao Miyazaki'],
    publishedAt: new Date('2026-03-16'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/joe-hisaishi-composer-studio-ghibli-sound',
  },
];

async function main() {
  console.log(`Seeding ${ESSAYS.length} essays (batch 9)...`);
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
        content: essay.content,
        titleBs: null,
        contentBs: null,
        excerptBs: null,
        imageUrl: null,
        source: essay.source,
        sourceUrl: essay.sourceUrl,
        publishedAt: essay.publishedAt,
        published: true,
        displayLang: 'en',
        tags: essay.tags,
        entities: essay.entities,
        views: 0,
      },
    });
    created++;
    console.log(`  ✓ ${essay.title}`);
  }

  console.log(`\nDone. Created: ${created}, Skipped (already exist): ${skipped}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
