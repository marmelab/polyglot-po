.PHONY: build help

help:
	@grep -E '^[a-zA-Z0-9_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

install: package.json ## Install dependencies
	@yarn

build-cli: ## Buld the CLI
	@yarn -s build-pastel

build-lib: ## Buld the library
	@yarn -s build-lib

build: ## Buld the packages
	@yarn -s build

lint: ## Lint the code and check coding conventions (and automatically fix)
	@echo "Running linter..."
	@yarn -s lint

test: ## Run tests
	yarn -s test;

start: ## Run the CLI in development mode
	yarn start