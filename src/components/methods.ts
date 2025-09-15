// services/footballService.ts
import { getCalendar, getFixtures, getLiveFixtures, getStandings } from "@/constant/api.config";
import { getCategories, getPosts } from "@/services/blog";
import { useFootballStore } from "@/store/footballStore";

interface CalendarResponse {
  competition: {
    tournamentCalendar?: { id: string }[];
  }[];
}

interface CategoriesResponse {
  response?: { data?: any[] };
}

interface PostsResponse {
  response?: { data?: any[] };
}


export async function fetchFootballData() {
  const {
    setCategories,
    setPosts,
    setCalendar,
    setFixtures,
    setLiveFixtures,
    setStandings,
    setLoading,
    setError,
  } = useFootballStore.getState();

  try {
    setLoading(true);

    // fetch meta
    const [categoriesRes, postsRes, calendarRes] = (await Promise.all([
      getCategories(),
      getPosts(),
      getCalendar(),
    ])) as [CategoriesResponse, PostsResponse, CalendarResponse];;

    const categories = categoriesRes?.response?.data ?? [];
    const posts = postsRes?.response?.data ?? [];
    const calendar = calendarRes?.competition ?? [];

    setCategories(categories);
    setPosts(posts);
    setCalendar(calendar);

    // fetch fixtures
    const ids = calendar
      .map((c: any) => c?.tournamentCalendar?.[0]?.id)
      .filter(Boolean);

    if (ids.length > 0) {
      const [fixturesResults, liveFixturesResults, standings] = await Promise.all([
        Promise.all(
          ids.map(async (id: string) => {
            try {
              return await getFixtures(id);
            } catch (e) {
              console.error(`Failed fixtures for id ${id}`, e);
              return { match: [] };
            }
          })
        ),
        Promise.all(
          ids.map(async (id: string) => {
            try {
              return await getLiveFixtures(id);
            } catch (e) {
              console.error(`Failed live fixtures for id ${id}`, e);
              return { match: [] };
            }
          })
        ),
        Promise.all(
          ids.map(async (id: string) => {
            try {
              return await getStandings(id);
            } catch (e) {
              console.error(`Failed fetching standings for id ${id}`, e);
              return { match: [] };
            }
          })
        ),
      ]);

      setFixtures(fixturesResults.flatMap((f: any) => f?.match ?? []));
      setLiveFixtures(liveFixturesResults.flatMap((f: any) => f?.match ?? []));
      setStandings(standings ?? []);
    } else {
      setFixtures([]);
      setLiveFixtures([]);
      setStandings([]);
    }

    setError(null);
  } catch (err) {
    console.error("Failed fetching football data:", err);
    setError("Failed to load football data.");
  } finally {
    setLoading(false);
  }
}


  export const normalizeLiveData = (liveData) => {
  const cards = liveData.card.map((c) => ({
    id: c.timeMinSec,
    type: 'card',
    minute: c.timeMin,
    player: c.playerName,
    cardType: c.type, // "yellow" | "red" | "yellow_red"
    team: c.contestantId,
  }));

  const goals = liveData.goal.map((g) => ({
    id: g.timeMinSec,
    type: "goal",
    minute: g.timeMin,
    player: g.scorerName,
    // assist: g.assist,
    team: g.contestantId,
    score: `${g.homeScore} - ${g.awayScore}`, // e.g. "0 - 1"
    method: g.type, // e.g. "Penalty"
  }));

  const subs = liveData.substitute.map((s) => ({
    id: s.timeMinSec,
    type: "substitute",
    minute: s.timeMin,
    playerIn: s.playerOnName,
    playerOut: s.playerOffName,
    team: s.contestantId,
  }));

  return [...cards, ...goals, ...subs].sort((a, b) => a.minute - b.minute);
};

export const getCountryNavLists = (tournament: string, id: any) => [
  { title: "news", path: `/football/${tournament}/team-news?fixture=${id}` },
  { title: "Scores & Fixtures", path: `/football/${tournament}/scores-fixtures?fixture=${id}` },
  { title: "Table", path: `/football/${tournament}/table?fixture=${id}` },
  { title: "matches", path: `/football/${tournament}/matches?fixture=${id}` },
  { title: "squad", path: `/football/${tournament}/squad?fixture=${id}` },
  { title: "statistics", path: `/football/${tournament}/statistics?fixture=${id}` },
  { title: "trophies", path: `/football/${tournament}/trophies?fixture=${id}` },
  // { title: "teams", path: `/football/${tournament}/all-teams?fixture=${id}` },
  // { title: "leagues & cup", path: `/football/${tournament}/leagues-&-cups?fixture=${id}` },
  // { title: "venue", path: `/football/${tournament}/venue?fixture=${id}` },
  { title: "info & archive", path: `/football/${tournament}/info-&-archive?fixture=${id}` },
];

