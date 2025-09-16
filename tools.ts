import { tool } from "ai";
import { simpleGit } from "simple-git";
import { z } from "zod";
import fs from "fs/promises";

const excludeFiles = ["dist", "bun.lock"];

const fileChange = z.object({
  rootDir: z.string().min(1).describe("The root directory"),
});

type FileChange = z.infer<typeof fileChange>;

async function getFileChangesInDirectory({ rootDir }: FileChange) {
  const git = simpleGit(rootDir);
  const summary = await git.diffSummary();
  const diffs: { file: string; diff: string }[] = [];

  for (const file of summary.files) {
    if (excludeFiles.includes(file.file)) continue;
    const diff = await git.diff(["--", file.file]);
    diffs.push({ file: file.file, diff });
  }

  return diffs;
}

export const getFileChangesInDirectoryTool = tool({
  description: "Gets the code changes made in given directory",
  inputSchema: fileChange,
  execute: getFileChangesInDirectory,
});

const commitMessage = z.object({
  commit: z.string().min(1).describe("The commit message to be added"),
});

type CommitMessage = z.infer<typeof commitMessage>;

async function createCommitMessage({ commit }: CommitMessage) {
  return commit;
}

export const createCommitMessageTool = tool({
  description: "Creates a commit message",
  inputSchema: commitMessage,
  execute: createCommitMessage,
});

const markdownFile = z.object({
  fileName: z.string().min(1).describe("The name of the markdown file"),
  content: z.string().min(1).describe("The content of the markdown file"),
});

type MarkdownFile = z.infer<typeof markdownFile>;

async function createMarkdownFile({ fileName, content }: MarkdownFile) {
  await fs.writeFile(fileName, content);
  return `File ${fileName} created successfully`;
}

export const createMarkdownFileTool = tool({
  description: "Creates a markdown file",
  inputSchema: markdownFile,
  execute: createMarkdownFile,
});