import { faker } from "@faker-js/faker";
import { cache } from "react";

import { promisify } from "util";

const url = "https://api-football-standings.azharimm.dev";

export interface League {
    id: string;
    name: string;
    slug: string;
    abbr: string;
    logos: Logos;
}

export interface Logos {
    light: string;
    dark: string;
}

export interface Data {
    name: string;
    abbreviation: string;
    seasonDisplay: string;
    season: number;
    standings: Standing[];
}

export interface Standing {
    team: Team;
    note?: Note;
    stats: Stat[];
}

export interface Team {
    id: string;
    uid: string;
    location: string;
    name: string;
    abbreviation: string;
    displayName: string;
    shortDisplayName: string;
    isActive: boolean;
    logos: Logo[];
    isNational: boolean;
}

export interface Logo {
    href: string;
    width: number;
    height: number;
    alt: string;
    rel: string[];
    lastUpdated: string;
}

export interface Note {
    color: string;
    description: string;
    rank: number;
}

export interface Stat {
    name: string;
    displayName: string;
    shortDisplayName: string;
    description: string;
    abbreviation: string;
    type: string;
    value?: number;
    displayValue: string;
    id?: string;
    summary?: string;
}

const sleep = promisify(setTimeout);

const api = {
    leagues: {
        list: (): Promise<League[]> =>
            fetch(`${url}/leagues`)
                .then((res) => res.json())
                .then((res) => res.data),
        details: (id: string): Promise<League> =>
            fetch(`${url}/leagues/${id}`)
                .then((res) => res.json())
                .then((res) => res.data),
        standings: (id: string): Promise<Data> =>
            fetch(`${url}/leagues/${id}/standings?season=2022&sort=asc`)
                .then((res) => res.json())
                .then((res) => res.data),

        team: {
            details: async (standingsId: string, id: string) => {
                await sleep(5000);
                const { standings } = await api.leagues.standings(standingsId);
                const team = standings.find(
                    (standing) => standing.team.id === id
                )?.team;

                if (!team) {
                    throw new Error("Team not found");
                }

                return team;
            },
            matches: cache(async (id: string) => {
                await sleep(5000);

                return Promise.resolve(
                    new Array(5).fill(null).map((_, i) => ({
                        id: i,
                        result: {
                            home: Math.floor(Math.random() * 5),
                            away: Math.floor(Math.random() * 5),
                        },
                        playedHome: Math.random() > 0.5,
                    }))
                );
            }),
            players: cache(async (id: string) => {
                await sleep(5000);

                return Promise.resolve(
                    new Array(18).fill(null).map(createRandomPlayer)
                );
            }),
        },
    },
};

export default api;

function createRandomPlayer() {
    return {
        id: faker.number.int(),
        name: faker.person.fullName(),
        position: faker.helpers.arrayElement([
            "Goalkeeper",
            "Defender",
            "Midfielder",
            "Forward",
        ]),
        image: faker.image.urlLoremFlickr({ category: "footballer" }),
        country: faker.location.country(),
    };
}
