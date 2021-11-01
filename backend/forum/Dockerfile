FROM node:16

WORKDIR /usr/src/forum


# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY ["package.json", "package-lock.json*", "./"]

COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

EXPOSE 4000

CMD [ "npm", "start" ]
