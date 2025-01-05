#!/usr/bin/env node
import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { join, resolve } from 'path';

const FILE_EXTENSIONS = ['.ts', '.tsx']; // 支持的文件扩展名

// 获取 Git 中变更的文件列表（已暂存和未暂存）
function getChangedFiles() {
  try {
    const unstagedFiles = execSync('git diff --name-only --diff-filter=ACM', {
      encoding: 'utf-8',
    });
    const stagedFiles = execSync(
      'git diff --name-only --cached --diff-filter=ACM',
      { encoding: 'utf-8' },
    );
    const files = [
      ...new Set([...unstagedFiles.split('\n'), ...stagedFiles.split('\n')]),
    ];
    return files
      .filter(
        file =>
          file &&
          FILE_EXTENSIONS.some(
            ext =>
              // 过滤后缀名
              file.endsWith(ext) &&
              // 过滤非当前运行命令路径
              join(import.meta.dirname, file).startsWith(resolve()),
          ),
      )
      .map(file => {
        return join(import.meta.dirname, file).replace(`${resolve()}/`, '');
      });
  } catch (error) {
    console.error('Error fetching changed files:', error.message);
    process.exit(1);
  }
}

// 运行 ESLint 对文件进行检查
function runESLint(files) {
  if (files.length === 0) {
    console.log('No changed files to lint.');
    return;
  }

  try {
    const eslintPath = resolve('node_modules', '.bin', 'eslint');
    if (!existsSync(eslintPath)) {
      console.error(
        'ESLint is not installed. Please install it using npm or yarn.',
      );
      process.exit(1);
    }

    const command = `pnpm eslint ${files.join(' ')} --cache --quiet --fix`;

    console.log('Running ESLint on the following files:\n');
    console.log(files.join('\n'));
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error('Error running ESLint:', error.message);
    process.exit(1);
  }
}

// 主函数
function main() {
  const changedFiles = getChangedFiles();
  if (changedFiles.length > 0) {
    runESLint(changedFiles);
  } else {
    console.log('No files to lint.');
  }
}

main();
