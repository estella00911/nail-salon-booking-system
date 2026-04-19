# check-node-version is referred to https://github.com/github/gh-aw/blob/main/Makefile
.PHONY: check-node-version
check-node-version:
	@if ! command -v node >/dev/null 2>&1; then \
		echo "Error: Node.js is not installed."; \
		echo ""; \
		echo "This project requires Node.js 20 or higher."; \
		echo "Please install Node.js 20+ and try again."; \
		exit 1; \
	fi; \
	NODE_VERSION=$$(node --version); \
	NODE_VERSION_NUM=$$(echo "$$NODE_VERSION" | sed 's/v//'); \
	NODE_MAJOR=$$(echo "$$NODE_VERSION_NUM" | cut -d. -f1); \
	if [ "$$NODE_MAJOR" -lt 20 ]; then \
		echo "Error: Node.js version $$NODE_VERSION is not supported."; \
		echo ""; \
		echo "This project requires Node.js 20 or higher."; \
		echo "Your current version: $$NODE_VERSION"; \
		echo ""; \
		echo "Please upgrade Node.js and try again."; \
		exit 1; \
	fi; \
	echo "✓ Node.js version check passed ($$NODE_VERSION)"

install:
	npm install

# local development environment
local: check-node-version
	npm run start:dev

# docker
up:
	docker compose up --build -d

down:
	docker compose down

logs:
	docker logs nail-salon-booking-system-server-1

db-dev: clean-dist clean-generated check-node-version
	docker compose down
	docker compose up -d postgres_db
	npx prisma generate
	npx prisma migrate dev
	npx prisma db seed
# then run the server in another terminal w/ cmd 'npm run start:dev'

server-dev:
	npm run start:dev
	
# prisma generate
prisma:
	npx prisma generate

# prisma Studio
studio:
	npx prisma studio --port 5555

# reset the environment (delete node_modules, package-lock.json, dist, and rebuild the project)
reset:
	rm -rf node_modules dist
	npm install
	npx prisma generate
	npm run build
	docker compose down
	docker compose up --build -d
	
clean-dist:
	rm -rf dist

clean-generated:
	rm -rf generated