export interface PoolEntry {
  members: string
  team: string
  espnTeam: string
  group: string
  flag: string
}

export const POOL: PoolEntry[] = [
  { members: 'Nick Giambra & Raghavi Palwai',           team: 'Ivory Coast',  espnTeam: "côte d'ivoire",     group: 'E',   flag: '🇨🇮' },
  { members: 'Alhasan Abdallah & Christopher Schrump',  team: 'Sweden',       espnTeam: 'sweden',            group: 'TBD', flag: '🇸🇪' },
  { members: 'Ashish Abraham & Dhiraj Krishnamurthi',   team: 'Curacao',      espnTeam: 'curaçao',           group: 'E',   flag: '🇨🇼' },
  { members: 'Tanner Vallely & Alex Drexel',            team: 'Panama',       espnTeam: 'panama',            group: 'L',   flag: '🇵🇦' },
  { members: 'Chisom Okafor & Victoria Pavsic',         team: 'Congo',        espnTeam: 'congo',             group: 'TBD', flag: '🇨🇬' },
  { members: 'Ben Armero & Marcela Avila Daza',         team: 'New Zealand',  espnTeam: 'new zealand',       group: 'H',   flag: '🇳🇿' },
  { members: 'Ana Arias & Andrew Baiden-Amissah',       team: 'Ghana',        espnTeam: 'ghana',             group: 'L',   flag: '🇬🇭' },
  { members: 'Connor Murphy',                           team: 'Cape Verde',   espnTeam: 'cape verde',        group: 'H',   flag: '🇨🇻' },
  { members: 'Temi Jones',                              team: 'Saudi Arabia', espnTeam: 'saudi arabia',      group: 'H',   flag: '🇸🇦' },
  { members: 'Gerry Castillo',                          team: 'Haiti',        espnTeam: 'haiti',             group: 'C',   flag: '🇭🇹' },
  { members: 'Sheila Suazo',                            team: 'Tunisia',      espnTeam: 'tunisia',           group: 'F',   flag: '🇹🇳' },
  { members: 'DeVierre Gomez',                          team: 'Senegal',      espnTeam: 'senegal',           group: 'I',   flag: '🇸🇳' },
  { members: 'Pavee Learrajinda',                       team: 'Paraguay',     espnTeam: 'paraguay',          group: 'D',   flag: '🇵🇾' },
  { members: 'John Taube',                              team: 'Czech',        espnTeam: 'czech republic',    group: 'TBD', flag: '🇨🇿' },
  { members: 'Yamir Thompson',                          team: 'Algeria',      espnTeam: 'algeria',           group: 'J',   flag: '🇩🇿' },
  { members: 'Dakari Worrell',                          team: 'Iran',         espnTeam: 'iran',              group: 'G',   flag: '🇮🇷' },
  { members: 'Nikhitha Adepu',                          team: 'Jordan',       espnTeam: 'jordan',            group: 'K',   flag: '🇯🇴' },
  { members: 'Marcus Wright Watson & Fife',             team: 'Qatar',        espnTeam: 'qatar',             group: 'B',   flag: '🇶🇦' },
  { members: 'Stefano Marzullo',                        team: 'Uzbek',        espnTeam: 'uzbekistan',        group: 'K',   flag: '🇺🇿' },
  { members: 'Anthony Jeleric',                         team: 'South Africa', espnTeam: 'south africa',      group: 'A',   flag: '🇿🇦' },
  { members: 'Emily Antico',                            team: 'Scotland',     espnTeam: 'scotland',          group: 'C',   flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿' },
  { members: 'Joey Lees',                               team: 'Australia',    espnTeam: 'australia',         group: 'D',   flag: '🇦🇺' },
  { members: 'Mumin Cam',                               team: 'Bosnia',       espnTeam: 'bosnia-herzegovina',group: 'TBD', flag: '🇧🇦' },
  { members: 'Lyle Landman',                            team: 'Iraq',         espnTeam: 'iraq',              group: 'TBD', flag: '🇮🇶' },
]

export const STAGE_ORDER: Record<string, number> = {
  winner: 8,
  final: 7,
  semifinal: 6,
  quarterfinal: 5,
  'round of 16': 4,
  'round of 32': 3,
  group: 2,
  eliminated: 0,
}

export const STAGE_LABELS: Record<string, string> = {
  winner: 'Champion',
  final: 'Final',
  semifinal: 'Semifinal',
  quarterfinal: 'Quarterfinal',
  'round of 16': 'Round of 16',
  'round of 32': 'Round of 32',
  group: 'Group stage',
  eliminated: 'Eliminated',
}
