/**
 * Eleventh batch of editorial essays.
 * Run with: npx tsx scripts/seed-essays-11.ts
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ESSAYS = [
  {
    title: 'Osamu Tezuka: The God of Manga',
    slug: 'osamu-tezuka-god-of-manga',
    category: 'manga',
    excerpt: 'Osamu Tezuka invented the visual language of manga, defined its storytelling conventions, and produced a body of work across forty years that no single creator in any medium has matched in range or volume. He is the reason manga exists in its current form.',
    content: `Osamu Tezuka was born in 1928, published his first manga in 1946, and died in 1989 at the age of 60 â€” having produced an estimated 150,000 pages of manga across his career, in addition to hundreds of animated films and series. The volume is almost incomprehensible, and the quality across it is uneven in the way that any forty-year body of work at that pace would be. What is not uneven is the influence: Tezuka invented the visual and narrative conventions of manga as it now exists, trained or directly inspired the generation of creators who built the industry around them, and produced, in the interstices of the commercial work that paid his studio's overhead, a series of personal works â€” "Phoenix," "Black Jack," "Buddha," "Adolf" â€” that constitute the most ambitious artistic project in the medium's history.

The foundation of Tezuka's visual style was Disney. He saw "Bambi" and "Fantasia" as a child during the American occupation of Japan, when Disney films were among the few foreign cultural products available, and the large-eyed, expressive character design that became the template for all subsequent manga derives from his synthesis of Disney's animation conventions with Japanese literary cartooning. This is not imitation â€” Tezuka transformed what he absorbed into something that Disney never produced and that no animator working in the Disney tradition subsequently developed. The large eyes that are now the most immediately recognizable visual signature of anime and manga originated in Tezuka's synthesis of an American influence with his own formal intelligence.

"Astro Boy" (1952â€“1968) and "Kimba the White Lion" (1950â€“1954) established Tezuka's commercial reach and introduced the narrative conventions â€” sustained storylines, character development across episodes, emotional stakes that carried between chapters â€” that distinguished manga from the episodic comic strips that preceded it. "Black Jack" (1973â€“1983), his most commercially successful later work, is a series of medical mystery stories about an unlicensed surgeon who charges exorbitant fees for operations that no one else can perform â€” and who uses those fees to fund treatment for patients who cannot pay. The series is simultaneously a genre exercise and a sustained examination of medical ethics, the commodification of healthcare, and the specific arrogance and compassion that medicine simultaneously requires.

"Phoenix" ("Hi no Tori") is Tezuka's acknowledged masterpiece and, by his own account, the work he spent his entire career trying to complete. The series â€” composed of independent arcs set in different historical periods, all connected by the appearances of the immortal Phoenix whose blood grants eternal life â€” spans human history from prehistoric times to the far future and asks, across its connected arcs, what it means to live and die, what continuity means across generations, and whether human beings are capable of learning from the costs their history has already paid. Tezuka died before completing it; the arcs that exist constitute one of the most ambitious works of graphic narrative ever attempted, and their incompleteness is the most significant unfinished work in manga history.

The "god of manga" designation, which Tezuka himself reportedly found uncomfortable, reflects what the Japanese comics industry owes him: not just the visual language and the narrative conventions but the cultural legitimacy â€” the claim that manga was a form serious enough for adult engagement and for serious artistic ambition. Every creator discussed in these essays is working in a tradition he established.`,
    tags: ['Osamu Tezuka', 'Astro Boy', 'Black Jack', 'Phoenix manga', 'manga history', 'god of manga'],
    entities: ['Osamu Tezuka'],
    publishedAt: new Date('2026-04-25'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/osamu-tezuka-god-of-manga',
  },
  {
    title: 'Pluto: Naoki Urasawa\'s Astro Boy Reimagining',
    slug: 'pluto-naoki-urasawa-astro-boy-reimagining',
    category: 'manga',
    excerpt: 'Pluto takes a single arc from Osamu Tezuka\'s Astro Boy â€” the Greatest Robot on Earth â€” and retells it as a story about the aftermath of war, the politics of hatred, and whether machines that can feel grief can be said to have human rights. It is the most respectful and most transformative homage in manga history.',
    content: `"Pluto" by Naoki Urasawa and Takashi Nagasaki, produced with the authorization of the Tezuka estate, serialized in Big Comic Original from 2003 to 2009, producing eight collected volumes. The work adapts "The Greatest Robot on Earth" arc from Osamu Tezuka's "Astro Boy" â€” in which the world's most powerful robots are hunted and destroyed one by one â€” retelling it from the perspective of Gesicht, a European robot detective investigating the murders, rather than from Astro Boy's perspective. The transformation is total: what was an action-adventure arc for children becomes a political thriller about the aftermath of a war that closely parallels the Iraq War, and about the nature of hatred, grief, and what it means to be conscious and mortal.

Urasawa's formal intelligence in adapting a children's manga is the work's primary achievement. He preserves the major plot points of Tezuka's arc â€” the sequence of robots who are killed, the mystery of the antagonist, the resolution involving Pluto himself â€” while filling the spaces between those points with political and psychological content that the original's audience and format did not require. The robots in Urasawa's version feel pain, grieve, dream, and are capable of hatred â€” which transforms the question of their destruction from an action narrative about power into an ethical inquiry about what destroys a mind and whether a mind that can be destroyed is owed the same protections as a human one.

The war in the background â€” a robot-assisted conflict in which the strongest robots were deployed to end a human war â€” is unmistakably derived from the Iraq War's political context, and the consequences for both the deployed robots and the population of the "defeated" country are depicted with a political seriousness unusual for manga drawing on a children's source. The robots that participated in the war are damaged by it in ways that parallel combat trauma; the human survivors of the occupied country carry a specific hatred that the narrative traces to its origins without excusing its consequences.

Tezuka's "Astro Boy" ends its arc with the original optimism of a children's story: evil is defeated, the world is safer. Urasawa's "Pluto" ends with a more complicated resolution that honors Tezuka's emotional commitments while refusing his narrative simplifications. The final sequence â€” which depends on the reader's knowledge of Tezuka's version for its full impact â€” is one of manga's most moving examples of a work achieving its emotional effect through dialogue with its source rather than through independent construction.

The 2023 Netflix anime adaptation, produced by Studio M2, was among the year's most ambitious anime productions, preserving Urasawa's deliberate pacing and using the animated format to realize the scale of the work's most visually ambitious sequences.`,
    tags: ['Pluto', 'Naoki Urasawa', 'Astro Boy', 'Big Comic Original', 'manga adaptation', 'robot manga'],
    entities: ['Naoki Urasawa', 'Osamu Tezuka'],
    publishedAt: new Date('2026-04-27'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/pluto-naoki-urasawa-astro-boy-reimagining',
  },
  {
    title: 'Bleach: The Soul Society Arc and the Long Road to a Finished Story',
    slug: 'bleach-soul-society-arc-long-road-finished-story',
    category: 'manga',
    excerpt: 'Bleach\'s Soul Society arc is one of the most acclaimed extended sequences in shonen history. The series then spent years losing what made that arc work. The Thousand-Year Blood War anime adaptation, arriving in 2022, finally gave the manga\'s finale the production quality it deserved â€” and demonstrated that the ending was better than its reputation.',
    content: `Tite Kubo serialized "Bleach" in Weekly Shonen Jump from 2001 to 2016, with the anime running from 2004 to 2012 before going on hiatus as it caught up to the manga. The series follows Ichigo Kurosaki, a teenager with the ability to see ghosts who accidentally acquires the powers of a Soul Reaper â€” a death god tasked with guiding souls to the afterlife and fighting Hollows, the malevolent spirits that threaten them. The first two arcs established a world of unusual visual richness and tonal confidence; the Soul Society arc, in which Ichigo infiltrates the Soul Reapers' home realm to rescue a wrongly condemned friend, is one of the most well-constructed extended sequences in shonen history.

The Soul Society arc works for reasons that are worth identifying precisely. The antagonists â€” the Thirteen Court Guard Squads, each led by a captain with a distinct fighting style and personality â€” are introduced in sequence, each with enough characterization to feel like a genuine obstacle rather than a placeholder. The arc's central mystery â€” why Rukia was condemned, who authorized her execution, what the Soul Society is concealing â€” is constructed with enough layering that its revelation reframes what the reader understood about the preceding chapters. And Byakuya Kuchiki, Rukia's adoptive brother and the arc's primary antagonist, is developed with enough moral complexity that his defeat feels like a genuine dramatic resolution rather than a simple villain elimination.

The Arrancar and Hueco Mundo arcs that followed maintained the series' quality while expanding its world. The Aizen reveal â€” which retroactively recontextualized the Soul Society arc's conspiracy â€” is one of shonen manga's most carefully prepared plot twists. But the Fullbring arc and the extended Quincy arc that concluded the manga's original run were received as declining in the specific quality that made the Soul Society arc work: the construction of antagonists as individuals rather than as power-level representatives, and the management of a large cast with enough attention that each character's function felt earned.

The Thousand-Year Blood War arc's anime adaptation, produced by Pierrot with significantly improved production values and beginning in 2022, reintroduced the series to a generation of viewers who had heard about its decline and gave long-term fans their first opportunity to see the manga's final arc realized in animation. The adaptation demonstrated that the Quincy arc â€” whatever its weaknesses relative to the Soul Society peak â€” contained genuine creative ambitions that the original anime's cancellation had prevented from reaching an animated audience. The visual realization of Yhwach's Quincy mythology, and the final confrontation between Ichigo and the series' ultimate antagonist, arrived with enough craft to constitute a genuine conclusion to a series whose reputation had been defined by its middle rather than its ending.`,
    tags: ['Bleach', 'Tite Kubo', 'Soul Society arc', 'Weekly Shonen Jump', 'Thousand-Year Blood War', 'Pierrot'],
    entities: ['Tite Kubo', 'Pierrot'],
    publishedAt: new Date('2026-04-29'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/bleach-soul-society-arc-long-road-finished-story',
  },
  {
    title: 'Beastars: Paru Itagaki\'s Animal Allegory',
    slug: 'beastars-paru-itagaki-animal-allegory',
    category: 'manga',
    excerpt: 'Beastars serialized in Weekly ShÅnen Champion from 2016 to 2020 and used an anthropomorphic animal world to examine desire, predation, discrimination, and adolescence with a sophistication that its premise does not initially suggest. Paru Itagaki is Tezuka\'s daughter, and the family resemblance is in the ambition.',
    content: `"Beastars" by Paru Itagaki serialized in Weekly ShÅnen Champion from 2016 to 2020, producing 22 collected volumes. The series is set in a world of anthropomorphic animals where carnivores and herbivores coexist under social rules that suppress predation â€” but suppress it rather than eliminate it, generating an underground economy of illegal meat and a social tension that the surface rules cannot fully contain. The protagonist, Legoshi, is a large grey wolf who falls in love with Haru, a small white rabbit, and the series uses this relationship to examine desire, the social construction of danger, and the question of whether instinct and identity are the same thing.

The allegorical content is readable â€” the carnivore/herbivore divide maps onto racial and class dynamics, the underground meat market onto prohibited desire, the social performance of harmlessness onto the specific labor demanded of those who are perceived as dangerous â€” but the series does not reduce to its allegory. The characters' specific animal natures are not simply costumes over human psychology; Legoshi's carnivore instincts are presented as real, as part of who he is rather than a social construction, and the series is interested in the ethical question of what it means to be constituted partly by appetites that harm others. The resolution it works toward is not the elimination of instinct but the development of a self that can hold instinct without being controlled by it.

Paru Itagaki is Osamu Tezuka's granddaughter through adoption â€” her father, Fuyumi Soryo's former collaborator Takashi Itagaki, was adopted by Tezuka's family â€” and the family context is mentioned not as genealogical curiosity but because the ambition of "Beastars" is recognizably in the tradition of Tezuka's use of animal characters to examine human social structures. Where Tezuka's "Kimba the White Lion" used its animal world to make arguments about colonialism and nature, "Beastars" uses a contemporary high school setting to examine the specific forms that discrimination and desire take when they are structurally embedded rather than individual.

The Netflix anime adaptation by Orange, produced in CGI that proved surprisingly effective at conveying the series' emotional content, was one of the more acclaimed anime of its seasons. Orange's CGI approach â€” different from the flatter CGI that anime had historically used, influenced by stop-motion aesthetics in its character movement â€” gave the series a visual texture that supported rather than undermined the material.`,
    tags: ['Beastars', 'Paru Itagaki', 'Weekly ShÅnen Champion', 'Orange studio', 'animal manga', 'Netflix anime'],
    entities: ['Paru Itagaki', 'Orange'],
    publishedAt: new Date('2026-05-01'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/beastars-paru-itagaki-animal-allegory',
  },
  {
    title: 'Land of the Lustrous: The Manga That Broke Its Own World',
    slug: 'land-of-the-lustrous-manga-broke-its-own-world',
    category: 'manga',
    excerpt: 'Land of the Lustrous by Haruko Ichikawa began in 2012 as a visually striking manga about gem-people fighting lunar invaders and became something stranger: a long meditation on identity, impermanence, and what happens to a self that has been revised too many times. The 2017 CGI anime captures the early volumes. The manga goes further.',
    content: `"Land of the Lustrous" ("Houseki no Kuni") by Haruko Ichikawa serialized in Monthly Afternoon from 2012 and continues. The series is set in a far future where the Earth is inhabited by gem-people â€” living crystalline beings who fight off repeated attacks by the Lunarians, mysterious beings who descend from the moon to shatter the gems and use their fragments as decorations. The protagonist, Phosphophyllite, is the weakest and most brittle gem, assigned to chronicle the world's history because their fragility makes them useless in combat. The premise is visually imaginative and the early volumes are among the most visually distinctive manga of the 2010s. The later volumes are among the most emotionally demanding.

Ichikawa's visual style â€” thin precise lines, detailed crystalline textures, the specific way light moves through gem bodies â€” is immediately distinctive and perfectly calibrated to the subject. The gem-people are not human-shaped in the way that most fantasy beings are; they have the specific visual properties of their mineral origins, and the series' action sequences use those properties: when a gem is shattered, the fragments are still conscious, and the regeneration from fragments â€” or the failure to recover all the pieces â€” generates the series' primary form of permanent damage.

The turn the series takes â€” in which Phos gradually trades their original materials for more powerful substances, losing pieces of their original self with each trade, while the social world around them transforms in response to revelations about the Lunarians' origins and the nature of the gem-people's existence â€” produces a narrative of identity erosion that has no equivalent in other manga. Phos at the series' late stages is not the same person who appeared in the early volumes in any meaningful sense: the trades have changed the body, the memories have been fragmentary and inconsistently recovered, and the decisions made in an earlier state of self cannot be fully claimed by the current one. The series asks, without resolving, at what point accumulated change becomes replacement rather than development.

The 2017 anime adaptation by Orange used CGI to render the gem-people's crystalline bodies in a way that hand-drawn animation could not achieve, and the visual achievement was widely acknowledged as among the most successful uses of CGI in anime. The adaptation covered the manga's first several arcs before the narrative transformed into its more difficult later content â€” making it an effective entry point that does not prepare the viewer for where the manga goes.`,
    tags: ['Land of the Lustrous', 'Haruko Ichikawa', 'Monthly Afternoon', 'Orange studio', 'CGI anime', 'manga ongoing'],
    entities: ['Haruko Ichikawa', 'Orange'],
    publishedAt: new Date('2026-05-03'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/land-of-the-lustrous-manga-broke-its-own-world',
  },
  {
    title: 'Love Live and the Idol Anime Genre',
    slug: 'love-live-idol-anime-genre',
    category: 'anime',
    excerpt: 'Love Live launched as a multimedia franchise in 2010 and became the defining idol anime of the 2010s. Its combination of group performance, fan voting that determined which characters appeared on covers, and an anime that committed to its ensemble generated a cultural model that THE iDOLM@STER, Aikatsu, and their successors all operate within.',
    content: `"Love Live! School Idol Project" launched as a multimedia franchise in 2010 â€” simultaneously a manga in Dengeki G's Comic, a music project releasing character songs, and an interactive element that allowed fans to vote for which characters would be featured on magazine covers. The anime adaptation, produced by Sunrise in 2013, took this accumulated character investment and built a story around nine high school girls forming a school idol group to save their school from closure. The franchise became one of the most commercially successful in anime history and defined the cultural model for the idol anime genre's second wave.

The idol anime genre has a longer history than Love Live â€” "THE iDOLM@STER" originated as an arcade game in 2005 and generated anime from 2011 onward, and various idol-adjacent anime had existed throughout the medium's history â€” but Love Live's specific contribution was the synthesis of participatory franchise mechanics with conventional anime storytelling. The fan voting element, which gave the audience a sense of investment in the characters before the anime began, was carried into the anime's production process: the franchise's success created a relationship between the music releases, the live concerts performed by the voice actresses, and the anime narrative that made each element reinforce the others rather than existing independently.

The Love Live model â€” a group of girls forming an idol unit, each member designed to appeal to a specific demographic within the fanbase, competing in a national competition â€” was formalized enough that subsequent idol anime (Love Live! Sunshine!!, Love Live! Nijigasaki High School Idol Club, BanG Dream!, Idolish7) operate within its structural template. The variations between franchises are primarily in setting and character emphasis rather than in fundamental approach, which reflects the genre's commercial logic: the template works, and the market for alternatives to it is smaller than the market for refinements of it.

The voice actress performances at live concerts â€” where the women who voice the characters perform the characters' songs on stage â€” are a specific form of parasocial investment that the idol anime genre uniquely enables. The overlap between the fictional character's fan appeal and the real person's public presence creates a fandom ecosystem that is more emotionally complex than standard anime fandom, involving the specific pleasures and pressures of following real performers through the lens of fictional characters they embody.

The genre's relationship to the real Japanese idol industry â€” where actual young women perform in similar group structures under conditions that have been criticized for being exploitative â€” is one of the more uncomfortable questions that the idol anime genre's commercial success does not answer.`,
    tags: ['Love Live', 'idol anime', 'Sunrise', 'school idol', 'anime franchise', 'THE iDOLM@STER'],
    entities: ['Sunrise'],
    publishedAt: new Date('2026-05-05'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/love-live-idol-anime-genre',
  },
  {
    title: 'Eureka Seven: Bones\' Coming-of-Age Mecha Masterpiece',
    slug: 'eureka-seven-bones-coming-of-age-mecha-masterpiece',
    category: 'anime',
    excerpt: 'Eureka Seven aired 50 episodes from 2005 to 2006 and used its mecha framework to tell a coming-of-age story about a boy who learns that the world is more complicated than he was told and that loving someone means accepting who they actually are rather than who you needed them to be.',
    content: `"Eureka Seven" was produced by Bones and directed by Tomoki Kyoda, airing 50 episodes from April 2005 to April 2006. The series follows Renton Thurston, a 14-year-old boy who lives with his mechanic grandfather in a backwater town and dreams of joining the countercultural group Gekkostate, whose members surf the atmosphere on "trapar" waves using mecha called LFOs. When Eureka, a mysterious girl piloting the iconic Nirvash LFO, crashes into his grandfather's garage, Renton joins Gekkostate and begins to understand that the world he was told about â€” and the people he has idealized â€” are more complicated than his adolescent imagination had allowed.

The series' visual identity is inseparable from its countercultural aesthetic. The Gekkostate members dress in clothing derived from 1990s and 2000s alternative culture â€” surf, skate, hip-hop â€” and the mecha themselves move with a physical freedom derived from surfing, which distinguishes them visually and conceptually from the military precision of most mecha. The trapar-wave surfing as a visual metaphor for freedom and as the setting for the series' action sequences is one of the most distinctive choices in mecha anime history, and Bones' animation quality in realizing the aerial sequences is among the studio's finest work.

The central relationship between Renton and Eureka is the series' emotional engine. Eureka is a Coralian â€” an entity whose origins in the alien life form that constitutes the planet's ecosystem are gradually revealed â€” and her inability to fully understand or express human emotion generates a specific form of the coming-of-age dynamic: Renton must learn to love someone who is different from him in ways that are fundamental rather than superficial, and to accept her as she actually is rather than as the idealized figure his adolescent attachment initially constructed. The series is patient with this development in ways that fifty episodes permit and that shorter works cannot.

The series' middle section â€” dealing with the consequences of Renton's initial disillusionment with Gekkostate's reality versus its image â€” is the most demanding and the most rewarding. Renton's departure from the group and the experiences that follow constitute a coming-of-age narrative in miniature, and his return is a return changed by what he has learned rather than a reversal to the starting condition.

"Eureka Seven" is Bones at its most ambitious: a series that uses the mecha genre's resources â€” scale, spectacle, the resonance of piloted machines â€” to tell a story that is primarily about the interior development of its protagonist.`,
    tags: ['Eureka Seven', 'Bones', 'Tomoki Kyoda', 'mecha anime', 'anime 2005', 'coming-of-age anime'],
    entities: ['Bones'],
    publishedAt: new Date('2026-05-07'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/eureka-seven-bones-coming-of-age-mecha-masterpiece',
  },
  {
    title: 'Darling in the FranXX: The Mecha Anime That Divided Everyone',
    slug: 'darling-in-the-franxx-mecha-anime-divided-everyone',
    category: 'anime',
    excerpt: 'Darling in the FranXX was co-produced by Studio Trigger and A-1 Pictures in 2018, combining two studios whose different cultures produced an anime that was compelling for most of its run and controversial for its ending. It is the most instructive recent case study in what happens when a mecha anime loses confidence in its own premise.',
    content: `"Darling in the FranXX" was co-produced by Studio Trigger and CloverWorks (the A-1 Pictures sub-studio) in 2018, directed by Atsushi Nishigori with character designs by Masayoshi Tanaka. The series follows Hiro, a failed pilot in a post-apocalyptic world where adolescents are trained to pilot mecha called FranXX in male-female pairs, and Zero Two, a mysterious girl with Klaxosaur (alien) blood who is known for consuming her partners. The combination of the elaborate paired-piloting mechanic â€” loaded with physical and emotional intimacy â€” and the series' dystopian coming-of-age story generated an intensely engaged viewership for most of its 24-episode run.

The first half of the series is genuinely excellent. The paired-piloting conceit â€” in which the female partner's emotional state is directly expressed through the mecha's performance, which the male partner must manage while they share an unusual intimacy â€” generates narrative content that is simultaneously about mecha combat and about the specific awkwardness of adolescent bodies and adolescent relationships. The children of Squad 13, each with a distinct pairing dynamic, are developed with enough individuality that the ensemble functions as a genuine community rather than a set of types. Zero Two's dangerous reputation, her relationship with Hiro, and the mysteries of her background are managed across the first half with enough care to sustain the viewer's investment through the revelations.

The second half's pivot to cosmological stakes â€” an expanded conflict with the alien Klaxosaur civilization, a reveal about the organization that manages the children, and a final arc that extends the story beyond Earth â€” was received by much of the audience as abandoning the specific human drama that had generated the series' appeal in favor of genre plot mechanics that the series was not constructed to support. The final episodes' ambitions are clear; the execution was divisive. The ending sacrifices the relationship between Hiro and Zero Two â€” the series' emotional center â€” for a resolution whose scale does not match what the preceding episodes had built.

The co-production between Trigger and CloverWorks generated speculation about whether the tonal inconsistency of the second half reflected the difficulty of managing two studios' creative cultures across a single production. Both studios have produced excellent work independently; the combination in "FranXX" produced something that was more than the sum of its parts in its first half and less in its second. It remains, for its first half, one of the decade's more interesting mecha anime.`,
    tags: ['Darling in the FranXX', 'Studio Trigger', 'CloverWorks', 'mecha anime', 'anime 2018', 'Zero Two'],
    entities: ['Studio Trigger', 'CloverWorks'],
    publishedAt: new Date('2026-05-09'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/darling-in-the-franxx-mecha-anime-divided-everyone',
  },
  {
    title: 'Korean Manhwa and the Webtoon Challenge to Manga',
    slug: 'korean-manhwa-webtoon-challenge-manga',
    category: 'industry',
    excerpt: 'Korean webtoons â€” vertically scrolling digital comics optimized for smartphone reading â€” have built a global audience that rivals manga\'s international readership. Solo Leveling\'s anime adaptation in 2024 was the first major demonstration that manhwa could generate the same anime-to-source-material pipeline that manga has used for decades.',
    content: `Korean webtoons â€” comics published digitally in vertical scrolling format, optimized for smartphone reading â€” have built a global audience that, by some measures, rivals manga's international readership. The major Korean platforms: LINE Webtoon (launched 2014 internationally), Kakao Page, and Naver Webtoon together host hundreds of thousands of titles and have generated billions in revenue. The format's design choices â€” no panel layouts, continuous vertical scrolling, color as standard rather than exception â€” reflect the smartphone as the primary reading device rather than the printed page, and these choices produce a reading experience that is fundamentally different from manga.

The difference is not simply cosmetic. Manga's panel layout â€” the management of page space across multiple panels, the use of the gutter between panels as narrative space, the relationship between spread layouts and individual moments â€” is a formal language that took decades to develop and that the best manga uses with sophisticated intentionality. The webtoon's continuous scroll eliminates the page as a unit of meaning, which removes the specific formal possibilities that manga's page-based structure enables while adding different ones: the reveal through scrolling, the use of long vertical sequences for time and scale, the specific pacing that scrolling speed allows.

"Solo Leveling," by Chugong, is the manhwa that most dramatically demonstrated the format's international commercial potential. Originally a web novel, adapted into manhwa illustrated by DUBU (Jang Sung-rak) on KakaoPage from 2018 to 2021, the series follows a weak hunter â€” the lowest rank in a world where people develop supernatural abilities to fight dungeon monsters â€” who gains an ability to grow infinitely stronger. The series' fantasy premise, its clean visual presentation, and its core power fantasy were globally accessible in ways that made it the most-read manhwa internationally before its anime adaptation. The 2024 anime adaptation by A-1 Pictures was among the year's most-watched, demonstrating that the manga-to-anime pipeline was replicable for manhwa that had developed sufficient international recognition.

The Japanese manga industry's response to the webtoon challenge has been cautious but observable. Major publishers have begun releasing vertical scroll versions of existing manga for digital platforms and have started developing original webtoon-format content. Whether the two formats will develop in parallel, merge, or see one displace the other depends on market forces that are still in motion. What is clear is that the assumption that manga has a natural monopoly on the graphic narrative form in East Asian culture is no longer defensible.`,
    tags: ['manhwa', 'webtoon', 'Solo Leveling', 'Korean comics', 'manga industry', 'LINE Webtoon'],
    entities: ['LINE Webtoon', 'Naver'],
    publishedAt: new Date('2026-05-11'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/korean-manhwa-webtoon-challenge-manga',
  },
  {
    title: 'Dororo: Tezuka\'s Dark Samurai Manga and Its 2019 Remake',
    slug: 'dororo-tezuka-dark-samurai-manga-2019-remake',
    category: 'manga',
    excerpt: 'Tezuka\'s Dororo serialized in 1967 and 1968 about a samurai warrior born without body parts â€” sold to 48 demons by his father in exchange for power â€” who must defeat each demon to reclaim his body. The 2019 MAPPA anime proved that the premise had lost none of its moral and emotional force over fifty years.',
    content: `"Dororo" by Osamu Tezuka serialized in ShÅnen Sunday from August 1967 to July 1968, producing 4 collected volumes before Tezuka ended it, dissatisfied with reader response. The series follows Hyakkimaru, a samurai warrior who was born without eyes, ears, nose, skin, or limbs â€” his father, Daigo Kagemitsu, made a pact with 48 demons before his birth, granting each demon a piece of his unborn son's body in exchange for the power to rule his domain. Hyakkimaru has survived through prosthetics and supernatural senses, and travels Japan hunting the demons to reclaim, one by one, the body parts that were taken from him. The orphaned thief Dororo accompanies him.

The premise is among the darkest in Tezuka's catalogue â€” which is saying something given that Tezuka's adult work includes "Ode to Kirihito" and "MW" â€” and Tezuka deploys it without the softening that characterized his work for younger audiences. The central irony: each demon Hyakkimaru defeats restores a body part, including eventually his eyes, ears, and the ability to feel pain. The restoration of sensation is not uniformly experienced as good. To have been without pain for your entire life and then to gain the capacity for it is not simply a gift, and the series is interested in this ambiguity without resolving it into consolation.

The original manga's abrupt ending â€” which Tezuka reportedly ended mid-arc due to poor serialization response â€” left the premise's implications largely unexplored. Tezuka's own 1969 anime adaptation compressed the story further. The 2019 anime adaptation produced by MAPPA and Tezuka Productions, directed by Kazuhiro Furuhashi, used the premise's full implications to construct a complete 24-episode narrative that many critics considered the definitive realization of the material. The production's visual design â€” desaturated color palette, specific period detail, the depiction of Hyakkimaru's prosthetics and his restored senses â€” and its handling of the political backstory (the famine and warfare that made Daigo's pact comprehensible if not forgivable) gave the series a moral weight that the original's truncated run had only gestured at.

The 2019 anime's resolution of the relationship between Hyakkimaru and Daigo, and its treatment of what Hyakkimaru becomes as his body is restored â€” the question of whether a person who has lived as a weapon can become something else â€” is handled with more complexity than the premise requires and more honesty than the audience comfortable with simple redemption narratives might prefer.`,
    tags: ['Dororo', 'Osamu Tezuka', 'MAPPA', 'samurai manga', 'anime 2019', 'manga 1960s'],
    entities: ['Osamu Tezuka', 'MAPPA'],
    publishedAt: new Date('2026-05-13'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/dororo-tezuka-dark-samurai-manga-2019-remake',
  },
  {
    title: 'Soul Eater: The Visual Identity That Defined an Era',
    slug: 'soul-eater-visual-identity-defined-era',
    category: 'manga',
    excerpt: 'Soul Eater serialized in Monthly ShÅnen Gangan from 2003 to 2013 and established a visual aesthetic â€” Halloween gothic, asymmetrical design, a moon that grins â€” that defined a specific period of shonen aesthetics. Before Fire Force, Atsushi ÅŒkubo created the most distinctive visual world in early 2000s manga.',
    content: `"Soul Eater" by Atsushi ÅŒkubo serialized in Monthly ShÅnen Gangan from 2003 to 2013, producing 25 collected volumes. The series is set in Death City, Nevada, where the Shinigami (Death) runs the Death Weapon Meister Academy â€” a school where students called meisters team with human-weapon hybrids (humans who can transform into weapons) to collect the souls of evil beings and prevent the resurrection of the Kishin, a demon god of madness. The premise is unusual enough to sustain a decade of serialization, but the series' most immediately recognizable quality is visual: a Halloween gothic aesthetic â€” grinning moon, twisted architecture, asymmetrical character design â€” that established a visual identity strong enough that readers who encountered it as children carry a specific visual memory of what this world looked like.

ÅŒkubo's design sensibility is the series' primary contribution to manga history. The moon and sun that dominate the series' skies â€” the moon permanently grinning with visible teeth, the sun sweating and yelling â€” are not simply background elements but emotional registers that the series uses as shorthand for tonal state. The character designs are deliberately asymmetrical in ways that classical design training would identify as incorrect, and the incorrectness is the point: these are characters who exist in a world that has been deliberately bent away from ordinary visual logic. The architectural designs â€” the twisting buildings of Death City, the Shinigami's castle â€” are built from visual excess rather than proportion.

The narrative center of the series is the three-way friendship between Maka Albarn (meister) and Soul Evans (her partner, who transforms into a scythe), Black Star (a ninja) and Tsubaki (his partner, who transforms into various blade weapons), and Death the Kid (the Shinigami's son, obsessed with symmetry) and the Thompson sisters (pistols). The ensemble dynamic is the series' most consistently satisfying element; the main cast's relationships, and the specific comedy and drama generated by their personalities in combination, sustain the series through arcs that are variable in narrative quality.

The 2008 anime adaptation by Bones covered approximately the first two-thirds of the manga before diverging for an original ending, which was received with mixed responses from manga readers who felt the original ending was inferior to where the manga was heading. ÅŒkubo's subsequent series "Fire Force" (2015â€“2022) demonstrated that the visual intelligence of "Soul Eater" was portable across new premises, suggesting that the aesthetic was the creator's rather than the property's.`,
    tags: ['Soul Eater', 'Atsushi ÅŒkubo', 'Monthly ShÅnen Gangan', 'Bones anime', 'gothic manga', 'manga 2000s'],
    entities: ['Atsushi ÅŒkubo', 'Bones'],
    publishedAt: new Date('2026-05-15'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/soul-eater-visual-identity-defined-era',
  },
  {
    title: 'Hellsing Ultimate: What the OVA Got Right',
    slug: 'hellsing-ultimate-what-the-ova-got-right',
    category: 'anime',
    excerpt: 'Hellsing by Kouta Hirano ran from 1997 to 2008 as a deliberately operatic vampire action manga. The Hellsing Ultimate OVA, produced by Madhouse and later Graphinica between 2006 and 2012, is the definitive adaptation â€” ten episodes that honor the manga\'s scale without apologizing for its excess.',
    content: `"Hellsing" by Kouta Hirano serialized in Young King OURs from 1997 to 2008, producing 10 collected volumes. The series follows the Hellsing Organization â€” a British secret service tasked with dealing with supernatural threats â€” and its ultimate weapon, Alucard, an ancient and supremely powerful vampire who serves Integra Hellsing as a loyal instrument of destruction. The premise is the delivery mechanism for a sustained exercise in operatic excess: enormous battles between supernatural factions, extreme violence depicted without restraint, and an aesthetic sensibility that commits fully to its own theatricality. The series is not subtle and does not attempt to be.

The first Hellsing anime, produced by Gonzo in 2001, adapted the manga's early material before diverging into an original story â€” a decision made necessary by the manga's slow publication pace but that produced an anime widely considered inferior to the source material. The original anime's original villain and its more conventionally structured dramatic arc replaced the manga's escalating factional warfare with a more manageable narrative, losing the specific quality of excess that the manga's later volumes made its defining characteristic.

The Hellsing Ultimate OVA, produced initially by Madhouse (later Graphinica) and released as ten episodes between 2006 and 2012, is the definitive version. The OVA format â€” longer individual episodes, release at irregular intervals, a budget structure not dependent on broadcast television constraints â€” permitted the visual ambition that the manga's later material required. The Millennium faction's invasion of London, and the three-way battle between Hellsing, Millennium, and the Vatican that constitutes the series' climax, involves a scale of destruction and a density of faction politics that Gonzo's 13-episode series could not have accommodated.

Alucard is the series' most discussed element. His combat style â€” allowing himself to be destroyed in elaborate ways before demonstrating that destruction cannot kill him â€” is a visual approach to invulnerability that is specifically theatrical, designed to be more interesting to watch than simple domination. His relationship with Integra, which is one of loyalty and genuine respect rather than servitude, gives his character a depth that the excess of his combat behavior might otherwise obscure. The series' final volumes, and the OVA's corresponding final episodes, develop this relationship to a conclusion that the series' operatic register manages to make genuinely moving.`,
    tags: ['Hellsing Ultimate', 'Kouta Hirano', 'Madhouse', 'vampire anime', 'OVA', 'Young King OURs'],
    entities: ['Kouta Hirano', 'Madhouse'],
    publishedAt: new Date('2026-05-17'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/hellsing-ultimate-what-the-ova-got-right',
  },
  {
    title: 'Yona of the Dawn: The Adventure Manga That Takes Its Shoujo Seriously',
    slug: 'yona-of-the-dawn-adventure-manga-takes-shoujo-seriously',
    category: 'manga',
    excerpt: 'Yona of the Dawn has been running in Hana to Yume since 2009. It begins with a princess whose sheltered world collapses and follows her transformation into a capable leader over hundreds of chapters. The series is the clearest demonstration that the adventure manga genre\'s best possibilities are not exclusively the province of shonen.',
    content: `"Yona of the Dawn" ("Akatsuki no Yona") by Kusanagi Mizuho serialized in Hana to Yume from 2009 and continues. The series follows Yona, the princess of the Kingdom of Kouka, whose sheltered palace life collapses on her sixteenth birthday when her beloved cousin Su-won murders her father and seizes the throne, forcing Yona and her childhood friend Hak to flee into exile. The series follows her transformation from a naive and pampered princess into a capable, self-sufficient leader who gradually reunites the legendary four Dragon Warriors to reclaim her kingdom â€” and decides what reclaiming her kingdom should mean once she understands the conditions of the people she would rule.

The slow-build of Yona's character development is the series' primary achievement. The transformation is not dramatic â€” there is no single moment of training montage â€” but cumulative: each arc adds to Yona's practical capability and to her understanding of the world outside the palace walls. The discovery that her father's reign of pacifism had allowed slavers, drug traders, and famine to flourish in the provinces forces her to reckon with the gap between good intentions and governance, and the series is genuinely interested in what good leadership requires rather than treating it as a simple outcome of good character.

The Dragon Warriors â€” four men descended from the ancient dragons who bonded with an ancestor of Yona's bloodline â€” are the series' ensemble, and each is developed with enough specificity that their arc in joining Yona's company generates its own emotional content rather than simply adding combat power. The world-building supporting their existence, and the political structures of the kingdom's various regions, give the series a geographic and social texture that adventure manga set in historical-fantasy Asia rarely achieves.

The 2014 anime adaptation by Pierrot covered the first several arcs and was received as a faithful and visually strong adaptation. The demand for a second season has been sustained for over a decade without being fulfilled, which reflects both the series' continued popularity and the specific difficulty of adapting an ongoing manga whose central political resolution remains incomplete. "Yona of the Dawn" is the strongest argument in contemporary shoujo publication that the adventure genre's best possibilities are not exclusively the province of shonen.`,
    tags: ['Yona of the Dawn', 'Akatsuki no Yona', 'Kusanagi Mizuho', 'Hana to Yume', 'shoujo adventure', 'Pierrot'],
    entities: ['Kusanagi Mizuho', 'Pierrot'],
    publishedAt: new Date('2026-05-19'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/yona-of-the-dawn-adventure-manga-takes-shoujo-seriously',
  },
  {
    title: 'Blue Exorcist: The Son of Satan Manga',
    slug: 'blue-exorcist-son-of-satan-manga',
    category: 'manga',
    excerpt: 'Blue Exorcist has been running in Jump Square since 2009 with a premise that has sustained more character and thematic depth than it initially suggests: a boy who is the biological son of Satan decides to become an exorcist to defeat his father. The series\' best work is in the space between Rin\'s identity and his chosen purpose.',
    content: `"Blue Exorcist" ("Ao no Exorcist") by Kazue KatÅ serialized in Jump Square from 2009 and continues. The series follows Rin Okumura, who discovers on the night his foster father dies protecting him that he is the biological son of Satan â€” born from a human woman possessed by Satan, raised as a normal human by the exorcist Fujimoto. Rin's response to this revelation is to enroll in True Cross Academy's exorcist training program, to learn to control his demonic power, and to become an exorcist capable of defeating his biological father. The premise is conceptually clean and the series is intelligent about what it implies.

The identity tension at the core of the series â€” Rin is physiologically Satan's son, carries Satan's flames, and is perceived as a threat by the organization he is trying to join â€” is developed with enough consistency that it generates ongoing narrative content rather than being resolved through a single affirmation. The exorcists who train alongside Rin are divided in their responses to what he is, and the series uses this division to examine how identity and origin relate to character: whether what you were born as determines what you are, or whether what you choose determines it. The series' answer is the expected one â€” character over biology â€” but the path it takes to that answer involves specific characters making specific decisions with specific costs that make the conclusion feel earned rather than asserted.

KatÅ's art style â€” expressive character designs, elaborate demonic creature design, the specific visual language of the Blue Night (the night Satan's possession of the exorcist community left survivors traumatized) â€” is consistent and grows in technical sophistication across the series' long run. The demonic powers depicted across the series' various characters are visually distinct in ways that make the combat sequences readable rather than generic, which is a harder achievement in an ongoing series than it appears.

The 2011 anime adaptation by A-1 Pictures adapted the first half of the manga before diverging into an original second half â€” a familiar pattern for adaptations of ongoing manga, and one that generated a second season in 2017 ("Blue Exorcist: Kyoto Saga") that returned to adapting the manga's actual story. The Kyoto saga adaptation was received as a significant improvement over the original anime's divergent ending, suggesting that the manga's own material was stronger than what the adaptation's creative team had produced independently.`,
    tags: ['Blue Exorcist', 'Kazue KatÅ', 'Jump Square', 'A-1 Pictures', 'demon manga', 'manga ongoing'],
    entities: ['Kazue KatÅ', 'A-1 Pictures'],
    publishedAt: new Date('2026-05-21'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/blue-exorcist-son-of-satan-manga',
  },
  {
    title: 'The Anime Original: Why Non-Adaptations Matter',
    slug: 'anime-original-why-non-adaptations-matter',
    category: 'industry',
    excerpt: 'The majority of anime are adaptations of manga, light novels, or games. The minority that are not â€” Cowboy Bebop, FLCL, Puella Magi Madoka Magica, Promare, Odd Taxi â€” represent the medium\'s most formally adventurous work. Here\'s why originals can do things adaptations cannot, and why they are structurally harder to make.',
    content: `The majority of anime produced in any given season are adaptations: manga, light novels, visual novels, video games. The adaptation model is commercially rational â€” the source material's existing audience provides a baseline of viewers, the story has been tested by its prior publication, and the production committee can assess commercial viability before the anime begins. Original anime â€” works conceived specifically for animation, without a prior source material â€” lack all of these advantages and have a statistically lower success rate than adaptations. They are also, in aggregate, the works that most fully realize what animation as a medium can do.

"Cowboy Bebop," "FLCL," "Neon Genesis Evangelion," "Puella Magi Madoka Magica," "Promare," "Odd Taxi," "Wonder Egg Priority," "Angel Beats!," "Anohana," "Gurren Lagann," "Darling in the FranXX," "Serial Experiments Lain," "Haibane Renmei" â€” the list of anime originals with genuine cultural impact is long enough and distinguished enough to constitute a significant fraction of the medium's most important works. What these series share, beyond their original status, is that their creators conceived them specifically for animation rather than adapting a prior form. The creative decisions â€” what the medium can do that others cannot â€” are made in relation to animation's specific capabilities rather than in relation to how to translate an existing work.

The structural advantage of originals is formal freedom. An adaptation is constrained by its source material's choices: the pacing of a manga chapter, the visual design of the original artist, the narrative structure of the light novel's volumes. Originals begin with a blank frame. The disadvantage is that the blank frame offers no guidance â€” the creative team must make every decision from scratch, without the safety net of a tested story. This is why many originals are creative failures: the freedom is genuinely harder to navigate than the constraint.

The production committee system creates specific pressures against originals. A committee investing in an anime adaptation knows the source material exists and has been market-tested; a committee investing in an original is making a harder bet. The originals that get made tend to be either attached to established creators whose reputations justify the risk (Hideaki Anno at Gainax, Shinichiro Watanabe at Sunrise, Kunihiko Ikuhara at various studios) or attached to studios with established creative credibility (Trigger, KyoAni) whose track record constitutes its own form of market validation.

The medium's most adventurous formal achievements â€” the works that have expanded what anime can do â€” are disproportionately originals. This is not a coincidence. It reflects the specific freedom that original production enables: the ability to build a work around what animation can do rather than around what needs to be adapted.`,
    tags: ['anime original', 'anime industry', 'Cowboy Bebop', 'Madoka Magica', 'anime production', 'non-adaptation'],
    entities: [],
    publishedAt: new Date('2026-05-23'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/anime-original-why-non-adaptations-matter',
  },
  {
    title: 'Anime Ending Songs: The Underrated Half',
    slug: 'anime-ending-songs-underrated-half',
    category: 'anime',
    excerpt: 'Anime opening songs are discussed constantly. Anime ending songs are skipped by most viewers and underappreciated by most discourse. The ending theme\'s function â€” decompression, emotional processing, transition back to ordinary life â€” is distinct from the opening\'s, and the best ending songs are specifically designed to do it.',
    content: `Anime opening songs are discussed at length: ranked, analyzed, studied for their visual storytelling, cited as introductions to artists who became significant careers. Anime ending songs are skipped. Most streaming platforms show the percentage of viewers who watch past the credits, and for most anime, ending sequences are skipped by the majority of viewers before the music finishes. The skipping is understandable â€” endings often air at the point of maximum plot tension, when the viewer wants to advance â€” and it has produced a received critical neglect of the ending theme as an art form. The neglect is undeserved.

The ending theme's function is distinct from the opening's. The opening announces the anime, establishes its tonal register, and generates energy for what follows. The ending performs a different emotional operation: it provides decompression after the episode's events, a transition space between the story world and the viewer's ordinary life. The best ending songs are specifically designed for this function â€” they match the emotional state the episode has generated and process it rather than dispelling it, leaving the viewer in a particular condition rather than simply signaling that the episode is over.

"Neon Genesis Evangelion"'s ending, "Fly Me to the Moon" â€” a different arrangement sung by a different character each episode â€” used the space to comment on the episode's emotional content while maintaining ironic distance from it, generating a specific form of tonal complexity that the opening did not attempt. "Fullmetal Alchemist: Brotherhood"'s rotating ending songs â€” "Uso" by SID, "Hologram" by NICO Touches the Walls, "Let It Out" by Miho Fukuhara â€” each calibrated to the arc they accompanied, demonstrated that ending songs could function as structural components rather than afterthoughts. "Anohana"'s ending "secret base ~Kimi ga Kureta Mono~" extended the episode's grief into the credits in a way that felt continuous with rather than separate from the episode's emotional experience.

The distinction between openings and endings in how they are made is also commercial: opening songs have higher visibility and are more aggressively promoted, which means the artists and labels competing for opening slots are different from those producing endings. This has historically meant that endings drew from a different, sometimes less commercially prominent tier of artists, which paradoxically often resulted in more unusual or artistically distinctive choices. The space of lower commercial pressure generated creative freedom that the opening slot, under more scrutiny, sometimes did not permit.

The viewers who skip endings are missing music and visual design that, in the best cases, constitutes a distinct artistic statement about the work they have just watched. The skip button is understandable. The ending is worth stopping for.`,
    tags: ['anime ending songs', 'anime music', 'ED sequences', 'anime openings', 'anime culture', 'anime analysis'],
    entities: [],
    publishedAt: new Date('2026-05-25'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/anime-ending-songs-underrated-half',
  },
  {
    title: 'Noragami: Minor Gods and Major Feelings',
    slug: 'noragami-minor-gods-major-feelings',
    category: 'manga',
    excerpt: 'Noragami has been running in Monthly ShÅnen Magazine since 2011, following Yato, a minor deity without a shrine who charges 5 yen for odd jobs while dreaming of worship. The series uses Japanese mythology and the spirit world to examine what it means to be forgotten, and whether being remembered is worth what it costs.',
    content: `"Noragami" by Adachitoka serialized in Monthly ShÅnen Magazine from 2011 and continues. The series follows Yato, a minor war god without a shrine, who advertises his services with a phone number and charges 5 yen per job â€” dreaming of the day he will have enough worshippers to build a proper shrine. When high school student Hiyori Iki is hit by a bus while pushing Yato out of the way, her soul becomes loosely attached to her body, enabling her to perceive the spirit world. Yato also recently dismissed his shinki (divine weapon) and must recruit a new one. The series develops from these premises into an increasingly complex examination of Japanese mythology, the relationship between gods and the humans who need them, and the specific cost of existing in a form that depends on being remembered.

The mythology integration is the series' most sustained achievement. Adachitoka researches Japanese folk religion and Shinto practices with visible care, and the mechanisms by which gods exist, accumulate power, and can be erased â€” all governed by the belief and memory of humans â€” are developed with internal consistency rather than deployed as convenient plot devices. The shinki system, in which gods empower the souls of the dead as their divine weapons, generates the series' most emotionally complex material: the shinki are dead humans whose identities have been suppressed to serve their gods, and the series is interested in what this suppression costs and what obligations it creates.

Yato's character is the series' most interesting element. He is introduced as comic â€” the minor god with the crass advertising, the resentment of more prosperous deities â€” and gradually revealed as someone whose past is darker and whose present circumstances are more precarious than the comedy suggests. His relationship with his father â€” a god whose existence depends on Yato continuing to accept work as a god of calamity â€” is the series' primary antagonist dynamic, and it is developed across the series' long run as a genuinely complicated dependency rather than a simple villain-hero opposition.

The 2015 anime adaptation by Bones, and its second season "Noragami Aragoto" (2015), were received as faithful and visually accomplished adaptations that demonstrated Bones' ability to realize the series' mythology-based action sequences. The ongoing manga has developed beyond what the anime covered into territory that requires the accumulated investment of the series' full run to yield its complete emotional effect.`,
    tags: ['Noragami', 'Adachitoka', 'Monthly ShÅnen Magazine', 'Bones anime', 'Japanese mythology', 'manga ongoing'],
    entities: ['Adachitoka', 'Bones'],
    publishedAt: new Date('2026-05-27'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/noragami-minor-gods-major-feelings',
  },
  {
    title: 'Wonder Egg Priority: Ambitious, Complicated, Worth Discussing',
    slug: 'wonder-egg-priority-ambitious-complicated-worth-discussing',
    category: 'anime',
    excerpt: 'Wonder Egg Priority aired in 2021 as an anime original by CloverWorks that generated more critical discussion per episode than almost any anime in recent memory â€” for its visual ambition, its serious engagement with suicide and trauma, and for the way its finale complicated everything the preceding episodes had built.',
    content: `"Wonder Egg Priority" aired as an anime original produced by CloverWorks in Winter 2021, written by Shinji Nojima and directed by Shin Wakabayashi. The series follows Ai Ohto, a girl recovering from the suicide of her best friend, who begins purchasing "Wonder Eggs" from a mysterious vending machine â€” eggs that, when broken, release a girl who died by suicide and must be protected from monsters in a dreamlike parallel world. Collecting the eggs and protecting the girls might, the series suggests, restore Ai's friend to life. The setup was received as among the most emotionally serious engagements with adolescent mental health, self-harm, and the specific grief of surviving a friend's suicide in recent anime, and the first several episodes were the most-discussed anime of their season.

The visual ambition of the early episodes was the immediate quality that generated attention. The production design of the dream-world sequences â€” environments derived from the specific circumstances of each dead girl's life, rendered with a visual inventiveness that made each episode visually distinct â€” demonstrated that CloverWorks had committed significant creative resources to the project. The character animation quality in the combat sequences, and the care in the direction of the conversations between Ai and the girls she protected, communicated a production under creative pressure of a specific kind: the pressure of artists who knew they were working on something ambitious and were trying to be adequate to it.

The series' engagement with its central subject â€” suicide, bullying, abuse, the specific forms of harm that adolescent girls are subjected to â€” was more direct than anime typically attempts. Each egg-girl's backstory constituted a specific case study in a different form of harm, and the series' willingness to depict those harms without simplifying them into generic tragedy was the quality that generated the most sustained critical engagement from viewers who found the material resonant.

The finale â€” including a delayed special episode released in June 2021 that was intended to conclude the series â€” was received as a significant creative failure by much of the audience that had been most invested. The special episode's compressed handling of plot threads that had been carefully developed across the preceding episodes, and its ending's refusal to provide the emotional resolution the series had seemed to promise, generated debate about whether the failure was narrative (the story was irresolvable) or production (the production timeline made adequate completion impossible). The honest answer is probably both.

"Wonder Egg Priority" is worth watching despite its finale, because what it achieved in its best episodes is available nowhere else in recent anime. The failure is real. So is the achievement.`,
    tags: ['Wonder Egg Priority', 'CloverWorks', 'anime original', 'anime 2021', 'mental health anime', 'Shin Wakabayashi'],
    entities: ['CloverWorks'],
    publishedAt: new Date('2026-05-29'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/wonder-egg-priority-ambitious-complicated-worth-discussing',
  },
  {
    title: 'The Manga Localization Problem: What Gets Lost in Translation',
    slug: 'manga-localization-problem-what-gets-lost-translation',
    category: 'industry',
    excerpt: 'Translating manga involves decisions about honorifics, sound effects, cultural references, and reading direction that have no clean solutions â€” only tradeoffs. The debates these decisions generate reveal something about what manga readers want from translation and what translation is for.',
    content: `Manga translation involves a set of decisions that have no clean solutions, only tradeoffs, and that reveal â€” in the debates they generate â€” what readers expect from translation and what translation is understood to be for. The major decisions: whether to translate or retain Japanese honorifics (san, kun, chan, senpai); whether to translate or transliterate sound effects integrated into the artwork; how to handle cultural references that require explanation to be understood; and whether to adapt for left-to-right reading by mirroring pages or preserve right-to-left reading as-is. Each decision has advocates, each advocacy has reasons, and the reasons conflict.

The honorifics debate is the most persistent. Japanese honorifics communicate relationship hierarchies, social dynamics, and emotional states that English does not have direct equivalents for â€” the shift from "Sasuke-kun" to "Sasuke" in a relationship communicates a change in intimacy that English name-dropping doesn't capture. The argument for retaining honorifics is that they carry information that translation loses; the argument against is that they interrupt English-language reading with Japanese grammar that most readers cannot decode, and that localization's job is to produce an equivalent English reading experience rather than a Japanese reading experience with English words. Both arguments are correct, which is why the debate has not resolved.

Sound effects integrated into artwork present the most visually complex problem. Japanese onomatopoeia, incorporated into panel art at scale, is both narrative information and visual design. Replacing it with English onomatopoeia preserves the information while disrupting the visual design (English sound effects look different from Japanese ones and require redrawing the art). Leaving it in Japanese with small translations nearby preserves the visual design while creating text that many readers cannot parse. The 1980s and 1990s practice of removing sound effects and replacing them with English equivalents â€” which required significant art reconstruction â€” is now rarely practiced; most publishers leave Japanese sound effects intact with minimal annotation, which is the least disruptive option rather than the ideal one.

Cultural reference localization involves a different problem: the gap between cultures rather than the gap between languages. A reference to a specific television show, regional food, school structure, or social custom that is immediately legible to a Japanese reader requires either explanation (which interrupts narrative flow) or replacement (which changes the text) or retention with the opacity intact (which some readers experience as inaccessible). The choice between these options is rarely explicit and often inconsistent within a single translation.

These debates matter because they reflect genuine values about what localization serves. Translation for accessibility â€” producing a text that a new reader can approach without prior knowledge â€” and translation for fidelity â€” producing a text that preserves what the original author made â€” are not the same goal, and the tension between them generates every specific dispute about honorifics and sound effects and cultural references. The debates are worth having, because what is at stake is the question of what it means to bring one culture's art to another.`,
    tags: ['manga translation', 'manga localization', 'manga industry', 'honorifics debate', 'scanlation', 'manga publishing'],
    entities: [],
    publishedAt: new Date('2026-05-31'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/manga-localization-problem-what-gets-lost-translation',
  },
];

async function main() {
  console.log(`Seeding ${ESSAYS.length} essays (batch 11)...`);
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

