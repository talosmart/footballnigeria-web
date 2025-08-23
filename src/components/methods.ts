// services/footballService.ts
import { getCalendar, getFixtures, getLiveFixtures, getStandings } from "@/constant/api.config";
import { getCategories, getPosts } from "@/services/blog";
import { useFootballStore } from "@/store/footballStore";

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
    const [categoriesRes, postsRes, calendarRes] = await Promise.all([
      getCategories(),
      getPosts(),
      getCalendar(),
    ]);

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

      setFixtures(fixturesResults.flatMap((f) => f?.match ?? []));
      setLiveFixtures(liveFixturesResults.flatMap((f) => f?.match ?? []));
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

export const getCountryNavLists = (tournament: string) => [
  { title: "news", path: `/football/${tournament}/news` },
  { title: "summary", path: `/football/${tournament}/summary` },
  { title: "matches", path: `/football/${tournament}/matches` },
  { title: "squad", path: `/football/${tournament}/squad` },
  { title: "statistics", path: `/football/${tournament}/statistics` },
  { title: "trophies", path: `/football/${tournament}/trophies` },
  { title: "teams", path: `/football/${tournament}/all-teams` },
  { title: "leagues & cup", path: `/football/${tournament}/leagues-&-cups` },
  { title: "venue", path: `/football/${tournament}/venue` },
];

export const getTournamentNavLists = (tournament: string) => [
  { title: "news", path: `/football/${tournament}/news` },
  { title: "Scores & Fixtures", path: `/football/${tournament}/matches` },
  { title: "Table", path: `/football/${tournament}/table` },
  { title: "stats", path: `/football/${tournament}/statistics` }
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
