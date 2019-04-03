FROM arm32v7/node:10.15

WORKDIR /home/node

RUN wget http://www.airspayce.com/mikem/bcm2835/bcm2835-1.58.tar.gz

RUN tar zxvf bcm2835-1.58.tar.gz 

WORKDIR /home/node/bcm2835-1.58

RUN ./configure \
    && make \
    && make install

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN ls -lh

CMD ["npm", "start"]

EXPOSE 3030

# docker build -t tkottke90/feathers-rpi:latest -t tkottke90/feathers-rpi:1.0.X .
# docker run -d -p 80:3030 --privileged --restart=on-failure:5 --env REDIS_URL=172.17.0.2 --name tfrpi tkottke90/feathers-rpi

# View Docker Containers
# docker ps -a

