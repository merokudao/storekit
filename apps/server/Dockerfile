FROM node:19.3.0 AS builder

WORKDIR /storekit

# Install app dependencies
ADD . .
RUN yarn

ENV NODE_ENV=production

RUN yarn build


FROM node:19.3.0-alpine AS runner

WORKDIR /storekit

COPY --from=builder /storekit/src ./src
COPY --from=builder /storekit/node_modules ./node_modules
COPY package*.json ./

ENV NODE_ENV=production
ENV PORT=8080
EXPOSE 8080

CMD ["yarn", "start:prod"]
