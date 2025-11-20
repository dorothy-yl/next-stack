"use server";
import { CategorySchema } from "../_types/categorySchema";
import db from "@/lib/db";
import { executeAction } from "@/lib/executeAction";

const deleteCategory = async (id: number) => {
  await executeAction({
    actionFn: () => db.category.delete({ where: { id } }),
  });
};

const createCategory = async (data: CategorySchema) => {
  await executeAction({
    actionFn: () =>
      db.category.create({
        data,
      }),
  });
};
export { deleteCategory, createCategory };
