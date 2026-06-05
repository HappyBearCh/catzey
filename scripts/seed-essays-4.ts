/**
 * Fourth batch of editorial essays.
 * Run with: npx tsx scripts/seed-essays-4.ts
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ESSAYS = [
  // ── CREATORS ─────────────────────────────────────────────────────────────────
  {
    title: 'Satoshi Kon: The Director Who Died Too Young and Left the Most Influential Body of Work in Anime Film',
    slug: 'satoshi-kon-director-died-too-young',
    category: 'creators',
    excerpt: 'Satoshi Kon made four feature films and one television series before dying of pancreatic cancer at 46. Each work examined the boundary between reality and imagination with a sophistication that no other anime filmmaker has matched.',
    content: `Satoshi Kon was diagnosed with pancreatic cancer in May 2010 and died in August of the same year. He was 46. At the time of his death he was in production on "The Dream Machine," a film he would not complete. He had made four theatrical films — "Perfect Blue" (1997), "Millennium Actress" (2001), "Tokyo Godfathers" (2003), and "Paprika" (2006) — and one television series, "Paranoia Agent" (2004). The catalog is small and it is among the most significant in the history of animated film.

What connects the four films is a sustained investigation of how the mind constructs reality from incomplete, distorted, or fabricated materials. "Perfect Blue" follows a pop idol who transitions to acting and begins experiencing a breakdown in which she can no longer distinguish her real life from the roles she performs and the fantasies projected onto her by fans. "Millennium Actress" is structured as an interview with a retired actress whose memories of her career and her life become indistinguishable from the films she made — the documentary crew literally enters her memories as she narrates them. "Paprika" concerns a device that allows therapists to enter patients' dreams, which begins bleeding into waking reality with catastrophic results. In each film, the interior life — imagination, memory, fantasy, delusion — has the same ontological weight as the exterior world, and the drama arises from the collision between them.

The influence of Kon's work on Western film is specific and acknowledged. Christopher Nolan has cited "Paprika" as a direct influence on "Inception" — the sequence in which a parade invades a city street has an almost direct equivalent in Nolan's film. Darren Aronofsky purchased the rights to "Perfect Blue" to reproduce a single shot in "Requiem for a Dream" and reportedly used it again in "Black Swan." These are not cases of vague aesthetic inspiration; they are specific technical and structural debts from major filmmakers to work that most of their audiences have not seen.

His animation direction style was equally distinctive. Kon used editing rhythms derived from live-action film rather than the slower pacing typical of anime — cuts that are motivated by psychological rather than narrative logic, transitions that cross temporal and spatial boundaries in ways that initially disorient before resolving into meaning. He worked with a level of trust in the audience's ability to reconstruct coherence from apparent chaos that few filmmakers, animated or otherwise, sustain. The experience of watching "Perfect Blue" or "Millennium Actress" for the first time involves a sustained uncertainty about what is happening that is not confusion but something closer to the state of dreaming — present and following the logic of the sequence without being sure of its relationship to stable reality.

His final published document was a letter posted on his website after his diagnosis — a brief, graceful farewell addressed to friends, family, and people who had watched his films, expressing gratitude and noting that he had left "The Dream Machine" in enough of a state that others might complete it. The letter was received as a piece of writing as well as a farewell; it was clear, warm, precise, and without self-pity. It is the document of a person who made beautiful things and knew it and was grateful for the opportunity.`,
    tags: ['Satoshi Kon', 'Perfect Blue', 'Paprika', 'Millennium Actress', 'anime film', 'anime directors'],
    entities: ['Satoshi Kon', 'Christopher Nolan', 'Darren Aronofsky'],
    publishedAt: new Date('2026-03-01'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/satoshi-kon-director-died-too-young',
  },
  {
    title: 'Isao Takahata: The Ghibli Co-Founder Who Made the Saddest Film in Animation History',
    slug: 'isao-takahata-ghibli-grave-of-the-fireflies',
    category: 'creators',
    excerpt: 'Isao Takahata co-founded Studio Ghibli with Miyazaki but pursued a completely different artistic vision. His Grave of the Fireflies is the most emotionally devastating animated film ever made. His other films are among the most formally inventive.',
    content: `Isao Takahata and Hayao Miyazaki met as young animators at Toei Animation in the 1960s and remained creative partners for over fifty years. They co-founded Studio Ghibli in 1985, and their partnership was the studio's creative foundation. But where Miyazaki's films are defined by a consistent aesthetic — painterly landscapes, female protagonists, flight, environmental concern — Takahata's filmography is defined by formal restlessness: each of his major works uses a different visual approach, a different narrative structure, and a different emotional register. The only thing they share is an ambition to use animation as something more than entertainment.

"Grave of the Fireflies" (1988), released on a double bill with Miyazaki's "My Neighbor Totoro," is the film that established Takahata's international reputation and has defined it ever since. Based on a semi-autobiographical novel by Akiyuki Nosaka about the deaths of his sister and himself from malnutrition in the final months of World War II, the film is structured around the knowledge of its own ending — the first shot reveals that the protagonist is already dead — and proceeds to show, with absolute precision and without sentimentality, how two children died. It is the most emotionally devastating animated film ever made; it is not a film that is easy to revisit; and it is genuinely great in ways that easy films cannot be.

The films that followed demonstrated Takahata's range. "Only Yesterday" (1991) is a slice of life film about a woman in her late twenties revisiting her childhood memories while staying in rural Japan — the first non-fantasy Ghibli film, and one whose formal restraint is so complete that it initially seems to have no subject. What it has, revealed gradually, is one of the most precise portraits of ordinary adult melancholy in cinema. "Pom Poko" (1994) is a political satire about tanuki using their supernatural shapeshifting abilities to resist suburban development of their forest — comic and tragic simultaneously, and stranger than any description of it sounds. "My Neighbors the Yamadas" (1999) is a deliberately flat-looking domestic comedy adapted from a newspaper comic strip, using a visual simplicity that looks like the opposite of effort and requires extraordinary skill.

"The Tale of Princess Kaguya" (2013), his final film, took fourteen years to produce and used a deliberately rough, ink-wash aesthetic derived from Heian-era Japanese illustration — a visual approach so far from the "Ghibli style" that many viewers initially found it hard to see past the strangeness. What it contains is a story of unusual emotional complexity about what is lost when someone is fitted to a life not suited to them — and a visual language capable of expressing states of feeling that clean, polished animation cannot reach. The final sequence is among the most beautiful in animated film.

Takahata died in April 2018, at 82. He received less global recognition than Miyazaki during his lifetime — his films were considered more demanding, less accessible, less immediately pleasurable — and the asymmetry was consistently noted by people who knew both men's work well. He made fewer films and made them more slowly, and each was a formal experiment rather than a genre fulfillment. The result is a body of work that rewards attention in proportion to the attention given, which is the mark of seriousness.`,
    tags: ['Isao Takahata', 'Studio Ghibli', 'Grave of the Fireflies', 'anime film', 'anime directors', 'Princess Kaguya'],
    entities: ['Isao Takahata', 'Hayao Miyazaki', 'Studio Ghibli'],
    publishedAt: new Date('2026-03-03'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/isao-takahata-ghibli-grave-of-the-fireflies',
  },
  {
    title: 'Gen Urobuchi: The Writer Who Made Darkness Feel Inevitable',
    slug: 'gen-urobuchi-writer-who-made-darkness-inevitable',
    category: 'creators',
    excerpt: 'Gen Urobuchi earned the nickname "Urobutcher" for his habit of killing beloved characters and denying happy endings. But his real achievement is making those outcomes feel like the only honest conclusion to the stories he tells.',
    content: `Gen Urobuchi did not start his career in anime. He began as a scenario writer for visual novels at Nitroplus, the adult game company whose titles include "Chaos;Head" and "Saya no Uta" — the latter a horror visual novel of such psychological intensity that it remains difficult to discuss without content warnings. When Urobuchi transitioned to anime writing, he brought with him a thematic preoccupation that his visual novel work had established: an interest in the point at which idealism confronts reality, and in what happens to people when that confrontation goes badly.

The series that made his reputation outside the visual novel community was "Puella Magi Madoka Magica" (2011), which he wrote for Shaft and director Akiyuki Shinbo. The series was marketed as a cute magical girl show — the character designs by Ume Aoki, responsible for the warm aesthetics of "Hidamari Sketch," reinforced the expectation. What the series delivered was a systematic deconstruction of every comfort the magical girl genre had previously offered, executed with such rigor and emotional honesty that it shocked viewers who had expected something harmless. The internet response to the third episode — which killed a beloved character with no warning and no redemption — is one of the most documented moments of collective audience shock in recent anime history.

"Fate/Zero" (2011–2012), adapting Gen Urobuchi's own light novel prequel to "Fate/stay night," demonstrated his range. Where "Madoka" was about the betrayal of innocence, "Fate/Zero" was about the failure of idealism — about men and women who sacrifice everything for principles they believe in and discover, at the end, that principles are insufficient armor against the specific costs of specific choices. The characterization of Kiritsugu Emiya, a man who has spent his life committing smaller evils in service of a greater good and who is destroyed when confronted with the full accounting of that exchange, is among the most morally serious protagonists in recent anime.

"Psycho-Pass" (2012), which he co-wrote with Makoto Fukami, applied the same thematic concerns to a science fiction procedural: a future in which an algorithmic system predicts criminal intent before any crime is committed, and the people who enforce that system begin to question whether a world without crime is worth the cost of preventing it. The series draws explicitly on Philip K. Dick and on Western dystopian fiction, but uses those influences to ask questions specific to contemporary Japanese anxieties about social conformity, surveillance, and the relationship between individual conscience and institutional authority.

The nickname "Urobutcher" — adopted ironically by Urobuchi himself — reflects a misunderstanding that his work consistently invites and then corrects. He does not kill characters because he is indifferent to them; he kills characters because he is serious about the stakes he has established. A story that announces serious consequences and then avoids them when the characters readers love are in jeopardy is a story that lied. Urobuchi prefers the truth, and the emotional cost of the truth is the point.`,
    tags: ['Gen Urobuchi', 'Madoka Magica', 'Fate/Zero', 'Psycho-Pass', 'anime writing', 'dark anime'],
    entities: ['Gen Urobuchi', 'Nitroplus', 'Shaft'],
    publishedAt: new Date('2026-03-05'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/gen-urobuchi-writer-who-made-darkness-inevitable',
  },
  {
    title: 'Tatsuki Fujimoto: The Most Unconventional Voice in Contemporary Manga',
    slug: 'tatsuki-fujimoto-most-unconventional-voice-contemporary-manga',
    category: 'creators',
    excerpt: 'Tatsuki Fujimoto draws like no one else working in manga today. His series Chainsaw Man broke shonen conventions without explaining why. His one-shot Look Back may be the best manga published in the 2020s. He\'s 28 years old.',
    content: `Tatsuki Fujimoto published his first serialized manga, "Fire Punch," in 2016. He was 23 years old, and the series — about a man with regenerative abilities who is set on fire and cannot die — was immediately strange in ways that defied the expectations of its publication platform, Shonen Jump+. The violence was extreme, the tonal shifts between brutal action and absurdist comedy were jarring, the narrative logic was deliberately unstable. It was the work of a young artist with complete commitment to his own vision and insufficient control over his materials, and it was compelling in proportion to both qualities.

"Chainsaw Man," which launched in Weekly Shonen Jump in 2019, represented Fujimoto working with more technical control while losing none of the strangeness. The series follows Denji, a teenager who merges with a chainsaw devil and becomes a devil hunter — a premise that sounds like dozens of other action manga, filtered through a sensibility that produces something unlike any of them. Fujimoto's action choreography is kinetic and spatially coherent in ways that most manga artists' is not; his humor is genuinely funny rather than obligatory; his emotional beats arrive at unexpected moments and are not preceded by the telegraphing that shonen convention normally provides. The series does not announce that a character is about to matter to the reader; it simply makes them matter, and the reader discovers this when the character is suddenly gone.

What generates the most critical discussion around Fujimoto is his relationship to genre convention. "Chainsaw Man" deploys the standard elements of shonen manga — power system, tournament-adjacent structure, mentor figure, rival — in ways that consistently undercut the emotional payoffs those elements normally provide. Characters who follow the heroic narrative logic of shonen manga die anyway. Emotional investments the series appears to be building toward are redirected, undermined, or simply dropped. Whether this is sophisticated deconstruction or deliberate frustration of the reader is a question that readers debate earnestly, and Fujimoto's refusal to clarify his intentions in interviews has not resolved it.

His 2021 one-shot "Look Back" is, by the estimate of many readers, the finest single manga work published in the 2020s. Published in a single Shonen Jump+ release, approximately sixty pages long, it tells the story of two girls connected by their love of drawing — one confident, one reclusive — across several years of their lives. The one-shot form suits Fujimoto's strengths: the compressed timeline, the lack of space for anything unnecessary, the emotional precision required to make a short work land with the weight of a novel. "Look Back" lands with the weight of something considerably longer, and it does it without any of the structural elaboration that longer works use to build the same effect.

He is, as of this writing, in his late twenties and actively serializing the second part of "Chainsaw Man" alongside other projects. The trajectory of his career — from the controlled chaos of "Fire Punch" to the technical sophistication of "Chainsaw Man" to the emotional exactitude of "Look Back" — suggests a creator who is developing faster than the publication schedule can contain. What he will produce when he has been working for twenty years rather than eight is a question the manga industry is watching with something between curiosity and anticipation.`,
    tags: ['Tatsuki Fujimoto', 'Chainsaw Man', 'Look Back', 'Fire Punch', 'manga creators', 'Weekly Shonen Jump'],
    entities: ['Tatsuki Fujimoto', 'Weekly Shonen Jump'],
    publishedAt: new Date('2026-03-07'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/tatsuki-fujimoto-most-unconventional-voice-contemporary-manga',
  },
  {
    title: 'ONE: The Anonymous Creator Who Draws Badly and Writes Better Than Almost Anyone',
    slug: 'one-anonymous-creator-draws-badly-writes-brilliantly',
    category: 'creators',
    excerpt: 'The creator known only as ONE draws stick figures and uses minimal backgrounds. His two manga series — One Punch Man and Mob Psycho 100 — are among the most thematically rich in contemporary manga. The gap between the art and the writing is the whole point.',
    content: `The person known as ONE publishes manga under a single-character pen name and has never revealed their real identity. Their online presence is minimal. Their first major work, "One Punch Man," was self-published as a webcomic in 2009 on a personal website, drawn with what could be charitably described as rudimentary skill — character designs that are rough to the point of caricature, backgrounds that are frequently absent, action sequences rendered in a way that makes the choreography difficult to follow. The webcomic attracted a readership that grew, organically and through word of mouth, to hundreds of thousands of readers before anyone in professional manga publishing paid serious attention.

The premise of "One Punch Man" operates as both gag and thesis: a hero named Saitama has trained so hard that he has become completely invincible, capable of defeating any enemy with a single punch. The comedy arises from this invincibility — every fight ends immediately, Saitama experiences no tension or excitement, and his existential crisis is that he has achieved his goal and found it empty. The thesis beneath the comedy is a serious one: the story of a person who gets everything they wanted and discovers that wanting it was more meaningful than having it, and who cannot find his way back to the feelings that made the pursuit matter.

ONE's second series, "Mob Psycho 100," published from 2012 and drawn with the same rough aesthetic as "One Punch Man," is the more fully realized work. Its protagonist Shigeo Kageyama ("Mob") is a middle school student with psychic powers so vast they are a genuine danger, who has been taught by his con-artist mentor to suppress his abilities because he has been told, correctly, that relying on power prevents personal development. The series uses its supernatural premise as sustained metaphor for adolescent emotional repression — Mob's psychic powers peak when his suppressed emotions overflow, and the series tracks his development as a person in parallel with his development as a psychic. The emotional intelligence of this structure, the precision with which ONE depicts what it feels like to be a teenager who has learned that expressing emotion is dangerous, is of a quality that most manga writers working with professionally polished artwork do not reach.

The professional manga adaptations of both series — "One Punch Man" illustrated by Yusuke Murata, "Mob Psycho 100" adapted as anime by Studio Bones — have brought the stories to audiences that ONE's original rough art might have deterred. Murata's redrawing of "One Punch Man" is extraordinary as a visual object; the gap between ONE's original pages and Murata's adaptations represents the full range of manga craft, from functional to masterful. But readers who return to ONE's original webcomic consistently report that the rough art serves the story — that the deliberate imprecision creates a tonal flatness that makes the moments of genuine feeling land harder than polished illustration would allow. The art is not a limitation that the professional adaptations overcome; it is a choice whose logic the adaptations lose.

ONE occupies a position in contemporary manga that has no real precedent: a creator whose art is technically inferior to almost every professional working in the medium, whose storytelling is superior to most of them, and who has demonstrated through two separate series that the gap is not accidental but constitutive of how the work functions. The conventional wisdom about manga — that visual craft and narrative craft develop together, that you cannot build one without the other — ONE refutes by existing.`,
    tags: ['ONE', 'One Punch Man', 'Mob Psycho 100', 'manga creators', 'webcomic', 'Yusuke Murata'],
    entities: ['ONE', 'Yusuke Murata', 'Studio Bones'],
    publishedAt: new Date('2026-03-09'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/one-anonymous-creator-draws-badly-writes-brilliantly',
  },
  {
    title: 'Masashi Kishimoto: What Naruto Got Right, What It Got Wrong, and What It Cost Him',
    slug: 'masashi-kishimoto-naruto-what-it-cost-him',
    category: 'creators',
    excerpt: 'Masashi Kishimoto spent 15 years drawing Naruto and missed most of his son\'s childhood doing it. The series has sold 250 million copies. Here\'s a clear-eyed assessment of what Kishimoto achieved and where his ambition outran his execution.',
    content: `Masashi Kishimoto was born in Okayama Prefecture in 1974 and developed an interest in manga partly through watching Akira Toriyama's "Dragon Ball" — an influence he has acknowledged directly and which is visible in "Naruto"'s early story structure and its philosophy of protagonist development through combat. He submitted a one-shot story called "Karakuri" to Shonen Jump's contest in 1995, won a prize, and spent the next several years developing what would become "Naruto" before its serialization began in September 1999. The series ran until November 2014 — fifteen years, 700 chapters, and approximately 250 million collected volumes sold worldwide.

The emotional core of "Naruto" — a child rejected by his community who refuses to let that rejection define him and who ultimately earns acceptance without compromising his own values — is its most durable achievement. The series communicates this theme with a clarity and consistency that has made it genuinely meaningful to readers across cultures who recognize the specific pain of being excluded and the specific aspiration of belonging without changing yourself to be acceptable. Kishimoto understood this emotional terrain with an intimacy that produced some of the most affecting individual moments in shonen manga.

The structural weaknesses are also real and have been analyzed extensively by readers. The series' second half — from the introduction of the Akatsuki organization as the primary antagonist through the "Fourth Great Ninja War" climax — is widely considered less successful than the first. The power scaling escalated beyond the world's established rules; characters who had been defined by their specific skills became interchangeable in battles involving world-ending forces; the philosophical questions the series had raised — about cycles of hatred, the nature of vengeance, whether peace is achievable — were answered with solutions that resolved the narrative without fully engaging the problems. The ending is not a betrayal, but it is a simplification.

Kishimoto has said in interviews that he was not present for significant portions of his son's early childhood because he was drawing "Naruto" — that the weekly production schedule consumed the time that parenting requires, and that he is aware of what that cost. This is not a confession of failure; he did what the schedule demanded, and millions of readers benefited. But it is a candid acknowledgment of what sustained manga serialization at the highest level asks of the people who do it. The fifteen years that produced "Naruto" were also fifteen years of Kishimoto's life that were organized entirely around meeting weekly deadlines.

His subsequent work — "Samurai 8: The Tale of Hachimaru" (2019–2020), a science fiction manga that was cancelled after five volumes — demonstrated that his strengths were not transferable to every premise and that the creative infrastructure of a 15-year-running series is not easily rebuilt from scratch. "Boruto: Naruto Next Generations," which he supervises and partially writes, continues the world he built without the emotional investment that defined his best work on the original. Whether he will find a third subject that generates that investment is an open question. The first two suggest he is capable of it.`,
    tags: ['Masashi Kishimoto', 'Naruto', 'manga history', 'Weekly Shonen Jump', 'shonen manga', 'manga creators'],
    entities: ['Masashi Kishimoto', 'Weekly Shonen Jump', 'Okayama'],
    publishedAt: new Date('2026-03-11'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/masashi-kishimoto-naruto-what-it-cost-him',
  },
  {
    title: 'Tite Kubo: Bleach, Fashion as Storytelling, and the Arc That Almost Ended Everything',
    slug: 'tite-kubo-bleach-fashion-and-the-arc-that-broke-it',
    category: 'creators',
    excerpt: 'Tite Kubo is one of the most visually distinctive artists in manga history. His character designs for Bleach influenced a generation of artists. The Thousand-Year Blood War arc nearly destroyed the series before it could end. Here\'s his career honestly assessed.',
    content: `Tite Kubo submitted his first professional manga work to Weekly Shonen Jump in the mid-1990s and received encouragement from an editor named Hisashi Sasaki, who worked with Kubo through a series of rejected proposals before "Bleach" — about a teenager who becomes a Soul Reaper, a supernatural warrior responsible for guiding the dead — launched in August 2001. The series ran for fifteen years and sold over 120 million volumes. Kubo's contribution to manga aesthetics during those fifteen years is genuine and has been widely absorbed: his character design philosophy, his use of fashion to communicate characterization, and his compositional sense influenced a generation of manga artists and designers who have cited him specifically.

The fashion element is the most consistently interesting aspect of Kubo's craft. Where most battle manga characters are dressed in functional uniforms that establish team affiliation and allow clear visual distinction during action sequences, Kubo's characters are dressed as if for editorial fashion shoots — elaborate, specific, often impractical outfits that communicate personality through fabric and silhouette. Antagonists are dressed particularly well: the Espada in "Bleach"'s Hueco Mundo arc wear variations on white that are simultaneously uniform and individually tailored, each outfit saying something specific about its wearer's aesthetics and self-presentation. Kubo has described treating character design as a form of casting — choosing what each person wears as the first act of defining who they are.

The Soul Society arc — roughly chapters 71 through 182, published between 2002 and 2004 — is the peak of "Bleach"'s achievement. It is a sustained thriller set in the afterlife's bureaucratic infrastructure, using the framework of a rescue mission to reveal a political conspiracy of considerable complexity, and it delivers its revelations with a control and timing that place it among the finest arcs in shonen manga history. The visual design of Soul Society, its social hierarchy, and the specific ways Kubo made each of its dozens of characters memorable are a demonstration of worldbuilding craft that most manga artists never approach.

The Thousand-Year Blood War arc, which began in 2012 and concluded the series in 2016, is where the goodwill the Soul Society arc generated came under severe strain. The narrative introduced enemies at a scale that required power escalations beyond the series' established rules; characters who had been central for hundreds of chapters were sidelined or killed without the narrative investment their importance warranted; explanations for previously established mysteries were provided late and sometimes inadequately. Whether these failures are attributable to Kubo's health (he has spoken about illness affecting the final arc's production) or to the inherent difficulty of concluding a series that had accumulated enormous complexity is unclear. What is clear is that the ending disappointed many readers who had followed the series from the beginning.

The 2022 anime adaptation of the Thousand-Year Blood War arc, produced by Studio Pierrot with a production budget and visual ambition that the original anime adaptation had not received, has provided some rehabilitation — the material that worked in the original arc is visually striking when realized properly, and the distance of years has given readers more tolerance for the material that did not. Kubo has continued working, though slowly, and his evident passion for design and visual storytelling has not diminished. What he produces next will determine whether his career is defined by the Soul Society arc's height or by the difficulty of its conclusion.`,
    tags: ['Tite Kubo', 'Bleach', 'manga history', 'Weekly Shonen Jump', 'manga fashion', 'Soul Society'],
    entities: ['Tite Kubo', 'Weekly Shonen Jump', 'Studio Pierrot'],
    publishedAt: new Date('2026-03-13'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/tite-kubo-bleach-fashion-and-the-arc-that-broke-it',
  },

  // ── SERIES ───────────────────────────────────────────────────────────────────
  {
    title: 'Puella Magi Madoka Magica: The Deconstruction That Redefined a Genre',
    slug: 'puella-magi-madoka-magica-deconstruction-redefined-genre',
    category: 'anime',
    excerpt: 'When Madoka Magica aired in January 2011, it looked like a cute magical girl show. By episode three, it had become something else entirely. Here\'s what it actually is and why it mattered.',
    content: `"Puella Magi Madoka Magica" began airing in January 2011, produced by Studio Shaft with direction by Akiyuki Shinbo and script by Gen Urobuchi. The promotional materials showed five girls in elaborate pastel costumes accompanied by a white creature of improbable cuteness. Viewers familiar with the magical girl genre knew what they were getting: a warm, slightly fantastical story about friendship and the responsibilities of power, aimed at a young female audience. The character designs by Ume Aoki reinforced every element of this expectation. The third episode aired on January 21, 2011, and killed a central character with sudden, graphic finality, and the show became something else.

What Urobuchi and Shinbo had constructed was not a subversion for its own sake — not simply a "dark magical girl show" in the way that various subsequent series have been marketed. They had built a systematic examination of what the magical girl premise actually requires if you follow its logic honestly. The genre's founding bargain — a creature offers a young girl powers in exchange for her service fighting evil — had always elided the question of why any benevolent entity would make such an offer to a child. "Madoka Magica" asked the question and answered it honestly: the offer is not made for the girl's benefit. Every element of the magical girl experience, examined without the genre's usual optimism, leads somewhere darker than the genre had previously gone.

The series' emotional power comes not from the darkness itself but from the specific characters it damages. Homura Akemi, whose story is revealed gradually across the series' twelve episodes, is one of the most fully realized protagonists in anime: a girl who has repeated the same events an unknown number of times, trying to save someone she loves, becoming harder and colder with each repetition, losing every quality that made her sympathetic in the process of protecting the person she is sympathetic on behalf of. The tragedy of Homura is not what happens to her but what she has chosen to become in the service of preventing something she cannot prevent.

The 2013 theatrical film "Puella Magi Madoka Magica: Rebellion" extended the story in a direction that divided the fandom as completely as any anime continuation has managed. Without detailing its content for those who have not seen it: the film takes the resolution of the television series — which is thematically satisfying in a specific way — and interrogates it from the perspective of a character whose interests the television ending did not serve. Some viewers consider "Rebellion" a betrayal of what the series had established; others consider it the series' most honest statement. The debate is ongoing and is itself a measure of how seriously the work is taken.

The influence of "Madoka Magica" on subsequent anime is substantial and visible. The "dark magical girl" subgenre it spawned includes works of genuine quality — "Yuki Yuna Is a Hero," "Magical Girl Site," "Raising Project" — as well as works that reproduce the surface darkness without the underlying logic. More broadly, Urobuchi's success with "Madoka" demonstrated that anime could systematically deconstruct genre conventions for a mass audience rather than just a niche one, and that the emotional investment viewers had in genre familiarity could be used to intensify rather than undercut genuine storytelling.`,
    tags: ['Madoka Magica', 'Gen Urobuchi', 'magical girl', 'Shaft', 'anime deconstruction', 'Homura Akemi'],
    entities: ['Gen Urobuchi', 'Akiyuki Shinbo', 'Shaft', 'Ume Aoki'],
    publishedAt: new Date('2026-03-15'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/puella-magi-madoka-magica-deconstruction-redefined-genre',
  },
  {
    title: 'Vinland Saga: From Viking Revenge Fantasy to the Most Mature Pacifist Manga in Print',
    slug: 'vinland-saga-viking-revenge-to-pacifist-manga',
    category: 'seinen',
    excerpt: 'Makoto Yukimura began Vinland Saga as a revenge story set among Viking warriors. Midway through, the protagonist renounces violence completely. The series became something richer for the contradiction, and it\'s still running.',
    content: `Makoto Yukimura published "Planetes," a hard science fiction manga about orbital debris collectors, between 1999 and 2004, establishing himself as a mangaka interested in the philosophical dimensions of labor and the costs of ambition. "Vinland Saga," which began in 2005 in Monthly Afternoon, operates in completely different territory — the Viking Age of the late 10th and early 11th centuries — but pursues similar questions about what a person's life is for and what it costs to live with integrity in conditions that punish integrity.

The series' first arc follows Thorfinn, the son of a legendary warrior, who joins the mercenary army of the man who killed his father in order to stay close enough to challenge him to a duel. The arc is structured as a revenge narrative with all the satisfactions of the genre — escalating violence, impressive combat, a clear emotional logic — and Yukimura executes it with considerable skill. Thorfinn is driven, capable, and sympathetic within the constraints of his obsession. Then the arc ends with his revenge denied in a way that destroys the organizing principle of his life, and he is left with nothing.

The second arc, set on a farm where Thorfinn has been enslaved, is one of the most radical structural choices in contemporary manga. A series that began as high-velocity Viking action becomes, for dozens of chapters, a story about agricultural labor, the social dynamics of slavery, and the slow psychological work of a person trying to become something different from what their circumstances made them. The violence that the first arc fetishized is now present mostly as memory — as the thing Thorfinn is trying to leave behind — and the story's pace adjusts accordingly. Many readers who came for the combat found the transition difficult. Those who stayed found something much harder to produce: a story about the moral work of becoming nonviolent, told without condescension and without false ease.

The series has continued across subsequent arcs in which Thorfinn pursues the founding of a settlement without slaves, without war, without the cycles of violence that have structured the world he inhabits. The ambition is enormous — he is trying to build something new in a historical world that the series depicts with documentary attention to its actual brutality — and Yukimura takes the costs seriously. People die who should not die. Projects fail. The world resists the vision. The series does not make pacifism look easy or redemption look clean; it makes it look like the hardest kind of work, which is probably the most honest thing a manga set in the Viking Age could say.

"Vinland Saga" is still being serialized, and its ending has not been written. What it has already accomplished is a sustained argument, delivered through genre fiction, that what a person chooses not to do can be as defining as what they choose to do — and that the choice not to use violence, in a world that respects nothing else, requires more courage than violence ever did.`,
    tags: ['Vinland Saga', 'Makoto Yukimura', 'seinen manga', 'Viking manga', 'pacifism manga', 'Kodansha'],
    entities: ['Makoto Yukimura'],
    publishedAt: new Date('2026-03-17'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/vinland-saga-viking-revenge-to-pacifist-manga',
  },
  {
    title: 'Nana: The Unfinished Josei Masterpiece and the Hiatus That Has Lasted 17 Years',
    slug: 'nana-unfinished-josei-masterpiece-17-year-hiatus',
    category: 'manga',
    excerpt: 'Ai Yazawa\'s Nana was one of the best-selling manga in Japan when it went on hiatus in 2009 due to Yazawa\'s serious illness. She has never returned. The story remains unfinished. The wait is now one of manga\'s most heartbreaking ongoing situations.',
    content: `Ai Yazawa began serializing "Nana" in Cookie magazine in May 2000. The series follows two young women, both named Nana, who meet on a train and become housemates in Tokyo — one pursuing a music career, one following a relationship. Over the next nine years, "Nana" became one of the best-selling josei manga in history, with over 50 million copies sold in Japan alone and substantial international readership that found in Yazawa's work a depiction of female friendship, romantic complexity, and adult aspiration with no equivalent in other manga of its period.

What distinguished "Nana" from its contemporaries was the emotional register it occupied. Where most manga romance is structured around the protagonist's journey toward a relationship — a goal that is achieved, or not achieved, in a clear narrative arc — "Nana" was interested in what relationships actually consist of: the maintenance, the compromise, the way people change around each other over years, the specific pain of loving someone who is also failing you. Nana Osaki, the punk musician, and Nana Komatsu, the romantic optimist, are not idealized characters; they are recognizable people making recognizable mistakes, and the series treats those mistakes with a seriousness and sympathy that made readers feel seen rather than entertained.

In December 2009, "Nana" went on hiatus. Yazawa had been hospitalized for serious illness — the nature of which was not disclosed in detail — and the serialization was suspended while she recovered. The suspension was presented as temporary, and readers waited. Then they waited more. Occasional updates confirmed that Yazawa was alive and, eventually, that her health had improved, but no publication date for new chapters was announced. As of 2026, the hiatus has lasted seventeen years. The story remains frozen at the same chapter where it stopped, with narrative threads deliberately unresolved and character arcs deliberately suspended.

The emotional situation of "Nana"'s readership is unusual. Unlike series that ended badly, or were cancelled, or concluded with disappointing finales, "Nana" simply stopped — mid-story, mid-development, with every reader knowing what the unresolved narrative threads are. The characters' lives are paused rather than over. This is different from the grief of a completed work; it is more like the strange suspended grief of an unfinished conversation, the relationship that simply stopped rather than ended. Readers who were in their teens when they first read "Nana" are now in their thirties, and the characters are frozen in their twenties.

Yazawa has occasionally communicated with readers through social media since the hiatus began, and the warmth and care she expresses for the work and its audience is palpable. There is no indication that she is indifferent to the situation or that she has abandoned the story. There is also no timeline for return. For seventeen years, the answer to "will Nana ever be finished?" has been "we don't know." This answer is more honest than most incomplete things receive, and it is not enough, and it is the best available.`,
    tags: ['Nana', 'Ai Yazawa', 'josei manga', 'manga hiatus', 'manga history', 'romance manga'],
    entities: ['Ai Yazawa'],
    publishedAt: new Date('2026-03-19'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/nana-unfinished-josei-masterpiece-17-year-hiatus',
  },
  {
    title: 'Mobile Suit Gundam: How One Franchise Defined Mecha Anime for Fifty Years',
    slug: 'mobile-suit-gundam-defined-mecha-anime-fifty-years',
    category: 'anime',
    excerpt: 'Mobile Suit Gundam premiered in 1979 and was cancelled after 43 episodes due to low ratings. The theatrical film compilations released a year later became phenomena. No franchise in anime history has been more continuously productive or more structurally influential.',
    content: `"Mobile Suit Gundam" premiered on Nagoya Television in April 1979 and was cancelled after 43 of its planned 52 episodes due to disappointing ratings. The show's creator, Yoshiyuki Tomino, had intended to produce a serious war drama set in space — a story about real people in a real conflict, in which the giant robots were weapons rather than heroes. What the broadcaster saw was a mecha show that was too slow, too morally complex, and too willing to kill characters for its target demographic. The cancellation was, at the time, a straightforward commercial failure.

The theatrical compilation films released in 1981 and 1982, edited from the television footage, were phenomena. Model kit sales, which had been modest during the series' broadcast, became enormous as the theatrical run created new audiences who then sought out the merchandise. Bandai, which held the toy rights, sold billions of yen in Gundam plastic models — "Gunpla" — that have continued selling ever since, with annual Gunpla revenue in recent years reaching approximately 90 billion yen. The show that failed as a television series became the franchise that saved its toy partner's business and has sustained it for four decades.

What Tomino built in "Gundam" — and what the franchise's subsequent entries have consistently returned to — is the idea of the mobile suit as a tool of war rather than a heroic vehicle. In the Universal Century timeline that the original series established, mobile suits are produced by both sides of a conflict; they do not confer moral authority on their pilots; they kill and are destroyed. The protagonist Amuro Ray does not become a better person through combat; he becomes more damaged, more isolated, and more capable of causing harm. The trajectory is the opposite of the shonen formula, and it was deliberate.

Tomino has directed multiple Gundam series since the original, with results ranging from brilliant to chaotic — he has been candid in interviews about the periods in which his own mental state affected the quality of his work, and certain entries in the Universal Century timeline are noticeably darker than others in ways that track his public accounts of his depression during their production. He acquired the nickname "Kill 'em All Tomino" after "Mobile Suit Zeta Gundam" (1985–1986), in which the protagonist's mental deterioration and the deaths of central characters were so extreme that viewers found them disturbing rather than dramatic.

The franchise has expanded beyond Tomino's original vision through "Alternate Universe" series — "Mobile Fighter G Gundam," "Gundam Wing," "Gundam SEED," "Gundam 00," "Iron-Blooded Orphans" — each of which uses the mobile suit framework to tell a different kind of war story with a different thematic emphasis. Some of these are among the most successful anime series ever produced internationally; "Gundam Wing," which aired on Toonami in 2000, introduced the franchise to a generation of American viewers. The franchise's adaptability — its ability to sustain new visions while maintaining the essential proposition that giant robots are instruments of tragedy rather than triumph — is what has kept it relevant across fifty years.`,
    tags: ['Mobile Suit Gundam', 'Yoshiyuki Tomino', 'mecha anime', 'Gunpla', 'anime history', 'Bandai'],
    entities: ['Yoshiyuki Tomino', 'Bandai', 'Amuro Ray'],
    publishedAt: new Date('2026-03-21'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/mobile-suit-gundam-defined-mecha-anime-fifty-years',
  },
  {
    title: 'Your Lie in April: Music Anime, Grief, and Why the Ending Hits So Hard',
    slug: 'your-lie-in-april-music-anime-grief-ending',
    category: 'anime',
    excerpt: 'Your Lie in April is about a piano prodigy who cannot hear the sound of his own playing after his mother\'s death. It is also, from its first episode, a story that has already told you how it ends. The gap between knowing and feeling is where the series lives.',
    content: `"Your Lie in April," Naoshi Arakawa's manga serialized from 2011 to 2015 and adapted into anime by A-1 Pictures in 2014, begins with a structural confession: the first episode's framing makes clear that the story being told is being told in retrospect, from a place of loss that the viewer does not yet know. This is not withholding information from the audience; it is giving the audience the most important information first and inviting them to watch the story knowing what it costs. The emotional experience of "Your Lie in April" is shaped by this foreknowledge — the viewer watches two people fall toward each other in the specific way that people fall when one of them is dying, and the pleasure of the romance and the dread of its conclusion coexist from the first episode.

The protagonist, Kousei Arima, was a prodigy pianist trained by his chronically ill mother in methods that were abusive in their demands and traumatizing in their emotional content. Following his mother's death, he cannot hear the sound of his own playing — a psychological phenomenon the series depicts with musical specificity, the piano becoming an instrument of silence at the moments it should be loudest. His recovery, structured around his relationship with violinist Kaori Miyazono, is the series' central arc, and the musical performances that mark his stages of recovery are among the most technically accurate and emotionally effective depictions of instrumental music in anime.

The music is the series' primary vehicle rather than its backdrop. Arakawa researched the classical repertoire extensively, and the specific pieces performed by the characters — Beethoven's "Kreutzer" sonata, Chopin's études, Saint-Saëns' cello works — are chosen for their relationship to the emotional content of the scenes they accompany. The anime adaptation, scored by Masaru Yokoyama, extended the music's role further: the animated performances are edited to the actual recordings in ways that make the visual and musical rhythms reinforce each other, and the acoustic experience of watching performance scenes is unusually careful.

The series' treatment of grief is its most mature quality. Kousei's inability to play is not a dramatic device to be overcome through determination; it is a plausible psychological response to specific trauma, and the series takes the time to show what that response consists of and what dissolving it actually requires. The relationship with Kaori does not cure him; it gives him a reason to try to cure himself, which is a different and more honest thing. And when the story reaches the moment it has been approaching since the first episode, the response it generates in viewers is not the shock of surprise but the specific weight of watching something become true that you knew was coming and hoped, despite yourself, would not.

The final episode's letter — Kaori's retrospective to Kousei — is the series' most discussed element, and its success depends on everything the series has built toward it. That a piece of written text, read aloud over still images, can produce the emotional response it produces in viewers who have spent twenty-two episodes with these characters is a measure of how thoroughly the series has done its preparation. "Your Lie in April" is not a subtle work; it knows exactly what it is doing and does it without apology.`,
    tags: ['Your Lie in April', 'Naoshi Arakawa', 'music anime', 'A-1 Pictures', 'anime romance', 'piano anime'],
    entities: ['Naoshi Arakawa', 'A-1 Pictures'],
    publishedAt: new Date('2026-03-23'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/your-lie-in-april-music-anime-grief-ending',
  },
  {
    title: 'Psycho-Pass: Algorithmic Justice, Philip K. Dick, and the Limits of a Safe Society',
    slug: 'psycho-pass-algorithmic-justice-dystopian-anime',
    category: 'anime',
    excerpt: 'Psycho-Pass imagines a future Japan where an AI system predicts criminal intent before any crime is committed. Its questions — about freedom, safety, and what we lose by optimizing for security — have become more relevant with every passing year.',
    content: `"Psycho-Pass" premiered in October 2012, produced by Production I.G with scripts by Gen Urobuchi and Makoto Fukami. The series is set in a near-future Japan governed by the Sibyl System — an AI that continuously monitors every citizen's "psycho-pass," a measure of their mental state and propensity for criminal behavior. Citizens whose psycho-pass exceeds a threshold can be detained by enforcers before committing any crime. The system maintains remarkably low crime rates. The question the series asks — whether this is good — is not rhetorical.

The influence of Philip K. Dick is explicit and credited. "The Minority Report," Dick's 1956 story about a police system that arrests people for murders they have not yet committed, provides the premise's scaffolding. But "Psycho-Pass" extends Dick's concerns in specifically Japanese directions: the social conformity that the Sibyl System enforces is not experienced by most citizens as oppression but as comfort, because the system has eliminated the anxiety of uncertainty. A society in which everyone's likelihood of causing harm is continuously monitored is a society in which everyone is continuously performing harmlessness — adjusting behavior to avoid the appearance of threat rather than to avoid actual wrongdoing. This is the mechanism of social control the series depicts, and it is more sophisticated than simple surveillance.

The protagonist, Inspector Akane Tsunemori, begins the series as a true believer in the Sibyl System who confronts evidence of its fundamental injustice over the course of the first season. Her development — from someone who trusts institutional authority to someone who maintains institutional authority while understanding its limits — is handled with more nuance than most dystopian narratives manage. She does not become a revolutionary; she becomes someone who works within a flawed system while holding its flaws in clear sight, which is the less dramatic but more honest position.

The series' first season, which Urobuchi wrote exclusively, is a tightly controlled thriller that builds its philosophical content through genre structure rather than exposition. The cases that Akane and her enforcer Shinya Kogami investigate are chosen for their relationship to the series' central questions about justice, responsibility, and the attribution of criminal intent. The antagonist, Makishima Shougo, is a genuinely interesting villain: a person whom the Sibyl System cannot measure, who is therefore literally untouchable by its enforcers, and who uses this immunity to expose the system's dependence on the appearance of legitimacy rather than its substance.

The series spawned sequels and films of varying quality, but the first season stands independently as one of the more intellectually serious science fiction anime produced in the 2010s. The questions it poses about algorithmic governance, predictive policing, and the social costs of optimizing for safety at the expense of individual autonomy have grown more relevant rather than less as the technologies the series imagined have become closer to existing. Watching "Psycho-Pass" in 2026 is a different experience than watching it in 2012, because the distance between its fiction and the present has narrowed.`,
    tags: ['Psycho-Pass', 'Gen Urobuchi', 'Production I.G', 'dystopian anime', 'science fiction anime', 'Philip K. Dick'],
    entities: ['Gen Urobuchi', 'Production I.G', 'Philip K. Dick'],
    publishedAt: new Date('2026-03-25'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/psycho-pass-algorithmic-justice-dystopian-anime',
  },

  // ── CULTURAL AND FANDOM ──────────────────────────────────────────────────────
  {
    title: 'Otaku: How a Social Slur Became a Global Identity',
    slug: 'otaku-how-social-slur-became-global-identity',
    category: 'industry',
    excerpt: 'In 1983, the word "otaku" was a polite second-person pronoun used ironically among anime fans. By 1989, it had become a term of social stigma. By 2010, it was a badge of pride worn by millions worldwide. Here\'s how that transformation happened.',
    content: `The word "otaku" is, etymologically, an honorific form of "your home" — a formal second-person pronoun implying that you respect someone enough to refer to their household rather than their person. In the early 1980s, certain young Japanese men who attended anime and science fiction conventions began using it among themselves as an in-group term, an ironic formality that acknowledged their shared interest in home-based media consumption. The columnist Akio Nakamori described and named this subculture in a 1983 article in the magazine Manga Burikko, and the word became attached to a specific social type: young, male, intensely interested in anime, manga, and related media, and socially withdrawn.

The term became a social stigma in 1989 following the arrest of Tsutomu Miyazaki, a man who murdered four young girls in Tokyo and Saitama. Coverage of the case revealed that Miyazaki had a large collection of anime and horror VHS tapes, and the media made the connection explicit: Miyazaki was described as an "otaku-like" personality, and the existing social anxiety about young men who preferred media consumption to social engagement was focused and amplified. In the aftermath, identifying as an otaku in Japan carried a stigma that was not merely social embarrassment but genuine social suspicion. The word implied something pathological.

The rehabilitation of "otaku" — in Japan and globally — was a slow process spanning two decades. Domestically, a generation of creators and intellectuals who had grown up with anime and manga made the case that deep engagement with popular culture was a legitimate aesthetic and intellectual practice, not a symptom of social failure. Critic and theorist Hiroki Azuma's "Otaku: Japan's Database Animals" (2001) provided academic legitimacy for the subculture's analysis of its own experience. The commercial success of "Cool Japan" policies, which promoted anime and manga internationally as Japanese cultural exports, made the government's relationship with otaku culture implicitly complicated: the consumer behavior they had stigmatized was now a diplomatic asset.

Internationally, "otaku" was adopted by Western anime fans with the stigma largely stripped away — the original context that made it a slur in Japan did not transfer, and the word arrived in the English-speaking world primarily as a marker of enthusiastic fan identity. A Western fan who called themselves an otaku was claiming membership in an international community of people who took anime and manga seriously, not identifying with a Japanese social type associated with social failure. This divergence between domestic and international meanings produced occasional awkwardness when Japanese fans and international fans encountered each other and discovered that they were using the same word differently.

By the 2010s, the domestic stigma in Japan had substantially decreased, driven partly by the normalization of digital media consumption, partly by the commercial mainstreaming of anime, and partly by generational change. Young Japanese people grew up in a media environment where anime and manga had always been accepted as legitimate cultural goods, and the moral panics of the late 1980s were history rather than living memory. "Otaku" is now used with varying degrees of irony and pride in Japan, and globally it is simply a word for someone who loves anime — which is, by any measure, a great many people.`,
    tags: ['otaku culture', 'anime fandom', 'manga culture', 'Japanese culture', 'anime history', 'fandom identity'],
    entities: ['Hiroki Azuma', 'Japan', 'Tokyo'],
    publishedAt: new Date('2026-03-27'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/otaku-how-social-slur-became-global-identity',
  },
  {
    title: 'Sakuga: The Community That Watches Anime Frame by Frame',
    slug: 'sakuga-community-watches-anime-frame-by-frame',
    category: 'anime',
    excerpt: 'A dedicated community of anime fans identifies and archives moments of exceptional animation — tracking individual animators across productions, cataloguing techniques, and providing a level of critical attention to animation craft that the industry itself rarely offers.',
    content: `The Japanese word "sakuga" means, approximately, "drawing pictures" — it is the ordinary word for the act of producing animation. Within a specific online community, it has acquired a narrower meaning: exceptional animation, animation that exceeds the standard of its production context, sequences in which an individual animator or team has produced something of unusual quality. The sakuga community — centered on websites like sakugabooru.com and communities on Twitter and dedicated forums — exists to identify, archive, and discuss these moments, and in doing so has built an infrastructure of animation criticism that has no institutional equivalent.

The basic practice of the sakuga community is tagging: locating sequences of exceptional animation, identifying the animators responsible (through production credits, animator style recognition, and industry contacts), and filing them in searchable databases. This sounds straightforward and is in practice enormously difficult — anime productions do not always publish complete animator credits, and for productions from before the internet era, credits are often incomplete or missing. The community has developed investigative practices — comparing uncredited sequences to known work by specific animators, consulting with industry contacts, analyzing production documents when available — that resemble academic archival work more than fan activity.

What the community has produced is a body of knowledge about animation craft that professional critics and industry publications largely do not provide. A mainstream anime review will describe whether a show "looks good" without analyzing what technical choices produced the visual quality it reports. A sakuga analysis will identify the specific animator responsible for a sequence, describe the technique they used — the timing of key frames, the approach to secondary motion, the choices made about what to animate fully and what to simplify — and place the sequence in the context of that animator's body of work. This is animation criticism at the level of craft, and it is produced almost entirely by unpaid enthusiasts.

The community's influence on the industry is documented and growing. Production companies occasionally consult sakuga databases to identify talented animators for specific projects. Animators whose work has been catalogued and discussed by the community have reported that the attention affected their careers — that being recognized by knowledgeable fans motivated them during periods when industry conditions were discouraging. The community has also documented labor conditions in the anime industry with a consistency that mainstream entertainment journalism has not matched: tracking which studios produce exceptional animation through overwork and which maintain quality through better production management is a natural extension of analyzing which studios consistently produce the best work.

The sakuga community is not universally loved by anime fans. Its expertise can be experienced as gatekeeping — a suggestion that enjoying animation requires technical knowledge — and the granular specificity of its analysis can feel alien to viewers who experience animation primarily as a vehicle for story and character. But its existence represents something genuinely valuable: a form of critical attention to animation as a craft that takes the medium seriously enough to ask how specific effects are achieved, and that treats the people who produce those effects as artists worthy of knowing by name.`,
    tags: ['sakuga', 'anime animation', 'anime craft', 'anime community', 'animation analysis', 'anime fans'],
    entities: [],
    publishedAt: new Date('2026-03-29'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/sakuga-community-watches-anime-frame-by-frame',
  },
  {
    title: 'Anime Tourism: How Fans Travel the World to Visit Their Favorite Series',
    slug: 'anime-tourism-fans-travel-to-visit-favorite-series',
    category: 'industry',
    excerpt: 'Anime tourism — traveling to real-world locations depicted in anime — is a significant and growing segment of Japanese tourism. Here\'s why fans make the journeys, what they find when they get there, and how the industry has responded.',
    content: `When "Your Name" depicted specific streets in Tokyo and a specific town in the Hida region of Gifu Prefecture, fans began visiting those locations within weeks of the film's release. The streets in Shinjuku, the stairs at Suga Shrine, the surrounding countryside that Mitsuha's town was modeled on — each became destinations for viewers who wanted to stand in the specific places the film had made meaningful. Tourism to the Hida region increased measurably following "Your Name"'s release, with local businesses noting the change in visitor demographics and local governments acknowledging the film as a catalyst.

This phenomenon — traveling to real-world locations depicted in anime or manga, sometimes called "seichi junrei" (sacred site pilgrimage) — has been a feature of dedicated fandom since at least the early 2000s, when internet communities made it possible for fans to identify and share location information systematically. The community around "Lucky Star" documented every real-world location in the series' fictional Washinomiya setting (based on Kuki City in Saitama Prefecture), and their visits contributed to a significant increase in tourism to the Washinomiya Shrine that the series prominently featured. The shrine, previously a local institution with modest visitor numbers, became a nationally known destination for anime fans.

The reasons fans make these journeys are not uniform. Some are motivated by a desire for direct sensory encounter with something that has been aesthetically significant to them — standing in a place that was depicted beautifully is a different experience than looking at the depiction. Some are motivated by community — the knowledge that other fans have made the same journey, that standing in a particular place connects you to an extended network of people who found the same thing meaningful. Some are motivated by a form of verification that resists easy analysis: the desire to confirm that the places in the fiction correspond to places that actually exist, that the world of the anime is continuous with the physical world.

The tourism industry has responded with varying degrees of engagement. Certain local governments in Japan have formally embraced anime connections — creating stamps, producing collaboration merchandise, installing artworks at key locations — because the economic benefits are clear. Others have maintained distance from the phenomenon, particularly when the attention has been unwanted: locations depicted in series with adult content have sometimes attracted visitors whose behavior has been disruptive to local residents. The management of anime tourism at the community level is genuinely complex.

International anime tourism — fans traveling from outside Japan to visit locations — has grown substantially as Japanese tourism generally has recovered and expanded. Locations associated with Studio Ghibli films, with major franchises like "One Piece" and "Demon Slayer," and with series like "Spirited Away" whose imagery is specifically tied to Japanese visual culture attract visitors from across the world. The Japanese government's tourism infrastructure has recognized anime as a significant draw, and the framing of "Cool Japan" tourism often centers on the ability to visit the real landscapes that anime has made beautiful to global audiences.`,
    tags: ['anime tourism', 'seichi junrei', 'Your Name', 'anime culture', 'Japanese tourism', 'Lucky Star'],
    entities: ['Makoto Shinkai', 'Studio Ghibli', 'Japan'],
    publishedAt: new Date('2026-03-31'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/anime-tourism-fans-travel-to-visit-favorite-series',
  },
  {
    title: 'The Harem Genre: From 1990s Wish Fulfillment to Its Current State',
    slug: 'harem-genre-1990s-wish-fulfillment-current-state',
    category: 'anime',
    excerpt: 'The harem genre — stories in which one protagonist is surrounded by multiple love interests — emerged in the early 1990s and became commercially dominant. Its evolution over thirty years tracks changes in how anime addresses its audience.',
    content: `The harem genre — narratives in which a single protagonist, typically male, is surrounded by multiple characters of the opposite gender who are variously interested in him romantically — emerged as a recognizable commercial category in the early 1990s, shaped by the convergence of several factors: the growth of the adult visual novel market, the development of "bishojo" (beautiful girl) character aesthetics as a distinct commercial proposition, and the economic logic of manga and anime that produced content specifically designed for young male readers who might find fantasy scenarios of multiple romantic options appealing.

The foundational works include "Tenchi Muyo!" (1992), which established many of the genre's conventions: a male protagonist of unusual ability or heritage who attracts a group of female characters each representing a distinct character type (the childhood friend, the alien princess, the scientist, the warrior), each of whom desires him for different reasons, and whose romantic competition provides the series' primary comedic content. The protagonist's inability or unwillingness to choose among his suitors suspends romantic resolution indefinitely, allowing the commercial property to continue without narrative closure. This structural feature — the deliberate non-resolution of the romantic premise — is the genre's defining commercial characteristic.

The genre's peak commercial dominance in anime was roughly the late 1990s through the mid-2000s, when series like "Love Hina," "Negima!," "Shuffle!," and their descendants constituted a significant portion of anime production. The appeal to the target demographic was direct and not particularly disguised: these were fantasy scenarios in which the social dynamics that typically disadvantaged certain young men — social anxiety, romantic inexperience, perceived undesirability — were inverted, with multiple women competing for a protagonist's attention rather than ignoring it.

The genre's critical reputation has always been mixed at best, and the accusations leveled at it — that it enables unrealistic expectations about relationships, that it objectifies female characters by reducing them to competing interest sets rather than people, that its structural non-resolution is commercially cynical — are not unfounded. The more interesting question is what the genre's evolution says about its audience's changing expectations. Contemporary isekai series have largely absorbed the harem genre's conventions while adding power fantasy elements; "romantic comedy" manga have moved toward more emotionally realistic depictions of actual relationship development; series that deploy harem setups while taking the emotional lives of the competing characters seriously — "Rent-a-Girlfriend," controversially; "The Quintessential Quintuplets" — attempt to have it both ways with varying success.

The genre is not dead, but it has diversified. The clear harem formula of the early 2000s — fixed character types, suspended resolution, comedy derived from the gap between protagonist passivity and female aggressiveness — has fractured into a range of approaches that share some elements while abandoning others. What has persisted is the audience's interest in stories about multiple relationships and the emotional dynamics of choosing or not choosing, which is a real interest that the genre, at its best, was addressing.`,
    tags: ['harem anime', 'anime genres', 'romance anime', 'Tenchi Muyo', 'anime history', 'Love Hina'],
    entities: [],
    publishedAt: new Date('2026-04-02'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/harem-genre-1990s-wish-fulfillment-current-state',
  },
  {
    title: 'Post-Apocalyptic Anime: What the Genre Is Really About',
    slug: 'post-apocalyptic-anime-what-the-genre-is-really-about',
    category: 'anime',
    excerpt: 'From Fist of the North Star to Nausicaä to Made in Abyss, anime has a long tradition of stories set after civilization has ended. These are not disaster fantasies. They are arguments about what survives when the structures that define normal life are stripped away.',
    content: `Post-apocalyptic fiction asks a specific question: what is essential? When the institutions, technologies, and social structures that constitute civilization are removed, what remains? The answer different works give — and how they give it — reveals their underlying values and anxieties. Anime has a particularly rich tradition in this genre, shaped by Japan's specific relationship with catastrophic loss: the memory of Hiroshima and Nagasaki, the devastation of World War II, and a cultural willingness to imagine the end of things that Western post-apocalyptic fiction addresses somewhat differently.

"Fist of the North Star" (Buronson and Tetsuo Hara, 1983–1988) is the genre's action pole: a world reduced to violence after nuclear war, in which a martial arts master capable of destroying bodies with touch moves through a landscape of brutality, applying justice through superior force. The series is not subtle about its values — strength is the primary virtue in a world where strength is the only currency — but it is honest about the cost of that world. The brutality is not celebrated; it is depicted as the consequence of human failure, and the protagonist's purpose is partly to preserve what of civilization survives. The series generated enormous cultural reach, inspiring dozens of subsequent post-apocalyptic works and establishing a visual vocabulary for the genre that persists.

"Nausicaä of the Valley of the Wind" (Miyazaki, 1982–1994 manga; 1984 film) is the genre's ecological pole. In a world poisoned by industrial catastrophe, human civilization clings to zones between toxic jungles, warring over resources and refusing to understand the ecosystem that has replaced the one they destroyed. Nausicaä, a young woman of unusual ecological insight, understands what humans have not: that the toxic jungle is not a threat but a process of purification, that the catastrophe is moving toward resolution that human warfare can only delay. The series is an argument that civilization's relationship with nature is its central problem, and that the forms of consciousness that produced the catastrophe cannot resolve it.

"Made in Abyss" (Akihito Tsukushi, 2012–present), set in a world where a vast pit of unknown depth generates relics of incomprehensible technology and demands a price of physical damage from those who ascend from it, is the genre's mystery pole. The abyss is both a resource and a trap — the deeper you go, the greater the treasure and the greater the curse preventing return. The series uses this framework to examine ambition, the costs of curiosity, and the specific horror of children who have been raised in an environment that normalizes cruelty as the price of wonder. It is the most disturbing contemporary entry in the genre and also the most formally inventive.

What these works share, despite their tonal differences, is the genre's defining proposition: that what survives catastrophe reveals what was essential. The violence of "Fist of the North Star" survives; so does the ecological resilience Miyazaki depicts; so does the compulsive human curiosity at "Made in Abyss"'s heart. Each work argues for a different version of what is essential, and the arguments are more legible against the backdrop of everything else being gone.`,
    tags: ['post-apocalyptic anime', 'Fist of the North Star', 'Nausicaä', 'Made in Abyss', 'anime genres', 'Miyazaki'],
    entities: ['Hayao Miyazaki', 'Akihito Tsukushi'],
    publishedAt: new Date('2026-04-04'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/post-apocalyptic-anime-what-the-genre-is-really-about',
  },
  {
    title: 'Anime Conventions: How a Handful of Fans in Hotel Ballrooms Built a Global Industry',
    slug: 'anime-conventions-hotel-ballrooms-to-global-industry',
    category: 'industry',
    excerpt: 'The first dedicated anime convention in North America drew a few hundred people. AnimeExpo now draws over 115,000. Here\'s how anime cons grew from fan gatherings to major commercial events — and what they still do that nothing else can.',
    content: `The first dedicated anime convention in North America, "AnimeCon '91," was held in San Jose, California in August 1991 with approximately 1,750 attendees. It was organized by fans who had been sharing VHS tapes and fanzines through mail networks, and it provided something that no other format could: the experience of being physically present with other people who shared your specific interest at a level of depth that the general public did not. The convention model — a weekend gathering in a hotel or convention center, with screenings, discussion panels, dealer rooms, and spaces for social interaction — addressed the fundamental problem of being an anime fan in a pre-internet era: isolation.

The growth from that founding convention to the present state of the anime convention industry is one of the more remarkable expansions in fan event history. AnimeExpo, which began in 1992 and is now held annually at the Los Angeles Convention Center, regularly draws over 115,000 attendees across its four-day run, making it one of the largest conventions of any type in North America. Otakon, held in Baltimore and then Washington D.C., draws around 30,000. Smaller regional conventions, of which there are now hundreds in North America, Europe, and Australia, collectively serve millions of attendees annually.

What conventions provide that streaming, social media, and online communities cannot is physical presence: the specific experience of being in a room with people who share your interest, dressed as characters you recognize, able to make jokes that require no explanation, able to purchase merchandise you have been looking for, able to meet the creators whose work has meant something to you. The cosplay dimension of anime conventions — elaborate costume construction representing characters from anime, manga, and games — has developed into a craft practice with its own competitive dimension and its own community, in which the quality of construction is celebrated and the investment of time and skill is recognized.

The commercial dimension of conventions has grown with their attendance. Industry panels, where studios announce upcoming productions and Japanese guests make appearances, are now genuine news events that generate coverage beyond the convention itself. Publisher booths, merchandise vendors, and artist alleys (where independent creators sell original artwork and fan merchandise) constitute an informal economy of considerable scale. The large convention weekend is now factored into release schedules and production announcements in ways that the fan gatherings of the early 1990s could not have anticipated.

The pandemic disruption of 2020–2022 demonstrated both the resilience and the specific value of in-person conventions. Virtual alternatives — streaming panels, online dealer rooms, digital artist alleys — could replicate some of the content of conventions but not the experience. Attendance rebounded strongly after in-person events resumed, suggesting that the social function of conventions — the physical gathering of a community — is not replaceable by the digital tools that have otherwise transformed how fans engage with anime. Something about being there, specifically and bodily, is what conventions have always been for, and that has not changed.`,
    tags: ['anime conventions', 'AnimeExpo', 'anime fandom', 'anime community', 'cosplay', 'anime history'],
    entities: ['AnimeExpo', 'Los Angeles', 'Otakon'],
    publishedAt: new Date('2026-04-06'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/anime-conventions-hotel-ballrooms-to-global-industry',
  },
  {
    title: 'Made in Abyss and the Art of Beautiful Darkness',
    slug: 'made-in-abyss-art-of-beautiful-darkness',
    category: 'manga',
    excerpt: 'Made in Abyss pairs the visual language of a children\'s adventure with content of genuine horror. This combination is not a trick — it is the series\' central argument about wonder, cost, and the things we do to children in the name of discovery.',
    content: `Akihito Tsukushi began serializing "Made in Abyss" in 2012 in the Web Comic Gamma magazine. The series' visual presentation is immediately distinctive: character designs with rounded, expressive faces and soft proportions that belong to a children's adventure manga, set against backgrounds of extraordinary detailed richness depicting an enormous pit called the Abyss that descends into the Earth for kilometers. The combination generates an immediate tonal tension — the style says "safe" while the content increasingly does not — and this tension is not an aesthetic inconsistency but the series' deliberate central proposition.

The Abyss is the world's central mystery: an enormous chasm of unknown depth that generates relics of incomprehensible technology, populated by creatures of increasing strangeness and danger, and governed by the Curse of the Abyss — a physical law that makes ascending from the depths increasingly catastrophic. The deeper you descend, the worse the effects of trying to return: nausea at shallow depths, bleeding and loss of senses deeper, death or complete physical transformation near the bottom. The world has developed a culture of exploration that treats these costs as acceptable in pursuit of the Abyss's secrets, and the society depicted in the series reflects the specific distortions that normalizing those costs produces.

The children at the series' center — Riko, who wants to descend to find her missing mother, and Reg, a robot boy of unclear origin — are in the Abyss because the society that raised them sent them there. The cave raider schools that train children for Abyss exploration are institutions that prepare people to risk death and worse in service of knowledge, and the series asks the question that the institution's participants largely cannot: whether the knowledge is worth the cost, and who should bear the cost, and why it is children who bear most of it.

Tsukushi's visual approach to the series' more extreme content — and the content becomes extreme — maintains the soft aesthetic of the surface world rather than shifting to a grimmer register. Characters experience horrific things depicted in a visual language that does not aestheticize horror in the way dark fantasy manga typically does. The horror reads as more disturbing for this reason, not less: the dissonance between the image's tone and the content's reality produces a specific kind of wrongness that conventional dark fantasy art, which signals its genre through style, does not achieve.

The anime adaptations — a series in 2017 and films in 2019 and 2022 — have brought the work to a wider audience with visual realization that matches the manga's ambition and extends it in the medium of motion and sound. The series has attracted criticism for specific content involving children, and the criticism is not without basis; Tsukushi deploys the distress of child characters with a frequency and intensity that some readers find crosses from meaningful darkness into gratuitousness. The debate is ongoing, and it is the right debate to have about work that uses discomfort as deliberately as "Made in Abyss" does.`,
    tags: ['Made in Abyss', 'Akihito Tsukushi', 'manga horror', 'dark fantasy manga', 'seinen manga', 'adventure manga'],
    entities: ['Akihito Tsukushi'],
    publishedAt: new Date('2026-04-08'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/made-in-abyss-art-of-beautiful-darkness',
  },
  {
    title: 'The Isekai Truck and the Genre\'s 20 Subgenres',
    slug: 'isekai-truck-and-the-genres-subgenres',
    category: 'light-novels',
    excerpt: 'The "truck-kun" trope — in which the protagonist is killed by a truck and reborn in a fantasy world — is the most mocked convention in isekai. It\'s also the key to understanding how the genre fragmented from a single premise into twenty distinct subgenres.',
    content: `The "truck-kun" phenomenon — the striking regularity with which isekai protagonists are killed by trucks before their reincarnation in another world — became a subject of internet humor approximately five years after isekai itself became commercially dominant. The joke is that the genre had settled on this specific mechanism of transportation so consistently that it could be treated as a proper noun: Truck-kun, the benevolent vehicle who sends Japanese salarymen to fantasy kingdoms. The joke is also an observation about how formula solidifies in commercially successful genres faster than any individual creative decision would explain.

The original isekai premise — protagonist transported to another world — left the mechanism of transport unspecified. Early examples used summoning magic, portals, divine intervention, or simply unexplained transportation. The truck became dominant partly because it provided a reason for the protagonist to be an ordinary modern Japanese person (they must die in Japan to be reborn elsewhere) and partly because death-and-reincarnation isekai allowed the protagonist to retain memories of their previous life while gaining new abilities in the fantasy world — a structure that enabled the tutorial scenes, skill-acquisition sequences, and "player approaching an unfamiliar game" narrative logic that the game-mechanic subgenre of isekai found commercially useful.

As the genre expanded, the single premise bifurcated into subgenres defined by specific variations. "Reincarnation as a villainess" isekai — in which the protagonist, typically female, is reincarnated as the antagonist of an otome game they played in their previous life — developed into a substantial subgenre with its own conventions. "Reincarnation as a non-human" isekai explored the fantasy world from the perspective of a slime, a vending machine, a spider, a goblin — non-protagonist entities who observe the genre's conventions from outside the heroic role. "Slow life" isekai deliberately inverted the power fantasy structure, following protagonists who specifically choose not to become the dominant force in the fantasy world and instead pursue domestic contentment.

The "male power fantasy" mainstream of isekai — the protagonist who is the strongest, who accumulates followers and harems, whose special ability makes them categorically superior to the world they inhabit — developed its own internal critique through works like "No Game No Life," which is self-aware about its power fantasy structure, and "Re:Zero," which uses the mechanics of isekai as a framework for a story about trauma, failure, and the specific psychological damage of someone who cannot permanently die and therefore cannot be educated by consequences.

What the fragmentation of isekai into subgenres demonstrates is how genre conventions, once established, become a creative material rather than a constraint — something to work with, against, or around. The truck is a joke, but it is also a door: a compressed statement of a premise from which twenty different stories can depart. The genre's commercial dominance has been criticized as producing homogenous work, and a significant proportion of isekai production is genuinely formulaic. But the best isekai works use their genre literacy the way the best crime fiction uses crime — as a familiar structure that enables, rather than limits, what the story can actually be about.`,
    tags: ['isekai', 'truck-kun', 'isekai subgenres', 'light novels', 'manga genres', 'Re:Zero', 'anime tropes'],
    entities: [],
    publishedAt: new Date('2026-04-10'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/isekai-truck-and-the-genres-subgenres',
  },
  {
    title: 'How Anime Depicts Grief, Trauma, and Mental Illness — And Why It Matters',
    slug: 'how-anime-depicts-grief-trauma-mental-illness',
    category: 'anime',
    excerpt: 'Anime has a complicated relationship with mental health. At its best, it depicts psychological damage with honesty and care that mainstream media rarely achieves. Here\'s how the medium handles grief, trauma, and illness — and where it falls short.',
    content: `Anime's relationship with grief, trauma, and mental illness is more complex than its popular reputation suggests. On one hand, the medium has produced some of the most honest depictions of psychological damage in any popular storytelling form — works that take seriously what it costs to survive certain experiences, that depict the non-linear nature of recovery, and that refuse the redemption arcs that most mainstream media applies to psychological suffering as a matter of convention. On the other hand, the medium has a persistent tendency toward certain tropes that flatten psychological damage into character motivation without engaging the reality of what that damage consists of.

The strongest examples in the medium's history of honest psychological depiction cluster in the 1990s, when Hideaki Anno's "Neon Genesis Evangelion" used clinical depression as a structural and thematic element, depicting what it feels like from inside — the inability to act, the withdrawal, the specific quality of not caring whether you live or die — with a precision that came from personal experience. Anno's approach was not to dramatize depression but to render it: to make the viewer experience something of what the state consists of, which is different from showing a character who is sad. The approach was formally radical and commercially risky, and its success has encouraged subsequent creators to approach psychological content with similar directness.

"March Comes in Like a Lion" (Chica Umino, 2007–present; anime 2016–2018) is perhaps the most sustained and careful depiction of depression in manga, following a professional shogi player whose isolation and self-negation are depicted chapter by chapter in ways that track the experience with documentary accuracy. The anime adaptation, produced by Shaft, made formal choices that reinforced the psychological content — visual metaphors that literalize emotional states, pacing that reproduces the temporal distortion of depression, a color palette that distinguishes between the protagonist's internal and external worlds. The series is not about recovering from depression in the way that most narratives are; it is about learning to receive care, which is a different thing.

The medium's failures in depicting mental illness are also patterned. Trauma is frequently invoked as character backstory that explains present behavior without depicting the actual phenomenology of trauma — the intrusion, the avoidance, the hypervigilance, the way the body holds what the mind has processed. "Dark past" as character motivation is a convention that simultaneously acknowledges psychological damage and reduces it to a plot element. Similarly, certain psychological states are fetishized in ways that romanticize suffering without respecting its reality: the "broken girl" character type, the protagonist who is pathologically self-destructive in ways that function as attractiveness rather than genuine distress.

Where anime consistently outperforms other popular media is in its willingness to depict grief without resolving it. Western narrative conventions impose a timeline on grief — stages that should be passed through, an eventual "getting over it" that restores the bereaved to a recognizable normality. Anime is significantly more willing to depict grief as a permanent feature of a character's psychological landscape — something that changes over time but does not end — and to treat people who have not gotten over significant losses with empathy rather than impatience. This willingness to let grief be ongoing is, for many viewers who recognize it from their own experience, one of the medium's most valuable qualities.`,
    tags: ['anime mental health', 'anime grief', 'Evangelion', 'March Comes in Like a Lion', 'psychological anime', 'anime representation'],
    entities: ['Hideaki Anno', 'Chica Umino', 'Shaft'],
    publishedAt: new Date('2026-04-12'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/how-anime-depicts-grief-trauma-mental-illness',
  },
];

async function main() {
  console.log(`Seeding ${ESSAYS.length} essays (batch 4)...`);
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
