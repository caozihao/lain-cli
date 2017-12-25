const fs = require('fs');
const { prompt } = require('inquirer')
const filePath = `${__dirname}/../testFile.txt`;
const mkdirFilePath = `${__dirname}/../mdrfile`;
const filePathSync = `${__dirname}/../testFileSync.txt`;
const mkdirFilePathSync = `${__dirname}/../mdrfileSync`;
const existsPath = `${__dirname}/../commands/add.js`;
const statDir = `${__dirname}/../stat/`;
const watchFile = `${__dirname}/../README.md`;
const writeFilePath = `${__dirname}/../README2.md`;


// 异步创建目录
const mkdir = () => {
  // 0777 权限值
  fs.mkdir(mkdirFilePath, 0777, (err) => {
    if (err) throw err;
    console.log('创建目录成功');
  })
}

// 异步读取数据
const readFile = () => {
  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) throw err;
    console.log('读取的数据 ->', data);
  })
}


// 异步写数据
const writeFile = () => {
  fs.writeFile(filePath, '希望所有人发大财', 'utf-8', (err) => {
    if (err) throw err;
    console.log('写入成功！');
    readFile();
  })
}

///////////////////////////////////////////////////////

// 同步创建目录
const mkdirSync = () => {
  try {
    fs.mkdirSync(mkdirFilePathSync, 0, 777);
    console.log('异步创建目录成功')
  } catch (error) {
    console.log('异步创建目录失败')
  }
}

//同步读取数据
const readFileSync = () => {
  try {
    const data = fs.readFileSync(filePathSync, 'utf-8');
    console.log('同步文件读取的内容是->', data)
  } catch (error) {
    console.log('同步文件读取失败')
  }
}

//同步写入数据
const writeFileSync = () => {
  try {
    const data = fs.writeFileSync(filePathSync, '早点下班a ', 'utf-8');
    console.log('写入文件成功->', data)
  } catch (error) {
    console.log('写入文件成功')
  }
}

//////////////////////////////
// 判断路径是否存在
const exists = () => {
  fs.exists(existsPath, (exists) => {
    console.log(exists ? '存在' : '不存在')
  })
}

//判断文件还是目录
const readdir = () => {
  // 
  fs.readdir(statDir, (err, files) => {
    if (err) throw err;
    var length = files.length;
    console.log('一共有' + length + '个文件');
  })
}

//判断文件还是目录
const stat = () => {
  fileOrdDir(statDir);
}


const fileOrdDir = (statDir111) => {
  // 
  fs.readdir(statDir111, (err, files) => {
    if (err) throw err;

    files.forEach((file, index) => {
      fs.stat(`${statDir111}${file}`, (err, stats) => {
        if (err) throw err;
        if (stats.isFile()) {
          console.log("%s is file", file);
        } else if (stats.isDirectory()) {
          console.log("%s is isDirectory", file);
          fileOrdDir(`${statDir111}${file}/`);
        }
      })
    })
  })
}
//只遍历第一层
const readDdir = () => {
  //当前进程所在的路径，不是当前脚本所在的路径
  console.log('process.cwd() ->', process.cwd());
  fs.readdir(process.cwd(), function (err, files) {
    if (err) {
      console.log(err);
      return;
    }

    var count = files.length;
    var results = {};
    files.forEach(function (filename) {

      fs.readFile(filename, function (data) {
        results[filename] = data;
        count--;
        if (count <= 0) {
          console.log('results ->', results);
          // 对所有文件进行处理
        }
      });
    });
  });
}

// 监听文件
const watch = () => {
  fs.watchFile(watchFile, (cur, prev) => {
    console.log('the current mtime is: ' + cur.mtime);
    console.log('the previous mtime was: ' + prev.mtime);
  })
}

// 解除监听
const unwatch = () => {
  setTimeout(function () {
    fs.unwatchFile(watchFile);
  }, 5000);
}


//创建文件读取流
const createReadStream = () => {
  const input = fs.createReadStream(watchFile);

  const func = (data) => {
    console.log('Line : ' + data);
  }

  const readLine = (input, func) => {
    var remaining = '';

    // 每次发送回触发一个data事件
    input.on('data', function (data) {
      console.log('data ->', data); //字节流
      remaining += data;
      console.log('remaining ->', remaining); //字节流
      //换行符的第几个位置
      var index = remaining.indexOf('\n');
      var last = 0;
      while (index > -1) {
        var line = remaining.substring(last, index);
        last = index + 1;
        func(line);
        index = remaining.indexOf('\n', last);
      }
      remaining = remaining.substring(last);
    });

    // 发送结束触发的事件
    input.on('end', function () {
      if (remaining.length > 0) {
        func(remaining);
      }
    });
  }

  readLine(input, func);
}

//创建文件写入流
const createWriteStream = () => {
  const out = fs.createWriteStream(writeFilePath, { encoding: "utf8" });
  out.write('渣渣渣');
  out.end();
}

//利用IO流来拷贝文件
const readAndWriteStream = () => {
  const input = fs.createReadStream(watchFile);
  const outPut = fs.createWriteStream(writeFilePath);
  const oldTime = new Date().getTime();

  input.on('data', (data) => {
    outPut.write(data);
  })

  input.on('error', (error) => {
    throw error;
  })

  input.on('end', () => {
    const newTime = new Date().getTime()
    const time = (newTime - oldTime) / 1000;
    console.log('读写结束')
    console.log(`花了${time}秒`)
    outPut.end();
  })
}

//重命名
const rename = () => {
  fs.rename(`${__dirname}/../_.gitignore`, `${__dirname}/../.gitignore`, (err) => {
    if (err) throw err;
    console.log('重命名成功')
  })
}

const question = [
  {
    type: 'input',
    name: 'number',
    message: `选择操作文件的方式:
              1, 异步创建目录
              2, 异步读取文件
              3, 异步写入文件

              4, 同步创建目录
              5, 同步读取文件
              6，同步写入文件
              
              7, 判断文件存在
              8, 读取目录
              9, 判断是文件还是目录
              10,读取目录下所有

              11,监听文件
              12,解除监听
              
              13,读取流
              14,输出流
              15,读写混合

              16,异步重命名
              17,...

               `,
  },
]

module.exports = prompt(question).then(({ number }) => {
  // console.log('number ->', number);
  // console.log('type ->', typeof (number));
  switch (parseInt(number, 10)) {
    case 1:
      mkdir();
      break;
    case 2:
      readFile();
      break;
    case 3:
      writeFile();
      break;

    case 4:
      mkdirSync();
      break;
    case 5:
      readFileSync();
      break;
    case 6:
      writeFileSync();
      break;

    case 7:
      exists();
      break;
    case 8:
      readdir();
      break;
    case 9:
      stat();
      break;

    case 10:
      readDdir();
      break;

    case 11:
      watch();
      break;

    case 12:
      unwatch();
      break;

    case 13:
      createReadStream();
      break;

    case 14:
      createWriteStream();
      break;

    case 15:
      readAndWriteStream();
      break;

    case 16:
      rename();
      break;

    case 17:
      console.log('作者很懒，没有写下去')
      break;

    default:
      console.log('error');
  }
})