export const getTournamentNavLists = (tournament: string) => [
  { title: "news", path: `/football/${tournament}/news` },
  { title: "Scores & Fixtures", path: `/football/${tournament}/scores-fixtures` },
  { title: "Table", path: `/football/${tournament}/table` },
];


export const fifaToIso2: Record<string, string> = {
  AFG: "af", // Afghanistan
  ALB: "al", // Albania
  ALG: "dz", // Algeria
  ASA: "as", // American Samoa
  AND: "ad", // Andorra
  ANG: "ao", // Angola
  AIA: "ai", // Anguilla
  ATG: "ag", // Antigua and Barbuda
  ARG: "ar", // Argentina
  ARM: "am", // Armenia
  ARU: "aw", // Aruba
  AUS: "au", // Australia
  AUT: "at", // Austria
  AZE: "az", // Azerbaijan
  BAH: "bs", // Bahamas
  BHR: "bh", // Bahrain
  BAN: "bd", // Bangladesh
  BRB: "bb", // Barbados
  BLR: "by", // Belarus
  BEL: "be", // Belgium
  BLZ: "bz", // Belize
  BEN: "bj", // Benin
  BER: "bm", // Bermuda
  BHU: "bt", // Bhutan
  BOL: "bo", // Bolivia
  BIH: "ba", // Bosnia and Herzegovina
  BOT: "bw", // Botswana
  BRA: "br", // Brazil
  VGB: "vg", // British Virgin Islands
  BRU: "bn", // Brunei Darussalam
  BUL: "bg", // Bulgaria
  BFA: "bf", // Burkina Faso
  BDI: "bi", // Burundi
  CPV: "cv", // Cape Verde
  CAM: "kh", // Cambodia
  CMR: "cm", // Cameroon
  CAN: "ca", // Canada
  CAY: "ky", // Cayman Islands
  CTA: "cf", // Central African Republic
  CHA: "td", // Chad
  CHI: "cl", // Chile
  CHN: "cn", // China PR
  COL: "co", // Colombia
  COM: "km", // Comoros
  COD: "cd", // DR Congo
  CGO: "cg", // Congo
  COK: "ck", // Cook Islands
  CRC: "cr", // Costa Rica
  CRO: "hr", // Croatia
  CUB: "cu", // Cuba
  CUW: "cw", // Curaçao
  CYP: "cy", // Cyprus
  CZE: "cz", // Czechia
  DEN: "dk", // Denmark
  DJI: "dj", // Djibouti
  DMA: "dm", // Dominica
  DOM: "do", // Dominican Republic
  ECU: "ec", // Ecuador
  EGY: "eg", // Egypt
  SLV: "sv", // El Salvador
  ENG: "gb", // England (uses GB)
  EQG: "gq", // Equatorial Guinea
  ERI: "er", // Eritrea
  EST: "ee", // Estonia
  SWZ: "sz", // Eswatini
  ETH: "et", // Ethiopia
  FRO: "fo", // Faroe Islands
  FIJ: "fj", // Fiji
  FIN: "fi", // Finland
  FRA: "fr", // France
  GAB: "ga", // Gabon
  GAM: "gm", // Gambia
  GEO: "ge", // Georgia
  GER: "de", // Germany
  GHA: "gh", // Ghana
  GIB: "gi", // Gibraltar
  GRE: "gr", // Greece
  GRN: "gd", // Grenada
  GUM: "gu", // Guam
  GUA: "gt", // Guatemala
  GGY: "gg", // Guernsey
  GUI: "gn", // Guinea
  GNB: "gw", // Guinea-Bissau
  GUY: "gy", // Guyana
  HAI: "ht", // Haiti
  HON: "hn", // Honduras
  HKG: "hk", // Hong Kong
  HUN: "hu", // Hungary
  ISL: "is", // Iceland
  IND: "in", // India
  IDN: "id", // Indonesia
  IRN: "ir", // Iran
  IRQ: "iq", // Iraq
  IRL: "ie", // Ireland
  ISR: "il", // Israel
  ITA: "it", // Italy
  JAM: "jm", // Jamaica
  JPN: "jp", // Japan
  JOR: "jo", // Jordan
  KAZ: "kz", // Kazakhstan
  KEN: "ke", // Kenya
  KIR: "ki", // Kiribati
  KOS: "xk", // Kosovo
  KUW: "kw", // Kuwait
  KGZ: "kg", // Kyrgyzstan
  LAO: "la", // Laos
  LVA: "lv", // Latvia
  LBN: "lb", // Lebanon
  LES: "ls", // Lesotho
  LBR: "lr", // Liberia
  LBY: "ly", // Libya
  LIE: "li", // Liechtenstein
  LTU: "lt", // Lithuania
  LUX: "lu", // Luxembourg
  MAC: "mo", // Macao
  MAD: "mg", // Madagascar
  MWI: "mw", // Malawi
  MAS: "my", // Malaysia
  MDV: "mv", // Maldives
  MLI: "ml", // Mali
  MLT: "mt", // Malta
  MTN: "mr", // Mauritania
  MRI: "mu", // Mauritius
  MEX: "mx", // Mexico
  MDA: "md", // Moldova
  MCO: "mc", // Monaco
  MNG: "mn", // Mongolia
  MNE: "me", // Montenegro
  MSR: "ms", // Montserrat
  MAR: "ma", // Morocco
  MOZ: "mz", // Mozambique
  MYA: "mm", // Myanmar
  NAM: "na", // Namibia
  NEP: "np", // Nepal
  NED: "nl", // Netherlands
  NCL: "nc", // New Caledonia
  NZL: "nz", // New Zealand
  NCA: "ni", // Nicaragua
  NIG: "ne", // Niger
  NGA: "ng", // Nigeria
  PRK: "kp", // North Korea
  MKD: "mk", // North Macedonia
  NIR: "gb", // Northern Ireland
  NOR: "no", // Norway
  OMA: "om", // Oman
  PAK: "pk", // Pakistan
  PLE: "ps", // Palestine
  PAN: "pa", // Panama
  PNG: "pg", // Papua New Guinea
  PAR: "py", // Paraguay
  PER: "pe", // Peru
  PHI: "ph", // Philippines
  POL: "pl", // Poland
  POR: "pt", // Portugal
  PUR: "pr", // Puerto Rico
  QAT: "qa", // Qatar
  ROU: "ro", // Romania
  RUS: "ru", // Russia
  RWA: "rw", // Rwanda
  SAM: "ws", // Samoa
  SMR: "sm", // San Marino
  STP: "st", // São Tomé and Príncipe
  KSA: "sa", // Saudi Arabia
  SCO: "gb", // Scotland
  SEN: "sn", // Senegal
  SRB: "rs", // Serbia
  SEY: "sc", // Seychelles
  SLE: "sl", // Sierra Leone
  SIN: "sg", // Singapore
  SVK: "sk", // Slovakia
  SVN: "si", // Slovenia
  SOL: "sb", // Solomon Islands
  SOM: "so", // Somalia
  RSA: "za", // South Africa
  KOR: "kr", // South Korea
  SSD: "ss", // South Sudan
  ESP: "es", // Spain
  SRI: "lk", // Sri Lanka
  SDN: "sd", // Sudan
  SUR: "sr", // Suriname
  SWE: "se", // Sweden
  SUI: "ch", // Switzerland
  SYR: "sy", // Syria
  TPE: "tw", // Chinese Taipei
  TJK: "tj", // Tajikistan
  TAN: "tz", // Tanzania
  THA: "th", // Thailand
  TLS: "tl", // Timor-Leste
  TOG: "tg", // Togo
  TGA: "to", // Tonga
  TRI: "tt", // Trinidad and Tobago
  TUN: "tn", // Tunisia
  TUR: "tr", // Turkey
  TKM: "tm", // Turkmenistan
  TCA: "tc", // Turks and Caicos Islands
  UGA: "ug", // Uganda
  UKR: "ua", // Ukraine
  UAE: "ae", // United Arab Emirates
  USA: "us", // USA
  URU: "uy", // Uruguay
  UZB: "uz", // Uzbekistan
  VAN: "vu", // Vanuatu
  VAT: "va", // Vatican City
  VEN: "ve", // Venezuela
  VIE: "vn", // Vietnam
  WAL: "gb", // Wales
  YEM: "ye", // Yemen
  ZAM: "zm", // Zambia
  ZIM: "zw", // Zimbabwe
};

