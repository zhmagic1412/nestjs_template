module.exports = {
  "apps": {
    "name": "nest_test",       // 项目名
    "script": "./dist/main.js",              // 执行文件
    "cwd": "./",                     // 根目录
    "args": "",                      // 传递给脚本的参数
    "interpreter": "",               // 指定的脚本解释器
    "interpreter_args": "",          // 传递给解释器的参数
    //"watch": true,                   // 是否监听文件变动然后重启 docker内要关闭
    "ignore_watch": [                // 不用监听的文件
      "node_modules",
      "public"
    ],
    "exec_mode": "cluster",     // 应用启动模式，支持 fork 和 cluster 模式
    "instances": 2,              // 应用启动实例个数，仅在 cluster 模式有效 默认为 fork
    "error_file": "./pm2_logs/app-err.log",         // 错误日志文件
    "out_file": "./pm2_logs/app-out.log",           // 正常日志文件
    "merge_logs": true,                         // 设置追加日志而不是新建日志
    "log_date_format": "YYYY-MM-DD HH:mm:ss",   // 指定日志文件的时间格式
    "min_uptime": "60s",                        // 应用运行少于时间被认为是异常启动
    "max_restarts": 30,                         // 最大异常重启次数
    "autorestart": true,                      // 默认为 true, 发生异常的情况下自动重启
    "restart_delay": 60,                      // 异常重启情况下，延时重启时间
    "env": {
      "NODE_ENV": "production",                // 环境参数，当前指定为生产环境
      "REMOTE_ADDR": ""
    },
    "env_dev": {
      "NODE_ENV": "development",              // 环境参数，当前指定为开发环境
      "REMOTE_ADDR": ""
    },
    "env_test": {
      "NODE_ENV": "test",
      "REMOTE_ADDR": ""
    }
  }
}