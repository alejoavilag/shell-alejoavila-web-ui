import type { ArchitectureRepository } from "@/application/ports/architecture.repository";
import type { ArchitectureModel } from "@/domain/architecture/model";

export function getArchitectureModel(
  repository: ArchitectureRepository,
): ArchitectureModel {
  return repository.load();
}
