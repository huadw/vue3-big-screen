/**
 * 用来实现代码的自动发布
 * 首先会本地打包为zip，再上传到服务器，最后在服务器端解包。
 * @auth: 道伟
 * @date: 2023-02-08
 */
const scpClient = require('scp2')
const chalk = require('chalk')
const Client = require('ssh2').Client
const ora = require('ora')
const path = require('path')
const zip = require('./zip.js');
const server = require('./config.js')
const bathPath = path.resolve();

(() => {
  /**
   * 代码zip压缩
   */
  const compression = async () => {
    console.log('正在进行zip压缩...');
    const flag = await zip(bathPath);
    if (flag) {
      console.log(chalk.green('Success! zip打包成功!'))
    } else {
      console.log(chalk.red('打包失败.\n'));
    }
    return flag;
  }

  /**
   * 通过ssh链接服务器
   */
  const linkServer = async (callback) => {
    const conn = new Client();
    conn.on('ready', async () => {
      callback(conn);
    }).connect({
      host: server.host,
      port: server.port,
      username: server.username,
      password: server.password,
    })
  }

  /**
   * 删除旧的文件
   * @param {*} conn 
   * @param {*} callback 回调方法
   */
  const delOld = (conn, callback) => {
    conn.exec(`rm -rf ${server.path}/*`, function (err, stream) {
      if (err) throw err
      stream.on('close', callback).on('data', function (data) {
        console.log('STDOUT: ' + data)
      }).stderr.on('data', function (data) {
        console.log('STDERR: ' + data)
      })
    })
  }

  /**
   * 拷贝代码
   */
  const copy = (callback) => {
    const spinner = ora('正在发布到服务器...')
    spinner.start()
    scpClient.scp(`${bathPath}/dist.zip`, {
      host: server.host,
      port: server.port,
      username: server.username,
      password: server.password,
      path: server.path, // 项目放置静态地址（服务器中地址）
    }, function (err) {
      spinner.stop()
      if (err) {
        console.log(chalk.red('发布失败.'))
      } else {
        console.log(chalk.green('Success! 成功发布到服务器! '));
        callback()
      }
    })
  }

  /**
   * 解压
   */
  const decompress = (conn, end) => {
    console.log('正在进行zip解压缩...')
    conn.exec(`unzip ${server.path}/dist.zip -d ${server.path}`, function (err, stream) {
      if (err) {
        console.log(chalk.red('解压失败.\n'))
        throw err
      }
      stream.on('close', (conn) => {
        console.log(chalk.green('Success! 解压成功! \n'));
        end();
      }).on('data', function (data) {
        // console.log('STDOUT: ' + data)
      }).stderr.on('data', function (data) {
        // console.log('STDERR: ' + data)
      })
    })
  }

  /**
   * 整体流程
   */
  const init = async () => {
    const flag = await compression();//压缩
    if (!flag) return;
    linkServer((conn) => {//链接服务器
      delOld(conn, () => {//删除旧文件
        copy(() => {//拷贝新文件
          decompress(conn, () => {//解压文件
            conn.end();//结束
            console.log(chalk.green('已完成所有操作'));
          })
        });
      })
    })
  }

  init();
})()
