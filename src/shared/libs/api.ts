import { Company } from "@/entities/company/types";
import { Country } from "@/entities/country/types";
import { Post } from "@/entities/post/types";

export const countries: Country[] = [
  { code: "US", name: "United States", koreanName: "미국" },
  { code: "DE", name: "Germany", koreanName: "독일" },
  { code: "KR", name: "South Korea", koreanName: "한국" },
];

export const companies: Company[] = [
  {
    id: "c1",
    name: "Acme Corp",
    country: "US",
    emissions: [
      { yearMonth: "2024-01", source: "steel",       scope: 3, emissions: 48 },
      { yearMonth: "2024-01", source: "plastic",     scope: 3, emissions: 22 },
      { yearMonth: "2024-01", source: "electricity", scope: 2, emissions: 65 },
      { yearMonth: "2024-01", source: "natural gas", scope: 1, emissions: 38 },
      { yearMonth: "2024-01", source: "diesel",      scope: 1, emissions: 82 },
      { yearMonth: "2024-01", source: "shipping",    scope: 3, emissions: 30 },

      { yearMonth: "2024-02", source: "steel",       scope: 3, emissions: 52 },
      { yearMonth: "2024-02", source: "plastic",     scope: 3, emissions: 25 },
      { yearMonth: "2024-02", source: "electricity", scope: 2, emissions: 70 },
      { yearMonth: "2024-02", source: "natural gas", scope: 1, emissions: 42 },
      { yearMonth: "2024-02", source: "diesel",      scope: 1, emissions: 88 },
      { yearMonth: "2024-02", source: "shipping",    scope: 3, emissions: 28 },

      { yearMonth: "2024-03", source: "steel",       scope: 3, emissions: 55 },
      { yearMonth: "2024-03", source: "plastic",     scope: 3, emissions: 28 },
      { yearMonth: "2024-03", source: "electricity", scope: 2, emissions: 72 },
      { yearMonth: "2024-03", source: "natural gas", scope: 1, emissions: 40 },
      { yearMonth: "2024-03", source: "diesel",      scope: 1, emissions: 75 },
      { yearMonth: "2024-03", source: "shipping",    scope: 3, emissions: 32 },

      { yearMonth: "2024-04", source: "steel",       scope: 3, emissions: 50 },
      { yearMonth: "2024-04", source: "plastic",     scope: 3, emissions: 24 },
      { yearMonth: "2024-04", source: "electricity", scope: 2, emissions: 68 },
      { yearMonth: "2024-04", source: "natural gas", scope: 1, emissions: 36 },
      { yearMonth: "2024-04", source: "diesel",      scope: 1, emissions: 80 },
      { yearMonth: "2024-04", source: "shipping",    scope: 3, emissions: 29 },

      { yearMonth: "2024-05", source: "steel",       scope: 3, emissions: 58 },
      { yearMonth: "2024-05", source: "plastic",     scope: 3, emissions: 26 },
      { yearMonth: "2024-05", source: "electricity", scope: 2, emissions: 74 },
      { yearMonth: "2024-05", source: "natural gas", scope: 1, emissions: 44 },
      { yearMonth: "2024-05", source: "diesel",      scope: 1, emissions: 90 },
      { yearMonth: "2024-05", source: "shipping",    scope: 3, emissions: 33 },

      { yearMonth: "2024-06", source: "steel",       scope: 3, emissions: 53 },
      { yearMonth: "2024-06", source: "plastic",     scope: 3, emissions: 23 },
      { yearMonth: "2024-06", source: "electricity", scope: 2, emissions: 69 },
      { yearMonth: "2024-06", source: "natural gas", scope: 1, emissions: 39 },
      { yearMonth: "2024-06", source: "diesel",      scope: 1, emissions: 85 },
      { yearMonth: "2024-06", source: "shipping",    scope: 3, emissions: 31 },
    ],
  },
  {
    id: "c2",
    name: "Globex",
    country: "DE",
    emissions: [
      { yearMonth: "2024-01", source: "aluminum",    scope: 3, emissions: 40 },
      { yearMonth: "2024-01", source: "steel",       scope: 3, emissions: 25 },
      { yearMonth: "2024-01", source: "electricity", scope: 2, emissions: 48 },
      { yearMonth: "2024-01", source: "lpg",         scope: 1, emissions: 28 },
      { yearMonth: "2024-01", source: "diesel",      scope: 1, emissions: 58 },

      { yearMonth: "2024-02", source: "aluminum",    scope: 3, emissions: 44 },
      { yearMonth: "2024-02", source: "steel",       scope: 3, emissions: 28 },
      { yearMonth: "2024-02", source: "electricity", scope: 2, emissions: 52 },
      { yearMonth: "2024-02", source: "lpg",         scope: 1, emissions: 32 },
      { yearMonth: "2024-02", source: "diesel",      scope: 1, emissions: 62 },

      { yearMonth: "2024-03", source: "aluminum",    scope: 3, emissions: 42 },
      { yearMonth: "2024-03", source: "steel",       scope: 3, emissions: 26 },
      { yearMonth: "2024-03", source: "electricity", scope: 2, emissions: 50 },
      { yearMonth: "2024-03", source: "lpg",         scope: 1, emissions: 30 },
      { yearMonth: "2024-03", source: "diesel",      scope: 1, emissions: 55 },

      { yearMonth: "2024-04", source: "aluminum",    scope: 3, emissions: 46 },
      { yearMonth: "2024-04", source: "steel",       scope: 3, emissions: 29 },
      { yearMonth: "2024-04", source: "electricity", scope: 2, emissions: 54 },
      { yearMonth: "2024-04", source: "lpg",         scope: 1, emissions: 33 },
      { yearMonth: "2024-04", source: "diesel",      scope: 1, emissions: 60 },

      { yearMonth: "2024-05", source: "aluminum",    scope: 3, emissions: 48 },
      { yearMonth: "2024-05", source: "steel",       scope: 3, emissions: 30 },
      { yearMonth: "2024-05", source: "electricity", scope: 2, emissions: 56 },
      { yearMonth: "2024-05", source: "lpg",         scope: 1, emissions: 35 },
      { yearMonth: "2024-05", source: "diesel",      scope: 1, emissions: 65 },

      { yearMonth: "2024-06", source: "aluminum",    scope: 3, emissions: 45 },
      { yearMonth: "2024-06", source: "steel",       scope: 3, emissions: 27 },
      { yearMonth: "2024-06", source: "electricity", scope: 2, emissions: 53 },
      { yearMonth: "2024-06", source: "lpg",         scope: 1, emissions: 31 },
      { yearMonth: "2024-06", source: "diesel",      scope: 1, emissions: 63 },
    ],
  },
];

export const posts: Post[] = [
  {
    id: "p1",
    title: "Sustainability Report",
    resourceUid: "c1",
    dateTime: "2024-02",
    content: "Quarterly CO2 update",
  },
];

const _countries = [...countries];
const _companies = [...companies];
let _posts = [...posts];

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
const jitter = () => 200 + Math.random() * 600;
const maybeFail = () => Math.random() < 0.15;

export async function fetchCountries() {
  await delay(jitter());
  return _countries;
}

export async function fetchCompanies() {
  await delay(jitter());
  return _companies;
}

export async function fetchPosts() {
  await delay(jitter());
  return _posts;
}

export async function createOrUpdatePost(p: Omit<Post, "id"> & { id?: string }) {
  await delay(jitter());
  if (maybeFail()) throw new Error("Save failed");
  if (p.id) {
    _posts = _posts.map(x => x.id === p.id ? (p as Post) : x);
    return p as Post;
  }
  const created = { ...p, id: crypto.randomUUID() };
  _posts = [..._posts, created];
  return created;
}
