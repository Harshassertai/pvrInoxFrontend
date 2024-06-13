# pull the official base image
FROM node:16-alpine
# set working direction
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# install application dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm i --legacy-peer-deps --openssl-legacy-provider
RUN npm i --legacy-peer-deps react-swipeable-views
RUN npm i --legacy-peer-deps @material-table/core
# add app
COPY . ./
RUN npm run build
RUN npm install -g serve
# EXPOSE 3000
# start app
#CMD ["npm", "start"]
CMD ["serve","-s","build"]
