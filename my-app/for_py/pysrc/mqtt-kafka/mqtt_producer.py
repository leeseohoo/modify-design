import json
import multiprocessing
from datetime import datetime

import paho.mqtt.client as mqtt
from random import randint
import time

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        global Connected
        Connected = True
    else:
        print("Connection failed")


def client_connect(user):
    # MQTT connection
    cli = "producer" + user
    mqtt_client = mqtt.Client(cli)
    mqtt_client.on_connect = on_connect

    mqtt_broker_address = '127.0.0.1'
    mqtt_client.connect(mqtt_broker_address, 1883)
    mqtt_client.loop_start()
    #while Connected != True:
    #    time.sleep(0.1)
    return mqtt_client



def make_producer(user) :
    mqtt_client = client_connect(user)
    while True:
        randNumber = randint(10, 110)
        now = datetime.now()
        timestamp = now.strftime('%Y-%m-%d %H:%M:%S')
        # json으로 encode해서 publish
        if mqtt_client.publish(user, json.dumps({"user": user, "timestamp": str(timestamp), "g_x": randNumber, "g_y": randNumber, "g_z": randNumber, "a_x": randNumber, "a_y": randNumber, "a_z": randNumber, "heartrate": randNumber, "resp": randNumber, "temp": randNumber }), 1):
            print(user+'_MQTT published : ' + json.dumps({"user": user, "timestamp": str(timestamp), "g_x": randNumber, "g_y": randNumber, "g_z": randNumber, "a_x": randNumber, "a_y": randNumber, "a_z": randNumber, "heartrate": randNumber, "resp": randNumber, "temp": randNumber}))
        time.sleep(4)

user_list = ["user1", "user2", "user3", "user4", "user5", "user6", "user7", "user8", "user9", "user10"]


if __name__=='__main__':
    # 컨슈머 멀티프로세싱
    pool = multiprocessing.Pool(processes=10)
    pool.map(make_producer, user_list)