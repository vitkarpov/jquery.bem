build:
	grunt build

install:
	npm install && bower install

test:
	make build && grunt test

.PHONY: install build