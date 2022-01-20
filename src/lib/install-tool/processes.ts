import { spawn } from 'child_process';
import ora from 'ora';

interface Command {
    cmd: string,
    args: string[],
    asRoot: boolean
}

export class Processes {
    commands: Command[]  = [];
    spinner;

    constructor(private text, private rootPasssword = '') {
    }

    add( cmd: string, args: string[], asRoot = false) {
        this.commands.push({ cmd, args, asRoot });
        return this;
    }

  async start() {
    this.startSpinner(this.text);
    let output = '';
    for (let cmd of this.commands) {
      if (!cmd.asRoot) {
        output += await this.startCommand(cmd.cmd, cmd.args).catch(() => '');
      } else {
        output += await this.startCommand(
          cmd.cmd,
          cmd.args,
          cmd.asRoot,
          this.rootPasssword
        ).catch(() => '');
      }
    }
    this.stopSpinner(true);
    return output;
  }

  async startCommand(cmd, args, asRoot = false, rootPasssword = '') {
      let child;
      let scriptOutput;
    return new Promise((resolve, reject) => {
      if (!asRoot) {
        child = spawn(cmd, args);
      } else {
        let childPwd = spawn('echo', [rootPasssword]);
        args.unshift(cmd);
        args.unshift('-S');
        child = spawn('sudo', args);
        childPwd.stdout.pipe(child.stdin);
      }
  
      child.stdout.on('data', function (data) {
        data = data.toString();
        this.scriptOutput += data;
      });
  
      child.stdout.on('end', (e) => {
        resolve(scriptOutput);
      });
  
      child.on('error', (e) => {
        reject(e);
      });
    });
  }
  
  private startSpinner(text) {
    this.spinner = ora(text).start();
  }
  
  private stopSpinner(success) {
    if (success) {
      this.spinner.succeed();
    } else {
      this.spinner.fail();
    }
  }
}

