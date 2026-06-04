/**
 * Seeds the database with editorial essays on manga/anime history and trivia.
 * Run with: npx tsx scripts/seed-essays.ts
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const ESSAYS = [
  // ── MANGA ────────────────────────────────────────────────────────────────────
  {
    title: 'From Hokusai to Tankōbon: The Full History of Manga as a Format',
    slug: 'history-of-manga-format',
    category: 'manga',
    excerpt: 'Manga\'s roots stretch back to 12th-century picture scrolls, but it took Osamu Tezuka, weekly anthology magazines, and the tankōbon format to turn it into a global industry.',
    content: `Manga's roots stretch back to the Heian period of Japan, where artists painted narrative picture scrolls known as emakimono. These illustrated stories, unrolled horizontally to reveal scenes in sequence, established storytelling through sequential images centuries before the printing press existed. Katsushika Hokusai, the legendary ukiyo-e artist, gave the medium its modern name in 1814 when he published his "Hokusai Manga" — a collection of sketches depicting everything from landscapes to wrestling demons to everyday life. Hokusai used the word casually and self-deprecatingly, yet it stuck.

The modern manga format began taking shape during the Meiji era (1868–1912), when Western influences flooded Japan. Political cartoons and satirical illustrations appeared in newspapers and magazines, blending Japanese visual traditions with European comic strip conventions. The concept of speech bubbles, panel borders, and sequential narrative panels was gradually absorbed and transformed into something distinctly Japanese.

The figure who defined modern manga was Osamu Tezuka, who began publishing in the late 1940s. Tezuka revolutionized the form with cinematic storytelling — dramatic close-ups, motion lines, wide-angle establishing shots, and emotionally expressive characters with large eyes inspired partly by Disney animation. His sprawling 1947 work "Shin Takarajima" (New Treasure Island) reportedly sold 400,000 copies and changed what Japanese readers expected from a comic. He became so dominant that he is still called "the God of Manga."

For decades, manga was primarily distributed through monthly and weekly anthology magazines — thick publications containing dozens of serialized stories competing for reader attention in the same issue. A series that attracted readers survived; one that failed the popularity contest was cut. This serialization model meant that manga was inherently tied to reader response in a way that few other literary forms have ever been.

The tankōbon — a collected volume reprinting chapters from magazine serialization — emerged as the dominant consumer product from the 1970s onward. These standardized volumes, typically featuring 8–10 chapters, turned manga series into collectible products that fans could own permanently. The success of the tankōbon market meant that even a modest magazine series could generate significant revenue through collected volumes, changing how publishers thought about the economics of the medium entirely.

Today, with digital platforms like Shonen Jump+ allowing series to be read simultaneously worldwide on the day of publication, manga has traveled further from its picture-scroll origins than Hokusai could have imagined — yet the basic transaction at its heart remains the same: a sequence of drawn images telling a story, one panel at a time.`,
    tags: ['manga history', 'Osamu Tezuka', 'tankōbon', 'Hokusai', 'Weekly Shonen Jump', 'manga format'],
    entities: ['Osamu Tezuka', 'Katsushika Hokusai', 'Japan'],
    publishedAt: new Date('2026-05-01'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/history-of-manga-format',
  },
  {
    title: 'The Gekiga Movement: When Manga Decided to Grow Up',
    slug: 'the-gekiga-movement',
    category: 'manga',
    excerpt: 'In 1957, Yoshihiro Tatsumi coined the term "gekiga" to describe darker, more realistic comics for adults. The movement he launched changed manga\'s possibilities forever.',
    content: `In the late 1950s, a young manga artist named Yoshihiro Tatsumi was frustrated. The dominant style in Japanese comics was cheerful, cartoonish, and aimed squarely at children — a tradition embodied by the enormously popular Osamu Tezuka. Tatsumi wanted to make something different: darker, more realistic stories about adult life, urban alienation, and the quiet desperation of postwar Japan. He needed a word that wasn't "manga," because "manga" had become synonymous with children's entertainment. In 1957, he coined the term "gekiga" — dramatic pictures — and a movement was born.

Gekiga artists rejected the large, rounded eyes of Tezuka-style characters in favor of harder, more angular linework. Their stories dealt with crime, poverty, and the psychic wounds left by Japan's wartime defeat and rapid industrialization. Distribution came not through mainstream publishers but through kashihon-ya — rental bookshops where readers paid to borrow books by the day, reaching working-class audiences who couldn't afford to buy publications outright.

The most important figure to emerge from the gekiga tradition was Kazuo Koike, who wrote "Lone Wolf and Cub" (illustrated by Goseki Kojima beginning in 1970). This epic story of a disgraced executioner wandering feudal Japan with his toddler son combined masterful action choreography with meditations on loyalty, death, and fatherhood. It sold over 8 million copies in Japan and became one of the first manga works to achieve serious critical recognition in the West when published in English in the 1980s.

Tatsumi himself continued working for decades, documenting urban working-class life in stories that could be grimly funny or quietly devastating. His autobiographical work "A Drifting Life," published in 2008, charted his own history alongside the postwar development of manga itself. When publisher Drawn & Quarterly introduced his work to North American readers, a whole generation of alternative comics fans encountered gekiga for the first time and recognized something that had no Western equivalent.

The legacy of gekiga lives in virtually every mature manga work published today. Series like "Berserk," "Vinland Saga," "Monster," and "Vagabond" are unthinkable without the path that Tatsumi and his contemporaries cleared. The distinction between entertainment manga and literary manga — a distinction that still structures how critics and fans discuss the medium — was essentially invented by the gekiga generation.`,
    tags: ['gekiga', 'Yoshihiro Tatsumi', 'manga history', 'Lone Wolf and Cub', 'Kazuo Koike', 'adult manga'],
    entities: ['Yoshihiro Tatsumi', 'Kazuo Koike', 'Goseki Kojima', 'Osamu Tezuka'],
    publishedAt: new Date('2026-05-03'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/the-gekiga-movement',
  },
  {
    title: 'How Weekly Shonen Jump\'s Voting System Has Shaped Manga History',
    slug: 'weekly-shonen-jump-voting-system',
    category: 'manga',
    excerpt: 'For over five decades, a small reader postcard enclosed in each issue of Weekly Shonen Jump has decided which manga series live and which die. Here\'s how it works — and what it has cost.',
    content: `Every week, somewhere between 1.5 and 6 million readers of Weekly Shonen Jump make a decision that can end a manga artist's career. Enclosed in each issue is a reader survey — a postcard asking which series they enjoyed most this week. These responses are tallied, ranked, and returned to the editorial team, who use the data to decide which series get more pages, which get moved earlier in the magazine (a prestigious position), and which get canceled.

The system, known internally as the "survival of the fittest" model, is brutal by design. Jump's editors believe that the pressure of the ranking system forces creators to produce their best work consistently, without the safety net of guaranteed tenure that editorial favoritism might provide. New series are given a trial period — typically 10 to 20 chapters — to establish their readership before the rankings determine their fate. A series that fails to find its audience gets cut, regardless of the creator's reputation.

This system has shaped manga history in ways that are difficult to overstate. Akira Toriyama was famously ready to end Dragon Ball after the original adventure arc concluded, but reader surveys showed overwhelming demand for more, pushing him to continue into the martial arts tournament structure, then the Saiyan arc, then the escalating power battles that defined the series. What fans remember as Dragon Ball's essential identity was, in significant part, a response to what survey respondents said they wanted each week.

The flip side is that the survey system has killed series before they could develop. Many manga artists recall receiving cancellation notices with almost no warning, forced to wrap up storylines in a fraction of the time they'd planned. Chapters written under cancellation orders have a particular cramped quality — plot threads dropped, character arcs rushed, endings that feel unearned because they are. The manga industry's graveyard is full of series that might have been classics given more time.

Jump's editorial system also produced the cultural phenomenon known as the "Jump formula": a philosophy of manga storytelling built around friendship, hard work, and victory, summarized in Japanese as "nakama," "doryoku," and "shōri." These are not a written rule but an observed pattern — what the survey data, over decades, revealed that Jump's readership wanted most. The formula became so codified that it is now both a genuine storytelling philosophy and a cliché that knowing artists both follow and subvert.`,
    tags: ['Weekly Shonen Jump', 'manga industry', 'Dragon Ball', 'manga business', 'reader surveys', 'Jump formula'],
    entities: ['Akira Toriyama', 'Weekly Shonen Jump', 'Shueisha'],
    publishedAt: new Date('2026-05-05'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/weekly-shonen-jump-voting-system',
  },
  {
    title: 'Comiket: How the World\'s Largest Self-Publishing Fair Was Born from Fan Frustration',
    slug: 'comiket-worlds-largest-self-publishing-fair',
    category: 'manga',
    excerpt: 'Comiket began in 1975 with 700 attendees and 32 creator groups. Today it draws over 700,000 visitors twice a year. Its story is one of fan creativity, legal grey zones, and the careers it has launched.',
    content: `Twice a year, in August and December, somewhere between 200,000 and 750,000 people descend on the Tokyo Big Sight convention center for the Comic Market — universally known as Comiket. They are there to buy and sell doujinshi — self-published fan works, original creations, and everything in between — in an event that has no real equivalent anywhere else in the world. It is simultaneously a commerce event, a cultural phenomenon, and a political statement about who gets to own creative culture.

Comiket began in December 1975 with approximately 700 attendees and 32 circles (the term for creator groups, whether solo or collaborative). Its founders, a group of female manga fans frustrated by their exclusion from mainstream manga publishing, wanted a space where fans could share their own stories about characters they loved. The early Comiket was specifically and deliberately fan-run, decentralized, and nonprofit — the complete opposite of the commercial manga industry it existed alongside.

The doujinshi tradition that Comiket nurtures occupies a legally ambiguous space. Much of what is sold there is fan fiction based on existing copyrighted properties — unauthorized stories, illustrations, and sometimes explicit content featuring characters from popular manga and anime. Japanese publishers have, by long-standing convention, tolerated this practice. The conventional wisdom is that active doujinshi communities signal a healthy fandom, and suppressing them would damage the relationship between publishers and their most devoted readers.

Many of Japan's most significant creative careers passed through Comiket. CLAMP, the all-female manga collective responsible for "Cardcaptor Sakura" and "X/1999," began as a doujinshi circle selling fan works at Comiket before being recruited by professional publishers. Key, the visual novel studio behind "Clannad" and "Kanon," emerged from the doujin game scene that Comiket helped incubate. Even several current Weekly Shonen Jump artists first sold self-published comics at Comiket tables before attracting the attention of editors.

The event has also become a barometer for which properties are culturally dominant in a given year. When a series breaks through at Comiket — when hundreds of circles simultaneously produce work inspired by the same characters — it is a sign of fandom investment that no sales chart can quite capture. In this sense, Comiket remains what it was in 1975: a space where the real measure of a story's impact is how many people are moved to continue it themselves.`,
    tags: ['Comiket', 'doujinshi', 'fan culture', 'manga history', 'CLAMP', 'self-publishing', 'Tokyo Big Sight'],
    entities: ['CLAMP', 'Tokyo', 'Tokyo Big Sight'],
    publishedAt: new Date('2026-05-07'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/comiket-worlds-largest-self-publishing-fair',
  },

  // ── ANIME ────────────────────────────────────────────────────────────────────
  {
    title: 'Osamu Tezuka and Limited Animation: How Budget Constraints Defined the Anime Look',
    slug: 'osamu-tezuka-limited-animation',
    category: 'anime',
    excerpt: 'When Tezuka\'s Mushi Production needed to bring "Astro Boy" to television on a tiny budget in 1963, the workarounds his team invented accidentally became the defining visual language of anime.',
    content: `When Osamu Tezuka's studio Mushi Production won the contract to produce a television anime adaptation of "Astro Boy" in 1963, they faced an immediate and nearly insurmountable problem: money. American animation studios like Disney were producing 24 fully drawn frames per second, each frame a unique illustration. Mushi Production's budget allowed for something closer to three or four unique frames per second, with the same drawings held and reused extensively. What they invented to make this work became the visual language that defines anime to this day.

The technique is called "limited animation," and it is the art of making stillness look intentional. Instead of fluid full-body movement, Tezuka's team learned to animate only the part of the character that needed to move — a mouth flapping while the body held still, eyes sliding laterally without the head turning. They developed a vocabulary of speed lines, impact frames, and dramatic held poses that could convey action more powerfully than smooth movement while requiring a fraction of the drawing time. The iconic wide-eyed anime character design — large eyes, small mouths, simplified features — was partly an economic decision, as simplified features are faster to draw consistently across frames.

The "Astro Boy" technique spread rapidly because the financial logic was undeniable. A television episode could be produced for a fraction of what full animation would cost, and the schedule was weekly rather than cinematic. Studios that followed — Toei, Sunrise, Tatsunoko — all worked with variations on the same limited animation toolkit, each adding their own refinements and stylistic signatures.

What is remarkable is how quickly these practical compromises became aesthetic preferences. Japanese audiences raised on anime came to associate the held pose, the speed line, and the intensely expressive face with emotional power rather than budget constraint. Directors like Mamoru Oshii and Hideaki Anno later used limited animation deliberately and artistically, choosing stillness at moments of psychological intensity not because they couldn't animate but because stillness communicated something fluid motion could not.

The influence has traveled far beyond Japan. Western animators who grew up watching anime imports have brought limited animation's visual grammar into productions that have nothing to do with Japanese source material. The impact frame, the speed line, the held dramatic face — these are now global tools, originating in the practical problem of how to make a television show every week when you cannot afford to make it move.`,
    tags: ['Osamu Tezuka', 'Astro Boy', 'limited animation', 'anime history', 'Mushi Production', 'anime style'],
    entities: ['Osamu Tezuka', 'Mushi Production', 'Astro Boy'],
    publishedAt: new Date('2026-05-09'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/osamu-tezuka-limited-animation',
  },
  {
    title: 'The OVA Boom of the 1980s: When Anime Had Nothing to Lose',
    slug: 'the-ova-boom-of-the-1980s',
    category: 'anime',
    excerpt: 'The Original Video Animation format, sold directly on VHS without TV or cinema release, gave 1980s anime studios a creative sandbox with no censors, no broadcast restrictions, and no rules.',
    content: `In 1983, a 30-minute animation called "Dallos" was released directly to VHS tape in Japan, bypassing both television broadcasters and cinema chains. It was directed by Mamoru Oshii, who would later make "Ghost in the Shell," and it was made possible by a simple economic observation: Japan's consumer VHS market was mature enough that a product sold directly to fans could be profitable without requiring any middlemen. The OVA — Original Video Animation — was born, and the 1980s became the most creatively unconstrained decade in anime history.

The OVA format eliminated the two most powerful forces that shaped television anime: the need to attract a broad audience across all age groups, and the need to satisfy broadcast censors. A tape sold directly to fans who had already chosen to buy it could be violent, sexual, philosophically dense, or stylistically experimental in ways that a show airing on Saturday morning simply could not. Studios took the freedom seriously.

The resulting catalog of 1980s OVAs reads like a document of everything anime could be when no one was telling it to calm down. "Megazone 23" explored urban alienation and simulated reality in 1985, years before "The Matrix." "Gunbuster" (1988), directed by the then-unknown Hideaki Anno, told a hard science fiction story about relativistic time dilation and its human cost. "Wicked City" and "Demon City Shinjuku" pushed into graphic horror that no broadcaster would have approved. "The Guyver" turned body horror into action spectacle. The sheer variety was staggering — in a single year, an anime fan could watch a children's fairy tale OVA, a cyberpunk thriller, a samurai epic, and an erotic comedy, all produced by different studios experimenting with what the medium could do.

The economic model was also genuinely novel. OVAs were priced at a premium — a single 45-minute tape could cost several thousand yen — which meant they were targeted at serious fans willing to pay for something made specifically for them. This direct fan-to-creator economic relationship prefigured subscription streaming services by decades. Studios knew who their audience was and could make creative decisions accordingly, without chasing ratings points from casual viewers.

The OVA boom faded in the 1990s as the format was gradually displaced by the expanding television market, the rise of the theatrical film, and eventually by DVD and the internet. But its legacy is the proof that anime's creative range extends far beyond what broadcast economics normally allow — a fact that streaming platforms rediscovered after 2015, when the internet finally gave studios direct access to paying fans again.`,
    tags: ['OVA', 'anime history', '1980s anime', 'Ghost in the Shell', 'Mamoru Oshii', 'Hideaki Anno', 'Gunbuster'],
    entities: ['Mamoru Oshii', 'Hideaki Anno', 'Japan'],
    publishedAt: new Date('2026-05-11'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/the-ova-boom-of-the-1980s',
  },
  {
    title: 'Fansub Culture: How Piracy Actually Built the Western Anime Audience',
    slug: 'fansub-culture-how-piracy-built-anime-western-audience',
    category: 'anime',
    excerpt: 'Before Crunchyroll, before Netflix, before DVD, Western anime fans built an underground distribution network that sent VHS tapes across the world. Without them, there might be no Western anime industry at all.',
    content: `In the late 1980s, if you were an anime fan living outside Japan, your options were bleak. A small number of series had been licensed, heavily edited, and dubbed for children's television — "Robotech," "Speed Racer," "Voltron" — but the vast majority of what was being produced in Japan was completely inaccessible. Then a network of obsessive fans discovered that you could subtitle a VHS tape, copy it, and mail it to other fans who wanted to watch it. Fansubs were born.

The fansub ecosystem worked on an informal honor system. Groups of fans — typically a translator, a timer who matched subtitle timing to dialogue, and someone with access to video editing equipment — would obtain raw Japanese tapes, produce subtitles, and distribute copies through fan clubs, science fiction conventions, and eventually the early internet. The unwritten rule was that fansubs were free to copy and distribute because no money was being made and the copyright holder had no intention of releasing the content in the destination market anyway. The moment a company licensed a series for Western release, the fansubbers were expected to stop and encourage fans to buy the official product.

This self-regulatory ethic was imperfect but mostly functional, and it built something remarkable: a genuine, knowledgeable Western fan base for Japanese anime years before the industry had any commercial interest in serving them. When companies like Bandai Entertainment and Pioneer began releasing subtitled anime on VHS and LaserDisc in the early 1990s, there was already an existing audience ready to buy — an audience that fansubs had created and educated.

The internet transformed fansub distribution from a slow postal exchange into something nearly instantaneous. By the early 2000s, BitTorrent and IRC channels allowed new episodes of currently airing series to reach Western fans within hours of their Japanese broadcast, with subtitles produced by dedicated teams working through the night. The speed created a genuine culture of simultaneous global fandom — American, European, and South American fans discussing the same episode of "Naruto" or "Fullmetal Alchemist" within days of its airing.

The fansub era ended — or at least changed fundamentally — when Crunchyroll introduced legal simulcasting in 2009, offering subtitled episodes legally within hours of Japanese broadcast. Most of the major fansubbing groups dissolved, their core proposition made redundant. The irony is complete: the infrastructure of global anime fandom that fansubs built was the very thing that made legal streaming economically viable. The piracy that threatened the industry had actually created the market that the industry could then serve.`,
    tags: ['fansubs', 'anime history', 'Crunchyroll', 'Western anime fandom', 'piracy', 'simulcast', 'fan culture'],
    entities: ['Crunchyroll', 'Japan', 'Bandai Entertainment'],
    publishedAt: new Date('2026-05-13'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/fansub-culture-how-piracy-built-anime-western-audience',
  },
  {
    title: 'The Anime Bubble of the Late 1990s and Why It Collapsed',
    slug: 'the-anime-bubble-1990s-collapse',
    category: 'anime',
    excerpt: 'In the late 1990s, the anime industry expanded at an unsustainable pace, fueled by merchandise revenue, the Pokémon boom, and speculative investment. What followed reshaped the industry\'s structure permanently.',
    content: `The mid-to-late 1990s looked, from the outside, like a golden age for anime. "Neon Genesis Evangelion" had redefined what the medium could achieve artistically. "Dragon Ball Z" was a global merchandising phenomenon. "Pokémon" had broken into markets that anime had never touched. Investment poured into studios, the number of productions increased dramatically, and there was genuine belief that anime was on the verge of achieving the same global mainstream presence as Hollywood film.

The belief was wrong, and the correction was severe. Between 1998 and 2002, the anime industry contracted sharply. Studios that had expanded rapidly on the assumption of continued growth found themselves with empty order books. Several major studios declared bankruptcy or were absorbed by larger parent companies. The production workforce — the rank-and-file animators, in-betweeners, and background artists who made the work possible — was cut dramatically, with experienced workers leaving the industry permanently.

Several factors converged to cause the collapse. The domestic Japanese economy was in prolonged recession following the asset bubble implosion of the early 1990s, limiting consumer spending on entertainment products. The home video market, which had sustained the industry through premium-priced VHS and LaserDisc releases, was being disrupted by DVD — a transition that required massive reinvestment and temporarily compressed margins. Most critically, the assumption that Western markets would absorb as much anime as Japan could produce proved false. A small number of breakout properties succeeded; the vast majority did not find audiences outside Japan.

The structural changes the crisis imposed were long-lasting and mostly negative for workers. Studios adopted the practice of outsourcing animation work to South Korea, China, and Southeast Asia, where labor costs were dramatically lower. The "production committee" financing model — in which multiple companies each contributed partial funding in exchange for partial rights — became dominant, spreading financial risk across investors but also fragmenting creative control. The average salary for an entry-level Japanese animator fell to levels that are still, decades later, below minimum wage for the hours actually worked.

What the industry retained — what the crash could not eliminate — was its creative depth and its global audience. The fans who had discovered anime through fansubs and convention screenings did not stop watching when the bubble burst. They simply waited for whatever came next. And what came next, eventually, was streaming.`,
    tags: ['anime bubble', 'anime industry', '1990s anime', 'Evangelion', 'Pokémon', 'anime business', 'anime production'],
    entities: ['Japan', 'Gainax'],
    publishedAt: new Date('2026-05-15'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/the-anime-bubble-1990s-collapse',
  },

  // ── CREATORS ─────────────────────────────────────────────────────────────────
  {
    title: 'Akira Toriyama\'s Early Career: The Failures Before Dragon Ball',
    slug: 'akira-toriyama-early-career-before-dragon-ball',
    category: 'creators',
    excerpt: 'Before Goku, before Dr. Slump, Akira Toriyama submitted work to Weekly Shonen Jump twice and was rejected both times. The story of how he almost gave up on manga.',
    content: `Akira Toriyama did not want to be a manga artist when he grew up. He wanted to draw, certainly — he had drawn obsessively since childhood — but the specific ambition to create serialized manga for a weekly anthology magazine was not part of his plan when he graduated from an industrial design program in Aichi Prefecture and took a job at an advertising agency doing graphic design work. He was 23 years old, and the career was steady and unremarkable, and then one day in 1977 he saw an advertisement in a magazine announcing a manga contest with a cash prize.

Toriyama entered the contest primarily for the money. He submitted a short comic story, received encouraging feedback from the judges, and decided to submit work to Weekly Shonen Jump's editorial department. They rejected him. He submitted again. They rejected him again. A third submission, a one-shot story called "Wonder Island," was finally accepted and published in 1978 — Toriyama's first professional publication, produced by a man who had spent three years submitting work before anyone said yes.

The break that changed everything was his relationship with Kazuhiko Torishima, the Weekly Shonen Jump editor assigned to work with new talent. Torishima was famously demanding — he rejected Toriyama's early submissions repeatedly, pushing him to develop a cleaner line, faster pacing, and more genuinely funny gags. It was an adversarial mentorship, and Toriyama later credited Torishima's dissatisfaction with developing skills that might never have emerged without that pressure.

"Dr. Slump," which launched in 1980, was the series that established Toriyama as a major talent. The gag comedy about a brilliant but ridiculous inventor and his android daughter Arale was an immediate hit, winning the Shogakukan Manga Award and establishing Toriyama's distinctive visual humor and impossibly clean artwork. It ran for five years and sold tens of millions of copies — by any measure a career-defining success. Toriyama, exhausted by the weekly schedule, then asked his editor if he could end it and start something new.

Dragon Ball began in 1984 as a loose comedic adventure, intended by Toriyama to be relatively short. The series that would sell over 260 million copies, spawn multiple television series, films, and video game franchises, and define the battle shonen genre for generations — began as a tired man's attempt to try something different before he burned out completely.`,
    tags: ['Akira Toriyama', 'Dragon Ball', 'Dr. Slump', 'manga history', 'Weekly Shonen Jump', 'manga creators'],
    entities: ['Akira Toriyama', 'Kazuhiko Torishima', 'Weekly Shonen Jump', 'Aichi'],
    publishedAt: new Date('2026-05-17'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/akira-toriyama-early-career-before-dragon-ball',
  },
  {
    title: 'Rumiko Takahashi: How the Richest Woman in Manga Built Her Empire',
    slug: 'rumiko-takahashi-richest-woman-in-manga',
    category: 'creators',
    excerpt: 'Rumiko Takahashi has been publishing manga since 1978 and has sold over 200 million copies of her work. Her career is one of the most durable creative achievements in the history of the medium.',
    content: `Rumiko Takahashi was a college student studying at Gekiga Sonjuku — an art school run by Kazuo Koike, the author of "Lone Wolf and Cub" — when she submitted a short manga story to Shonen Sunday in 1978. She was 22. The story was accepted and published, beginning a professional career that has now lasted nearly five decades without a single extended hiatus. Over that span she has sold more than 200 million copies of her manga in Japan alone, making her one of the best-selling manga artists in history and, by most estimates, the wealthiest woman to have made her fortune in comics.

Her first major serialized work, "Urusei Yatsura," launched in 1978 and ran for nine years, establishing the template for what would become her signature genre: romantic comedy structured around an irresponsible male lead, an extraordinarily capable female lead who is in some way supernatural or alien, and an escalating supporting cast of absurd characters generating increasingly complex comedic situations. The formula sounds simple. Applied across 34 collected volumes, it produced some of the funniest and most human manga published in that era.

What followed was remarkable not just for its quality but for its consistency. "Maison Ikkoku" (1980–1987) is still considered one of the finest romance manga ever written — a slow, painful, funny story about grief and love that is completely distinct in tone from the anarchic comedy of "Urusei Yatsura." "Ranma ½" (1987–1996) returned to supernatural romantic comedy and became a massive international success, particularly in North America, where it was among the first manga to find a mainstream bookstore audience. "InuYasha" (1996–2008) demonstrated that after twenty years of publishing, Takahashi could still write a long-form adventure series that ran for twelve years and maintained millions of devoted readers.

She has never taught publicly, rarely gives interviews, and lives a largely private life in Tokyo. What she has said about her process emphasizes persistence and consistency over inspiration: she writes and draws on a schedule, every week, regardless of how she feels about the work. For someone who has produced this volume of material at this level of quality, that discipline is either the most boring explanation imaginable or the most profound one.

In 2019, Takahashi received the Eisner Award for Best Writer/Artist — one of American comics' highest honors — becoming one of very few manga artists to receive it. The same year, a new "InuYasha" sequel, "Yashahime: Princess Half-Demon," launched as an anime. She was 63 years old and still serializing "Mao," a new manga, in Shonen Sunday. She has not slowed down.`,
    tags: ['Rumiko Takahashi', 'Urusei Yatsura', 'InuYasha', 'Ranma ½', 'manga history', 'women in manga'],
    entities: ['Rumiko Takahashi', 'Kazuo Koike', 'Shonen Sunday', 'Tokyo'],
    publishedAt: new Date('2026-05-19'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/rumiko-takahashi-richest-woman-in-manga',
  },
  {
    title: 'Kentaro Miura and the Twenty-Five-Year Creation of Berserk',
    slug: 'kentaro-miura-twenty-five-years-of-berserk',
    category: 'creators',
    excerpt: 'Kentaro Miura spent over 30 years drawing Berserk, producing some of the most intricate artwork in manga history. When he died in 2021, he left behind an unfinished masterpiece and an industry in mourning.',
    content: `Kentaro Miura published the first chapter of "Berserk" in 1989. He was 23 years old. When he died in May 2021, he was 54, and the series was still unfinished. In the three decades between those two dates, he produced 364 chapters of what is widely considered the greatest dark fantasy manga ever created — a work of such density, visual ambition, and thematic weight that it fundamentally reshaped what readers believed manga could be.

The story of Guts, a lone swordsman scarred by betrayal and hunted by demons, operates simultaneously as a revenge narrative, a meditation on free will and fate, and an extended psychological study of trauma and survival. What distinguished "Berserk" from other dark fantasy manga was not its darkness — though it is extraordinarily dark — but the precision and intentionality of everything within it. Miura was not simply choosing to be grim; he was using grimness as an instrument to explore specific questions about human endurance that he considered genuinely important.

The artwork is in a category of its own. Miura drew at a level of detail that other professional manga artists have described as simply incomprehensible — backgrounds that are elaborately architectural, armor that is mechanically coherent, crowd scenes where every face is individuated. A single page of "Berserk" could take days to complete, which is part of why the series was published irregularly and why fans became accustomed to waiting months or years between chapters. The hiatuses were not laziness; they were the cost of Miura's standards.

In his later years, Miura took extended breaks from "Berserk" to work on other projects and, by many accounts, to rest. When he did publish new chapters, they were frequently the most visually accomplished work of his career. The final chapters he completed before his death — depicting Guts and his companions arriving at a long-awaited destination — are among the most beautiful pages he ever drew.

His death from an aortic dissection was announced by his publisher, Young Animal, on May 20, 2021. The response from the manga and anime community was unlike anything seen for any other creator's passing — not just grief, but the particular grief of a story permanently interrupted. Studio Gaga, the group of artists who had assisted Miura for years and knew his intentions for the story, announced they would continue "Berserk" under the supervision of Miura's longtime friend Kouji Mori. The continuation began in 2022. Fans remain divided on whether it is the right decision. The question itself is a measure of how much the original meant.`,
    tags: ['Kentaro Miura', 'Berserk', 'manga history', 'dark fantasy manga', 'Young Animal', 'manga art'],
    entities: ['Kentaro Miura', 'Kouji Mori', 'Young Animal', 'Studio Gaga'],
    publishedAt: new Date('2026-05-21'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/kentaro-miura-twenty-five-years-of-berserk',
  },
  {
    title: 'CLAMP: Four Women Who Quietly Became One of Manga\'s Greatest Forces',
    slug: 'clamp-four-women-manga-greatest-forces',
    category: 'creators',
    excerpt: 'CLAMP began as a doujinshi circle of 11 women making fan comics in the 1980s. Today, as a collective of four, they have sold over 100 million manga volumes across genres from children\'s fantasy to apocalyptic horror.',
    content: `CLAMP began as a doujinshi circle of eleven women making fan comics and selling them at Comiket in the late 1980s. They were producing unauthorized stories about characters from other people's manga, working without professional training, driven entirely by their own enthusiasm and collective imagination. By the time they made their professional debut in 1989, the group had narrowed to four core members — Satsuki Igarashi, Tsubaki Nekoi, Mokona, and writer Nanase Ohkawa — who have worked together continuously in the decades since. Few creative groups of any kind have maintained this level of productivity and range across a comparable span of time.

The CLAMP bibliography is extraordinary in its variety. "Cardcaptor Sakura" (1996–2000) is a children's magical girl story of warmth and emotional intelligence, considered a masterpiece of its genre. "X/1999" (serialized from 1992) is an apocalyptic battle narrative of such intensity that it was eventually suspended because its content — specifically, the detailed depictions of urban destruction — became too sensitive to publish in the aftermath of real-world disasters. "Tokyo Babylon" is a quietly devastating mystery about social work and corruption. "xxxHOLiC" is a supernatural anthology exploring debt, desire, and consequence. "Chobits" is a philosophical science fiction romance about what it means to love an artificial being. That these were all produced by the same four-person team, sometimes simultaneously, is difficult to reconcile with any normal understanding of creative bandwidth.

What unifies CLAMP's work beneath its surface variety is a preoccupation with the weight of connections between people — the sense that relationships carry consequences that extend across time, sometimes across multiple lifetimes. Their narratives rarely offer easy resolution; characters pay costs for their choices, love does not automatically overcome obstacles, and the past is never simply past. This thematic seriousness coexists, in their children's work especially, with genuine lightness and delight, which is what makes "Cardcaptor Sakura" so difficult to classify and so rewarding to read at any age.

Their influence on manga and anime is pervasive and often unacknowledged. The visual style they developed — extremely elongated figures, elaborate costume design, highly decorative page composition — became the aesthetic template for an entire generation of manga artists who absorbed CLAMP's work during the 1990s and took it as a baseline for what professional manga looked like. When you recognize that style in other artists' work, you are usually seeing CLAMP's influence operating two or three steps removed from the source.`,
    tags: ['CLAMP', 'Cardcaptor Sakura', 'X/1999', 'women in manga', 'manga history', 'magical girl', 'doujinshi'],
    entities: ['CLAMP', 'Nanase Ohkawa', 'Mokona', 'Satsuki Igarashi', 'Tsubaki Nekoi'],
    publishedAt: new Date('2026-05-23'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/clamp-four-women-manga-greatest-forces',
  },

  // ── SHONEN ───────────────────────────────────────────────────────────────────
  {
    title: 'How Dragon Ball Invented the Template Every Battle Shonen Still Uses',
    slug: 'how-dragon-ball-invented-battle-shonen-template',
    category: 'shonen',
    excerpt: 'Dragon Ball was not the first battle shonen manga, but it was the first to assemble all the genre\'s defining elements into a single coherent package. Every series since has worked in its shadow.',
    content: `Dragon Ball was not the first manga to feature martial arts tournaments, power-scaling combat, or a young male protagonist becoming progressively stronger through training and willpower. But it was the first series to combine all of these elements into a structure so satisfying and replicable that it became the template for an entire genre. When "Naruto," "Bleach," "My Hero Academia," "Demon Slayer," and dozens of other major shonen manga were designed, their creators were consciously or unconsciously building on the Dragon Ball blueprint.

The key innovation was the "tournament arc" structure: heroes and rivals compete in a formalized setting, which provides a clean narrative justification for fight after fight without requiring elaborate world-building or plot consequence. Toriyama inherited this structure from earlier martial arts manga, but he refined it by attaching it to a clear power hierarchy — the sense that characters occupy quantifiable positions in a ranking system, and that the protagonist's journey is defined by their movement up that ranking. Reader satisfaction was tied directly to measurable progress.

Equally important was what Toriyama did with the concept of the rival. Vegeta, introduced as a villain in the Saiyan arc, was the template for the "rival who becomes an ally without ever fully becoming a friend" — a character whose antagonism is gradually transformed into something more complex through shared experience, but who never fully subordinates their pride or their competitive drive to their comrades. This specific character type recurs so consistently across shonen manga that it reads as genre law.

The "training arc" — a period in which the protagonist undergoes extreme hardship to achieve a power breakthrough that will allow them to face the next challenge — is so ubiquitous in shonen manga that readers discuss it by name, as a known genre convention. Toriyama developed this rhythm in Dragon Ball and subsequent series reproduced it so faithfully that it became a formula: introduce threat, demonstrate that current power is insufficient, training sequence, breakthrough, confrontation. The formula works because it provides escalating stakes with emotional payoff, and Toriyama discovered this essentially by trial and error in response to reader survey data.

The scale inflation — the way each new Dragon Ball villain is dramatically more powerful than the last, requiring a corresponding increase in the hero's power — became a trap that the series itself eventually strained against and that many successor series have fallen into. But the trap is the shadow side of an insight: that readers of this kind of story find emotional satisfaction in escalation, in the sense that the stakes are always genuinely higher than anything that came before.`,
    tags: ['Dragon Ball', 'shonen manga', 'Akira Toriyama', 'battle manga', 'manga history', 'shonen formula'],
    entities: ['Akira Toriyama', 'Vegeta', 'Goku'],
    publishedAt: new Date('2026-05-25'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/how-dragon-ball-invented-battle-shonen-template',
  },
  {
    title: 'The Big Three Era: Why Naruto, Bleach, and One Piece Defined a Generation',
    slug: 'the-big-three-era-naruto-bleach-one-piece',
    category: 'shonen',
    excerpt: 'Between roughly 2001 and 2015, three manga series dominated Weekly Shonen Jump with a consistency that has not been replicated before or since. What made the Big Three era so singular — and why it ended.',
    content: `For approximately fifteen years, three manga series occupied a position in Weekly Shonen Jump that no combination of series has occupied before or since. "One Piece" began in 1997. "Naruto" launched in 1999. "Bleach" followed in 2001. At their peak, all three were simultaneously running in Jump, simultaneously airing as anime series, and simultaneously selling millions of collected volumes worldwide. They were called, without irony, the "Big Three," and the label has stuck because it accurately describes something real: a moment of unusual concentration of talent and popularity that shaped an entire generation's understanding of what shonen manga is.

Each series staked out distinct emotional territory despite sharing the same genre conventions. "One Piece" is fundamentally a story about freedom and belonging — about found family, the open sea, and the belief that a world worth living in is worth fighting for. Its tonal range is extraordinary: it can be genuinely funny, then genuinely devastating, sometimes within the same chapter. Eiichiro Oda's visual invention is relentless; after nearly three decades, "One Piece" is still introducing environments and characters unlike anything that appeared before.

"Naruto" is a story about loneliness and recognition — about a child who was rejected by his community and who spends years earning his way back into it through sheer force of will and unconditional love. Masashi Kishimoto's series resonated so deeply in part because its emotional core is universally accessible: the desire to be seen, acknowledged, and accepted by people who have decided you are not worth their attention. The series has its structural weaknesses, but its emotional clarity remained consistent throughout.

"Bleach" was the most stylistically distinctive of the three — Tite Kubo's fashion-forward character design, his deeply atmospheric Soul Society arc, and his ear for cool dialogue created something that appealed on aesthetics as much as narrative. Its later arcs are universally acknowledged to have structural problems, but the first three hundred or so chapters represent a genuinely original creative vision applied to the shonen format.

The Big Three era effectively ended when "Naruto" concluded in 2014 and "Bleach" ended in 2016. "One Piece" continues and may outlast the concept of the era entirely. What succeeded the Big Three — "My Hero Academia," "Demon Slayer," "Jujutsu Kaisen," "Chainsaw Man" — has produced excellent manga and enormous commercial success. But no single combination has dominated the cultural conversation the way the Big Three did, perhaps because the media landscape has fragmented too thoroughly to allow three series to define a whole generation's taste.`,
    tags: ['Big Three', 'Naruto', 'Bleach', 'One Piece', 'Weekly Shonen Jump', 'shonen manga', 'anime history'],
    entities: ['Eiichiro Oda', 'Masashi Kishimoto', 'Tite Kubo', 'Weekly Shonen Jump'],
    publishedAt: new Date('2026-05-27'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/the-big-three-era-naruto-bleach-one-piece',
  },

  // ── SEINEN ───────────────────────────────────────────────────────────────────
  {
    title: 'Why Berserk, Vagabond, and Monster Are Considered the Gold Standard of Seinen',
    slug: 'berserk-vagabond-monster-gold-standard-seinen',
    category: 'seinen',
    excerpt: 'Three manga series — each decades in the making — have set a ceiling for what the seinen demographic can achieve. Here\'s what distinguishes them and why their influence remains so pervasive.',
    content: `The demographic category "seinen" — manga aimed at young adult men, as opposed to the teenage audience of "shonen" — encompasses an enormous range of work, from action-oriented titles barely distinguishable from shonen to meditative literary narratives that have more in common with European graphic novels than with Weekly Shonen Jump. Within this range, three series are consistently cited by readers, critics, and other manga artists as representing the highest achievable standard: "Berserk" by Kentaro Miura, "Vagabond" by Takehiko Inoue, and "Monster" by Naoki Urasawa.

What these three share is a commitment to psychological depth that their genre cousins often forego in favor of spectacle. In "Berserk," the combat is spectacular — Miura draws action sequences of extraordinary force and clarity — but the violence is never without psychological weight. Every fight scene in "Berserk" is also a scene about trauma, about the cost of survival, about what repeated exposure to death does to a person. The spectacle and the interiority reinforce each other rather than existing in separate compartments.

"Vagabond" is a fictionalized account of the legendary swordsman Miyamoto Musashi's early life, and Takehiko Inoue uses the samurai genre as a vehicle for a prolonged meditation on what it means to pursue mastery. Musashi's violence is initially indiscriminate and almost unconscious; as the series progresses, he gradually develops the interiority to understand why he fights and what he is fighting toward. The artwork is painted rather than inked, photorealistic in some panels and expressionistically abstract in others, and it is the most visually beautiful work in weekly manga serialization. Like "Berserk," "Vagabond" has been on indefinite hiatus for years — Inoue has described being unable to write Musashi out of the position he has left him in. The ambition of the project may have outrun the form.

"Monster" by Naoki Urasawa operates differently: it is a thriller, deliberately structured around the conventions of the genre, following a Japanese surgeon in Germany who saves a child who grows up to become a serial killer. What makes it remarkable is the moral seriousness with which Urasawa treats his villain — Johan Liebert is genuinely monstrous and genuinely comprehensible simultaneously, which is an extremely difficult balance to achieve. Urasawa spent years investigating how evil forms in people who were not born evil, and the answer the series gives is uncomfortable and convincing.

Together, these three series have established an implicit standard: that the highest achievement of manga is not entertainment — though all three are deeply entertaining — but a genuine engagement with questions about how human beings live and what they owe each other. That they have all influenced hundreds of subsequent creators is simply the measurement of how comprehensively they succeeded.`,
    tags: ['Berserk', 'Vagabond', 'Monster', 'seinen manga', 'Kentaro Miura', 'Takehiko Inoue', 'Naoki Urasawa'],
    entities: ['Kentaro Miura', 'Takehiko Inoue', 'Naoki Urasawa', 'Miyamoto Musashi'],
    publishedAt: new Date('2026-05-29'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/berserk-vagabond-monster-gold-standard-seinen',
  },

  // ── LIGHT NOVELS ─────────────────────────────────────────────────────────────
  {
    title: 'The Origins of Isekai: From Internet Message Boards to Global Domination',
    slug: 'origins-of-isekai-internet-to-global-domination',
    category: 'light-novels',
    excerpt: 'The isekai genre — stories about ordinary people transported to fantasy worlds — grew from anonymous amateur fiction posted on Japanese message boards in the early 2000s into the dominant force in light novel publishing.',
    content: `The word "isekai" means "different world" in Japanese, and as a genre label it describes stories in which a protagonist — typically an ordinary person from contemporary Japan — is transported into another world, usually a fantasy setting, often with special powers or game-like mechanics that give them an advantage over the inhabitants. The genre is now so commercially dominant that in some years, isekai-adjacent titles have constituted a majority of new light novel anime adaptations. It did not exist, as a recognized category, before approximately 2000.

The genre's origins are inseparable from the internet. In the late 1990s and early 2000s, a Japanese website called Shōsetsuka ni Narō ("Let's Become a Novelist") emerged as a platform where amateur writers could post fiction freely and receive reader feedback. The site was not designed for any particular genre, but certain types of stories attracted large audiences: adventure narratives with male protagonists who enter fantasy worlds with abilities that make them exceptional. The feedback loop between reader desire and writer production was immediate — stories that resonated got continued; stories that didn't were abandoned. The result was an iterative distillation of what readers of this type of story found satisfying.

What those readers found satisfying was, it turned out, quite specific. The wish fulfillment structure of isekai — in which someone who feels powerless or unrecognized in their ordinary life is instantly granted significance in a new world — has obvious psychological logic. The game-like mechanics (stat systems, level progression, skill acquisition) that characterize many isekai narratives make that progression legible and measurable in ways that traditional fantasy narratives do not. The protagonist's advantage over natives of the fantasy world provides a consistent source of narrative satisfaction.

The transition from internet fiction to commercial light novels was gradual but comprehensive. "Sword Art Online" by Reki Kawahara, originally posted on the author's website, was published as a light novel in 2009 and became one of the best-selling light novel series in history. "Re:Zero Starting Life in Another World" followed a similar path. "That Time I Got Reincarnated as a Slime," "KonoSuba," "The Rising of the Shield Hero" — the major isekai franchises of the 2010s all originated as amateur internet fiction before being refined, published, and eventually adapted into anime.

The genre's critics argue that the wish fulfillment structure produces narratives that are emotionally shallow, that the game-like mechanics substitute legibility for genuine storytelling complexity, and that the sheer volume of isekai content produced annually has saturated the market to the point where genuine innovation is difficult to identify. The genre's defenders argue that wish fulfillment is not inherently artistically lesser, that the best isekai works use the genre's conventions as tools for exploring real psychological and philosophical questions, and that the volume of production is simply what happens when a form resonates with a large audience. Both arguments contain truth.`,
    tags: ['isekai', 'light novels', 'Sword Art Online', 'anime industry', 'web novels', 'Shōsetsuka ni Narō'],
    entities: ['Reki Kawahara'],
    publishedAt: new Date('2026-05-31'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/origins-of-isekai-internet-to-global-domination',
  },
  {
    title: 'Sword Art Online: The Light Novel That Accidentally Launched a Genre Empire',
    slug: 'sword-art-online-light-novel-that-launched-a-genre-empire',
    category: 'light-novels',
    excerpt: 'Reki Kawahara wrote the original Sword Art Online story in 2002 as a personal project that he posted on his own website. Twenty years later, it is one of the highest-grossing anime franchises in history.',
    content: `In 2002, a Japanese university student named Reki Kawahara wrote a story and posted it on his personal website. The story was called "Sword Art Online," and it described a near-future virtual reality massively multiplayer game in which the players become trapped — the logout function has been disabled, and dying in the game means dying in reality. The premise combined virtual reality science fiction with the survival horror of being unable to escape a situation, and Kawahara used it to explore the psychology of someone who decides that a virtual world might be as worth living for as the real one.

The original web publication ran to about a thousand pages before Kawahara decided he had finished what he wanted to say with the concept and moved on. He entered a light novel competition with a different story. That story won, bringing him to the attention of ASCII Media Works, who asked if he had anything else. He mentioned the web novel. They published "Sword Art Online" as a light novel series beginning in 2009.

The series sold extraordinarily well — millions of copies in Japan, significant sales internationally, and enough commercial momentum to warrant an anime adaptation in 2012 produced by A-1 Pictures. The anime's first arc, covering the original "Sword Art Online" game scenario, reached a mainstream audience that light novels alone could not. Within months of its airing, SAO had become a cultural phenomenon large enough to inspire imitations, parodies, and earnest academic essays about virtual reality, identity, and the nature of meaningful experience.

The commercial success was also, inevitably, controversial. Critics of the series pointed to structural weaknesses in the storytelling — pacing problems, a male protagonist whose primary characterization is competence, female characters whose agency is frequently subordinated to their relationship with the protagonist. These criticisms are fair. The series' defenders pointed to the genuine emotional intelligence of its best scenes, the consistency with which Kawahara returns to questions about what makes an experience real, and the fact that the virtual reality premises of the series anticipated real-world virtual reality discourse by years.

What SAO's success most demonstrably accomplished, beyond its own franchise, was to prove the commercial viability of adapting virtual reality game-mechanic fiction into anime. "Log Horizon," "No Game No Life," "Overlord," and dozens of other series exploring similar territory followed its success. The isekai genre's turn toward game-like mechanics and stat-system fantasy owes a significant debt to SAO's proof that these elements work for a mass anime audience. Kawahara's web novel, written as a personal project with no commercial intention, effectively defined a decade of anime production.`,
    tags: ['Sword Art Online', 'Reki Kawahara', 'light novels', 'isekai', 'anime industry', 'virtual reality anime'],
    entities: ['Reki Kawahara', 'A-1 Pictures', 'ASCII Media Works'],
    publishedAt: new Date('2026-06-01'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/sword-art-online-light-novel-that-launched-a-genre-empire',
  },

  // ── MANHWA ───────────────────────────────────────────────────────────────────
  {
    title: 'How Korean Webtoons Invented Vertical Scrolling as a Storytelling Form',
    slug: 'korean-webtoons-invented-vertical-scrolling',
    category: 'manhwa',
    excerpt: 'When Korean web comics moved from print to the internet in the early 2000s, artists didn\'t just digitize the existing format — they invented a completely new one. The vertical scroll changed everything.',
    content: `Korean comics — manhwa — have a long history distinct from Japanese manga, but they were occupying a similar cultural position in the late 1990s: primarily print publications, serialized in magazines, collected in volumes for purchase. Then the internet arrived, Korean broadband penetration became among the highest in the world, and a group of artists and platforms made a decision that would change how comics are read globally: they moved the format online and redesigned it completely for the new medium.

The crucial innovation was orientation. Print manhwa, like print manga, was designed to be read on a page — discrete bounded spaces of a fixed size. Online, the page boundary becomes arbitrary. You can read in any direction the scroll allows. Korean webtoon creators chose vertical scrolling, and then they built an entirely new visual grammar around what that choice enables.

In a vertically scrolling comic, pacing is controlled not by the page turn — a physical action — but by the scroll — a continuous gesture. This changes the rhythm of reading fundamentally. A dramatic moment in a print comic is staged at the bottom of a right-hand page, so that turning the page reveals the consequence with maximum impact. In a vertical scroll, tension is built by the amount of space between images: a creator who wants the reader to pause before a revelation simply increases the white space before the reveal, slowing the scroll and building anticipation physically. The medium is not neutral; it shapes what kinds of stories can be told effectively.

Korean platforms Naver Webtoon (now Webtoon) and Daum Kakao recognized early that this format had properties that print could not replicate — specifically, that it was native to the smartphone screen. A webtoon reads naturally on a phone held vertically, because the phone's natural orientation and the reading orientation are identical. This alignment between medium and device was a significant competitive advantage that became increasingly important as smartphone penetration spread globally.

By 2014, Webtoon had launched English-language services, and the format began attracting readers who had never read manhwa before. By the early 2020s, "vertical scroll comic" had effectively become a global standard, with American comics publishers experimenting with the format, Japanese companies launching their own vertical scroll platforms, and European artists producing work in the medium. An aesthetic and technical decision made by Korean webcomic creators in the early 2000s had, within twenty years, restructured how a significant portion of global comics was produced and consumed.`,
    tags: ['manhwa', 'webtoon', 'Korean comics', 'Naver Webtoon', 'digital comics', 'vertical scrolling'],
    entities: ['Naver', 'Korea'],
    publishedAt: new Date('2026-06-01'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/korean-webtoons-invented-vertical-scrolling',
  },
  {
    title: 'Solo Leveling: From Korean Web Novel to Global Manhwa Phenomenon',
    slug: 'solo-leveling-web-novel-to-global-phenomenon',
    category: 'manhwa',
    excerpt: 'Solo Leveling began as a web novel serialized on a Korean fiction platform in 2016. By 2024, its anime adaptation had attracted millions of viewers worldwide. Here\'s how it happened.',
    content: `"Solo Leveling" began in 2016 as a web novel written by Chugong (Chu-gong), serialized on KakaoPage — a Korean platform for amateur and professional fiction. The story follows Sung Jinwoo, a hunter ranked as the weakest in a world where people with supernatural abilities fight in mysterious dungeons for resources. After nearly dying in a dungeon accident, Jinwoo gains a unique ability that allows him to grow in power without limit, beginning a journey from absolute weakness to overwhelming strength. The premise is straightforward wish fulfillment, and it executed the formula exceptionally well.

The web novel's readership grew quickly, attracting enough attention that publisher D&C Media commissioned a manhwa adaptation with artwork by Jang Sung-rak (DUBU) in 2018. The decision to adapt the novel into manhwa rather than print manga or another format was commercially obvious — the Korean webtoon market was by then a proven vehicle for reaching large audiences — but the quality of DUBU's artwork transformed the adaptation into something beyond an illustration of the source text. His visual interpretation of Jinwoo's power awakening, and particularly his depiction of the protagonist's redesigned aesthetic as his powers grow, became the iconic version of the story.

The manhwa was serialized on Kakao Webtoon and released internationally through Webtoon, where it attracted readers who had no prior knowledge of the web novel. By the time its final chapter was published in 2021, it had been read by tens of millions of people across multiple languages. The print collection sold millions of copies in Korea and internationally — "Solo Leveling" was one of the first manhwa titles to receive significant shelf space in Western bookstore chains.

The anime adaptation, produced by A-1 Pictures and announced by Crunchyroll for 2024, represented a different kind of milestone: it was one of the first major manhwa properties to receive a high-profile Japanese anime adaptation rather than a Korean animated production. The decision signaled that the global manhwa market had achieved sufficient commercial weight to attract production investment from Japan's established animation industry, reversing a flow that had historically moved in only one direction.

"Solo Leveling" is not the most complex manhwa ever published. Its plot is essentially a power fantasy with a protagonist so thoroughly competent that dramatic tension comes primarily from scale rather than genuine uncertainty. But it executed its particular kind of story with enough craft and visual distinction to attract audiences far beyond the community of readers who had been following Korean web fiction since its origins. In doing so, it expanded the global market for manhwa in ways that are still being understood.`,
    tags: ['Solo Leveling', 'manhwa', 'webtoon', 'Korean comics', 'isekai', 'A-1 Pictures', 'Crunchyroll'],
    entities: ['Chugong', 'Jang Sung-rak', 'A-1 Pictures', 'Crunchyroll', 'Korea'],
    publishedAt: new Date('2026-06-02'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/solo-leveling-web-novel-to-global-phenomenon',
  },

  // ── INDUSTRY ─────────────────────────────────────────────────────────────────
  {
    title: 'How Crunchyroll Went from Piracy Site to $1.2 Billion Acquisition',
    slug: 'crunchyroll-piracy-to-1-2-billion-acquisition',
    category: 'industry',
    excerpt: 'In 2006, Crunchyroll was a website where users uploaded pirated anime. By 2021, Sony paid $1.175 billion to acquire it. The story of how that transformation happened is also the story of modern anime\'s global expansion.',
    content: `Crunchyroll was founded in 2006 by a group of University of California, Berkeley students who wanted an easy way to watch anime online. Their initial approach was the same as thousands of fan communities: upload video files that other people had subtitled or recorded from Japanese television. The site grew quickly because it was convenient and free, and because the legal landscape for streaming video online was poorly defined enough that many participants did not fully register that they were operating a commercial business built on copyright infringement.

The turning point came in 2009, when Crunchyroll received investment from the venture capital firm Venrock and simultaneously began the transition to a legitimate streaming model. Under pressure from Japanese licensors and with new capital to negotiate properly, Crunchyroll struck deals to stream anime legally — specifically, to simulcast new episodes within hours of their Japanese broadcast with English subtitles. This was not a new idea; fansubbers had been doing it for years. But doing it legally, with the rights holders receiving payment, was genuinely new for anime, and the audience that had been built through the piracy era was large enough to pay for it.

The legal model proved commercially viable faster than most observers expected. Crunchyroll built a subscription business — a small monthly fee for ad-free access and simultaneous release — that attracted millions of paying users. The anime industry, which had struggled for years with the problem of Western piracy undermining their revenue, suddenly had a distribution partner with a global footprint and an audience it had not been able to reach through traditional licensing channels.

By 2013, Crunchyroll had over 200,000 paying subscribers. By 2020, it had over 3 million. AT&T, which had acquired the site through its purchase of Otter Media in 2018, recognized what it had: not just a streaming service but the infrastructure of global anime fandom. When Sony's Funimation approached about acquisition, the price of $1.175 billion reflected the value of that infrastructure — the library, the subscriber base, the established relationships with Japanese producers, and the brand recognition among anime fans worldwide.

The acquisition merged Crunchyroll and Funimation into a single entity, concentrating a majority of the Western anime streaming market under one corporate owner. Whether this concentration has been good or bad for anime fans, and for the industry's creative diversity, is a question that remains genuinely contested. What is not contested is that the path from piracy site to billion-dollar acquisition was, in retrospect, entirely coherent: Crunchyroll built the audience; the audience proved the market; the market attracted the capital.`,
    tags: ['Crunchyroll', 'anime industry', 'streaming', 'anime business', 'Funimation', 'Sony', 'simulcast'],
    entities: ['Crunchyroll', 'Funimation', 'Sony', 'AT&T', 'Venrock'],
    publishedAt: new Date('2026-06-02'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/crunchyroll-piracy-to-1-2-billion-acquisition',
  },
  {
    title: 'The Simulcast Revolution: How Same-Day Streaming Ended the Fansub Era',
    slug: 'simulcast-revolution-how-streaming-killed-fansubs',
    category: 'industry',
    excerpt: 'When Crunchyroll launched legal simulcasting in 2009, it offered subtitled anime within hours of Japanese broadcast. The fansub community largely dissolved within years. Here\'s what changed and what was lost.',
    content: `Before 2009, the path a new anime episode took from Japanese television to Western fans typically ran through the fansub underground. A group of volunteers — one with Japanese fluency, one with timing software, one with a source recording — would produce subtitled files and distribute them through BitTorrent and IRC channels, usually within a day or two of the Japanese broadcast. For dedicated anime fans, this was simply how it worked: you found your tracker, you joined the right IRC channels, and you watched whatever was airing in Japan with a few days of lag.

The simulcast model — legal streaming with subtitles available on the same day as Japanese broadcast, sometimes within hours — removed the primary functional advantage of fansubs. A fan who could access Crunchyroll legally at the same time as the fansubbers' files were available had no practical reason to choose the pirated version. Most didn't. The major fansubbing groups, which had operated for years on the understanding that they provided a service no legal alternative offered, found themselves without a purpose, and most dissolved.

What the simulcast revolution accomplished for the industry was substantial: Japanese studios and licensors began receiving revenue from Western viewers for the first time at scale. The numbers were not always large — streaming rights fees in the early simulcast era were modest — but they represented a fundamental change in the economic relationship between Japanese anime production and the global audience. Productions could now include projected streaming revenue in their financing, changing what was viable to greenlight.

The speed of release also changed how international anime fandom operates. When an episode of a popular series airs in Japan on a given Saturday and is available legally in Europe and North America within hours, the global fan community experiences and discusses it simultaneously. The conversation that forms around a new episode — the speculation, the analysis, the reaction videos — is a single global conversation rather than a series of conversations happening with different time offsets as different regions receive the content at different speeds. This simultaneity has intensified certain aspects of fandom culture and created new forms of collective experience that the fansub era's delayed distribution could not produce.

What was lost was more subtle. The fansub community had developed significant expertise and care about translation quality — not merely accuracy, but the preservation of cultural context, the handling of untranslatable concepts, the choice between domesticating and foreignizing. Commercial simulcast subtitles, produced under time pressure to meet same-day release commitments, are sometimes rougher than the best fansub work. The trade-off between speed and quality has never been fully resolved, and the question of whether anime reaches English-language audiences in a form that accurately represents the original remains more complicated than the simulcast revolution's success might suggest.`,
    tags: ['simulcast', 'anime streaming', 'fansubs', 'Crunchyroll', 'anime industry', 'digital distribution'],
    entities: ['Crunchyroll', 'Japan'],
    publishedAt: new Date('2026-06-03'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/simulcast-revolution-how-streaming-killed-fansubs',
  },
  {
    title: 'Why Manga Magazines Are Dying But the Manga Industry Has Never Been Stronger',
    slug: 'manga-magazines-dying-industry-booming',
    category: 'industry',
    excerpt: 'Weekly Shonen Jump\'s print circulation has fallen from 6.5 million in 1995 to under one million today. In the same period, manga has become a global multi-billion-dollar industry. Understanding both things at once requires rethinking what manga actually is.',
    content: `In 1995, Weekly Shonen Jump sold 6.53 million copies per week, the highest circulation of any comic magazine in human history. Today, its print circulation is estimated at under one million. By the simple measure of print magazine sales, Japanese manga publishing has been in severe decline for thirty years. The headlines that accompany this statistic are usually variations on "manga is dying." They are wrong in an interesting way.

The print magazine is not manga; it is manga's original delivery mechanism. When the delivery mechanism becomes less relevant — when readers can access the same content more conveniently and cheaply through other channels — the mechanism contracts while the content may expand. This is what happened. The same Weekly Shonen Jump that sells under a million print copies per week now has over 9 million subscribers to its digital app, Shonen Jump+, which offers the same weekly chapters on any device for a fraction of the print cover price. Readers did not stop wanting manga; they stopped wanting paper.

The simultaneous global expansion of manga reading has been even more dramatic. The app Manga Plus, launched by Shueisha in 2019, allows readers anywhere in the world to read current Weekly Shonen Jump chapters in multiple languages on the day of publication, for free (with ads). In its first years of operation, it accumulated hundreds of millions of page views from countries that had previously had little or no legal access to current manga. The market that the print magazine could never serve — an international audience willing to read manga but unable to access imported Japanese magazines — is now accessible, and it is enormous.

The collected volume market tells a similar story of format shift rather than genuine decline. Physical tankobon sales in Japan have contracted alongside magazine sales, as digital volumes replace them for many readers. But total manga reading — across print, digital, app, and legal online access — has increased substantially. The global market for manga, measured in revenue, has grown significantly over the same period that magazine circulation has fallen.

What has changed, and what the circulation decline accurately reflects, is the economic structure of the industry. The magazine was not merely a delivery mechanism; it was a financing mechanism, an editorial filter, and a discovery mechanism for new talent. As it contracts, those functions must be rebuilt in the digital environment. Some of this is working well — Shonen Jump+ has successfully incubated new series that have found large audiences. Some of it remains uncertain. The key insight is that you cannot understand what is happening to manga by measuring only the thing that is getting smaller.`,
    tags: ['manga industry', 'Weekly Shonen Jump', 'digital manga', 'manga business', 'Shonen Jump+', 'manga market'],
    entities: ['Shueisha', 'Weekly Shonen Jump'],
    publishedAt: new Date('2026-06-03'),
    source: 'Catzye Editorial',
    sourceUrl: 'https://catzye.com/editorial/manga-magazines-dying-industry-booming',
  },
];

async function main() {
  console.log(`Seeding ${ESSAYS.length} editorial essays...`);
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