export const COUNTRY_NAME_TO_ISO2: Record<string, string> = {
  "Afghanistan": "AF",
  "Åland Islands": "AX",
  "Albania": "AL",
  "Algeria": "DZ",
  "American Samoa": "AS",
  "Andorra": "AD",
  "Angola": "AO",
  "Anguilla": "AI",
  "Antarctica": "AQ",
  "Antigua and Barbuda": "AG",
  "Argentina": "AR",
  "Armenia": "AM",
  "Aruba": "AW",
  "Australia": "AU",
  "Austria": "AT",
  "Azerbaijan": "AZ",
  "Bahamas": "BS",
  "Bahrain": "BH",
  "Bangladesh": "BD",
  "Barbados": "BB",
  "Belarus": "BY",
  "Belgium": "BE",
  "Belize": "BZ",
  "Benin": "BJ",
  "Bermuda": "BM",
  "Bhutan": "BT",
  "Bolivia (Plurinational State of)": "BO",
  "Bosnia and Herzegovina": "BA",
  "Botswana": "BW",
  "Bouvet Island": "BV",
  "Brazil": "BR",
  "British Indian Ocean Territory": "IO",
  "Brunei Darussalam": "BN",
  "Bulgaria": "BG",
  "Burkina Faso": "BF",
  "Burundi": "BI",
  "Cabo Verde": "CV",
  "Cambodia": "KH",
  "Cameroon": "CM",
  "Canada": "CA",
  "Cayman Islands": "KY",
  "Central African Republic": "CF",
  "Chad": "TD",
  "Chile": "CL",
  "China": "CN",
  "Christmas Island": "CX",
  "Cocos (Keeling) Islands": "CC",
  "Colombia": "CO",
  "Comoros": "KM",
  "Congo (the Democratic Republic of the)": "CD",
  "Congo (the)": "CG",
  "Cook Islands": "CK",
  "Costa Rica": "CR",
  "Côte d'Ivoire": "CI",
  "Croatia": "HR",
  "Cuba": "CU",
  "Curaçao": "CW",
  "Cyprus": "CY",
  "Czechia": "CZ",
  "Denmark": "DK",
  "Djibouti": "DJ",
  "Dominica": "DM",
  "Dominican Republic": "DO",
  "Ecuador": "EC",
  "Egypt": "EG",
  "El Salvador": "SV",
  "Equatorial Guinea": "GQ",
  "Eritrea": "ER",
  "Estonia": "EE",
  "Eswatini": "SZ",
  "Ethiopia": "ET",
  "Falkland Islands (Malvinas)": "FK",
  "Faroe Islands": "FO",
  "Fiji": "FJ",
  "Finland": "FI",
  "France": "FR",
  "French Guiana": "GF",
  "French Polynesia": "PF",
  "French Southern Territories": "TF",
  "Gabon": "GA",
  "Gambia (the)": "GM",
  "Georgia": "GE",
  "Germany": "DE",
  "Ghana": "GH",
  "Gibraltar": "GI",
  "Greece": "GR",
  "Greenland": "GL",
  "Grenada": "GD",
  "Guadeloupe": "GP",
  "Guam": "GU",
  "Guatemala": "GT",
  "Guernsey": "GG",
  "Guinea": "GN",
  "Guinea-Bissau": "GW",
  "Guyana": "GY",
  "Haiti": "HT",
  "Heard Island and McDonald Islands": "HM",
  "Holy See (Vatican City State)": "VA",
  "Honduras": "HN",
  "Hong Kong": "HK",
  "Hungary": "HU",
  "Iceland": "IS",
  "India": "IN",
  "Indonesia": "ID",
  "Iran (Islamic Republic of)": "IR",
  "Iraq": "IQ",
  "Ireland": "IE",
  "Isle of Man": "IM",
  "Israel": "IL",
  "Italy": "IT",
  "Jamaica": "JM",
  "Japan": "JP",
  "Jersey": "JE",
  "Jordan": "JO",
  "Kazakhstan": "KZ",
  "Kenya": "KE",
  "Kiribati": "KI",
  "Korea (Republic of)": "KR",
  "Kuwait": "KW",
  "Kyrgyzstan": "KG",
  "Lao People's Democratic Republic": "LA",
  "Latvia": "LV",
  "Lebanon": "LB",
  "Lesotho": "LS",
  "Liberia": "LR",
  "Libya": "LY",
  "Liechtenstein": "LI",
  "Lithuania": "LT",
  "Luxembourg": "LU",
  "Macao": "MO",
  "Madagascar": "MG",
  "Malawi": "MW",
  "Malaysia": "MY",
  "Maldives": "MV",
  "Mali": "ML",
  "Malta": "MT",
  "Marshall Islands": "MH",
  "Martinique": "MQ",
  "Mauritania": "MR",
  "Mauritius": "MU",
  "Mayotte": "YT",
  "Mexico": "MX",
  "Micronesia (Federated States of)": "FM",
  "Moldova (Republic of)": "MD",
  "Monaco": "MC",
  "Mongolia": "MN",
  "Montenegro": "ME",
  "Montserrat": "MS",
  "Morocco": "MA",
  "Mozambique": "MZ",
  "Myanmar": "MM",
  "Namibia": "NA",
  "Nauru": "NR",
  "Nepal": "NP",
  "Netherlands": "NL",
  "New Caledonia": "NC",
  "New Zealand": "NZ",
  "Nicaragua": "NI",
  "Niger (the)": "NE",
  "Nigeria": "NG",
  "Niue": "NU",
  "Norfolk Island": "NF",
  "North Macedonia": "MK",
  "Northern Mariana Islands": "MP",
  "Norway": "NO",
  "Oman": "OM",
  "Pakistan": "PK",
  "Palau": "PW",
  "Palestine, State of": "PS",
  "Panama": "PA",
  "Papua New Guinea": "PG",
  "Paraguay": "PY",
  "Peru": "PE",
  "Philippines": "PH",
  "Pitcairn": "PN",
  "Poland": "PL",
  "Portugal": "PT",
  "Puerto Rico": "PR",
  "Qatar": "QA",
  "Réunion": "RE",
  "Romania": "RO",
  "Russian Federation": "RU",
  "Rwanda": "RW",
  "Saint Barthélemy": "BL",
  "Saint Helena, Ascension and Tristan da Cunha": "SH",
  "Saint Kitts and Nevis": "KN",
  "Saint Lucia": "LC",
  "Saint Martin (French part)": "MF",
  "Saint Pierre and Miquelon": "PM",
  "Saint Vincent and the Grenadines": "VC",
  "Samoa": "WS",
  "San Marino": "SM",
  "Sao Tomé and Príncipe": "ST",
  "Saudi Arabia": "SA",
  "Senegal": "SN",
  "Serbia": "RS",
  "Seychelles": "SC",
  "Sierra Leone": "SL",
  "Singapore": "SG",
  "Sint Maarten (Dutch part)": "SX",
  "Slovakia": "SK",
  "Slovenia": "SI",
  "Solomon Islands": "SB",
  "Somalia": "SO",
  "South Africa": "ZA",
  "South Georgia and the South Sandwich Islands": "GS",
  "South Sudan": "SS",
  "Spain": "ES",
  "Sri Lanka": "LK",
  "Sudan (the)": "SD",
  "Suriname": "SR",
  "Sweden": "SE",
  "Switzerland": "CH",
  "Syrian Arab Republic": "SY",
  "Taiwan, Province of China": "TW",
  "Tajikistan": "TJ",
  "Tanzania, United Republic of": "TZ",
  "Thailand": "TH",
  "Timor-Leste": "TL",
  "Togo": "TG",
  "Tokelau": "TK",
  "Tonga": "TO",
  "Trinidad and Tobago": "TT",
  "Tunisia": "TN",
  "Türkiye": "TR",
  "Turkmenistan": "TM",
  "Turks and Caicos Islands": "TC",
  "Tuvalu": "TV",
  "Uganda": "UG",
  "Ukraine": "UA",
  "United Arab Emirates": "AE",
  "United Kingdom of Great Britain and Northern Ireland": "GB",
  "United States of America": "US",
  "Uruguay": "UY",
  "Uzbekistan": "UZ",
  "Vanuatu": "VU",
  "Venezuela (Bolivarian Republic of)": "VE",
  "Viet Nam": "VN",
  "Wallis and Futuna": "WF",
  "Western Sahara": "EH",
  "Yemen": "YE",
  "Zambia": "ZM",
  "Zimbabwe": "ZW",
};

export function getFlagUrl(countryName?: string) {
  const code = countryName && COUNTRY_NAME_TO_ISO2[countryName];
  if (code) return `https://flagcdn.com/w40/${code.toLowerCase()}.png`;
  return "/fallback-flag.png"; // default if unknown
}
