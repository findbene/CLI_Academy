import {
  mergeSavedResources as mergeSavedResourcesCore,
  removeResourceFromList,
  toggleResourceInList,
  type SavedAcademyResource,
  type SavedAcademyResourceType,
  isResourceSaved,
} from "@/lib/academy-core";

export type { SavedAcademyResource, SavedAcademyResourceType };

const STORAGE_KEY = "cli_academy_saved_resources_v1";
const REMOTE_KEY = "__academy_saved_resources";

function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readSavedResources() {
  if (!canUseStorage()) {
    return [] as SavedAcademyResource[];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw) as SavedAcademyResource[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getSavedAcademyResources() {
  return readSavedResources();
}

function mergeSavedResources(resources: SavedAcademyResource[]) {
  return mergeSavedResourcesCore(resources);
}

export async function fetchSavedAcademyResourcesFromAccount() {
  try {
    const response = await fetch("/api/saved-resources", { method: "GET" });
    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as { resources?: SavedAcademyResource[] };
    return Array.isArray(data.resources) ? data.resources : [];
  } catch {
    return null;
  }
}

export async function persistSavedAcademyResourcesToAccount(resources: SavedAcademyResource[]) {
  try {
    const response = await fetch("/api/saved-resources", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ resources }),
    });

    return response.ok;
  } catch {
    return false;
  }
}

export async function getMergedSavedAcademyResources() {
  const local = readSavedResources();
  const remote = await fetchSavedAcademyResourcesFromAccount();

  if (!remote) {
    return local;
  }

  const merged = mergeSavedResources([...remote, ...local]);
  writeSavedResources(merged);
  await persistSavedAcademyResourcesToAccount(merged);
  return merged;
}

function writeSavedResources(resources: SavedAcademyResource[]) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(resources));
}

export function isAcademyResourceSaved(
  pathSlug: string,
  lessonSlug: string,
  resourceType: SavedAcademyResourceType,
  resourceSlug: string,
) {
  return isResourceSaved(readSavedResources(), pathSlug, lessonSlug, resourceType, resourceSlug);
}

export function toggleSavedAcademyResource(
  pathSlug: string,
  lessonSlug: string,
  resourceType: SavedAcademyResourceType,
  resourceSlug: string,
) {
  const current = readSavedResources();
  const { next, saved } = toggleResourceInList(current, pathSlug, lessonSlug, resourceType, resourceSlug);
  writeSavedResources(next);
  return saved;
}

export async function toggleSavedAcademyResourceWithSync(
  pathSlug: string,
  lessonSlug: string,
  resourceType: SavedAcademyResourceType,
  resourceSlug: string,
) {
  const saved = toggleSavedAcademyResource(pathSlug, lessonSlug, resourceType, resourceSlug);
  const merged = readSavedResources();
  await persistSavedAcademyResourcesToAccount(merged);
  return saved;
}

export function removeSavedAcademyResource(
  pathSlug: string,
  lessonSlug: string,
  resourceType: SavedAcademyResourceType,
  resourceSlug: string,
) {
  const current = readSavedResources();
  const next = removeResourceFromList(current, pathSlug, lessonSlug, resourceType, resourceSlug);
  writeSavedResources(next);
}

export function clearSavedAcademyResources() {
  writeSavedResources([]);
}

export async function clearSavedAcademyResourcesWithSync() {
  clearSavedAcademyResources();
  await persistSavedAcademyResourcesToAccount([]);
}

export { REMOTE_KEY };
