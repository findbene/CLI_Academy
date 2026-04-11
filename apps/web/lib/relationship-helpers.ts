/**
 * Re-export relationship helpers from academy-core
 * This maintains the local API boundary while using shared core logic
 */
export {
  getBestRelationshipMatch,
  getRelatedRelationships,
  getRelationshipsForEntity,
} from "@/lib/academy-core";
