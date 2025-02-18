import { MatterStatus } from "../../enums/matter-status";

export const matters = Object.values(MatterStatus).map((status, index) => ({
  id: index + 1,
  matter: `Al-Massa Client name Al-Massa Cli test ${index + 1} Al-Massa Client name Al-Massa Cli test ${index + 1}`,
  matterNumber: `200123-0${index + 1}-01`,
  stage: status,
  practiceArea: "Intellectual Property",
  reference: `38/2025-${index + 1}`,
  category: "Trademark",
  categoryDescription: "trademark registration",
  client: `Client ${index + 1}`
}));