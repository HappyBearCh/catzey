/**
 * Seventh batch of editorial essays.
 * Run with: npx tsx scripts/seed-essays-7.ts
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ESSAYS = [
  {
    title: 'A Silent Voice: The Anime Film About Bullying That Refuses Easy Answers',
    slug: 'a-silent-voice-anime-film-bullying-refuses-easy-answers',
    category: 'anime',
    excerpt: 'Yoshitoki Oima\'s manga about a boy who bullied a deaf girl and must live with what he did became a Kyoto Animation film of rare emotional honesty. Neither the bully nor the bullied is simplified, and the film is harder for it.',
    content: `"A Silent Voice" was adapted from Yoshitoki Oima's manga by Kyoto Animation and released theatrically in September 2016. Oima had published the manga in Weekly Shonen Magazine from 2013 to 2014, and its subject — a boy who relentlessly bullied a deaf classmate in elementary school and must reckon with what he did years later — was unusual for a mainstream shonen magazine. The manga won the Kodansha Manga Award in the general category in 2015, and the film adaptation, directed by Naoko Yamada, became one of the highest-grossing anime films of its year internationally.

The film's central character, Shoya Ishida, is introduced as the primary perpetrator of a sustained bullying campaign against Shoko Nishimiya, a girl who joined his elementary school class unable to hear. The bullying is depicted without mitigation: Shoya removes Shoko's hearing aids, mocks her attempts to communicate, and orchestrates the social exclusion that eventually forces her to transfer schools. When the adults in the school become aware of the bullying, Shoya is scapegoated by classmates who participated but are not willing to accept responsibility — and the social isolation he then experiences, while not equivalent to what Shoko suffered, is depicted as genuinely damaging.

What distinguishes "A Silent Voice" from simpler bullying narratives is its refusal to resolve Shoya's guilt through Shoko's forgiveness. The film is interested in what genuine contrition looks like — not the theatrical apology that seeks relief for the apologizer, but the ongoing work of acknowledging harm, accepting consequences, and attempting to act differently without using the attempt as a form of self-exculpation. Shoya spends much of the film with symbolic X marks covering the faces of everyone around him, a visual representation of his inability to make eye contact with people — of the specific psychological withdrawal that his shame produces.

Shoko's perspective is the film's hardest achievement. She is not presented as a saint who forgives easily, nor as someone whose suffering is primarily in service of Shoya's redemption arc. She has her own interiority, her own anger and self-doubt, her own relationships with her family and former classmates that the film takes seriously independently of how they relate to Shoya. The scene in which her anger finally surfaces — in which she says, or tries to say, something she has been unable to say — is the film's emotional center, and it belongs to her rather than to the arc of the person who wronged her.

Kyoto Animation's visual realization is among the studio's finest work: the specificity of the school environments, the care in animating sign language with enough accuracy to be recognizable, the particular quality of light in outdoor scenes that the studio had developed across its career. The film was produced before the July 2019 arson attack that killed 36 KyoAni staff members, and watching it now carries a knowledge that the studio which made it was damaged in ways that the film's emotional honesty makes feel particularly acute.`,
    tags: ['A Silent Voice', 'Yoshitoki Oima', 'Kyoto Animation', 'anime film', 'bullying anime', 'manga 2010s'],
    entities: ['Yoshitoki Oima', 'Kyoto Animation', 'Naoko Yamada'],
    publishedAt: new Date('2025-12-01'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/a-silent-voice-anime-film-bullying-refuses-easy-answers',
  },
  {
    title: 'Trigun: The Space Western That Asked If a Pacifist Can Survive a Violent World',
    slug: 'trigun-space-western-pacifist-violent-world',
    category: 'anime',
    excerpt: 'Trigun follows Vash the Stampede, a wanted outlaw with a 60 billion double dollar bounty whose actual philosophy is absolute non-violence. The series uses its genre framework to ask a genuinely difficult question: can you refuse to kill and still protect the people you love?',
    content: `Yasuhiro Nightow began serializing "Trigun" in Monthly Shonen Captain in 1995, and the series was adapted into anime by Madhouse in 1998. The premise is a genre hybrid: a space western set on a desert planet colonized by humans who fled a dying Earth, following Vash the Stampede, a man with a massive bounty on his head who is sought by insurance adjusters documenting the destruction that follows him. The destruction is real and so is the bounty; what the insurance agents discover is that Vash has caused none of it deliberately, because Vash is a pacifist who will not kill even when killing would be easier, safer, or morally defensible.

The philosophical tension that drives the series is not abstract. Vash's pacifism is tested repeatedly and with escalating severity by an antagonist — his brother Knives — who believes that humanity is a species of destroyers that deserves extinction. Where Vash has chosen to love humans despite their capacity for violence, Knives has chosen to condemn them because of it. The siblings represent two responses to the same observation about human nature, and the series treats neither response as simply correct: Vash's love is costly and has been tested by centuries of watching humans harm each other and harm him; Knives's contempt is a reasonable inference from the evidence, even if the conclusion it produces is monstrous.

The anime's treatment of violence is unusually serious for its genre. Vash does not simply win fights through superior ability — he wins fights by finding ways to avoid killing his opponents, which is frequently harder than simply defeating them. The tactical ingenuity required to subdue someone without lethal force under conditions that were designed for lethal force is depicted with enough specificity that the pacifism feels like a genuine discipline rather than a narrative convenience. When Vash fails to prevent harm, the failure costs him, and the cost is shown.

"Trigun Stampede," a 2023 CGI remake produced by Orange Studio, reimagined the series with a visual style that divided the original fanbase — the CGI aesthetic was either stunning or alienating depending on the viewer — but introduced the story to a new generation and demonstrated that the philosophical content had lost none of its relevance. Questions about non-violence, about the moral calculus of harm reduction, about whether one person's refusal to kill makes any difference in a world that is killing anyway, are not less interesting in 2023 than they were in 1998.

Nightow's manga extended beyond the anime's storyline, exploring Vash's history with greater depth and developing the cosmological backstory that the anime could only gesture at. The manga's ending gives Vash's pacifism a more fully realized philosophical grounding than the anime's constraints allowed. Both versions are worth encountering, and they serve each other — the anime has a warmth and momentum that the manga's density sometimes sacrifices, while the manga has a seriousness and completeness that the anime's commercial requirements prevented.`,
    tags: ['Trigun', 'Yasuhiro Nightow', 'Madhouse', 'space western', 'anime 1998', 'pacifism anime'],
    entities: ['Yasuhiro Nightow', 'Madhouse', 'Vash the Stampede'],
    publishedAt: new Date('2025-12-03'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/trigun-space-western-pacifist-violent-world',
  },
  {
    title: 'Rurouni Kenshin: A Great Manga and Its Convicted Creator',
    slug: 'rurouni-kenshin-great-manga-convicted-creator',
    category: 'manga',
    excerpt: 'Rurouni Kenshin is one of the finest samurai manga ever written. Its creator, Nobuhiro Watsuki, was convicted in 2018 for possession of child sexual abuse material. Here\'s an honest account of both facts and what they ask of readers.',
    content: `Nobuhiro Watsuki serialized "Rurouni Kenshin" in Weekly Shonen Jump from 1994 to 1999. The series follows Himura Kenshin, a legendary assassin from the Bakumatsu era who has sworn never to kill again and now wanders Meiji-era Japan protecting the innocent with a reverse-blade sword. Over fifteen volumes, the series developed into one of the most fully realized samurai manga ever produced — its historical research was extensive, its action choreography was innovative, its character work sustained through multiple long arcs at a level of quality that the magazine's weekly production schedule rarely allows.

The Kyoto arc — roughly volumes 7 through 18 — is the work's peak and among the finest sustained manga storytelling of the 1990s. The antagonist Shishio Makoto, a man burned alive by the Meiji government and left for dead, is one of manga's most thoughtfully constructed villains: his ideology — that in a world of predators, only the strong deserve to survive — is a coherent extrapolation from his experience rather than generic evil, and his physical deterioration (his body continues to burn from within, limiting how long he can fight) gives him an urgency that the combat sequences use as dramatic structure. The final battle is a technical achievement in depicting multi-party combat in a way that maintains spatial coherence across many pages.

In November 2017, Watsuki was investigated by Tokyo Metropolitan Police for possession of child sexual abuse material. He was subsequently prosecuted, pleaded guilty, and was fined in 2018. The case was reported in Japan and internationally, and the publication of a sequel series he had been developing, "Rurouni Kenshin: The Hokkaido Arc," was suspended during the investigation before resuming. The fine was the minimum statutory penalty, which generated criticism from advocates who felt it was inadequate.

The question of how to relate to work whose creator has been convicted of serious harm is not one with a simple answer, and the anime and manga community has approached it with the full range of responses that such situations produce: continued engagement, complete rejection, and various positions between those poles. What can be said is that Kenshin the character — whose philosophy is specifically about carrying the weight of past violence rather than being excused from it — does not offer any comfortable resolution to the situation of encountering his creator's record. The irony is too specific and too unpleasant to be a coincidence of interpretation.

"Rurouni Kenshin" exists as one of the most accomplished samurai manga ever written, created by a person who committed serious harm and faced a legal accountability that many consider insufficient. Both of these facts are true simultaneously, and reading the series requires holding them simultaneously. The manga does not become less technically accomplished by its creator's crimes; nor does the creator's crimes become more acceptable because the manga is accomplished. These are separate facts, and the discomfort of their coexistence is the honest starting point for any engagement with the work.`,
    tags: ['Rurouni Kenshin', 'Nobuhiro Watsuki', 'samurai manga', 'Weekly Shonen Jump', 'manga 1990s', 'manga controversy'],
    entities: ['Nobuhiro Watsuki', 'Himura Kenshin', 'Weekly Shonen Jump'],
    publishedAt: new Date('2025-12-05'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/rurouni-kenshin-great-manga-convicted-creator',
  },
  {
    title: 'Re:Zero: The Isekai That Takes Suffering Seriously',
    slug: 'rezero-isekai-that-takes-suffering-seriously',
    category: 'light-novels',
    excerpt: 'Re:Zero Starting Life in Another World sends its protagonist back to a save point every time he dies, and uses this mechanic not as a power but as a form of psychological torture. It is the isekai that treats its premise with the most honest emotional weight.',
    content: `"Re:Zero Starting Life in Another World," written by Tappei Nagatsuki and illustrated by Shinichirou Otsuka, began as a web novel in 2012 and was published as a light novel from 2014. The series follows Subaru Natsuki, transported to a fantasy world with the single ability to return to a "checkpoint" in time when he dies, retaining his memories of each death. This ability, which most isekai protagonists would use as the foundation for a comfortable power fantasy, is depicted in "Re:Zero" as a form of psychological torture that the series engages with seriously and without resolution.

The first arc establishes the series' tonal register immediately. Subaru dies multiple times within the first several episodes — each death depicted with physical specificity, each return to the checkpoint shown to be disorienting and destabilizing, each accumulation of memory shown to leave marks on his psychology. By the time the first arc's central crisis resolves, Subaru has experienced a volume and variety of death that the series does not allow him to simply process and move past. He carries it, and the series depicts what carrying it looks like.

The psychological realism is the series' most distinctive quality. Subaru is not a hero who grows through suffering; he is a person who suffers and is damaged by the suffering, who develops coping mechanisms that are not always healthy, who behaves badly under pressure and knows he is behaving badly, who is capable of genuine growth and genuine regression in alternation. The series tracks his mental state with an attention that most isekai does not bother to maintain — his confidence and his fragility appear in the same arcs, sometimes in the same episodes, in ways that feel true to how people actually function under sustained pressure.

The fantasy world that surrounds Subaru is more developed than most isekai settings. The political structures, the magic systems, and the population of characters who have their own motivations independent of Subaru's presence give the world a texture that makes the stakes of Subaru's interventions feel real. When people die in "Re:Zero," the deaths have consequences for the world rather than just for Subaru's emotional state — an important distinction that the series maintains by taking seriously the lives of characters who are not the protagonist.

The anime adaptation, produced by White Fox in 2016, was one of the most-discussed anime of its year, and its second season in 2020–2021 continued to generate sustained critical engagement. The series has not concluded — Nagatsuki continues writing the web novel and light novel simultaneously, at a pace that ensures many more arcs remain — but what has been adapted represents a substantial argument about what isekai can do when it refuses to make the protagonist's convenience the primary value. The discomfort that "Re:Zero" produces in its audience is intentional and is the point.`,
    tags: ['Re:Zero', 'Tappei Nagatsuki', 'isekai', 'light novels', 'White Fox', 'psychological anime'],
    entities: ['Tappei Nagatsuki', 'White Fox'],
    publishedAt: new Date('2025-12-07'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/rezero-isekai-that-takes-suffering-seriously',
  },
  {
    title: 'The Tournament Arc: Why Manga\'s Most Reliable Structure Works So Well',
    slug: 'tournament-arc-mangas-most-reliable-structure',
    category: 'manga',
    excerpt: 'The tournament arc — a series of one-on-one battles in a formalized competitive setting — is the most used structural device in action manga. Here\'s why it works, what it enables that other structures don\'t, and when it becomes a crutch.',
    content: `The tournament arc is so fundamental to action manga that it predates the genre's current form. Before Dragon Ball, before Yu Yu Hakusho, before Hunter x Hunter — before most of the works that contemporary readers associate with tournament arcs — the format appeared in martial arts manga of the 1970s that were themselves adapting conventions from the jidaigeki (historical drama) tradition in which warriors proved themselves through formal combat. The tournament is a structure that manga inherited from older storytelling traditions, refined for the specific requirements of serialized publication, and deployed so consistently that its conventions are now recognized without needing explanation.

Why does the tournament work? Several reasons converge. The formalized setting provides narrative justification for extended combat sequences without requiring elaborate world-building: the tournament exists, fighters compete, the rules are simple. The bracket structure provides built-in escalation: the protagonist must fight stronger opponents as the tournament progresses, and the reader knows from the structure that the finals will feature the strongest available antagonists. The elimination mechanic provides stakes without requiring death: losing a fight has consequences (elimination) without requiring the series to commit to killing characters.

The tournament arc also solves a specific problem of serialized action manga: character introduction and development under time pressure. A single fight, carefully constructed, can establish a new character's abilities, personality, and motivation in a way that would take multiple episodes in a non-combat context. The Dark Tournament arc of "Yu Yu Hakusho" uses its extended format to develop Hiei, Kurama, and Kuwabara into fully realized characters while simultaneously staging escalating battles — the fights are the character development, rather than interruptions of it.

The failure mode of the tournament arc is equally well-documented. When the protagonist's path to victory becomes predictable — when the reader can reconstruct the bracket's outcomes from the series' characterization hierarchy — the tournament loses its tension and becomes an extended display of increasingly powerful techniques without dramatic stakes. The later tournament arcs of certain long-running series have this quality: elaborate productions of fights whose outcomes are structurally determined from the beginning, in which the question is not whether the protagonist will win but what new power they will develop in the process.

The most sophisticated uses of the tournament structure are the ones that use its conventions against themselves. "Hunter x Hunter"'s Heavens Arena arc positions the tournament setting to force Gon and Killua into encounters that reveal limitations rather than powers. "My Hero Academia"'s U.A. Sports Festival uses the tournament format to develop inter-character dynamics rather than simple power comparisons. When the tournament arc functions as a lens rather than a stage — when the competitive structure reveals character rather than simply demonstrating it — it remains one of manga's most productive devices.`,
    tags: ['tournament arc', 'manga structure', 'shonen manga', 'manga analysis', 'Yu Yu Hakusho', 'Hunter x Hunter'],
    entities: [],
    publishedAt: new Date('2025-12-09'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/tournament-arc-mangas-most-reliable-structure',
  },
  {
    title: 'Mushoku Tensei: The Isekai That Takes Its Genre Most Seriously',
    slug: 'mushoku-tensei-isekai-that-takes-genre-seriously',
    category: 'light-novels',
    excerpt: 'Jobless Reincarnation began as an anonymous web novel in 2012 and became the isekai that the genre\'s more serious fans point to as the template for what the form can do when it commits fully. It is also the isekai with the most controversial protagonist.',
    content: `"Mushoku Tensei: Jobless Reincarnation," written by Rifujin na Magonote, began as a web novel in 2012 and was among the works that established the conventions of the contemporary isekai genre before those conventions were so widely recognized that they could be called conventions. Published as a light novel from 2014 and adapted into anime by Studio Bind in 2021, the series follows a 34-year-old man with no accomplishments or social connections who dies and is reincarnated as a baby in a fantasy world, retaining his adult memories and growing up with the advantages that knowledge and adult emotional context provide.

The series' claim to genre seriousness rests on two foundations. First, its world-building: the fantasy world of "Mushoku Tensei" is constructed with a specificity and internal consistency that most isekai does not attempt. The history, geography, political structures, and magical systems of the world develop across the series in ways that feel derived from a coherent underlying reality rather than generated as convenient plot requirements. Characters' lives extend beyond their relationship to the protagonist; the world changes because of events that the protagonist does not cause and is not always aware of.

Second, its treatment of its protagonist's psychology: Rudeus Greyrat carries his adult memories into a child's body and a new life, and the series engages honestly with what this means. His adult understanding of his previous life's failures informs how he approaches his second chance — the specific anxieties, the specific forms of self-sabotage, the specific relational patterns that characterized his first life — and the series tracks his development with enough psychological specificity that his growth and his failures feel continuous with each other rather than arbitrarily assigned by the narrative.

The serious caveat: Rudeus's previous life included behavior toward women that is depicted frankly as problematic, and his reincarnated life includes relationships that a substantial portion of readers find difficult to engage with. The series does not endorse Rudeus's worst impulses — it depicts consequences, complications, and growth — but it also does not sanitize the material, and the resulting content has generated sustained controversy. Readers who engage with the series fully tend to hold these elements in tension with the series' genuine achievements; readers who find the content categorically disqualifying are responding to something real rather than misreading it.

The anime adaptation's visual quality was exceptional enough to generate discussion beyond the light novel community, with Studio Bind's rendering of the fantasy world's scale and variety being particularly praised. The series remains one of the isekai that the genre's more serious readers point to as evidence that the form can sustain genuine craft — while its critics point to it as evidence that "serious craft" and "responsible content" are not the same thing.`,
    tags: ['Mushoku Tensei', 'Rifujin na Magonote', 'isekai', 'light novels', 'Studio Bind', 'web novel'],
    entities: ['Rifujin na Magonote', 'Studio Bind'],
    publishedAt: new Date('2025-12-11'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/mushoku-tensei-isekai-that-takes-genre-seriously',
  },
  {
    title: 'March Comes in Like a Lion: Shogi, Depression, and the Slowest Recovery in Anime',
    slug: 'march-comes-in-like-a-lion-shogi-depression-recovery',
    category: 'anime',
    excerpt: 'Chica Umino\'s manga about a teenage professional shogi player living alone in Tokyo uses the board game as a frame for one of anime\'s most honest and most gradual depictions of depression, isolation, and the slow process of learning to accept help.',
    content: `"March Comes in Like a Lion" by Chica Umino began serialization in Young Animal magazine in 2007 and is ongoing. The series follows Rei Kiriyama, a seventeen-year-old professional shogi player who lives alone in a small apartment in Tokyo. Rei is technically exceptional — professional shogi in Japan is one of the most demanding intellectual competitions in the world, and Rei's ability to reach professional rank as a teenager marks him as genuinely extraordinary — and personally isolated in ways that the series traces to specific childhood experiences rather than presenting as simply his nature.

Shogi provides the series' structural backbone: its tournament system structures Rei's professional obligations; individual matches reveal character; and the game's combination of tactical precision and psychological warfare is used as a lens through which the series examines questions about self-worth, competition, and the specific pressure of being expected to win. Umino researched shogi extensively before beginning the series, and the game's strategic content is detailed enough to satisfy readers who know the game while not excluding readers who don't.

What makes the series exceptional rather than merely accomplished is Chica Umino's ability to depict depression as a specific lived experience rather than a narrative condition. Rei's isolation is not presented as a choice or a failure; it is the natural result of a childhood in which he was made to feel that his existence imposed costs on others. The specific thought patterns that maintain the isolation — the sense that reaching out would burden people, that his own needs are not legitimate, that the withdrawal that hurts him is also the withdrawal that protects others from him — are rendered with such precision that readers who recognize these patterns from their own experience have described the series as the first time they had seen their interior experience accurately reflected.

The Kawamoto family, who gradually become the central warm presence in Rei's life, are the series' alternative pole. The three sisters — Akari, Hinata, and Momo — are characterized with an individuality and emotional specificity that makes them the series' most immediately appealing element; they are funny, warm, and complicated in ways that make their affection for Rei feel real rather than narratively convenient. The family's home, depicted as a space of warmth and food and noise in contrast to the silence of Rei's apartment, becomes a physical representation of the availability of connection.

The anime adaptation by Shaft (directed by Akiyuki Shinbo and Kenjirou Okada, in two seasons from 2016 to 2017) made visual choices that extended Umino's own visual vocabulary: abstract sequences for Rei's interior states, color palette shifts that track the series' tonal movement between depression and lightness, and an overall aesthetic of considered deliberateness that matches the material's patience with its own emotional development.`,
    tags: ['March Comes in Like a Lion', 'Chica Umino', 'Shaft', 'shogi anime', 'depression anime', 'seinen manga'],
    entities: ['Chica Umino', 'Shaft', 'Young Animal'],
    publishedAt: new Date('2025-12-13'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/march-comes-in-like-a-lion-shogi-depression-recovery',
  },
  {
    title: 'Nausicaä of the Valley of the Wind: The Manga Miyazaki Spent 12 Years Writing',
    slug: 'nausicaa-manga-miyazaki-spent-12-years-writing',
    category: 'manga',
    excerpt: 'Most people know Nausicaä from the 1984 film. The manga Hayao Miyazaki spent twelve years completing is a different and larger work — an ecological epic of unusual philosophical depth that the film could only sketch.',
    content: `The 1984 film "Nausicaä of the Valley of the Wind" was produced partly to demonstrate the viability of Studio Ghibli, which did not yet exist as an entity, and adapted only the first quarter of the manga that Miyazaki was still writing at the time of the film's production. The film is a masterwork of ecological fantasy with an emotionally clear protagonist and a narrative that resolves satisfyingly within its running time. The manga, which Miyazaki serialized in Animage magazine from 1982 to 1994 — twelve years, with interruptions for film productions — is a different work: larger, philosophically denser, more ambiguous in its resolution, and concerned with questions that the film's constraints did not allow it to pursue.

The manga's Nausicaä inhabits a world a thousand years after an industrial catastrophe has rendered most of the surface uninhabitable, covered by a toxic jungle (the Sea of Corruption) that is gradually spreading over the surviving human settlements. The film uses this setting as backdrop for a war narrative; the manga uses it as the subject of a twelve-year investigation into how life adapts to destruction, what humanity's obligations to the world it damaged might be, and whether survival and healing are compatible with the political structures that have organized human society since the catastrophe.

What the manga develops that the film cannot is Nausicaä's full moral complexity. Film Nausicaä is a hero of unambiguous virtue; manga Nausicaä is a character who commits acts of genuine moral ambiguity in service of her convictions, who kills and manipulates and deceives in ways that the film's shorter format and simpler narrative structure could not accommodate. She remains sympathetic — Miyazaki's investment in her is total — but she is not simple, and the later manga volumes in particular push her into positions where sympathy coexists with genuine unease about her choices.

The ecological philosophy is the manga's most sustained achievement. The Sea of Corruption — which the film presents as an enemy that the humans must eventually defeat — is revealed in the manga to be a planetary immune system: a mechanism by which the Earth is purifying itself of the industrial toxins that would otherwise make life impossible. The "enemy" is doing something necessary; the humans who are destroying it are preventing their own eventual salvation. This revelation, and its implications for how Nausicaä responds, generates the manga's most philosophically difficult content and its most moving climax.

Miyazaki has said that he could not have made the films he made after Nausicaä without the twelve-year engagement with its themes. "Princess Mononoke"'s refusal to resolve its ecological conflict into simple good and evil traces directly to the questions the Nausicaä manga spent a decade asking. Reading the manga after the film reveals an artist working through ideas at a scale and depth that the film medium, even at Miyazaki's best, cannot fully accommodate.`,
    tags: ['Nausicaä', 'Hayao Miyazaki', 'manga', 'ecological manga', 'Studio Ghibli', 'manga 1980s'],
    entities: ['Hayao Miyazaki', 'Studio Ghibli'],
    publishedAt: new Date('2025-12-15'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/nausicaa-manga-miyazaki-spent-12-years-writing',
  },
  {
    title: 'To Your Eternity: Yoshitoki Oima\'s Follow-Up and What It Attempted',
    slug: 'to-your-eternity-yoshitoki-oima-what-it-attempted',
    category: 'manga',
    excerpt: 'After A Silent Voice, Yoshitoki Oima began serializing To Your Eternity — a fantasy manga about an immortal being learning what humanity is through the deaths of every person it loves. It is one of the most ambitious manga of the 2010s.',
    content: `After completing "A Silent Voice" in 2014, Yoshitoki Oima began "To Your Eternity" ("Fumetsu no Anata e") in Weekly Shonen Magazine in November 2016. The series follows an entity — an immortal orb sent to Earth by an unknown force — that can take the form of the last living thing it came into contact with, and that gradually develops consciousness, memory, and something approaching a self through its encounters with dying humans and animals. The entity, eventually named Fushi, becomes humanoid by taking the form of a dying boy in the Arctic, and spends the series living, losing people it loves, and carrying those losses in the specific way that an immortal accumulates what a mortal can only accumulate once.

The premise makes grief the series' structural principle. Fushi cannot die permanently, but the people it meets can and do, and the series tracks each death's effect on an entity that has no evolved mechanism for processing loss. The first human death in the series — the death of the unnamed boy whose form Fushi takes — is executed with a restraint and emotional precision that establishes the series' willingness to depict loss without the softening that most manga of this kind applies. The boy dies because of the specific material circumstances of his life, not because the narrative needs to create dramatic stakes; the death feels arbitrary in the way that actual deaths feel arbitrary, which is more devastating than the deaths that are shaped for maximum emotional impact.

The series spans centuries and multiple distinct narrative arcs, each set in a different historical-adjacent period with different supporting characters who enter Fushi's life, become the center of its emotional world, and are eventually lost. The structure produces a reading experience that is cumulative in a specific way: each arc's deaths add weight to the total, and Fushi's carrying of the dead — literally, in the forms it can take — becomes increasingly poignant as the number of people it has lost grows. By the series' later arcs, Fushi's multiplicity of forms is simultaneously a power and a record of grief, each form a person who cannot be returned.

The philosophical ambition — what makes a life meaningful, what obligations immortals bear to mortals, whether the experience of loss is part of what makes experience valuable or a cost that undermines its value — is handled with more seriousness than the shonen publication context might suggest. Oima is interested in these questions rather than using them as decoration, and the series' inconsistencies (some arcs are more successful than others; the later mythology becomes elaborate in ways that the earlier, simpler structure did not require) feel like the inconsistencies of genuine ambition rather than of indifferent execution.

The anime adaptation by Brain's Base in 2021 was received positively enough to generate subsequent seasons, and its treatment of the series' emotional content — particularly the deaths in the early arcs — demonstrated that the material translated effectively to animation. The series continues in manga, and its destination remains unclear; what is clear is that Oima has built a vehicle for exploring mortality that is unlike anything else in contemporary manga.`,
    tags: ['To Your Eternity', 'Yoshitoki Oima', 'manga 2010s', 'immortality manga', 'Shonen Magazine', 'grief manga'],
    entities: ['Yoshitoki Oima'],
    publishedAt: new Date('2025-12-17'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/to-your-eternity-yoshitoki-oima-what-it-attempted',
  },
  {
    title: 'Madhouse: The Studio Behind Some of the Most Important Anime Ever Made',
    slug: 'madhouse-studio-behind-most-important-anime',
    category: 'industry',
    excerpt: 'Madhouse produced Death Note, Satoshi Kon\'s films, Hunter x Hunter (2011), Trigun, and Cardcaptor Sakura. It is the most important studio most anime fans cannot name. Here\'s its history.',
    content: `Madhouse was founded in 1972 by Masao Maruyama, Osamu Dezaki, Rintaro, and Yoshiaki Kawajiri — four animators who had worked together at Mushi Production, the studio Osamu Tezuka founded. The founding team included some of the most visually distinctive directors in anime history, and the studio's work from the beginning was characterized by a willingness to pursue stylistic ambition rather than commercial conventionality. Dezaki's trademark "postcard memories" technique — a sudden freeze on a single image, treated with a painterly filter that makes it look like an illustration — is one of the most recognizable visual signatures in anime, and it was developed at Madhouse.

The studio's catalogue is remarkable in its breadth and depth. In the 1990s, Madhouse produced Yoshiaki Kawajiri's OVAs — "Wicked City," "Demon City Shinjuku," "Ninja Scroll," "Vampire Hunter D: Bloodlust" — dark action works of stylistic ambition and genuine craft that defined a certain aesthetic of 1990s anime internationally. In the same decade, the studio produced the anime adaptation of "Cardcaptor Sakura" with a visual warmth that could not be further from Kawajiri's films. The range demonstrated what a studio with sufficient creative flexibility could accommodate.

The partnership with Satoshi Kon is the centerpiece of Madhouse's artistic legacy. "Perfect Blue," "Millennium Actress," "Tokyo Godfathers," and "Paprika" were all Madhouse productions, and the studio's relationship with Kon allowed him to pursue formal experiments that studios with more conservative creative cultures would not have accommodated. The resources Madhouse committed to each film were meaningful contributions to work that could not have been made without them.

"Death Note" (2006), "Trigun" (1998), "Hunter x Hunter" (2011–2014), "Claymore," "One Punch Man" (Season 1, 2015), and "No Game No Life" are among the other major productions in the Madhouse catalogue. The range of these titles — psychological thriller, space western, extended shonen adaptation, dark fantasy, sports comedy, game-theory isekai — reflects a studio that took work project by project rather than developing a single commercial specialty.

Masao Maruyama left Madhouse in 2011, following Nippon Television's acquisition of the studio, and founded MAPPA with several colleagues. Madhouse has continued producing work since then, but with less of the consistent distinctiveness that characterized its pre-acquisition period. The studio that made Satoshi Kon's films is also the studio that made "Trigun" and "Hunter x Hunter" and "Death Note" — a catalogue that no other single studio has matched for variety of achievement. Its relative anonymity among casual anime fans, despite this record, is one of the anime industry's more significant cases of institutional underrecognition.`,
    tags: ['Madhouse', 'anime studio', 'Satoshi Kon', 'anime history', 'Death Note', 'Hunter x Hunter'],
    entities: ['Masao Maruyama', 'Madhouse', 'Satoshi Kon', 'Yoshiaki Kawajiri', 'Nippon Television'],
    publishedAt: new Date('2025-12-19'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/madhouse-studio-behind-most-important-anime',
  },
  {
    title: 'Studio Ghibli Without Miyazaki: What Comes Next',
    slug: 'studio-ghibli-without-miyazaki-what-comes-next',
    category: 'industry',
    excerpt: 'Hayao Miyazaki is in his eighties and still working. Studio Ghibli has been asking, for decades, what the studio becomes without him. Here\'s the honest state of that question.',
    content: `Studio Ghibli was founded around two people: Hayao Miyazaki and Isao Takahata. Takahata died in 2018. Miyazaki has retired twice and returned, and is currently in production on a new film at 84 years old. The studio's post-Miyazaki future has been a subject of industry discussion for at least twenty years, and the question has become more urgent with each passing retirement announcement and retraction. What it is less often acknowledged is that Ghibli has been preparing an answer since the late 2000s, and that the answer is more substantive than the question implies.

The most significant development in Ghibli's succession planning is the emergence of Gorō Miyazaki, Hayao's son, as a director. His first feature, "Tales from Earthsea" (2006), was received poorly — critically and by his father, who has been candid about his assessment — but his second, "From Up on Poppy Hill" (2011), was received warmly as a competent and emotionally engaging work. The comparison with his father is unavoidable and unfair simultaneously: Gorō Miyazaki is not his father and does not work in the same mode, which makes his work both disappointing by one standard and interesting by another.

More significant is the development of Hiromasa Yonebayashi, who directed "Arrietty" (2010) and "When Marnie Was There" (2014) before leaving Ghibli to help found Studio Ponoc. Both films are accomplished works that demonstrate Ghibli's institutional capacity to train directors from within — Yonebayashi was a key animator whose directorial debut was enabled by Ghibli's existing production infrastructure. Studio Ponoc's "Mary and the Witch's Flower" (2017) was received as a capable first effort from a studio explicitly carrying forward a Ghibli-influenced aesthetic, suggesting that the training Ghibli provided could sustain beyond the studio itself.

The studio's acquisition by Nippon Television in 2023 — which gave NTV a majority stake in the studio that has resisted corporate ownership through its entire history — represented a significant structural change. The acquisition's stated terms included preservation of Ghibli's creative independence and commitments to the employees' conditions, but structural changes of this kind tend to produce cultural drift over time, and the studio's relationship with its new owner will determine whether the institutional culture that made Ghibli's films possible survives the transition.

The deepest answer to "what comes after Miyazaki" is probably not any single person or project but an aesthetic and philosophical legacy that has already been transmitted to enough artists — at Ghibli, at Studio Ponoc, at studios whose founders trained at Ghibli, and throughout the international animation community that has taken his work seriously as an influence — that it exists independently of the studio that produced it. This is not consolation but fact: "Princess Mononoke" and "Spirited Away" exist and will continue to exist, and the artists they have shaped will continue making work shaped by them. What is irreplaceable is not replaceable, but what it has produced already cannot be taken back.`,
    tags: ['Studio Ghibli', 'Hayao Miyazaki', 'anime studio', 'Ghibli future', 'Nippon Television', 'anime industry'],
    entities: ['Hayao Miyazaki', 'Studio Ghibli', 'Gorō Miyazaki', 'Hiromasa Yonebayashi', 'Nippon Television'],
    publishedAt: new Date('2025-12-21'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/studio-ghibli-without-miyazaki-what-comes-next',
  },
  {
    title: 'The Kawaii Aesthetic: Japan\'s "Cute" Culture and Its Global Reach',
    slug: 'kawaii-aesthetic-japans-cute-culture-global-reach',
    category: 'industry',
    excerpt: 'Kawaii — the Japanese aesthetic of "cute" — is one of the most globally influential cultural exports Japan has produced. Here\'s where it comes from, how it developed, and why it has spread so far.',
    content: `The word "kawaii" (可愛い) means cute or adorable in Japanese, but as a cultural phenomenon it describes something considerably more specific: an aesthetic sensibility that values smallness, softness, roundness, passivity, and the visual qualities associated with infancy — large eyes, small features, simplified forms — across a range of media, products, fashion, and behavior. The kawaii aesthetic is not simply a preference for cute things but a developed visual language with its own history, its own politics, and its own complex relationship to Japanese cultural identity.

The contemporary kawaii aesthetic is usually traced to the late 1960s and 1970s, when certain young Japanese women began writing in a distinctive style: small, rounded characters, decorated with hearts and stars and small drawings, deliberately childlike in appearance. This "cute writing" (marui ji) was a form of self-expression that was simultaneously distinctive and passive — it attracted attention while claiming to demand nothing. Cultural historians have read it as a form of resistance to the social demands placed on Japanese women, a way of inhabiting a position of apparent harmlessness that made space for individual expression within constraining social norms.

The commercialization of kawaii began in earnest in the late 1970s, when Sanrio's Hello Kitty (1974) demonstrated that the aesthetic could anchor an entire product empire. Hello Kitty has no mouth — a design choice that has been analyzed as either enabling projection of emotion (the viewer supplies the expression) or as representing the removal of a voice that might make demands. The analysis is not the point of the product, but the product's global success suggests that what it represents is not merely a Japanese cultural artifact but a broadly legible aesthetic proposition.

Anime and manga are both significantly shaped by and significant exporters of kawaii aesthetics. The large-eyed character design that is standard across anime — derived partly from Tezuka's Disney influence but developed through decades of market response to what audiences found appealing — is a kawaii aesthetic applied to animation. The moe response that certain anime characters generate is a specific form of kawaii-triggered emotional response. The character merchandise that sustains the anime industry economically is almost entirely built on kawaii's commercial logic.

The global reach of kawaii has been one of Japan's most successful cultural exports, and its spread has generated a significant international market for Japanese aesthetics, products, and media. It has also generated a set of tensions around its politics: the association of kawaii with passivity, with childlike qualities, and with the suppression of adult complexity has been criticized as a form of cultural infantilization that serves specific social functions in the Japanese context and is exported without those functions but with the aesthetics intact. These tensions are not resolved by the aesthetic's popularity but are an ongoing part of how it operates globally.`,
    tags: ['kawaii', 'Japanese culture', 'anime aesthetics', 'Hello Kitty', 'Sanrio', 'Japanese fashion'],
    entities: ['Sanrio', 'Japan'],
    publishedAt: new Date('2025-12-23'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/kawaii-aesthetic-japans-cute-culture-global-reach',
  },
  {
    title: 'Dragon Ball Super and the Challenge of Continuing a Finished Story',
    slug: 'dragon-ball-super-challenge-continuing-finished-story',
    category: 'manga',
    excerpt: 'Dragon Ball ended in 1995. Dragon Ball Super began in 2015. The twenty-year gap between them is the gap between a story that knew it was finished and a franchise that discovered it was too valuable to be finished. Here\'s what was lost and what was found.',
    content: `"Dragon Ball Z" ended in 1995 with a conclusion that was, by shonen manga standards, genuinely final: the villain defeated, the protagonist's journey at rest, the next generation beginning to take shape. Akira Toriyama had spent fifteen years with these characters and had expressed consistent desire to conclude the series. "Dragon Ball GT," a 1996 sequel produced without Toriyama's direct involvement, was poorly received and is now generally considered non-canonical. Twenty years after the original conclusion, "Dragon Ball Super" launched in V Jump magazine in 2015 as a manga written by Toyotarou and supervised by Toriyama, concurrent with an anime that began the same year.

The commercial rationale for the continuation is not obscure: Dragon Ball is one of the most valuable intellectual properties in entertainment history, with merchandise revenue that sustains Bandai Namco's business and a video game franchise that generates billions annually. A property of this scale does not stay dormant when the market infrastructure that would sustain new content remains intact. "Super" is, in significant economic terms, a sensible decision.

What "Super" reveals about the challenge of sequel-ing a finished story is equally clear. The power scaling that Dragon Ball already extended beyond the bounds of internal logic in its original run has, in "Super," become a subject of self-aware humor — characters routinely discover new power levels that exceed what was supposed to be the ceiling — because there is no other available structure for a series built around the protagonist becoming progressively stronger. When Goku has already achieved the strongest possible form, the narrative must invent new categories of "strongest possible," which produces a kind of conceptual inflation that the series has been absorbing for years.

The "Tournament of Power" arc, which is "Super"'s most fully developed extended storyline, demonstrates what the continuation can do well: develop characters from earlier in the franchise who were previously underserved, create genuine threat through team-based competition rather than individual power comparison, and generate emotional stakes by making the survival of an entire universe the competition's prize. The arc's handling of multiple simultaneous character storylines across a single extended tournament is better organized than similar exercises in the original series.

What "Super" cannot replicate is the specific emotional weight of watching characters who were new grow into versions of themselves that the series had time to develop. Goku and Vegeta are not different people in "Super" than they were at the end of "Z"; they are the same people in new situations, and the situations cannot restore the sense of discovery that characterized the original series' best arcs. This is the fundamental limitation of continuing a finished story: you can generate new events, but you cannot regenerate the condition of not knowing these people yet.`,
    tags: ['Dragon Ball Super', 'Akira Toriyama', 'Dragon Ball', 'manga sequels', 'shonen manga', 'Toyotarou'],
    entities: ['Akira Toriyama', 'Toyotarou', 'Bandai Namco'],
    publishedAt: new Date('2025-12-25'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/dragon-ball-super-challenge-continuing-finished-story',
  },
  {
    title: 'Anime\'s LGBTQ+ Representation: A History of Coding, Progress, and What Remains',
    slug: 'anime-lgbtq-representation-history-coding-progress',
    category: 'anime',
    excerpt: 'Anime has a complicated history with LGBTQ+ representation — from coded relationships and queer-coding villains to increasingly explicit depictions of same-sex romance. Here\'s an honest account of where the medium has been and where it currently stands.',
    content: `Anime and manga's relationship with LGBTQ+ representation is long, complicated, and often discussed with more certainty than the complexity warrants. The medium has simultaneously been a space where same-sex relationships appear with a frequency unusual in mainstream entertainment and a space where those relationships are frequently coded, erased, or presented in ways that serve the entertainment's internal economy rather than actual LGBTQ+ people's recognition and dignity. Both of these facts are real, and both need to be held in view.

The coding tradition runs throughout anime history. The "Class S" tradition in shoujo manga — intense romantic friendships between girls that are implicitly or explicitly romantic but are understood to be a transitory phase before heterosexual adulthood — dates to the early 20th century and provides the template for many subsequent anime relationships between girls that are clearly romantic but never explicitly labeled as such. This tradition is simultaneously representation (real feelings are depicted) and erasure (the feelings are not named and are framed as temporary). Whether it counts as positive representation depends significantly on whose experience you are centering.

The bara and yaoi traditions represent extensive same-sex content that is primarily produced by and for people who are themselves identifying with the sexuality depicted — though the content of both genres is complicated by fantasy elements that do not necessarily map to real LGBTQ+ experiences. The global success of Boys' Love manga has created substantial representations of same-sex male romance in mainstream publishing channels, though BL's specific conventions and readership (primarily heterosexual women) mean that its relationship to gay male experience is not straightforward.

Explicit positive LGBTQ+ representation has increased significantly in anime of the 2010s and 2020s. "Yuri on Ice" (2016), in which two male figure skaters develop a romantic relationship that the series depicts with genuine seriousness and a love that is acknowledged by the characters as such, was a landmark: a sports anime that did not code or sidestep its same-sex romance. "Given" (2019) and its sequels, "Our Dreams at Dusk" (2018), and the BL series that have been adapted for mainstream streaming represent a growing body of work in which same-sex love is the subject rather than the subtext.

The honest assessment of where the medium currently stands: representation has increased and improved, but it remains significantly more present in niche publications and streaming categories than in mainstream weekly magazines; female same-sex relationships are depicted more frequently than male ones but are more frequently left in coding territory; transgender and non-binary characters remain underrepresented and frequently stereotyped; and the commercial incentives that have driven improvement — streaming platforms responding to international LGBTQ+ audience demand — may be less reliable drivers of sustained improvement than cultural change within the industry itself. Progress has been real and is ongoing. Completion is not achieved.`,
    tags: ['anime LGBTQ', 'queer anime', 'Yuri on Ice', 'representation anime', 'BL manga', 'anime culture'],
    entities: [],
    publishedAt: new Date('2025-12-27'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/anime-lgbtq-representation-history-coding-progress',
  },
  {
    title: 'The Isekai Villainess Subgenre: Otome Games, Doom Flags, and Female Power Fantasy',
    slug: 'isekai-villainess-subgenre-otome-games-doom-flags',
    category: 'light-novels',
    excerpt: 'In isekai villainess manga, the protagonist is reincarnated as the villain of a romance game she played in her previous life. The subgenre is one of the fastest-growing in manga and light novels, and it is primarily written by and for women.',
    content: `The isekai villainess subgenre — sometimes called "otome isekai" or "destruction flag" manga — follows a specific premise: a woman is reincarnated into a game world as the villainess who, in the game's original story, is defeated or exiled by the end of the narrative. Knowing her fate, she attempts to avoid it, typically by being so genuinely charming and capable that the characters who were supposed to despise her end up devoted to her instead. "My Next Life as a Villainess: All Routes Lead to Doom!" (Satoru Yamaguchi, 2017) is the genre's founding text; dozens of series have followed its template in the years since.

The genre's appeal to its primary readership — young women who enjoy otome games (romance visual novels with female protagonists) and manga — is readable once the premise is understood. The protagonist enters the game world with knowledge that its original female protagonist, the "heroine," does not have, which makes her more capable than the role she has been cast in. She uses this knowledge not for power or domination but to build genuine relationships — to befriend characters who were supposed to be her rivals, to charm characters who were supposed to be her enemies, to demonstrate competence in areas where the game never gave her the opportunity. The narrative is about a woman making her own story rather than living in someone else's.

This is, at its core, a female power fantasy with a specific structure. The protagonist's power comes not from combat ability or magical power level (though these sometimes appear) but from social intelligence, emotional competence, and the knowledge that lets her see through the social scripts that other characters are playing out unconsciously. She succeeds by understanding people — by knowing what they need and providing it, by refusing to be reduced to the role she has been assigned. The fantasy is not of strength but of legibility: of being someone whose genuine qualities are seen rather than someone defined by a predetermined narrative.

The genre's relationship to otome games is also the source of its most distinctive formal features. Because the game's original story provides a structure that the protagonist is trying to escape, the narrative uses "death flags" and "doom flags" as plot devices: the moments when the story seems to be proceeding toward the bad ending are recognizable conventions of the game genre, and the protagonist's efforts to avoid them require her to apply her knowledge of the game's logic to a world that has become real. This produces a form of meta-awareness — the protagonist knows she is in a story, knows the story's original outcome, and is trying to write a different one — that gives the genre an unusual relationship between character and narrative structure.

The appeal has proven commercially significant: multiple villainess manga have been adapted into anime, publishers have dedicated imprints to the subgenre, and the global manga market's female demographic has embraced the genre with an enthusiasm that has made it one of the most consistent commercial performers of the past five years. It represents, in miniature, what the broader manga market has been slowly recognizing: that female readers are a large and commercially significant demographic whose specific preferences are worth serving.`,
    tags: ['isekai villainess', 'otome isekai', 'All Routes Lead to Doom', 'light novels', 'manga for women', 'romance manga'],
    entities: ['Satoru Yamaguchi'],
    publishedAt: new Date('2025-12-29'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/isekai-villainess-subgenre-otome-games-doom-flags',
  },
  {
    title: 'Weekly Shonen Magazine vs Weekly Shonen Jump: The Rivalry That Shaped Manga',
    slug: 'weekly-shonen-magazine-vs-jump-rivalry-shaped-manga',
    category: 'industry',
    excerpt: 'Weekly Shonen Jump and Weekly Shonen Magazine have been competing for readers since the 1960s. Their rivalry has produced some of the greatest manga ever published and has shaped the medium\'s commercial structure in ways that persist today.',
    content: `Weekly Shonen Jump, published by Shueisha, and Weekly Shonen Magazine, published by Kodansha, launched within months of each other in 1959 and have been competing for manga readers — and for manga talent — ever since. The rivalry between them is the most consequential commercial competition in manga history, and its effects on what manga looks like and which creators have been able to work in which ways extend throughout the medium's development.

The magazines' different publishing philosophies have produced different kinds of manga. Jump's reader survey system — the mechanism by which popularity determines which series survive — rewards content that generates immediate, intense reader attachment, which has produced Jump's characteristic house style: clear emotional stakes, accessible protagonists, escalating action, the "Jump formula" of friendship, hard work, and victory. Magazine's approach has historically been somewhat more tolerant of slower development and more varied genre, which has allowed certain kinds of storytelling to develop there that Jump's survival-of-the-fittest model would have eliminated.

The talent that has published in each magazine reflects these different cultures. Jump has housed Dragon Ball, One Piece, Naruto, Bleach, and Hunter x Hunter — the defining battle shonen of each decade since the 1980s. Magazine has housed "Fairy Tail," "Rurouni Kenshin," "Attack on Titan," "Vinland Saga," "Berserk," and "The Seven Deadly Sins" — a catalogue that is in several cases artistically more ambitious than Jump's flagship properties, even if its commercial peaks have rarely matched Jump's. The distinction is not simply quality but mode: Magazine's most distinguished titles have generally been willing to pursue darker, more complex, or more structurally unusual storytelling than Jump's commercial incentives encourage.

The competition has also shaped how both magazines treat their creators. Jump's system of reader-determined survival creates conditions for creative development under pressure; it also creates conditions in which talented artists whose work requires time to find its audience are eliminated before that time is available. Magazine's somewhat more tolerant environment has allowed certain series to develop across years without the constant threat of cancellation that Jump's system produces. "Berserk," which Kentaro Miura serialized for thirty years with extensive hiatuses, would likely not have survived Jump's production requirements.

The contemporary manga market has fragmented significantly from the two-magazine duopoly that characterized the industry's peak weekly circulation era. Digital platforms, monthly magazines, and web serialization have expanded the available channels for both creators and readers. But the cultural weight of the Jump and Magazine brands — the sense that the titles they publish are operating in a particular tradition with a particular set of expectations — persists even as the weekly print circulation of both has declined from its 1990s peaks.`,
    tags: ['Weekly Shonen Magazine', 'Weekly Shonen Jump', 'manga industry', 'Kodansha', 'Shueisha', 'manga history'],
    entities: ['Shueisha', 'Kodansha'],
    publishedAt: new Date('2025-12-31'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/weekly-shonen-magazine-vs-jump-rivalry-shaped-manga',
  },
  {
    title: 'The Anime Season System: How Winter, Spring, Summer, and Fall Shape What Gets Made',
    slug: 'anime-season-system-winter-spring-summer-fall',
    category: 'industry',
    excerpt: 'Japanese anime production is organized around four seasons — winter, spring, summer, and fall — each launching new series simultaneously. This system shapes viewer habits, industry competition, and which series get made.',
    content: `Japanese anime television production is organized around four annual seasons: winter (January–March), spring (April–June), summer (July–September), and fall (October–December). Each season launches a new set of series simultaneously — typically between thirty and fifty new anime per season — and most series run for a single season (12–13 episodes), with successful ones receiving renewals for additional seasons. This system is distinct from Western television's development cycles, where series launch throughout the year without synchronized competition, and it shapes the anime industry's production culture, its competitive dynamics, and its relationship with its audience in ways that are not immediately visible to new viewers.

The simultaneous launch structure creates a specific form of competition. Series that begin in the same season are competing for the same viewers' attention at the same time, which creates incentives to establish audience engagement quickly — a series that takes four episodes to become compelling may lose viewers to a competing series that was immediately engaging. This creates selection pressure toward certain kinds of narrative openings: hook-first structures, immediate character introduction, early deployment of the series' most distinctive element. The "first episode test" — whether a series' opening episode is compelling enough to add to the viewer's ongoing list — is partly a product of the seasonal system's competition.

The system also produces a specific fan culture around seasonal previews and mid-season assessments. The anime community develops significant practices around discussing the current season: preview guides before the season begins, mid-season rankings as series establish themselves, end-of-season retrospectives comparing what was promised with what was delivered. This temporal structure gives anime discourse a cyclical rhythm that distinguishes it from Western TV discourse, where conversation can be organized around any series at any time.

For studios, the seasonal system creates scheduling pressure that is more regular and more synchronized than Western television production cycles. All studios are preparing their seasonal releases simultaneously, which concentrates demand for skilled animators across the industry at the same moments. This concentration contributes to the labor conditions that make the anime industry's overwork problem structural rather than individual: when the whole industry is finishing production simultaneously, there is no slack in the system to absorb delays without cascading consequences.

The streaming era has partially disrupted the seasonal system by enabling some series to launch outside it — Netflix "batch releases" entire seasons at once rather than weekly, and some Netflix originals launch without coordinating with the seasonal calendar. But the seasonal system remains the dominant organizing framework for the industry, and the community practices it has generated — the seasonal charts, the preview guides, the mid-season discussions — have proven durable even as the technology of anime distribution has changed.`,
    tags: ['anime seasons', 'anime industry', 'anime production', 'seasonal anime', 'anime calendar', 'anime schedule'],
    entities: ['Netflix', 'Japan'],
    publishedAt: new Date('2026-01-01'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/anime-season-system-winter-spring-summer-fall',
  },
  {
    title: 'Fairy Tail: Hiro Mashima and the Joy of Uncomplicated Adventure',
    slug: 'fairy-tail-hiro-mashima-uncomplicated-adventure',
    category: 'manga',
    excerpt: 'Fairy Tail is one of the most-read manga in the world and one of the most critically maligned. Here\'s an honest account of what it does well, where it falls short, and why its flaws haven\'t stopped it from building one of manga\'s most devoted fandoms.',
    content: `Hiro Mashima began serializing "Fairy Tail" in Weekly Shonen Magazine in August 2006 and concluded the original series in 2017, producing 545 chapters across 63 collected volumes. The series follows Natsu Dragneel, a fire-breathing mage who is a member of the Fairy Tail guild, and his companions across a series of increasingly high-stakes adventures in the magical world of Fiore. In total volume sales, "Fairy Tail" has sold over 70 million copies — a commercial achievement that places it among the most successful manga ever published.

The critical reception has been considerably more mixed than the commercial performance suggests. The most consistent criticisms of "Fairy Tail" address its approach to consequences: the series has a strong tendency to resolve crises through power-ups rather than established power, to spare characters from the deaths that the narrative's logic would dictate, and to reset emotional stakes between arcs in ways that prevent the accumulation of genuine dramatic weight. The friendship-powered victories that "Fairy Tail" delivers with particular frequency are, in this series, particularly decoupled from the specific development of specific bonds — the generic warmth of "we are friends" substitutes too frequently for the particular demonstration of why this friendship enables this feat.

What the criticism often underweights is what the series does well. Mashima's visual imagination — the variety of magical abilities he invents, the creativity of the settings he depicts, the kinetic clarity of his action choreography — is genuinely impressive and sustains itself across a very long run without obvious depletion. The series' tonal range, which moves between comedy and action with considerable ease and rarely gets the balance badly wrong, is a professional accomplishment that is easier to recognize when you have read series that cannot manage it. And the emotional warmth of the guild setting — the sense that Fairy Tail is a found family worth caring about — is a real achievement even when the specific demonstrations of that warmth are schematic.

Mashima's subsequent series, "Edens Zero" (2018–present), transfers many of "Fairy Tail"'s conventions to a science fiction setting and has attracted a devoted readership that overlaps substantially with the Fairy Tail fanbase. It demonstrates that Mashima's approach is consistent rather than accidental — he makes the manga he wants to make, with the values he considers important, and there is a large audience for that manga even when critics find it unsatisfying.

The phenomenon of a work that is simultaneously among the most-read in its medium and among the most critically dismissed by its medium's serious readers is not specific to "Fairy Tail" — it occurs across entertainment — but it is worth examining. The readers who have bought 70 million volumes of "Fairy Tail" are responding to something real, and the critics who find the series structurally irresponsible are also responding to something real. Both responses are legitimate, and both are incomplete without the other.`,
    tags: ['Fairy Tail', 'Hiro Mashima', 'Shonen Magazine', 'manga adventure', 'guild manga', 'manga 2000s'],
    entities: ['Hiro Mashima', 'Weekly Shonen Magazine'],
    publishedAt: new Date('2026-01-01'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/fairy-tail-hiro-mashima-uncomplicated-adventure',
  },
  {
    title: 'Anime\'s Depiction of Class and Poverty: What Goes Unsaid',
    slug: 'anime-depiction-class-poverty-what-goes-unsaid',
    category: 'anime',
    excerpt: 'Anime frequently depicts poverty, class difference, and economic precarity — but rarely names them as structural conditions. Here\'s how the medium handles economic reality, where it is honest, and where it looks away.',
    content: `Japan's economic reality includes significant inequality, youth unemployment, a large population of working poor, and a housing market in major cities that makes economic stability genuinely difficult for young people without family support. Anime, which primarily targets young audiences and is produced in the cities where these conditions are most acute, depicts economic precarity regularly but discusses it explicitly with far less frequency. The gap between depiction and discussion is itself revealing.

The most direct engagement with economic reality in anime tends to appear in specific genres. "Welcome to the NHK" and "Goodnight Punpun" depict the material conditions of social withdrawal — the specific small apartments, the convenience store meals, the way poverty and isolation reinforce each other — with documentary honesty. Certain slice of life series, particularly those set in working-class contexts rather than the middle-class high schools that dominate the genre, depict economic constraint as a simple fact of characters' lives rather than a plot device or a source of character motivation. These depictions are valuable precisely because they treat economic reality as ambient rather than exceptional.

The more common mode of economic depiction in anime, however, is the transformation narrative: a protagonist who is poor, which is treated as a temporary condition that their abilities and effort will resolve. The shonen manga formula's emphasis on hard work and achievement maps onto a narrative of individual economic mobility that consistently frames economic disadvantage as a starting point to be overcome rather than a structural condition that the protagonist and their community share. This is not dishonest in the sense of depicting false events; it is dishonest in the sense of consistently framing individual economic stories in ways that avoid structural analysis.

The isekai genre's typical fantasy — a Japanese salaryman or student transported to another world where their modern knowledge constitutes a form of capital — is readable as a fantasy specifically of the conditions it everts: the isekai protagonist who builds economic success through knowledge unavailable to the fantasy world's inhabitants is inverting the conditions of their original life, where their knowledge was ordinary and their economic position was constrained. The fantasy is legible as fantasy partly because of what it inverts.

Where anime is most honest about class is in the specific material details it depicts without necessarily framing as significant: the size of apartments, the quality of food, the presence or absence of family stability, the specific forms of labor that characters' families perform. These details accumulate in ways that attentive viewers can read even when the narrative is not organizing them into a structural argument. The economic reality is there, represented in the specifics even when the framing declines to name it.`,
    tags: ['anime class', 'anime poverty', 'anime social commentary', 'anime economics', 'anime culture', 'slice of life'],
    entities: ['Japan'],
    publishedAt: new Date('2026-01-02'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/anime-depiction-class-poverty-what-goes-unsaid',
  },
];

async function main() {
  console.log(`Seeding ${ESSAYS.length} essays (batch 7)...`);
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
