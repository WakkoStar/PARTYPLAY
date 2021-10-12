FROM node:14
WORKDIR /app
ENV PORT=8000
ENV NODE_ENV=production
# FRONT
COPY packages/front/ .
RUN yarn install
RUN yarn build
RUN ls | grep -v build | xargs rm -rf
# BACK
COPY packages/server/package.json ./
RUN yarn install
COPY packages/server/ .
RUN mv build public
EXPOSE 8000
CMD [ "yarn" , "start:build"] 