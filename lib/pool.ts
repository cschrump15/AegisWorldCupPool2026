export interface PoolEntry {
  members: string
  team: string
  espnTeam: string
  group: string
  flag: string
  bg: string
  text: string
  border: string
}

export const POOL: PoolEntry[] = [
  { members: 'Nick Giambra & Raghavi Palwai',           team: 'Ivory Coast',  espnTeam: 'Ivory Coast',        group: 'E',   flag: '🇨🇮', bg: '#F77F00', text: '#fff',     border: '#009A44' },
  { members: 'Alhasan Abdallah & Christopher Schrump',  team: 'Sweden',       espnTeam: 'Sweden',             group: 'F',   flag: '🇸🇪', bg: '#006AA7', text: '#FECC02',  border: '#FECC02' },
  { members: 'Ashish Abraham & Dhiraj Krishnamurthi',   team: 'Curacao',      espnTeam: 'Curaçao',            group: 'E',   flag: '🇨🇼', bg: '#002B7F', text: '#fff',     border: '#F9D616' },
  { members: 'Tanner Vallely & Alex Drexel',            team: 'Panama',       espnTeam: 'Panama',             group: 'L',   flag: '🇵🇦', bg: '#FFFFFF', text: '#B22234',  border: '#002C6A' },
  { members: 'Chisom Okafor & Victoria Pavsic',         team: 'Congo',        espnTeam: 'Congo DR',           group: 'K',   flag: '🇨🇬', bg: '#007FFF', text: '#fff',     border: '#CE1021' },
  { members: 'Ben Armero & Marcela Avila Daza',         team: 'New Zealand',  espnTeam: 'New Zealand',        group: 'G',   flag: '🇳🇿', bg: '#00247D', text: '#fff',     border: '#CC142B' },
  { members: 'Ana Arias & Andrew Baiden-Amissah',       team: 'Ghana',        espnTeam: 'Ghana',              group: 'L',   flag: '🇬🇭', bg: '#006B3F', text: '#FCD116',  border: '#EF3340' },
  { members: 'Connor Murphy',                           team: 'Cape Verde',   espnTeam: 'Cape Verde',         group: 'H',   flag: '🇨🇻', bg: '#003893', text: '#fff',     border: '#CF2027' },
  { members: 'Temi Jones',                              team: 'Saudi Arabia', espnTeam: 'Saudi Arabia',       group: 'H',   flag: '🇸🇦', bg: '#006C35', text: '#fff',     border: '#fff' },
  { members: 'Gerry Castillo',                          team: 'Haiti',        espnTeam: 'Haiti',              group: 'C',   flag: '🇭🇹', bg: '#00209F', text: '#fff',     border: '#D21034' },
  { members: 'Sheila Suazo',                            team: 'Tunisia',      espnTeam: 'Tunisia',            group: 'F',   flag: '🇹🇳', bg: '#E70013', text: '#fff',     border: '#fff' },
  { members: 'DeVierre Gomez',                          team: 'Senegal',      espnTeam: 'Senegal',            group: 'I',   flag: '🇸🇳', bg: '#00853F', text: '#FDEF42',  border: '#E31B23' },
  { members: 'Pavee Learrajinda',                       team: 'Paraguay',     espnTeam: 'Paraguay',           group: 'D',   flag: '🇵🇾', bg: '#D52B1E', text: '#fff',     border: '#0038A8' },
  { members: 'John Taube',                              team: 'Czech',        espnTeam: 'Czechia',            group: 'A',   flag: '🇨🇿', bg: '#D7141A', text: '#fff',     border: '#11457E' },
  { members: 'Yamir Thompson',                          team: 'Algeria',      espnTeam: 'Algeria',            group: 'J',   flag: '🇩🇿', bg: '#006233', text: '#fff',     border: '#D21034' },
  { members: 'Dakari Worrell',                          team: 'Iran',         espnTeam: 'Iran',               group: 'G',   flag: '🇮🇷', bg: '#239F40', text: '#fff',     border: '#DA0000' },
  { members: 'Nikhitha Adepu',                          team: 'Jordan',       espnTeam: 'Jordan',             group: 'J',   flag: '🇯🇴', bg: '#007A3D', text: '#fff',     border: '#CE1126' },
  { members: 'Marcus Wright Watson & Fife',             team: 'Qatar',        espnTeam: 'Qatar',              group: 'B',   flag: '🇶🇦', bg: '#8D1B3D', text: '#fff',     border: '#fff' },
  { members: 'Stefano Marzullo',                        team: 'Uzbek',        espnTeam: 'Uzbekistan',         group: 'K',   flag: '🇺🇿', bg: '#1EB53A', text: '#fff',     border: '#0099B5' },
  { members: 'Anthony Jeleric',                         team: 'South Africa', espnTeam: 'South Africa',       group: 'A',   flag: '🇿🇦', bg: '#007A4D', text: '#fff',     border: '#FFB81C' },
  { members: 'Emily Antico',                            team: 'Scotland',     espnTeam: 'Scotland',           group: 'C',   flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', bg: '#003F87', text: '#fff',     border: '#fff' },
  { members: 'Joey Lees',                               team: 'Australia',    espnTeam: 'Australia',          group: 'D',   flag: '🇦🇺', bg: '#00008B', text: '#FFCD00',  border: '#FFCD00' },
  { members: 'Mumin Cam',                               team: 'Bosnia',       espnTeam: 'Bosnia-Herzegovina', group: 'B',   flag: '🇧🇦', bg: '#002395', text: '#FFCD00',  border: '#FFCD00' },
  { members: 'Lyle Landman',                            team: 'Iraq',         espnTeam: 'Iraq',               group: 'I',   flag: '🇮🇶', bg: '#CE1126', text: '#fff',     border: '#000' },
]

export const STAGE_ORDER: Record<string, number> = {
  winner: 8, final: 7, semifinal: 6, quarterfinal: 5,
  'round of 16': 4, 'round of 32': 3, group: 2, eliminated: 0,
}

export const STAGE_LABELS: Record<string, string> = {
  winner: 'Champion', final: 'Final', semifinal: 'Semifinal',
  quarterfinal: 'Quarterfinal', 'round of 16': 'Round of 16',
  'round of 32': 'Round of 32', group: 'Group stage', eliminated: 'Eliminated',
}
