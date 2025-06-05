const { execSync } = require("child_process");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 添加控制台颜色
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  cyan: "\x1b[36m",
  yellow: "\x1b[33m",
  green: "\x1b[32m",
  blue: "\x1b[34m",
  gray: "\x1b[90m",
  red: "\x1b[31m", // 添加红色用于错误提示
};

const COMMIT_TYPES = {
  feat: { emoji: "✨", desc: "新功能 (feature)" },
  fix: { emoji: "🐛", desc: "修复 (bug fix)" },
  docs: { emoji: "📝", desc: "文档 (documentation)" },
  style: { emoji: "💄", desc: "格式 (formatting, missing semi colons, etc)" },
  refactor: { emoji: "♻️", desc: "重构 (refactoring code)" },
  test: { emoji: "✅", desc: "测试 (when adding missing tests)" },
  chore: { emoji: "🔧", desc: "构建过程或辅助工具的变动 (chore)" },
  perf: { emoji: "⚡️", desc: "性能优化 (performance improvement)" },
  ci: { emoji: "👷", desc: "持续集成 (continuous integration)" },
  revert: { emoji: "⏪️", desc: "回退 (revert to a commit)" },
};

// 添加 types 定义
const types = Object.entries(COMMIT_TYPES);

function clearLines(count) {
  process.stdout.write("\x1b[0G"); // 移动到行首
  process.stdout.write(`\x1b[${count}A`); // 向上移动
  process.stdout.write("\x1b[J"); // 清除从光标到屏幕底部的内容
}

function renderOptions() {
  // 打印选项
  types.forEach(([key, { emoji, desc }], index) => {
    const line = `${colors.green}${index + 1})${colors.reset} ${
      colors.yellow
    }${key}${colors.reset}: ${emoji} ${colors.blue}${desc}${colors.reset}`;
    console.log(line);
  });
}

const question = (query) =>
  new Promise((resolve) => rl.question(query, resolve));

async function getCommitMessage() {
  try {
    // 打印标题
    console.log(
      `${colors.bright}${colors.cyan}请选择提交类型 (输入数字):${colors.reset}\n`
    );

    // 渲染选项
    renderOptions();

    // 获取用户输入的数字
    let selectedIndex;
    while (true) {
      const input = await question(
        `${colors.bright}请输入数字 (1-${types.length}): ${colors.reset}`
      );
      const num = parseInt(input);
      if (!isNaN(num) && num >= 1 && num <= types.length) {
        selectedIndex = num - 1;
        break;
      }
      console.log(
        `${colors.red}无效的输入，请输入 1-${types.length} 之间的数字${colors.reset}`
      );
    }

    const type = types[selectedIndex][0];
    const { emoji, desc } = COMMIT_TYPES[type];

    // 清除所有选项显示（包括标题）
    clearLines(types.length + 4); // 增加行数以包含输入提示

    // 显示选中的类型
    console.log(
      `${colors.bright}${colors.cyan}选择的提交类型: ${colors.yellow}${type}${colors.reset} ${emoji} ${colors.blue}${desc}${colors.reset}\n`
    );

    const scope = await question(
      `${colors.bright}输入影响范围 ${colors.gray}(可选，直接回车跳过)${colors.reset}: `
    );
    const message = await question(
      `${colors.bright}输入提交信息: ${colors.reset}`
    );

    if (!message.trim()) {
      throw new Error("提交信息不能为空");
    }

    const scopeStr = scope ? `(${scope})` : "";
    return `${type}${scopeStr}: ${emoji} ${message}`;
  } catch (error) {
    throw error;
  }
}

async function main() {
  try {
    // 检查git是否初始化
    try {
      execSync("git rev-parse --is-inside-work-tree", { stdio: "ignore" });
    } catch (e) {
      throw new Error("当前目录不是git仓库");
    }


    // 运行 eslint 检查
    console.log(`${colors.cyan}➜ 运行 ESLint 检查...${colors.reset}`);
    try {
      // // tsc -b
      execSync("pnpm lint", { stdio: "inherit" });
    } catch (error) {
      console.error(`${colors.red}ESLint 检查未通过，请修复以上问题后重试${colors.reset}`);
      process.exit(1);
    }
    
    // 添加所有更改
    console.log(`${colors.cyan}➜ 添加更改...${colors.reset}`);
    execSync("git add .", { stdio: "inherit" });

    // 检查是否有暂存的更改
    try {
      execSync("git diff --staged --quiet");
      console.log(`${colors.yellow}没有需要提交的更改${colors.reset}`);
      process.exit(0);
    } catch (e) {
      // 有暂存的更改，继续执行
    }


    // 运行 lint-staged
    console.log(`${colors.cyan}➜ 运行代码检查...${colors.reset}`);
    execSync("npx lint-staged", { stdio: "inherit" });

    // 获取提交信息
    const commitMessage = await getCommitMessage();

    // 提交更改
    console.log(`${colors.cyan}➜ 提交更改...${colors.reset}`);
    execSync(`git commit -m "${commitMessage.replace(/"/g, '\\"')}"`, {
      stdio: "inherit",
    });

    // 推送更改
    console.log(`${colors.cyan}➜ 推送到远程...${colors.reset}`);
    execSync("git push", { stdio: "inherit" });

    console.log(`${colors.green}✨ 完成!${colors.reset}`);
  } catch (error) {
    console.error(`${colors.red}错误: ${error.message}${colors.reset}`);
    process.exit(1);
  } finally {
    rl.close();
  }
}

main();
