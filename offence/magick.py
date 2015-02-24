# magick.py
# import json
import uuid
import random

from locust import HttpLocust, TaskSet, task

class WebsiteTasks(TaskSet):
    def on_start(self):
        # Set any required HTTP Headers
        # self.client.headers['Accept-Language'] = "en-US,en;q=0.8"
        self.client.headers['Content-Type'] = 'application/json'

    # self.client.post("/login", {
    #     "username": "test_user",
    #     "password": ""
    # })

    @task
    def post_event(self):
        # data = {
        #     'ids': [12, 3, 4, 5, 6]
        # }

        data = {
            # "userId": "e433d0f4-5074-4fb5-9b7a-c245b7f8ed6e",
            # "latitude":32.115402,
            # "longitude":34.843444
            "userId":   str(uuid.uuid4()),
            "latitude": self.gen_latitude(),
            "longitude": self.gen_longitude()
        }

        # self.client.get("/")
        # post(url, data=None, json=None, **kwargs)
        # self.client.post("/", json=json.dumps(data))
        self.client.post("/checkin", json=data)
	# self.client.post("/events/event", json=data)

    def gen_latitude(self):
        mean_deg = 32.115402
        signa_deg = 10
        return random.gauss(mean_deg, signa_deg)

    def gen_longitude(self):
        mean_deg = 34.843444
        signa_deg = 10
        return random.gauss(mean_deg, signa_deg)


    # @task
    # def about(self):
    #     self.client.get("/about/")

class WebsiteUser(HttpLocust):
    task_set = WebsiteTasks
    # min_wait = 5000
    # max_wait = 15000

    # host = "http://google.com"
    # host = "http://front"
    host = "http://192.168.1.129:9000"
