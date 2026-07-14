/**
 * Seeds the "The Numbers Behind the Manga" numerology essay series and generates
 * each part with Gemini (the real numbers are computed in code and injected into
 * the prompt, so the readings stay accurate). Idempotent — re-running skips parts
 * that already exist.
 *
 * Run with: npx tsx scripts/seed-numerology-series.ts
 * Requires GEMINI_API_KEY (read from .env / .env.local) and DATABASE_URL.
 */
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

// Load env BEFORE importing lib/essay (which reads GEMINI_API_KEY at module load).
function loadEnv(file: string) {
  const full = path.resolve(process.cwd(), file);
  if (!fs.existsSync(full)) return;
  for (const line of fs.readFileSync(full, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    const key = m[1];
    if (process.env[key]) continue; // don't override real env
    let val = m[2].trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    process.env[key] = val;
  }
}
loadEnv('.env');
loadEnv('.env.local');

const prisma = new PrismaClient();

const SERIES = {
  title: 'The Numbers Behind the Manga',
  slug: 'numbers-behind-the-manga',
  category: 'numerology',
  description:
    'A numerological reading of anime and manga — the franchises, heroes, creators, and studios of the medium, seen through the numbers their names reduce to. A lens for paying attention, not a forecast.',
};

// Each part: the topic Gemini writes to, and the subjects whose numbers are
// computed in code and injected so the prose stays accurate.
const TOPICS: { topic: string; subjects: string[] }[] = [
  {
    topic:
      'How to Read Manga Through Numbers: the method, the nine archetypes, and why a lens is worth using even if it is only a lens',
    subjects: ['Manga', 'Anime', 'Shonen'],
  },
  {
    topic: "The Big Three's Destiny Numbers: what One Piece, Naruto, and Bleach reduce to and how it maps to their stories",
    subjects: ['One Piece', 'Naruto', 'Bleach'],
  },
  {
    topic:
      'The New Guard: reading Demon Slayer, Jujutsu Kaisen, and Chainsaw Man through the numbers that succeeded the Big Three',
    subjects: ['Demon Slayer', 'Jujutsu Kaisen', 'Chainsaw Man'],
  },
  {
    topic: "What the Heroes' Names Vibrate To: the numerology of Monkey D. Luffy, Son Goku, and Guts",
    subjects: ['Monkey D. Luffy', 'Son Goku', 'Guts'],
  },
  {
    topic: 'The Mangaka Numbers: reading Eiichiro Oda, Kentaro Miura, and Rumiko Takahashi through their names',
    subjects: ['Eiichiro Oda', 'Kentaro Miura', 'Rumiko Takahashi'],
  },
  {
    topic: 'Reading the Studios: what Studio Ghibli, MAPPA, Ufotable, and Studio Pierrot reduce to',
    subjects: ['Studio Ghibli', 'MAPPA', 'Ufotable', 'Studio Pierrot'],
  },
  {
    topic: 'The Numbers of the Machine: Shueisha and Weekly Shonen Jump, the institutions behind the medium',
    subjects: ['Shueisha', 'Weekly Shonen Jump'],
  },
  {
    topic: 'Master Numbers in Anime: the 11, 22, and 33 — the titles and names that carry the master vibrations',
    subjects: ['Neon Genesis Evangelion', 'Fullmetal Alchemist', 'Attack on Titan'],
  },
  // ── Second batch ──────────────────────────────────────────────────────────
  {
    topic: 'The Modern Titans: reading Attack on Titan, Death Note, and Fullmetal Alchemist through their numbers',
    subjects: ['Attack on Titan', 'Death Note', 'Fullmetal Alchemist'],
  },
  {
    topic: "The Rivals and Villains: what Madara Uchiha, Sosuke Aizen, and Frieza's names vibrate to",
    subjects: ['Madara Uchiha', 'Sosuke Aizen', 'Frieza'],
  },
  {
    topic: 'The Founding Fathers: Osamu Tezuka, Akira Toriyama, and Hayao Miyazaki through numerology',
    subjects: ['Osamu Tezuka', 'Akira Toriyama', 'Hayao Miyazaki'],
  },
  {
    topic: 'The Second Wave of Studios: Madhouse, Bones, Wit Studio, and Kyoto Animation',
    subjects: ['Madhouse', 'Bones', 'Wit Studio', 'Kyoto Animation'],
  },
  {
    topic: 'The Manhwa Numbers: reading Solo Leveling, Tower of God, and The God of High School',
    subjects: ['Solo Leveling', 'Tower of God', 'The God of High School'],
  },
  {
    topic: 'The Classics: Dragon Ball, Sailor Moon, and Cowboy Bebop through the numbers',
    subjects: ['Dragon Ball', 'Sailor Moon', 'Cowboy Bebop'],
  },
  {
    topic: 'The Isekai Constellation: Re:Zero, Sword Art Online, and That Time I Got Reincarnated as a Slime',
    subjects: ['Re:Zero', 'Sword Art Online', 'That Time I Got Reincarnated as a Slime'],
  },
  {
    topic: 'The Heroines: reading Nezuko Kamado, Mikasa Ackerman, and Sakura Kinomoto through their names',
    subjects: ['Nezuko Kamado', 'Mikasa Ackerman', 'Sakura Kinomoto'],
  },
  // ── Third batch ───────────────────────────────────────────────────────────
  {
    topic: 'The Seinen Giants: reading Berserk, Vagabond, and Vinland Saga through the numbers',
    subjects: ['Berserk', 'Vagabond', 'Vinland Saga'],
  },
  {
    topic: 'The Court and the Pitch: numerology of Haikyuu, Slam Dunk, and Blue Lock',
    subjects: ['Haikyuu', 'Slam Dunk', 'Blue Lock'],
  },
  {
    topic: "The New Heroes: what Tanjiro Kamado, Satoru Gojo, and Denji's names vibrate to",
    subjects: ['Tanjiro Kamado', 'Satoru Gojo', 'Denji'],
  },
  {
    topic: 'The Mecha Legends: Mobile Suit Gundam, Code Geass, and Gurren Lagann through numerology',
    subjects: ['Mobile Suit Gundam', 'Code Geass', 'Gurren Lagann'],
  },
  {
    topic: 'The Auteur Directors: reading Hideaki Anno, Makoto Shinkai, and Satoshi Kon',
    subjects: ['Hideaki Anno', 'Makoto Shinkai', 'Satoshi Kon'],
  },
  {
    topic: 'The Long-Runners: Detective Conan, Doraemon, and Crayon Shin-chan through the numbers',
    subjects: ['Detective Conan', 'Doraemon', 'Crayon Shin-chan'],
  },
  {
    topic: 'Romance and Shojo: numerology of Fruits Basket, Nana, and Ouran High School Host Club',
    subjects: ['Fruits Basket', 'Nana', 'Ouran High School Host Club'],
  },
  {
    topic: 'The Modern Studios: Trigger, CloverWorks, A-1 Pictures, and Toei Animation',
    subjects: ['Trigger', 'CloverWorks', 'A-1 Pictures', 'Toei Animation'],
  },
  // ── Fourth batch ──────────────────────────────────────────────────────────
  {
    topic: 'The Current Hitmakers: Spy x Family, My Hero Academia, and Tokyo Revengers through the numbers',
    subjects: ['Spy x Family', 'My Hero Academia', 'Tokyo Revengers'],
  },
  {
    topic: 'The Old Guard of Shonen: Yu Yu Hakusho, Rurouni Kenshin, and Hunter x Hunter',
    subjects: ['Yu Yu Hakusho', 'Rurouni Kenshin', 'Hunter x Hunter'],
  },
  {
    topic: 'The Numbers of Horror: Tokyo Ghoul, Parasyte, and the work of Junji Ito',
    subjects: ['Tokyo Ghoul', 'Parasyte', 'Junji Ito'],
  },
  {
    topic: "The Fated Protagonists: what Eren Yeager, Ichigo Kurosaki, and Light Yagami's names vibrate to",
    subjects: ['Eren Yeager', 'Ichigo Kurosaki', 'Light Yagami'],
  },
  {
    topic: 'The Cyberpunk Canon: Ghost in the Shell, Akira, and Steins;Gate through numerology',
    subjects: ['Ghost in the Shell', 'Akira', 'Steins;Gate'],
  },
  {
    topic: 'The Master Storytellers: Naoki Urasawa, Takehiko Inoue, and Hirohiko Araki',
    subjects: ['Naoki Urasawa', 'Takehiko Inoue', 'Hirohiko Araki'],
  },
  {
    topic: "JoJo and the Bizarre: reading JoJo's Bizarre Adventure, Jotaro Kujo, and Dio Brando",
    subjects: ["JoJo's Bizarre Adventure", 'Jotaro Kujo', 'Dio Brando'],
  },
  {
    topic: 'The Quiet Hearts: slice-of-life and drama in K-On, Clannad, and Your Lie in April',
    subjects: ['K-On', 'Clannad', 'Your Lie in April'],
  },
  // ── Fifth batch ───────────────────────────────────────────────────────────
  {
    topic: 'The New Wave Auteurs: reading Tatsuki Fujimoto, Gege Akutami, and Koyoharu Gotouge through their names',
    subjects: ['Tatsuki Fujimoto', 'Gege Akutami', 'Koyoharu Gotouge'],
  },
  {
    topic: 'The Rival Publishers: Kodansha, Shogakukan, and Weekly Shonen Magazine through the numbers',
    subjects: ['Kodansha', 'Shogakukan', 'Weekly Shonen Magazine'],
  },
  {
    topic: 'The Recent Phenomena: numerology of Frieren, Oshi no Ko, and Dandadan',
    subjects: ['Frieren', 'Oshi no Ko', 'Dandadan'],
  },
  {
    topic: 'The Magical Girls: reading Madoka Magica, Cardcaptor Sakura, and Pretty Cure',
    subjects: ['Madoka Magica', 'Cardcaptor Sakura', 'Pretty Cure'],
  },
  {
    topic: 'The Fantasy Adventurers: Fairy Tail, Black Clover, and The Seven Deadly Sins through numerology',
    subjects: ['Fairy Tail', 'Black Clover', 'The Seven Deadly Sins'],
  },
  {
    topic: 'The Retro Titans: reading Fist of the North Star, Saint Seiya, and Ranma ½',
    subjects: ['Fist of the North Star', 'Saint Seiya', 'Ranma'],
  },
  {
    topic: 'The Isekai Second Wave: Mushoku Tensei, KonoSuba, and Overlord through the numbers',
    subjects: ['Mushoku Tensei', 'KonoSuba', 'Overlord'],
  },
  {
    topic: "The Ultimate Villains: what Muzan Kibutsuji, Ryomen Sukuna, and All For One's names vibrate to",
    subjects: ['Muzan Kibutsuji', 'Ryomen Sukuna', 'All For One'],
  },
  // ── Sixth batch ───────────────────────────────────────────────────────────
  {
    topic: 'The Psychological Thrillers: Monster, Erased, and The Promised Neverland through numerology',
    subjects: ['Monster', 'Erased', 'The Promised Neverland'],
  },
  {
    topic: 'The Women Who Built Manga: reading CLAMP, Naoko Takeuchi, and Hiromu Arakawa through their names',
    subjects: ['CLAMP', 'Naoko Takeuchi', 'Hiromu Arakawa'],
  },
  {
    topic: 'The Sports Second String: Captain Tsubasa, Kuroko no Basket, and Ace of Diamond through the numbers',
    subjects: ['Captain Tsubasa', 'Kuroko no Basket', 'Ace of Diamond'],
  },
  {
    topic: 'The Idols and the Stage: numerology of Love Live, The Idolmaster, and Macross',
    subjects: ['Love Live', 'The Idolmaster', 'Macross'],
  },
  {
    topic: "Ghibli's Masterworks: reading Spirited Away, Princess Mononoke, and My Neighbor Totoro",
    subjects: ['Spirited Away', 'Princess Mononoke', 'My Neighbor Totoro'],
  },
  {
    topic: 'The Games of Skill: Hikaru no Go, Chihayafuru, and Kaiji through numerology',
    subjects: ['Hikaru no Go', 'Chihayafuru', 'Kaiji'],
  },
  {
    topic: 'The Gourmet Numbers: Food Wars, Toriko, and Restaurant to Another World through the numbers',
    subjects: ['Food Wars', 'Toriko', 'Restaurant to Another World'],
  },
  {
    topic: 'The Great Sensei: reading Katsuhiro Otomo, Mamoru Oshii, and Shinichiro Watanabe',
    subjects: ['Katsuhiro Otomo', 'Mamoru Oshii', 'Shinichiro Watanabe'],
  },
  // ── Seventh batch ─────────────────────────────────────────────────────────
  {
    topic: 'The Dark Fantasy Underground: Claymore, Devilman, and Dorohedoro through the numbers',
    subjects: ['Claymore', 'Devilman', 'Dorohedoro'],
  },
  {
    topic: 'The Comedy Kings: numerology of Gintama, Bobobo-bo Bo-bobo, and Saiki K',
    subjects: ['Gintama', 'Bobobo-bo Bo-bobo', 'Saiki K'],
  },
  {
    topic: 'The Tearjerkers: reading Anohana, Violet Evergarden, and A Silent Voice through their numbers',
    subjects: ['Anohana', 'Violet Evergarden', 'A Silent Voice'],
  },
  {
    topic: 'The Space Operas: Legend of the Galactic Heroes, Space Battleship Yamato, and Outlaw Star',
    subjects: ['Legend of the Galactic Heroes', 'Space Battleship Yamato', 'Outlaw Star'],
  },
  {
    topic: 'The Modern Dark Shonen: Hell&#39;s Paradise, Kaiju No. 8, and Sakamoto Days through numerology',
    subjects: ["Hell's Paradise", 'Kaiju No. 8', 'Sakamoto Days'],
  },
  {
    topic: 'The Legendary Studios II: Gainax, Production I.G, and Sunrise through the numbers',
    subjects: ['Gainax', 'Production I.G', 'Sunrise'],
  },
  {
    topic: 'The Enduring Franchises: numerology of Pokemon, Digimon, and Yu-Gi-Oh',
    subjects: ['Pokemon', 'Digimon', 'Yu-Gi-Oh'],
  },
  {
    topic: 'The Web Manhwa Wave: The Beginning After the End, Omniscient Reader, and Noblesse through the numbers',
    subjects: ['The Beginning After the End', 'Omniscient Reader', 'Noblesse'],
  },
  // ── Eighth batch ──────────────────────────────────────────────────────────
  {
    topic: "The Villain Second Wave: what Meruem, Johan Liebert, and Askeladd's names vibrate to",
    subjects: ['Meruem', 'Johan Liebert', 'Askeladd'],
  },
  {
    topic: 'The Romantic Comedies: Kaguya-sama, Toradora, and The Quintessential Quintuplets through numerology',
    subjects: ['Kaguya-sama', 'Toradora', 'The Quintessential Quintuplets'],
  },
  {
    topic: 'The Death Games: numerology of Danganronpa, Future Diary, and Kakegurui',
    subjects: ['Danganronpa', 'Future Diary', 'Kakegurui'],
  },
  {
    topic: 'The Music Manga: reading Beck, Bocchi the Rock, and Given through the numbers',
    subjects: ['Beck', 'Bocchi the Rock', 'Given'],
  },
  {
    topic: "The Post-Apocalyptic Visions: Dr. Stone, Made in Abyss, and Girls' Last Tour through numerology",
    subjects: ['Dr. Stone', 'Made in Abyss', "Girls' Last Tour"],
  },
  {
    topic: 'The Demons and Gods: Blue Exorcist, Noragami, and Nura Rise of the Yokai Clan through the numbers',
    subjects: ['Blue Exorcist', 'Noragami', 'Nura Rise of the Yokai Clan'],
  },
  {
    topic: 'The Crime Underworld: numerology of Black Lagoon, 91 Days, and The Way of the Househusband',
    subjects: ['Black Lagoon', '91 Days', 'The Way of the Househusband'],
  },
  {
    topic: 'The Historical Epics: Kingdom, Golden Kamuy, and Drifters through the numbers',
    subjects: ['Kingdom', 'Golden Kamuy', 'Drifters'],
  },
  // ── Ninth batch ───────────────────────────────────────────────────────────
  {
    topic: 'The Shonen Newcomers: reading Undead Unluck, Mashle, and Blue Box through their numbers',
    subjects: ['Undead Unluck', 'Mashle', 'Blue Box'],
  },
  {
    topic: 'The Robots and the Soul: Astro Boy, Vivy, and Plastic Memories through numerology',
    subjects: ['Astro Boy', 'Vivy', 'Plastic Memories'],
  },
  {
    topic: 'The School-Life Comedies: numerology of Assassination Classroom, Nichijou, and Azumanga Daioh',
    subjects: ['Assassination Classroom', 'Nichijou', 'Azumanga Daioh'],
  },
  {
    topic: 'The Sci-Fi Minds: Psycho-Pass, Ergo Proxy, and Serial Experiments Lain through the numbers',
    subjects: ['Psycho-Pass', 'Ergo Proxy', 'Serial Experiments Lain'],
  },
  {
    topic: 'The Fighting Spirits: reading Baki, Kengan Ashura, and Hajime no Ippo through numerology',
    subjects: ['Baki', 'Kengan Ashura', 'Hajime no Ippo'],
  },
  {
    topic: 'The Vampire Chronicles: Hellsing, Vampire Hunter D, and Seraph of the End through the numbers',
    subjects: ['Hellsing', 'Vampire Hunter D', 'Seraph of the End'],
  },
  {
    topic: 'The Mind Games: numerology of Akagi, Liar Game, and One Outs',
    subjects: ['Akagi', 'Liar Game', 'One Outs'],
  },
  {
    topic: 'The Racing Legends: reading Initial D, Redline, and Capeta through the numbers',
    subjects: ['Initial D', 'Redline', 'Capeta'],
  },
  // ── Tenth batch ───────────────────────────────────────────────────────────
  {
    topic: "The Josei Hearts: Honey and Clover, Paradise Kiss, and Princess Jellyfish through numerology",
    subjects: ['Honey and Clover', 'Paradise Kiss', 'Princess Jellyfish'],
  },
  {
    topic: "The Yokai and Folklore: GeGeGe no Kitaro, Mushishi, and Natsume's Book of Friends through the numbers",
    subjects: ['GeGeGe no Kitaro', 'Mushishi', "Natsume's Book of Friends"],
  },
  {
    topic: 'The Cooking Second Course: Sweetness and Lightning, Yakitate Japan, and Delicious in Dungeon through numerology',
    subjects: ['Sweetness and Lightning', 'Yakitate Japan', 'Delicious in Dungeon'],
  },
  {
    topic: 'The Sports Underdogs: reading Ping Pong the Animation, Yowamushi Pedal, and Free through the numbers',
    subjects: ['Ping Pong the Animation', 'Yowamushi Pedal', 'Free'],
  },
  {
    topic: 'The Time Travelers: Orange, The Girl Who Leapt Through Time, and ReLIFE through numerology',
    subjects: ['Orange', 'The Girl Who Leapt Through Time', 'ReLIFE'],
  },
  {
    topic: 'The Techno Dystopias of Tsutomu Nihei: Blame, Biomega, and Knights of Sidonia through the numbers',
    subjects: ['Blame', 'Biomega', 'Knights of Sidonia'],
  },
  {
    topic: 'The Gag Legends: numerology of Dr. Slump, Osomatsu-kun, and Cromartie High School',
    subjects: ['Dr. Slump', 'Osomatsu-kun', 'Cromartie High School'],
  },
  {
    topic: 'The Netflix Era: Cyberpunk Edgerunners, Devilman Crybaby, and Aggretsuko through the numbers',
    subjects: ['Cyberpunk Edgerunners', 'Devilman Crybaby', 'Aggretsuko'],
  },
  // ── Eleventh batch ────────────────────────────────────────────────────────
  {
    topic: "The Eternal Rivals: what Roronoa Zoro, Killua Zoldyck, and Sasuke Uchiha's names vibrate to",
    subjects: ['Roronoa Zoro', 'Killua Zoldyck', 'Sasuke Uchiha'],
  },
  {
    topic: 'The Mentors: reading Jiraiya, Master Roshi, and Kisuke Urahara through the numbers',
    subjects: ['Jiraiya', 'Master Roshi', 'Kisuke Urahara'],
  },
  {
    topic: "The Shonen Sunday Canon: Inuyasha, Magi, and Komi Can't Communicate through numerology",
    subjects: ['Inuyasha', 'Magi', "Komi Can't Communicate"],
  },
  {
    topic: 'The Villainess Turn: My Next Life as a Villainess, Ascendance of a Bookworm, and Bibliophile Princess',
    subjects: ['My Next Life as a Villainess', 'Ascendance of a Bookworm', 'Bibliophile Princess'],
  },
  {
    topic: 'The Composers: reading Yoko Kanno, Hiroyuki Sawano, and Joe Hisaishi through their names',
    subjects: ['Yoko Kanno', 'Hiroyuki Sawano', 'Joe Hisaishi'],
  },
  {
    topic: 'The Voices of Anime: numerology of Megumi Hayashibara, Mamoru Miyano, and Kana Hanazawa',
    subjects: ['Megumi Hayashibara', 'Mamoru Miyano', 'Kana Hanazawa'],
  },
  {
    topic: 'The Captains and Commanders: Levi Ackerman, Roy Mustang, and All Might through the numbers',
    subjects: ['Levi Ackerman', 'Roy Mustang', 'All Might'],
  },
  {
    topic: 'The Mecha Second Wave: Eureka Seven, Darling in the Franxx, and Aldnoah Zero through numerology',
    subjects: ['Eureka Seven', 'Darling in the Franxx', 'Aldnoah Zero'],
  },
  // ── Twelfth batch ─────────────────────────────────────────────────────────
  {
    topic: 'The Shojo Classics: Candy Candy, The Rose of Versailles, and Glass Mask through the numbers',
    subjects: ['Candy Candy', 'The Rose of Versailles', 'Glass Mask'],
  },
  {
    topic: 'The Modern Shojo: numerology of Horimiya, My Love Story, and Skip Beat',
    subjects: ['Horimiya', 'My Love Story', 'Skip Beat'],
  },
  {
    topic: 'The Sports Storytellers: Eyeshield 21, Giant Killing, and Cross Game through numerology',
    subjects: ['Eyeshield 21', 'Giant Killing', 'Cross Game'],
  },
  {
    topic: 'The Cult Classics: FLCL, Paranoia Agent, and Texhnolyze through the numbers',
    subjects: ['FLCL', 'Paranoia Agent', 'Texhnolyze'],
  },
  {
    topic: "Ghibli's Successors: Studio Ponoc, Science SARU, and Studio Chizu through numerology",
    subjects: ['Studio Ponoc', 'Science SARU', 'Studio Chizu'],
  },
  {
    topic: 'The Directors of Feeling: reading Mamoru Hosoda, Naoko Yamada, and Masaaki Yuasa',
    subjects: ['Mamoru Hosoda', 'Naoko Yamada', 'Masaaki Yuasa'],
  },
  {
    topic: 'The Horror Second Wave: Another, Higurashi, and Shiki through the numbers',
    subjects: ['Another', 'Higurashi', 'Shiki'],
  },
  {
    topic: 'The Magazines Beyond Jump: Weekly Young Jump, Big Comic, and Afternoon through numerology',
    subjects: ['Weekly Young Jump', 'Big Comic', 'Afternoon'],
  },
  // ── Thirteenth batch ──────────────────────────────────────────────────────
  {
    topic: 'The Hard Sci-Fi Epics: Planetes, Gunbuster, and Toward the Terra through the numbers',
    subjects: ['Planetes', 'Gunbuster', 'Toward the Terra'],
  },
  {
    topic: 'The Boxing Ring: Ashita no Joe, Megalo Box, and Rainbow through numerology',
    subjects: ['Ashita no Joe', 'Megalo Box', 'Rainbow'],
  },
  {
    topic: 'The Trapped Worlds: Gantz, Btooom, and Alice in Borderland through the numbers',
    subjects: ['Gantz', 'Btooom', 'Alice in Borderland'],
  },
  {
    topic: 'One Hundred Parts In: what the number 100 means, and what this series has learned reading a medium through its names',
    subjects: ['Catzye', 'The Numbers Behind the Manga', 'Numerology'],
  },
  {
    topic: 'The Pirates and Rebels: Edward Newgate, Shanks, and Trafalgar Law through the numbers',
    subjects: ['Edward Newgate', 'Shanks', 'Trafalgar Law'],
  },
  {
    topic: 'The Naruto Constellation: Kakashi Hatake, Itachi Uchiha, and Hinata Hyuga through numerology',
    subjects: ['Kakashi Hatake', 'Itachi Uchiha', 'Hinata Hyuga'],
  },
  {
    topic: 'The Dragon Ball Constellation: Vegeta, Piccolo, and Gohan through the numbers',
    subjects: ['Vegeta', 'Piccolo', 'Gohan'],
  },
  {
    topic: 'The Bleach Constellation: Rukia Kuchiki, Byakuya Kuchiki, and Kenpachi Zaraki through numerology',
    subjects: ['Rukia Kuchiki', 'Byakuya Kuchiki', 'Kenpachi Zaraki'],
  },
  // ── Fourteenth batch ──────────────────────────────────────────────────────
  {
    topic: 'The Straw Hat Crew: Nami, Sanji, and Tony Tony Chopper through the numbers',
    subjects: ['Nami', 'Sanji', 'Tony Tony Chopper'],
  },
  {
    topic: 'The Survey Corps: Armin Arlert, Erwin Smith, and Zeke Yeager through numerology',
    subjects: ['Armin Arlert', 'Erwin Smith', 'Zeke Yeager'],
  },
  {
    topic: 'The Jujutsu Students: Yuji Itadori, Megumi Fushiguro, and Nobara Kugisaki through the numbers',
    subjects: ['Yuji Itadori', 'Megumi Fushiguro', 'Nobara Kugisaki'],
  },
  {
    topic: 'The Hashira: reading Giyu Tomioka, Kyojuro Rengoku, and Shinobu Kocho through numerology',
    subjects: ['Giyu Tomioka', 'Kyojuro Rengoku', 'Shinobu Kocho'],
  },
  {
    topic: 'Class 1-A: Izuku Midoriya, Katsuki Bakugo, and Shoto Todoroki through the numbers',
    subjects: ['Izuku Midoriya', 'Katsuki Bakugo', 'Shoto Todoroki'],
  },
  {
    topic: 'The Elric Brothers: Edward Elric, Alphonse Elric, and Winry Rockbell through numerology',
    subjects: ['Edward Elric', 'Alphonse Elric', 'Winry Rockbell'],
  },
  {
    topic: 'The Hunters: Gon Freecss, Kurapika, and Hisoka through the numbers',
    subjects: ['Gon Freecss', 'Kurapika', 'Hisoka'],
  },
  {
    topic: 'The Death Note Duel: reading L Lawliet, Misa Amane, and Ryuk through numerology',
    subjects: ['L Lawliet', 'Misa Amane', 'Ryuk'],
  },
  // ── Fifteenth batch ───────────────────────────────────────────────────────
  {
    topic: "Ghibli's Second Shelf: Howl's Moving Castle, Kiki's Delivery Service, and Castle in the Sky",
    subjects: ["Howl's Moving Castle", "Kiki's Delivery Service", 'Castle in the Sky'],
  },
  {
    topic: 'The Shinkai Trilogy: Your Name, Weathering with You, and Suzume through the numbers',
    subjects: ['Your Name', 'Weathering with You', 'Suzume'],
  },
  {
    topic: 'The Trigger Works: Kill la Kill, Little Witch Academia, and Promare through numerology',
    subjects: ['Kill la Kill', 'Little Witch Academia', 'Promare'],
  },
  {
    topic: 'The Gundam Pilots: Amuro Ray, Char Aznable, and Setsuna F. Seiei through the numbers',
    subjects: ['Amuro Ray', 'Char Aznable', 'Setsuna F. Seiei'],
  },
  {
    topic: 'The Eva Pilots: Shinji Ikari, Rei Ayanami, and Asuka Langley through numerology',
    subjects: ['Shinji Ikari', 'Rei Ayanami', 'Asuka Langley'],
  },
  {
    topic: 'The Sailor Guardians: Usagi Tsukino, Rei Hino, and Ami Mizuno through the numbers',
    subjects: ['Usagi Tsukino', 'Rei Hino', 'Ami Mizuno'],
  },
  {
    topic: 'The Fate Universe: Fate stay night, Fate Zero, and Saber through numerology',
    subjects: ['Fate stay night', 'Fate Zero', 'Saber'],
  },
  {
    topic: 'The Berserk Cast: Griffith, Casca, and the Band of the Hawk through the numbers',
    subjects: ['Griffith', 'Casca', 'Band of the Hawk'],
  },
  // ── Sixteenth batch ───────────────────────────────────────────────────────
  {
    topic: 'The Akatsuki and the Fallen: Orochimaru, Pain, and Obito Uchiha through numerology',
    subjects: ['Orochimaru', 'Pain', 'Obito Uchiha'],
  },
  {
    topic: 'The Emperors of the Sea: Doflamingo, Kaido, and Blackbeard through the numbers',
    subjects: ['Doflamingo', 'Kaido', 'Blackbeard'],
  },
  {
    topic: 'The Cursed and the Blessed: Yuta Okkotsu, Toji Fushiguro, and Kento Nanami through numerology',
    subjects: ['Yuta Okkotsu', 'Toji Fushiguro', 'Kento Nanami'],
  },
  {
    topic: 'The Digital Platforms: Shonen Jump Plus, Manga Plus, and Webtoon through the numbers',
    subjects: ['Shonen Jump Plus', 'Manga Plus', 'Webtoon'],
  },
  {
    topic: 'The Streaming Giants: Crunchyroll, Netflix, and Aniplex through numerology',
    subjects: ['Crunchyroll', 'Netflix', 'Aniplex'],
  },
  {
    topic: 'The Gathering Places: Comiket, Anime Expo, and Jump Festa through the numbers',
    subjects: ['Comiket', 'Anime Expo', 'Jump Festa'],
  },
  {
    topic: 'The Anthem Makers: LiSA, YOASOBI, and RADWIMPS through numerology',
    subjects: ['LiSA', 'YOASOBI', 'RADWIMPS'],
  },
  {
    topic: 'The Supporting World of Dragon Ball: Bulma, Krillin, and Trunks through the numbers',
    subjects: ['Bulma', 'Krillin', 'Trunks'],
  },
  // ── Seventeenth batch ─────────────────────────────────────────────────────
  {
    topic: "The Donghua Wave: The King's Avatar, Mo Dao Zu Shi, and Link Click through the numbers",
    subjects: ["The King's Avatar", 'Mo Dao Zu Shi', 'Link Click'],
  },
  {
    topic: 'The Korean Webtoon Titans: Lookism, Sweet Home, and True Beauty through numerology',
    subjects: ['Lookism', 'Sweet Home', 'True Beauty'],
  },
  {
    topic: 'The Western Inheritors: Avatar The Last Airbender, Castlevania, and Arcane through the numbers',
    subjects: ['Avatar The Last Airbender', 'Castlevania', 'Arcane'],
  },
  {
    topic: 'The Localization Pioneers: Viz Media, Funimation, and Dark Horse through numerology',
    subjects: ['Viz Media', 'Funimation', 'Dark Horse'],
  },
  {
    topic: "The OVA Era: Bubblegum Crisis, Giant Robo, and Angel's Egg through the numbers",
    subjects: ['Bubblegum Crisis', 'Giant Robo', "Angel's Egg"],
  },
  {
    topic: 'The Working Life: Wotakoi, Shirobako, and Servant x Service through numerology',
    subjects: ['Wotakoi', 'Shirobako', 'Servant x Service'],
  },
  {
    topic: 'The Breakout Films: Perfect Blue, Grave of the Fireflies, and Wolf Children through the numbers',
    subjects: ['Perfect Blue', 'Grave of the Fireflies', 'Wolf Children'],
  },
  {
    topic: 'The Retro Robots: Mazinger Z, Getter Robo, and Tetsujin 28 through numerology',
    subjects: ['Mazinger Z', 'Getter Robo', 'Tetsujin 28'],
  },
  // ── Eighteenth batch ──────────────────────────────────────────────────────
  {
    topic: 'The Psychological Heroines: Lain Iwakura, Homura Akemi, and Lucy through the numbers',
    subjects: ['Lain Iwakura', 'Homura Akemi', 'Lucy'],
  },
  {
    topic: 'The Wanderers: Vash the Stampede, Spike Spiegel, and Mugen through numerology',
    subjects: ['Vash the Stampede', 'Spike Spiegel', 'Mugen'],
  },
  {
    topic: 'The Samurai: Samurai Champloo, Sword of the Stranger, and Blade of the Immortal',
    subjects: ['Samurai Champloo', 'Sword of the Stranger', 'Blade of the Immortal'],
  },
  {
    topic: 'The Ninja Beyond Naruto: Ninja Scroll, Basilisk, and Nabari no Ou through the numbers',
    subjects: ['Ninja Scroll', 'Basilisk', 'Nabari no Ou'],
  },
  {
    topic: 'The Card Battlers: Cardfight Vanguard, Duel Masters, and Beyblade through numerology',
    subjects: ['Cardfight Vanguard', 'Duel Masters', 'Beyblade'],
  },
  {
    topic: 'The Spirit Mediums: Shaman King, Yo-kai Watch, and Monster Rancher through the numbers',
    subjects: ['Shaman King', 'Yo-kai Watch', 'Monster Rancher'],
  },
  {
    topic: 'The Underrated Gems: Kaiba, The Tatami Galaxy, and Mind Game through numerology',
    subjects: ['Kaiba', 'The Tatami Galaxy', 'Mind Game'],
  },
  {
    topic: 'The Traditional Arts: Showa Genroku Rakugo Shinju, Kids on the Slope, and Blue Period',
    subjects: ['Showa Genroku Rakugo Shinju', 'Kids on the Slope', 'Blue Period'],
  },
  // ── Nineteenth batch ──────────────────────────────────────────────────────
  {
    topic: 'The Dark Seinen: Goodnight Punpun, Homunculus, and Ichi the Killer through the numbers',
    subjects: ['Goodnight Punpun', 'Homunculus', 'Ichi the Killer'],
  },
  {
    topic: 'The Slow Life: Laid-Back Camp, Non Non Biyori, and Barakamon through numerology',
    subjects: ['Laid-Back Camp', 'Non Non Biyori', 'Barakamon'],
  },
  {
    topic: 'The Isekai Comedies: The Saga of Tanya the Evil, The Devil is a Part-Timer, and Cautious Hero',
    subjects: ['The Saga of Tanya the Evil', 'The Devil is a Part-Timer', 'Cautious Hero'],
  },
  {
    topic: 'The Healers: Black Jack, Cells at Work, and Team Medical Dragon through the numbers',
    subjects: ['Black Jack', 'Cells at Work', 'Team Medical Dragon'],
  },
  {
    topic: 'The War Stories: Barefoot Gen, In This Corner of the World, and Now and Then Here and There',
    subjects: ['Barefoot Gen', 'In This Corner of the World', 'Now and Then Here and There'],
  },
  {
    topic: 'The Absurdists: Pop Team Epic, Excel Saga, and Panty and Stocking through numerology',
    subjects: ['Pop Team Epic', 'Excel Saga', 'Panty and Stocking'],
  },
  {
    topic: 'The Mystery Boxes: the Monogatari Series, Durarara, and Baccano through the numbers',
    subjects: ['Monogatari', 'Durarara', 'Baccano'],
  },
  {
    topic: 'The Living Legends: reading Yoshihiro Togashi, Tite Kubo, and Masashi Kishimoto through their names',
    subjects: ['Yoshihiro Togashi', 'Tite Kubo', 'Masashi Kishimoto'],
  },
  // ── Twentieth batch: "The Nine Vibrations" ────────────────────────────────
  // A per-number arc. Subjects were chosen by COMPUTING their destiny numbers
  // first (lib/numerology readTitle), so every subject genuinely reduces to the
  // number its essay is about — the groupings are findings, not decoration.
  {
    topic: 'The Ones: the Leader and Pioneer vibration in anime — why Jujutsu Kaisen, Ghost in the Shell, and Hayao Miyazaki all reduce to 1',
    subjects: ['Jujutsu Kaisen', 'Ghost in the Shell', 'Hayao Miyazaki'],
  },
  {
    topic: "The Missing Twos: the Diplomat is the rarest vibration in anime — across hundreds of major titles, creators, and studios almost nothing reduces to 2. What it means that a medium built on rivalry has so few peacemakers, read through MAPPA and Ranma, the notable exceptions",
    subjects: ['MAPPA', 'Ranma'],
  },
  {
    topic: 'The Threes: the Creative Communicator vibration — why Fullmetal Alchemist, Frieren, and Son Goku all reduce to 3',
    subjects: ['Fullmetal Alchemist', 'Frieren', 'Son Goku'],
  },
  {
    topic: 'The Fours: the Builder vibration — why Monkey D. Luffy, My Hero Academia, and Guts all reduce to 4',
    subjects: ['Monkey D. Luffy', 'My Hero Academia', 'Guts'],
  },
  {
    topic: 'The Fives: the Freedom Seeker vibration and the most crowded number in anime — Dragon Ball, Attack on Titan, and Neon Genesis Evangelion',
    subjects: ['Dragon Ball', 'Attack on Titan', 'Neon Genesis Evangelion'],
  },
  {
    topic: 'The Sixes: the Nurturer vibration — why Spy x Family, Eiichiro Oda, and Tanjiro Kamado all reduce to 6',
    subjects: ['Spy x Family', 'Eiichiro Oda', 'Tanjiro Kamado'],
  },
  {
    topic: 'The Sevens: the Analyst and Seeker vibration — why Chainsaw Man, Hunter x Hunter, and Akira Toriyama all reduce to 7',
    subjects: ['Chainsaw Man', 'Hunter x Hunter', 'Akira Toriyama'],
  },
  {
    topic: 'The Eights: the Visionary and Achiever vibration — why Naruto, Pokemon, and Naoki Urasawa all reduce to 8',
    subjects: ['Naruto', 'Pokemon', 'Naoki Urasawa'],
  },
  {
    topic: 'The Nines: the Humanitarian and Sage vibration — why One Piece, Osamu Tezuka, and Studio Ghibli all reduce to 9',
    subjects: ['One Piece', 'Osamu Tezuka', 'Studio Ghibli'],
  },
  {
    topic: 'The Elevens: the Master Visionary — why Death Note, Steins;Gate, and Kentaro Miura all carry the 11',
    subjects: ['Death Note', 'Steins;Gate', 'Kentaro Miura'],
  },
  {
    topic: 'The Twenty-Twos: the Master Builder — why Bleach, Akira, and Clannad all carry the 22',
    subjects: ['Bleach', 'Akira', 'Clannad'],
  },
  {
    topic: 'The Thirty-Threes: the Master Teacher — why Berserk, Haikyuu, and Code Geass all carry the 33, and what the series has learned from reading a whole medium through its names',
    subjects: ['Berserk', 'Haikyuu', 'Code Geass'],
  },
  // ── Twenty-first batch: "The Method Under Scrutiny" ───────────────────────
  // Cross-cutting essays that turn the lens on itself. Where a topic states a
  // finding, that finding was COMPUTED first (see the translation test below);
  // where it poses a question, the essay answers it from the injected numbers
  // rather than asserting a conclusion in advance.
  {
    topic:
      "The Translation Test: does a title's vibration survive translation? We computed the destiny numbers of twenty major titles in both romanized Japanese and English — and only one pair matched (and only because it was the same words). Kimetsu no Yaiba reduces to 3 but Demon Slayer to 5; Shingeki no Kyojin to 6 but Attack on Titan to 5; Kimi no Na wa carries the master 11 but Your Name reduces to 4. The honest conclusion: a title's number is an artifact of the alphabet it is spelled in, not a property of the work. What that means for everything this series has been doing",
    subjects: ['Kimetsu no Yaiba', 'Demon Slayer', 'Shingeki no Kyojin', 'Attack on Titan'],
  },
  {
    topic:
      'The Rivalries: do rivals carry opposing numbers? Read Son Goku against Vegeta, and Sasuke Uchiha against his own foil — report what the numbers actually say, including if they refuse to line up neatly',
    subjects: ['Son Goku', 'Vegeta', 'Sasuke Uchiha'],
  },
  {
    topic:
      'The Franchise Drift: when a series is renamed, its number changes — Dragon Ball, Dragon Ball Z, and Dragon Ball Super are the same story with three different vibrations. What that says about naming and identity',
    subjects: ['Dragon Ball', 'Dragon Ball Z', 'Dragon Ball Super'],
  },
  {
    topic:
      'The Studio and Its Masterpiece: do studios share a number with the work that made them? Test Ufotable against Demon Slayer, MAPPA against Jujutsu Kaisen, and Bones against My Hero Academia — and say plainly whether the pattern holds',
    subjects: ['Ufotable', 'MAPPA', 'Bones'],
  },
  {
    topic:
      "The Heart and the Mask: when a work's Heart's Desire (its vowels) disagrees with its Personality (its consonants) — Berserk, One Piece, and Neon Genesis Evangelion as studies in inner versus outer number",
    subjects: ['Berserk', 'One Piece', 'Neon Genesis Evangelion'],
  },
  {
    topic:
      'The Pen Names: Gege Akutami and ONE are invented names — chosen, not given. What happens to numerology when the subject picked their own letters?',
    subjects: ['Gege Akutami', 'ONE', 'Kohei Horikoshi'],
  },
  {
    topic:
      'The Long Titles: the light-novel habit of sentence-length titles, and what happens to a number when a work is known by an abbreviation instead — KonoSuba, Oregairu, and Bofuri',
    subjects: ['KonoSuba', 'Oregairu', 'Bofuri'],
  },
  // ── Twenty-second batch: the founding generations and the deep cuts ───────
  // NOTE: these are deliberately placed BEFORE the closing essay below, which
  // must remain the final part of the series.
  {
    topic: 'The Retro Masters: reading Go Nagai, Leiji Matsumoto, and Shotaro Ishinomori through their names',
    subjects: ['Go Nagai', 'Leiji Matsumoto', 'Shotaro Ishinomori'],
  },
  {
    topic: 'The Year 24 Group: Moto Hagio, Keiko Takemiya, and Riyoko Ikeda, the women who reinvented shojo',
    subjects: ['Moto Hagio', 'Keiko Takemiya', 'Riyoko Ikeda'],
  },
  {
    topic: 'The Duo: Tsugumi Ohba, Takeshi Obata, and Bakuman — the partnership behind Death Note',
    subjects: ['Tsugumi Ohba', 'Takeshi Obata', 'Bakuman'],
  },
  {
    topic: 'The Space Pioneers: Galaxy Express 999, Captain Harlock, and Cyborg 009 through the numbers',
    subjects: ['Galaxy Express 999', 'Captain Harlock', 'Cyborg 009'],
  },
  {
    topic: "The Gentleman Thieves: Lupin III, City Hunter, and Cat's Eye through numerology",
    subjects: ['Lupin III', 'City Hunter', "Cat's Eye"],
  },
  {
    topic: 'The Assassins: Golgo 13, Lone Wolf and Cub, and Crying Freeman through the numbers',
    subjects: ['Golgo 13', 'Lone Wolf and Cub', 'Crying Freeman'],
  },
  {
    topic: 'The Cyber Bodies: Battle Angel Alita, Masamune Shirow, and Yukito Kishiro through numerology',
    subjects: ['Battle Angel Alita', 'Masamune Shirow', 'Yukito Kishiro'],
  },
  {
    topic: 'The Ohkubo Flames: Soul Eater, Fire Force, and Atsushi Ohkubo through the numbers',
    subjects: ['Soul Eater', 'Fire Force', 'Atsushi Ohkubo'],
  },
  {
    topic: 'The Dungeon Crawlers: Danmachi, Log Horizon, and Goblin Slayer through numerology',
    subjects: ['Danmachi', 'Log Horizon', 'Goblin Slayer'],
  },
  {
    topic: 'The Thinking Teens: Hyouka, Bunny Girl Senpai, and The Melancholy of Haruhi Suzumiya',
    subjects: ['Hyouka', 'Bunny Girl Senpai', 'The Melancholy of Haruhi Suzumiya'],
  },
  {
    topic: 'The Gothic: Black Butler, D.Gray-man, and Pandora Hearts through the numbers',
    subjects: ['Black Butler', 'D.Gray-man', 'Pandora Hearts'],
  },
  {
    topic: 'The Body Horror: Ajin, Terra Formars, and Elfen Lied through numerology',
    subjects: ['Ajin', 'Terra Formars', 'Elfen Lied'],
  },
  {
    topic: 'The Delinquents: Great Teacher Onizuka, Beelzebub, and Air Gear through the numbers',
    subjects: ['Great Teacher Onizuka', 'Beelzebub', 'Air Gear'],
  },
  {
    topic: 'The Killers: Akame ga Kill, Deadman Wonderland, and Trigun through numerology',
    subjects: ['Akame ga Kill', 'Deadman Wonderland', 'Trigun'],
  },
  {
    topic: 'The Ghoul and the Author: Sui Ishida, Tokyo Ghoul, and Choujin X through the numbers',
    subjects: ['Sui Ishida', 'Tokyo Ghoul', 'Choujin X'],
  },
  {
    topic: 'The Family Institutions: Sazae-san, Chibi Maruko-chan, and Anpanman, the anime that never end',
    subjects: ['Sazae-san', 'Chibi Maruko-chan', 'Anpanman'],
  },
  // ── Batch 23: the craft behind the page — sound, voice, distribution, genre ──
  // Again: appended BEFORE the closing essay, which must remain the final part.
  {
    topic: 'The Sound of Destiny: reading anime’s three great composers, Yoko Kanno, Yuki Kajiura, and Hiroyuki Sawano, through their numbers',
    subjects: ['Yoko Kanno', 'Yuki Kajiura', 'Hiroyuki Sawano'],
  },
  {
    topic: 'The Voices Behind the Faces: numerology of seiyuu Megumi Hayashibara, Mamoru Miyano, and Kana Hanazawa',
    subjects: ['Megumi Hayashibara', 'Mamoru Miyano', 'Kana Hanazawa'],
  },
  {
    topic: 'The New Auteurs: Naoko Yamada, Masaaki Yuasa, and Sayo Yamamoto, three directors remaking what anime looks like',
    subjects: ['Naoko Yamada', 'Masaaki Yuasa', 'Sayo Yamamoto'],
  },
  {
    topic: 'The Studios of the Streaming Age: Studio Trigger, CloverWorks, and Studio Bind through a numerological lens',
    subjects: ['Studio Trigger', 'CloverWorks', 'Studio Bind'],
  },
  {
    topic: 'The Historical Epics: Kingdom, Golden Kamuy, and Drifters, and the numbers of manga that reach for the past',
    subjects: ['Kingdom', 'Golden Kamuy', 'Drifters'],
  },
  {
    topic: 'The Yokai and the Quiet: GeGeGe no Kitaro, Mushishi, and Natsume’s Book of Friends, folklore read through its names',
    subjects: ['GeGeGe no Kitaro', 'Mushishi', 'Natsume’s Book of Friends'],
  },
  {
    topic: 'The Music Manga: Beck, Nana, and Blue Giant — what happens when a silent medium draws sound',
    subjects: ['Beck', 'Nana', 'Blue Giant'],
  },
  {
    topic: 'The Hard Science Fiction: Planetes, Blame!, and Knights of Sidonia, and the numerology of the void',
    subjects: ['Planetes', 'Blame!', 'Knights of Sidonia'],
  },
  {
    topic: 'The Fighting Spirit: Ashita no Joe, Hajime no Ippo, and Ping Pong, three ways of drawing a body pushed to its limit',
    subjects: ['Ashita no Joe', 'Hajime no Ippo', 'Ping Pong'],
  },
  {
    topic: 'The Vampire Strain: Hellsing, Vampire Hunter D, and Shiki, and the numbers of the undead',
    subjects: ['Hellsing', 'Vampire Hunter D', 'Shiki'],
  },
  {
    topic: 'The Lone Wanderers: Cowboy Bebop, Trigun, and Kino’s Journey, and the numerology of the drifter',
    subjects: ['Cowboy Bebop', 'Trigun', 'Kino’s Journey'],
  },
  {
    topic: 'After the End: Dr. Stone, Girls’ Last Tour, and Nausicaa of the Valley of the Wind, three post-apocalypses and their numbers',
    subjects: ['Dr. Stone', 'Girls’ Last Tour', 'Nausicaa of the Valley of the Wind'],
  },
  {
    topic: 'The Josei Canon: Honey and Clover, Paradise Kiss, and Princess Jellyfish, adult women and the numbers of their stories',
    subjects: ['Honey and Clover', 'Paradise Kiss', 'Princess Jellyfish'],
  },
  {
    topic: 'The Queer Canon: Given, Banana Fish, and Yuri on Ice, and what numerology hears in them',
    subjects: ['Given', 'Banana Fish', 'Yuri on Ice'],
  },
  {
    topic: 'The Gatherings: Comiket, Jump Festa, and Anime Expo — the numerology of the places fandom physically assembles',
    subjects: ['Comiket', 'Jump Festa', 'Anime Expo'],
  },
  {
    topic: 'The Magazines Beyond Jump: Big Comic Spirits, Monthly Afternoon, and Weekly Young Jump, and the numbers of the seinen establishment',
    subjects: ['Big Comic Spirits', 'Monthly Afternoon', 'Weekly Young Jump'],
  },
  {
    topic: 'The Pipes: Crunchyroll, Netflix, and Bilibili — numerology of the platforms that now decide what the world watches',
    subjects: ['Crunchyroll', 'Netflix', 'Bilibili'],
  },
  {
    topic: 'The Second String of Crime: Psycho-Pass, Moriarty the Patriot, and Kindaichi, and the numerology of investigation',
    subjects: ['Psycho-Pass', 'Moriarty the Patriot', 'Kindaichi'],
  },

  // ── Batch 24: the moderns, the healers, and the giants still unread ─────────
  // As always: appended BEFORE the closing essay, which must remain the final part.
  {
    topic: 'The Hunter and the Hiatus: Yoshihiro Togashi, Hunter x Hunter, and Gon Freecss through their numbers',
    subjects: ['Yoshihiro Togashi', 'Hunter x Hunter', 'Gon Freecss'],
  },
  {
    topic: 'The Power of ONE: reading ONE, One Punch Man, and Mob Psycho 100, and the numerology of overwhelming strength',
    subjects: ['ONE', 'One Punch Man', 'Mob Psycho 100'],
  },
  {
    topic: 'Rumiko Takahashi’s Other Worlds: Urusei Yatsura, Maison Ikkoku, and Inuyasha in numerological reading',
    subjects: ['Urusei Yatsura', 'Maison Ikkoku', 'Inuyasha'],
  },
  {
    topic: 'The One-Shots: Tatsuki Fujimoto’s Look Back, Goodbye Eri, and Fire Punch, and the numbers of the short form',
    subjects: ['Look Back', 'Goodbye Eri', 'Fire Punch'],
  },
  {
    topic: 'The New Jump Vanguard: Kagurabachi, Akane-banashi, and Ruri Dragon — reading the next generation before it arrives',
    subjects: ['Kagurabachi', 'Akane-banashi', 'Ruri Dragon'],
  },
  {
    topic: 'The Modern Romantic Comedy: Kaguya-sama: Love is War, Horimiya, and Blue Box through the numbers',
    subjects: ['Kaguya-sama: Love is War', 'Horimiya', 'Blue Box'],
  },
  {
    topic: 'The Art of Making Art: Blue Period, Bocchi the Rock, and Kids on the Slope, and the numerology of the apprentice',
    subjects: ['Blue Period', 'Bocchi the Rock', 'Kids on the Slope'],
  },
  {
    topic: 'The Thinking Light Novels: The Apothecary Diaries, Ascendance of a Bookworm, and Spice and Wolf',
    subjects: ['The Apothecary Diaries', 'Ascendance of a Bookworm', 'Spice and Wolf'],
  },
  {
    topic: 'The Worldbuilders: Witch Hat Atelier, Delicious in Dungeon, and Made in Abyss, and the numbers of invented worlds',
    subjects: ['Witch Hat Atelier', 'Delicious in Dungeon', 'Made in Abyss'],
  },
  {
    topic: 'The Current Jump Roster: Undead Unluck, Mashle, and Wind Breaker in numerological reading',
    subjects: ['Undead Unluck', 'Mashle', 'Wind Breaker'],
  },
  {
    topic: 'The Beautiful Game: Ao Ashi, Days, and Giant Killing, and the numerology of football manga',
    subjects: ['Ao Ashi', 'Days', 'Giant Killing'],
  },
  {
    topic: 'The Walking Dead of Manga: Zom 100, Highschool of the Dead, and I Am a Hero through the numbers',
    subjects: ['Zom 100', 'Highschool of the Dead', 'I Am a Hero'],
  },
  {
    topic: 'The Other Mecha: Macross, Patlabor, and Escaflowne, and the numbers of the machines that never became Gundam',
    subjects: ['Macross', 'Patlabor', 'Escaflowne'],
  },
  {
    topic: 'The Absurdists: Nichijou, Daily Lives of High School Boys, and Grand Blue, and the numerology of nonsense',
    subjects: ['Nichijou', 'Daily Lives of High School Boys', 'Grand Blue'],
  },
  {
    topic: 'The Healing Genre: Laid-Back Camp, Barakamon, and Silver Spoon — iyashikei and the numbers of rest',
    subjects: ['Laid-Back Camp', 'Barakamon', 'Silver Spoon'],
  },
  {
    topic: 'The Sword Tales: Blade of the Immortal, Lone Wolf and Cub, and Samurai Champloo through a numerological lens',
    subjects: ['Blade of the Immortal', 'Lone Wolf and Cub', 'Samurai Champloo'],
  },
  {
    topic: 'The School of Dread: Another, Higurashi, and School-Live, and the numerology of the haunted classroom',
    subjects: ['Another', 'Higurashi', 'School-Live'],
  },
  {
    topic: 'The Tokusatsu Bloodline: Kamen Rider, Ultraman, and Super Sentai, and the numbers of the transforming hero',
    subjects: ['Kamen Rider', 'Ultraman', 'Super Sentai'],
  },

  // ── Batch 25: the neighbours, the pipes, and manga's non-fiction corners ────
  // As always: appended BEFORE the closing essay, which must remain the final part.
  {
    topic: 'The Korean Engine: Naver Webtoon, Kakao Entertainment, and Lezhin, and the numerology of the industry that rewired comics',
    subjects: ['Naver Webtoon', 'Kakao Entertainment', 'Lezhin'],
  },
  {
    topic: 'The Chinese Wave: Mo Dao Zu Shi, The King’s Avatar, and Link Click — donghua read through its names',
    subjects: ['Mo Dao Zu Shi', 'The King’s Avatar', 'Link Click'],
  },
  {
    topic: 'The Game Becomes the Anime: Persona, Fate/stay night, and Danganronpa through a numerological lens',
    subjects: ['Persona', 'Fate/stay night', 'Danganronpa'],
  },
  {
    topic: 'Anime Made Abroad: Cyberpunk Edgerunners, Castlevania, and Devil May Cry, and the numbers of the outsider adaptation',
    subjects: ['Cyberpunk Edgerunners', 'Castlevania', 'Devil May Cry'],
  },
  {
    topic: 'The Translators: Viz Media, Funimation, and Dark Horse — the numerology of the companies that carried manga into English',
    subjects: ['Viz Media', 'Funimation', 'Dark Horse'],
  },
  {
    topic: 'The Digital-First Publishers: Manga Plus, Shonen Jump+, and Piccoma, and the numbers of manga without paper',
    subjects: ['Manga Plus', 'Shonen Jump+', 'Piccoma'],
  },
  {
    topic: 'The War Memory: Barefoot Gen, Showa: A History of Japan, and Onward Towards Our Noble Deaths — manga as testimony',
    subjects: ['Barefoot Gen', 'Showa: A History of Japan', 'Onward Towards Our Noble Deaths'],
  },
  {
    topic: 'The Melancholy of Inio Asano: Goodnight Punpun, Solanin, and Dead Dead Demon’s Dededede Destruction',
    subjects: ['Goodnight Punpun', 'Solanin', 'Dead Dead Demon’s Dededede Destruction'],
  },
  {
    topic: 'The Line of Taiyo Matsumoto: Tekkonkinkreet, Sunny, and the numerology of an artist who draws like no one else',
    subjects: ['Taiyo Matsumoto', 'Tekkonkinkreet', 'Sunny'],
  },
  {
    topic: 'The Grandfather of Fear: Kazuo Umezu, The Drifting Classroom, and Orochi through their numbers',
    subjects: ['Kazuo Umezu', 'The Drifting Classroom', 'Orochi'],
  },
  {
    topic: 'The Adult Tezuka: Phoenix, Black Jack, and Buddha — the god of manga at his most serious',
    subjects: ['Phoenix', 'Black Jack', 'Buddha'],
  },
  {
    topic: 'The Families of Mamoru Hosoda: Wolf Children, Mirai, and Belle in numerological reading',
    subjects: ['Wolf Children', 'Mirai', 'Belle'],
  },
  {
    topic: 'Shinkai Beyond Your Name: Weathering with You, Suzume, and 5 Centimeters per Second',
    subjects: ['Weathering with You', 'Suzume', '5 Centimeters per Second'],
  },
  {
    topic: 'The Prizes: the Tezuka Osamu Cultural Prize, the Kodansha Manga Award, and the Eisner Award, and the numerology of who gets crowned',
    subjects: ['Tezuka Osamu Cultural Prize', 'Kodansha Manga Award', 'Eisner Award'],
  },
  {
    topic: 'The Archives of Fandom: Anime News Network, MyAnimeList, and MangaUpdates — the numbers of the infrastructure fans built themselves',
    subjects: ['Anime News Network', 'MyAnimeList', 'MangaUpdates'],
  },
  {
    topic: 'The Merchandise Economy: Gunpla, Nendoroid, and Good Smile Company, and the numerology of the objects fandom buys',
    subjects: ['Gunpla', 'Nendoroid', 'Good Smile Company'],
  },
  {
    topic: 'The Autobiographers: My Lesbian Experience with Loneliness, The Bride Was a Boy, and Our Dreams at Dusk — manga telling the truth about a life',
    subjects: ['My Lesbian Experience with Loneliness', 'The Bride Was a Boy', 'Our Dreams at Dusk'],
  },
  {
    topic: 'The Gentle Domestic: Chi’s Sweet Home, A Man and His Cat, and Yotsuba&! — the numerology of manga about nothing happening',
    subjects: ['Chi’s Sweet Home', 'A Man and His Cat', 'Yotsuba&!'],
  },

  // ── Batch 26: the adjacent worlds ───────────────────────────────────────────
  // Subjects the series never reached — the auteurs it skipped, and the fandom
  // economies (Vocaloid, VTubers, doujin games) that grew up beside the medium.
  // As always: appended BEFORE the closing essay, which must remain the final part.
  {
    topic: 'The Theatre of Kunihiko Ikuhara: Revolutionary Girl Utena, Mawaru Penguindrum, and Sarazanmai through their numbers',
    subjects: ['Revolutionary Girl Utena', 'Mawaru Penguindrum', 'Sarazanmai'],
  },
  {
    topic: 'The Quiet Bat of Mitsuru Adachi: Touch, Cross Game, and H2 — baseball, grief, and the numerology of restraint',
    subjects: ['Touch', 'Cross Game', 'H2'],
  },
  {
    topic: 'The Other Ghibli: Isao Takahata’s Grave of the Fireflies, Only Yesterday, and The Tale of the Princess Kaguya',
    subjects: ['Grave of the Fireflies', 'Only Yesterday', 'The Tale of the Princess Kaguya'],
  },
  {
    topic: 'The Numbers at Speed: Initial D, Capeta, and MF Ghost, and the numerology of the racing line',
    subjects: ['Initial D', 'Capeta', 'MF Ghost'],
  },
  {
    topic: 'The Sculpted Body: Kinnikuman, Tiger Mask, and Baki — muscle, spectacle, and the numbers behind them',
    subjects: ['Kinnikuman', 'Tiger Mask', 'Baki'],
  },
  {
    topic: 'The Voice That Is Not a Person: Hatsune Miku, Vocaloid, and Crypton Future Media in numerological reading',
    subjects: ['Hatsune Miku', 'Vocaloid', 'Crypton Future Media'],
  },
  {
    topic: 'The Faces Behind the Avatars: Hololive, Nijisanji, and Kizuna AI, and the numerology of the VTuber economy',
    subjects: ['Hololive', 'Nijisanji', 'Kizuna AI'],
  },
  {
    topic: 'The Doujin Empire: Touhou Project, ZUN, and a fandom that built its own universe outside the industry',
    subjects: ['Touhou Project', 'ZUN', 'Doujin'],
  },
  {
    topic: 'The Games That Became Anime: Persona, Fate/stay night, and Danganronpa through the numbers',
    subjects: ['Persona', 'Fate/stay night', 'Danganronpa'],
  },
  {
    topic: 'The Corporate Numbers: Sony, Kadokawa, and Aniplex — reading the owners of the pipeline',
    subjects: ['Sony', 'Kadokawa', 'Aniplex'],
  },
  {
    topic: 'The Men Behind the Desk: Kazuhiko Torishima, Hisashi Sasaki, and the numerology of the manga editor',
    subjects: ['Kazuhiko Torishima', 'Hisashi Sasaki', 'Shonen Jump+'],
  },
  {
    topic: 'The Gambler’s Arithmetic: Nobuyuki Fukumoto, Akagi, and Ten — risk, nerve, and the numbers',
    subjects: ['Nobuyuki Fukumoto', 'Akagi', 'Ten'],
  },
  {
    topic: 'The Underdog Sports: Yowamushi Pedal, Ahiru no Sora, and Hanebado, and the numerology of the losing team',
    subjects: ['Yowamushi Pedal', 'Ahiru no Sora', 'Hanebado'],
  },
  {
    topic: 'The Machines That Want to Be Human: Pluto, Chobits, and Time of Eve through a numerological lens',
    subjects: ['Pluto', 'Chobits', 'Time of Eve'],
  },
  {
    topic: 'The Genre Nobody Defends: To Love-Ru, High School DxD, and Monster Musume, read honestly through their numbers',
    subjects: ['To Love-Ru', 'High School DxD', 'Monster Musume'],
  },
  {
    topic: 'The Mascots: Pikachu, Hello Kitty, and Rilakkuma — the numerology of characters designed to be owned',
    subjects: ['Pikachu', 'Hello Kitty', 'Rilakkuma'],
  },

  // ── Batch 27: the founders, the institutions, and the places ────────────────
  // As always: appended BEFORE the closing essay, which must remain the final part.
  {
    topic: 'The Founding Directors: Yoshiyuki Tomino, Osamu Dezaki, and Rintaro — the men who built TV anime, through their numbers',
    subjects: ['Yoshiyuki Tomino', 'Osamu Dezaki', 'Rintaro'],
  },
  {
    topic: 'The Old Studios: Toei Animation, Tatsunoko Production, and Nippon Animation in numerological reading',
    subjects: ['Toei Animation', 'Tatsunoko Production', 'Nippon Animation'],
  },
  {
    topic: 'The Shojo Magazines: Ribon, Nakayoshi, and Margaret — the numbers of the institutions that raised generations of girls',
    subjects: ['Ribon', 'Nakayoshi', 'Margaret'],
  },
  {
    topic: 'The Shojo Classics: Candy Candy, Glass Mask, and The Rose of Versailles through a numerological lens',
    subjects: ['Candy Candy', 'Glass Mask', 'The Rose of Versailles'],
  },
  {
    topic: 'The Quiet Master: Jiro Taniguchi, The Walking Man, and A Distant Neighborhood — the numerology of stillness',
    subjects: ['Jiro Taniguchi', 'The Walking Man', 'A Distant Neighborhood'],
  },
  {
    topic: 'The Longest Gun: Golgo 13, Takao Saito, and Duke Togo — reading the numbers of manga’s most implacable man',
    subjects: ['Golgo 13', 'Takao Saito', 'Duke Togo'],
  },
  {
    topic: 'The Voices of the Opening: LiSA, YOASOBI, and Aimer, and the numerology of the anisong era',
    subjects: ['LiSA', 'YOASOBI', 'Aimer'],
  },
  {
    topic: 'The Songwriters: Kenshi Yonezu, RADWIMPS, and Eve — the numbers behind anime’s defining modern songs',
    subjects: ['Kenshi Yonezu', 'RADWIMPS', 'Eve'],
  },
  {
    topic: 'The Places: Akihabara, Nakano Broadway, and Otome Road — the numerology of the districts fandom physically built',
    subjects: ['Akihabara', 'Nakano Broadway', 'Otome Road'],
  },
  {
    topic: 'The Other Fujiko: Fujiko F. Fujio, Perman, and Kiteretsu, beyond the shadow of Doraemon',
    subjects: ['Fujiko F. Fujio', 'Perman', 'Kiteretsu'],
  },
  {
    topic: 'The Newest Arrivals: Medalist, The Elusive Samurai, and Witch Watch — reading a generation before the verdict is in',
    subjects: ['Medalist', 'The Elusive Samurai', 'Witch Watch'],
  },
  {
    topic: 'The Designers: Shoji Kawamori, Kunio Okawara, and Yoshiyuki Sadamoto — the hands that drew the machines and the faces',
    subjects: ['Shoji Kawamori', 'Kunio Okawara', 'Yoshiyuki Sadamoto'],
  },
  {
    topic: 'Where Manga Is Bought and Slept In: Manga Kissa, Book Off, and Mandarake through the numbers',
    subjects: ['Manga Kissa', 'Book Off', 'Mandarake'],
  },
  {
    topic: 'The Magical Girls of the Toy Aisle: Pretty Cure, Aikatsu, and Jewelpet — franchises built to be sold, read numerologically',
    subjects: ['Pretty Cure', 'Aikatsu', 'Jewelpet'],
  },
  {
    topic: 'The Anime Children Actually Grew Up On: Chibi Maruko-chan, Hamtaro, and Ojarumaru',
    subjects: ['Chibi Maruko-chan', 'Hamtaro', 'Ojarumaru'],
  },
  {
    topic: 'The Streaming Originals: Devilman Crybaby, Aggretsuko, and Beastars, and the numbers of anime made for the algorithm',
    subjects: ['Devilman Crybaby', 'Aggretsuko', 'Beastars'],
  },

  // ── The closing essay — must always remain the final part ─────────────────
  {
    topic:
      'The Limits of the Lens: a closing essay. After more than 200 parts reading a medium through its names, an honest accounting of what numerology can and cannot tell you about art — what the lens genuinely surfaced, where it flattered coincidence, and why a frame can be worth using without being true',
    subjects: ['Numerology', 'Manga', 'Catzye'],
  },
];

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

async function uniqueSlug(base: string): Promise<string> {
  let slug = base || 'numerology-essay';
  let suffix = 0;
  while (await prisma.article.findUnique({ where: { slug }, select: { id: true } })) {
    suffix++;
    slug = `${base}-${suffix}`;
  }
  return slug;
}

async function main() {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is required to generate the essays (checked env, .env, .env.local).');
  }

  // Import after env is loaded so lib/essay picks up the key.
  const { generateNumerologyEssay } = await import('../lib/essay');

  // Upsert the series.
  const series = await prisma.series.upsert({
    where: { slug: SERIES.slug },
    update: {
      title: SERIES.title,
      description: SERIES.description,
      category: SERIES.category,
      topics: TOPICS.map((t) => t.topic),
    },
    create: {
      title: SERIES.title,
      slug: SERIES.slug,
      description: SERIES.description,
      category: SERIES.category,
      topics: TOPICS.map((t) => t.topic),
    },
  });
  console.log(`Series ready: ${series.title} (${series.id})`);

  // Publication dates run BACKWARDS from now: the final part lands a day ago and
  // each earlier part steps two days further into the past. Anchoring forwards
  // from a fixed base date (the old behaviour) put every part of a long series
  // months into the future, so nothing was actually live.
  const PART_INTERVAL_MS = 2 * 24 * 60 * 60 * 1000;
  const seriesEnd = Date.now() - 24 * 60 * 60 * 1000;
  let failures = 0;

  for (let i = 0; i < TOPICS.length; i++) {
    const partNumber = i + 1;
    const { topic, subjects } = TOPICS[i];

    const existing = await prisma.article.findFirst({
      where: { seriesId: series.id, seriesOrder: partNumber },
      select: { id: true, slug: true },
    });
    if (existing) {
      console.log(`  Part ${partNumber}: exists (${existing.slug}) — skipping`);
      continue;
    }

    console.log(`  Part ${partNumber}: generating "${topic.slice(0, 60)}…"`);

    // Gemini occasionally returns malformed JSON; retry a couple of times and,
    // on persistent failure, skip this part (a re-run will pick it up) rather
    // than aborting the whole batch.
    let essay: Awaited<ReturnType<typeof generateNumerologyEssay>> | null = null;
    for (let attempt = 1; attempt <= 3 && !essay; attempt++) {
      try {
        essay = await generateNumerologyEssay(
          SERIES.title,
          SERIES.description,
          topic,
          partNumber,
          TOPICS.length,
          subjects,
        );
      } catch (err) {
        console.log(`    · attempt ${attempt} failed: ${(err as Error).message}`);
      }
    }
    if (!essay) {
      console.log(`    ✗ Part ${partNumber}: giving up after 3 attempts — re-run the script to retry.`);
      failures++;
      continue;
    }

    const slug = await uniqueSlug(slugify(essay.title));
    const publishedAt = new Date(seriesEnd - (TOPICS.length - partNumber) * PART_INTERVAL_MS);

    const article = await prisma.article.create({
      data: {
        title: essay.title,
        excerpt: essay.excerpt,
        content: essay.content,
        slug,
        category: SERIES.category,
        source: 'Catzye Numerology Desk',
        sourceUrl: `https://catzye.com/series/${SERIES.slug}/part-${partNumber}`,
        publishedAt,
        published: true,
        tags: essay.tags,
        entities: essay.entities,
        pullQuote: essay.pullQuote || null,
        seriesId: series.id,
        seriesOrder: partNumber,
      },
    });
    console.log(`    ✓ published /article/${article.slug} (${essay.content.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length} words)`);
  }

  console.log(failures ? `Done, with ${failures} part(s) skipped — re-run to retry them.` : 'Done.');
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
