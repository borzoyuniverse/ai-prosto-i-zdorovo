FROM node:22-alpine AS base
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm i -g pnpm && \
    pnpm i --frozen-lockfile

COPY . ./

# Lint

FROM base AS lint
RUN pnpm lint

# Test

FROM base AS test
RUN pnpm test

# Build

FROM base AS build
ARG ENV=test
RUN pnpm build:$ENV

# Default

FROM alpine
WORKDIR /app

RUN cat <<EOF > /usr/local/bin/deploy-front.sh
#!/bin/sh
set -e
SRC=\$1
DST=\$2

NEW="\$DST-\$(date +%Y%m%d-%H%M%S)"
if [ -d \$DST ]; then
    OLD=\$(readlink \$DST)
    cp -lpr \$OLD \$NEW
    AGO=\$(( (\$(date +%s)-\$(stat -c %Y \$DST) + 30*86400) / 60 ))
    find \$NEW -mmin +\$AGO -exec rm -rf "{}" \;
fi

cp -rT \$SRC \$NEW
ln -sT \$NEW \$NEW-tmp && mv -T \$NEW-tmp \$DST
echo "Deployed front to \$DST"
rm -rf \$OLD
EOF

RUN adduser -D user && \
    mkdir /var/www && \
    chown user:user /var/www && \
    chmod a+x /usr/local/bin/deploy-front.sh

COPY --from=build /app/dist dist

USER user
CMD ["deploy-front.sh", "/app/dist", "/var/www/front"]
