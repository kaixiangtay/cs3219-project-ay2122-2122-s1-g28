FROM node:16

# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ["package.json", "package-lock.json*", "./"]

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

CMD [ "npm", "start" ]