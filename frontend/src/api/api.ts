import { Language, NewestAnswerRef } from "../types/language";

export function check(name: string) {
  return fetch("http://localhost:3000/check", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
    }),
  });
}

export function getLanguages() {
  return fetch("http://localhost:3000/languages")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch newest answer ref");
    }
    return response;
  })
      .then(async (response) => (await response.json()) as Language[])
      
}

export function getNewestAnswerRef() {
  return fetch("http://localhost:3000/newest-answer-ref")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch newest answer ref");
    }
    return response;
  })
  .then(async (response) => (await response.json()) as NewestAnswerRef)
}