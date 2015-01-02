build:
	grunt build

install:
	npm install && bower install

test:
	make build && grunt test

docs:
	npm run-script docs

.PHONY: install build