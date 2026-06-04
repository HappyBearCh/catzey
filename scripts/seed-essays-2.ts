/**
 * Second batch of editorial essays — landmark works, creators, genre histories, industry.
 * Run with: npx tsx scripts/seed-essays-2.ts
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ESSAYS = [
  // ── LANDMARK WORKS ───────────────────────────────────────────────────────────
  {
    title: 'Neon Genesis Evangelion: The Series That Broke Anime and Its Own Studio',
    slug: 'neon-genesis-evangelion-broke-anime-and-its-studio',
    category: 'anime',
    excerpt: 'Hideaki Anno made Evangelion while in the depths of clinical depression, nearly bankrupted Gainax finishing it, and produced something so strange and so resonant that it permanently altered what anime is allowed to be.',
    content: `"Neon Genesis Evangelion" premiered in October 1995. It was designed, at least initially, as a commercially safe mecha series — giant robots, a teenage pilot, episodic monster battles — the kind of show that had reliably sold toys and model kits since the 1970s. What it became instead was one of the most psychologically disturbing, formally experimental, and culturally significant animated works ever produced. The gap between what it was supposed to be and what it became is the story of Hideaki Anno, the man who made it, and the state he was in while making it.

Anno had spent the four years before Evangelion in a depressive episode so severe that he described being unable to do anything at all — no work, no social contact, nothing. When he emerged from it and began developing the series, he used the show as a vehicle for processing that experience in ways that became increasingly direct as production continued. The early episodes function as a reasonably competent action series. As the series progresses, the psychological content becomes more explicit, the narrative structure more fragmented, and the protagonist Shinji Ikari's interiority more central than the battles he is nominally fighting. By the final two episodes — produced when the studio had run out of money and could no longer afford conventional animation — the show had become an extended internal monologue staged almost entirely through still images, text, and voice.

Those final episodes produced a crisis of audience expectation so acute that Gainax received death threats from fans who felt that the conventional ending they had been promised had been withheld. Anno and several other staff members received threatening letters. The studio responded by producing "The End of Evangelion" (1997), a theatrical film providing an alternative ending that delivers the apocalyptic spectacle the television ending denied — and then surrounds it with content so bleak and accusatory toward the audience itself that it functions less as a concession than as a confrontation.

The cultural impact of Evangelion is now so thoroughly absorbed into anime that it is difficult to see clearly. Series that interrogate their own genre conventions, protagonists who are defined by psychological damage rather than simple heroism, narratives that deliberately withhold resolution — all of these were present in anime before 1995, but Evangelion made them legitimate at a mass audience level in ways that had not existed before. It also established a commercial model — the "rebuild," the repackaged rerelease, the franchise extended through new productions years after the original — that the anime industry has reproduced extensively.

Anno spent the years after the original Evangelion in and out of depression, making films and returning eventually to produce the "Rebuild of Evangelion" tetralogy, a four-film reimagining of the original series. The final film, "Evangelion: 3.0+1.0 Thrice Upon a Time," was released in 2021 after years of delays. It is, by most readings, a work of genuine closure — Anno processing and releasing something he had carried for twenty-five years. Whether it succeeds as a work of art independently of that autobiographical context is a question viewers continue to debate.`,
    tags: ['Evangelion', 'Hideaki Anno', 'Gainax', 'anime history', 'mecha anime', 'psychological anime'],
    entities: ['Hideaki Anno', 'Gainax', 'Shinji Ikari'],
    publishedAt: new Date('2026-05-02'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/neon-genesis-evangelion-broke-anime-and-its-studio',
  },
  {
    title: 'Akira (1988): The Film That Taught the World What Animation Could Be',
    slug: 'akira-1988-film-that-taught-the-world-animation',
    category: 'anime',
    excerpt: 'Katsuhiro Otomo\'s 1988 adaptation of his own manga was produced at a scale and technical ambition that had no precedent in animation anywhere in the world. Its impact on Western film and culture is still being counted.',
    content: `In 1988, the animated film "Akira" arrived in Japanese cinemas with a budget of 1.1 billion yen — at the time, the most expensive animated film ever produced in Japan. Director Katsuhiro Otomo, adapting the first half of his own sprawling manga, had insisted on standards of production that the industry had never previously attempted: 24 frames per second fully animated (compared to the 8 or fewer frames per second standard for television anime), 160,000 individually drawn animation cels, lip-synced animation recorded to dialogue rather than the Japanese industry's standard practice of recording dialogue to match existing animation, and a level of background detail that required staff to paint individual bricks in background cityscapes. The resulting film looked like nothing anyone had seen.

The story — a motorcycle gang member in a dystopian future Tokyo acquires catastrophic telekinetic powers after contact with a government experiment — is simultaneously a political allegory about postwar Japan, a body horror narrative, and a meditation on power and its corrupting effects. The imagery Otomo created for the film's climax — organic matter expanding to fill space, the boundary between human body and environment dissolving — has been referenced, quoted, and homaged in Western film and music videos for over thirty years.

"Akira" reached Western audiences through an English dub released in 1989 and expanded through VHS. For many Western viewers, particularly those who had grown up believing that animation was categorically a children's medium, it was a revelatory experience. Here was animation depicting adult themes — violence, political corruption, addiction, the horror of uncontrolled power — with a visual sophistication that no live-action film could have achieved at comparable cost. The film forced a revision of basic assumptions about what animation was and what it could do.

The influence on Western filmmakers is documented and direct. The Wachowskis cited "Akira" as an influence on "The Matrix." Kanye West referenced it in his "Stronger" music video. James Cameron, Christopher Nolan, and Darren Aronofsky have all discussed it as formative. Entire sequences from the film — the motorcycle slide, the expansion sequence — have been recreated or referenced in productions that have themselves influenced subsequent generations of filmmakers, creating a lineage of "Akira" influence that extends far beyond works that acknowledge it directly.

Otomo himself has spent the decades since "Akira" working slowly and selectively. His 2004 film "Steamboy" took nine years to produce. A live-action American adaptation of "Akira" has been in various stages of development since the early 2000s and has never been made, which may itself be evidence of the film's impossibility to replicate: it is so thoroughly a product of a specific moment, medium, and cultural context that translation into any other form seems, so far, to defeat the most determined efforts.`,
    tags: ['Akira', 'Katsuhiro Otomo', 'anime film', 'anime history', '1988 anime', 'cyberpunk anime'],
    entities: ['Katsuhiro Otomo', 'Tokyo'],
    publishedAt: new Date('2026-05-04'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/akira-1988-film-that-taught-the-world-animation',
  },
  {
    title: 'Ghost in the Shell (1995): The Film That Wired Anime Into Western Science Fiction',
    slug: 'ghost-in-the-shell-1995-wired-anime-into-western-sci-fi',
    category: 'anime',
    excerpt: 'Mamoru Oshii\'s 1995 film asked what identity means when the mind can be copied, altered, or transplanted. Its questions have only become more urgent, and its influence on The Matrix, Blade Runner 2049, and Western sci-fi runs deeper than most audiences know.',
    content: `Mamoru Oshii's "Ghost in the Shell" was released in Japan in November 1995. Based on Masamune Shirow's manga, the film follows Major Motoko Kusanagi, a cyborg police officer in a future where human consciousness can be digitized, copied, hacked, and transplanted. The film's central question — whether a being whose memories and personality exist as data has a soul, a "ghost," that makes her a self rather than a sophisticated program — is posed not through dialogue exposition but through extended visual sequences of unusual quiet: the Major swimming through water, staring at crowds, watching her own hands move. It is a film that thinks at you rather than explaining itself.

The technical execution matched the philosophical ambition. Oshii and animation director Toshihiko Nishikubo created a film of extraordinary visual density — layer upon layer of detail in backgrounds and cityscapes that required the viewer to look, rather than just watch. The film's Hong Kong-influenced aesthetic, its rain-soaked streets and dense vertical architecture, created a version of the future that was neither American utopia nor simple dystopia but something more complexly imagined: a world that had changed in specific ways while remaining recognizably continuous with the present.

The Wachowskis have said explicitly that they showed "Ghost in the Shell" to producers when pitching "The Matrix," saying "we want to make that, but in live action." The debt is visible not just in visual references — the city, the manipulation of digital reality, the protagonist questioning the nature of their own identity — but in the fundamental structure of the story: a being who is both more and less than human, unsure of what is real about themselves, who discovers that reality itself has been manufactured. These are "Ghost in the Shell" ideas that "The Matrix" translated for a mainstream Western audience.

The influence continued after "The Matrix." "Blade Runner 2049," "Ex Machina," "Westworld," "Altered Carbon" — each of these engages with questions about digital consciousness, the authenticity of memory, and the definition of personhood that "Ghost in the Shell" posed in 1995. The 2017 live-action Hollywood remake, which attracted controversy for casting Scarlett Johansson as the Major, demonstrated both the film's continued cultural currency and the difficulty of translating a work so deeply embedded in its visual and cultural context.

Oshii followed "Ghost in the Shell" with "Innocence" in 2004, a sequel that is even more demanding and philosophically dense — a film about grief and memory that most viewers find beautiful and inaccessible in roughly equal measure. The original remains the work by which he is known, and it remains among the very few anime films that have demonstrably changed the course of mainstream Western science fiction.`,
    tags: ['Ghost in the Shell', 'Mamoru Oshii', 'cyberpunk anime', 'anime film', 'sci-fi anime', 'The Matrix'],
    entities: ['Mamoru Oshii', 'Masamune Shirow', 'Motoko Kusanagi'],
    publishedAt: new Date('2026-05-06'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/ghost-in-the-shell-1995-wired-anime-into-western-sci-fi',
  },
  {
    title: 'Sailor Moon and the Reinvention of the Magical Girl',
    slug: 'sailor-moon-reinvention-of-magical-girl',
    category: 'anime',
    excerpt: 'When Sailor Moon launched in 1992, it fused the magical girl genre with the sentai team format and added something no previous version of either had: female friendship as the actual source of power. The result changed anime history.',
    content: `The magical girl genre — stories about young girls who transform into powered heroines — predates "Sailor Moon" by more than twenty-five years. "Mahō Tsukai Sally" ("Sally the Witch"), which premiered in 1966, is generally credited as the first magical girl anime: a story about a witch girl from a magical kingdom who lives among ordinary humans. The genre that followed over the next twenty years was broadly consistent: a single heroine with magical abilities, usually gifted by a cute companion, using her powers to help people in relatively low-stakes situations. The tone was warm, the power was used gently, and the heroines were defined by their kindness rather than their strength.

Naoko Takeuchi's manga "Sailor Moon," which began in 1991 and was adapted into anime in 1992, took this template and fundamentally restructured it by asking what would happen if you combined the magical girl with the super sentai — the team of five-color-coded heroes that "Super Sentai" (the Japanese source material for Power Rangers) had made enormously popular. The result was a team of magical girls, each with distinct elemental powers and personalities, fighting genuinely threatening villains in battles that carried real dramatic stakes. People could be hurt. The stakes were sometimes planetary. Characters could die — and did, at the end of the first season, in a scene that devastated child audiences who had not expected animated magical girls to sacrifice themselves for humanity.

The emotional core that made Sailor Moon more than a genre hybrid was Takeuchi's insistence that the heroines' relationships with each other were as important as any external conflict. The friendship between Usagi (Sailor Moon) and her fellow Sailor Guardians is not a backdrop for the fights; it is the primary content of the series, and the fights are what happens when that friendship is threatened. The power-up sequences that allow the heroines to fight effectively are explicitly powered by emotional bonds — the love between friends and between the team and the people they protect. This was a new claim: not that female friendships were a nice backdrop to adventure, but that they were the actual source of heroic power.

The global impact was substantial and varied by territory. In Japan, "Sailor Moon" became the best-selling manga of the 1990s by a significant margin. In North America and Europe, it was among the first anime series to build a significant female fanbase — audiences who had found the male-oriented action series that had previously dominated anime imports to be not quite made for them. The series demonstrated that anime could generate the same intensity of fan investment from girls and women as from boys and men, a fact that the industry had not previously been motivated to test.

The magical girl genre has never returned to its pre-Sailor Moon form. Series like "Cardcaptor Sakura," "Pretty Cure," and "Puella Magi Madoka Magica" — the last of which is a deliberate and devastating deconstruction of everything Sailor Moon established — exist in a tradition that Takeuchi's work defined. When "Madoka" inverts the genre's conventions to examine what it would actually cost a young girl to take on the responsibility of fighting evil, it is in direct conversation with Sailor Moon's optimistic premise. You can only deconstruct a tradition that is genuinely established. Takeuchi established it.`,
    tags: ['Sailor Moon', 'Naoko Takeuchi', 'magical girl', 'anime history', 'Madoka Magica', 'shoujo anime'],
    entities: ['Naoko Takeuchi', 'Sailor Moon', 'Usagi Tsukino'],
    publishedAt: new Date('2026-05-08'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/sailor-moon-reinvention-of-magical-girl',
  },
  {
    title: 'Fullmetal Alchemist: Why It\'s Considered the Best-Structured Manga Ever Written',
    slug: 'fullmetal-alchemist-best-structured-manga',
    category: 'manga',
    excerpt: 'Hiromu Arakawa began Fullmetal Alchemist knowing how it would end. Nine years later, she finished it exactly as planned. This kind of structural discipline is almost without precedent in serialized manga — and it shows in every chapter.',
    content: `Hiromu Arakawa began serializing "Fullmetal Alchemist" in Monthly Shonen Gangan in August 2001. Before she wrote the first chapter, she knew how the series would end. This is unusual for serialized manga — most long-running series develop their conclusions in response to reader feedback, editorial guidance, and the creative evolution that happens over years of weekly or monthly production. Arakawa's decision to plan her ending before her beginning meant that every chapter she published was, in some sense, moving toward a destination she had already chosen. The result is a manga of structural tightness rare in the medium.

The story follows brothers Edward and Alphonse Elric, who attempt to use alchemy to resurrect their dead mother, violate the fundamental law prohibiting human transmutation, and pay a devastating price: Ed loses his arm and leg; Al loses his entire body, his soul bound to a suit of armor. The brothers spend the series searching for the Philosopher's Stone, a legendary amplifier that might allow them to restore what they lost. This premise — two brothers paying an enormous price for love, trying to undo that payment without making it worse — is emotionally clear from the opening chapters and never loses focus over more than a hundred chapters of story.

What Arakawa accomplished within this premise is the construction of an elaborate supporting cast, villain hierarchy, and political conspiracy that all resolve in ways that feel both surprising and inevitable — the mark of plotting that was genuinely designed rather than improvised. Characters who appear early in the story as apparent minor roles are revealed to be central to the climax. Villains are given sufficient interiority to be comprehensible without being sympathetic. The series' central theme — the alchemical principle of equivalent exchange, that nothing can be gained without something being given up — is not merely a plot rule but a moral philosophy that the story consistently interrogates and ultimately both affirms and complicates.

The comparison point is almost always the 2003 anime adaptation, which was produced before Arakawa had completed the manga and which invented its own divergent ending. That adaptation has its admirers. The 2009 adaptation "Brotherhood," which follows the manga closely from beginning to end, is the work that revealed how fully realized Arakawa's original plan was: watching Brotherhood after reading the manga, or watching it with knowledge of how the story ends, reveals structural choices that are invisible on a first read. Details planted in early episodes resolve into meaning only hundreds of chapters later. The architecture is genuinely remarkable.

Arakawa's own background — she grew up on a dairy farm in Hokkaido and worked on the farm before becoming a manga artist — informs the series in ways that are not obvious but are real. Her depictions of labor, of the physical cost of work, and of the kinds of knowledge that come from working with land and animals give the series an earthiness that its elaborate fantasy plotting does not diminish. She is not a writer who romanticizes work or struggle; her characters earn what they achieve, and the earning is shown, not elided.`,
    tags: ['Fullmetal Alchemist', 'Hiromu Arakawa', 'manga structure', 'shonen manga', 'Brotherhood', 'manga writing'],
    entities: ['Hiromu Arakawa', 'Edward Elric', 'Alphonse Elric', 'Hokkaido'],
    publishedAt: new Date('2026-05-10'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/fullmetal-alchemist-best-structured-manga',
  },
  {
    title: 'Death Note: The Psychological Thriller That Gave Manga a Mainstream Moment',
    slug: 'death-note-psychological-thriller-mainstream-moment',
    category: 'manga',
    excerpt: 'When a notebook that kills anyone whose name is written in it lands in the hands of a bored genius, the result is a cat-and-mouse thriller that reached audiences far beyond the usual manga readership. Here\'s how Death Note crossed over.',
    content: `"Death Note" was created by writer Tsugumi Ohba and artist Takeshi Obata and serialized in Weekly Shonen Jump from 2003 to 2006. Its premise is a moral thought experiment delivered as a thriller: a high school student named Light Yagami finds a supernatural notebook whose rules state that any person whose name is written in it will die. Light, who is brilliant and profoundly bored, decides to use it to kill criminals and remake the world in his own image of justice. A detective of comparable genius known only as L is assigned to catch him. What follows is an extended battle of intellect between two people who cannot meet directly without risking their own lives.

The series succeeds because Ohba refuses to simplify the moral content. Light is not presented as a hero who goes wrong; he is presented as someone who always had a god complex and who has been given the tool to act on it. The reader is asked to find him compelling — which is easy, because he is — while also recognizing that what he is doing is wrong and that his certainty about his own righteousness is itself the most dangerous thing about him. This ambiguity, in a magazine that typically published stories with much clearer moral polarity, was immediately distinctive.

The cat-and-mouse structure allowed Ohba to write plotting of unusual sophistication. Each chapter functions as a chess game in which both players are operating on incomplete information about the other's position, and the pleasure is in watching both minds construct theories, set traps, and respond to the other's moves. For readers who came to manga primarily through action series, "Death Note" offered a different kind of tension — the tension of intellect rather than combat — that proved to have a very large audience.

The series reached readers outside the normal manga demographic in ways that few Jump series had managed. Its themes — justice, the abuse of power, the question of whether a good outcome justifies any means — were accessible without manga literacy. The 2006 anime adaptation, produced by Madhouse with an instantly iconic visual style and an operatic score, brought the story to an even wider audience. By 2007, "Death Note" had achieved the unusual distinction of being discussed seriously in mainstream Western press as a morally interesting work, not merely as an example of Japanese pop culture.

The series' second half — following a narrative event that restructures the cat-and-mouse dynamic entirely — is widely regarded as significantly weaker than the first. This is a genuine structural flaw. But the first half, roughly volumes 1 through 7 of the manga, is among the most consistently gripping serialized thriller fiction produced in any medium in its decade. That the second half disappoints is a measurement of how high the first half set the bar.`,
    tags: ['Death Note', 'Tsugumi Ohba', 'Takeshi Obata', 'psychological thriller', 'Weekly Shonen Jump', 'manga thriller'],
    entities: ['Tsugumi Ohba', 'Takeshi Obata', 'Light Yagami', 'L', 'Madhouse'],
    publishedAt: new Date('2026-05-12'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/death-note-psychological-thriller-mainstream-moment',
  },
  {
    title: 'Attack on Titan: How One Manga Became a Global Cultural Event',
    slug: 'attack-on-titan-global-cultural-event',
    category: 'manga',
    excerpt: 'Hajime Isayama spent 11 years drawing Attack on Titan. By the time the final chapter published in 2021, it had sold over 100 million copies worldwide and sparked one of the most heated debates in modern manga history.',
    content: `Hajime Isayama submitted "Attack on Titan" to Shonen Jump in 2006. The editorial team rejected it. He took it to Bessatsu Shonen Magazine, published by Kodansha, where it launched in September 2009. The rejection is now one of the better-documented bad editorial decisions in manga history, because the series that Shonen Jump passed on went on to sell over 100 million copies, become one of the most-watched anime series in the world, and generate a finale controversy that dominated anime discussion for months in 2021.

The premise is simple in its horror: humanity has retreated behind enormous walls to survive attacks from giants called Titans that eat people without apparent reason or hunger. The protagonist, Eren Yeager, watches his mother eaten by a Titan during a breach, and dedicates himself to exterminating every Titan alive. For its first several years, "Attack on Titan" operated as an exceptionally well-crafted horror action series — the Titans were genuinely frightening, the action was kinetically brilliant, and the mystery of the Titans' origin was intriguing enough to drive sustained reader investment.

Then Isayama revealed the truth: the Titans are humans. The story of people trapped behind walls fighting monsters became a story about genocide, nationalism, cycles of violence, and the question of whether liberation can be achieved through atrocity. Eren, who began as a protagonist defined by righteous anger, became over the course of the series something far more complex and far more disturbing — a character whose worldview the story never entirely endorses but also never simplifies. The moral ambiguity was deliberately sustained rather than resolved, which is either the series' greatest achievement or its most frustrating quality depending on the reader.

The anime adaptation, produced first by Wit Studio and later by MAPPA, was technically extraordinary — the 3D maneuver gear combat sequences, in which soldiers fly between buildings on wires to attack Titans, required animation of unusual difficulty, and both studios delivered it at a level that established new benchmarks for action animation. The series drew massive international audiences through Crunchyroll and Netflix, becoming one of the very few anime to trend globally on social media in the way that mainstream American television does.

The final manga chapters and the concluding anime episodes divided fandom in a way that is itself notable: the disagreement about whether the ending is brilliant or a betrayal has been conducted at a level of engagement and sophistication that demonstrates how seriously its audience took the work. Bad endings to beloved series are not uncommon. Endings that provoke this volume of analytical response — that force readers to examine what they thought the work was about and whether the author's conclusion is consistent with that reading — are much rarer. Whatever the verdict, "Attack on Titan" demanded to be taken seriously, and its audience obliged.`,
    tags: ['Attack on Titan', 'Hajime Isayama', 'manga history', 'Kodansha', 'MAPPA', 'Wit Studio', 'anime phenomenon'],
    entities: ['Hajime Isayama', 'Eren Yeager', 'MAPPA', 'Wit Studio', 'Kodansha'],
    publishedAt: new Date('2026-05-14'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/attack-on-titan-global-cultural-event',
  },

  // ── CREATORS ─────────────────────────────────────────────────────────────────
  {
    title: 'Hayao Miyazaki and the Creation of Studio Ghibli',
    slug: 'hayao-miyazaki-and-the-creation-of-studio-ghibli',
    category: 'creators',
    excerpt: 'Hayao Miyazaki has retired three times and returned each time with a new film. The studio he built with Isao Takahata is the only animation studio in the world whose name alone is sufficient to guarantee an audience.',
    content: `Hayao Miyazaki was born in Tokyo in 1941, the second of four sons in a family that manufactured airplane parts for the Japanese military. His childhood coincided with the firebombing of Tokyo; his first memories of urban Japan were of a city in ruins. He grew up reading manga and became obsessed with animation, joining Toei Animation in 1963 as an in-between artist — the entry-level role of drawing the intermediate frames between key poses that more senior animators produced. He was, by all accounts, extremely good at it, and extremely unhappy doing it.

The path from Toei to Ghibli ran through two decades of animation work on television and film, a creative partnership with Isao Takahata (a director of even greater austerity than Miyazaki, whose "Grave of the Fireflies" and "My Neighbor Yamada" occupy positions at opposite ends of emotional devastation), and the unexpected theatrical success of "Nausicaä of the Valley of the Wind" in 1984 — a film based on Miyazaki's own ongoing manga that performed well enough commercially to justify founding a studio specifically to continue making his films. Studio Ghibli was established in 1985, and its first production was "Castle in the Sky."

The consistency of the Ghibli filmography across four decades is almost without parallel in cinema. The films are visually extraordinary — every frame is composed with a care for light, environment, and movement that reflects decades of accumulated craft — but they are also emotionally intelligent in ways that distinguish them from the mass of animated entertainment. Miyazaki's films are interested in the interiority of their characters, particularly their female protagonists, in a way that many filmmakers working in animation have not been. His heroines are neither passive nor defined by romantic aspiration; they are curious, capable, and allowed to be ambivalent, afraid, and complicated.

"Spirited Away," released in 2001, became the highest-grossing film in Japanese history, surpassing "Titanic." It won the Academy Award for Best Animated Feature in 2003, the first non-English-language film to do so. "Princess Mononoke," "Howl's Moving Castle," "My Neighbor Totoro," and "Kiki's Delivery Service" have each achieved the status of cultural classics not merely in Japan but globally — works that are considered, by audiences who have otherwise minimal engagement with animation, to be simply great films.

Miyazaki announced his retirement in 1997, after "Princess Mononoke," and returned to make "Spirited Away." He announced retirement again in 2013, after "The Wind Rises," and returned to make "The Boy and the Heron" (2023), which won the Academy Award for Best Animated Feature. He is now in his early eighties and reported to be working on another project. The pattern suggests that retirement is, for him, a condition of recharging rather than stopping. The question of what Ghibli will be after Miyazaki — a question the studio itself is actively working to answer — is one of the more significant open questions in world cinema.`,
    tags: ['Hayao Miyazaki', 'Studio Ghibli', 'anime film', 'Spirited Away', 'Isao Takahata', 'anime history'],
    entities: ['Hayao Miyazaki', 'Isao Takahata', 'Studio Ghibli', 'Tokyo'],
    publishedAt: new Date('2026-05-16'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/hayao-miyazaki-and-the-creation-of-studio-ghibli',
  },
  {
    title: 'Hideaki Anno: The Depression Behind Evangelion and What Came After',
    slug: 'hideaki-anno-depression-behind-evangelion',
    category: 'creators',
    excerpt: 'Hideaki Anno has said that he made Neon Genesis Evangelion because he wanted to understand why he couldn\'t get out of bed. What emerged was one of the most psychologically honest works in animation history.',
    content: `Hideaki Anno was a founding member of Gainax, the studio that would produce "Neon Genesis Evangelion," and his path to directing that series ran through a period of clinical depression so severe that colleagues described him as functionally absent for years. He did not work, could not engage with other people, and had no particular interest in resuming either. When he emerged from the depression in the early 1990s and began developing Evangelion, he made a decision that would define both the work and his career: he would use the series to investigate the depression itself.

The decision was not announced. Evangelion was pitched to sponsors as a commercially viable mecha series — the market for giant robot toys was reliable, the format was proven. Gainax needed the production to succeed financially, and Anno knew that a series explicitly marketed as an autobiographical exploration of clinical depression would not attract the necessary investment. The commercial shell remained intact through the early episodes. What shifted as the production continued was Anno's relationship to his material: the further the series went, the more directly it engaged with the interior states he had been living through.

The character of Shinji Ikari — the reluctant pilot who is asked to fight world-ending threats and consistently fails to summon the will to do so — is, in ways Anno has confirmed, a self-portrait. The persistent question the series asks of Shinji, and through him of the audience, is why it is so difficult to choose to engage with life when the cost of not engaging is so clearly catastrophic. This is a clinical description of certain depressive states, and Anno stages it not as a problem to be solved but as a condition to be examined. The series does not resolve it; it investigates it.

After the original Evangelion and its theatrical conclusion "End of Evangelion," Anno spent years in and out of production. He directed "Cutie Honey" (2004), a tokusatsu film, and co-wrote "Shin Godzilla" (2016), a political monster film that was received in Japan as one of the finest Godzilla productions in decades. The "Rebuild of Evangelion" tetralogy, which he produced over fifteen years, represents his attempt to return to the material with some distance — to remake the story with craft and perspective that the original's chaos did not allow. Whether it improves on the original or merely clarifies it is a question that serious viewers of both works continue to debate.

Anno has said that completing the final Rebuild film, "Thrice Upon a Time," felt like closure — that he had finished with Evangelion in a way he had not been able to in 1997. He is now in his early sixties and continues to work. What his career demonstrates, more clearly than most, is that the relationship between a creator's mental state and their creative output is not always tragic — that sometimes the work that emerges from the worst period is the work that matters most, and that surviving it makes subsequent work possible.`,
    tags: ['Hideaki Anno', 'Evangelion', 'Gainax', 'anime directors', 'mental health', 'anime history'],
    entities: ['Hideaki Anno', 'Gainax', 'Shinji Ikari'],
    publishedAt: new Date('2026-05-18'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/hideaki-anno-depression-behind-evangelion',
  },
  {
    title: 'Junji Ito: How One Man Became Synonymous With Horror Manga',
    slug: 'junji-ito-how-one-man-became-synonymous-with-horror-manga',
    category: 'creators',
    excerpt: 'Junji Ito trained as a dental technician and drew horror manga in his spare time for years before anyone outside Japan knew his name. Today, his images are among the most widely recognized in horror anywhere in the world.',
    content: `Junji Ito submitted his first manga story to a horror anthology magazine in 1987 while working full-time as a dental technician. The story won a prize. He continued submitting work while continuing his day job, building a portfolio of short horror stories that appeared in Viz Media's "Horror" anthology magazines before he transitioned to manga full-time in the mid-1990s. By then he had already created some of the images that would define his international reputation: the spiral, the balloon heads, the woman in the well.

Ito's horror operates through the violation of the familiar. His stories begin with premises that are recognizably domestic — a girlfriend, a small town, a collection of used clothing — and then introduce single elements of wrong so precise and escalating that what seemed normal becomes unbearable. The genius is in the escalation: Ito identifies exactly how far a wrong premise can be extended before the reader fully comprehends the scope of what is happening, and he consistently extends it further. By the time the full horror is revealed, the reader has been implicated in their own building dread.

His most celebrated work, "Uzumaki" (1998–1999), follows a town that becomes obsessed with spiral shapes. The premise sounds absurd summarized; the execution is among the finest sustained horror fiction produced in any medium. Ito uses the spiral — a shape that recurs in nature, in mathematics, in architecture — as a vessel for something genuinely inexpressible, something that the mind registers as wrong before it can articulate why. The visual grammar of manga, with its controlled revelation of information panel by panel, turns out to be ideally suited for this kind of horror. You cannot look away from the next panel; the format makes looking away impossible.

His influence on Western horror artists has been substantial and widely acknowledged. The directors of "It," "Hereditary," and "Midsommar" have cited him. His aesthetics appear in video games, in musical album artwork, in fashion. The image of Tomie — his recurring antagonist, an immortal, unkillable girl who drives men to murder and returns from every death to start again — has achieved the kind of cultural saturation that places her alongside Frankenstein's monster and Dracula as an immediately recognizable horror icon.

Ito has said in interviews that his horror tends to emerge from mundane anxieties rather than extreme ones — the fear of specific shapes, of social situations, of the body behaving in unexpected ways. The specificity of these anxieties, their rootedness in ordinary life, is what makes his work find audiences far outside the horror genre's usual readership. You do not need to like horror to recognize, in Ito's images, something that responds to genuine psychological fear rather than mere shock.`,
    tags: ['Junji Ito', 'horror manga', 'Uzumaki', 'Tomie', 'manga horror', 'manga art'],
    entities: ['Junji Ito'],
    publishedAt: new Date('2026-05-20'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/junji-ito-how-one-man-became-synonymous-with-horror-manga',
  },
  {
    title: 'Makoto Shinkai: How Your Name Became Japan\'s Second Highest-Grossing Film',
    slug: 'makoto-shinkai-your-name-japans-highest-grossing-film',
    category: 'creators',
    excerpt: 'Makoto Shinkai made his first short film alone in his apartment in 2000. Sixteen years later, Your Name earned $380 million worldwide and briefly surpassed Spirited Away as Japan\'s highest-grossing film. Here\'s how he got there.',
    content: `In 2000, Makoto Shinkai produced a five-minute short film called "She and Her Cat" almost entirely by himself, working on a consumer-level computer in his apartment. The film, a quiet monologue from a cat's perspective about the woman he lives with, won awards at several animation festivals. Shinkai was 27, working as a graphic designer for a game company, and had never attended an animation school. He had taught himself everything he knew about animation by doing it.

What followed over the next fifteen years was a career of consistent artistic development that attracted a growing cult audience while remaining outside mainstream anime awareness. "Voices of a Distant Star" (2002), a 25-minute film about a girl fighting aliens in deep space while exchanging text messages with a boy on Earth — the messages taking increasingly long to arrive as she travels further from home — was another near-solo production that demonstrated the scope of what one person with enough skill and dedication could produce. "The Place Promised in Our Early Days" (2004) and "5 Centimeters per Second" (2007) established Shinkai's signature aesthetic: photorealistic backgrounds of extraordinary detail and luminosity, stories about distance and longing, moments of melancholy elevated by the beauty of their visual presentation.

"Your Name," released in August 2016, was Shinkai's first collaboration with the production house CoMix Wave Films at a scale that matched his visual ambition. The film follows a boy in Tokyo and a girl in rural Japan who periodically swap bodies without understanding why, and who begin to communicate across the gap through notes left in their shared body. The premise is a body-swap romantic comedy; what Shinkai does with it reaches into time, into catastrophe, and into the question of whether two people who have connected can find each other when every conventional means of finding them has been removed.

The film earned 25.03 billion yen in Japan, temporarily surpassing "Spirited Away" as the highest-grossing Japanese film in history before Miyazaki returned with "The Wind Rises" receipts. Internationally, it earned approximately $380 million, making it one of the highest-grossing anime films outside Japan ever. More striking than the numbers was the audience composition: "Your Name" attracted viewers who had never watched anime and who emerged from it recommending it to other people who had never watched anime. The film functioned as an entry point as well as an artwork.

Shinkai's subsequent films — "Weathering With You" (2019) and "Suzume" (2022) — confirmed that "Your Name" was not a one-off. The combination of technical beauty and emotional directness that defined it is reproducible, at least by him. He remains a studio of essentially one artistic vision, supported by a team of technical collaborators, in a tradition that runs from his one-man apartment productions to some of the most visually stunning animated films made anywhere in the world.`,
    tags: ['Makoto Shinkai', 'Your Name', 'anime film', 'CoMix Wave', 'Suzume', 'Weathering With You'],
    entities: ['Makoto Shinkai', 'Tokyo', 'CoMix Wave Films'],
    publishedAt: new Date('2026-05-22'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/makoto-shinkai-your-name-japans-highest-grossing-film',
  },
  {
    title: 'Naoki Urasawa: The Mangaka Who Makes You Feel Like You\'re Reading a Novel',
    slug: 'naoki-urasawa-manga-that-reads-like-a-novel',
    category: 'creators',
    excerpt: 'Naoki Urasawa has been called the Spielberg of manga. His work — Monster, 20th Century Boys, Pluto — combines the plotting of a thriller with psychological depth that most novelists never achieve. Here\'s how he does it.',
    content: `Naoki Urasawa began his professional career in 1983, and his early work gave little indication of what he would eventually produce. His first successful series, "Yawara!" (1986–1993), was a sports comedy about a reluctant female judo champion — charming, commercially successful, and entirely unlike the dense psychological thrillers that would define his later reputation. "Master Keaton" (1988–1994), an adventure series about an archaeologist and former SAS soldier, began the transition: the plotting became more complex, the moral questions more genuinely difficult, the craft more obviously deliberate.

"Monster," which began in 1994, was the series that established Urasawa's international reputation. The premise — a Japanese surgeon in Germany saves the life of a boy who grows up to become a serial killer — is the kind of high-concept thriller premise that collapses under examination if the execution is not equal to it. Urasawa's execution is exceptional. The surgeon, Kenzo Tenma, spends the series trying to correct his mistake by killing the man he saved, while the story systematically examines how the man, Johan Liebert, became what he is. Johan is one of the most compelling villains in modern fiction: genuinely monstrous, psychologically coherent, and comprehensible in ways that do not diminish his horror.

"20th Century Boys" (1999–2006) operates at an even larger scale — a mystery spanning multiple timelines, following a group of childhood friends who discover that a cult leader is enacting a plan of world domination based on a scenario they themselves invented as children. It is, structurally, one of the most ambitious serialized narratives in any medium: Urasawa sustains mystery across twenty-two volumes while continuously developing character, periodically restructuring the reader's understanding of what the story is about. The ending is debated, as ambitious endings often are.

"Pluto" (2003–2009), a reimagining of Osamu Tezuka's Astro Boy story "The Greatest Robot on Earth," demonstrates a different aspect of Urasawa's craft: his ability to take a source text he loves and extend it into entirely new emotional territory without betraying what made the original meaningful. "Pluto" is about grief, about the inheritance of violence across generations, and about whether beings constructed to feel emotions bear the same moral weight as beings who developed those emotions naturally. Tezuka's estate gave the project their blessing, and Tezuka's son Macoto has said that "Pluto" is the adaptation his father would have been proudest of.

What distinguishes Urasawa from other manga artists of comparable craft is his patience. He does not rush revelations or compress character development to maintain momentum. His series take years to read properly and reward rereading in ways that most serialized fiction does not. The clue planted in chapter two that resolves in chapter sixty does not feel like a trick; it feels like the natural consequence of the story always having known where it was going. In this, he resembles the novelists — le Carré, Highsmith, Dostoevsky — to whom he is often compared.`,
    tags: ['Naoki Urasawa', 'Monster', '20th Century Boys', 'Pluto', 'manga thriller', 'manga history'],
    entities: ['Naoki Urasawa', 'Osamu Tezuka'],
    publishedAt: new Date('2026-05-24'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/naoki-urasawa-manga-that-reads-like-a-novel',
  },

  // ── GENRE HISTORIES ──────────────────────────────────────────────────────────
  {
    title: 'Mecha: What Giant Robots Actually Mean in Japanese Culture',
    slug: 'mecha-what-giant-robots-mean-in-japanese-culture',
    category: 'anime',
    excerpt: 'The mecha genre — anime and manga centered on giant piloted robots — is not simply an action genre. It is a way of processing Japan\'s relationship with technology, war, and the postwar American occupation. The robots mean something.',
    content: `The first giant robot in Japanese popular culture was Mitsuteru Yokoyama's "Tetsujin 28-go," published in 1956. The robot is remote-controlled rather than piloted, and Yokoyama explicitly situated it in the shadow of World War II: it was a weapon developed by the Japanese military during the war, repurposed by a young boy after the war's end to fight crime. The technology of destruction redeemed by the agency of the innocent — this is the template that the mecha genre has reworked, in every possible configuration, for seventy years.

The shift from remote-controlled robot to piloted robot — from weapon operated from a distance to machine inhabited by a human — arrived with Go Nagai's "Mazinger Z" in 1972. The pilot sits inside the robot's head; the robot becomes an extension of the human body. This fusion of human and machine is not incidental. It connects to Japan's specific postwar relationship with technology: a culture that had experienced the catastrophic potential of industrial technology turned to military purpose now exploring what it would mean to be inside that technology, to control it rather than be destroyed by it.

"Mobile Suit Gundam," which premiered in 1979, complicated the mecha genre's morality in ways that had not previously been attempted. Creator Yoshiyuki Tomino's innovation was to remove the clear distinction between heroic and enemy robots: in the Universal Century universe, both sides of the conflict use functionally equivalent mobile suits, and the question of who is right is deliberately obscured. Soldiers on both sides are shown to be human beings with lives and fears and motivations. The protagonist's robot is not uniquely powerful; he survives because he is a skilled pilot who gets better through experience. The genre's previous formula — my robot is better, therefore I will win — was replaced by something considerably more difficult to watch.

Evangelion, as discussed elsewhere, took this moral complexity and turned it inward: the robots are extensions not of human technological capability but of human psychology, and the question the series asks is whether a human being damaged enough to need this level of technological mediation can function at all. The robot becomes a metaphor for the boundary between self and world — the machine that both enables and prevents genuine connection.

The mecha genre's contemporary form is far more diverse than its 1970s origins suggest. Works like "Darling in the FranXX," "86," and "Aldnoah.Zero" continue to use piloted machines as vehicles for examining questions about war, identity, and what it costs to be the person who fights. Others, like "Gurren Lagann," use the genre's conventions for deliberate emotional maximalism — more interested in the feeling of escalating power than in its cost. The genre is large enough to contain both. What it cannot contain, without ceasing to be itself, is robots that mean nothing — machines that are merely spectacle without the weight of the cultural history they carry.`,
    tags: ['mecha anime', 'Gundam', 'Evangelion', 'anime history', 'Go Nagai', 'Mazinger Z', 'mecha genre'],
    entities: ['Yoshiyuki Tomino', 'Go Nagai', 'Mitsuteru Yokoyama'],
    publishedAt: new Date('2026-05-26'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/mecha-what-giant-robots-mean-in-japanese-culture',
  },
  {
    title: 'Sports Manga: How Slam Dunk Got a Generation of Japanese Kids Playing Basketball',
    slug: 'sports-manga-slam-dunk-basketball-japan',
    category: 'manga',
    excerpt: 'Takehiko Inoue\'s Slam Dunk ran for only four years, but its impact on Japanese basketball — and on the sports manga genre — has lasted thirty. Here\'s how a comic changed a sport.',
    content: `In the early 1990s, basketball was a niche sport in Japan. The country's athletic culture was dominated by baseball and sumo, with football (soccer), judo, and swimming occupying the next tier. Basketball existed — there were school teams, there was a domestic league — but it had nothing like the cultural presence it needed to produce serious competitive players at scale. Then "Slam Dunk" began serialization in Weekly Shonen Jump in October 1990, and over the next four years the sport's profile in Japan changed fundamentally.

Takehiko Inoue's series follows Hanamichi Sakuragi, a delinquent high school student who joins the basketball team for the entirely incorrect reason that the girl he likes plays it. He knows nothing about basketball. He is enthusiastic, infuriatingly arrogant, and genuinely talented. The series traces his development from complete beginner to competitive player with a realism and attention to craft that most sports manga sacrifice for dramatic convenience. Inoue had played basketball himself in high school; he knew what it felt like to learn the game, what specific skills required developing, what a team that worked well together actually looked like.

The "Slam Dunk" effect on Japanese basketball is documented and specific. Enrollment in school basketball clubs spiked during the series' run and continued elevated after its conclusion. The Japan Basketball Association credited the manga with contributing to a generation of players who might otherwise not have encountered the sport. When Japan's men's national basketball team finally achieved competitive results at the international level in the 2010s and 2020s, several players cited "Slam Dunk" as the reason they started playing. The 2022 theatrical film "The First Slam Dunk," which Inoue directed himself, performed extraordinarily well in Japan and internationally, demonstrating that the series' emotional hold had not diminished after thirty years.

The sports manga genre that "Slam Dunk" belongs to has a specific tradition in Japanese comics — series like "Captain Tsubasa" (soccer, which is widely credited with fueling the soccer boom that led to Japan's 2002 World Cup co-hosting), "Haikyuu!!" (volleyball), "Kuroko's Basketball," and "Daiya no A" (baseball) use the sports narrative structure — training, tournament, rivals, breakthrough — as a vehicle for examining themes about teamwork, individual excellence, and the relationship between talent and effort that are not specific to the sport depicted.

What distinguishes the best sports manga from the genre's lesser examples is the quality of attention to the sport itself. "Slam Dunk" does not merely use basketball as a backdrop for character drama; it depicts basketball with enough specificity and love that readers who have never played the game develop an understanding of what makes it beautiful. This kind of specific attention — what you might call genre honesty — is the difference between sports manga that changes how people see a sport and sports manga that merely uses a sport for its setting.`,
    tags: ['Slam Dunk', 'Takehiko Inoue', 'sports manga', 'basketball', 'manga history', 'Captain Tsubasa'],
    entities: ['Takehiko Inoue', 'Japan', 'Weekly Shonen Jump'],
    publishedAt: new Date('2026-05-28'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/sports-manga-slam-dunk-basketball-japan',
  },
  {
    title: 'Horror Manga: The Lineage from Kazuo Umezu to Junji Ito',
    slug: 'horror-manga-lineage-umezu-to-junji-ito',
    category: 'manga',
    excerpt: 'Japanese horror manga has its own distinct tradition, shaped by specific cultural anxieties and a visual grammar that has no Western equivalent. Here\'s the history of the genre from its postwar origins to its current global reach.',
    content: `Horror in Japanese manga has roots that run deeper than its Western counterparts recognize. The kamishibai — paper theater, a storytelling tradition in which illustrated cards were presented sequentially on a small stage by traveling performers — was already delivering horror narratives to children in Japan during the postwar period. The card format, revealing images one at a time with narration between each, is structurally similar to manga's panel-by-panel revelation. The visual vocabulary of Japanese horror — the specific way shadows fall, the specific facial expressions that register supernatural dread — developed in kamishibai before it migrated into manga.

Kazuo Umezu, born in 1936, is the figure most responsible for establishing horror manga as a serious genre. His work in the 1960s and 1970s — "The Drifting Classroom," "Orochi," "Cat Eyed Boy" — demonstrated that manga could sustain horror of genuine intensity across extended narratives. "The Drifting Classroom" (1972–1974) is his masterpiece: an elementary school is transported to a post-apocalyptic wasteland, and the story follows the children's attempt to survive in conditions of absolute extremity. It is genuinely terrifying and also genuinely humane — Umezu's horror is never merely shocking; it uses extreme circumstances to examine what children actually are, what they are capable of under duress, what they need from adults and what happens when adults are not available.

The generation of horror manga artists that followed Umezu — including Hideshi Hino, whose grotesque body horror comics occupied their own disturbing territory — developed the genre's visual vocabulary toward more explicit imagery. The boundary between horror and exploitation has always been contested in manga as in film, and certain works from the 1980s and 1990s inhabit that boundary in uncomfortable ways.

Junji Ito, who trained under no one and developed his approach in isolation, represented a third direction: horror that derived its power not from explicit violence or transgressive content but from the specifically wrong image — the impossible shape, the expression that should not exist, the figure in the photograph that no one can explain. His methods draw on surrealism and on the specifically Japanese tradition of the kaidan — the ghost story — more than on Western horror conventions. The result is work that frightens audiences in different cultures for recognizably similar reasons, which suggests it is engaging with anxieties that are not culturally specific.

The global reach of Japanese horror manga — through Ito's international publication, through horror anime adaptations, through the influence of Japanese horror aesthetics on Western horror cinema (the visual conventions of films like "The Ring" and "The Grudge" are deeply indebted to Japanese horror manga) — has made this one of the most successfully exported Japanese cultural forms. The specific way Japanese horror looks, the specific feelings it generates, have become part of a global visual language of fear.`,
    tags: ['horror manga', 'Kazuo Umezu', 'Junji Ito', 'manga history', 'Japanese horror', 'The Drifting Classroom'],
    entities: ['Kazuo Umezu', 'Junji Ito'],
    publishedAt: new Date('2026-05-30'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/horror-manga-lineage-umezu-to-junji-ito',
  },
  {
    title: 'Food Manga: Why Japan Produces More Serious Cooking Comics Than Anywhere Else',
    slug: 'food-manga-why-japan-produces-so-many-cooking-comics',
    category: 'manga',
    excerpt: 'From Oishinbo to Shokugeki no Soma, Japan has produced a genre of manga devoted entirely to food — its preparation, its history, its cultural significance, and the drama of competitive cooking. Here\'s why the genre exists and what makes it work.',
    content: `Japan produces more serious manga about food than any other country produces about food in any visual medium. This is not simply a function of manga's volume — though manga's volume is relevant — but reflects something specific about Japanese culture's relationship with food, its preparation, and the expertise required to do it well. The food manga genre, which began in recognizable form in the 1970s and has never stopped expanding, treats cooking as a legitimate subject for drama, history, philosophy, and competition in ways that Western food media, despite its own recent seriousness, has generally not attempted in narrative form.

"Oishinbo" ("The Gourmet"), which began in 1983 and ran for decades in Big Comic Spirits, is the founding text of the serious food manga genre. Written by Tetsu Kariya and illustrated by Akira Hanasaki, the series follows a journalist who covers food for a newspaper, using each chapter as an opportunity to explore the history, cultural significance, and preparation of a specific Japanese or international dish. The series functions as part fiction and part culinary education — readers genuinely learn things about food from reading it. It also introduced the dramatic structure that food manga has returned to repeatedly: the contest between two competing visions of how something should be cooked, judged by experts whose expertise gives the reader something to measure.

The competitive cooking format — the cook-off, the tasting panel, the dramatic reveal — reached its extreme articulation in "Food Wars! Shokugeki no Soma" (2012–2019), a series that frankly combined cooking competition with the visual vocabulary of shonen battle manga. Characters compete in formal "food wars" in which the loser is expelled from school; the judges' reactions to food are depicted through elaborate visual metaphors involving supernatural phenomena; the protagonist's genius is developed through training arcs and tournament brackets. The absurdity is deliberate and part of the pleasure, but beneath it is genuine attention to cooking technique — the series' depictions of food preparation are accurate, and readers have actually reproduced dishes from it.

Between "Oishinbo"'s documentary seriousness and "Shokugeki"'s gleeful excess lies a spectrum of food manga: "Bambino!" follows a young cook's apprenticeship in an Italian restaurant; "Yakitatte!! Japan" is about competitive bread-baking; "Bartender" is about cocktail craft; "Drops of God" is about wine tasting and inheritance. Each occupies different territory, but all share the central proposition that expertise about food — knowing what is good, knowing how to make it, knowing its history — is a legitimate form of human excellence deserving of serious narrative attention.

The genre's prevalence in Japan reflects real cultural weight attached to food expertise. The Michelin Guide to Tokyo has more starred restaurants than any other city in the world. The concept of "shokunin" — the artisan who devotes their life to mastering a single craft — is culturally honored in Japan in ways that make a manga devoted to a character spending their career perfecting one dish feel not absurd but admirable. The food manga genre is, in this sense, the shokunin ethic applied to narrative.`,
    tags: ['food manga', 'Oishinbo', 'Food Wars', 'cooking manga', 'manga genres', 'Shokugeki no Soma'],
    entities: ['Tetsu Kariya'],
    publishedAt: new Date('2026-06-01'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/food-manga-why-japan-produces-so-many-cooking-comics',
  },

  // ── INDUSTRY AND CULTURE ──────────────────────────────────────────────────────
  {
    title: 'The Anime Production Committee: How It Finances Shows and Why It Makes Bold Storytelling Harder',
    slug: 'anime-production-committee-financing-bold-storytelling',
    category: 'industry',
    excerpt: 'Most anime series are not funded by a single studio but by a committee of companies, each contributing partial financing in exchange for partial rights. Understanding this system explains why anime looks the way it does — and why it often plays it safe.',
    content: `Most anime series are produced not by a single company but by a "seisaku iinkai" — a production committee composed of multiple stakeholders, each contributing partial financing in exchange for partial rights to the finished product. A typical committee might include the manga publisher (if the series is an adaptation), a record label (for music rights), a toy manufacturer (for merchandise), a streaming platform (for distribution rights), and the animation studio itself. Each member of the committee has invested money and expects a return; each has a stake in what the finished product looks like.

The committee system emerged from the financial disasters of the 1990s anime bubble, when individual companies funding entire productions bore the full cost of failures. By distributing both investment and risk across multiple partners, the system made anime production more financially stable and increased the number of series that could be produced annually. It also introduced structural incentives that have shaped the creative content of anime in ways that are not always acknowledged.

When a production committee includes a toy manufacturer, the manufacturer has a financial interest in designs that can be easily merchandised. When the committee includes a streaming platform, the platform has a financial interest in episodes that end with hooks that encourage continued viewing. When the committee includes the publisher of a source manga, the publisher has a financial interest in an adaptation that serves as advertising for the original rather than a standalone work. None of these interests is unreasonable in isolation; collectively, they create a set of constraints that have pushed anime storytelling toward the conventional.

The system's effect on creative risk is most visible in the category of original anime — series produced without pre-existing source material, in which a creative team is working from a genuinely new concept. Original anime is proportionally rare, and when it appears — "Puella Magi Madoka Magica," "Gurren Lagann," "Promare," "Odd Taxi" — it tends to come from situations where the usual committee dynamics have been disrupted, either by a director with sufficient prestige to demand creative control or by a production structure that insulates the creative team from financial pressure.

The committee system is not going away — its financial logic remains compelling — but the rise of streaming platforms as direct commissioners of anime content has introduced an alternative financing model. When Netflix or Amazon directly commissions a series, they function effectively as a single committee member with majority control, which can actually increase creative freedom by reducing the number of stakeholders whose interests must be accommodated. The tradeoff is a different form of constraint: the platform's preferences for content that performs well in international markets shapes production in its own ways.`,
    tags: ['anime industry', 'production committee', 'anime business', 'anime financing', 'anime production'],
    entities: ['Japan', 'Netflix'],
    publishedAt: new Date('2026-06-02'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/anime-production-committee-financing-bold-storytelling',
  },
  {
    title: 'The Seiyuu Industry: How Japanese Voice Actors Became Celebrities With Concerts and Fan Clubs',
    slug: 'seiyuu-industry-voice-actors-became-celebrities',
    category: 'industry',
    excerpt: 'In Japan, the voice actors who bring anime characters to life are celebrities in their own right — with solo music careers, touring concerts, and dedicated fan bases. Here\'s how this uniquely Japanese phenomenon developed.',
    content: `In most countries, voice acting is a craft practiced by skilled professionals who remain largely unknown to the audience whose favorite characters they voice. In Japan, the relationship between anime voice actors — seiyuu — and their audience is fundamentally different. Major seiyuu have management agencies, release music singles, perform at concerts, and command fan bases whose devotion is comparable to that given to pop stars. The voice behind a beloved character is, in Japan, a public figure in their own right.

The phenomenon has roots in the 1970s and 1980s, when voice actors began appearing at fan events and being identified by name in anime credits. As anime fandom deepened and became more self-conscious — as fans began to discuss production in detail and to care about the craft behind what they watched — the voices became as important as any other element. Fan magazines began profiling seiyuu; mail-in surveys asked viewers to rank their favorite voice performances.

The decisive shift came in the 1990s, when certain seiyuu began releasing music — first character songs (songs performed in character), then solo albums as themselves. The music careers were enabled by the same infrastructure that supported idol pop: management agencies, record labels, television appearances, concert venues. Seiyuu like Megumi Hayashibara, who voiced Rei Ayanami in Evangelion and dozens of other iconic characters, demonstrated that the same passion an anime audience had for a character could be redirected toward the person voicing them.

Today, the seiyuu industry is substantial and highly competitive. Voice acting schools in Japan graduate thousands of students annually, competing for positions in a market where the top performers earn celebrity-level salaries and the majority earn at or near minimum wage. The audition culture is intense; a single major role can transform a career. Agencies manage the careers of their seiyuu not merely as voice performers but as multimedia entertainers — voice work, music, events, merchandise, and social media presence are all part of the package.

The "live voice" events that have become a significant part of the industry — concerts at which seiyuu perform the songs from series they work on, sometimes in costume, with anime footage playing behind them — are a distinctly Japanese cultural form with no real Western equivalent. Tens of thousands of fans pay concert prices to hear the voice behind their favorite character sing in a stadium. The transaction is unusual only if you forget that in Japan, a voice is not merely a production element but a presence — a person whose craft has given life to something the audience loves, and who deserves to be loved for it.`,
    tags: ['seiyuu', 'voice acting', 'anime industry', 'Japanese culture', 'anime music', 'Megumi Hayashibara'],
    entities: ['Megumi Hayashibara', 'Japan'],
    publishedAt: new Date('2026-06-03'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/seiyuu-industry-voice-actors-became-celebrities',
  },
  {
    title: 'Toonami: How Cartoon Network\'s Late-Night Block Built the American Anime Audience',
    slug: 'toonami-how-cartoon-network-built-american-anime-audience',
    category: 'industry',
    excerpt: 'Between 1997 and 2008, Toonami aired Dragon Ball Z, Gundam Wing, Cowboy Bebop, Naruto, and dozens of other series to American children who had no other access to anime. The generation it raised became the American anime market.',
    content: `On March 17, 1997, Cartoon Network launched a programming block called Toonami — two hours of action cartoons in the afternoon, hosted by an animated robot called TOM. The initial lineup was largely American animation: "Thundercats," "Jonny Quest." Within months, the block had added its first anime: "Dragon Ball Z," which had been airing in syndication with limited success. Under Toonami's consistent scheduling and its distinctive late-night atmosphere, "Dragon Ball Z" found an audience it had never been able to reach before.

The key insight behind Toonami's success was curatorial: the block was not simply a delivery mechanism for content but a brand with a coherent aesthetic identity. The programming, the music, the hosting segments with TOM, the bumpers and transitions — all communicated to viewers that they were in a specific place, with a specific sensibility, that existed nowhere else on television. The atmosphere was cool, slightly melancholy, and explicitly aimed at older children and teenagers who found most children's television condescending.

Within that curatorial space, Cartoon Network brought a succession of anime series that American children would otherwise have been unable to see. "Gundam Wing" introduced the mecha genre. "Rurouni Kenshin" brought samurai drama. "Outlaw Star" and then "Cowboy Bebop" — the latter airing initially in the now-legendary Adult Swim time slot, beginning at midnight — demonstrated that anime could achieve the same atmospheric sophistication as prestige live-action television. When "Naruto" joined the lineup in 2005, the block was introducing a generation of viewers to a series that would define anime's mainstream identity for the next decade.

The generation that grew up watching Toonami is now the core of the American anime market. The subscription Crunchyroll audience, the convention attendees, the manga buyers in American bookstores — a significant portion of them can trace their initial exposure to anime to Toonami's programming. The block made anime visible at a time when visibility was the barrier: kids who saw "Dragon Ball Z" on Saturday afternoon discovered a mode of storytelling that American animation of the period was not offering, and they followed it wherever it led.

Toonami was cancelled in 2008 and revived in 2012 as a late-night Adult Swim block, where it continues. The revival audience — older, more knowledgeable, largely the same people who watched the original block as children — is smaller than the Saturday-afternoon peak, but the cultural work of the original block has already been accomplished. The American anime audience exists, in significant part, because Toonami decided to fill two hours of afternoon programming with Japanese animation and did it well enough that an entire generation noticed.`,
    tags: ['Toonami', 'Cartoon Network', 'American anime', 'Dragon Ball Z', 'Cowboy Bebop', 'anime history', 'Adult Swim'],
    entities: ['Cartoon Network', 'Adult Swim'],
    publishedAt: new Date('2026-06-03'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/toonami-how-cartoon-network-built-american-anime-audience',
  },
  {
    title: 'France\'s Obsession With Manga: Why Europe\'s Biggest Manga Market Isn\'t Where You\'d Expect',
    slug: 'france-obsession-with-manga-europes-biggest-market',
    category: 'industry',
    excerpt: 'France is Japan\'s second-largest manga market in the world, ahead of the United States. Per capita, the French read more manga than any other non-Asian country. Here\'s how that happened.',
    content: `France is, by most measurements, Japan's second-largest manga market in the world — behind only Japan itself and ahead of the United States. In per capita terms, the French read more manga than any other non-Asian nation. French manga sales regularly exceed 50 million volumes per year, representing a meaningful fraction of total French book sales in all categories. This concentration of enthusiasm in a country most people would not immediately associate with Japanese comics is neither accidental nor recently developed. It is the result of a specific cultural history stretching back to the 1970s.

The foundation was French television's early embrace of Japanese animation. In the late 1970s and 1980s, French broadcasters acquired large quantities of Japanese animated content because it was dramatically cheaper than producing equivalent entertainment domestically. Children's programming blocks on French television featured "Goldorak" (the French title for "UFO Robot Grendizer"), "Candy Candy," "Captain Future," and dozens of other Japanese series at a time when most other European countries were receiving far less Japanese animation. French children of the generation born between 1965 and 1975 grew up with Japanese animation as a central part of their media environment.

That generation grew up. Their children inherited the aesthetic. And France has a specific cultural context that made the transition from Japanese animation to manga feel natural: the Franco-Belgian bande dessinée tradition — the serious graphic novel tradition that produced "Tintin," "Asterix," and "The Adventures of Blake & Mortimer" — had already established the idea that sequential art could be a legitimate medium for adult readers. When manga arrived in France, it did not need to overcome the prejudice that comics were for children; bande dessinée had already done that work. Manga arrived in a country culturally prepared to take it seriously.

French publishers have been aggressive and sophisticated in their licensing of manga. Glénat, Kazé, Kana, and Pika between them hold rights to enormous portions of the manga catalog, and they have invested in translation quality and physical production values that treat manga as premium publishing rather than disposable entertainment. French manga editions are frequently of higher quality than their American equivalents — better paper, better binding, better translation budgets.

The infrastructure of French manga fandom has grown to match the market. Japan Expo, the annual convention held outside Paris, regularly attracts over 250,000 visitors — one of the largest anime and manga conventions in the world. French manga critics and scholars have produced serious academic work on the medium. Several French illustrators have produced work in manga-influenced styles that circulates in Japan as well as France, creating a creative exchange that runs in both directions. The relationship between France and Japanese popular culture is, at this point, genuinely bilateral.`,
    tags: ['France', 'manga market', 'European anime', 'manga history', 'Japan Expo', 'bande dessinée'],
    entities: ['France', 'Japan', 'Japan Expo'],
    publishedAt: new Date('2026-06-03'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/france-obsession-with-manga-europes-biggest-market',
  },
  {
    title: 'The Visual Novel Pipeline: How Clannad, Fate, and Steins;Gate Crossed From PC Games to Anime',
    slug: 'visual-novel-pipeline-clannad-fate-steins-gate',
    category: 'industry',
    excerpt: 'Visual novels — story-driven PC games with branching narratives — have produced some of anime\'s most beloved series. The pipeline from doujin game to global franchise is a uniquely Japanese creative path.',
    content: `A visual novel is, at its most basic, a story told through static images and text, with occasional choices that branch the narrative. The form emerged from the PC game market in Japan in the 1980s and was refined through the 1990s, producing a genre that occupies uncertain territory between game and literature. The player does not control action sequences; they read, make choices at decision points, and experience different narrative paths on different playthroughs. The genre's relationship to anime is unusually direct: several of the most beloved anime series of the past twenty years began as visual novels.

"Fate/stay night," developed by Type-Moon and first released in 2004, follows a teenager who is accidentally enrolled in a secret magical tournament in which participants summon historical heroes as supernatural servants. The visual novel's branching structure allowed it to develop three distinct narrative routes — Fate, Unlimited Blade Works, and Heaven's Feel — each emphasizing different characters and philosophical concerns. The game became a phenomenon in Japanese niche gaming culture before a 2006 anime adaptation by Studio Deen brought it to a mainstream audience. The franchise has since expanded to include multiple series, films, spin-offs, and a massively successful mobile game, Fate/Grand Order, that reportedly earns hundreds of millions of dollars annually.

"Clannad," produced by Key in 2004, is a visual novel about a delinquent student who befriends a series of girls, each with their own story of loss or difficulty, and gradually learns what family and responsibility mean. Its emotional ambition is extraordinary for a game format — several routes end in grief of unusual intensity — and its anime adaptation by Kyoto Animation (2007–2009) is still considered among the finest dramatic anime ever produced. Key, the studio behind "Clannad," also produced "Kanon," "AIR," "Little Busters," and "Angel Beats," establishing a recognizable voice in emotional drama that the anime adaptations of those works carried to audiences who never played the originals.

"Steins;Gate," developed by 5pb. and Nitroplus in 2009, follows a self-proclaimed mad scientist who accidentally invents a method of sending messages back in time, with progressively catastrophic consequences. It is a science fiction thriller of unusual structural sophistication — the visual novel format's branching pathways are used to create genuine time-loop mechanics that the reader experiences rather than merely reads about. The 2011 anime adaptation compressed the narrative in ways that served the thriller structure while preserving its emotional core; it is now regularly cited as one of the best science fiction anime ever made.

The visual novel to anime pipeline works because visual novels, by their nature, produce extensive narrative material — dozens of hours of story, multiple character routes, elaborately developed worlds — that anime can draw on. The challenge is compression: a 50-hour visual novel route must become 12 anime episodes. The studios that have done this successfully — Kyoto Animation with Key's works, ufotable with Fate — have understood that adaptation requires selection rather than reduction: choosing which moments to preserve in full rather than summarizing everything and capturing nothing.`,
    tags: ['visual novels', 'Fate', 'Clannad', 'Steins;Gate', 'Key', 'Type-Moon', 'anime adaptations'],
    entities: ['Type-Moon', 'Key', 'Kyoto Animation', 'ufotable'],
    publishedAt: new Date('2026-06-03'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/visual-novel-pipeline-clannad-fate-steins-gate',
  },
  {
    title: 'Scanlation: The History of Manga Piracy and What the Industry Learned From It',
    slug: 'scanlation-manga-piracy-what-industry-learned',
    category: 'industry',
    excerpt: 'For decades, volunteer groups scanned, translated, and distributed manga online for free, reaching audiences that publishers couldn\'t. Here\'s the complicated legacy they left — and how the industry eventually adapted.',
    content: `Before legal digital manga was available in English, the only way to read the majority of manga that was actively being published in Japan was through scanlations — digitally scanned pages translated by fan volunteers and distributed freely online. The practice was unambiguously illegal, unambiguously widespread, and historically complicated in ways that straightforward moral condemnation does not capture.

The scanlation ecosystem worked through a division of volunteer labor: one person with access to the physical Japanese magazine or volume scanned the pages; a translator produced English text; a cleaner removed the original Japanese text from the artwork; a typesetter placed the English translation into the emptied speech bubbles and text boxes. Teams operated under group names, maintained websites and IRC channels, and in some cases developed significant reputations for translation quality or speed. The community had its own norms: scanlation groups generally stopped distributing a series when an English-language publisher licensed it, observing the same ethic that fansubbers applied to anime.

The impact on the English-language manga market was contradictory. Scanlations undoubtedly displaced some sales — readers who could access the latest chapter of "Bleach" for free had one fewer reason to buy the volume when it appeared months or years later in an English-language edition. Scanlations also unambiguously expanded the market: series that had no English-language publisher attracted online audiences through scanlations that demonstrated commercial viability. Several series found English-language publishers specifically because scanlation data proved that an audience existed. The economics of piracy in this context were, as in anime, ambiguous.

The industry's adaptation came in waves. Publishers first attempted legal action, sending takedown notices to websites hosting scanlations with limited effect. Then the industry attempted speed: if official translations could appear quickly enough to make the scanlation redundant, some readers would prefer the legal version. ComiXology and later the Shonen Jump app — which offered current chapters at low monthly prices, often on the same day as Japanese publication — demonstrated that many readers who had been accessing scanlations would pay for a legal product that matched the scanlation's primary advantage: immediacy.

The major illegal manga sites — MangaDex, Mangakakalot, and their predecessors — still exist and still attract enormous traffic. The legal manga market has grown significantly around them, suggesting that legal and illegal consumption coexist rather than directly displace each other. The lesson the industry eventually absorbed — that making legal options fast, cheap, and high-quality reduces piracy more effectively than enforcement — is the same lesson the music and film industries learned from their own confrontations with digital distribution. It was learned slowly, and at cost, but it was learned.`,
    tags: ['scanlation', 'manga piracy', 'manga industry', 'digital manga', 'manga online', 'manga business'],
    entities: ['Japan', 'Viz Media', 'ComiXology'],
    publishedAt: new Date('2026-06-03'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/scanlation-manga-piracy-what-industry-learned',
  },
];

async function main() {
  console.log(`Seeding ${ESSAYS.length} essays (batch 2)...`);
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
