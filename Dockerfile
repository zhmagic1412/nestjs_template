FROM node:14-alpine

# Install PM2
RUN npm install -g pm2

# 在容器中创建一个目录
RUN mkdir -p /project/nest_test/

# 定位到容器的工作目录
WORKDIR /project/nest_test/

# RUN/COPY 是分层的，package.json 提前，只要没修改，就不会重新安装包
COPY package.json /project/nest_test/package.json
RUN cd /project/nest_test/
RUN npm i

# 把当前目录下的所有文件拷贝到 Image 目录下
COPY . /project/nest_test/
RUN npm run build

#暴露端口
EXPOSE 3001

# CMD 在docker run 时运行
# 就是执行shell npm run start
#CMD [ "npm", "run", "start"]
CMD [ "npm", "run", "pm2"]
#CMD [ "pm2-runtime", "start", "pm2.config.js"]
