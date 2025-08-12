import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
export const getTodos = query({
  handler: async (ctx) => {
    const todos = await ctx.db.query("todos").order("asc").collect();
    return todos;
  },
});

export const completedTodosCount = query({
  handler: async (ctx) => {
    const count = await ctx.db
      .query("todos")
      .filter((q) => q.gte(q.field("isCompleted"), true))
      .collect();
    return count.length;
  },
});

export const createTodo = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    const todoId = await ctx.db.insert("todos", {
      text: args.text,
      isCompleted: false,
    });
    return todoId;
  },
});

export const toggleTodo = mutation({
  args: {
    id: v.id("todos"),
  },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (!todo) throw new Error("Todo not found");
    await ctx.db.patch(args.id, {
      isCompleted: !todo.isCompleted,
    });
  },
});

export const deleteTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const updateTodo = mutation({
  args: {
    id: v.id("todos"),
    text: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      text: args.text,
    });
  },
});

export const clearAllTodos = mutation({
  handler: async (ctx) => {
    const todos = await ctx.db.query("todos").collect();

    for (const todo of todos) {
      await ctx.db.delete(todo._id);
    }

    return { deletedCount: todos.length };
  },
});
