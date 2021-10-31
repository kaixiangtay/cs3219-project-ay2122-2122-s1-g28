FROM node:16

WORKDIR /usr/src/users


# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY ["package.json", "package-lock.json*", "./"]

COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

EXPOSE 5000

CMD [ "npm", "start" ]
