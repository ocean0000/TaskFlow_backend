run:
	docker start mongodb && cd back_end/api && npm run start:dev

run-docker:
	docker start mongodb

run-server:
	cd back_end/api && npm run start:dev

stop-docker:
	docker stop mongodb && docker rm mongodb
