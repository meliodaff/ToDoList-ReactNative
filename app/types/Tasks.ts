import { Id } from "@/convex/_generated/dataModel";

export type Tasks = {
  _id: Id<"todos">;
  text: string;
  isCompleted: boolean;
  _creationTime: number;
};
