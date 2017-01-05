FROM mhart/alpine-node-auto
RUN mkdir Dockerfolder
WORKDIR Dockerfolder
COPY . .
RUN npm install -g http-server
RUN npm install
CMD ["npm","start"]
