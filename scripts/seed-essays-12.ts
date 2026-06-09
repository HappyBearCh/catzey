/**
 * Twelfth batch of editorial essays.
 * Run with: npx tsx scripts/seed-essays-12.ts
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ESSAYS = [
  {
    title: 'Hyouka: Kyoto Animation\'s Quiet Mystery',
    slug: 'hyouka-kyoto-animation-quiet-mystery',
    category: 'anime',
    excerpt: 'Hyouka aired in 2012 and remains the most purely beautiful thing KyoAni has produced â€” a mystery anime about a lazy boy who gets drawn into solving the small secrets of school life, constructed with the kind of visual intelligence that makes every episode worth watching on craft alone.',
    content: `"Hyouka" was produced by Kyoto Animation and directed by Yasuhiro Takemoto, airing 22 episodes and 1 OVA in 2012. The series adapts Honobu Yonezawa's "Classic Literature Club" novel series, following Houtarou Oreki, a high school student whose guiding philosophy is energy conservation â€” doing nothing more than the minimum required â€” until his sister forces him to join the Classics Club and he meets Eru Chitanda, a girl whose curiosity is total and who says "I'm curious, I can't help it" with a sincerity that overrides every objection. The series follows the club as Oreki, despite himself, solves the small mysteries that surround them â€” none involving crime, all involving the secrets that accumulate in any institution with a long enough history.

The mysteries in "Hyouka" are deliberately small. There is no body. There is no criminal. The central mystery of the series' first arc â€” why Chitanda's uncle disappeared from the Classics Club forty-five years ago â€” is solved not through confrontation but through archival research and conversation, and the solution reveals something about institutional history and the specific costs of youthful idealism that is disproportionately moving relative to the stakes. The series' premise is that small things contain sufficient drama if you pay enough attention, and Kyoto Animation's visual intelligence is the instrument through which this argument is made.

The animation quality of "Hyouka" represents KyoAni at a specific kind of peak: not the action spectacle of their later work, but the animation of interiority. Oreki's internal deductions are visualized through brief sequences that stylize the process of reasoning â€” shifts to a more simplified visual register, spatial transformations, the specific imagery his mind reaches for â€” in ways that are simultaneously beautiful and informative. Chitanda's curiosity is animated in her body, in the small physical signs that something has caught her attention, with a consistency that makes her characterization physical as well as verbal. The series is among the most argued-over entries in the "beautiful but quiet" genre of anime precisely because its formal ambition is realized through restraint rather than spectacle.

Oreki's character development â€” from genuine energy-conservation philosophy to someone who chooses to engage, who accepts the costs of caring about things â€” is the series' emotional through-line. The development is not dramatic. He does not have a revelation. He notices, gradually, that the world is more interesting when Chitanda makes him look at it, and that he has been choosing not to look. The series respects this gradual shift enough not to punctuate it with a declaration.`,
    tags: ['Hyouka', 'Kyoto Animation', 'Yasuhiro Takemoto', 'mystery anime', 'anime 2012', 'Honobu Yonezawa'],
    entities: ['Kyoto Animation'],
    publishedAt: new Date('2026-06-02'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/hyouka-kyoto-animation-quiet-mystery',
  },
  {
    title: 'Haikyuu!!: The Sports Manga That Convinced Non-Sports Readers',
    slug: 'haikyuu-sports-manga-convinced-non-sports-readers',
    category: 'manga',
    excerpt: 'Haikyuu!! by Haruichi Furudate ran in Weekly Shonen Jump from 2012 to 2020 and became one of the most read manga worldwide. It is the clearest recent demonstration of what the sports manga format can do at its highest level: make a reader care intensely about a sport they had no prior interest in.',
    content: `"Haikyuu!!" by Haruichi Furudate serialized in Weekly Shonen Jump from February 2012 to July 2020, producing 45 collected volumes. The series follows Shoyo Hinata, a short boy who falls in love with volleyball after watching a famous short player on television and joins his high school's volleyball team â€” where he discovers that his rival from his middle school career, the genius setter Tobio Kageyama, is his new teammate. The premise of the rivals-become-partners dynamic is well-worn in sports manga, and Furudate deploys it without pretending otherwise. What distinguishes the series is the construction of the surrounding cast and the formal intelligence of its match sequences.

The volleyball matches in "Haikyuu!!" are among the most technically and emotionally accomplished in sports manga history. Furudate's understanding of volleyball â€” the specific skills, strategies, and physical demands of the sport â€” is translated into visual storytelling that is simultaneously accurate and dramatically enhanced. The moments that define a match â€” the set that arrives perfectly for a spike, the receive that shouldn't be possible, the serve that breaks the opposing team's rhythm â€” are realized with enough visual clarity that a reader who has never watched volleyball understands what is happening and why it matters. The matches also develop character: what each player chooses to do in a high-stakes moment reveals who they are, and the series has enough characters with enough individuality that the revelation is consistently meaningful.

The ensemble is the series' distinguishing achievement. "Haikyuu!!" is unusual in sports manga for the depth of characterization it extends to opposing teams. The teams that Karasuno (Hinata's school) faces are not simply obstacles; they are developed with enough specificity that the reader understands and sympathizes with their goals before they are defeated. The third-year players across multiple teams â€” whose competitive careers are ending regardless of the match's outcome â€” generate an emotional weight that a simpler protagonist-vs-obstacle structure would not permit.

The series' final arc, which jumps forward in time to depict the adult careers of its characters after high school, was divisive in a way that reflects how invested the readership had become in the high school narrative. Whether the time skip was the right creative choice or an error of proportion continues to be debated, but the debate's intensity is its own testimony to what Furudate built in the preceding forty-plus volumes.`,
    tags: ['Haikyuu', 'Haruichi Furudate', 'Weekly Shonen Jump', 'volleyball manga', 'sports manga', 'Production I.G'],
    entities: ['Haruichi Furudate'],
    publishedAt: new Date('2026-06-04'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/haikyuu-sports-manga-convinced-non-sports-readers',
  },
  {
    title: 'Banana Fish: The Manga That Never Stopped Being Relevant',
    slug: 'banana-fish-manga-never-stopped-being-relevant',
    category: 'manga',
    excerpt: 'Banana Fish by Akimi Yoshida ran in Bessatsu Shojo Comic from 1985 to 1994 and told a story about a New York gang leader investigating a mysterious drug, political corruption, and abuse. The MAPPA 2018 anime adaptation introduced it to a generation that found it as urgent as its original audience did.',
    content: `"Banana Fish" by Akimi Yoshida serialized in Bessatsu Shojo Comic from 1985 to 1994, producing 19 collected volumes. The series follows Ash Lynx, a seventeen-year-old gang leader in New York City who has been investigating the mysterious drug called "Banana Fish" â€” which drove his older brother into a catatonic state after returning from Vietnam â€” and Eiji Okumura, a Japanese photographer's assistant who visits New York on assignment and becomes entangled in Ash's increasingly dangerous investigation. The investigation leads through layers of organized crime, political conspiracy, and abuse that the series depicts with unflinching directness.

The series' treatment of child sexual abuse â€” Ash's history, and the way that history shapes his relationships and his understanding of what he is allowed to be â€” is handled with a seriousness and specificity that was unusual in shojo manga at the time of its original publication and remains unusual in manga generally. Ash's self-conception â€” formed by exploitation that began in childhood â€” is the series' central psychological subject, and the series does not allow the reader to forget it or to simplify it into a backstory that has been processed and resolved. The relationship between Ash and Eiji is the narrative's emotional center precisely because Eiji is the first person who treats Ash as something other than an instrument or an asset, and the series traces what this means for a person who has been told for years what he is worth.

The New York setting â€” realized with enough specificity to feel like actual research into the city's social geography rather than a generic American backdrop â€” and the political thriller structure give the series a density that distinguishes it from shojo manga's more intimate focus. The conspiracy Ash unravels connects organized crime to government corruption in ways that remain structurally plausible without being naive about how power actually operates.

The MAPPA 2018 anime adaptation, which transposed the setting from the 1980s to the present day while preserving the plot's original structure, introduced the series to an international streaming audience. The adaptation's quality â€” the production values, the voice performances, the handling of the series' difficult material â€” generated the response that the manga had long deserved from audiences who had not encountered it in its original publication.`,
    tags: ['Banana Fish', 'Akimi Yoshida', 'MAPPA', 'shojo manga', 'anime 2018', 'Bessatsu Shojo Comic'],
    entities: ['Akimi Yoshida', 'MAPPA'],
    publishedAt: new Date('2026-06-06'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/banana-fish-manga-never-stopped-being-relevant',
  },
  {
    title: 'Yuri on Ice: Figure Skating and What Anime Can Do With Love',
    slug: 'yuri-on-ice-figure-skating-what-anime-can-do-with-love',
    category: 'anime',
    excerpt: 'Yuri on Ice aired in Fall 2016 as an original anime about a Japanese figure skater and his Russian coach, and generated one of the most intense fandom responses of the decade. What made it work â€” beyond the romance â€” was the most technically accurate depiction of competitive figure skating in anime history.',
    content: `"Yuri on Ice" aired in Fall 2016 as an anime original produced by MAPPA, directed by Sayo Yamamoto with screenplay and character design by Mitsurou Kubo. The series follows Yuri Katsuki, a Japanese figure skater who suffers a catastrophic loss of form after failing at the Grand Prix Final, and Viktor Nikiforov, a Russian skating legend who sees a viral video of Yuri skating one of Viktor's programs and arrives in Japan to become his coach. The series follows the developing relationship between Yuri and Viktor across a competitive season, culminating in the Grand Prix Final that marked the beginning of Yuri's collapse one year earlier.

The technical accuracy of the skating sequences is the series' most distinctive formal achievement. Yamamoto and Kubo consulted extensively with competitive figure skaters during production, and the skating programs performed by the characters â€” each designed to reflect the character's emotional state and technical capabilities â€” are choreographically specific in ways that distinguish them from the generic skating sequences that prior anime and film have produced. The programs are designed as programs, not as action sequences with skating attached; they have structure, emotional arc, and technical difficulty that is accurately proportional to the characters' skill levels.

The relationship between Yuri and Viktor was interpreted by most viewers as romantic, and the series does not contradict this reading while stopping short of explicit declaration â€” a position that generated both celebration from viewers who saw a meaningful depiction of a same-sex relationship in a mainstream anime and frustration from viewers who felt the ambiguity was a form of evasion. The relationship's emotional content â€” the specific dynamic of an athlete developing trust in a coach who has transformed their life, and the complications of a coach who has also transformed his own life through the coaching relationship â€” is developed with enough care that the romantic reading is the series' most supported interpretation regardless of its technical status.

The fandom response to "Yuri on Ice" â€” which was among the most intense responses to any anime of its decade â€” reflected both the series' content and its timing: it arrived at a moment when the international anime audience's appetite for relationships that it could read as queer had been underserved for long enough that a series which offered even an ambiguous version of what the audience wanted generated an outsized response.`,
    tags: ['Yuri on Ice', 'MAPPA', 'Sayo Yamamoto', 'figure skating anime', 'anime original', 'anime 2016'],
    entities: ['MAPPA', 'Sayo Yamamoto'],
    publishedAt: new Date('2026-06-08'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/yuri-on-ice-figure-skating-what-anime-can-do-with-love',
  },
  {
    title: 'Kino\'s Journey: The World Isn\'t Beautiful, Therefore It Is',
    slug: 'kinos-journey-the-world-isnt-beautiful-therefore-it-is',
    category: 'anime',
    excerpt: 'Kino\'s Journey is based on Keiichi Sigsawa\'s light novels about a traveler named Kino and a talking motorcycle named Hermes who visit countries for exactly three days each. It is structured as a series of philosophical parables, and it is one of the most quietly devastating works in anime.',
    content: `"Kino's Journey" ("Kino no Tabi: the Beautiful World") is based on a light novel series by Keiichi Sigsawa, originally illustrated by Kouhaku Kuroboshi and beginning publication in 2000. The anime adaptations include a 2003 series produced by A.C.G.T. directed by Ryutaro Nakamura (13 episodes) and a 2017 series by Lerche. The series follows Kino, a traveler of indeterminate gender who rides a talking motorcycle named Hermes and visits various countries, stopping in each for exactly three days â€” long enough to understand a place, not long enough to be changed by it. Each country embodies a different social arrangement, philosophical position, or political structure, and Kino observes each without judging it.

The structure is the series' argument. By visiting each country for exactly three days and then leaving, Kino refuses the position of reformer or judge; the series presents its societies â€” which range from the utopian to the horrifying to the simply strange â€” with a consistency of tone that forces the viewer to do their own ethical work. A country where all citizens are surgically modified to be incapable of violence; a country where an annual massacre determines who may continue to live; a country that has built extraordinary technology to accomplish something that turns out to have been unnecessary â€” each episode presents its subject fully and then Kino rides away. The refusal to editorialize is the formal achievement: the series trusts its viewers to apply their own ethical intelligence to what they have been shown.

The phrase that runs through the series â€” "The world is not beautiful, therefore it is" â€” is the philosophical center. Beauty, in Sigsawa's construction, is not an inherent quality but a consequence of encountering the world as it actually is rather than as you wish it to be. The ugliness of some of the countries Kino visits is part of their reality; Kino's ability to travel among them without despair depends on accepting the full range of what the world contains.

The 2003 adaptation is widely considered the definitive version â€” its deliberate pacing, muted color palette, and the specific quality of Ryutaro Nakamura's direction produced an anime that has aged without losing its relevance. The philosophical material it presents was not of its moment; it is the kind of content that the category of "when it was made" is not adequate to evaluate.`,
    tags: ["Kino's Journey", 'Keiichi Sigsawa', 'philosophical anime', 'light novel anime', 'anime 2003', 'travel anime'],
    entities: ['Keiichi Sigsawa'],
    publishedAt: new Date('2026-06-10'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/kinos-journey-the-world-isnt-beautiful-therefore-it-is',
  },
  {
    title: 'Darker than Black: Bones and the Art of the Contractor',
    slug: 'darker-than-black-bones-art-of-contractor',
    category: 'anime',
    excerpt: 'Darker than Black aired in 2007 and built a world where the stars have been replaced by fake ones, real stars correspond to Contractors â€” people who gained superhuman abilities at the cost of their emotions â€” and intelligence agencies compete for control of a mysterious zone called Hell\'s Gate. It is Bones at its most tonally confident.',
    content: `"Darker than Black: Hei and the Fake Blue Night" was produced by Bones, directed by Tensai Okamura, airing 25 episodes in 2007 with a second season, "Darker than Black: Gemini of the Meteor," in 2009. The series is set in a world where, ten years before the story begins, two mysterious zones â€” Heaven's Gate and Hell's Gate â€” appeared on Earth, replacing the night sky's stars with fake ones. The appearance of the Gates corresponded with the emergence of Contractors: people who gained superhuman abilities at the cost of their humanity, required to perform irrational "remuneration" acts after using their powers, and incapable of the emotional responses that would make their actions moral rather than instrumental. The protagonist, known as Hei, is a Contractor working for a Chinese intelligence organization while concealing that he, uniquely, retained human emotions.

The Contractor concept is the series' most productive idea. The design choice â€” abilities coupled with mandated irrational behavior â€” generates a world in which power is inseparable from vulnerability: every Contractor reveals something involuntary and personal in the moment after using their power, making them visible and knowable in a way that undermines their utility as covert operatives. The remuneration behaviors range from the trivial to the profound (eating convenience store food, writing poetry, smoking cigarettes), and the series uses the range to establish that the irrational residue of the human is not simply negative â€” it is the specific content that the Contractor's rational efficiency has suppressed.

Hei's double status â€” a Contractor with human emotions â€” is the series' central mystery and its primary emotional investment. The investigation of what Hei is, why he differs from other Contractors, and what the Gate events actually produced is managed across the first season with enough pacing that the reveals feel earned rather than arbitrary. The supporting cast of Contractors, and the human intelligence operatives who pursue them, are developed with enough individuality that the episodic structure (most episodes are two-parters) generates self-contained emotional content rather than simply moving the plot forward.

The second season â€” which focuses on a different protagonist and a different Gate â€” was received more divisively, largely because it displaced the character investment the first season had built. The first season of "Darker than Black" remains one of Bones' most accomplished works: a mature, stylish action series that uses its genre commitments as a vehicle for consistent thematic development.`,
    tags: ['Darker than Black', 'Bones', 'Tensai Okamura', 'Contractor anime', 'anime 2007', 'supernatural action'],
    entities: ['Bones'],
    publishedAt: new Date('2026-06-12'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/darker-than-black-bones-art-of-contractor',
  },
  {
    title: 'Dr. Stone: Science as a Superpower',
    slug: 'dr-stone-science-as-superpower',
    category: 'manga',
    excerpt: 'Dr. Stone by Riichiro Inagaki and Boichi ran in Weekly Shonen Jump from 2017 to 2022 with a premise that distinguished it from every other shonen of its era: the protagonist\'s ability is scientific knowledge. The series made chemistry, physics, and engineering as thrilling as any battle manga.',
    content: `"Dr. Stone" by Riichiro Inagaki (writing) and Boichi (art) serialized in Weekly Shonen Jump from March 2017 to March 2022, producing 26 collected volumes. The series' premise: a mysterious beam of light petrifies all of humanity simultaneously, and three thousand years later Senku Ishigami â€” a genius scientist â€” revives himself and begins the project of rebuilding civilization from scratch in a world reclaimed by nature. The series' central conflict is between Senku's Kingdom of Science and Tsukasa's Empire of Might â€” Tsukasa, a physically powerful survivor who believes the post-petrification world should be rebuilt without the corruptions of the old one, and who crushes the stone statues of adults to prevent them from being revived.

The formal innovation of "Dr. Stone" within shonen manga is that its protagonist's power is knowledge. The series' battles are not won through physical power or supernatural ability but through the application of scientific understanding: Senku rebuilds technology in roughly historical sequence, from fire and pottery through metallurgy and chemistry to electronics and beyond, and each step in the sequence is depicted with enough accuracy that the series functioned as science education for a significant portion of its readership. The manga became associated with real-world scientific curiosity in a way that no other shonen series of its era managed â€” readers actually made the charcoal, tested the chemistry, attempted the engineering.

Boichi's art is the series' visual engine. His backgrounds are extraordinary â€” detailed depictions of natural environments and constructed technology that ground the science in physical reality â€” and his character designs are immediately distinctive in a roster where many shonen series blur together visually. The large set-piece sequences, in which the Kingdom of Science's latest technological achievement is revealed, are paced and composed to deliver the specific pleasure of problem-solving made visual.

The series' politics are worth noting. Senku's position â€” that knowledge and science are inherently democratizing, that technology should be shared rather than hoarded, that the rebuilding of civilization requires bringing people in rather than keeping them out â€” is not naive about the specific villain it is arguing against (Tsukasa is intelligent and his objections to the old world are not wrong), but it is committed to a progressive-Enlightenment position that distinguishes it from shonen's frequent retreat into pure-power ideology.`,
    tags: ['Dr. Stone', 'Riichiro Inagaki', 'Boichi', 'Weekly Shonen Jump', 'science manga', 'TMS Entertainment'],
    entities: ['Riichiro Inagaki', 'Boichi'],
    publishedAt: new Date('2026-06-14'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/dr-stone-science-as-superpower',
  },
  {
    title: 'Dorohedoro: Q Hayashida\'s Underground World',
    slug: 'dorohedoro-q-hayashida-underground-world',
    category: 'manga',
    excerpt: 'Dorohedoro by Q Hayashida ran in Monthly Ikki and then Square Enix\'s monthly magazine from 2000 to 2018. It is the most purely strange manga of its era â€” a story about a man with a lizard head searching for his identity in a post-apocalyptic underground city â€” realized with a visual invention that has no equivalent.',
    content: `"Dorohedoro" by Q Hayashida serialized in Monthly Ikki and later in Monthly ShÅnen Sunday S from 2000 to 2018, producing 23 collected volumes. The series is set in a world divided between the Hole â€” a perpetually overcast, decaying city populated by ordinary humans who are used as subjects by sorcerers â€” and the sorcerers' world, a cleaner dimension accessible through doors. The protagonist, Caiman, is a man with a lizard's head who cannot remember who he is or how he got this way, and who suspects that a sorcerer transformed him; he and his friend Nikaido investigate his origins while killing sorcerers and checking whether any of them match the face of the person Caiman sees inside his own mouth â€” a strange man who decides whether the sorcerers he encounters live or die.

The premise is bizarre enough to constitute a warning, and "Dorohedoro" is not for readers who need coherent genre classification. The series is part noir, part horror, part dark comedy, part body horror, part action, and the mix is consistently unstable in ways that are deliberate rather than accidental. Hayashida builds a world dense enough to support the instability â€” the sorcerer society's class structure, the specific rules governing magic (sorcerers produce smoke from which their power is formed, and the quality and type of smoke varies by individual), the history of the Hole and its relationship to the sorcerer world â€” and this density gives the series's most surreal moments a grounding that prevents them from feeling arbitrary.

Hayashida's art is the series' primary argument for its existence. The character designs â€” including a cast of masked, deformed, or grotesquely modified figures â€” are immediately distinctive and carry specific personality information in their visual construction. The Hole's architecture, realized in cross-hatched detail that gives the environment a specific texture of decay and improvisation, is among the most evocative environmental design in manga. The series' violence â€” and there is significant violence â€” is depicted with a matter-of-factness that is more disturbing than graphic horror would be.

The 2020 MAPPA anime adaptation, produced in CGI by CGCG Studio, was received as a visually successful translation of Hayashida's style into three dimensions. That a CGI adaptation managed to preserve the character of the source material's visual world is itself an achievement.`,
    tags: ['Dorohedoro', 'Q Hayashida', 'Monthly Ikki', 'MAPPA', 'dark fantasy manga', 'CGI anime'],
    entities: ['Q Hayashida', 'MAPPA'],
    publishedAt: new Date('2026-06-16'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/dorohedoro-q-hayashida-underground-world',
  },
  {
    title: 'Kakegurui: Gambling as Character Revelation',
    slug: 'kakegurui-gambling-as-character-revelation',
    category: 'manga',
    excerpt: 'Kakegurui by Homura Kawamoto and TÅru Naomura has run in Square Enix\'s Monthly GFantasy since 2014. Its high-school gambling setting is a vehicle for a specific argument: that what a person is willing to risk, and what they feel while risking it, reveals more about their character than anything else they might do.',
    content: `"Kakegurui â€” Compulsive Gambler" by Homura Kawamoto (writing) and TÅru Naomura (art) serialized in Square Enix's Monthly GFantasy from March 2014 and continues. The series is set at Hyakkaou Private Academy, an elite high school where students' social standing is determined entirely by their performance in gambling â€” winners rank highly, losers are reduced to "housepets" who must serve their classmates. The protagonist, Yumeko Jabami, transfers in and immediately disrupts the school's established hierarchy because she gambles not to win but to feel â€” her enjoyment of gambling is disconnected from the outcome, located entirely in the experience of risking everything.

The gambling premise is a vehicle for character revelation, and Kawamoto deploys it with consistent thematic purpose. The games in "Kakegurui" are not primarily about the mechanics of gambling â€” they are about what each participant is willing to do to win, what they are willing to risk, and what their choices under pressure reveal about their values and their psychology. The school's existing power structure is built on controlled gambling â€” students who win consistently because they have rigged the games, whose advantage is information rather than skill or nerve â€” and Yumeko's disruption of this structure is a disruption of the difference between genuine risk and managed risk.

Yumeko herself is the series' most original element: a protagonist whose enjoyment of gambling is explicitly presented as a compulsion, who is depicted in states of near-erotic pleasure when gambling genuinely threatens her, and who does not represent a healthy relationship to risk. The series does not frame her as a role model. Her compulsion is the mechanism through which the series reveals other characters, because her genuine willingness to lose provokes genuine responses from opponents who have only ever faced calculated risk.

Naomura's art is essential to the series' success. The character expressions â€” the specific faces that characters make when gambling goes wrong, or when Yumeko's pleasure at being in genuine danger is visible â€” are depicted with an excess that mirrors the series' tonal register. The visual language for internal psychological states is exaggerated in ways that would look wrong in a more grounded work and look exactly right here.`,
    tags: ['Kakegurui', 'Homura Kawamoto', 'Monthly GFantasy', 'gambling manga', 'MAPPA anime', 'school manga'],
    entities: ['Homura Kawamoto'],
    publishedAt: new Date('2026-06-18'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/kakegurui-gambling-as-character-revelation',
  },
  {
    title: 'Bungo Stray Dogs: Kafka Asagiri\'s Literary Ability Manga',
    slug: 'bungo-stray-dogs-kafka-asagiri-literary-ability-manga',
    category: 'manga',
    excerpt: 'Bungo Stray Dogs by Kafka Asagiri and Sango Harukawa has run in Young Ace since 2012. It names its characters after real literary figures â€” Osamu Dazai, Fyodor Dostoevsky, Edgar Allan Poe â€” and gives them abilities derived from their actual works. The conceit is more substantial than a gimmick, and the series has used it to build one of manga\'s more complex political thriller narratives.',
    content: `"Bungo Stray Dogs" by Kafka Asagiri (writing) and Sango Harukawa (art) serialized in Young Ace from December 2012 and continues. The series is set in a version of Yokohama where individuals called Ability Users possess supernatural powers named after literary works by their namesake real-world authors. The protagonist, Atsushi Nakajima (named after the Japanese author of "Sangetsuki"), joins the Armed Detective Agency â€” an organization of Ability Users that operates as a private detective agency and functions as a buffer between the Port Mafia and the Guild, two other large organizations of Ability Users competing for control of the city.

The literary naming conceit is the series' most distinctive element, and Asagiri uses it with more thematic purpose than a purely cosmetic naming exercise would require. Osamu Dazai's ability â€” "No Longer Human," the title of the real Dazai's most famous novel â€” nullifies other Abilities on contact, and the specific irony of a character named after a man famous for his inability to live normally possessing an ability that denies others their defining power is the kind of resonance that elevates the conceit above gimmick. Fyodor Dostoevsky's ability connects to themes of crime and punishment; Edgar Allan Poe's ability is built around mystery and observation; the correspondences are not always tight, but they are always considered.

The Port Mafia in "Bungo Stray Dogs" is one of manga's more interestingly developed antagonist organizations: structured with enough moral complexity that its members are sympathetic rather than simply evil, led by characters whose positions are comprehensible rather than malevolent, and engaged with the protagonist organization in a relationship that is genuinely adversarial without reducing to hero-villain dynamics. The series' political structure â€” three major organizations, a government organization operating in the background, and a cast of characters distributed across all of them â€” is managed with enough consistency that shifts in alliance and revelation have the texture of genuine consequence rather than plot convenience.

The Bones anime adaptation, which has run across multiple seasons from 2016, has been received as a faithful and visually competent rendering of the manga's style, maintaining the series' specific balance of dark thriller mechanics and character comedy.`,
    tags: ['Bungo Stray Dogs', 'Kafka Asagiri', 'Young Ace', 'Bones', 'literary manga', 'ability manga'],
    entities: ['Kafka Asagiri', 'Bones'],
    publishedAt: new Date('2026-06-20'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/bungo-stray-dogs-kafka-asagiri-literary-ability-manga',
  },
  {
    title: 'The Vision of Escaflowne: The Isekai Before Isekai Was a Genre',
    slug: 'vision-of-escaflowne-isekai-before-isekai-was-genre',
    category: 'anime',
    excerpt: 'The Vision of Escaflowne aired in 1996 and combined mecha action, fantasy world-building, romance, and tarot prophecy in a single 26-episode series that prefigured the isekai genre\'s conventions by two decades. It is a reminder that the genre\'s tropes have been examined at a higher level than most recent entries achieve.',
    content: `"The Vision of Escaflowne" was produced by Sunrise and directed by Kazuki Akane, airing 26 episodes in 1996. The series follows Hitomi Kanzaki, a Japanese high school student with a talent for tarot reading, who is transported to Gaea â€” a world visible from Earth as a moon â€” where she becomes involved in a conflict involving the ancient mecha Escaflowne and its pilot, Van Fanel, the prince of a kingdom recently destroyed by the Zaibach Empire. The series combines fantasy world-building, mecha combat, romance involving Hitomi, Van, and the knight Allen Schezar, and a consistent thread of fate and prophecy that runs through every element of the plot.

The series was produced in a period when isekai was not yet a recognized genre â€” the term was not in common use, and the conventions that now define it (the truck, the status screen, the harem, the chosen one) had not yet been codified into formula. "Escaflowne" shares the core isekai premise â€” girl from our world transported to a fantasy world, events of the fantasy world connected to the girl's presence â€” but without the genre's subsequent deformations. The fantasy world is developed with its own political and physical logic that exists prior to and independent of Hitomi's arrival; she is important to it not because the world needs her specifically but because her gift for precognition makes her useful to multiple competing factions.

The combination of mecha and fantasy is handled without the tonal inconsistency that the combination often produces. The mechas â€” called Guymelefs â€” are integrated into the medieval fantasy world's visual and social logic, powered by drag energy (an energy drawn from the pilot's "luck") in a way that connects the mechanical to the metaphysical. The Zaibach Empire's giant fate-altering machine, and the philosophical stakes of its operation â€” whether altering fate eliminates suffering or simply eliminates the resistance to suffering that gives life meaning â€” gives the series' climax a thematic weight beyond what the action would require.

Yoko Kanno's score, which preceded her later celebrated work on "Cowboy Bebop" and "Ghost in the Shell: Stand Alone Complex," is among the most thematically integrated scores in anime: the Celtic and orchestral elements reflect the world's specific blend of medieval and mystical, and the musical themes are developed with enough sophistication that the emotional information carried by leitmotif is distinct from what the visual track is doing.`,
    tags: ['Escaflowne', 'Sunrise', 'Kazuki Akane', 'isekai history', 'mecha fantasy', 'Yoko Kanno'],
    entities: ['Sunrise', 'Yoko Kanno'],
    publishedAt: new Date('2026-06-22'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/vision-of-escaflowne-isekai-before-isekai-was-genre',
  },
  {
    title: 'Mobile Suit Gundam: Iron-Blooded Orphans and What Child Soldiers Cost',
    slug: 'gundam-iron-blooded-orphans-what-child-soldiers-cost',
    category: 'anime',
    excerpt: 'Iron-Blooded Orphans is the Gundam series written by Mari Okada that refused to let its child soldiers be heroes without cost. It is the darkest main Gundam entry in decades, and the only one whose ending is genuinely difficult to watch because of what was built rather than what was lost.',
    content: `"Mobile Suit Gundam: Iron-Blooded Orphans" was produced by Sunrise and aired across two seasons from October 2015 to April 2017, written by Mari Okada and directed by Tatsuyuki Nagai. The series is set in a future where Mars has been colonized but its inhabitants are treated as an underclass by the Earth political establishment; the protagonist, Mikazuki Augus, is a member of Tekkadan, a private military organization staffed primarily by orphaned children who have had the Alaya-Vijnana System â€” a spine-implanted control interface â€” surgically installed to pilot mobile suits. The system connects the pilot's nervous system directly to the machine at significant physical cost.

Okada's creative decision â€” to write a Gundam series in which the protagonists are child soldiers who have been physically modified to function as weapons â€” is the most significant editorial choice the franchise has made in decades. The Alaya-Vijnana System is not presented as a gift or a superpower; it is an irreversible modification performed on children whose poverty and lack of alternatives made them compliant with the procedure. Mikazuki cannot make the emotional connections that other characters make; the system has been connected for so long, and has taken so much of what his nervous system would have developed, that he experiences himself primarily as a tool whose purpose is to fight. This is not presented as character flaw but as accurate self-knowledge.

The series' first season is a success story: Tekkadan fights its way from Mars to Earth, overcomes established military organizations through violence and cunning, and achieves a position that suggests their circumstances might genuinely improve. The second season is the cost of that success. Okada refuses to allow the first season's momentum to continue without consequence; the political alliances and compromises that enabled Tekkadan's rise become the mechanisms of its destruction, and the characters who died in the first season begin to feel like the first installment of a bill that is still being paid.

The ending â€” which is among the most difficult in recent Gundam entries â€” is not gratuitous. Every loss in the final arc is the earned consequence of specific decisions made by specific characters under specific pressures. The difficulty of watching it is the difficulty of watching inevitability arrive.`,
    tags: ['Iron-Blooded Orphans', 'Gundam', 'Sunrise', 'Mari Okada', 'mecha anime', 'anime 2015'],
    entities: ['Sunrise', 'Mari Okada'],
    publishedAt: new Date('2026-06-24'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/gundam-iron-blooded-orphans-what-child-soldiers-cost',
  },
  {
    title: 'Promare: Studio Trigger\'s Theatrical Statement',
    slug: 'promare-studio-trigger-theatrical-statement',
    category: 'anime',
    excerpt: 'Promare was released in 2019 as Studio Trigger\'s first theatrical feature film, directed by Hiroyuki Imaishi with screenplay by Kazuki Nakashima â€” the same team behind Gurren Lagann and Kill la Kill. It is the most concentrated expression of the Trigger aesthetic: visual maximalism as emotional argument.',
    content: `"Promare" was released in May 2019 as Studio Trigger's first theatrical feature film, directed by Hiroyuki Imaishi with screenplay by Kazuki Nakashima. The film is set thirty years after the appearance of the Burnish â€” humans who spontaneously developed the ability to generate flames â€” whose initial uncontrolled combustions destroyed half the world's population. In the present, the Burnish are treated as terrorists and managed by Burning Rescue, a firefighting unit that uses mechanical exo-suits to suppress their flames. The protagonist, Galo Thymos, is a hot-blooded Burning Rescue operative who encounters Lio Fotia, the leader of an underground Burnish resistance, and gradually discovers that the official narrative about the Burnish is not the complete picture.

The Trigger aesthetic â€” "Gurren Lagann" and "Kill la Kill" are the relevant predecessors â€” is built around visual excess as emotional argument: the understanding that animation's specific capability for abstraction allows visual intensity to communicate emotional states that more realistic depiction could not. In "Promare," this aesthetic reaches its most concentrated expression in a theatrical context that provides the budget and runtime to sustain the intensity without the episodic pacing that television requires. The fight sequences are animated with a geometric abstraction â€” angular flame constructs, mecha designs that reference Imaishi's previous work while developing in a new direction â€” that prioritizes emotional legibility over physical realism.

Nakashima's screenplay, which applies the same structural logic as "Gurren Lagann" â€” the protagonist's initial opposition to the antagonist is revealed to be a misunderstanding of the actual stakes, requiring the protagonist to turn against their own side to address the genuine threat â€” is the film's most criticized element for viewers who find the structure too familiar. The criticism is fair; the film's plot operates on a familiar template. The counter-argument is that the template is executed well enough, and the visual realization of the climactic sequences is distinctive enough, that the familiarity of the structure does not exhaust the film's content.

"Promare" was among the most commercially successful anime theatrical films in Japan in 2019, and its overseas theatrical run demonstrated that Trigger's visual style had developed an international audience substantial enough to sustain theatrical distribution.`,
    tags: ['Promare', 'Studio Trigger', 'Hiroyuki Imaishi', 'anime film', 'anime 2019', 'Kazuki Nakashima'],
    entities: ['Studio Trigger', 'Hiroyuki Imaishi'],
    publishedAt: new Date('2026-06-26'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/promare-studio-trigger-theatrical-statement',
  },
  {
    title: 'Great Teacher Onizuka: The Delinquent Who Became a Better Teacher Than Everyone Else',
    slug: 'great-teacher-onizuka-delinquent-became-better-teacher',
    category: 'manga',
    excerpt: 'Great Teacher Onizuka by Toru Fujisawa ran in Weekly Shonen Magazine from 1997 to 2002 and follows Eikichi Onizuka, a former gang member who becomes a high school teacher, not to educate but to meet a beautiful wife â€” and who turns out to be the best teacher any of his students have ever had. It is the funniest serious manga of its decade.',
    content: `"Great Teacher Onizuka" ("GTO") by Toru Fujisawa serialized in Weekly ShÅnen Magazine from July 1997 to April 2002, producing 25 collected volumes. The series follows Eikichi Onizuka, a 22-year-old former gang member and martial arts champion who decides to become a teacher at an elite Tokyo private school â€” his stated motivation is to meet a beautiful wife from among his students' mothers, his actual capability becomes the ability to reach students that conventionally excellent teachers cannot. His class is a group of students who have systematically destroyed previous teachers through psychological warfare, and the series follows Onizuka's interactions with each of them as he discovers, one by one, what is actually wrong in each student's life.

The series' central tension â€” between Onizuka's complete disregard for institutional educational norms and his genuine effectiveness at the core purpose of teaching â€” is the mechanism through which it argues a specific position: that the formal qualifications and behavioral expectations of educational institutions are not the same as the capacity to understand and help young people. Onizuka is unqualified in every formally measurable sense and is the most qualified person in the building in the only sense that matters to his students.

Each student's arc â€” the reasons behind their destructive behavior, what they actually need, and how Onizuka provides it through means that no rational institutional actor would sanction â€” constitutes the series' primary emotional content. The students are developed with enough specificity that their problems feel real rather than symbolic, and Onizuka's solutions â€” which frequently involve violence, rule-breaking, and stunts that should result in his immediate termination â€” are calibrated to the specific problem rather than applied generically. The series trusts its readers to understand that the method does not constitute a teachable technique; what Onizuka provides is not a replicable approach but genuine attention to each specific person in front of him.

Fujisawa's art is the series' tonal guide: Onizuka's expressions are drawn with a broad physical comedy vocabulary that establishes him as a comic figure in his rest state, but the dramatic sequences involving students in genuine distress are handled with restraint that makes the emotional content land. The ability to maintain both registers simultaneously â€” without the comedy undermining the drama or the drama weighing down the comedy â€” is the series' central formal achievement.`,
    tags: ['Great Teacher Onizuka', 'GTO', 'Toru Fujisawa', 'Weekly ShÅnen Magazine', 'school manga', 'anime 1999'],
    entities: ['Toru Fujisawa'],
    publishedAt: new Date('2026-06-28'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/great-teacher-onizuka-delinquent-became-better-teacher',
  },
  {
    title: 'Odd Taxi: The Walrus Who Saw Too Much',
    slug: 'odd-taxi-walrus-who-saw-too-much',
    category: 'anime',
    excerpt: 'Odd Taxi aired in Spring 2021 as an anime original about a walrus taxi driver named Odokawa who gets entangled in a missing persons case, a yakuza dispute, and an idol group controversy â€” all in thirteen episodes that are among the best-constructed anime of the decade.',
    content: `"Odd Taxi" aired from April to July 2021 as an anime original produced by OLM and P.I.C.S., directed by Baku Kinoshita with screenplay by Kazuya Konomoto. The series follows Hiroshi Odokawa, a middle-aged walrus taxi driver with insomnia, no close relationships, and a manner that his passengers variously find annoying or oddly easy to confide in. The series takes place in a world populated by anthropomorphic animals â€” the reasons for this visual choice are eventually explained, and the explanation is one of the series' better reveals â€” and each episode follows Odokawa's encounters with a rotating cast of passengers whose stories gradually converge on a missing person case involving a high school girl, a yakuza faction, an idol group, and a college comedy duo with aspirations and envy.

The structural achievement of "Odd Taxi" is the management of its converging plot threads. Thirteen episodes is a tight runtime for the number of narrative lines the series runs simultaneously, and Konomoto's screenplay calibrates revelation against information throughout with enough precision that no reveal arrives before it has been adequately set up and no connection between storylines is arbitrary. The series is, in the final analysis, a mystery â€” but constructed like a literary mystery rather than a genre mystery, in which the investigation of the crime is also an investigation of the social conditions that produced it.

Odokawa as a protagonist is a specific type that anime rarely produces: a middle-aged misanthrope without redeeming social warmth, whose tendency to say precisely what he observes rather than what social context requires of him is both his defining quality and the reason his passengers find him so easy to talk to. His insomnia and the reason for it are the series' ultimate revelation, and the management of this information â€” kept present in the series' visual vocabulary without being explained until the moment the explanation is earned â€” is the series' most impressive structural decision.

The anthropomorphic animal design was widely speculated to be primarily aesthetic; the actual reason, revealed in the final episodes, is one of those moments where a series' formal choices are retroactively revealed as content. That "Odd Taxi" achieved this in an original anime without a prior source material to provide structural guidance makes it the clearest recent demonstration of what original anime production can accomplish.`,
    tags: ['Odd Taxi', 'OLM', 'anime original', 'anime 2021', 'mystery anime', 'Baku Kinoshita'],
    entities: ['OLM'],
    publishedAt: new Date('2026-06-30'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/odd-taxi-walrus-who-saw-too-much',
  },
  {
    title: 'Texhnolyze: The Anime That Refused to Comfort You',
    slug: 'texhnolyze-anime-that-refused-to-comfort-you',
    category: 'anime',
    excerpt: 'Texhnolyze aired in 2003 with a setting designed by Yoshitoshi ABe, a screenplay by Chiaki J. Konaka, and a visual direction by Hiroshi Hamasaki that deliberately withheld conventional narrative cues. It is the most formally demanding anime of its era and one of the few works that uses nihilism as honest conclusion rather than adolescent posture.',
    content: `"Texhnolyze" was produced by Madhouse, directed by Hiroshi Hamasaki, with original character design by Yoshitoshi ABe and screenplay by Chiaki J. Konaka, airing 22 episodes from April to September 2003. The series is set in Lux, an underground city that produces a substance called Raffia used to replace lost limbs with mechanical prosthetics â€” the Texhnolyze of the title. The city is controlled by three competing factions â€” the Organo (criminal organization), the Union (anarchic insurgents), and the Shapes (inhuman figures who exist in the tunnels below Lux) â€” and the protagonist, Ichise, is a prizefighter who loses an arm and a leg after angering the Organo's leadership and receives Texhnolyze limbs from a scientist named Doc.

The first four episodes of "Texhnolyze" contain almost no dialogue. Hamasaki's direction establishes the series' visual language before any narrative explanation is provided: the underground city's perpetual half-light, the texture of Raffia, the physicality of the violence that structures social relations in Lux. The viewer must construct the world from visual information alone, which produces an engagement with the material that conventional narrative exposition would bypass. This approach was polarizing at broadcast â€” many viewers rejected it as inaccessible â€” and remains the series' most discussed formal choice.

ABe's character designs connect the series to his other work â€” he designed the characters for "Serial Experiments Lain" and "Haibane Renmei" â€” but "Texhnolyze" uses that visual vocabulary for opposite tonal purposes. Where "Haibane Renmei" is quiet and contemplative, "Texhnolyze" is brutal; where "Lain" is disorienting and ultimately hopeful, "Texhnolyze" is disorienting and ultimately not. Konaka's screenplay â€” which also includes work on "Serial Experiments Lain" and "Ghost in the Shell: Stand Alone Complex" â€” develops the city's political and metaphysical dimensions across the series with enough care that the ending's nihilism is earned rather than imposed.

The ending of "Texhnolyze" is genuinely bleak in a way that distinguishes it from anime that perform bleakness as tone. It is bleak because the world it has constructed over twenty-two episodes does not support any other conclusion. The series does not offer comfort because it has decided, based on what it has built, that comfort is not available. This makes it one of the few works in any medium where nihilism functions as honest conclusion rather than aesthetic choice.`,
    tags: ['Texhnolyze', 'Madhouse', 'Yoshitoshi ABe', 'Chiaki J. Konaka', 'dark anime', 'anime 2003'],
    entities: ['Madhouse', 'Yoshitoshi ABe'],
    publishedAt: new Date('2026-07-02'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/texhnolyze-anime-that-refused-to-comfort-you',
  },
  {
    title: 'Blue Period: The Manga That Takes Art Education Seriously',
    slug: 'blue-period-manga-takes-art-education-seriously',
    category: 'manga',
    excerpt: 'Blue Period by Tsubasa Yamaguchi has run in Monthly Afternoon since 2017. It follows a high-achieving student who discovers painting at seventeen and decides to apply to Tokyo University of the Arts â€” the most competitive art school in Japan. It is the most accurate fictional depiction of art education in manga.',
    content: `"Blue Period" by Tsubasa Yamaguchi serialized in Monthly Afternoon from June 2017 and continues. The series follows Yatora Yaguchi, a high school student who has excelled academically through efficient strategy rather than genuine interest â€” doing what is required, maintaining grades, forming friendships that function â€” until he encounters a painting in his school's art room and is undone by it. His decision to apply to Tokyo University of the Arts (commonly called Geidai), the most selective and prestigious art school in Japan with an acceptance rate under two percent, drives the series' narrative.

The series' most valuable quality is its accuracy about what art education actually involves. The preparation process for Geidai's entrance examinations â€” which test specific practical skills in still life drawing, figure drawing, color composition, and conceptual expression â€” is depicted with the same specificity that a sports manga brings to athletic training. Yatora's development from someone who cannot draw to someone who can compete for Geidai admission is shown as a process of acquiring technique, developing a visual vocabulary, and learning to express something genuinely personal in a format that is technically demanding. The series does not suggest that natural talent is sufficient or that effort alone compensates for missing technique; it takes the dual requirement seriously.

The art school environment depicted in the series â€” the specific social dynamics of a community organized around aesthetic judgment, the comparison culture, the way that critique functions as both learning and wounding â€” is the series' secondary subject. Yatora's encounters with students who have been painting since childhood, with instructors whose aesthetic preferences are specific and consequential, and with the question of what it means to make something personal in a context that evaluates it impersonally, constitute an examination of art education's specific pressures that functions independently of the narrative's competitive structure.

Yamaguchi's artwork in "Blue Period" is itself an argument for the series: the paintings and drawings that appear within the pages are realized with enough visual intelligence that the reader can assess them as actual works rather than as narrative placeholders. The specific qualities that Yatora's paintings develop across the series â€” the things that make them better as the series progresses â€” are visible to a reader with no art background, which makes the series' teaching effective at a formal level.`,
    tags: ['Blue Period', 'Tsubasa Yamaguchi', 'Monthly Afternoon', 'art manga', 'anime 2021', 'Geidai'],
    entities: ['Tsubasa Yamaguchi'],
    publishedAt: new Date('2026-07-04'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/blue-period-manga-takes-art-education-seriously',
  },
  {
    title: 'Wotakoi: Love Is Hard for Otaku and Why Adult Romance Manga Works',
    slug: 'wotakoi-love-is-hard-for-otaku-adult-romance-manga',
    category: 'manga',
    excerpt: 'Wotakoi by Fujita began as a webcomic in 2014 before moving to Ichijinsha\'s Comic POOL. It follows adults with office jobs who are also serious otaku, navigating relationships. Its success demonstrated that romance manga with adult protagonists who have fully formed interests and established friendships could find a large audience.',
    content: `"Wotakoi: Love Is Hard for Otaku" ("Wotaku ni Koi wa Muzukashii") by Fujita began as a webcomic in 2014 before commercial publication at Ichijinsha's Comic POOL, producing 11 collected volumes. The series follows Narumi Momose, a woman who hides her otaku interests from her coworkers after bad romantic experiences, who runs into her childhood friend Hirotaka Nifuji at her new company; they start dating as a matter of convenience that gradually becomes genuine. The ensemble includes two other coworkers â€” Hanako Koyanagi and TarÅ Kabakura, a couple with a longer history and sharper dynamics â€” whose relationship provides both comic contrast and emotional depth.

The distinguishing quality of "Wotakoi" within romance manga is the professional-adult setting and its implications. The characters have jobs, bills, established social identities, and specific hobbies pursued at a level of investment that indicates adult commitment rather than adolescent phase. Narumi plays otome games and reads BL manga; Hirotaka plays video games with the focus of someone who has been doing it for twenty years; Hanako's cosplay is skilled and serious; Kabakura's gaming is competitive. These interests are not presented as immaturity but as the specific content of the characters' adult selves.

This matters for the romance because the series' central question â€” whether people who are this specific about their interests can be understood and accepted by a partner â€” is a question that adult readers recognize as real. The adolescent romance manga's central question (will they confess? will they be rejected?) is not available to characters who are already in relationships; Wotakoi's central question (can you be fully known by the person you are with, including the parts of yourself that you have habitually concealed?) is more immediately recognizable to readers whose romantic lives have moved past confession anxiety.

The A-1 Pictures anime adaptation in 2018 was received as a warm and competent rendering of the source material's appeal, generating an audience for the manga and demonstrating that office romance with otaku protagonists had sufficient mainstream appeal to support a full production.`,
    tags: ['Wotakoi', 'Fujita', 'Ichijinsha', 'josei manga', 'otaku romance', 'A-1 Pictures'],
    entities: ['A-1 Pictures'],
    publishedAt: new Date('2026-07-06'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/wotakoi-love-is-hard-for-otaku-adult-romance-manga',
  },
  {
    title: 'Weekly ShÅnen Sunday: Jump\'s Oldest Rival and Its Legacy',
    slug: 'weekly-shonen-sunday-jumps-oldest-rival-legacy',
    category: 'industry',
    excerpt: 'Weekly ShÅnen Sunday launched in 1959 â€” the same year as Weekly ShÅnen Magazine and one year before Jump. It published Doraemon, Inuyasha, Case Closed, Touch, and Zettai Karen Children. It is Jump\'s oldest rival and the proof that commercial dominance is not the only way for a manga magazine to matter.',
    content: `Weekly ShÅnen Sunday launched on March 17, 1959 â€” the same date as Weekly ShÅnen Magazine, and one year before Weekly ShÅnen Jump. Published by Shogakukan, the magazine has competed with Jump throughout the latter's market dominance without ever matching its circulation peak, and has produced a catalog that is, by several measures, as significant as Jump's without receiving equivalent international recognition. The reason for this asymmetry is primarily that Sunday's most globally important series â€” "Detective Conan" ("Case Closed"), "Inuyasha," "Doraemon" (which ran from 1969 to 1996 in various Sunday-affiliated publications) â€” are recognized worldwide but not always associated with their magazine of origin.

"Detective Conan" by Gosho Aoyama has been serializing in Sunday since 1994 and is the longest-running mystery manga in history. As of 2025 it has produced over 1,100 chapters and remains in publication, following a teenager who is de-aged by a poison and operates as a detective under a false identity while searching for the organization responsible for his transformation. The series' longevity reflects the specific commercial sustainability of the mystery format: unlike battle manga, which requires narrative escalation that eventually exhausts itself, mystery manga can sustain indefinitely through the generation of new cases without requiring the protagonist to grow more powerful.

"Inuyasha" by Rumiko Takahashi serialized from 1996 to 2008 and was among the most globally exported manga of the 2000s, introducing many Western readers to the magazine without their being aware of it. Takahashi's relationship with Sunday is fundamental to the magazine's identity â€” "Urusei Yatsura," "Maison Ikkoku," and "Ranma Â½" also appeared there â€” and her decades of serialization represent one of the most commercially and artistically significant creator-magazine relationships in manga history.

Sunday's editorial culture has historically been distinct from Jump's: where Jump developed the explicit competitive circulation mechanics (reader polls, the threat of cancellation shaping narrative decisions), Sunday operated with longer creative timelines and a greater willingness to sustain series with steady rather than spectacular readership. The difference produced a magazine whose back catalog includes more series with deliberate narrative construction and fewer series with unresolved plotlines â€” a tradeoff that reflects genuine editorial values rather than simply different market positioning.`,
    tags: ['Weekly ShÅnen Sunday', 'Shogakukan', 'manga magazine', 'Detective Conan', 'Inuyasha', 'manga industry'],
    entities: ['Shogakukan'],
    publishedAt: new Date('2026-07-08'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/weekly-shonen-sunday-jumps-oldest-rival-legacy',
  },
];

async function main() {
  console.log(`Seeding ${ESSAYS.length} essays (batch 12)...`);
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

