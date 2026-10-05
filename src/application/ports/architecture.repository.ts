import type { ArchitectureModel } from "@/domain/architecture/model";

export interface ArchitectureRepository {
  load(): ArchitectureModel;
}
